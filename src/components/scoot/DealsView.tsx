import React, { useState } from 'react';
import { Tag, Sparkles, Plane, ArrowRight } from 'lucide-react';
import { DEALS } from '../../data/scootData';
import { DealOffer } from '../../types/scoot';

interface DealsViewProps {
  onSelectDeal: (deal: DealOffer) => void;
}

export const DealsView: React.FC<DealsViewProps> = ({ onSelectDeal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Popular', 'Weekend Getaway', 'Long Haul'];

  const filtered = selectedCategory === 'All'
    ? DEALS
    : DEALS.filter((d) => d.category === selectedCategory);

  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8 font-scoot">
      {/* Great Scoot Sale Banner */}
      <div className="bg-[#FFE600] rounded-3xl p-8 mb-10 text-black shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-black text-[#FFE600] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
            Limited Time Promo
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-scoot-display tracking-tight">
            The Great Scoot Sale!
          </h1>
          <p className="text-sm md:text-base font-bold text-neutral-800 mt-2 max-w-xl">
            Escape the ordinary with explosive low fares across 70+ dream destinations in Asia-Pacific and Europe.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-black text-center shrink-0 shadow-sm">
          <div className="text-[11px] font-extrabold uppercase text-gray-400">Exclusive Promo Code</div>
          <div className="text-2xl font-black text-black tracking-wider my-1 font-mono">
            ESCAPE20
          </div>
          <div className="text-xs font-bold text-emerald-700">20% Off Selected Routes</div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-black text-[#FFE600] shadow-xs'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((deal) => (
          <div
            key={deal.id}
            onClick={() => onSelectDeal(deal)}
            className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#FFE600] shadow-xs hover:shadow-xl transition-all cursor-pointer flex flex-col"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={deal.imageUrl}
                alt={deal.destination.city}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {deal.badge && (
                <span className="absolute top-3 left-3 bg-[#FFE600] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {deal.badge}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-400">
                    From {deal.origin.city} ({deal.origin.code})
                  </span>
                  <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-600">
                    {deal.destination.region}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-black group-hover:text-amber-600 transition-colors">
                  {deal.destination.city}
                </h3>
                <div className="text-xs text-gray-500 mt-1">
                  Travel Period: {deal.travelPeriod}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-gray-400 block">
                    One-way fares from
                  </span>
                  <span className="text-2xl font-black text-black font-scoot-display">
                    SGD ${deal.fareFrom}
                  </span>
                </div>

                <button
                  type="button"
                  className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-[#FFE600] flex items-center justify-center transition-colors shadow-xs"
                >
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
