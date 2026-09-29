// Comprehensive Seed Dataset for 13 Standalone Business Web Applications

// 1. BEAUTY PARLOUR & SALON
export const beautyParlourData = {
  salonInfo: {
    name: "Glamour Touch Luxury Ladies Salon & Bridal Studio",
    tagline: "Unisex Hair, Skin, Nail Art & Royal Bridal Makeovers",
    phone: "+91 96548 80240",
    address: "Mall Road, Opposite Landmark Hotel, Civil Lines, Kanpur",
    timings: "10:00 AM – 08:30 PM (Mon - Sun)",
  },
  categories: ["All", "Hair Styling", "Facials & Skin", "Bridal Studio", "Nail Art", "Spa & Body"],
  services: [
    {
      id: "BP-01",
      name: "Keratin Protein Hair Spa & Treatment",
      category: "Hair Styling",
      duration: "90 mins",
      price: 2499,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80",
      description: "Intense deep conditioning, frizz-free smoothing and keratin protein infusion for silky hair.",
    },
    {
      id: "BP-02",
      name: "O3+ Bridal Glow Diamond Facial",
      category: "Facials & Skin",
      duration: "60 mins",
      price: 1850,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80",
      description: "Advanced oxygenation facial with diamond dust serum, tan removal, and radiant pigmentation treatment.",
    },
    {
      id: "BP-03",
      name: "Royal HD Bridal Makeup & Draping",
      category: "Bridal Studio",
      duration: "180 mins",
      price: 12500,
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
      description: "Complete celebrity bridal look: HD airbrush foundation, 3D lash extension, jewelry setting & lehenga draping.",
    },
    {
      id: "BP-04",
      name: "Gel Extension & Ombre Chrome Nail Art",
      category: "Nail Art",
      duration: "60 mins",
      price: 1200,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80",
      description: "Custom French ombre extensions with chrome mirrored shine, Swarovski stones and UV lamp cure.",
    },
    {
      id: "BP-05",
      name: "Swedish Aroma Oil Body Spa",
      category: "Spa & Body",
      duration: "75 mins",
      price: 2200,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=700&q=80",
      description: "Full body stress-relief massage using warm lavender & eucalyptus essential oils with hot towel therapy.",
    },
    {
      id: "BP-06",
      name: "Balayage Global Hair Color & Highlights",
      category: "Hair Styling",
      duration: "120 mins",
      price: 3800,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80",
      description: "Ammonia-free French Balayage shades in mocha, caramel and honey blonde with Olaplex bond builder.",
    },
  ],
  stylists: [
    { name: "Priya Sharma", role: "Head Makeup Artist & Aesthetician", exp: "8 Years", rating: 4.9 },
    { name: "Mehak Kaur", role: "Creative Hair Master & Colorist", exp: "6 Years", rating: 4.8 },
    { name: "Aarti Patel", role: "Certified Nail & Lash Technician", exp: "5 Years", rating: 4.7 },
  ],
};

// 2. FRESH VEGETABLES & FRUITS (MANDI)
export const vegetablesData = {
  mandiInfo: {
    name: "Kisan Fresh Sabzi Mandi & Organic Fruits",
    tagline: "Direct From Local Farmers • Daily Morning Harvest • Chemical-Free",
    phone: "+91 96548 80240",
    deliveryTime: "30 Minutes Express",
    freeDeliveryAbove: 299,
  },
  categories: ["All", "Daily Veggies", "Green Leafy", "Salad & Exotic", "Fresh Fruits", "Roots & Onions"],
  items: [
    { id: "VEG-01", name: "Desi Lal Tamatar (Tomato)", category: "Daily Veggies", pricePerKg: 35, mandiRate: 30, unit: "kg", freshness: "Fresh Morning Pluck", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80" },
    { id: "VEG-02", name: "Pahadi Aloo (New Potatoes)", category: "Roots & Onions", pricePerKg: 28, mandiRate: 24, unit: "kg", freshness: "Grade A Large", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80" },
    { id: "VEG-03", name: "Desi Palak (Spinach)", category: "Green Leafy", pricePerKg: 25, mandiRate: 20, unit: "bunch (500g)", freshness: "Tender Hydroponic", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80" },
    { id: "VEG-04", name: "Kashmiri Shimla Mirch (Capsicum)", category: "Salad & Exotic", pricePerKg: 65, mandiRate: 58, unit: "kg", freshness: "Crisp Green", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80" },
    { id: "VEG-05", name: "Nasik Lal Pyaz (Onion)", category: "Roots & Onions", pricePerKg: 42, mandiRate: 38, unit: "kg", freshness: "Dry Pink Bulbs", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80" },
    { id: "VEG-06", name: "Taza Bhindi (Lady Finger)", category: "Daily Veggies", pricePerKg: 45, mandiRate: 40, unit: "kg", freshness: "Soft & Small", image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=600&q=80" },
    { id: "VEG-07", name: "Shimla Royal Delicious Apple", category: "Fresh Fruits", pricePerKg: 140, mandiRate: 125, unit: "kg", freshness: "Wax-Free Juicy", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80" },
    { id: "VEG-08", name: "Robusta Banana (Kela)", category: "Fresh Fruits", pricePerKg: 50, mandiRate: 42, unit: "Dozen (12 pcs)", freshness: "Naturally Ripened", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80" },
  ],
};

// 3. REAL ESTATE & PROPERTIES (BUY, SELL, RENT)
export const propertiesData = {
  agencyInfo: {
    name: "Awadh Prime Properties & Infra Network",
    tagline: "Verified RERA Approved Residential Flats, Commercial & Luxury Villas",
    phone: "+91 96548 80240",
    locations: ["Kanpur (Civil Lines, Swaroop Nagar, Kakadeo)", "Lucknow (Gomti Nagar, Shaheed Path)"],
  },
  types: ["All", "Buy", "Rent", "Commercial", "Plots & Land"],
  listings: [
    {
      id: "PROP-101",
      title: "3 BHK Ultra Luxury Park-Facing Flat",
      type: "Buy",
      propertyType: "Apartment",
      price: 8500000,
      priceLabel: "₹85 Lakhs",
      location: "Swaroop Nagar, Kanpur",
      carpetArea: "1850 Sq.Ft.",
      bedrooms: 3,
      bathrooms: 3,
      furnishing: "Semi-Furnished",
      reraStatus: "RERA Approved (UPRERA12882)",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "PROP-102",
      title: "2 BHK Gated Society Modular Flat",
      type: "Rent",
      propertyType: "Apartment",
      price: 18000,
      priceLabel: "₹18,000 / month",
      location: "Kakadeo Main Road, Kanpur",
      carpetArea: "1150 Sq.Ft.",
      bedrooms: 2,
      bathrooms: 2,
      furnishing: "Fully Furnished with AC & Fridge",
      reraStatus: "Ready to Move In",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "PROP-103",
      title: "4 BHK Royal Duplex Independent Villa with Garden",
      type: "Buy",
      propertyType: "Villa",
      price: 16500000,
      priceLabel: "₹1.65 Crore",
      location: "Civil Lines VIP Road, Kanpur",
      carpetArea: "3200 Sq.Ft.",
      bedrooms: 4,
      bathrooms: 5,
      furnishing: "Italian Marble & Modular Kitchen",
      reraStatus: "Freehold Clear Title",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: "PROP-104",
      title: "High Footfall Commercial Showroom / Bank Space",
      type: "Commercial",
      propertyType: "Showroom",
      price: 110000,
      priceLabel: "₹1,10,000 / month",
      location: "Mall Road Commercial Hub, Kanpur",
      carpetArea: "2200 Sq.Ft.",
      bedrooms: 0,
      bathrooms: 2,
      furnishing: "Bare Shell Ground Floor Frontage",
      reraStatus: "Commercial Approved",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      featured: false,
    },
  ],
};

// 4. HOTEL MANAGEMENT & RESERVATION
export const hotelData = {
  hotelInfo: {
    name: "The Grand Regency Palace & Luxury Suites",
    tagline: "5-Star Experience • Heated Pool • Multi-Cuisine Banquets • Kanpur",
    phone: "+91 96548 80240",
    checkInTime: "12:00 PM",
    checkOutTime: "11:00 AM",
  },
  rooms: [
    {
      id: "RM-101",
      name: "Deluxe King Room",
      type: "Deluxe",
      pricePerNight: 3499,
      bed: "1 King Size Bed",
      capacity: "2 Adults + 1 Child",
      amenities: ["Free High-speed Wi-Fi", "43\" Smart TV", "Tea/Coffee Maker", "Attached Shower Balcony"],
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      available: true,
    },
    {
      id: "RM-201",
      name: "Executive Business Suite",
      type: "Executive",
      pricePerNight: 5800,
      bed: "Master King + Sofa Cum Bed",
      capacity: "3 Adults",
      amenities: ["Complimentary Breakfast Buffet", "Work Desk & Ergonomic Chair", "Mini Bar", "Airport Drop"],
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      available: true,
    },
    {
      id: "RM-301",
      name: "Royal Presidential Suite with Jacuzzi",
      type: "Presidential",
      pricePerNight: 11999,
      bed: "Royal Emperor Bed",
      capacity: "4 Guests",
      amenities: ["Private Jacuzzi Bath", "Butler Service", "City Skyline View Lounge", "VIP Lounge Access"],
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80",
      available: true,
    },
  ],
  sampleBookings: [
    { id: "HTL-881", guestName: "Vikram Singhania", roomType: "Executive Suite", checkIn: "2026-09-30", checkOut: "2026-10-02", total: 11600, status: "Confirmed" },
    { id: "HTL-882", guestName: "Meera Oberoi", roomType: "Deluxe King", checkIn: "2026-10-01", checkOut: "2026-10-03", total: 6998, status: "Checked-In" },
  ],
};

// 5. SCHOOL MANAGEMENT SYSTEM
export const schoolData = {
  schoolInfo: {
    name: "Delhi Public Global Academy",
    tagline: "CBSE Affiliated Senior Secondary School • Affiliation #2130894",
    phone: "+91 96548 80240",
    address: "Kalyanpur GT Road, Kanpur 208017",
  },
  classes: ["Pre-Nursery", "Nursery", "Class 1", "Class 5", "Class 8", "Class 10", "Class 12 (Science)", "Class 12 (Commerce)"],
  feeHeads: [
    { name: "Monthly Tuition Fee", amount: 3500 },
    { name: "Computer & STEM Robotics Lab", amount: 800 },
    { name: "AC Bus Transport Fee", amount: 1200 },
    { name: "Sports & Library Fund", amount: 500 },
  ],
  sampleStudents: [
    { rollNo: "STU-2026-01", name: "Aarav Sharma", class: "Class 10", guardian: "Rajesh Sharma", phone: "9876543210", feeStatus: "Paid", attendance: "94%" },
    { rollNo: "STU-2026-02", name: "Ananya Dixit", class: "Class 12 (Science)", guardian: "Manoj Dixit", phone: "9839112233", feeStatus: "Due (₹4,800)", attendance: "91%" },
    { rollNo: "STU-2026-03", name: "Rohan Verma", class: "Class 8", guardian: "Suresh Verma", phone: "9818445566", feeStatus: "Paid", attendance: "98%" },
  ],
};

// 6. STAFFING & JOB PORTAL (FACILITY & DOMESTIC WORKERS)
export const staffingData = {
  agencyInfo: {
    name: "Pratham Verified Staffing & Guarding Services",
    tagline: "Background Verified Cleaners, Security Guards, House Maids & Patient Care",
    phone: "+91 96548 80240",
  },
  jobCategories: ["All", "Security Guards", "Deep Cleaning", "House Maid", "Elder & Patient Care", "Office Boy & Peon"],
  candidates: [
    { id: "STF-201", name: "Rameshwar Yadav", category: "Security Guards", experience: "6 Years", age: 34, salaryPerMonth: 16500, verified: true, skills: "Ex-Paramilitary Guard, Night Duty, Gate Register", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" },
    { id: "STF-202", name: "Sunita Devi", category: "Elder & Patient Care", experience: "5 Years", age: 38, salaryPerMonth: 18000, verified: true, skills: "Bedridden Patient Care, BP/Sugar Monitoring, Medicine Timings", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" },
    { id: "STF-203", name: "Santosh Kumar", category: "Deep Cleaning", experience: "4 Years", age: 28, salaryPerMonth: 14000, verified: true, skills: "Floor Scrubbing Machine, Glass Cleaning, Washroom Sanitization", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80" },
    { id: "STF-204", name: "Pooja Shakya", category: "House Maid", experience: "7 Years", age: 32, salaryPerMonth: 12000, verified: true, skills: "North Indian Cooking, Utensils, Dusting, Baby Care", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" },
  ],
};

// 7. CONSTRUCTION SITES MANAGEMENT
export const constructionData = {
  companyInfo: {
    name: "Vishwa Infra Developers & Construction Management",
    tagline: "Live Site Tracking • Cement/TMT Steel Inventory • Daily Labour Muster Roll",
    phone: "+91 96548 80240",
  },
  sites: [
    { id: "SITE-01", name: "Civil Lines Tower Commercial Complex", location: "Civil Lines, Kanpur", completion: 68, budget: "₹14.5 Crore", spent: "₹9.8 Crore", status: "Active (Framing & Slab)" },
    { id: "SITE-02", name: "Ganga Green Enclave Residential Villas", location: "Bithoor Road, Kanpur", completion: 42, budget: "₹8.2 Crore", spent: "₹3.4 Crore", status: "Active (Brickwork & Plaster)" },
  ],
  materials: [
    { name: "UltraTech Super Cement (50kg Bags)", inStock: 850, unit: "Bags", minAlert: 200, status: "Adequate" },
    { name: "Tata Tiscon 550D Fe TMT Steel Bars", inStock: 34, unit: "Tons", minAlert: 10, status: "Adequate" },
    { name: "River Sand (Morang / Badarpur)", inStock: 1200, unit: "Cubic Feet", minAlert: 500, status: "Adequate" },
    { name: "Red Clay First-Class Bricks", inStock: 18000, unit: "Pieces", minAlert: 10000, status: "Adequate" },
  ],
  labourShift: [
    { category: "Head Raj Mistri (Mason)", count: 8, dailyRate: 950 },
    { category: "Beldar / Helpers", count: 24, dailyRate: 550 },
    { category: "Steel Saria Fixers", count: 6, dailyRate: 850 },
    { category: "Electrician / Plumbing Crew", count: 4, dailyRate: 800 },
  ],
};

// 8. INVENTORY MANAGEMENT (ERP WAREHOUSE)
export const inventoryData = {
  warehouseInfo: {
    name: "Apex Logistics & Cloud Inventory Desk",
    tagline: "SKU Tracking • Barcode Scan • Low Stock Triggers • Purchase Orders",
  },
  items: [
    { sku: "SKU-9011", name: "Industrial Safety Helmets (Yellow)", category: "Safety", qty: 240, minAlert: 50, costPrice: 180, salePrice: 320, supplier: "Karam Safety Ltd" },
    { sku: "SKU-9012", name: "Heavy Duty Extension Cord (10m)", category: "Electrical", qty: 18, minAlert: 25, costPrice: 450, salePrice: 750, supplier: "Havells India" },
    { sku: "SKU-9013", name: "Lithium Cordless Drill Kit (18V)", category: "Power Tools", qty: 45, minAlert: 10, costPrice: 3200, salePrice: 4899, supplier: "Bosch Tools" },
    { sku: "SKU-9014", name: "Hydraulic Pallet Jack Wheel Set", category: "Machinery", qty: 8, minAlert: 15, costPrice: 1200, salePrice: 1950, supplier: "Godrej Material Handling" },
  ],
};

// 9. HOME TUITION & TUTORS FINDER
export const homeTuitionData = {
  portalInfo: {
    name: "Gurukul Home Tutors & One-to-One Mentors",
    tagline: "Verified Experienced Teachers at Your Doorstep • Free 1st Demo Class",
    phone: "+91 96548 80240",
  },
  classes: ["Class 1-5 (All Subjects)", "Class 6-8 (Maths & Science)", "Class 9-10 (CBSE Board Special)", "Class 11-12 (PCM / PCB)", "Class 11-12 (Commerce & Accounts)", "NEET / JEE Foundation"],
  tutors: [
    { id: "TUT-01", name: "Er. Deepak Sachan", qualification: "B.Tech (HBTU Kanpur)", subject: "Physics & Mathematics (Class 9-12)", experience: "7 Years", hourlyFee: 600, rating: 4.9, studentsTaught: 180, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" },
    { id: "TUT-02", name: "Dr. Shalini Awasthi", qualification: "M.Sc, Ph.D Chemistry", subject: "Chemistry & Biology (Class 10-12)", experience: "9 Years", hourlyFee: 650, rating: 5.0, studentsTaught: 240, image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80" },
    { id: "TUT-03", name: "CA Vikas Agrawal", qualification: "Chartered Accountant (Inter)", subject: "Accountancy & Economics", experience: "5 Years", hourlyFee: 550, rating: 4.8, studentsTaught: 120, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80" },
  ],
};

// 10. HOME APPLIANCES REPAIR & SERVICE
export const repairServicesData = {
  serviceInfo: {
    name: "UrbanTech Home Appliances Care & Doorstep Repair",
    tagline: "30-Day Service Warranty • Genuine Spare Parts • On-Demand Technicians",
    phone: "+91 96548 80240",
  },
  services: [
    { id: "REP-01", appliance: "Split / Window AC", title: "Complete Jet Pump AC Service & Cooling Gas Refill", visitingFee: 299, repairStart: 499, warranty: "30 Days", icon: "Snowflake", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80" },
    { id: "REP-02", appliance: "Washing Machine", title: "Motor, Drum & PCB Motherboard Repair (Top & Front Load)", visitingFee: 249, repairStart: 399, warranty: "60 Days", icon: "Shirt", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80" },
    { id: "REP-03", appliance: "Refrigerator / Fridge", title: "Compressor, Gas Leakage & Thermostat Fix", visitingFee: 249, repairStart: 450, warranty: "45 Days", icon: "Box", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80" },
    { id: "REP-04", appliance: "LED / Smart TV", title: "Backlight Panel Replacement & Sound Problem Fix", visitingFee: 199, repairStart: 599, warranty: "90 Days", icon: "Tv", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=600&q=80" },
    { id: "REP-05", appliance: "Mixer / Grinder / Microwave", title: "Blade Coupler, Armature & Heating Coil Repair", visitingFee: 149, repairStart: 250, warranty: "30 Days", icon: "Zap", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80" },
  ],
};

// 11. CAR CLEANING & DETAILING STUDIO
export const carCleaningData = {
  studioInfo: {
    name: "AutoShine Doorstep & Studio Car Spa",
    tagline: "Eco-Friendly Foam Wash • 9H Ceramic Coating • Interior Deep Sanitization",
    phone: "+91 96548 80240",
  },
  packages: [
    { id: "CAR-01", name: "Quick High-Pressure Foam Exterior Wash", duration: "35 mins", priceHatchback: 349, priceSedan: 399, priceSUV: 449, features: ["Snow Foam Shampoo", "Underbody Wash", "Tyre Dressing Shine", "Glass Cleaning"] },
    { id: "CAR-02", name: "Deep Interior Shampoo & Steam Sanitization", duration: "90 mins", priceHatchback: 1199, priceSedan: 1399, priceSUV: 1699, features: ["Seat Fabric Extraction Wash", "Roof & Floor Mats Steam", "Dashboard & AC Vent Polish", "Anti-Bacterial Odour Treatment"] },
    { id: "CAR-03", name: "Complete 360 Full Detailing & Teflon Glaze", duration: "180 mins", priceHatchback: 2299, priceSedan: 2699, priceSUV: 3199, features: ["3-Step Machine Paint Cut & Polish", "Teflon Wax Shield", "Engine Bay Degreasing", "Full Interior Dry Clean"] },
  ],
};

// 12. MLM (NETWORK MARKETING) - TREE & STAR MODEL
export const mlmData = {
  networkInfo: {
    name: "StarVenture Global Affiliate Network",
    tagline: "Transparent Multi-Tier Compensation • Star & Binary Visual Hierarchy • Instant Payouts",
  },
  rootUser: {
    id: "STAR-001",
    name: "Anand Singhal (You)",
    rank: "Crown Diamond Ambassador",
    totalEarnings: 342500,
    directReferrals: 5,
    teamSize: 148,
    leftBV: 45000,
    rightBV: 52000,
  },
  treeNodes: [
    { id: "STAR-002", name: "Sunil Verma", rank: "Emerald Star", leg: "Left", level: 1, teamCount: 68, active: true },
    { id: "STAR-003", name: "Pooja Mishra", rank: "Ruby Leader", leg: "Right", level: 1, teamCount: 75, active: true },
    { id: "STAR-004", name: "Kunal Gupta", rank: "Gold Associate", leg: "Left-Left", level: 2, teamCount: 32, active: true },
    { id: "STAR-005", name: "Rajesh Soni", rank: "Silver Member", leg: "Left-Right", level: 2, teamCount: 28, active: true },
    { id: "STAR-006", name: "Deepak Yadav", rank: "Gold Associate", leg: "Right-Left", level: 2, teamCount: 41, active: true },
    { id: "STAR-007", name: "Neha Sharma", rank: "Bronze Starter", leg: "Right-Right", level: 2, teamCount: 19, active: true },
  ],
  bonusTypes: [
    { name: "Direct Sponsor Royalty", rate: "15% on Starter Pack" },
    { name: "Binary Pair Matching Bonus", rate: "10% on Weaker Leg BV" },
    { name: "Leadership Car & House Fund", rate: "Pool Sharing 3% Turnover" },
  ],
};

// 13. GROCERY STORE & POS BILLING
export const groceryData = {
  storeInfo: {
    name: "Apna Kirana & Supermart Express",
    tagline: "Best Daily Rates • Barcoded POS Counter • 100% Pure Grains & Spices",
    fssai: "12724999000889",
    gstin: "09AAACZ9901M1Z1",
    phone: "+91 96548 80240",
    address: "Govind Nagar Market, Kanpur",
  },
  catalog: [
    { barcode: "890103001", name: "Fortune Chakki Fresh Atta (5kg)", category: "Flour & Grains", price: 215, mrp: 240, stock: 120, unit: "bag" },
    { barcode: "890103002", name: "India Gate Basmati Rice Feast Rozzana (5kg)", category: "Rice", price: 395, mrp: 460, stock: 85, unit: "bag" },
    { barcode: "890103003", name: "Tata Salt Vacuum Evaporated (1kg)", category: "Spices & Salt", price: 28, mrp: 30, stock: 350, unit: "pack" },
    { barcode: "890103004", name: "Madhur Pure & Hygienic Sugar (5kg)", category: "Sugar & Sweeteners", price: 220, mrp: 245, stock: 160, unit: "bag" },
    { barcode: "890103005", name: "Amul Pasteurised Butter (500g)", category: "Dairy", price: 275, mrp: 285, stock: 45, unit: "brick" },
    { barcode: "890103006", name: "Everest Turmeric Powder Haldi (200g)", category: "Spices & Salt", price: 62, mrp: 68, stock: 110, unit: "box" },
    { barcode: "890103007", name: "Tata Tea Gold Royal Taste (500g)", category: "Beverages", price: 310, mrp: 340, stock: 90, unit: "pack" },
    { barcode: "890103008", name: "Aashirvaad Shudh Desi Cow Ghee (1L)", category: "Oils & Ghee", price: 680, mrp: 720, stock: 65, unit: "jar" },
  ],
};
