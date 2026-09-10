import React, { useState } from 'react';
import { 
  Wrench, Settings, ClipboardList, LogOut, 
  ExternalLink, ShieldCheck, MessageSquare
} from 'lucide-react';
import OrdersView from './OrdersView';
import AdminSettings from './AdminSettings';
import InboxView from './InboxView';
import QuoteDetailModal from './QuoteDetailModal';
import { authApi } from '../../services/api';

export default function AdminLayout({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('inbox'); // 'inbox' | 'orders' | 'settings'
  const [modalQuote, setModalQuote] = useState(null);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Admin Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#080808]/95 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Left: Brand & Title */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-10 h-10 rounded-xl bg-red-950/70 border border-red-800/60 flex items-center justify-center text-red-500 shadow-md">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="font-heading font-black text-base sm:text-lg tracking-tight text-white">
                    Toby's Auto Mechanic
                  </h1>
                  <span className="hidden sm:inline-block bg-red-950/80 text-red-400 border border-red-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Admin Portal
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[11px] text-neutral-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SQLite Backend Active</span>
                  <span>•</span>
                  <span>Casa Grande, AZ</span>
                </div>
              </div>
            </div>

            {/* Middle: Tab Switcher (Desktop) */}
            <div className="hidden md:flex items-center bg-[#121212] border border-neutral-800 rounded-2xl p-1">
              <button
                onClick={() => setActiveTab('inbox')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  activeTab === 'inbox'
                    ? 'bg-red-700 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Customer Inbox</span>
              </button>

              <button
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  activeTab === 'orders'
                    ? 'bg-red-700 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <ClipboardList className="w-4 h-4" />
                <span>Orders Table</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-4 rounded-xl text-xs font-bold transition flex items-center space-x-2 ${
                  activeTab === 'settings'
                    ? 'bg-red-700 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings & Automations</span>
              </button>
            </div>

            {/* Right: User & Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={onBackToSite}
                className="hidden sm:inline-flex items-center space-x-1 text-xs text-neutral-400 hover:text-white bg-[#121212] hover:bg-neutral-900 border border-neutral-800 px-3 py-2 rounded-xl transition"
              >
                <span>View Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
              </button>

              <button
                onClick={handleLogout}
                className="p-2 sm:px-3 sm:py-2 text-xs text-neutral-400 hover:text-red-400 bg-[#121212] hover:bg-neutral-900 border border-neutral-800 rounded-xl transition flex items-center space-x-1.5"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden border-t border-neutral-800/80 bg-[#0c0c0c] px-3 py-2 gap-1">
          <button
            onClick={() => setActiveTab('inbox')}
            className={`flex-1 py-2 text-[11px] font-bold text-center rounded-xl transition flex items-center justify-center space-x-1 ${
              activeTab === 'inbox' ? 'bg-red-700 text-white' : 'text-neutral-400'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Inbox</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 text-[11px] font-bold text-center rounded-xl transition flex items-center justify-center space-x-1 ${
              activeTab === 'orders' ? 'bg-red-700 text-white' : 'text-neutral-400'
            }`}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            <span>Orders</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 text-[11px] font-bold text-center rounded-xl transition flex items-center justify-center space-x-1 ${
              activeTab === 'settings' ? 'bg-red-700 text-white' : 'text-neutral-400'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Settings</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'inbox' && (
          <InboxView onOpenFullQuote={(q) => setModalQuote(q)} />
        )}
        {activeTab === 'orders' && <OrdersView />}
        {activeTab === 'settings' && <AdminSettings />}
      </main>

      {/* Optional Full Quote Studio Modal if triggered from Inbox */}
      {modalQuote && (
        <QuoteDetailModal
          quote={modalQuote}
          onClose={() => setModalQuote(null)}
          onUpdate={(updated) => setModalQuote(updated)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-[#050505] py-4 text-center text-xs text-neutral-600">
        Toby's Auto Mechanic Management Portal • Casa Grande, AZ • Production Node + SQLite
      </footer>
    </div>
  );
}
