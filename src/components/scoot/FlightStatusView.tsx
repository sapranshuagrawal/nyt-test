import React, { useState } from 'react';
import { Search, Plane, Clock, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { SAMPLE_FLIGHTS } from '../../data/scootData';

export const FlightStatusView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('TR 898');
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow'>('today');

  const flightsList = [
    {
      flightNumber: 'TR 898',
      aircraft: 'Boeing 787-9 Dreamliner',
      from: 'SIN (Singapore)',
      to: 'NRT (Tokyo)',
      scheduledDep: '01:10',
      actualDep: '01:15',
      scheduledArr: '08:55',
      estimatedArr: '08:50',
      terminal: 'Terminal 1',
      gate: 'D42',
      status: 'On Time',
      statusType: 'ontime'
    },
    {
      flightNumber: 'TR 610',
      aircraft: 'Airbus A321neo',
      from: 'SIN (Singapore)',
      to: 'BKK (Bangkok)',
      scheduledDep: '08:30',
      actualDep: '08:30',
      scheduledArr: '10:00',
      estimatedArr: '09:55',
      terminal: 'Terminal 1',
      gate: 'F31',
      status: 'Boarding',
      statusType: 'boarding'
    },
    {
      flightNumber: 'TR 12',
      aircraft: 'Boeing 787-9 Dreamliner',
      from: 'SIN (Singapore)',
      to: 'SYD (Sydney)',
      scheduledDep: '10:15',
      actualDep: '10:20',
      scheduledArr: '20:30',
      estimatedArr: '20:25',
      terminal: 'Terminal 1',
      gate: 'C20',
      status: 'Scheduled',
      statusType: 'scheduled'
    },
    {
      flightNumber: 'TR 288',
      aircraft: 'Airbus A321neo',
      from: 'SIN (Singapore)',
      to: 'DPS (Bali)',
      scheduledDep: '07:10',
      actualDep: '07:12',
      scheduledArr: '09:55',
      estimatedArr: '09:50',
      terminal: 'Terminal 1',
      gate: 'E11',
      status: 'Arrived',
      statusType: 'ontime'
    }
  ];

  const filtered = flightsList.filter((f) =>
    f.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.to.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-[1180px] mx-auto px-4 lg:px-8 py-8 font-scoot">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#1D1D1B] font-scoot-display">
          Flight Status & Schedule Tracker
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Check departure and arrival status for all flights operated by Scoot.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          <div className="md:col-span-8">
            <label className="block text-xs font-extrabold text-gray-600 uppercase mb-1">
              Flight Number or Destination
            </label>
            <div className="flex items-center p-3 rounded-xl border border-gray-300 focus-within:border-[#FFE600] bg-white">
              <Search className="w-4 h-4 text-gray-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. TR 898 or Tokyo"
                className="w-full text-sm font-bold text-black outline-none uppercase"
              />
            </div>
          </div>

          <div className="md:col-span-4 flex gap-2">
            <button
              onClick={() => setSelectedDate('today')}
              className={`flex-1 py-3.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                selectedDate === 'today' ? 'bg-[#FFE600] text-black' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setSelectedDate('tomorrow')}
              className={`flex-1 py-3.5 rounded-xl font-bold text-xs cursor-pointer transition-colors ${
                selectedDate === 'tomorrow' ? 'bg-[#FFE600] text-black' : 'bg-gray-100 text-gray-600'
              }`}
            >
              Tomorrow
            </button>
          </div>
        </div>
      </div>

      {/* Flight Status Cards */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.flightNumber}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs hover:border-[#FFE600] transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-black">{item.flightNumber}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-bold">
                  {item.aircraft}
                </span>
              </div>

              <div>
                <span
                  className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${
                    item.statusType === 'boarding'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-gray-400 block">Departure</span>
                <span className="text-lg font-black text-black">{item.scheduledDep}</span>
                <div className="text-xs font-bold text-gray-600">{item.from}</div>
                <div className="text-[11px] text-gray-400">{item.terminal} • Gate {item.gate}</div>
              </div>

              <div className="hidden md:flex flex-col items-center">
                <Plane className="w-5 h-5 text-black rotate-90" />
                <span className="text-[10px] text-gray-400 mt-1 font-bold">Non-Stop</span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-gray-400 block">Arrival</span>
                <span className="text-lg font-black text-black">{item.estimatedArr}</span>
                <div className="text-xs font-bold text-gray-600">{item.to}</div>
                <div className="text-[11px] text-emerald-600 font-bold">Estimated on-time</div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-extrabold uppercase text-gray-400 block">Aircraft Fleet</span>
                <span className="text-xs font-bold text-black">Singapore Changi Hub</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
