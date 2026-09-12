export const BUSINESS_INFO = {
  name: "Lumia Dental",
  shortName: "Lumia Dental",
  legalName: "Lumia Dental PLLC",
  tagline: "Where Cutting Edge Dentistry Meets A Modern Patient Experience",
  subTagline: "Premier General, Cosmetic, Invisalign & Pediatric Dentistry in Lower Manhattan",
  mission: "At Lumia Dental, we believe that modern dental care goes beyond great trade craft. We want more than a satisfied patient: we want to ensure comfort and convenience at every step. That's how great dental care meets great customer service.",
  
  address: {
    street: "160 Broadway, Suite 1004",
    city: "New York",
    state: "NY",
    zip: "10038",
    neighborhood: "Financial District / Lower Manhattan",
    formatted: "160 Broadway, Suite 1004, New York, NY 10038",
  },
  
  phone: "(212) 287-1275",
  textPhone: "(212) 287-1275",
  email: "info@lumiadental.com",
  website: "https://www.lumiadental.com",
  bookingUrl: "https://www.appointnow.com/?P=3132&O=100&PT=0",
  zocdocUrl: "https://www.zocdoc.com/practice/lumia-dental-pllc-56243",
  googleMapsLink: "https://goo.gl/maps/yJKFjB4z3iT2",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=160%20Broadway%20Suite%201004%2C%20New%20York%2C%20NY%2010038&t=&z=15&ie=UTF8&iwloc=&output=embed",

  socials: {
    facebook: "https://www.facebook.com/lumiadental/",
    instagram: "https://www.instagram.com/lumiadental/",
    twitter: "https://twitter.com/LumiaDental",
    yelp: "https://www.yelp.com/biz/lumia-dental-new-york-2",
    linkedin: "https://www.linkedin.com/company/lumiadental/",
    google: "https://goo.gl/maps/yJKFjB4z3iT2",
    zocdoc: "https://www.zocdoc.com/practice/lumia-dental-pllc-56243"
  },
  
  hours: [
    { day: "Monday", open: "8:00 AM", close: "6:00 PM", note: "Full Clinical Team" },
    { day: "Tuesday", open: "8:00 AM", close: "6:00 PM", note: "Full Clinical Team" },
    { day: "Wednesday", open: "8:00 AM", close: "6:00 PM", note: "Full Clinical Team" },
    { day: "Thursday", open: "8:00 AM", close: "6:00 PM", note: "Full Clinical Team" },
    { day: "Friday", open: "8:00 AM", close: "2:00 PM", note: "Morning & Afternoon Care" },
    { day: "Saturday", open: "8:30 AM", close: "2:00 PM", note: "Alternating Saturdays" },
    { day: "Sunday", open: "Closed", close: "Closed", note: "Emergency On-Call" },
  ],

  serviceAreas: [
    "Lower Manhattan", "Financial District (FiDi)", "Tribeca", "Battery Park City", "SoHo", "Chinatown", "Civic Center", "Brooklyn Heights", "DUMBO", "Jersey City"
  ],

  transit: {
    fultonCenter: "A, C, J, Z, 2, 3, 4, 5 (2 min walk)",
    cortlandtSt: "R, W (1 min walk)",
    worldTradeCenter: "E train & PATH (3 min walk)",
    wallStreet: "4, 5 trains (3 min walk)",
    landmark: "Located on Broadway between Maiden Lane and Cortlandt Street, Suite 1004"
  },

  pillars: [
    {
      id: "convenience",
      title: "Convenience",
      subtitle: "Effortless Digital Scheduling",
      description: "Personal service for a modern patient experience extends to text, phone, web, and mobile so you can manage appointments, payments, schedules, and communication right from your phone.",
      icon: "smartphone"
    },
    {
      id: "cutting-edge",
      title: "Cutting Edge",
      subtitle: "Top Medical Institutions",
      description: "Our providers have trained at the nation's premier dental institutions (Tufts, UPenn, NYU, Temple, Columbia) and are masters of 3D iTero digital scans, painless laser therapy, and advanced ceramics.",
      icon: "microscope"
    },
    {
      id: "comfort",
      title: "Comfort",
      subtitle: "Boutique Relaxed Sanctuary",
      description: "From a warm and friendly greeting at reception, to ceiling-mounted 4K TVs with Netflix and streaming music, to our gentle bedside approach, we guarantee a calm and relaxing dental visit.",
      icon: "coffee"
    }
  ],

  insurancePartners: [
    { name: "Delta Dental", status: "In-Network PPO", badge: "Preferred" },
    { name: "Aetna Dental", status: "In-Network PPO", badge: "In-Network" },
    { name: "Cigna Dental", status: "In-Network Total Choice", badge: "In-Network" },
    { name: "MetLife Dental", status: "In-Network PDP Plus", badge: "In-Network" },
    { name: "Guardian Dental", status: "In-Network DentalGuard", badge: "In-Network" },
    { name: "Blue Cross Blue Shield", status: "In-Network PPO", badge: "In-Network" },
    { name: "United Healthcare", status: "In-Network Dental", badge: "In-Network" },
    { name: "CareCredit", status: "0% APR Flexible Financing", badge: "Financing" }
  ],

  doctors: [
    {
      id: "dr-lyristis",
      name: "Dr. Myrodati Lyristis, D.M.D.",
      role: "General and Cosmetic Dentistry",
      credentials: "Tufts University School of Dental Medicine • Chief Resident, NYU Langone",
      image: "https://www.lumiadental.com/hs-fs/hubfs/Myrodati%20Lyristis%20copy.jpeg?width=636&height=667&name=Myrodati%20Lyristis%20copy.jpeg",
      bio: "Dr. Lyristis earned her Doctor of Dental Medicine degree from Tufts University and served as Chief Resident at NYU Langone Hospital. Her clinical philosophy centers on blending surgical precision, facial artistry, and patient education to deliver exceptional, lasting smile results in an extraordinarily comfortable setting.",
      specialties: ["Porcelain Veneers & Lumineers", "Cosmetic Smile Makeovers", "Minimally Invasive Restorations", "Laser Teeth Whitening"]
    },
    {
      id: "dr-ali",
      name: "Dr. Anum Ali, D.M.D.",
      role: "General and Cosmetic Dentistry",
      credentials: "Temple University (Summa Cum Laude) • Maurice H. Kornberg School of Dentistry",
      image: "https://www.lumiadental.com/hs-fs/hubfs/Anum-min-2.jpeg?width=747&name=Anum-min-2.jpeg",
      bio: "Graduating Summa Cum Laude from Temple University in Philadelphia in just three years, Dr. Ali received early accelerated acceptance into the dental program where she was granted prestigious academic and clinical leadership scholarships. She is renowned for her gentle demeanor and aesthetic touch.",
      specialties: ["Comprehensive Dental Examinations", "Aesthetic Tooth-Colored Bonding", "Crowns & Ceramic Inlays", "Preventive Care"]
    },
    {
      id: "dr-gutowski",
      name: "Dr. Rebecca Gutowski (Matour), D.M.D.",
      role: "General and Cosmetic Dentistry",
      credentials: "Tulane University (Neuroscience) • University of Pennsylvania (Honors)",
      image: "https://www.lumiadental.com/hs-fs/hubfs/dr-rebecca.jpg?width=747&name=dr-rebecca.jpg",
      bio: "Dr. Rebecca Gutowski received her Bachelor's Degree in Neuroscience from Tulane University before earning her Doctorate of Dental Medicine with Honors in Community Oral Health at the Ivy League University of Pennsylvania. Her neurobiology background informs her gentle, anxiety-reducing patient care approach.",
      specialties: ["Anxiety-Free Dentistry", "Cosmetic Restorations", "Digital Occlusal Analysis", "Full Mouth Smile Rehabilitation"]
    },
    {
      id: "dr-lee",
      name: "Dr. Jake Lee, D.M.D.",
      role: "General and Cosmetic Dentistry",
      credentials: "New York University (Biology) • University of Pennsylvania School of Dental Medicine",
      image: "https://www.lumiadental.com/hs-fs/hubfs/Dr-Jake-Lee.jpg?width=747&name=Dr-Jake-Lee.jpg",
      bio: "Dr. Jake Lee completed his Bachelor's Degree in Biology at New York University and his Doctorate Degree at the University of Pennsylvania School of Dental Medicine. Dr. Lee brings exacting clinical standards and modern digital workflows to every restorative procedure.",
      specialties: ["Digital Dentistry & 3D Scans", "Porcelain Crowns & Bridges", "Emergency Toothache Relief", "Bio-Compatible Restorations"]
    },
    {
      id: "dr-han",
      name: "Dr. Mee Kyung (Michelle) Han, D.D.S.",
      role: "Founder • Restorative & Cosmetic Dentistry",
      credentials: "Columbia University / NYU Dentistry • National Clinical Lecturer",
      image: "https://www.lumiadental.com/hs-fs/hubfs/LUMIA_Portraits_Michelle_rev_IV.jpg?width=747&name=LUMIA_Portraits_Michelle_rev_IV.jpg",
      bio: "Dr. Michelle Han is a recognized expert in advanced restorative and cosmetic dentistry, having presented complex clinical cases in modern digital dentistry at the national level. She founded Lumia Dental with the vision of creating an elevated, compassionate dental home in Lower Manhattan.",
      specialties: ["Advanced Digital Smile Design", "Full Arch Rehabilitation", "High-Definition Ceramic Veneers", "Complex Esthetic Cases"]
    },
    {
      id: "dr-lobo",
      name: "Dr. Monica Lobo, D.D.S.",
      role: "Pediatric Dentistry",
      credentials: "Board Certified Pediatric Dentist • New York Native",
      image: "https://www.lumiadental.com/hs-fs/hubfs/Dr-Monica-Lobo.jpg?width=747&name=Dr-Monica-Lobo.jpg",
      bio: "Dr. Monica Lobo, a New York native, is a Board Certified Pediatric Dentist. Dedicated exclusively to children and adolescents, Dr. Lobo specializes in creating fun, educational, and fear-free dental visits that build positive lifelong habits.",
      specialties: ["Gentle Infant & Child Checkups", "Cavity Prevention & Fluoride", "BPA-Free Dental Sealants", "Sedation & Behavior Management"]
    },
    {
      id: "dr-drummond",
      name: "Dr. Raven Drummond, D.D.S.",
      role: "Endodontics Specialist (Root Canal Therapy)",
      credentials: "Emory University (Neuroscience) • Howard University College of Dentistry",
      image: "https://www.lumiadental.com/hs-fs/hubfs/Dr.%20Raven%20Drummond_Portrait_rev.jpg?width=747&name=Dr.%20Raven%20Drummond_Portrait_rev.jpg",
      bio: "Dr. Drummond is a native New Yorker, born and raised in Brooklyn. She received her B.S. in Neuroscience and Behavioral Biology from Emory University and her Doctorate of Dental Surgery from Howard University. She specializes in microscopic, painless root canal treatments.",
      specialties: ["Microscopic Endodontic Therapy", "Cracked Tooth Diagnostics", "Root Canal Retreatment", "Urgent Tooth Pain Relief"]
    },
    {
      id: "dr-bagga",
      name: "Dr. Vandeep Bagga, D.D.S.",
      role: "Periodontics and Implant Surgery",
      credentials: "Board Certified Periodontist • NYU Dentistry Clinical Excellence Award",
      image: "https://www.lumiadental.com/hs-fs/hubfs/Vandeep-min.jpeg??&width=747&name=Vandeep-min.jpeg",
      bio: "Dr. Bagga is a Board-Certified Periodontist who graduated from NYU Dentistry and completed his advanced specialty residency in Periodontics, where he was awarded Outstanding Clinical Performance. He specializes in minimally invasive implant placement and advanced gum therapies.",
      specialties: ["Titanium & Ceramic Dental Implants", "Laser Periodontal Therapy", "Bone Regeneration & Sinus Lifts", "Soft Tissue Gum Grafting"]
    },
    {
      id: "dr-goodman",
      name: "Dr. Adam Goodman, D.M.D.",
      role: "Orthodontics & Invisalign Diamond Provider Specialist",
      credentials: "Invisalign Top 1% Diamond Provider • Nationally Acclaimed Orthodontist",
      image: "https://www.lumiadental.com/hs-fs/hubfs/Dr-Goodman.jpg?width=961&name=Dr-Goodman.jpg",
      bio: "Dr. Adam Goodman is an internationally recognized expert in Invisalign and a pioneer in modern digital orthodontic techniques. Having treated thousands of complex bite and alignment cases, he provides expedited, discreet aligner therapy for adults and teens.",
      specialties: ["Invisalign® Diamond Protocol", "Accelerated Orthodontics", "Complex Bite Correction", "Digital Aligner Simulation (iTero)"]
    }
  ],

  hygienists: [
    { name: "Esther", role: "Registered Dental Hygienist", image: "https://www.lumiadental.com/hs-fs/hubfs/Esther.jpg?width=747&height=747&name=Esther.jpg" },
    { name: "Jacqueline (Jackie)", role: "Registered Dental Hygienist", bio: "NYU College of Dentistry Dental Hygiene graduate with extensive clinical experience.", image: "https://www.lumiadental.com/hs-fs/hubfs/Jacqueline-new.jpg?width=747&name=Jacqueline-new.jpg" },
    { name: "Ksenia", role: "Registered Dental Hygienist", image: "https://www.lumiadental.com/hs-fs/hubfs/Ksenia-min.jpeg?width=747&name=Ksenia-min.jpeg" },
    { name: "Lin", role: "Registered Dental Hygienist", image: "https://www.lumiadental.com/hs-fs/hubfs/Lin.jpg?width=747&height=747&name=Lin.jpg" },
    { name: "Tatyana", role: "Lead Dental Assistant", bio: "Serving in clinical dentistry since 2008 with mastery in surgical and cosmetic procedures.", image: "https://www.lumiadental.com/hs-fs/hubfs/Tatyana-1.png?width=747&name=Tatyana-1.png" },
    { name: "Lucy", role: "Clinical Dental Assistant", image: "https://www.lumiadental.com/hs-fs/hubfs/Lucy.jpg?width=747&name=Lucy.jpg" },
    { name: "Archer", role: "Clinical Dental Assistant", image: "https://www.lumiadental.com/hs-fs/hubfs/Archer-1.png?width=747&name=Archer-1.png" },
    { name: "Abdel", role: "Clinical Dental Assistant", image: "https://www.lumiadental.com/hs-fs/hubfs/Abdel.jpg?width=747&name=Abdel.jpg" },
    { name: "Agnes", role: "Clinical Dental Assistant", image: "https://www.lumiadental.com/hs-fs/hubfs/Agnes.jpeg?width=747&name=Agnes.jpeg" }
  ],

  reviews: [
    {
      author: "Dana F.",
      location: "Financial District, NYC",
      source: "ZocDoc Verified Patient",
      rating: 5,
      date: "Recent Patient",
      procedure: "Comprehensive Exam & Cleaning",
      comment: "The doctor was very professional and kind and seemed very competent! The modern office and friendly staff made me feel completely relaxed. Ceiling TVs with Netflix make the appointment fly by."
    },
    {
      author: "Shani A.",
      location: "Lower Manhattan, NY",
      source: "ZocDoc Verified Patient",
      rating: 5,
      date: "Recent Patient",
      procedure: "Cosmetic Consultation & Care",
      comment: "5 Stars – I tend to shy from superlatives, but definitely the best trip to the dentist I've ever had. Very thoughtful and took the time to answer my many questions. Highly recommend this dentist."
    },
    {
      author: "Marc P.",
      location: "Tribeca, NYC",
      source: "Google Verified Review",
      rating: 5,
      date: "Verified Patient",
      procedure: "Invisalign Clear Aligners",
      comment: "Lumia Dental is hands down the best dental office in Lower Manhattan. From the front desk to the hygienists and doctors, everyone is so warm. The 3D scan for my Invisalign was fast and seamless with zero gooey putty!"
    },
    {
      author: "Alexandra S.",
      location: "Battery Park City, NY",
      source: "Google Verified Review",
      rating: 5,
      date: "Verified Patient",
      procedure: "Porcelain Veneers & Smile Makeover",
      comment: "Had cosmetic veneers done with Dr. Han and Dr. Lyristis. My smile looks stunning and completely natural. Truly artistic work in a state-of-the-art office on Broadway."
    }
  ],

  faqs: [
    {
      q: "Where is Lumia Dental located in NYC?",
      a: "Lumia Dental is centrally located at 160 Broadway, Suite 1004, New York, NY 10038, in Lower Manhattan right by the Financial District, between Maiden Lane and Cortlandt Street. We are just two blocks from Fulton Center and one block from Cortlandt Street subway stations."
    },
    {
      q: "How can I book an appointment or ask questions?",
      a: "You can book directly using our instant online appointment wizard on this site, call or text us at (212) 287-1275, or use our live calendar on AppointNow or ZocDoc."
    },
    {
      q: "What dental insurances do you accept?",
      a: "We participate in-network with premier PPO dental insurance plans, including Delta Dental, Aetna, Cigna, MetLife, Guardian, Blue Cross Blue Shield, and United Healthcare. Our administrative team performs complimentary electronic benefits verification before your visit."
    },
    {
      q: "Do you offer financing for cosmetic dentistry and Invisalign?",
      a: "Yes! We partner with CareCredit to offer 0% APR promotional financing, making porcelain veneers, Invisalign clear aligners, and dental implants affordable on convenient monthly payments."
    },
    {
      q: "What makes the Lumia Dental patient experience different?",
      a: "We merge cutting-edge technology (3D iTero digital scans, ultra-low radiation X-rays, laser therapy) with boutique comfort amenities (ceiling-mounted streaming TVs, noise-canceling headphones, warm scented towels, and personalized sedation options)."
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const etOffset = -4;
  const etDate = new Date(utc + (3600000 * etOffset));
  const day = etDate.getDay();
  const hour = etDate.getHours();
  const minute = etDate.getMinutes();
  const time = hour + (minute / 60);

  if (day === 0) return false;
  if (day >= 1 && day <= 4) {
    return time >= 8.0 && time < 18.0;
  }
  if (day === 5) {
    return time >= 8.0 && time < 14.0;
  }
  if (day === 6) {
    return time >= 8.5 && time < 14.0;
  }
  return false;
};
