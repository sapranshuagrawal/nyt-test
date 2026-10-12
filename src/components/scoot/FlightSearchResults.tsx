import React, { useState } from 'react';
import {
  ArrowLeft,
  Plane,
  Clock,
  Luggage,
  Coffee,
  Sparkles,
  Check,
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Airport, FlightOption, FareTier, CabinClass } from '../../types/scoot';
import { SAMPLE_FLIGHTS } from '../../data/scootData';

interface FlightSearchResultsProps {
  origin: Airport;
  destination: Airport;
  departureDate: string;
  passengers: { adults: number; children: number; infants: number };
  cabinClass: CabinClass;
  promoCode?: string;
  onBack: () => void;
  onProceedToCustomize: (selectedFlight: FlightOption, tier: FareTier, totalPrice: number) => void;
}

export const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({
  origin,
  destination,
  departureDate,
  passengers,
  cabinClass,
  promoCode,
  onBack,
  onProceedToCustomize
}) => {
  const [selectedFlightId, setSelectedFlightId] = useState<string>('tr-898');
  const [selectedTier, setSelectedTier] = useState<FareTier>(cabinClass === 'ScootPlus' ? 'scootplus' : 'flybag');

  // Match or generate relevant flights for this route
  const matchingFlights: FlightOption[] = SAMPLE_FLIGHTS.filter(
    (f) =>
      (f.origin.code === origin.code && f.destination.code === destination.code) ||
      (f.origin.code === origin.code)
  );

  const displayFlights = matchingFlights.length > 0 ? matchingFlights : [
    {
      id: 'custom-tr-1',
      flightNumber: 'TR 898',
      aircraft: 'Boeing 787-9 Dreamliner',
      origin,
      destination,
      departureTime: '01:10',
      arrivalTime: '08:55',
      duration: '6h 45m',
      stops: 0,
      basePrice: 198,
      scootPlusAvailable: true
    },
    {
      id: 'custom-tr-2',
      flightNumber: 'TR 808',
      aircraft: 'Airbus A321neo',
      origin,
      destination,
      departureTime: '11:30',
      arrivalTime: '19:10',
      duration: '6h 40m',
      stops: 0,
      basePrice: 228,
      scootPlusAvailable: false
    }
  ];

  const currentFlight = displayFlights.find((f) => f.id === selectedFlightId) || displayFlights[0];

  // Pricing calculations
  const totalCount = passengers.adults + passengers.children;
  const baseFare = currentFlight.basePrice;

  const tierAddons: Record<FareTier, number> = {
    fly: 0,
    flybag: 50,
    flybageat: 70,
    scootplus: 260
  };

  const perPaxPrice = baseFare + tierAddons[selectedTier];
  const discountMultiplier = promoCode ? 0.8 : 1.0;
  const subtotal = Math.round(perPaxPrice * totalCount * discountMultiplier);
  const taxesAndFees = 64 * totalCount;
  const totalPrice = subtotal + taxesAndFees;

  const calendarDays = [
    { day: 'Mon, 13 Oct', price: baseFare + 20, isLowest: false },
    { day: 'Tue, 14 Oct', price: baseFare + 10, isLowest: false },
    { day: 'Wed, 15 Oct', price: baseFare, isLowest: true },
    { day: 'Thu, 16 Oct', price: baseFare + 35, isLowest: false },
    { day: 'Fri, 17 Oct', price: baseFare + 60, isLowest: false },
    { day: 'Sat, 18 Oct', price: baseFare + 85, isLowest: false },
    { day: 'Sun, 19 Oct', price: baseFare + 40, isLowest: false }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-6 font-scoot">
      {/* Top Breadcrumb Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-black cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Modify Flight Search</span>
        </button>

        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <span>1. Flights</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-gray-300">2. Seats & Add-ons</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-gray-300">3. Confirmation</span>
        </div>
      </div>

      {/* Flight Route Header Banner */}
      <div className="bg-[#1D1D1B] text-white rounded-2xl p-6 mb-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold font-scoot-display">
            <span>{origin.city} ({origin.code})</span>
            <span className="text-[#FFE600]">➔</span>
            <span>{destination.city} ({destination.code})</span>
          </div>
          <div className="text-xs text-gray-300 mt-1 flex items-center gap-3">
            <span>Depart: {departureDate}</span>
            <span>•</span>
            <span>
              {totalCount} Guest{totalCount > 1 ? 's' : ''} ({passengers.adults} Adult{passengers.adults > 1 ? 's' : ''}
              {passengers.children > 0 ? `, ${passengers.children} Child` : ''})
            </span>
            {promoCode && (
              <>
                <span>•</span>
                <span className="text-[#FFE600] font-bold">20% Off Applied ({promoCode})</span>
              </>
            )}
          </div>
        </div>

        <div className="bg-white/10 px-4 py-2.5 rounded-xl border border-white/15 text-right">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 block font-bold">
            Fares starting from
          </span>
          <span className="text-2xl font-black text-[#FFE600]">
            SGD ${baseFare}
          </span>
        </div>
      </div>

      {/* 7-Day Low Fare Calendar Matrix */}
      <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-xs mb-8 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[700px]">
          {calendarDays.map((item, idx) => (
            <div
              key={idx}
              className={`flex-1 p-3 rounded-xl text-center border cursor-pointer transition-all ${
                item.isLowest
                  ? 'border-[#FFE600] bg-yellow-50/50 shadow-xs'
                  : 'border-transparent hover:bg-gray-50'
              }`}
            >
              <div className="text-[11px] font-semibold text-gray-500">{item.day}</div>
              <div className="text-sm font-extrabold text-black mt-0.5">
                SGD ${Math.round(item.price * discountMultiplier)}
              </div>
              {item.isLowest && (
                <span className="inline-block mt-1 text-[9px] bg-[#FFE600] font-extrabold px-1.5 py-0.5 rounded-full text-black">
                  LOWEST
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Flight Cards List */}
      <div className="space-y-6 mb-8">
        {displayFlights.map((flight) => {
          const isSelected = flight.id === selectedFlightId;

          return (
            <div
              key={flight.id}
              className={`bg-white rounded-2xl border-2 transition-all overflow-hidden ${
                isSelected ? 'border-[#FFE600] shadow-md' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Flight Basic Header Bar */}
              <div
                onClick={() => setSelectedFlightId(flight.id)}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer bg-gradient-to-r from-gray-50 to-white"
              >
                {/* Flight times & duration */}
                <div className="flex items-center gap-6">
                  {/* Departure */}
                  <div>
                    <div className="text-2xl font-black text-black">{flight.departureTime}</div>
                    <div className="text-xs font-bold text-gray-600">{flight.origin.code}</div>
                  </div>

                  {/* Flight duration line */}
                  <div className="flex flex-col items-center px-4">
                    <span className="text-[11px] font-bold text-gray-500 mb-1">{flight.duration}</span>
                    <div className="w-24 sm:w-32 h-[2px] bg-gray-300 relative flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-black absolute left-0"></div>
                      <Plane className="w-3.5 h-3.5 text-black rotate-90" />
                      <div className="w-2 h-2 rounded-full bg-black absolute right-0"></div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-bold mt-1">Direct Non-Stop</span>
                  </div>

                  {/* Arrival */}
                  <div>
                    <div className="text-2xl font-black text-black">{flight.arrivalTime}</div>
                    <div className="text-xs font-bold text-gray-600">{flight.destination.code}</div>
                  </div>
                </div>

                {/* Aircraft and Flight No. */}
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="font-extrabold text-sm text-black">{flight.flightNumber}</div>
                    <div className="text-[11px] text-gray-500 flex items-center gap-1 justify-end">
                      {flight.aircraft.includes('787') && (
                        <span className="bg-[#FFE600] text-black text-[9px] font-black px-1.5 py-0.2 rounded">
                          787
                        </span>
                      )}
                      <span>{flight.aircraft}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fare Tiers Selector (Fly, FlyBag, FlyBagEat, ScootPlus) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-5 border-t border-gray-100 bg-white">
                {/* Tier 1: FLY */}
                <div
                  onClick={() => {
                    setSelectedFlightId(flight.id);
                    setSelectedTier('fly');
                  }}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected && selectedTier === 'fly'
                      ? 'border-[#FFE600] bg-yellow-50/30 ring-2 ring-[#FFE600]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-sm text-black uppercase">Fly</span>
                    {isSelected && selectedTier === 'fly' && <Check className="w-4 h-4 text-black" />}
                  </div>
                  <div className="text-xl font-black text-black">
                    SGD ${Math.round(flight.basePrice * discountMultiplier)}
                  </div>
                  <div className="text-[10px] text-gray-500 mb-3">per guest</div>
                  <ul className="text-xs space-y-1.5 text-gray-600">
                    <li className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>10kg Cabin Baggage</span>
                    </li>
                    <li className="text-gray-400 text-[11px]">No checked baggage</li>
                  </ul>
                </div>

                {/* Tier 2: FLYBAG */}
                <div
                  onClick={() => {
                    setSelectedFlightId(flight.id);
                    setSelectedTier('flybag');
                  }}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected && selectedTier === 'flybag'
                      ? 'border-[#FFE600] bg-yellow-50/30 ring-2 ring-[#FFE600]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-black text-sm text-black uppercase">FlyBag</span>
                      <span className="ml-1 text-[9px] bg-yellow-200 px-1 rounded font-bold">POPULAR</span>
                    </div>
                    {isSelected && selectedTier === 'flybag' && <Check className="w-4 h-4 text-black" />}
                  </div>
                  <div className="text-xl font-black text-black">
                    SGD ${Math.round((flight.basePrice + 50) * discountMultiplier)}
                  </div>
                  <div className="text-[10px] text-gray-500 mb-3">per guest</div>
                  <ul className="text-xs space-y-1.5 text-gray-600">
                    <li className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>10kg Cabin Baggage</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-medium">
                      <Luggage className="w-3.5 h-3.5 text-[#567b95]" />
                      <span>20kg Checked Baggage</span>
                    </li>
                  </ul>
                </div>

                {/* Tier 3: FLYBAGEAT */}
                <div
                  onClick={() => {
                    setSelectedFlightId(flight.id);
                    setSelectedTier('flybageat');
                  }}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected && selectedTier === 'flybageat'
                      ? 'border-[#FFE600] bg-yellow-50/30 ring-2 ring-[#FFE600]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-sm text-black uppercase">FlyBagEat</span>
                    {isSelected && selectedTier === 'flybageat' && <Check className="w-4 h-4 text-black" />}
                  </div>
                  <div className="text-xl font-black text-black">
                    SGD ${Math.round((flight.basePrice + 70) * discountMultiplier)}
                  </div>
                  <div className="text-[10px] text-gray-500 mb-3">per guest</div>
                  <ul className="text-xs space-y-1.5 text-gray-600">
                    <li className="flex items-center gap-1.5 font-medium">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>10kg Cabin Baggage</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-medium">
                      <Luggage className="w-3.5 h-3.5 text-[#567b95]" />
                      <span>20kg Checked Baggage</span>
                    </li>
                    <li className="flex items-center gap-1.5 font-medium">
                      <Coffee className="w-3.5 h-3.5 text-amber-700" />
                      <span>Hot Meal & Beverage</span>
                    </li>
                  </ul>
                </div>

                {/* Tier 4: SCOOTPLUS */}
                {flight.scootPlusAvailable ? (
                  <div
                    onClick={() => {
                      setSelectedFlightId(flight.id);
                      setSelectedTier('scootplus');
                    }}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      isSelected && selectedTier === 'scootplus'
                        ? 'border-black bg-neutral-900 text-white ring-2 ring-black'
                        : 'border-gray-200 bg-neutral-900 text-white hover:border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-[#FFE600]" />
                        <span className="font-black text-sm text-[#FFE600] uppercase">ScootPlus</span>
                      </div>
                      {isSelected && selectedTier === 'scootplus' && (
                        <Check className="w-4 h-4 text-[#FFE600]" />
                      )}
                    </div>
                    <div className="text-xl font-black text-white">
                      SGD ${Math.round((flight.basePrice + 260) * discountMultiplier)}
                    </div>
                    <div className="text-[10px] text-gray-400 mb-3">per guest</div>
                    <ul className="text-xs space-y-1.5 text-gray-300">
                      <li className="flex items-center gap-1.5 font-medium">
                        <Award className="w-3.5 h-3.5 text-[#FFE600]" />
                        <span>38&quot; Pitch Leather Recliner</span>
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <Luggage className="w-3.5 h-3.5 text-[#FFE600]" />
                        <span>30kg Bag + 15kg Carry-On</span>
                      </li>
                      <li className="flex items-center gap-1.5 font-medium">
                        <Coffee className="w-3.5 h-3.5 text-[#FFE600]" />
                        <span>Hot Meal + 30MB Wi-Fi</span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center text-center text-xs text-gray-400">
                    ScootPlus not available on this aircraft
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Cart & Checkout Bar */}
      <div className="sticky bottom-4 z-40 bg-[#1D1D1B] text-white rounded-2xl shadow-2xl p-5 border border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs text-gray-400">
            Selected: <strong className="text-white">{currentFlight.flightNumber}</strong> ({currentFlight.origin.code} ➔ {currentFlight.destination.code}) • Tier: <strong className="text-[#FFE600] uppercase">{selectedTier}</strong>
          </div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-white font-scoot-display">
              SGD ${totalPrice}
            </span>
            <span className="text-xs text-gray-400">
              (Total for {totalCount} guest{totalCount > 1 ? 's' : ''}, incl. taxes & airport fees)
            </span>
          </div>
        </div>

        <button
          onClick={() => onProceedToCustomize(currentFlight, selectedTier, totalPrice)}
          className="w-full sm:w-auto bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all hover:scale-105"
        >
          <span>Continue to Seats & Add-Ons</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
