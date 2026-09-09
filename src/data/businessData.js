export const BUSINESS_INFO = {
  name: "Toby's Auto Mechanic",
  legalName: "Toby's Auto Mechanic LLC",
  tagline: "Dependable Diesel & Automotive Care — Casa Grande's Trusted Shop Since 2009",
  address: {
    street: "15276 W Jimmie Kerr Blvd, Ste 1",
    city: "Casa Grande",
    state: "AZ",
    zip: "85122",
    formatted: "15276 W Jimmie Kerr Blvd, Ste 1, Casa Grande, AZ 85122",
  },
  phone: "(520) 836-6921",
  secondaryPhone: "(520) 836-6021",
  website: "tobysllc.com",
  email: "info@tobysllc.com",
  googleMapsLink: "https://www.google.com/maps/dir/?api=1&destination=Toby%27s+Auto+Mechanic,+15276+W+Jimmie+Kerr+Blvd,+Ste+1,+Casa+Grande,+AZ+85122",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Toby%27s%20Auto%20Mechanic%2C%2015276%20W%20Jimmie%20Kerr%20Blvd%2C%20Ste%201%2C%20Casa%20Grande%2C%20AZ%2085122&t=&z=15&ie=UTF8&iwloc=&output=embed",
  
  hours: [
    { day: "Monday", open: "8:00 AM", close: "5:00 PM", note: "" },
    { day: "Tuesday", open: "8:00 AM", close: "5:00 PM", note: "" },
    { day: "Wednesday", open: "8:00 AM", close: "5:00 PM", note: "" },
    { day: "Thursday", open: "8:00 AM", close: "5:00 PM", note: "" },
    { day: "Friday", open: "8:00 AM", close: "5:00 PM", note: "" },
    { day: "Saturday", open: "8:00 AM", close: "5:00 PM", note: "By Appointment Only" },
    { day: "Sunday", open: "Closed", close: "Closed", note: "" },
  ],

  history: [
    {
      year: "2009",
      title: "Humble Beginnings",
      description: "Toby started out as a mobile mechanic for hire, traveling across Arizona heat and backroads to help stranded drivers and local farmers with reliable on-site repair."
    },
    {
      year: "2015",
      title: "Diesel Mastery",
      description: "Expanded into specialized heavy-duty diesel diagnostics, complete engine swaps, and performance transmission rebuilds."
    },
    {
      year: "2022",
      title: "Permanent Casa Grande Facility",
      description: "Opened our fully-equipped, modern auto repair facility with dedicated hydraulic lifts, comfortable waiting room, and U-Haul rental partnership on Jimmie Kerr Blvd."
    },
    {
      year: "Present",
      title: "Pinal County's Trusted Choice",
      description: "Serving hundreds of satisfied local drivers, fleet operators, and military families with transparent, honest, high-caliber automotive work."
    }
  ],

  owner: {
    name: "Toby S.",
    role: "Founder & Master Technician",
    quote: "Auto repair has always been a passion of mine and serving Arizona car owners with vehicle repair has been my honor and treat. The Arizona heat and terrain provided the perfect environment to create a state filled with vehicles that need repairs and I've been able to perfect my skills."
  },

  reviews: [
    {
      author: "Marcus R.",
      location: "Casa Grande, AZ",
      source: "Yelp",
      rating: 5,
      date: "2 months ago",
      comment: "Toby is hands down the most honest mechanic in Pinal County. Diagnosed a complex transmission shudder that two other dealerships quoted me thousands for, and fixed it same day at a fraction of the cost. A true lifesaver!"
    },
    {
      author: "Elena G.",
      location: "Eloy, AZ",
      source: "Google Review",
      rating: 5,
      date: "3 weeks ago",
      comment: "My A/C died during a 112° Arizona scorcher with my kids in the car. Toby got us right in, recharged the system, replaced a bad compressor clutch, and had us ice-cold before noon. Respectful, transparent, and fair."
    },
    {
      author: "Sgt. David W.",
      location: "Casa Grande, AZ",
      source: "Yelp",
      rating: 5,
      date: "1 month ago",
      comment: "Veteran friendly and top-shelf diesel care. Toby overhauled the injectors on my Cummins Ram 2500 and the truck runs like it just rolled off the showroom floor. You won't find better craftmanship."
    },
    {
      author: "Jessica B.",
      location: "Maricopa, AZ",
      source: "Google Review",
      rating: 5,
      date: "4 months ago",
      comment: "The waiting room is air conditioned and spotlessly clean. Toby explained every single line item on my brake service before doing the work. Highly recommend to any woman who wants zero BS or upselling."
    }
  ]
};

export const isOpenNow = () => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
  const hour = now.getHours();
  
  if (day === 0) return false; // Sunday closed
  if (day === 6) {
    // Saturday by appointment 8am - 5pm
    return hour >= 8 && hour < 17;
  }
  // Monday - Friday 8am - 5pm
  return hour >= 8 && hour < 17;
};
