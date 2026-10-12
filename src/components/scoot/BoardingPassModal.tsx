import React from 'react';
import { X, Plane, QrCode, Download, Printer, CheckCircle } from 'lucide-react';
import { BookingRecord } from '../../types/scoot';

interface BoardingPassModalProps {
  booking: BookingRecord | null;
  onClose: () => void;
}

export const BoardingPassModal: React.FC<BoardingPassModalProps> = ({
  booking,
  onClose
}) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 font-scoot">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-150">
        {/* Boarding Pass Yellow Header */}
        <div className="bg-[#FFE600] p-6 text-black relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full hover:bg-black/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black italic tracking-tighter">scoot.</span>
              <span className="text-[10px] font-extrabold uppercase bg-black text-[#FFE600] px-2 py-0.5 rounded-full ml-1">
                Boarding Pass
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-wider">
              {booking.cabinClass}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-3xl font-black">{booking.origin.code}</span>
              <div className="text-xs font-bold text-neutral-800">{booking.origin.city}</div>
            </div>
            <div className="flex flex-col items-center px-4">
              <Plane className="w-5 h-5 text-black rotate-90" />
              <span className="text-[10px] font-black uppercase mt-1">{booking.flightNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black">{booking.destination.code}</span>
              <div className="text-xs font-bold text-neutral-800">{booking.destination.city}</div>
            </div>
          </div>
        </div>

        {/* Boarding Pass Main Body */}
        <div className="p-6 bg-white space-y-5">
          {/* Passenger & Ref */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-dashed border-gray-200">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-gray-400 block">
                Passenger Name
              </span>
              <span className="text-sm font-black text-black">{booking.passengerName}</span>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-gray-400 block">
                Booking Reference (PNR)
              </span>
              <span className="text-sm font-black text-[#567b95]">{booking.bookingRef}</span>
            </div>
          </div>

          {/* Gate, Boarding Time, Seat, Group */}
          <div className="grid grid-cols-4 gap-2 text-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <span className="text-[9px] font-extrabold uppercase text-gray-400 block">Gate</span>
              <span className="text-xl font-black text-black">{booking.gate || 'D42'}</span>
            </div>
            <div>
              <span className="text-[9px] font-extrabold uppercase text-gray-400 block">Seat</span>
              <span className="text-xl font-black text-[#1D1D1B]">{booking.seat}</span>
            </div>
            <div>
              <span className="text-[9px] font-extrabold uppercase text-gray-400 block">Time</span>
              <span className="text-base font-black text-black">{booking.departureTime}</span>
            </div>
            <div>
              <span className="text-[9px] font-extrabold uppercase text-gray-400 block">Group</span>
              <span className="text-sm font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                {booking.boardingGroup}
              </span>
            </div>
          </div>

          {/* QR Code and Barcode simulation */}
          <div className="pt-2 flex flex-col items-center">
            <div className="w-32 h-32 bg-white p-2 border-2 border-black rounded-xl flex items-center justify-center shadow-xs">
              <QrCode className="w-28 h-28 text-black" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-gray-400 mt-2">
              *{booking.bookingRef}-{booking.flightNumber}-SCOOT*
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-black text-white hover:bg-neutral-800 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Boarding Pass</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold py-3 rounded-xl cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
