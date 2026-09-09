import React, { useState, useEffect } from 'react';
import { 
  SERVICES, 
  SERVICE_CATEGORIES 
} from '../../data/servicesData';
import { 
  Wrench, 
  Zap, 
  Disc, 
  Wind, 
  ScanEye, 
  SunMedium, 
  PowerOff, 
  Volume2, 
  FileCheck, 
  SquareDashedBottom, 
  ToggleRight, 
  Activity, 
  AlertTriangle, 
  Droplets, 
  Fuel, 
  Gauge, 
  CalendarCheck, 
  Cog, 
  Recycle, 
  ArrowRight, 
  ArrowLeft,
  Search,
  Phone
} from 'lucide-react';
import { BUSINESS_INFO } from '../../data/businessData';

const ICON_MAP = {
  Wrench,
  Zap,
  Disc,
  Wind,
  ScanEye,
  SunMedium,
  PowerOff,
  Volume2,
  FileCheck,
  SquareDashedBottom,
  ToggleRight,
  Activity,
  AlertTriangle,
  Droplets,
  Fuel,
  Gauge,
  CalendarCheck,
  Cog,
  Recycle
};

export default function AllServicesPage({ onOpenWizard, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = selectedCategory === 'All Services' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-black py-10 sm:py-16 px-4 sm:px-6 lg:px-8 pb-28 sm:pb-20 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Back Bar (Bigger text) */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-neutral-800 mb-12">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-neutral-800 hover:border-gray-300 px-5 py-2.5 rounded-xl text-sm sm:text-base font-bold transition shadow-sm"
            aria-label="Back to Homepage"
          >
            <ArrowLeft className="w-5 h-5 text-red-700 dark:text-red-500" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center space-x-3 text-sm sm:text-base">
            <span className="text-gray-500 dark:text-neutral-400 hidden sm:inline">Need quick advice?</span>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="text-gray-900 dark:text-white font-bold hover:text-red-700 dark:hover:text-red-500 flex items-center space-x-1.5 transition"
              aria-label={`Call Toby's Auto: ${BUSINESS_INFO.phone}`}
            >
              <Phone className="w-4 h-4 text-red-700 dark:text-red-500" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Page Header (Bigger typography) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl sm:text-6xl font-black font-heading text-gray-900 dark:text-white tracking-tight">
            All 19 Services
          </h1>
          <p className="text-gray-600 dark:text-neutral-400 mt-4 text-base sm:text-xl leading-relaxed">
            Click any service to launch your personalized quote request or estimate.
          </p>
        </div>

        {/* Filter Bar & Search (Midnight black cards) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mb-12 bg-white dark:bg-[#0c0c0c] p-5 rounded-3xl border border-gray-200 dark:border-neutral-800 shadow-sm transition-colors">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-center md:justify-start">
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  selectedCategory === category
                    ? 'bg-red-700 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-[#161616] text-gray-700 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#202020]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-red-500 transition"
              aria-label="Search auto repair services"
            />
          </div>
        </div>

        {/* Count */}
        <div className="flex justify-between items-center text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mb-6 px-1 font-medium">
          <span>Showing {filteredServices.length} of {SERVICES.length} services</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-red-700 dark:text-red-500 underline font-bold"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Services Grid (Midnight black cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.icon] || Wrench;

            return (
              <article
                key={service.id}
                className="group bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-neutral-800 hover:border-red-400 dark:hover:border-red-600 rounded-3xl p-6 sm:p-7 transition-all hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 flex items-center justify-center group-hover:bg-red-700 group-hover:text-white transition-colors">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-gray-100 dark:bg-[#161616] text-gray-600 dark:text-neutral-300">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-red-700 dark:group-hover:text-red-500 transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <button
                  onClick={() => onOpenWizard(service.category, service.subType)}
                  className="w-full py-3.5 px-5 rounded-xl bg-gray-50 dark:bg-[#141414] hover:bg-red-700 dark:hover:bg-red-700 text-gray-800 dark:text-neutral-200 hover:text-white dark:hover:text-white border border-gray-200 dark:border-neutral-800 hover:border-red-700 text-sm sm:text-base font-bold transition-all flex items-center justify-between shadow-sm active:scale-95"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1.5 transition-transform" />
                </button>
              </article>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-[#0c0c0c] rounded-3xl border border-gray-200 dark:border-neutral-800 my-8">
            <p className="text-gray-500 dark:text-neutral-400 text-base sm:text-lg mb-4">No services found for "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All Services'); }}
              className="text-sm sm:text-base text-red-700 dark:text-red-500 underline font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner (Midnight black card) */}
        <div className="mt-16 bg-white dark:bg-[#0c0c0c] border border-gray-200 dark:border-neutral-800 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm transition-colors">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white">
              Have a custom repair need?
            </h4>
            <p className="text-gray-600 dark:text-neutral-400 text-base sm:text-lg">
              We handle fleet repairs, custom diesel upgrades, trailer electrical, and specialty diagnostic cases.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onOpenWizard('Custom issue', 'Custom')}
              className="px-8 py-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base transition-all shadow-md active:scale-95 text-center"
              aria-label="Describe custom repair issue"
            >
              Start Custom Quote
            </button>
            <button
              onClick={onBackToHome}
              className="px-6 py-4 rounded-xl bg-gray-100 dark:bg-[#161616] hover:bg-gray-200 dark:hover:bg-[#202020] text-gray-800 dark:text-neutral-200 font-bold text-base transition text-center border border-transparent dark:border-neutral-800"
              aria-label="Navigate back to homepage"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
