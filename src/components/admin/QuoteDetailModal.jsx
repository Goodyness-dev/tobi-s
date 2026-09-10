import React, { useState } from 'react';
import { 
  X, Phone, Mail, MapPin, Calendar, Clock, Truck, Bus, 
  CheckCircle2, Send, AlertCircle, Loader2, DollarSign, 
  ShieldCheck, Wrench, Trash2, ArrowUpRight, Check
} from 'lucide-react';
import { quotesApi } from '../../services/api';

export default function QuoteDetailModal({ quote, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('quote_studio'); // 'quote_studio' | 'full_details'
  const [status, setStatus] = useState(quote.status || 'pending');
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Quote Studio State
  const [price, setPrice] = useState(quote.quotedPrice || '');
  const [turnaround, setTurnaround] = useState(quote.estimatedTurnaround || 'Same day drop-off / 1-2 days');
  const [warranty, setWarranty] = useState(quote.warrantyNote || '12-month / 12,000-mile parts & labor warranty');
  const [message, setMessage] = useState(
    quote.adminMessage || 
    `Hi ${quote.name}, thanks for reaching out to Toby's Auto Mechanic! I reviewed your repair request and we have bays ready for your ${quote.make} ${quote.modelAndYear}. Give us a call or reply to lock in your drop-off time.`
  );
  
  const [isSendingQuote, setIsSendingQuote] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  if (!quote) return null;

  const handleStatusChange = async (newStatus) => {
    setIsUpdatingStatus(true);
    try {
      const updated = await quotesApi.updateStatus(quote.id, newStatus);
      setStatus(newStatus);
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleSendQuote = async (e) => {
    e.preventDefault();
    if (!price.trim()) {
      setSendError('Please enter a quote price before sending.');
      return;
    }

    setIsSendingQuote(true);
    setSendError('');
    setSendSuccess(false);

    try {
      const result = await quotesApi.sendQuote(quote.id, {
        price,
        turnaround,
        warranty,
        message
      });

      setSendSuccess(true);
      setStatus('quoted');
      if (onUpdate && result.quote) {
        onUpdate(result.quote);
      }
    } catch (err) {
      setSendError(err.data?.error || err.message || 'Failed to send quote email.');
    } finally {
      setIsSendingQuote(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete Quote #${quote.id}?`)) return;
    setIsDeleting(true);
    try {
      await quotesApi.deleteQuote(quote.id);
      if (onUpdate) onUpdate({ ...quote, _deleted: true });
      onClose();
    } catch (err) {
      alert('Error deleting quote: ' + err.message);
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#0d0d0d] border border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 bg-[#0a0a0a]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-500">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/50">
                  #{quote.id}
                </span>
                <span className="text-sm text-neutral-400">
                  {new Date(quote.createdAt).toLocaleDateString()} at {new Date(quote.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-heading text-white">
                {quote.name} — {quote.make} {quote.modelAndYear}
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            {/* Status Selector */}
            <select
              value={status}
              disabled={isUpdatingStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition outline-none cursor-pointer ${
                status === 'pending' ? 'bg-amber-950/40 text-amber-400 border-amber-800' :
                status === 'quoted' ? 'bg-blue-950/40 text-blue-400 border-blue-800' :
                status === 'completed' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800' :
                'bg-neutral-900 text-neutral-400 border-neutral-800'
              }`}
            >
              <option value="pending">⏳ Pending (Needs Quote)</option>
              <option value="in_review">🔍 In Review</option>
              <option value="quoted">📧 Quoted (Sent to Customer)</option>
              <option value="completed">✅ Completed Repair</option>
              <option value="archived">📦 Archived</option>
            </select>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Contact & Info Bar */}
        <div className="px-6 py-3 bg-[#111111] border-b border-neutral-800/80 flex flex-wrap items-center gap-4 text-xs text-neutral-300">
          <a 
            href={`tel:${quote.phone?.replace(/[^0-9]/g, '')}`}
            className="flex items-center space-x-1.5 hover:text-white text-neutral-300 bg-neutral-900/80 px-2.5 py-1.5 rounded-lg border border-neutral-800 transition"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>{quote.phone || 'No Phone'}</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-500" />
          </a>

          <a 
            href={`mailto:${quote.email}`}
            className="flex items-center space-x-1.5 hover:text-white text-neutral-300 bg-neutral-900/80 px-2.5 py-1.5 rounded-lg border border-neutral-800 transition"
          >
            <Mail className="w-3.5 h-3.5 text-red-500" />
            <span>{quote.email}</span>
            <ArrowUpRight className="w-3 h-3 text-neutral-500" />
          </a>

          {quote.location && (
            <div className="flex items-center space-x-1.5 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-neutral-500" />
              <span>{quote.location}</span>
            </div>
          )}

          {quote.needsTowing && (
            <span className="bg-red-950/70 text-red-400 border border-red-800 px-2 py-0.5 rounded-full font-bold text-[11px] flex items-center space-x-1">
              <Truck className="w-3 h-3" />
              <span>Towing Needed</span>
            </span>
          )}

          {quote.needsShuttle && (
            <span className="bg-amber-950/70 text-amber-400 border border-amber-800 px-2 py-0.5 rounded-full font-bold text-[11px] flex items-center space-x-1">
              <Bus className="w-3 h-3" />
              <span>Shuttle Requested</span>
            </span>
          )}
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-neutral-800 px-6 bg-[#0a0a0a]">
          <button
            onClick={() => setActiveTab('quote_studio')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'quote_studio'
                ? 'border-red-600 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Send className="w-4 h-4 text-red-500" />
            <span>Send Quote to Customer</span>
          </button>
          <button
            onClick={() => setActiveTab('full_details')}
            className={`py-3 px-4 font-bold text-sm border-b-2 transition flex items-center space-x-2 ${
              activeTab === 'full_details'
                ? 'border-red-600 text-white'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Wrench className="w-4 h-4 text-neutral-500" />
            <span>Full Vehicle & Issue Specs</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'quote_studio' ? (
            /* TAB 1: Quote Dispatch Studio */
            <div className="space-y-6">
              {/* Previous Quote Alert Banner */}
              {quote.quotedPrice && (
                <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-800/60 flex items-start space-x-3 text-xs sm:text-sm text-blue-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Previous Quote Sent on {quote.quoteSentAt ? new Date(quote.quoteSentAt).toLocaleString() : 'N/A'}</div>
                    <div>Price: <strong className="text-white">${quote.quotedPrice}</strong> • Turnaround: {quote.estimatedTurnaround || 'N/A'}</div>
                    <div className="text-blue-400/80 text-xs mt-1">You can update the pricing below and re-send anytime.</div>
                  </div>
                </div>
              )}

              {/* Success Banner */}
              {sendSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-700 text-emerald-300 text-sm flex items-center space-x-3 animate-fade-in">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                  <div>
                    <strong className="block text-white">Quote Successfully Dispatched to {quote.email}!</strong>
                    <span>An official branded breakdown email with your estimate has been delivered to the customer.</span>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {sendError && (
                <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800 text-red-300 text-sm flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{sendError}</span>
                </div>
              )}

              <form onSubmit={handleSendQuote} className="space-y-5">
                {/* Price & Turnaround Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Total Quoted Price ($ USD) <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="w-5 h-5 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                        placeholder="e.g. 450.00"
                        className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl pl-10 pr-4 py-3 text-base text-white placeholder-neutral-500 outline-none font-bold font-mono"
                        required
                      />
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1 block">Includes parts, diagnostics, and shop labor.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                      Estimated Turnaround Time
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={turnaround}
                        onChange={(e) => setTurnaround(e.target.value)}
                        placeholder="e.g. Same Day (ready by 4:30 PM) or 1-2 Days"
                        className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1 block">Tells customer when vehicle will be ready.</span>
                  </div>
                </div>

                {/* Warranty Note */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Warranty & Guarantee Coverage
                  </label>
                  <div className="relative">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={warranty}
                      onChange={(e) => setWarranty(e.target.value)}
                      placeholder="e.g. 12-month / 12,000-mile parts & labor warranty"
                      className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-neutral-500 outline-none"
                    />
                  </div>
                </div>

                {/* Personal Message / Note to Customer */}
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                    Toby's Personal Message to Customer
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a custom explanation, recommendations, or deposit instructions..."
                    className="w-full bg-[#121212] border border-neutral-800 focus:border-red-600 rounded-xl p-4 text-sm text-white placeholder-neutral-500 outline-none leading-relaxed"
                  />
                  <span className="text-[11px] text-neutral-500 mt-1 block">
                    This message is prominently highlighted in the customer's quote email.
                  </span>
                </div>

                {/* Action Button */}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-neutral-400">
                    Recipient: <strong className="text-white">{quote.email}</strong>
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingQuote}
                    className="py-3.5 px-6 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition shadow-lg shadow-red-900/40 flex items-center space-x-2 active:scale-95 cursor-pointer"
                  >
                    {isSendingQuote ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Quote Email...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Official Quote to Customer</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* TAB 2: Full Details */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vehicle Specs */}
                <div className="bg-[#121212] border border-neutral-800/80 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Vehicle Specifications</span>
                  <div className="flex justify-between text-sm border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Make:</span>
                    <span className="text-white font-bold">{quote.make}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Model & Year:</span>
                    <span className="text-white font-bold">{quote.modelAndYear}</span>
                  </div>
                  {quote.engineType && (
                    <div className="flex justify-between text-sm border-b border-neutral-800 pb-2">
                      <span className="text-neutral-400">Engine Type:</span>
                      <span className="text-red-400 font-bold">{quote.engineType}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Timeline:</span>
                    <span className="text-white">{quote.timeline} {quote.specificDate ? `(${quote.specificDate})` : ''}</span>
                  </div>
                </div>

                {/* Service Specs */}
                <div className="bg-[#121212] border border-neutral-800/80 rounded-2xl p-5 space-y-3">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Service Requested</span>
                  <div className="flex justify-between text-sm border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Category:</span>
                    <span className="text-white font-bold">{quote.serviceCategory}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Detailed Service:</span>
                    <span className="text-white font-bold">{quote.detailedService}</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-neutral-800 pb-2">
                    <span className="text-neutral-400">Towing Needed:</span>
                    <span className={quote.needsTowing ? 'text-red-400 font-bold' : 'text-neutral-400'}>
                      {quote.needsTowing ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-400">Shuttle Ride:</span>
                    <span className={quote.needsShuttle ? 'text-amber-400 font-bold' : 'text-neutral-400'}>
                      {quote.needsShuttle ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Notes */}
              {quote.details && (
                <div className="bg-[#121212] border border-neutral-800/80 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Customer Symptoms & Notes</span>
                  <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">{quote.details}</p>
                </div>
              )}

              {/* Custom Issue Description if applicable */}
              {quote.customIssue && quote.customIssue !== 'N/A' && (
                <div className="bg-[#121212] border border-red-900/40 rounded-2xl p-5 space-y-2">
                  <span className="text-xs font-bold text-red-400 uppercase tracking-wider block">Custom Issue Explanation</span>
                  <p className="text-sm text-neutral-200 leading-relaxed whitespace-pre-wrap">{quote.customIssue}</p>
                </div>
              )}

              {/* Delete Button */}
              <div className="pt-4 border-t border-neutral-800 flex justify-end">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-xl transition flex items-center space-x-1.5 border border-red-950/50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isDeleting ? 'Deleting...' : 'Delete Quote'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
