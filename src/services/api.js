/**
 * Production API Client for Toby's Auto Mechanic Admin & Backend
 */

const TOKEN_STORAGE_KEY = 'toby_admin_token';

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch (e) {
    console.warn('Storage warning:', e);
  }
}

async function request(endpoint, options = {}) {
  const token = getStoredToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const res = await fetch(url, {
    ...options,
    headers
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.error || `HTTP ${res.status} request failed`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

// ------------------------------------------------------------------
// Auth APIs
// ------------------------------------------------------------------
export const authApi = {
  async login(password) {
    const data = await request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password })
    });
    if (data.token) {
      setStoredToken(data.token);
    }
    return data;
  },

  async verify() {
    return request('/api/auth/me', { method: 'GET' });
  },

  async logout() {
    try {
      await request('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    } finally {
      setStoredToken(null);
    }
  },

  async changePassword(oldPassword, newPassword) {
    return request('/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword })
    });
  }
};

// ------------------------------------------------------------------
// Quotes APIs
// ------------------------------------------------------------------
export const quotesApi = {
  async getStats() {
    return request('/api/quotes/stats', { method: 'GET' });
  },

  async getQuotes({ status = 'all', search = '', limit = 100, offset = 0 } = {}) {
    const params = new URLSearchParams();
    if (status && status !== 'all') params.set('status', status);
    if (search) params.set('search', search);
    params.set('limit', limit);
    params.set('offset', offset);

    return request(`/api/quotes?${params.toString()}`, { method: 'GET' });
  },

  async getQuote(id) {
    return request(`/api/quotes/${encodeURIComponent(id)}`, { method: 'GET' });
  },

  async updateStatus(id, status) {
    return request(`/api/quotes/${encodeURIComponent(id)}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    });
  },

  async sendQuote(id, quoteData) {
    return request(`/api/quotes/${encodeURIComponent(id)}/send-quote`, {
      method: 'POST',
      body: JSON.stringify(quoteData)
    });
  },

  async deleteQuote(id) {
    return request(`/api/quotes/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    });
  },

  async submitPublicQuote(quoteData) {
    return request('/api/quotes', {
      method: 'POST',
      body: JSON.stringify(quoteData)
    });
  }
};

// ------------------------------------------------------------------
// Settings & Automations APIs
// ------------------------------------------------------------------
export const settingsApi = {
  async getSettings() {
    return request('/api/settings', { method: 'GET' });
  },

  async saveSettings(settings) {
    return request('/api/settings', {
      method: 'PUT',
      body: JSON.stringify(settings)
    });
  },

  async testTelegram(botToken, chatId) {
    return request('/api/settings/test-telegram', {
      method: 'POST',
      body: JSON.stringify({ botToken, chatId })
    });
  },

  async testEmail(payload) {
    return request('/api/settings/test-email', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};
