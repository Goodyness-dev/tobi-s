export const BUSINESS_INFO = {
  name: "Milano & Mazza Oral and Maxillofacial Surgery",
  shortName: "Milano & Mazza",
  legalName: "Milano & Mazza Oral and Maxillofacial Surgery LLC",
  tagline: "Board-Certified Excellence in Dental Implants & Facial Surgery — Serving Easton & The Lehigh Valley",
  address: {
    street: "1412 Sullivan Trail",
    city: "Easton",
    state: "PA",
    zip: "18040",
    formatted: "1412 Sullivan Trail, Easton, PA 18040",
  },
  phone: "(610) 258-9081",
  fax: "(610) 258-0377",
  website: "milanoandmazzaoralsurgery.com",
  email: "info@milanoandmazzaoralsurgery.com",
  googleMapsLink: "https://www.google.com/maps/dir/?api=1&destination=1412+Sullivan+Trail,+Easton,+PA+18040",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=1412%20Sullivan%20Trail%2C%20Easton%2C%20PA%2018040&t=&z=15&ie=UTF8&iwloc=&output=embed",
  
  hours: [
    { day: "Monday", open: "9:00 AM", close: "5:00 PM", note: "Surgeries & Consultations" },
    { day: "Tuesday", open: "9:00 AM", close: "5:00 PM", note: "Surgeries & Consultations" },
    { day: "Wednesday", open: "9:00 AM", close: "5:00 PM", note: "Surgeries & Consultations" },
    { day: "Thursday", open: "9:00 AM", close: "5:00 PM", note: "Surgeries & Consultations" },
    { day: "Friday", open: "9:00 AM", close: "5:00 PM", note: "Surgeries & Follow-ups" },
    { day: "Saturday", open: "Closed", close: "Closed", note: "Emergency On-Call" },
    { day: "Sunday", open: "Closed", close: "Closed", note: "Emergency On-Call" },
  ],

  serviceAreas: [
    "Easton", "Bethlehem", "Allentown", "Bangor", "Phillipsburg, NJ", "Washington, NJ", "Northampton County", "Lehigh Valley"
  ],

  insurancePartners: [
    { name: "Delta Dental", status: "In-Network Premier", badge: "Preferred" },
    { name: "Blue Cross Dental", status: "In-Network PPO", badge: "In-Network" },
    { name: "Aetna PPO", status: "In-Network", badge: "In-Network" },
    { name: "Cigna Dental", status: "In-Network PPO", badge: "In-Network" },
    { name: "MetLife Dental", status: "In-Network", badge: "In-Network" },
    { name: "Guardian Dental", status: "In-Network", badge: "In-Network" },
    { name: "Medicare / Major Medical", status: "Participating Plans", badge: "Medical Accepted" },
    { name: "CareCredit", status: "0% APR Financing", badge: "Financing" }
  ],

  surgeons: [
    {
      id: "dr-milano",
      name: "Dr. Carl J. Milano, D.M.D.",
      role: "Oral & Maxillofacial Surgeon",
      credentials: "D.M.D. • Fellow, American Association of Oral & Maxillofacial Surgeons (AAOMS)",
      bio: "Dr. Carl J. Milano is a premier oral and maxillofacial surgeon serving Easton and the greater Lehigh Valley for over 25 years. Following dental school graduation, Dr. Milano completed intensive hospital-based surgical and general anesthesia residency training. He specializes in advanced dental implant surgery, sinus augmentations, complex bone regeneration, and corrective orthognathic jaw reconstruction. Dr. Milano is dedicated to providing surgical precision with a compassionate, anxiety-free bedside manner.",
      specialties: ["Dental Implants & All-on-X", "Complex Bone Grafting & Sinus Lifts", "Corrective Jaw Surgery", "Oral Pathology Biopsies"]
    },
    {
      id: "dr-mazza",
      name: "Dr. Fredric C. Mazza, D.M.D.",
      role: "Oral & Maxillofacial Surgeon",
      credentials: "D.M.D. • Fellow, American Association of Oral & Maxillofacial Surgeons (AAOMS)",
      bio: "Dr. Fredric C. Mazza is an esteemed oral and maxillofacial surgeon recognized across Pennsylvania and New Jersey for his mastery in outpatient anesthesia and traumatic maxillofacial reconstruction. With comprehensive hospital training in intravenous sedation, facial trauma management, and impacted wisdom tooth extractions, Dr. Mazza ensures every patient experiences gentle care, minimal post-operative recovery time, and complete peace of mind.",
      specialties: ["IV Twilight Sedation & Sleep Surgery", "Impacted Wisdom Teeth Removal", "Facial Trauma & Fracture Repair", "Impacted Canine Exposure"]
    }
  ],

  anesthesiaStandards: {
    title: "Hospital-Grade Safety in Our Modern Surgical Suite",
    description: "Our state-of-the-art Easton surgical center is fully equipped with hospital-grade anesthesia delivery and continuous vital monitoring systems. Our surgical staff consists of certified oral and maxillofacial surgical assistants trained in IV sedation administration, BLS/ACLS, and CPR.",
    features: [
      "Continuous EKG, blood pressure, and pulse oximetry monitoring",
      "Hospital-trained surgeons certified in general anesthesia & IV sedation",
      "Certified Oral & Maxillofacial Surgical Assistants (DAANCE certified)",
      "Zero pain memory: wake up comfortably with your procedure complete"
    ]
  },

  reviews: [
    {
      author: "Sarah M.",
      location: "Easton, PA",
      source: "Google Verified Review",
      rating: 5,
      date: "3 weeks ago",
      procedure: "Dental Implant & Bone Graft",
      comment: "I was terrified of getting a dental implant after losing a front tooth in a sports accident. Dr. Milano was so calm and reassuring. Under IV twilight sleep, I felt absolutely zero pain and woke up before I even knew it started! My new implant looks and feels identical to my natural teeth. Truly world-class care right here on Sullivan Trail."
    },
    {
      author: "Michael T.",
      location: "Bethlehem, PA",
      source: "Healthgrades",
      rating: 5,
      date: "1 month ago",
      procedure: "Wisdom Teeth Extraction",
      comment: "Had all 4 impacted wisdom teeth removed by Dr. Mazza. The staff was incredibly warm, the insurance verification was handled seamlessly beforehand, and I had almost zero swelling. I was back eating regular food in three days. Best oral surgeons in the Lehigh Valley without question."
    },
    {
      author: "Diane K.",
      location: "Phillipsburg, NJ",
      source: "Google Verified Review",
      rating: 5,
      date: "2 months ago",
      procedure: "Sinus Lift & Multiple Implants",
      comment: "My general dentist referred me to Drs. Milano & Mazza for a sinus lift because I had severe bone loss. Their office coordination with my dentist was flawless. The procedure was smooth, transparent pricing with my insurance, and no hidden surprises. 10/10 recommendation!"
    },
    {
      author: "Robert L.",
      location: "Allentown, PA",
      source: "Patient Testimonial",
      rating: 5,
      date: "3 months ago",
      procedure: "Emergency Facial Injury",
      comment: "After a severe jaw injury, the hospital referred me directly to Dr. Mazza. His surgical expertise restored my bite and facial alignment completely. The administrative staff also helped navigate medical insurance and Medicare effortlessly."
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  // US Eastern Time calculation
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const etOffset = -4; // ET approx (EDT -4 / EST -5)
  const etDate = new Date(utc + (3600000 * etOffset));
  const day = etDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = etDate.getHours();
  
  if (day === 0 || day === 6) return false; // Weekends closed
  return hour >= 9 && hour < 17; // Mon - Fri 9am - 5pm ET
};

