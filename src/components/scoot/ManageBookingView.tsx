import React, { useState } from 'react';
import {
  Calendar,
  Luggage,
  Coffee,
  CheckCircle,
  QrCode,
  Plane,
  ShieldCheck,
  User,
  AlertCircle
} from 'lucide-react';
import { BookingRecord } from '../../types/scoot';
import { PRELOADED_BOOKINGS, SCOOT_MEALS } from '../../data/scootData';

interface ManageBookingViewProps {
  initialBooking?: BookingRecord | null;
  onOpenBoardingPass: (booking: BookingRecord) => void;
  onBackToHome: () => void;
}

export const ManageBookingView: React.FC<ManageBookingViewProps> = ({
  initialBooking,
  onOpenBoardingPass,
  onBackToHome
}) => {
  const [bookingRefInput, setBookingRefInput] = useState('TR898S');
  const [lastNameInput, setLastNameInput] = useState('Agrawal');
  const [currentBooking, setCurrentBooking] = useState<BookingRecord>(
    initialBooking || PRELOADED_BOOKINGS[0]
  );
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const found = PRELOADED_BOOKINGS.find(
      (b) =>
        b.bookingRef.toUpperCase() === bookingRefInput.trim().toUpperCase() &&
        b.lastName.toLowerCase() === lastNameInput.trim().toLowerCase()
    );

    if (found) {
      setCurrentBooking(found);
      setFeedbackMsg('Booking retrieved successfully!');
    } else {
      // Create dynamically so user is never stuck
      const dynamicBooking: BookingRecord = {
        bookingRef: bookingRefInput.toUpperCase() || 'TR898S',
        lastName: lastNameInput || 'Traveler',
        passengerName: `Mr. ${lastNameInput || 'Traveler'}`,
        flightNumber: 'TR 898',
        origin: { code: 'SIN', city: 'Singapore', name: 'Changi Airport', country: 'Singapore', region: 'Southeast Asia' },
        destination: { code: 'NRT', city: 'Tokyo', name: 'Narita International', country: 'Japan', region: 'North Asia' },
        departureDate: '15 Oct 2026',
        departureTime: '01:10',
        seat: '14A',
        gate: 'D42',
        boardingGroup: 'Group 2',
        cabinClass: 'Economy',
        status: 'Confirmed',
        meal: 'Singapore Signature Chicken Rice',
        baggageKg: 20
      };
      setCurrentBooking(dynamicBooking);
      setFeedbackMsg('Custom booking reservation loaded!');
    }
  };

  const handleUpgradeBaggage = (kg: number) => {
    setCurrentBooking({ ...currentBooking, baggageKg: kg });
    setFeedbackMsg(`Baggage allowance updated to ${kg}kg!`);
  };

  const handleSelectMeal = (mealName: string) => {
    setCurrentBooking({ ...currentBooking, meal: mealName });
    setFeedbackMsg(`Meal updated to ${mealName}!`);
  };

  return (
    <div className="max-w-[1180px] mx-auto px-4 lg:px-8 py-8 font-scoot">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#1D1D1B] font-scoot-display">
          Manage Your Scoot Booking
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Customize baggage, pick your favorite seat, pre-order hot meals, or generate digital boarding passes.
        </p>
      </div>

      {feedbackMsg && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>{feedbackMsg}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-emerald-900 underline cursor-pointer text-[11px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Lookup Form */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
        <form onSubmit={handleLookup} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-5">
            <label className="block text-xs font-extrabold text-gray-600 uppercase mb-1">
              Booking Reference (PNR)
            </label>
            <input
              type="text"
              value={bookingRefInput}
              onChange={(e) => setBookingRefInput(e.target.value.toUpperCase())}
              placeholder="e.g. TR898S"
              className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FFE600] font-bold text-sm uppercase outline-none"
            />
          </div>

          <div className="md:col-span-5">
            <label className="block text-xs font-extrabold text-gray-600 uppercase mb-1">
              Passenger Last Name
            </label>
            <input
              type="text"
              value={lastNameInput}
              onChange={(e) => setLastNameInput(e.target.value)}
              placeholder="e.g. Agrawal"
              className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FFE600] font-bold text-sm outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-xs py-3.5 rounded-xl cursor-pointer shadow-xs"
            >
              Retrieve
            </button>
          </div>
        </form>
      </div>

      {/* Booking Details Card */}
      {currentBooking && (
        <div className="space-y-6">
          {/* Main Flight Card */}
          <div className="bg-[#1D1D1B] text-white rounded-2xl p-6 shadow-md overflow-hidden relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-5 mb-5">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#FFE600] block mb-1">
                  Confirmed Booking • {currentBooking.bookingRef}
                </span>
                <h2 className="text-2xl font-black font-scoot-display">
                  {currentBooking.passengerName}
                </h2>
                <div className="text-xs text-gray-400 mt-1">
                  Flight {currentBooking.flightNumber} • {currentBooking.departureDate} at {currentBooking.departureTime}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenBoardingPass(currentBooking)}
                  className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-black text-xs px-5 py-3 rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-transform hover:scale-105"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View Boarding Pass</span>
                </button>
              </div>
            </div>

            {/* Route & Times */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div>
                <span className="text-xs text-gray-400 block">Origin</span>
                <span className="text-2xl font-black">{currentBooking.origin.code}</span>
                <div className="text-xs text-gray-300">{currentBooking.origin.city}</div>
              </div>

              <div className="flex flex-col items-center">
                <Plane className="w-5 h-5 text-[#FFE600] rotate-90 mb-1" />
                <span className="text-xs font-bold text-gray-400">Non-Stop Direct</span>
              </div>

              <div className="text-left md:text-right">
                <span className="text-xs text-gray-400 block">Destination</span>
                <span className="text-2xl font-black">{currentBooking.destination.code}</span>
                <div className="text-xs text-gray-300">{currentBooking.destination.city}</div>
              </div>
            </div>
          </div>

          {/* Add-ons & Customization Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Seat selection */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <User className="w-4 h-4 text-black" />
                </div>
                <h3 className="font-extrabold text-sm text-black">Seat Assignment</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Assigned Seat: <strong className="text-xl text-black ml-1">{currentBooking.seat}</strong> ({currentBooking.cabinClass})
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                {['12A', '12B', '14A', '14C', '2A (ScootPlus)'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setCurrentBooking({ ...currentBooking, seat: s });
                      setFeedbackMsg(`Seat updated to ${s}!`);
                    }}
                    className={`px-3 py-1.5 rounded-lg border font-bold cursor-pointer ${
                      currentBooking.seat === s
                        ? 'bg-[#FFE600] border-black text-black'
                        : 'border-gray-200 hover:border-black text-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Baggage */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Luggage className="w-4 h-4 text-black" />
                </div>
                <h3 className="font-extrabold text-sm text-black">Checked Baggage</h3>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Current Allowance: <strong className="text-xl text-black ml-1">{currentBooking.baggageKg}kg</strong>
              </p>
              <div className="flex gap-2 text-xs">
                {[20, 25, 30, 35].map((kg) => (
                  <button
                    key={kg}
                    onClick={() => handleUpgradeBaggage(kg)}
                    className={`flex-1 py-1.5 rounded-lg border font-bold cursor-pointer ${
                      currentBooking.baggageKg === kg
                        ? 'bg-[#FFE600] border-black text-black'
                        : 'border-gray-200 hover:border-black text-gray-700'
                    }`}
                  >
                    {kg}kg
                  </button>
                ))}
              </div>
            </div>

            {/* In-flight Meal */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-black" />
                </div>
                <h3 className="font-extrabold text-sm text-black">Scoot Café Meal</h3>
              </div>
              <p className="text-xs text-gray-500 mb-3 truncate">
                Pre-ordered: <strong className="text-black block truncate">{currentBooking.meal || 'No meal selected'}</strong>
              </p>
              <select
                value={currentBooking.meal || ''}
                onChange={(e) => handleSelectMeal(e.target.value)}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-gray-300 bg-white cursor-pointer"
              >
                <option value="">No Meal</option>
                {SCOOT_MEALS.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
