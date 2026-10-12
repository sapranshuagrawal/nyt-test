export type TripType = 'return' | 'oneway' | 'multicity';

export type CabinClass = 'Economy' | 'ScootPlus';

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
  region: 'Southeast Asia' | 'North Asia' | 'Australia' | 'Europe' | 'India';
}

export interface FlightOption {
  id: string;
  flightNumber: string;
  aircraft: string; // e.g. "Boeing 787-9 Dreamliner" | "Airbus A321neo"
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  basePrice: number; // in SGD
  scootPlusAvailable: boolean;
}

export type FareTier = 'fly' | 'flybag' | 'flybageat' | 'scootplus';

export interface SelectedFlightBooking {
  outboundFlight: FlightOption;
  returnFlight?: FlightOption;
  tier: FareTier;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  totalPrice: number;
  promoCodeApplied?: string;
  discountAmount?: number;
  selectedSeat?: string;
  selectedMeal?: string;
  selectedBaggageKg?: number;
}

export interface DealOffer {
  id: string;
  destination: Airport;
  origin: Airport;
  fareFrom: number; // in SGD
  imageUrl: string;
  travelPeriod: string;
  category: 'Popular' | 'Weekend Getaway' | 'Long Haul' | 'Last Minute';
  badge?: string;
}

export interface BookingRecord {
  bookingRef: string;
  lastName: string;
  passengerName: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureDate: string;
  departureTime: string;
  seat: string;
  gate: string;
  boardingGroup: string;
  cabinClass: CabinClass;
  status: 'Confirmed' | 'Checked-In' | 'Completed';
  meal?: string;
  baggageKg: number;
}
