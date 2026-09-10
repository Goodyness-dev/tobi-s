import React, { useState, useEffect } from 'react';
import { 
  Send, Mail, Lock, ShieldCheck, CheckCircle2, AlertCircle, 
  Loader2, Save, Eye, EyeOff, HelpCircle, ExternalLink, RefreshCw, Key
} from 'lucide-react';
import { settingsApi, authApi } from '../../services/api';

export default function AdminSettings() {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  // Password Change State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');

  // Test Connection States
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [telegramTestResult, setTelegramTestResult] = useState(null);
  const [showBotToken, setShowBotToken] = useState(false);

  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailTestResult, setEmailTestResult] = useState(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const data = await settingsApi.getSettings();
      setSettings(data);
      if (data.shop_email) {
        setTestEmailAddress(data.shop_email);
      }
    } catch (err) {
      setSaveError('Failed to load settings: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (e) => {
    e?.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError('');

    try {
      const result = await settingsApi.saveSettings(settings);
      setSettings(result.settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setSaveError(err.data?.error || err.message || 'Error saving settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTestTelegram = async () => {
    if (!settings.telegram_bot_token || !settings.telegram_chat_id) {
      setTelegramTestResult({ success: false, error: 'Please enter both Telegram Bot Token and Chat ID first.' });
      return;
    }

    setIsTestingTelegram(true);
    setTelegramTestResult(null);

    try {
      const result = await settingsApi.testTelegram(settings.telegram_bot_token, settings.telegram_chat_id);
      setTelegramTestResult(result);
    } catch (err) {
      setTelegramTestResult({ success: false, error: err.data?.error || err.message });
    } finally {
      setIsTestingTelegram(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmailAddress) {
      setEmailTestResult({ success: false, error: 'Please enter an email address to send the test quote to.' });
      return;
    }

    setIsTestingEmail(true);
    setEmailTestResult(null);

    try {
      const result = await settingsApi.testEmail({
        toEmail: testEmailAddress,
        serviceId: settings.emailjs_service_id,
        templateId: settings.emailjs_template_id_quote,
        publicKey: settings.emailjs_public_key
      });
      setEmailTestResult(result);
    } catch (err) {
      setEmailTestResult({ success: false, error: err.data?.error || err.message });
    } finally {
      setIsTestingEmail(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPassError('New passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }

    setIsChangingPass(true);
    setPassError('');
    setPassSuccess('');

    try {
      const result = await authApi.changePassword(oldPassword, newPassword);
      setPassSuccess(result.message || 'Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPassSuccess(''), 5000);
    } catch (err) {
      setPassError(err.data?.error || err.message || 'Failed to change password.');
    } finally {
      setIsChangingPass(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-400 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        <span className="text-sm">Loading shop configurations...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner Alert on Save */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-700 text-emerald-300 text-sm flex items-center space-x-3 shadow-lg animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="font-bold">Settings and automation credentials saved to SQLite database successfully!</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800 text-red-300 text-sm flex items-center space-x-3 shadow-lg">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* SECTION 1: Telegram Order Alerts */}
      <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-800 pb-5">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="text-2xl">📱</span>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                Telegram Instant Order Alerts
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Receive live notifications on your phone the instant a customer requests a quote on your website.
            </p>
          </div>

          <label className="flex items-center space-x-3 cursor-pointer bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-2xl hover:border-neutral-700 transition">
            <input
              type="checkbox"
              checked={Boolean(settings.telegram_enabled)}
              onChange={(e) => setSettings({ ...settings, telegram_enabled: e.target.checked })}
              className="w-4 h-4 text-red-600 rounded bg-neutral-800 border-neutral-700 focus:ring-red-600"
            />
            <span className="text-xs font-bold text-white">Enable Telegram Alerts</span>
          </label>
        </div>

        {/* Setup Walkthrough */}
        <div className="p-4 rounded-2xl bg-[#121212] border border-neutral-800/80 text-xs text-neutral-300 space-y-2">
          <div className="font-bold text-white flex items-center space-x-1.5 text-sm">
            <HelpCircle className="w-4 h-4 text-red-500" />
            <span>How Toby sets up Telegram (Takes 60 seconds):</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-neutral-400 leading-relaxed pl-1">
            <li>Open Telegram on your phone or computer, search for <strong className="text-white">@BotFather</strong>, send <code className="text-red-400 bg-neutral-900 px-1 py-0.5 rounded">/newbot</code> and copy your HTTP API Token.</li>
            <li>Search for <strong className="text-white">@userinfobot</strong> on Telegram and tap Start to see your numeric <strong className="text-white">Id</strong> (Chat ID).</li>
            <li>Paste your Token and Chat ID below, click <strong className="text-white">Test Connection</strong>, and verify you get the test ping on your phone!</li>
          </ol>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Telegram Bot Token
            </label>
            <div className="relative">
              <input
                type={showBotToken ? 'text' : 'password'}
                value={settings.telegram_bot_token || ''}
                onChange={(e) => setSettings({ ...settings, telegram_bot_token: e.target.value })}
                placeholder="e.g. 7123456789:AAH..."
                className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none font-mono"
              />
              <button
                type="button"
                onClick={() => setShowBotToken(!showBotToken)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-500 hover:text-neutral-300"
              >
                {showBotToken ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Telegram Chat ID (Your User ID)
            </label>
            <input
              type="text"
              value={settings.telegram_chat_id || ''}
              onChange={(e) => setSettings({ ...settings, telegram_chat_id: e.target.value })}
              placeholder="e.g. 123456789"
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none font-mono"
            />
          </div>
        </div>

        {/* Telegram Test Button & Feedback */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={handleTestTelegram}
            disabled={isTestingTelegram}
            className="py-2.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs flex items-center space-x-2 transition active:scale-95 disabled:opacity-50"
          >
            {isTestingTelegram ? (
              <><Loader2 className="w-4 h-4 animate-spin text-red-500" /><span>Sending Test Ping...</span></>
            ) : (
              <><Send className="w-4 h-4 text-red-500" /><span>Test Telegram Connection</span></>
            )}
          </button>

          {telegramTestResult && (
            <div className={`text-xs px-3.5 py-2 rounded-xl flex items-center space-x-2 ${
              telegramTestResult.success ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800' : 'bg-red-950/40 text-red-300 border border-red-800'
            }`}>
              {telegramTestResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
              <span>{telegramTestResult.message || telegramTestResult.error}</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: Email Automation Settings */}
      <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-neutral-800 pb-5">
          <div className="flex items-center space-x-2.5">
            <span className="text-2xl">✉️</span>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
              Email Automation (Customer Quotes & Alerts)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Automates sending official branded price quotes to customer email addresses and sending you quote alert summaries.
          </p>
        </div>

        {/* EmailJS Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              EmailJS Service ID
            </label>
            <input
              type="text"
              value={settings.emailjs_service_id || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_service_id: e.target.value })}
              placeholder="e.g. service_xxxxxx"
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              EmailJS Public Key
            </label>
            <input
              type="text"
              value={settings.emailjs_public_key || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_public_key: e.target.value })}
              placeholder="e.g. user_xxxxxxxxx"
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              Customer Quote Template ID
            </label>
            <input
              type="text"
              value={settings.emailjs_template_id_quote || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_template_id_quote: e.target.value })}
              placeholder="e.g. template_customer_quote"
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none font-mono"
            />
            <span className="text-[11px] text-neutral-500 mt-1 block">Used when Toby clicks "Send Quote to Customer".</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
              New Order Notification Template ID
            </label>
            <input
              type="text"
              value={settings.emailjs_template_id_notify || ''}
              onChange={(e) => setSettings({ ...settings, emailjs_template_id_notify: e.target.value })}
              placeholder="e.g. template_admin_alert"
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 outline-none font-mono"
            />
            <span className="text-[11px] text-neutral-500 mt-1 block">Alerts Toby's shop email when customer submits.</span>
          </div>
        </div>

        {/* Test Email Delivery */}
        <div className="pt-2 border-t border-neutral-900 space-y-3">
          <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
            Test Quote Email Delivery
          </label>
          <div className="flex flex-wrap sm:flex-nowrap gap-3">
            <input
              type="email"
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              placeholder="your-email@example.com"
              className="flex-1 bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-neutral-500 outline-none"
            />
            <button
              type="button"
              onClick={handleTestEmail}
              disabled={isTestingEmail}
              className="py-2.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs flex items-center space-x-2 transition shrink-0"
            >
              {isTestingEmail ? (
                <><Loader2 className="w-4 h-4 animate-spin text-red-500" /><span>Sending...</span></>
              ) : (
                <><Mail className="w-4 h-4 text-red-500" /><span>Send Test Quote Email</span></>
              )}
            </button>
          </div>

          {emailTestResult && (
            <div className={`text-xs p-3 rounded-xl flex items-center space-x-2 ${
              emailTestResult.success ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800' : 'bg-red-950/40 text-red-300 border border-red-800'
            }`}>
              {emailTestResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
              <span>{emailTestResult.message || emailTestResult.error}</span>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 3: Shop Profile & Defaults */}
      <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-neutral-800 pb-5">
          <div className="flex items-center space-x-2.5">
            <span className="text-2xl">🏪</span>
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
              Shop Profile & Quote Defaults
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Information displayed on official email estimates and header footers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Shop Phone</label>
            <input
              type="text"
              value={settings.shop_phone || ''}
              onChange={(e) => setSettings({ ...settings, shop_phone: e.target.value })}
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Shop Contact / Alert Email</label>
            <input
              type="email"
              value={settings.shop_email || ''}
              onChange={(e) => setSettings({ ...settings, shop_email: e.target.value })}
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Shop Address</label>
            <input
              type="text"
              value={settings.shop_address || ''}
              onChange={(e) => setSettings({ ...settings, shop_address: e.target.value })}
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Standard Warranty Coverage</label>
            <input
              type="text"
              value={settings.default_warranty || ''}
              onChange={(e) => setSettings({ ...settings, default_warranty: e.target.value })}
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white outline-none"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Default Quote Message Template</label>
            <textarea
              rows={3}
              value={settings.default_quote_notes || ''}
              onChange={(e) => setSettings({ ...settings, default_quote_notes: e.target.value })}
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl p-4 text-sm text-white outline-none"
            />
          </div>
        </div>

        {/* Global Save Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={isSaving}
            className="py-3.5 px-8 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-red-900/40 flex items-center space-x-2 active:scale-95"
          >
            {isSaving ? (
              <><Loader2 className="w-4 h-4 animate-spin" /><span>Saving Changes...</span></>
            ) : (
              <><Save className="w-4 h-4" /><span>Save All Settings</span></>
            )}
          </button>
        </div>
      </div>

      {/* SECTION 4: Change Admin Password */}
      <div className="bg-[#0a0a0a] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="border-b border-neutral-800 pb-5">
          <div className="flex items-center space-x-2.5">
            <Key className="w-5 h-5 text-red-500" />
            <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
              Change Admin Password
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Update your private password anytime so nobody else can access your shop management portal.
          </p>
        </div>

        {passSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700 text-emerald-300 text-xs sm:text-sm flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{passSuccess}</span>
          </div>
        )}

        {passError && (
          <div className="p-4 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs sm:text-sm flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{passError}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Current password (default: toby2024)"
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new password"
              className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl px-4 py-3 text-sm text-white outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isChangingPass}
            className="py-3 px-6 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-bold text-xs rounded-xl transition flex items-center space-x-2"
          >
            {isChangingPass ? (
              <><Loader2 className="w-4 h-4 animate-spin text-red-500" /><span>Updating Password...</span></>
            ) : (
              <><Lock className="w-4 h-4 text-red-500" /><span>Update Private Password</span></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
