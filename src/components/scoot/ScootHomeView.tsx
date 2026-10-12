import React from 'react';
import { Sparkles, ArrowRight, Plane, ShieldCheck, Award, Heart } from 'lucide-react';
import { BookingWidget } from './BookingWidget';
import { Airport, TripType, CabinClass, DealOffer } from '../../types/scoot';
import { DEALS } from '../../data/scootData';

interface ScootHomeViewProps {
  onSearchFlights: (params: {
    origin: Airport;
    destination: Airport;
    tripType: TripType;
    departureDate: string;
    returnDate?: string;
    passengers: { adults: number; children: number; infants: number };
    cabinClass: CabinClass;
    promoCode?: string;
  }) => void;
  onManageBookingLookup: (bookingRef: string, lastName: string) => void;
  onCheckinLookup: (bookingRef: string, departureCity: string) => void;
  onFlightStatusSearch: (flightNumber: string) => void;
  onSelectDeal: (deal: DealOffer) => void;
  onOpenExperience: () => void;
}

export const ScootHomeView: React.FC<ScootHomeViewProps> = ({
  onSearchFlights,
  onManageBookingLookup,
  onCheckinLookup,
  onFlightStatusSearch,
  onSelectDeal,
  onOpenExperience
}) => {
  return (
    <div className="font-scoot">
      {/* ================= HERO SECTION WITH BOOKING WIDGET ================= */}
      <section className="relative bg-gradient-to-b from-[#FFFBE6] via-[#FFF8D6] to-[#f4f5f8] pt-10 pb-20 px-4 lg:px-8 border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#FFE600] text-black font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Great Scoot Sale is On!</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-scoot-display text-[#1D1D1B] tracking-tight">
            Escape the ordinary<span className="text-[#FFE600]">.</span>
          </h1>
          <p className="text-sm md:text-base font-semibold text-gray-600 mt-2 max-w-xl mx-auto">
            Book cheap flights to 70+ exciting destinations across Asia-Pacific and Europe with Scoot.
          </p>
        </div>

        {/* Embedded Booking Widget */}
        <div className="relative z-20">
          <BookingWidget
            onSearchFlights={onSearchFlights}
            onManageBookingLookup={onManageBookingLookup}
            onCheckinLookup={onCheckinLookup}
            onFlightStatusSearch={onFlightStatusSearch}
          />
        </div>
      </section>

      {/* ================= POPULAR GETAWAYS & FARES ================= */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full inline-block mb-2">
              Featured Deals
            </span>
            <h2 className="text-3xl font-black font-scoot-display text-[#1D1D1B]">
              Top Flight Deals from Singapore
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              All-in one-way promotional fares, taxes included.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEALS.slice(0, 6).map((deal) => (
            <div
              key={deal.id}
              onClick={() => onSelectDeal(deal)}
              className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#FFE600] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={deal.imageUrl}
                  alt={deal.destination.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {deal.badge && (
                  <span className="absolute top-3 left-3 bg-[#FFE600] text-black text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {deal.badge}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-xs text-gray-400 font-bold mb-1">
                    <span>{deal.origin.code} ➔ {deal.destination.code}</span>
                    <span>{deal.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-black group-hover:text-amber-600 transition-colors">
                    {deal.destination.city}
                  </h3>
                  <div className="text-[11px] text-gray-400 mt-1">
                    Travel: {deal.travelPeriod}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-400 block">From</span>
                    <span className="text-xl font-black text-black font-scoot-display">
                      SGD ${deal.fareFrom}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#1D1D1B] bg-gray-100 group-hover:bg-[#FFE600] px-3 py-1.5 rounded-full transition-colors">
                    Book Now →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= THE SCOOT EXPERIENCE BANNER ================= */}
      <section className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8">
        <div className="bg-[#1D1D1B] text-white rounded-3xl p-8 lg:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="bg-[#FFE600] text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-3">
              ScootPlus
            </span>
            <h2 className="text-3xl md:text-4xl font-black font-scoot-display mb-3 text-white">
              Fly in Premium Comfort for Less
            </h2>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-6">
              Double the legroom in leather reclining seats, 30kg checked baggage, 15kg carry-on, delicious hot meals, and priority boarding on our Boeing 787 Dreamliner fleet.
            </p>
            <button
              onClick={onOpenExperience}
              className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-xs px-6 py-3.5 rounded-xl cursor-pointer transition-colors"
            >
              Explore ScootPlus Experience →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl font-black text-[#FFE600] block">38&quot;</span>
              <span className="text-[11px] text-gray-300">Pitch Legroom</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl font-black text-[#FFE600] block">30kg</span>
              <span className="text-[11px] text-gray-300">Check-In Bag</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl font-black text-[#FFE600] block">Wi-Fi</span>
              <span className="text-[11px] text-gray-300">In-Flight Data</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl font-black text-[#FFE600] block">Meals</span>
              <span className="text-[11px] text-gray-300">Scoot Café</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
