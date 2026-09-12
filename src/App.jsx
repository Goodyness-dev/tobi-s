import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import ServicesSection from './components/home/ServicesSection';
import SedationSection from './components/home/SedationSection';
import AboutSection from './components/home/AboutSection';
import InsuranceSection from './components/home/InsuranceSection';
import ReviewsSection from './components/home/ReviewsSection';
import LocationHoursSection from './components/home/LocationHoursSection';
import Footer from './components/layout/Footer';

// Dedicated Subpages & Procedure Detail
import AllProceduresPage from './components/procedures/AllProceduresPage';
import ProcedureDetailPage from './components/procedures/ProcedureDetailPage';
import AboutPage from './components/pages/AboutPage';
import PatientInfoPage from './components/pages/PatientInfoPage';
import ReferringDoctorsPage from './components/pages/ReferringDoctorsPage';

// Modal & Admin Portal
import QuoteWizardModal from './components/wizard/QuoteWizardModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';

import { PROCEDURES, getProcedureBySlug } from './data/servicesData';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentProcedureSlug, setCurrentProcedureSlug] = useState('dental-implants');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardProcedure, setWizardProcedure] = useState(null);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Theme state (persisted)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('mm_theme');
      if (saved) return saved === 'dark';
      return false; // Default to serene clean daylight mode
    } catch {
      return false;
    }
  });

  // Verify Admin session on mount
  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      authApi.verify()
        .then(res => {
          if (res.authenticated) {
            setIsAdminAuthenticated(true);
            setAdminUser(res.user);
          }
        })
        .catch(() => {
          setIsAdminAuthenticated(false);
        });
    }
  }, []);

  // Sync dark mode class on root
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode || currentPage === 'admin') {
      root.classList.add('dark');
      document.body.classList.add('dark');
      if (currentPage !== 'admin') {
        localStorage.setItem('mm_theme', 'dark');
      }
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('mm_theme', 'light');
    }
  }, [darkMode, currentPage]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Hash-based URL router
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '';
      
      if (hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (hash === '#/about' || hash === '#about') {
        setCurrentPage('about');
      } else if (hash === '#/patient-info' || hash === '#patient-info') {
        setCurrentPage('patient-info');
      } else if (hash === '#/referring-doctors' || hash === '#referring-doctors') {
        setCurrentPage('referring-doctors');
      } else if (hash === '#/procedures' || hash === '#procedures') {
        setCurrentPage('procedures');
      } else if (hash.startsWith('#/procedures/') || hash.startsWith('#procedure-')) {
        const slug = hash.replace('#/procedures/', '').replace('#procedure-', '');
        setCurrentProcedureSlug(slug);
        setCurrentPage('procedure-detail');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    if (page === 'home') {
      window.location.hash = '#/';
    } else if (page === 'procedures') {
      window.location.hash = '#/procedures';
    } else if (page === 'about') {
      window.location.hash = '#/about';
    } else if (page === 'patient-info') {
      window.location.hash = '#/patient-info';
    } else if (page === 'referring-doctors') {
      window.location.hash = '#/referring-doctors';
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    } else if (page.startsWith('procedure-')) {
      const slug = page.replace('procedure-', '');
      window.location.hash = `#/procedures/${slug}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = (procedureId = null) => {
    setWizardProcedure(procedureId);
    setWizardOpen(true);
  };

  // If Admin route, render Admin Suite
  if (currentPage === 'admin') {
    return isAdminAuthenticated ? (
      <AdminLayout
        user={adminUser}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    ) : (
      <AdminLogin
        onLoginSuccess={(user) => {
          setIsAdminAuthenticated(true);
          setAdminUser(user);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    );
  }

  // Active procedure object
  const activeProcedure = getProcedureBySlug(currentProcedureSlug) || PROCEDURES[0];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#090d11] text-white' : 'bg-[#fbfbfa] text-slate-900'} flex flex-col font-sans transition-colors duration-200`}>
      {/* Floating Curved Pill Header */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <>
            <Hero 
              onOpenConsultation={handleOpenConsultation} 
              onNavigate={handleNavigate} 
            />
            <ServicesSection 
              onOpenConsultation={handleOpenConsultation} 
              onNavigate={handleNavigate} 
            />
            <SedationSection 
              onOpenConsultation={handleOpenConsultation} 
              onNavigate={handleNavigate} 
            />
            <AboutSection 
              onOpenConsultation={handleOpenConsultation} 
              onNavigate={handleNavigate} 
            />
            <InsuranceSection 
              onNavigate={handleNavigate} 
            />
            <ReviewsSection 
              onOpenConsultation={handleOpenConsultation} 
            />
            <LocationHoursSection 
              onOpenConsultation={handleOpenConsultation} 
            />
          </>
        )}

        {currentPage === 'procedures' && (
          <AllProceduresPage
            onOpenConsultation={handleOpenConsultation}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'procedure-detail' && (
          <ProcedureDetailPage
            procedure={activeProcedure}
            onOpenConsultation={handleOpenConsultation}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenConsultation={handleOpenConsultation}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'patient-info' && (
          <PatientInfoPage
            onOpenConsultation={handleOpenConsultation}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'referring-doctors' && (
          <ReferringDoctorsPage
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Practice Footer */}
      <Footer
        onOpenConsultation={handleOpenConsultation}
        onNavigate={handleNavigate}
      />

      {/* Consultation Request Wizard Modal */}
      <QuoteWizardModal
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        initialProcedure={wizardProcedure}
      />

      {/* Sticky Mobile Quick Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden ${darkMode ? 'bg-[#090d11]/95 border-slate-800' : 'bg-white/95 border-slate-200'} backdrop-blur-md border-t p-2.5 flex items-center gap-2.5 shadow-2xl`}>
        <a
          href={`tel:${BUSINESS_INFO.phone.replace(/[^0-9]/g, '')}`}
          className={`flex-1 py-3 px-3 rounded-xl ${darkMode ? 'bg-slate-900 text-white border-slate-800' : 'bg-slate-100 text-slate-900 border-slate-200'} font-bold text-xs flex items-center justify-center gap-2 border active:scale-95 transition`}
        >
          <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call {BUSINESS_INFO.phone}</span>
        </a>
        <button
          onClick={() => handleOpenConsultation()}
          className="flex-1 py-3 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
        >
          <span>Book Consult</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
