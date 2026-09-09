import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Truck, 
  Bus, 
  MapPin, 
  Mail, 
  User, 
  Phone, 
  AlertCircle, 
  Loader2,
  Search,
  CheckCircle2
} from 'lucide-react';
import { VEHICLE_MAKES } from '../../data/makesData';
import { submitQuoteRequest } from '../../services/quoteService';

export default function QuoteWizardModal({ isOpen, onClose, initialCategory = null, initialService = null }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const [formData, setFormData] = useState({
    serviceCategory: 'Diagnosis and inspection',
    detailedService: 'General diagnosis',
    engineType: '',
    customIssue: '',
    needsTowing: false,
    needsShuttle: false,
    make: '',
    modelAndYear: '',
    details: '',
    timeline: 'As soon as possible',
    specificDate: '',
    location: '',
    isDetectingLocation: false,
    email: '',
    name: '',
    phone: '',
  });

  const [makeFilter, setMakeFilter] = useState('');
  const [isMakeDropdownOpen, setIsMakeDropdownOpen] = useState(false);
  const makeDropdownRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (initialCategory) {
        setFormData(prev => ({
          ...prev,
          serviceCategory: initialCategory,
          detailedService: initialService || (
            initialCategory === 'Diagnosis and inspection' ? 'General diagnosis' :
            initialCategory === 'Maintenance' ? 'Oil change' : 'Brakes'
          )
        }));
      }
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => {
        setCurrentStep(1);
        setSubmissionResult(null);
        setErrorMsg('');
      }, 300);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen, initialCategory, initialService]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (makeDropdownRef.current && !makeDropdownRef.current.contains(e.target)) {
        setIsMakeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const diagnosisOptions = [
    'Battery testing', 'Check engine light', 'Engine oil light diagnosis',
    'General diagnosis', 'No start diagnosis', 'Noise diagnosis',
    'Pre-purchase inspection', 'Smog check', 'Tire pressure monitor lamp diagnosis',
    'Transmission leak inspection', 'Vibration diagnosis', 'Not sure', 'Other'
  ];

  const maintenanceOptions = [
    'Battery and fluid recycling', 'Fluids and filters', 'Fuel system cleaning',
    'Oil change', 'Routine maintenance', 'Wheel alignment', 'Not sure', 'Other'
  ];

  const repairsOptions = [
    'Engine', 'Brakes', 'Battery and electric system',
    'Heating and air conditioning system', 'Steering and suspension',
    'Transmission', 'Exhaust system', 'Wheels and tires',
    'Windows and mirrors', 'Lights', 'Not sure', 'Other'
  ];

  const engineSubTypes = [
    'Diesel engine', 'Electric engine', 'Gas-powered engine',
    'Hybrid engine', 'Not sure', 'Other'
  ];

  const handleDetectLocation = () => {
    setFormData(prev => ({ ...prev, isDetectingLocation: true }));
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await res.json();
            const locationStr = data.address?.city || data.address?.town || data.address?.county || 'Casa Grande area, AZ';
            setFormData(prev => ({ ...prev, location: `${locationStr} (detected near ${latitude.toFixed(2)}, ${longitude.toFixed(2)})`, isDetectingLocation: false }));
          } catch {
            setFormData(prev => ({ ...prev, location: `Casa Grande area, AZ (${latitude.toFixed(3)}, ${longitude.toFixed(3)})`, isDetectingLocation: false }));
          }
        },
        () => {
          setFormData(prev => ({ ...prev, location: 'Casa Grande, AZ 85122', isDetectingLocation: false }));
        },
        { timeout: 8000 }
      );
    } else {
      setFormData(prev => ({ ...prev, location: 'Casa Grande, AZ 85122', isDetectingLocation: false }));
    }
  };

  const handleNext = () => {
    setErrorMsg('');

    if (currentStep === 1 && formData.serviceCategory === 'Custom issue') {
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2 && formData.serviceCategory === 'Custom issue' && !formData.customIssue.trim()) {
      setErrorMsg('Please describe your issue so we can help you.');
      return;
    }

    if (currentStep === 2 && formData.serviceCategory === 'Repairs' && formData.detailedService === 'Engine' && !formData.engineType) {
      setErrorMsg('Please specify your engine type.');
      return;
    }

    if (currentStep === 5 && !formData.make) {
      setErrorMsg('Please select or enter your vehicle make.');
      return;
    }

    if (currentStep === 6 && !formData.modelAndYear.trim()) {
      setErrorMsg('Please enter your vehicle model and year.');
      return;
    }

    if (currentStep === 8 && formData.timeline === 'Specific date(s)' && !formData.specificDate) {
      setErrorMsg('Please pick a preferred date.');
      return;
    }

    if (currentStep === 10) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
    }

    if (currentStep === 11 && !formData.name.trim()) {
      setErrorMsg('Please enter your first name.');
      return;
    }

    if (currentStep === 12) {
      handleSubmit();
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setErrorMsg('');
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitQuoteRequest(formData);
      setSubmissionResult(result);
      setCurrentStep(13);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again or call us at (520) 836-6921.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredMakes = VEHICLE_MAKES.filter(m => m.toLowerCase().includes(makeFilter.toLowerCase()));
  const progressPercentage = Math.min(100, Math.round(((currentStep - 1) / 11) * 100));

  // Pill Option Component
  const PillOption = ({ selected, onClick, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-5 py-2.5 rounded-full border text-sm sm:text-base font-semibold transition-all flex items-center space-x-2 ${
        selected
          ? 'bg-red-50 dark:bg-red-950/60 border-red-500 text-red-700 dark:text-red-400 shadow-sm'
          : 'bg-white dark:bg-[#121212] border-gray-200 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 hover:border-gray-400 dark:hover:border-neutral-700'
      }`}
    >
      {selected && <Check className="w-4 h-4 text-red-600 dark:text-red-400" />}
      <span>{children}</span>
    </button>
  );

  // Card Option Component
  const CardOption = ({ selected, onClick, label, desc }) => (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 sm:p-5 rounded-2xl border text-left transition-all w-full flex items-center justify-between ${
        selected
          ? 'bg-red-50 dark:bg-red-950/50 border-red-500 shadow-sm'
          : 'bg-white dark:bg-[#0d0d0d] border-gray-200 dark:border-neutral-800 hover:border-gray-300 dark:hover:border-neutral-700'
      }`}
    >
      <div>
        <div className={`font-bold text-base sm:text-lg ${selected ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{label}</div>
        {desc && <div className="text-xs sm:text-sm text-gray-500 dark:text-neutral-400 mt-1">{desc}</div>}
      </div>
      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ml-3.5 ${
        selected ? 'border-red-500 bg-red-600' : 'border-gray-300 dark:border-neutral-700'
      }`}>
        {selected && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
    </button>
  );

  // Step Header Component
  const StepHeader = ({ step, title, subtitle }) => (
    <div className="mb-6">
      <span className="text-red-600 dark:text-red-500 text-xs sm:text-sm font-bold tracking-wide uppercase">Step {step} of 12</span>
      <div className="w-full bg-gray-100 dark:bg-[#1a1a1a] h-2 rounded-full mt-2 mb-4 overflow-hidden">
        <div
          className="bg-red-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${Math.max(5, progressPercentage)}%` }}
        />
      </div>
      <h3 className="text-2xl sm:text-3xl font-black font-heading text-gray-900 dark:text-white leading-tight">
        {title}
      </h3>
      {subtitle && <p className="text-gray-500 dark:text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">{subtitle}</p>}
    </div>
  );

  const inputClass = "w-full bg-white dark:bg-[#080808] border border-gray-200 dark:border-neutral-800 rounded-2xl px-5 py-3.5 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 dark:focus:ring-red-900 transition";
  const inputWithIconClass = "w-full bg-white dark:bg-[#080808] border border-gray-200 dark:border-neutral-800 rounded-2xl pl-12 pr-5 py-3.5 text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-neutral-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-200 dark:focus:ring-red-900 transition";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden my-auto border border-gray-100 dark:border-neutral-800 max-h-[92vh] flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 sm:py-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-stone-50/50 dark:bg-[#050505]">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Toby's Auto Mechanic Logo" 
              width="112"
              height="28"
              decoding="async"
              className="h-8 w-auto object-contain brightness-100 dark:brightness-150" 
            />
            <div>
              <span className="font-heading font-black text-sm sm:text-base text-gray-900 dark:text-white block">
                Quote Request
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {currentStep <= 12 ? `Step ${currentStep} of 12` : 'Complete'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Close quote modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body with larger text and dark mode */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto min-h-0 flex flex-col justify-between">
          <div>
            {/* Error message */}
            {errorMsg && (
              <div className="mb-5 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm flex items-center space-x-2.5">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* STEP 1: Service Category */}
            {currentStep === 1 && (
              <div>
                <StepHeader step={1} title="What type of service do you need?" subtitle="Select the category that best fits your vehicle's current needs." />
                <div className="space-y-3">
                  {[
                    { id: 'Diagnosis and inspection', label: 'Diagnosis & Inspection', desc: 'Check engine lights, sounds, leaks, pre-buy checkups' },
                    { id: 'Maintenance', label: 'Maintenance', desc: 'Oil changes, fluids, fuel system, tune-ups' },
                    { id: 'Repairs', label: 'Repairs', desc: 'Brakes, engine, A/C, electrical, transmission' },
                    { id: 'Custom issue', label: 'Describe My Issue', desc: "My issue isn't listed — I'll describe it in my own words" },
                  ].map((cat) => (
                    <CardOption
                      key={cat.id}
                      selected={formData.serviceCategory === cat.id}
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        serviceCategory: cat.id,
                        detailedService: cat.id === 'Diagnosis and inspection' ? 'General diagnosis' :
                                         cat.id === 'Maintenance' ? 'Oil change' :
                                         cat.id === 'Repairs' ? 'Brakes' : 'Custom'
                      }))}
                      label={cat.label}
                      desc={cat.desc}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Sub-Service OR Custom Issue */}
            {currentStep === 2 && (
              <div>
                {formData.serviceCategory === 'Custom issue' ? (
                  <>
                    <StepHeader step={2} title="Describe your issue" subtitle="Tell us what's going on with your vehicle and we'll figure out the best service." />
                    <textarea
                      rows={5}
                      placeholder="e.g. My car makes a grinding noise when I brake, the A/C blows warm air, there's a leak under the engine..."
                      value={formData.customIssue}
                      onChange={(e) => setFormData(prev => ({ ...prev, customIssue: e.target.value }))}
                      className={inputClass}
                      autoFocus
                    />
                  </>
                ) : (
                  <>
                    <StepHeader
                      step={2}
                      title={
                        formData.serviceCategory === 'Diagnosis and inspection' ? 'What type of diagnosis?' :
                        formData.serviceCategory === 'Maintenance' ? 'What type of maintenance?' :
                        'What needs to be repaired?'
                      }
                      subtitle="Select the option that best describes your situation."
                    />

                    {/* Options as pills */}
                    <div className="flex flex-wrap gap-2.5 max-h-60 overflow-y-auto pr-1">
                      {(formData.serviceCategory === 'Diagnosis and inspection' ? diagnosisOptions :
                        formData.serviceCategory === 'Maintenance' ? maintenanceOptions : repairsOptions
                      ).map(opt => (
                        <PillOption
                          key={opt}
                          selected={formData.detailedService === opt}
                          onClick={() => setFormData(prev => ({ ...prev, detailedService: opt }))}
                        >
                          {opt}
                        </PillOption>
                      ))}
                    </div>

                    {/* Engine sub-type */}
                    {formData.serviceCategory === 'Repairs' && formData.detailedService === 'Engine' && (
                      <div className="pt-5 mt-5 border-t border-gray-100 dark:border-gray-700">
                        <label className="block text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2.5">
                          What type of engine?
                        </label>
                        <div className="flex flex-wrap gap-2.5">
                          {engineSubTypes.map(engine => (
                            <PillOption
                              key={engine}
                              selected={formData.engineType === engine}
                              onClick={() => setFormData(prev => ({ ...prev, engineType: engine }))}
                            >
                              {engine}
                            </PillOption>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* STEP 3: Towing */}
            {currentStep === 3 && (
              <div>
                <StepHeader step={3} title="Do you need towing?" subtitle="Is your vehicle immobilized or unsafe to drive to our shop?" />
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {[
                    { val: true, label: 'Yes', desc: 'I need a tow' },
                    { val: false, label: 'No', desc: "I'll bring it in" }
                  ].map((option) => (
                    <button
                      key={String(option.val)}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, needsTowing: option.val }))}
                      className={`p-6 sm:p-8 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-2.5 ${
                        formData.needsTowing === option.val
                          ? 'bg-red-50 dark:bg-red-950/40 border-red-500 shadow-sm'
                          : 'bg-white dark:bg-[#181b22] border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <Truck className={`w-8 h-8 sm:w-10 sm:h-10 ${formData.needsTowing === option.val ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`} />
                      <span className={`font-black text-xl sm:text-2xl ${formData.needsTowing === option.val ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{option.label}</span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{option.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Shuttle */}
            {currentStep === 4 && (
              <div>
                <StepHeader step={4} title="Need a shuttle ride?" subtitle="We offer free local rides home or to work while your car is serviced." />
                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {[
                    { val: true, label: 'Yes', desc: 'Free local ride' },
                    { val: false, label: 'No', desc: "I'll wait or have a ride" }
                  ].map((option) => (
                    <button
                      key={String(option.val)}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, needsShuttle: option.val }))}
                      className={`p-6 sm:p-8 rounded-2xl border text-center transition flex flex-col items-center justify-center space-y-2.5 ${
                        formData.needsShuttle === option.val
                          ? 'bg-red-50 dark:bg-red-950/40 border-red-500 shadow-sm'
                          : 'bg-white dark:bg-[#181b22] border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <Bus className={`w-8 h-8 sm:w-10 sm:h-10 ${formData.needsShuttle === option.val ? 'text-red-600 dark:text-red-400' : 'text-gray-400'}`} />
                      <span className={`font-black text-xl sm:text-2xl ${formData.needsShuttle === option.val ? 'text-red-700 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>{option.label}</span>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{option.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: Vehicle Make */}
            {currentStep === 5 && (
              <div>
                <StepHeader step={5} title="What make is your vehicle?" subtitle="Type to search or pick from popular Arizona trucks and cars." />
                <div className="relative" ref={makeDropdownRef}>
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Ford, Ram, Toyota, Chevy..."
                      value={formData.make || makeFilter}
                      onChange={(e) => {
                        setMakeFilter(e.target.value);
                        setFormData(prev => ({ ...prev, make: e.target.value }));
                        setIsMakeDropdownOpen(true);
                      }}
                      onFocus={() => setIsMakeDropdownOpen(true)}
                      className={inputWithIconClass}
                    />
                  </div>

                  {isMakeDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1c2028] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl max-h-52 overflow-y-auto z-30">
                      {filteredMakes.length > 0 ? (
                        filteredMakes.map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, make: m }));
                              setMakeFilter(m);
                              setIsMakeDropdownOpen(false);
                            }}
                            className={`w-full text-left px-5 py-3 text-sm sm:text-base hover:bg-red-50 dark:hover:bg-red-950/40 transition flex justify-between items-center ${
                              formData.make === m ? 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-400 font-bold' : 'text-gray-800 dark:text-gray-200'
                            }`}
                          >
                            <span>{m}</span>
                            {formData.make === m && <Check className="w-4 h-4 text-red-600 dark:text-red-400" />}
                          </button>
                        ))
                      ) : (
                        <div className="px-5 py-3.5 text-sm text-gray-400">
                          Press next to use "{formData.make}"
                        </div>
                      )}
                    </div>
                  )}

                  {/* Popular picks */}
                  <div className="mt-5">
                    <span className="text-xs sm:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2.5">Common Makes:</span>
                    <div className="flex flex-wrap gap-2.5">
                      {['Ram', 'Ford', 'Chevrolet', 'GMC', 'Toyota', 'Honda', 'Jeep'].map((quickMake) => (
                        <PillOption
                          key={quickMake}
                          selected={formData.make === quickMake}
                          onClick={() => {
                            setFormData(prev => ({ ...prev, make: quickMake }));
                            setMakeFilter(quickMake);
                          }}
                        >
                          {quickMake}
                        </PillOption>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Model and Year */}
            {currentStep === 6 && (
              <div>
                <StepHeader step={6} title="Vehicle model and year?" subtitle="e.g. 2019 Ram 2500 Cummins or 2015 Honda Civic" />
                <textarea
                  rows={3}
                  placeholder="Enter your vehicle year and model..."
                  value={formData.modelAndYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, modelAndYear: e.target.value }))}
                  className={inputClass}
                  autoFocus
                />
              </div>
            )}

            {/* STEP 7: Additional Details */}
            {currentStep === 7 && (
              <div>
                <StepHeader step={7} title="Any details to add?" subtitle="Optional — describe symptoms, sounds, warning lights, or past repairs." />
                <textarea
                  rows={4}
                  placeholder="e.g. Squeaking noise when turning left, check engine code P0420, happens after 10 minutes of driving..."
                  value={formData.details}
                  onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
                  className={inputClass}
                />
              </div>
            )}

            {/* STEP 8: Timeline */}
            {currentStep === 8 && (
              <div>
                <StepHeader step={8} title="When do you need this?" subtitle="Helps us prioritize scheduling and bay availability." />
                <div className="space-y-3">
                  {[
                    { id: 'As soon as possible', label: 'As soon as possible', desc: 'Urgent repair or breakdown' },
                    { id: "I'm flexible", label: "I'm flexible", desc: 'Any day in the next 1-2 weeks' },
                    { id: 'Specific date(s)', label: 'Specific date(s)', desc: 'I have a specific day in mind' },
                  ].map((timeOpt) => (
                    <CardOption
                      key={timeOpt.id}
                      selected={formData.timeline === timeOpt.id}
                      onClick={() => setFormData(prev => ({ ...prev, timeline: timeOpt.id }))}
                      label={timeOpt.label}
                      desc={timeOpt.desc}
                    />
                  ))}
                </div>

                {formData.timeline === 'Specific date(s)' && (
                  <div className="pt-4">
                    <label className="block text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2">Preferred appointment date:</label>
                    <input
                      type="date"
                      value={formData.specificDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, specificDate: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                )}
              </div>
            )}

            {/* STEP 9: Location */}
            {currentStep === 9 && (
              <div>
                <StepHeader step={9} title="Where do you need service?" subtitle="For local shuttle or towing calculations." />
                <div className="space-y-4">
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="City, zip, or neighborhood..."
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className={inputWithIconClass}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleDetectLocation}
                    disabled={formData.isDetectingLocation}
                    className="w-full py-3 px-5 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 text-sm font-semibold transition flex items-center justify-center space-x-2"
                  >
                    {formData.isDetectingLocation ? (
                      <><Loader2 className="w-4 h-4 animate-spin text-red-600" /><span>Detecting location via GPS...</span></>
                    ) : (
                      <><MapPin className="w-4 h-4 text-red-600 dark:text-red-400" /><span>Auto-Detect My Current Location</span></>
                    )}
                  </button>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {['Casa Grande, AZ', 'Eloy, AZ', 'Coolidge, AZ', 'Maricopa, AZ'].map((city) => (
                      <PillOption
                        key={city}
                        selected={formData.location === city}
                        onClick={() => setFormData(prev => ({ ...prev, location: city }))}
                      >
                        {city}
                      </PillOption>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 10: Email */}
            {currentStep === 10 && (
              <div>
                <StepHeader step={10} title="Where should we send your quote?" subtitle="We'll email you a transparent quote breakdown and turnaround estimate." />
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={inputWithIconClass}
                    autoFocus
                  />
                </div>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-3">🔒 We will never share your email with third parties.</p>
              </div>
            )}

            {/* STEP 11: Name */}
            {currentStep === 11 && (
              <div>
                <StepHeader step={11} title="What is your name?" subtitle="Who should Toby address the quote and repair breakdown to?" />
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Your first name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={inputWithIconClass}
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* STEP 12: Phone */}
            {currentStep === 12 && (
              <div>
                <StepHeader step={12} title="Phone number" subtitle="Recommended for quick quote text updates or technician follow-up." />
                <div className="relative">
                  <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="(520) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className={inputWithIconClass}
                    autoFocus
                  />
                </div>
                <div className="mt-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-xs sm:text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div className="font-bold text-gray-900 dark:text-white">Get texts & status updates</div>
                  <p>Receive direct updates about your repair from Toby's mechanic team.</p>
                  <p className="text-[11px] text-gray-400">Standard message and data rates may apply.</p>
                </div>
              </div>
            )}

            {/* STEP 13: Success */}
            {currentStep === 13 && submissionResult && (
              <div className="text-center py-6 space-y-6">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-green-50 dark:bg-green-950/50 border-2 border-green-300 dark:border-green-600 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-12 h-12" />
                </div>

                <div>
                  <span className="text-green-600 dark:text-green-400 text-xs sm:text-sm font-bold uppercase tracking-wider">
                    Quote Request #{submissionResult.quoteId}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black font-heading text-gray-900 dark:text-white mt-1.5">
                    Thank You, {formData.name || 'Friend'}!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg max-w-md mx-auto mt-2 leading-relaxed">
                    We've received your repair request for your <strong className="text-gray-900 dark:text-white font-bold">{formData.make} ({formData.modelAndYear})</strong>.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 text-left text-sm space-y-2.5 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">Service:</span>
                    <span className="text-gray-900 dark:text-white font-bold">
                      {formData.serviceCategory === 'Custom issue' ? 'Custom Issue' : formData.detailedService}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">Category:</span>
                    <span className="text-gray-900 dark:text-white">{formData.serviceCategory}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                    <span className="text-gray-500 dark:text-gray-400">Towing Needed:</span>
                    <span className="text-gray-900 dark:text-white">{formData.needsTowing ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Quote sent to:</span>
                    <span className="text-red-700 dark:text-red-400 font-bold">{formData.email}</span>
                  </div>
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Need immediate roadside help? Call Toby directly at{' '}
                  <a href="tel:5208366921" className="text-red-700 dark:text-red-400 font-bold underline">(520) 836-6921</a>.
                </p>

                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-10 py-4 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base shadow-md transition"
                  >
                    Done & Return to Site
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation — Back / Next with larger buttons */}
          {currentStep <= 12 && (
            <div className="pt-6 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between mt-5">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-[#141414] hover:bg-gray-200 dark:hover:bg-[#1f1f1f] text-gray-800 dark:text-neutral-200 text-base font-bold flex items-center space-x-1.5 transition active:scale-95 border border-transparent dark:border-neutral-800"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="px-8 py-3.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-base flex items-center space-x-2 transition shadow-md active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /><span>Submitting...</span></>
                ) : currentStep === 12 ? (
                  <><span>Submit Free Quote</span><Check className="w-5 h-5" /></>
                ) : (
                  <><span>Next</span><ChevronRight className="w-5 h-5" /></>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
