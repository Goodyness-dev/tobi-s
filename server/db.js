import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'toby.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode for high concurrency & performance
try {
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
} catch (e) {
  console.warn('SQLite PRAGMA init note:', e.message);
}

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS quotes (
    id TEXT PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    location TEXT,
    vehicle_make TEXT NOT NULL,
    vehicle_model_year TEXT NOT NULL,
    service_category TEXT NOT NULL,
    detailed_service TEXT NOT NULL,
    engine_type TEXT,
    custom_issue TEXT,
    details TEXT,
    needs_towing INTEGER DEFAULT 0,
    needs_shuttle INTEGER DEFAULT 0,
    timeline TEXT,
    specific_date TEXT,
    status TEXT DEFAULT 'pending',
    quoted_price TEXT,
    quoted_breakdown TEXT,
    estimated_turnaround TEXT,
    warranty_note TEXT,
    admin_message TEXT,
    quote_sent_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  );
`);

// Pre-populate default settings if empty
const defaultSettings = {
  shop_name: "Toby's Auto Mechanic",
  shop_tagline: "Dependable Diesel & Automotive Care",
  shop_address: "15276 W Jimmie Kerr Blvd, Ste 1, Casa Grande, AZ 85122",
  shop_phone: "(520) 836-6921",
  shop_email: "service@tobysautomechanic.com",
  admin_name: "Toby S.",
  telegram_enabled: false,
  telegram_bot_token: "",
  telegram_chat_id: "",
  email_provider: "emailjs",
  emailjs_service_id: "",
  emailjs_template_id_notify: "",
  emailjs_template_id_quote: "",
  emailjs_public_key: "",
  default_warranty: "12-month / 12,000-mile parts & labor warranty",
  default_quote_notes: "Thank you for reaching out to Toby's Auto Mechanic! Please review your custom quote above. If you'd like to lock in this appointment or drop off your vehicle, give us a call or reply directly to this email."
};

const getSettingStmt = db.prepare('SELECT value FROM settings WHERE key = ?');
const setSettingStmt = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');

for (const [key, val] of Object.entries(defaultSettings)) {
  const existing = getSettingStmt.get(key);
  if (!existing) {
    setSettingStmt.run(key, JSON.stringify(val));
  }
}

export function getSetting(key, fallback = null) {
  try {
    const row = getSettingStmt.get(key);
    if (!row) return fallback;
    return JSON.parse(row.value);
  } catch (err) {
    console.error(`Error reading setting ${key}:`, err);
    return fallback;
  }
}

export function getAllSettings() {
  const stmt = db.prepare('SELECT key, value FROM settings');
  const rows = stmt.all();
  const result = {};
  for (const row of rows) {
    try {
      result[row.key] = JSON.parse(row.value);
    } catch {
      result[row.key] = row.value;
    }
  }
  return result;
}

export function saveSettings(settingsObj) {
  const insertOrUpdate = db.prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');
  for (const [key, value] of Object.entries(settingsObj)) {
    insertOrUpdate.run(key, JSON.stringify(value));
  }
  return getAllSettings();
}

// Quotes Helpers
export function insertQuote(quoteData) {
  const stmt = db.prepare(`
    INSERT INTO quotes (
      id, customer_name, customer_email, customer_phone, location,
      vehicle_make, vehicle_model_year, service_category, detailed_service,
      engine_type, custom_issue, details, needs_towing, needs_shuttle,
      timeline, specific_date, status, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?
    )
  `);

  const now = new Date().toISOString();
  stmt.run(
    quoteData.id,
    quoteData.customer_name || quoteData.name || '',
    quoteData.customer_email || quoteData.email || '',
    quoteData.customer_phone || quoteData.phone || '',
    quoteData.location || '',
    quoteData.vehicle_make || quoteData.make || '',
    quoteData.vehicle_model_year || quoteData.modelAndYear || '',
    quoteData.service_category || quoteData.serviceCategory || '',
    quoteData.detailed_service || quoteData.detailedService || '',
    quoteData.engine_type || quoteData.engineType || '',
    quoteData.custom_issue || quoteData.customIssue || '',
    quoteData.details || '',
    quoteData.needs_towing ? 1 : 0,
    quoteData.needs_shuttle ? 1 : 0,
    quoteData.timeline || '',
    quoteData.specific_date || quoteData.specificDate || '',
    quoteData.status || 'pending',
    now,
    now
  );

  return getQuoteById(quoteData.id);
}

export function getAllQuotes({ status, search, limit = 100, offset = 0 } = {}) {
  let query = 'SELECT * FROM quotes WHERE 1=1';
  const params = [];

  if (status && status !== 'all') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (search && search.trim()) {
    const s = `%${search.trim()}%`;
    query += ' AND (id LIKE ? OR customer_name LIKE ? OR customer_email LIKE ? OR customer_phone LIKE ? OR vehicle_make LIKE ? OR vehicle_model_year LIKE ? OR detailed_service LIKE ?)';
    params.push(s, s, s, s, s, s, s);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  const stmt = db.prepare(query);
  const rows = stmt.all(...params);

  // Return formatted quotes
  return rows.map(formatQuoteRow);
}

export function getQuoteById(id) {
  const stmt = db.prepare('SELECT * FROM quotes WHERE id = ?');
  const row = stmt.get(id);
  return row ? formatQuoteRow(row) : null;
}

export function updateQuoteStatus(id, status) {
  const now = new Date().toISOString();
  const stmt = db.prepare('UPDATE quotes SET status = ?, updated_at = ? WHERE id = ?');
  stmt.run(status, now, id);
  return getQuoteById(id);
}

export function saveCustomerQuoteResponse(id, { price, breakdown, turnaround, warranty, message }) {
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    UPDATE quotes 
    SET 
      quoted_price = ?,
      quoted_breakdown = ?,
      estimated_turnaround = ?,
      warranty_note = ?,
      admin_message = ?,
      quote_sent_at = ?,
      status = 'quoted',
      updated_at = ?
    WHERE id = ?
  `);

  stmt.run(
    String(price || ''),
    typeof breakdown === 'object' ? JSON.stringify(breakdown) : String(breakdown || ''),
    String(turnaround || ''),
    String(warranty || ''),
    String(message || ''),
    now,
    now,
    id
  );

  return getQuoteById(id);
}

export function deleteQuote(id) {
  const stmt = db.prepare('DELETE FROM quotes WHERE id = ?');
  stmt.run(id);
  return { success: true };
}

export function getQuotesSummaryStats() {
  const total = db.prepare('SELECT COUNT(*) as count FROM quotes').get().count;
  const pending = db.prepare("SELECT COUNT(*) as count FROM quotes WHERE status = 'pending'").get().count;
  const quoted = db.prepare("SELECT COUNT(*) as count FROM quotes WHERE status = 'quoted'").get().count;
  const completed = db.prepare("SELECT COUNT(*) as count FROM quotes WHERE status = 'completed'").get().count;

  return { total, pending, quoted, completed };
}

function formatQuoteRow(row) {
  let parsedBreakdown = null;
  if (row.quoted_breakdown) {
    try {
      parsedBreakdown = JSON.parse(row.quoted_breakdown);
    } catch {
      parsedBreakdown = row.quoted_breakdown;
    }
  }

  return {
    id: row.id,
    name: row.customer_name,
    email: row.customer_email,
    phone: row.customer_phone,
    location: row.location,
    make: row.vehicle_make,
    modelAndYear: row.vehicle_model_year,
    serviceCategory: row.service_category,
    detailedService: row.detailed_service,
    engineType: row.engine_type,
    customIssue: row.custom_issue,
    details: row.details,
    needsTowing: Boolean(row.needs_towing),
    needsShuttle: Boolean(row.needs_shuttle),
    timeline: row.timeline,
    specificDate: row.specific_date,
    status: row.status,
    quotedPrice: row.quoted_price,
    quotedBreakdown: parsedBreakdown,
    estimatedTurnaround: row.estimated_turnaround,
    warrantyNote: row.warranty_note,
    adminMessage: row.admin_message,
    quoteSentAt: row.quote_sent_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export default db;
