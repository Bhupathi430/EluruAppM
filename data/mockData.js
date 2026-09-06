export const CITIES = [
  // Andhra Pradesh
  { id: "eluru", name: "Eluru", state: "Andhra Pradesh", tagline: "The City of Paddy Fields & Historic Canals", swagatMessage: "Welcome to the Smart Civic Portal of Eluru.", welcomeImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Together, Let's Build a Better Eluru" },
  { id: "vijayawada", name: "Vijayawada", state: "Andhra Pradesh", tagline: "The Place of Victory & Kanaka Durga Temple", swagatMessage: "Swagatham to Vijayawada. The business capital of Andhra Pradesh.", welcomeImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Transforming Vijayawada into a Green Smart Metropolis" },
  { id: "visakhapatnam", name: "Visakhapatnam (Vizag)", state: "Andhra Pradesh", tagline: "The City of Destiny & Beautiful Beaches", swagatMessage: "Welcome to Vizag. Where blue ocean meets smart civic living.", welcomeImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Clean Beaches & Smart Coastal City Drive" },
  { id: "tirupati", name: "Tirupati", state: "Andhra Pradesh", tagline: "The Spiritual Capital & Smart Heritage City", swagatMessage: "Welcome to Tirupati Civic Portal.", welcomeImage: "https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Smart Pilgrim Transit & Eco-Friendly City" },
  { id: "guntur", name: "Guntur", state: "Andhra Pradesh", tagline: "The Land of Agriculture & Commerce", swagatMessage: "Welcome to Guntur. Heart of agriculture and commerce.", welcomeImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Guntur Smart Urban Development Project" },
  { id: "rajahmundry", name: "Rajahmundry", state: "Andhra Pradesh", tagline: "Cultural Capital on Godavari River", swagatMessage: "Swagatham to Rajahmundry. City on the sacred Godavari.", welcomeImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Godavari Riverfront Smart Sanitation Drive" },
  { id: "kakinada", name: "Kakinada", state: "Andhra Pradesh", tagline: "The Fertilizer City & Port Hub", swagatMessage: "Welcome to Kakinada. Smart Port City.", welcomeImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Smart Coastal Eco-System Project" },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", tagline: "The City of Pearls & Cyberabad Tech Hub", swagatMessage: "Welcome to Cyberabad Tech Hub.", welcomeImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Building a Greener, Cleaner Metro Hyderabad" },
  { id: "bengaluru", name: "Bengaluru (Bangalore)", state: "Karnataka", tagline: "Silicon Valley of India & Garden City", swagatMessage: "Welcome to Namma Bengaluru. Garden Tech City.", welcomeImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Namma Bengaluru Smart Transit & Green Drive" },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", tagline: "The Gateway to South India & Marina Beach", swagatMessage: "Vanakkam Chennai. Coastal Metro City.", welcomeImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Singara Chennai Smart Civic Mission" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", tagline: "The Financial Capital & Metro Hub", swagatMessage: "Welcome to Mumbai Civic Portal.", welcomeImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1000&q=80", bannerTitle: "Mumbai Coastal Road & Smart Civic Transport" }
];

export const USER_ROLES = [
  { id: "citizen", title: "Citizen / Resident", iconName: "User", description: "General public reporting civic problems", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
  { id: "police", title: "Police / Traffic Officer", iconName: "Shield", description: "Law enforcement & traffic safety official", color: "bg-blue-100 text-blue-800 border-blue-300" },
  { id: "municipal", title: "Municipal Staff / Engineer", iconName: "Building2", description: "Municipal corporation field team", color: "bg-purple-100 text-purple-800 border-purple-300" },
  { id: "health", title: "Health / Emergency Worker", iconName: "Activity", description: "Sanitation, hospital & emergency responder", color: "bg-rose-100 text-rose-800 border-rose-300" },
  { id: "business", title: "Business Owner / Merchant", iconName: "Store", description: "Local shop, restaurant & commercial trader", color: "bg-amber-100 text-amber-900 border-amber-300" }
];

export const DEPARTMENT_MAPPINGS = {
  road: {
    deptName: "Roads & Infrastructure Department (RID)",
    officer: "Er. K. Ramesh",
    designation: "Chief Municipal Engineer",
    contact: "rid-dispatch@eluru.gov.in | +91 8812 245001",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    iconName: "Construction"
  },
  garbage: {
    deptName: "Solid Waste Management & Sanitation Dept (SWMD)",
    officer: "Dr. P. Swathi",
    designation: "Sanitation Health Inspector",
    contact: "swmd-cleancity@eluru.gov.in | +91 8812 245002",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    iconName: "Trash2"
  },
  drainage: {
    deptName: "Public Health & Drainage Engineering Dept (PHED)",
    officer: "Er. V. Prasad",
    designation: "Executive Drainage Engineer",
    contact: "phed-drainage@eluru.gov.in | +91 8812 245003",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    iconName: "Waves"
  },
  streetlight: {
    deptName: "Electrical & Solar Energy Department (EESD)",
    officer: "Sri M. Venkatesh",
    designation: "Assistant Electrical Engineer",
    contact: "eesd-lighting@eluru.gov.in | +91 8812 245004",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    iconName: "Lightbulb"
  },
  water: {
    deptName: "Municipal Water Supply & Sewerage Board (MWSSB)",
    officer: "Er. S. Narayana",
    designation: "Superintending Water Officer",
    contact: "waterboard@eluru.gov.in | +91 8812 245005",
    badgeColor: "bg-cyan-100 text-cyan-800 border-cyan-200",
    iconName: "Droplets"
  },
  traffic: {
    deptName: "City Traffic Police Control Room (TPCR)",
    officer: "Inspector B. Vijay Kumar",
    designation: "Circle Traffic Inspector",
    contact: "traffic-control@eluru.gov.in | 100 / 08812 222100",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    iconName: "Car"
  },
  toilet: {
    deptName: "Swachh City Sanitation Division (SCSD)",
    officer: "Smt. G. Lakshmi",
    designation: "Public Facilities In-Charge",
    contact: "swachh-city@eluru.gov.in | +91 8812 245007",
    badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
    iconName: "Sparkles"
  },
  other: {
    deptName: "Central Citizen Grievance Cell (CCGC)",
    officer: "Sri A. Satyanarayana",
    designation: "Grievance Redressal Officer",
    contact: "grievance-cell@eluru.gov.in | 1800-425-0099",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-200",
    iconName: "MoreHorizontal"
  }
};

export const CITY_SLIDERS = [
  {
    id: 1,
    title: "Together, Let's Build a Better City",
    subtitle: "Report civic issues directly to municipality & track real-time fixes.",
    tag: "Civic Action",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
    color: "from-emerald-600 to-teal-800"
  },
  {
    id: 2,
    title: "City Smart Solar Streetlights Drive",
    subtitle: "Over 450 new LED solar lights installed across major wards this month.",
    tag: "Development",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    color: "from-amber-500 to-orange-700"
  },
  {
    id: 3,
    title: "Weekly Clean & Green Sanitation Campaign",
    subtitle: "Join local citizens and municipal workers every Sunday at 7 AM.",
    tag: "Community",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-600 to-indigo-800"
  },
  {
    id: 4,
    title: "Local Job Fair & Skill Development Expo",
    subtitle: "Explore 120+ open job vacancies from local businesses and startups.",
    tag: "Jobs & Opportunities",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
    color: "from-purple-600 to-pink-800"
  }
];

export const ISSUE_CATEGORIES = [
  { id: "road", name: "Road Damage", iconName: "Construction", bgClass: "bg-red-100 text-red-600 border-red-200", colorGroup: "red" },
  { id: "garbage", name: "Garbage Overflow", iconName: "Trash2", bgClass: "bg-red-100 text-red-600 border-red-200", colorGroup: "red" },
  { id: "drainage", name: "Drainage Block", iconName: "Waves", bgClass: "bg-red-100 text-red-600 border-red-200", colorGroup: "red" },
  { id: "streetlight", name: "Street Light", iconName: "Lightbulb", bgClass: "bg-red-100 text-red-600 border-red-200", colorGroup: "red" },
  { id: "water", name: "Water Supply Problem", iconName: "Droplets", bgClass: "bg-amber-100 text-amber-700 border-amber-200", colorGroup: "yellow" },
  { id: "traffic", name: "Traffic Jam Signal", iconName: "Car", bgClass: "bg-amber-100 text-amber-700 border-amber-200", colorGroup: "yellow" },
  { id: "toilet", name: "Public Toilet", iconName: "Sparkles", bgClass: "bg-amber-100 text-amber-700 border-amber-200", colorGroup: "yellow" },
  { id: "other", name: "Other Issues", iconName: "MoreHorizontal", bgClass: "bg-emerald-100 text-emerald-700 border-emerald-200", colorGroup: "green" }
];

export const INITIAL_ISSUES = [
  {
    id: "#ELR-2456",
    category: "Road Damage",
    categoryId: "road",
    reporterRole: "Citizen / Resident",
    reporterRoleIconName: "User",
    department: DEPARTMENT_MAPPINGS.road,
    title: "Large Potholes on Main Road",
    location: "Denduluru Road, Eluru",
    reportedDate: "12 May 2024 • 10:30 AM",
    status: "In Progress",
    upvotes: 42,
    hasUpvoted: false,
    description: "Large dangerous potholes on this road causing major traffic bottleneck and accidents for daily commuters during rain.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80",
    updates: [
      { date: "12 May 2024, 10:30 AM", text: "Issue reported by citizen (Bhupathi)" },
      { date: "12 May 2024, 10:31 AM", text: "Auto-notified Roads & Infrastructure Dept (Officer: Er. K. Ramesh via SMS & Dispatch Terminal)" },
      { date: "12 May 2024, 02:15 PM", text: "Verified by Municipal Patrol. Status set to In Progress." },
      { date: "Pending", text: "Material dispatched for resurfacing. Will be resolved soon." }
    ]
  },
  {
    id: "#ELR-2459",
    category: "Street Light",
    categoryId: "streetlight",
    reporterRole: "Police Officer",
    reporterRoleIconName: "Shield",
    department: DEPARTMENT_MAPPINGS.streetlight,
    title: "Non-functioning Street Light",
    location: "Powerpet Main Street, Eluru",
    reportedDate: "14 May 2024 • 07:10 PM",
    status: "Under Review",
    upvotes: 28,
    hasUpvoted: true,
    description: "Three consecutive streetlights are broken, causing complete darkness at night near school zone.",
    image: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80",
    updates: [
      { date: "14 May 2024, 07:10 PM", text: "Reported by Police Traffic Patrol Officer" },
      { date: "14 May 2024, 07:11 PM", text: "Auto-notified Electrical & Solar Energy Dept (Officer: Sri M. Venkatesh)" },
      { date: "15 May 2024, 09:00 AM", text: "Electrical team scheduled inspection." }
    ]
  },
  {
    id: "#ELR-2462",
    category: "Garbage Overflow",
    categoryId: "garbage",
    reporterRole: "Municipal Staff",
    reporterRoleIconName: "Building2",
    department: DEPARTMENT_MAPPINGS.garbage,
    title: "Garbage Bin Overflowing",
    location: "Ganjam Park Gate 2, Eluru",
    reportedDate: "15 May 2024 • 08:00 AM",
    status: "Resolved",
    upvotes: 67,
    hasUpvoted: false,
    description: "Sanitation bin cleared by municipal truck after citizen alert.",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    updates: [
      { date: "15 May 2024, 08:00 AM", text: "Log created by Municipal Health Inspector" },
      { date: "15 May 2024, 08:01 AM", text: "Auto-notified Solid Waste Management Dept (Officer: Dr. P. Swathi)" },
      { date: "15 May 2024, 11:30 AM", text: "Garbage cleared and area disinfected." }
    ]
  }
];

export const POPULAR_PLACES = [
  { id: 1, name: "Pushkar Foods", category: "Restaurants", subCategory: "Restaurant • Ramachandrapuram", rating: 4.3, reviews: 256, distance: "1.2 km", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80", address: "Main Road, Ramachandrapuram, Eluru", phone: "+91 98480 12345" },
  { id: 2, name: "CMR Shopping Mall", category: "Shops", subCategory: "Shopping • Powerpet", rating: 4.5, reviews: 310, distance: "2.1 km", image: "https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=600&q=80", address: "Powerpet Centre, Eluru", phone: "+91 8812 255 666" },
  { id: 3, name: "Eluru Government Hospital", category: "Hospitals", subCategory: "Hospital • Sanivarapupeta", rating: 4.1, reviews: 198, distance: "1.5 km", image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80", address: "Sanivarapupeta Road, Eluru", phone: "08812 230 000" },
  { id: 4, name: "Grand Hotel & Residency", category: "Hotels", subCategory: "Hotel • Railway Station Road", rating: 4.4, reviews: 142, distance: "0.8 km", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80", address: "Station Road, Near Bus Stand, Eluru", phone: "+91 8812 240 111" }
];

export const JOBS_LIST = [
  { id: 1, title: "Web Developer", company: "Nexure Studio", location: "Eluru • Hybrid", salary: "₹15,000 - ₹25,000 / month", type: "Full Time", isNew: true, skills: ["React", "JavaScript", "Tailwind CSS"], posted: "1 day ago" },
  { id: 2, title: "Graphic Designer", company: "Creative Minds", location: "Eluru • On-site", salary: "₹12,000 - ₹18,000 / month", type: "Full Time", isNew: true, skills: ["Photoshop", "Illustrator", "Figma"], posted: "2 days ago" },
  { id: 3, title: "Sales Executive", company: "LocalMart", location: "Eluru • Field", salary: "₹10,000 - ₹15,000 / month", type: "Full Time", isNew: true, skills: ["Communication", "Sales"], posted: "3 days ago" },
  { id: 4, title: "Data Entry & Office Asst", company: "Eluru Logistics", location: "Powerpet, Eluru", salary: "₹8,000 - ₹12,000 / month", type: "Part Time", isNew: false, skills: ["MS Office", "Excel"], posted: "4 days ago" }
];
