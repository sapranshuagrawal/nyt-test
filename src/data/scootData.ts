import { Airport, DealOffer, FlightOption, BookingRecord } from '../types/scoot';

export const AIRPORTS: Airport[] = [
  { code: 'SIN', city: 'Singapore', name: 'Changi Airport', country: 'Singapore', region: 'Southeast Asia' },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi Airport', country: 'Thailand', region: 'Southeast Asia' },
  { code: 'DPS', city: 'Bali (Denpasar)', name: 'Ngurah Rai International', country: 'Indonesia', region: 'Southeast Asia' },
  { code: 'NRT', city: 'Tokyo (Narita)', name: 'Narita International', country: 'Japan', region: 'North Asia' },
  { code: 'ICN', city: 'Seoul', name: 'Incheon International', country: 'South Korea', region: 'North Asia' },
  { code: 'TPE', city: 'Taipei', name: 'Taoyuan International', country: 'Taiwan', region: 'North Asia' },
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith Airport', country: 'Australia', region: 'Australia' },
  { code: 'MEL', city: 'Melbourne', name: 'Tullamarine Airport', country: 'Australia', region: 'Australia' },
  { code: 'KIX', city: 'Osaka', name: 'Kansai International', country: 'Japan', region: 'North Asia' },
  { code: 'HKT', city: 'Phuket', name: 'Phuket International', country: 'Thailand', region: 'Southeast Asia' },
  { code: 'PEN', city: 'Penang', name: 'Penang International', country: 'Malaysia', region: 'Southeast Asia' },
  { code: 'MNL', city: 'Manila', name: 'Ninoy Aquino International', country: 'Philippines', region: 'Southeast Asia' },
  { code: 'ATH', city: 'Athens', name: 'Eleftherios Venizelos', country: 'Greece', region: 'Europe' },
  { code: 'BER', city: 'Berlin', name: 'Berlin Brandenburg', country: 'Germany', region: 'Europe' },
  { code: 'DEL', city: 'New Delhi', name: 'Indira Gandhi International', country: 'India', region: 'India' }
];

export const SAMPLE_FLIGHTS: FlightOption[] = [
  {
    id: 'tr-898',
    flightNumber: 'TR 898',
    aircraft: 'Boeing 787-9 Dreamliner',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[3], // NRT
    departureTime: '01:10',
    arrivalTime: '08:55',
    duration: '6h 45m',
    stops: 0,
    basePrice: 198,
    scootPlusAvailable: true
  },
  {
    id: 'tr-808',
    flightNumber: 'TR 808',
    aircraft: 'Boeing 787-8 Dreamliner',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[3], // NRT
    departureTime: '06:15',
    arrivalTime: '14:05',
    duration: '6h 50m',
    stops: 0,
    basePrice: 228,
    scootPlusAvailable: true
  },
  {
    id: 'tr-610',
    flightNumber: 'TR 610',
    aircraft: 'Airbus A321neo',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[1], // BKK
    departureTime: '08:30',
    arrivalTime: '10:00',
    duration: '2h 30m',
    stops: 0,
    basePrice: 78,
    scootPlusAvailable: false
  },
  {
    id: 'tr-606',
    flightNumber: 'TR 606',
    aircraft: 'Airbus A320neo',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[1], // BKK
    departureTime: '14:20',
    arrivalTime: '15:55',
    duration: '2h 35m',
    stops: 0,
    basePrice: 88,
    scootPlusAvailable: false
  },
  {
    id: 'tr-12',
    flightNumber: 'TR 12',
    aircraft: 'Boeing 787-9 Dreamliner',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[6], // SYD
    departureTime: '10:15',
    arrivalTime: '20:30',
    duration: '8h 15m',
    stops: 0,
    basePrice: 249,
    scootPlusAvailable: true
  },
  {
    id: 'tr-288',
    flightNumber: 'TR 288',
    aircraft: 'Airbus A321neo',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[2], // DPS Bali
    departureTime: '07:10',
    arrivalTime: '09:55',
    duration: '2h 45m',
    stops: 0,
    basePrice: 95,
    scootPlusAvailable: false
  },
  {
    id: 'tr-842',
    flightNumber: 'TR 842',
    aircraft: 'Boeing 787-9 Dreamliner',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[4], // ICN Seoul
    departureTime: '00:55',
    arrivalTime: '08:25',
    duration: '6h 30m',
    stops: 0,
    basePrice: 189,
    scootPlusAvailable: true
  },
  {
    id: 'tr-720',
    flightNumber: 'TR 720',
    aircraft: 'Boeing 787-8 Dreamliner',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[12], // ATH Athens
    departureTime: '02:40',
    arrivalTime: '09:05',
    duration: '11h 25m',
    stops: 0,
    basePrice: 389,
    scootPlusAvailable: true
  }
];

export const DEALS: DealOffer[] = [
  {
    id: 'd1',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[1], // BKK
    fareFrom: 78,
    imageUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    travelPeriod: 'Now - 30 Nov 2026',
    category: 'Popular',
    badge: 'HOT DEAL'
  },
  {
    id: 'd2',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[3], // NRT Tokyo
    fareFrom: 198,
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
    travelPeriod: '15 Oct - 15 Dec 2026',
    category: 'Popular',
    badge: 'DREAMLINER FARE'
  },
  {
    id: 'd3',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[2], // DPS Bali
    fareFrom: 95,
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    travelPeriod: 'Now - 15 Dec 2026',
    category: 'Weekend Getaway',
    badge: 'TROPICAL ESCAPE'
  },
  {
    id: 'd4',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[4], // ICN Seoul
    fareFrom: 189,
    imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80',
    travelPeriod: '01 Nov - 28 Feb 2027',
    category: 'Popular',
    badge: 'WINTER SALE'
  },
  {
    id: 'd5',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[6], // SYD Sydney
    fareFrom: 249,
    imageUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    travelPeriod: '20 Oct - 31 Jan 2027',
    category: 'Long Haul',
    badge: 'AUSSIE SUN'
  },
  {
    id: 'd6',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[12], // ATH Athens
    fareFrom: 389,
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    travelPeriod: 'Now - 28 Feb 2027',
    category: 'Long Haul',
    badge: 'EUROPE DIRECT'
  }
];

export const SCOOT_MEALS = [
  {
    id: 'm1',
    name: 'Singapore Signature Chicken Rice',
    description: 'Fragrant chicken broth rice served with tender poached chicken, chili dip, ginger and dark soy sauce.',
    price: 13,
    type: 'Hot Meal',
    isHalal: true
  },
  {
    id: 'm2',
    name: 'Nasi Lemak with Crispy Fried Chicken',
    description: 'Coconut-infused basmati rice, crispy chicken wing, hard-boiled egg, sambal chili and roasted peanuts.',
    price: 13,
    type: 'Hot Meal',
    isHalal: true
  },
  {
    id: 'm3',
    name: 'Tender Beef Rendang with Basmati',
    description: 'Rich slow-cooked beef in toasted coconut and aromatic herbs, served with turmeric basmati rice.',
    price: 15,
    type: 'Hot Meal',
    isHalal: true
  },
  {
    id: 'm4',
    name: 'Baked Plant-Based Lasagna',
    description: 'Layered durum wheat pasta with savory tomato vegetable ragù and creamy béchamel.',
    price: 12,
    type: 'Vegetarian',
    isHalal: false
  }
];

export const PRELOADED_BOOKINGS: BookingRecord[] = [
  {
    bookingRef: 'TR898S',
    lastName: 'Agrawal',
    passengerName: 'Sapranshu Agrawal',
    flightNumber: 'TR 898',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[3], // NRT Tokyo
    departureDate: '15 Oct 2026',
    departureTime: '01:10',
    seat: '12A',
    gate: 'D42',
    boardingGroup: 'Group 2',
    cabinClass: 'Economy',
    status: 'Confirmed',
    meal: 'Singapore Signature Chicken Rice',
    baggageKg: 20
  },
  {
    bookingRef: 'TR610B',
    lastName: 'Tan',
    passengerName: 'Evelyn Tan',
    flightNumber: 'TR 610',
    origin: AIRPORTS[0], // SIN
    destination: AIRPORTS[1], // BKK Bangkok
    departureDate: '18 Oct 2026',
    departureTime: '08:30',
    seat: '4C',
    gate: 'F31',
    boardingGroup: 'Group 1',
    cabinClass: 'ScootPlus',
    status: 'Checked-In',
    meal: 'Nasi Lemak with Crispy Fried Chicken',
    baggageKg: 30
  }
];
