import React, { useState } from 'react';
import { X, Plus, Wrench, Loader2, Check } from 'lucide-react';
import { quotesApi } from '../../services/api';
import { VEHICLE_MAKES } from '../../data/makesData';

export default function NewOrderModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    make: 'Ford',
    modelAndYear: '',
    serviceCategory: 'Repairs',
    detailedService: 'Brakes',
    details: '',
    timeline: 'As soon as possible',
    needsTowing: false,
    needsShuttle: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.modelAndYear) {
      setError('Please fill in customer name, email, and vehicle model & year.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload = {
        ...formData,
        id: `QUOTE-MANUAL-${Date.now().toString().slice(-4)}`
      };
      const res = await quotesApi.submitPublicQuote(payload);
      if (onCreated) onCreated(res.quote || payload);
      onClose();
    } catch (err) {
      setError(err.data?.error || err.message || 'Failed to create quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-[#0d0d0d] border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-800/50 flex items-center justify-center text-red-500">
              <Plus className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-black font-heading text-white">Record Manual / Walk-In Quote</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-neutral-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Customer Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="First & Last Name"
                className="w-full bg-[#121212] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-red-600"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(520) 000-0000"
                className="w-full bg-[#121212] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">Customer Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="customer@email.com"
              className="w-full bg-[#121212] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-red-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Vehicle Make</label>
              <select
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                className="w-full bg-[#121212] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-red-600"
              >
                {VEHICLE_MAKES.slice(0, 30).map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Model & Year *</label>
              <input
                type="text"
                value={formData.modelAndYear}
                onChange={(e) => setFormData({ ...formData, modelAndYear: e.target.value })}
                placeholder="e.g. 2018 F-250 Diesel"
                className="w-full bg-[#121212] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-red-600"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Category</label>
              <select
                value={formData.serviceCategory}
                onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                className="w-full bg-[#121212] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white outline-none"
              >
                <option value="Diagnosis and inspection">Diagnosis & Inspection</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Repairs">Repairs</option>
                <option value="Custom issue">Custom / Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Service</label>
              <input
                type="text"
                value={formData.detailedService}
                onChange={(e) => setFormData({ ...formData, detailedService: e.target.value })}
                placeholder="e.g. Brakes, Transmission"
                className="w-full bg-[#121212] border border-neutral-800 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">Notes / Symptoms</label>
            <textarea
              rows={2}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Walk-in notes, customer phone notes..."
              className="w-full bg-[#121212] border border-neutral-800 rounded-xl p-3 text-sm text-white outline-none focus:border-red-600"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-neutral-400 hover:text-white text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition flex items-center space-x-1.5"
            >
              {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              <span>Save to Orders</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
