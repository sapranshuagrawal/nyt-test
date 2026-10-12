import React, { useState } from 'react';
import {
  Plane,
  ArrowRightLeft,
  Calendar,
  Users,
  Tag,
  Search,
  Check,
  ChevronDown,
  X,
  Sparkles
} from 'lucide-react';
import { Airport, TripType, CabinClass } from '../../types/scoot';
import { AIRPORTS } from '../../data/scootData';

interface BookingWidgetProps {
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
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  onSearchFlights,
  onManageBookingLookup,
  onCheckinLookup,
  onFlightStatusSearch
}) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'manage' | 'checkin' | 'status'>('flights');

  // Flight search states
  const [tripType, setTripType] = useState<TripType>('return');
  const [origin, setOrigin] = useState<Airport>(AIRPORTS[0]); // SIN
  const [destination, setDestination] = useState<Airport>(AIRPORTS[3]); // NRT Tokyo
  const [departureDate, setDepartureDate] = useState('2026-10-15');
  const [returnDate, setReturnDate] = useState('2026-10-22');
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');

  // Passengers
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  // Manage booking states
  const [manageRef, setManageRef] = useState('TR898S');
  const [manageLastName, setManageLastName] = useState('Agrawal');

  // Check-in states
  const [checkinRef, setCheckinRef] = useState('TR898S');
  const [checkinCity, setCheckinCity] = useState('Singapore');

  // Flight status states
  const [statusFlightNo, setStatusFlightNo] = useState('TR 898');

  // Airport pickers modal/dropdown
  const [isOriginPickerOpen, setIsOriginPickerOpen] = useState(false);
  const [isDestPickerOpen, setIsDestPickerOpen] = useState(false);

  const handleSwapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ESCAPE20' || promoCode.trim().length > 3) {
      setPromoApplied(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFlights({
      origin,
      destination,
      tripType,
      departureDate,
      returnDate: tripType === 'return' ? returnDate : undefined,
      passengers: { adults, children, infants },
      cabinClass,
      promoCode: promoApplied ? (promoCode.toUpperCase() || 'ESCAPE20') : undefined
    });
  };

  const totalPassengers = adults + children + infants;

  return (
    <div className="w-full max-w-[1180px] mx-auto font-scoot">
      {/* Widget Container with Scoot rounded card & shadow */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Top Feature Tabs */}
        <div className="flex border-b border-gray-100 bg-[#fbfbfb] overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('flights')}
            className={`flex items-center gap-2 px-6 py-4 cursor-pointer transition-all border-b-2 ${
              activeTab === 'flights'
                ? 'border-[#FFE600] bg-white text-[#1D1D1B]'
                : 'border-transparent text-[#727272] hover:text-black'
            }`}
          >
            <Plane className="w-4 h-4 text-[#1D1D1B]" />
            <span>Book Flights</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center gap-2 px-6 py-4 cursor-pointer transition-all border-b-2 ${
              activeTab === 'manage'
                ? 'border-[#FFE600] bg-white text-[#1D1D1B]'
                : 'border-transparent text-[#727272] hover:text-black'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#1D1D1B]" />
            <span>Manage Booking</span>
          </button>

          <button
            onClick={() => setActiveTab('checkin')}
            className={`flex items-center gap-2 px-6 py-4 cursor-pointer transition-all border-b-2 ${
              activeTab === 'checkin'
                ? 'border-[#FFE600] bg-white text-[#1D1D1B]'
                : 'border-transparent text-[#727272] hover:text-black'
            }`}
          >
            <Check className="w-4 h-4 text-[#1D1D1B]" />
            <span>Web Check-In</span>
          </button>

          <button
            onClick={() => setActiveTab('status')}
            className={`flex items-center gap-2 px-6 py-4 cursor-pointer transition-all border-b-2 ${
              activeTab === 'status'
                ? 'border-[#FFE600] bg-white text-[#1D1D1B]'
                : 'border-transparent text-[#727272] hover:text-black'
            }`}
          >
            <Search className="w-4 h-4 text-[#1D1D1B]" />
            <span>Flight Status</span>
          </button>
        </div>

        {/* ================= TAB 1: BOOK FLIGHTS ================= */}
        {activeTab === 'flights' && (
          <form onSubmit={handleSearch} className="p-6 lg:p-8 space-y-6">
            {/* Trip Type Selector & ScootPlus Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setTripType('return')}
                  className={`px-4 py-1.5 rounded-full cursor-pointer transition-all ${
                    tripType === 'return' ? 'bg-[#FFE600] text-black shadow-xs' : 'text-[#727272] hover:text-black'
                  }`}
                >
                  Return
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('oneway')}
                  className={`px-4 py-1.5 rounded-full cursor-pointer transition-all ${
                    tripType === 'oneway' ? 'bg-[#FFE600] text-black shadow-xs' : 'text-[#727272] hover:text-black'
                  }`}
                >
                  One-way
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('multicity')}
                  className={`px-4 py-1.5 rounded-full cursor-pointer transition-all ${
                    tripType === 'multicity' ? 'bg-[#FFE600] text-black shadow-xs' : 'text-[#727272] hover:text-black'
                  }`}
                >
                  Multi-city
                </button>
              </div>

              {/* Promo Banner badge */}
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Use code <strong>ESCAPE20</strong> for 20% off selected flights!</span>
              </div>
            </div>

            {/* Flight Route Inputs (Origin & Destination) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Origin */}
              <div className="md:col-span-5 relative">
                <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#727272] mb-1">
                  Flying From
                </label>
                <div
                  onClick={() => setIsOriginPickerOpen(true)}
                  className="flex items-center justify-between p-3.5 rounded-xl border-2 border-gray-200 hover:border-[#FFE600] bg-white cursor-pointer transition-colors"
                >
                  <div>
                    <div className="font-extrabold text-base text-[#1D1D1B] flex items-center gap-2">
                      <span>{origin.city}</span>
                      <span className="text-xs bg-[#FFE600] px-1.5 py-0.5 rounded font-bold">
                        {origin.code}
                      </span>
                    </div>
                    <div className="text-xs text-[#727272] truncate">{origin.name}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {/* Origin Selector Modal */}
                {isOriginPickerOpen && (
                  <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 max-h-60 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2 px-2 text-xs font-bold text-gray-500">
                      <span>Select Departure City</span>
                      <X
                        className="w-4 h-4 cursor-pointer hover:text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOriginPickerOpen(false);
                        }}
                      />
                    </div>
                    {AIRPORTS.map((apt) => (
                      <div
                        key={apt.code}
                        onClick={() => {
                          setOrigin(apt);
                          setIsOriginPickerOpen(false);
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-50 cursor-pointer text-xs"
                      >
                        <div>
                          <span className="font-bold text-black">{apt.city}</span>
                          <span className="text-gray-400 ml-1.5">({apt.name})</span>
                        </div>
                        <span className="font-extrabold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                          {apt.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="md:col-span-2 flex justify-center py-1">
                <button
                  type="button"
                  onClick={handleSwapAirports}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-[#FFE600] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  title="Swap destination and origin"
                >
                  <ArrowRightLeft className="w-4 h-4 text-[#1D1D1B]" />
                </button>
              </div>

              {/* Destination */}
              <div className="md:col-span-5 relative">
                <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#727272] mb-1">
                  Flying To
                </label>
                <div
                  onClick={() => setIsDestPickerOpen(true)}
                  className="flex items-center justify-between p-3.5 rounded-xl border-2 border-gray-200 hover:border-[#FFE600] bg-white cursor-pointer transition-colors"
                >
                  <div>
                    <div className="font-extrabold text-base text-[#1D1D1B] flex items-center gap-2">
                      <span>{destination.city}</span>
                      <span className="text-xs bg-[#FFE600] px-1.5 py-0.5 rounded font-bold">
                        {destination.code}
                      </span>
                    </div>
                    <div className="text-xs text-[#727272] truncate">{destination.name}</div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {/* Destination Selector Modal */}
                {isDestPickerOpen && (
                  <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 max-h-60 overflow-y-auto">
                    <div className="flex justify-between items-center mb-2 px-2 text-xs font-bold text-gray-500">
                      <span>Select Arrival City</span>
                      <X
                        className="w-4 h-4 cursor-pointer hover:text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsDestPickerOpen(false);
                        }}
                      />
                    </div>
                    {AIRPORTS.map((apt) => (
                      <div
                        key={apt.code}
                        onClick={() => {
                          setDestination(apt);
                          setIsDestPickerOpen(false);
                        }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-yellow-50 cursor-pointer text-xs"
                      >
                        <div>
                          <span className="font-bold text-black">{apt.city}</span>
                          <span className="text-gray-400 ml-1.5">({apt.name})</span>
                        </div>
                        <span className="font-extrabold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                          {apt.code}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Dates, Passengers & Promo Code Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
              {/* Departure Date */}
              <div className="lg:col-span-3">
                <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#727272] mb-1">
                  Depart
                </label>
                <div className="flex items-center p-3 rounded-xl border-2 border-gray-200 hover:border-[#FFE600] bg-white">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full text-xs font-bold text-[#1D1D1B] bg-transparent outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Return Date */}
              {tripType === 'return' && (
                <div className="lg:col-span-3">
                  <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#727272] mb-1">
                    Return
                  </label>
                  <div className="flex items-center p-3 rounded-xl border-2 border-gray-200 hover:border-[#FFE600] bg-white">
                    <Calendar className="w-4 h-4 text-gray-500 mr-2 shrink-0" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full text-xs font-bold text-[#1D1D1B] bg-transparent outline-none cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* Passengers & Cabin */}
              <div className={`relative ${tripType === 'return' ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
                <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#727272] mb-1">
                  Passengers & Cabin
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-gray-200 hover:border-[#FFE600] bg-white text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-xs font-bold text-[#1D1D1B]">
                      {totalPassengers} Guest{totalPassengers > 1 ? 's' : ''}, {cabinClass}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Passenger Dropdown */}
                {showPassengerDropdown && (
                  <div className="absolute bottom-full mb-2 left-0 right-0 sm:w-72 z-40 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                      <span className="text-xs font-bold text-gray-700">Cabin Class</span>
                      <div className="flex gap-1 text-xs">
                        <button
                          type="button"
                          onClick={() => setCabinClass('Economy')}
                          className={`px-2.5 py-1 rounded-full cursor-pointer font-bold ${
                            cabinClass === 'Economy' ? 'bg-[#FFE600] text-black' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          Economy
                        </button>
                        <button
                          type="button"
                          onClick={() => setCabinClass('ScootPlus')}
                          className={`px-2.5 py-1 rounded-full cursor-pointer font-bold ${
                            cabinClass === 'ScootPlus' ? 'bg-[#1D1D1B] text-[#FFE600]' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          ScootPlus
                        </button>
                      </div>
                    </div>

                    {/* Adults */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-black">Adults</div>
                        <div className="text-[10px] text-gray-400">12+ years</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdults(Math.max(1, adults - 1))}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{adults}</span>
                        <button
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#FFE600] flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-black">Children</div>
                        <div className="text-[10px] text-gray-400">2-11 years</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildren(Math.max(0, children - 1))}
                          className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold w-4 text-center">{children}</span>
                        <button
                          type="button"
                          onClick={() => setChildren(children + 1)}
                          className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#FFE600] flex items-center justify-center font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowPassengerDropdown(false)}
                      className="w-full bg-[#FFE600] hover:bg-[#ffd700] text-black text-xs font-bold py-2 rounded-lg cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Promo code */}
              <div className={`lg:col-span-3 ${tripType !== 'return' ? 'lg:col-span-5' : ''}`}>
                <label className="block text-[11px] uppercase tracking-wider font-extrabold text-[#727272] mb-1">
                  Promo Code
                </label>
                <div className="flex items-center p-2 rounded-xl border-2 border-gray-200 focus-within:border-[#FFE600] bg-white">
                  <Tag className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="e.g. ESCAPE20"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoApplied(false);
                    }}
                    className="w-full text-xs font-bold uppercase tracking-wider text-black outline-none placeholder:font-normal placeholder:capitalize"
                  />
                  {promoCode && (
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="text-[10px] bg-black text-[#FFE600] font-bold px-2 py-1 rounded cursor-pointer"
                    >
                      {promoApplied ? 'Applied' : 'Apply'}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Giant Yellow Search Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#FFE600] hover:bg-[#fbd300] text-[#1D1D1B] py-4 rounded-xl font-extrabold text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all hover:scale-[1.005]"
              >
                <span>SEARCH FLIGHTS</span>
                <Plane className="w-5 h-5 ml-1" />
              </button>
            </div>
          </form>
        )}

        {/* ================= TAB 2: MANAGE BOOKING ================= */}
        {activeTab === 'manage' && (
          <div className="p-6 lg:p-8 space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-black">Retrieve Your Flight Reservation</h3>
              <p className="text-xs text-[#727272] mt-0.5">
                Add baggage, pick your favorite seat, pre-order hot meals from Scoot Café, or update travel info.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#727272] uppercase tracking-wider mb-1">
                  Booking Reference (PNR)
                </label>
                <input
                  type="text"
                  placeholder="e.g. TR898S"
                  value={manageRef}
                  onChange={(e) => setManageRef(e.target.value.toUpperCase())}
                  className="w-full p-3.5 rounded-xl border-2 border-gray-200 focus:border-[#FFE600] font-bold text-sm uppercase outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#727272] uppercase tracking-wider mb-1">
                  Passenger Last Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Agrawal"
                  value={manageLastName}
                  onChange={(e) => setManageLastName(e.target.value)}
                  className="w-full p-3.5 rounded-xl border-2 border-gray-200 focus:border-[#FFE600] font-bold text-sm outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onManageBookingLookup(manageRef, manageLastName)}
                className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl cursor-pointer transition-colors"
              >
                Find My Booking →
              </button>
              <span className="text-xs text-gray-500">
                Try pre-loaded demo: <strong>TR898S</strong> / <strong>Agrawal</strong>
              </span>
            </div>
          </div>
        )}

        {/* ================= TAB 3: WEB CHECK-IN ================= */}
        {activeTab === 'checkin' && (
          <div className="p-6 lg:p-8 space-y-6">
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 p-3 rounded-xl text-xs text-yellow-950 font-medium">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Web Check-In is available from 48 hours up to 60 minutes before scheduled departure!</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[#727272] uppercase tracking-wider mb-1">
                  Booking Reference (PNR)
                </label>
                <input
                  type="text"
                  placeholder="e.g. TR898S"
                  value={checkinRef}
                  onChange={(e) => setCheckinRef(e.target.value.toUpperCase())}
                  className="w-full p-3.5 rounded-xl border-2 border-gray-200 focus:border-[#FFE600] font-bold text-sm uppercase outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-[#727272] uppercase tracking-wider mb-1">
                  Departure City
                </label>
                <input
                  type="text"
                  placeholder="e.g. Singapore"
                  value={checkinCity}
                  onChange={(e) => setCheckinCity(e.target.value)}
                  className="w-full p-3.5 rounded-xl border-2 border-gray-200 focus:border-[#FFE600] font-bold text-sm outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => onCheckinLookup(checkinRef, checkinCity)}
              className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl cursor-pointer transition-colors"
            >
              Proceed to Check-In & Get Boarding Pass →
            </button>
          </div>
        )}

        {/* ================= TAB 4: FLIGHT STATUS ================= */}
        {activeTab === 'status' && (
          <div className="p-6 lg:p-8 space-y-6">
            <div>
              <h3 className="font-extrabold text-lg text-black">Real-Time Flight Tracker</h3>
              <p className="text-xs text-[#727272] mt-0.5">
                Track departure gates, arrival times, and aircraft status across the Scoot network.
              </p>
            </div>

            <div className="max-w-md">
              <label className="block text-xs font-extrabold text-[#727272] uppercase tracking-wider mb-1">
                Scoot Flight Number
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="TR 898"
                  value={statusFlightNo}
                  onChange={(e) => setStatusFlightNo(e.target.value.toUpperCase())}
                  className="w-full p-3.5 rounded-xl border-2 border-gray-200 focus:border-[#FFE600] font-bold text-sm uppercase outline-none"
                />
                <button
                  type="button"
                  onClick={() => onFlightStatusSearch(statusFlightNo)}
                  className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-sm px-6 py-3.5 rounded-xl shrink-0 cursor-pointer"
                >
                  Track Flight
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
