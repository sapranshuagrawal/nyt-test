import React, { useState } from 'react';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Luggage,
  Coffee,
  ShieldCheck,
  User,
  CreditCard,
  QrCode
} from 'lucide-react';
import { FlightOption, FareTier, BookingRecord } from '../../types/scoot';
import { SCOOT_MEALS } from '../../data/scootData';

interface SeatSelectionModalProps {
  flight: FlightOption;
  fareTier: FareTier;
  initialPrice: number;
  onBack: () => void;
  onBookingConfirmed: (record: BookingRecord) => void;
}

export const SeatSelectionModal: React.FC<SeatSelectionModalProps> = ({
  flight,
  fareTier,
  initialPrice,
  onBack,
  onBookingConfirmed
}) => {
  // Step in checkout
  const [currentStep, setCurrentStep] = useState<'passengers' | 'seats' | 'addons' | 'payment'>('passengers');

  // Passenger form
  const [firstName, setFirstName] = useState('Sapranshu');
  const [lastName, setLastName] = useState('Agrawal');
  const [email, setEmail] = useState('sapranshuagrawal9923@gmail.com');
  const [passport, setPassport] = useState('E9821458B');

  // Selected options
  const [selectedSeat, setSelectedSeat] = useState<string>(fareTier === 'scootplus' ? '2A' : '14A');
  const [selectedMeal, setSelectedMeal] = useState<string>(
    fareTier === 'flybageat' || fareTier === 'scootplus' ? SCOOT_MEALS[0].name : ''
  );
  const [extraBaggageKg, setExtraBaggageKg] = useState<number>(fareTier === 'scootplus' ? 30 : 20);

  // Seat map rows definition
  const seatRows = [
    { row: '1', type: 'scootplus', price: 0, letters: ['A', 'C', '', 'D', 'F', '', 'H', 'K'] },
    { row: '2', type: 'scootplus', price: 0, letters: ['A', 'C', '', 'D', 'F', '', 'H', 'K'] },
    { row: '6', type: 'quiet', price: 25, letters: ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'H', 'J', 'K'] },
    { row: '7', type: 'quiet', price: 25, letters: ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'H', 'J', 'K'] },
    { row: '11', type: 'stretch', price: 35, letters: ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'H', 'J', 'K'] },
    { row: '12', type: 'standard', price: 10, letters: ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'H', 'J', 'K'] },
    { row: '14', type: 'standard', price: 10, letters: ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'H', 'J', 'K'] },
    { row: '15', type: 'standard', price: 10, letters: ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'H', 'J', 'K'] },
    { row: '16', type: 'standard', price: 10, letters: ['A', 'B', 'C', '', 'D', 'E', 'F', '', 'H', 'J', 'K'] }
  ];

  const handleFinishBooking = () => {
    const bookingRef = 'TR' + Math.floor(100 + Math.random() * 900) + 'S';
    const newRecord: BookingRecord = {
      bookingRef,
      lastName,
      passengerName: `${firstName} ${lastName}`,
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      departureDate: '15 Oct 2026',
      departureTime: flight.departureTime,
      seat: selectedSeat,
      gate: 'D42',
      boardingGroup: fareTier === 'scootplus' ? 'Group 1' : 'Group 3',
      cabinClass: fareTier === 'scootplus' ? 'ScootPlus' : 'Economy',
      status: 'Confirmed',
      meal: selectedMeal,
      baggageKg: extraBaggageKg
    };
    onBookingConfirmed(newRecord);
  };

  return (
    <div className="max-w-[1080px] mx-auto px-4 lg:px-8 py-6 font-scoot">
      {/* Top back & progress navigation */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-black cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Flights</span>
        </button>

        {/* Step indicator */}
        <div className="flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setCurrentStep('passengers')}
            className={`px-3 py-1 rounded-full ${
              currentStep === 'passengers' ? 'bg-[#FFE600] text-black' : 'text-gray-400'
            }`}
          >
            1. Passenger
          </button>
          <button
            onClick={() => setCurrentStep('seats')}
            className={`px-3 py-1 rounded-full ${
              currentStep === 'seats' ? 'bg-[#FFE600] text-black' : 'text-gray-400'
            }`}
          >
            2. Seats
          </button>
          <button
            onClick={() => setCurrentStep('addons')}
            className={`px-3 py-1 rounded-full ${
              currentStep === 'addons' ? 'bg-[#FFE600] text-black' : 'text-gray-400'
            }`}
          >
            3. Scoot Café
          </button>
          <button
            onClick={() => setCurrentStep('payment')}
            className={`px-3 py-1 rounded-full ${
              currentStep === 'payment' ? 'bg-[#FFE600] text-black' : 'text-gray-400'
            }`}
          >
            4. Review
          </button>
        </div>
      </div>

      {/* Flight snapshot banner */}
      <div className="bg-[#1D1D1B] text-white p-4 rounded-xl mb-6 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase font-bold text-[#FFE600]">Itinerary</span>
          <div className="text-base font-black">
            {flight.flightNumber}: {flight.origin.city} ({flight.origin.code}) ➔ {flight.destination.city} ({flight.destination.code})
          </div>
          <div className="text-xs text-gray-400">
            Departing {flight.departureTime} • {flight.aircraft}
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-gray-400">Selected Tier</span>
          <div className="text-base font-black text-[#FFE600] uppercase">{fareTier}</div>
          <div className="text-xs text-gray-300">SGD ${initialPrice}</div>
        </div>
      </div>

      {/* ================= STEP 1: PASSENGERS ================= */}
      {currentStep === 'passengers' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-black text-black">Guest 1 (Adult) Details</h3>
            <p className="text-xs text-gray-500">
              Please enter names exactly as they appear on your passport or government ID.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                First & Middle Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FFE600] font-bold text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Last Name (Surname)
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FFE600] font-bold text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FFE600] font-bold text-sm outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Passport / ID Number
              </label>
              <input
                type="text"
                value={passport}
                onChange={(e) => setPassport(e.target.value)}
                className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#FFE600] font-bold text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setCurrentStep('seats')}
              className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl cursor-pointer"
            >
              Continue to Seat Selection →
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2: SEAT MAP ================= */}
      {currentStep === 'seats' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black text-black">Select Your Cabin Seat</h3>
              <p className="text-xs text-gray-500">
                Current selection: <strong className="text-black text-sm">{selectedSeat}</strong>
              </p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-black"></span> ScootPlus
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-blue-100 border border-blue-400"></span> Scoot-in-Silence
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded bg-yellow-400"></span> Selected
              </span>
            </div>
          </div>

          {/* Interactive Cabin Layout */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 max-w-lg mx-auto text-center">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-4">
              ▲ COCKPIT / FRONT OF AIRCRAFT ▲
            </div>

            <div className="space-y-2">
              {seatRows.map((rowItem) => (
                <div key={rowItem.row} className="flex items-center justify-center gap-1.5">
                  <span className="w-6 text-xs font-bold text-gray-400">{rowItem.row}</span>
                  {rowItem.letters.map((seatLetter, idx) => {
                    if (seatLetter === '') {
                      return <span key={idx} className="w-4"></span>; // aisle
                    }

                    const seatCode = `${rowItem.row}${seatLetter}`;
                    const isSelected = selectedSeat === seatCode;

                    let bgClass = 'bg-white border-gray-300 text-gray-700 hover:border-black';
                    if (isSelected) {
                      bgClass = 'bg-[#FFE600] border-black text-black font-black scale-110 shadow-xs';
                    } else if (rowItem.type === 'scootplus') {
                      bgClass = 'bg-neutral-900 border-neutral-900 text-[#FFE600] hover:bg-neutral-800';
                    } else if (rowItem.type === 'quiet') {
                      bgClass = 'bg-blue-50 border-blue-200 text-blue-900 hover:border-blue-500';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedSeat(seatCode)}
                        className={`w-8 h-8 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${bgClass}`}
                        title={`Seat ${seatCode}`}
                      >
                        {seatLetter}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mt-6">
              ▼ REAR OF AIRCRAFT ▼
            </div>
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setCurrentStep('passengers')}
              className="text-xs font-bold text-gray-600 hover:underline cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentStep('addons')}
              className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl cursor-pointer"
            >
              Confirm Seat {selectedSeat} & Add Meals →
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3: SCOOT CAFÉ MEALS & BAGGAGE ================= */}
      {currentStep === 'addons' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-black text-black">Scoot Café In-Flight Dining</h3>
            <p className="text-xs text-gray-500">
              Pre-order hot meals made with authentic Southeast Asian flavors. Served hot with beverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SCOOT_MEALS.map((meal) => {
              const isSelected = selectedMeal === meal.name;
              return (
                <div
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal.name)}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                    isSelected ? 'border-[#FFE600] bg-yellow-50/40 ring-2 ring-[#FFE600]' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-bold text-sm text-black">{meal.name}</span>
                    <span className="font-extrabold text-sm text-black">
                      {fareTier === 'scootplus' || fareTier === 'flybageat' ? 'Included' : `SGD $${meal.price}`}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">
                    {meal.description}
                  </p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-600">
                      {meal.type} {meal.isHalal ? '• Halal Certified' : ''}
                    </span>
                    {isSelected && (
                      <span className="text-xs font-bold text-black flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Selected
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              onClick={() => setCurrentStep('seats')}
              className="text-xs font-bold text-gray-600 hover:underline cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentStep('payment')}
              className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-extrabold text-sm px-8 py-3.5 rounded-xl cursor-pointer"
            >
              Review Booking Summary →
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 4: REVIEW & CONFIRM ================= */}
      {currentStep === 'payment' && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-lg font-black text-black">Review & Finalize Booking</h3>
            <p className="text-xs text-gray-500">
              Instant electronic ticket & boarding pass generation.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Passenger:</span>
              <span className="font-bold text-black">{firstName} {lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Flight:</span>
              <span className="font-bold text-black">{flight.flightNumber} ({flight.origin.city} ➔ {flight.destination.city})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Seat Assignment:</span>
              <span className="font-bold text-black">{selectedSeat}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Baggage Allowance:</span>
              <span className="font-bold text-black">{extraBaggageKg}kg Checked + 10kg Carry-on</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Scoot Café Meal:</span>
              <span className="font-bold text-black">{selectedMeal || 'None selected'}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline text-sm">
              <span className="font-black text-black">Total Amount:</span>
              <span className="font-black text-xl text-black font-scoot-display">SGD ${initialPrice}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setCurrentStep('addons')}
              className="text-xs font-bold text-gray-600 hover:underline cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={handleFinishBooking}
              className="bg-[#FFE600] hover:bg-[#fbd300] text-black font-black text-base px-10 py-4 rounded-xl cursor-pointer shadow-lg hover:scale-105 transition-all"
            >
              Confirm & Issue Ticket ✈
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
