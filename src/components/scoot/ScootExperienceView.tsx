import React from 'react';
import { Sparkles, Award, Coffee, Wifi, VolumeX, Shield, Plane } from 'lucide-react';

export const ScootExperienceView: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 lg:px-8 py-8 font-scoot space-y-12">
      {/* Hero Banner */}
      <div className="bg-[#1D1D1B] rounded-3xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-black uppercase tracking-wider text-[#FFE600] bg-white/10 px-3 py-1 rounded-full inline-block mb-3">
            The Scootitude Spirit
          </span>
          <h1 className="text-3xl md:text-5xl font-black font-scoot-display tracking-tight text-white mb-4">
            Fly in Style. Pay with a Smile.
          </h1>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            From our widebody Boeing 787 Dreamliners to delicious Singapore hawker-inspired meals, discover why Scoot was voted the World’s Best Long Haul Low-Cost Airline.
          </p>
        </div>
      </div>

      {/* Feature 1: ScootPlus */}
      <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#FFE600]" />
            <span className="text-xs font-black uppercase tracking-wider text-black">
              Premium Cabin Class
            </span>
          </div>
          <h2 className="text-3xl font-black text-black font-scoot-display mb-3">
            ScootPlus: Full-Service Perks at Budget Prices
          </h2>
          <p className="text-xs md:text-sm text-gray-600 leading-relaxed mb-6">
            Upgrade your journey with full leather seats offering double the recline, 38-inch legroom, complimentary hot meals, 30MB of in-flight Wi-Fi, and priority check-in and boarding.
          </p>

          <ul className="space-y-2.5 text-xs font-bold text-gray-800">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFE600]"></span>
              <span>30kg checked baggage + 15kg carry-on baggage allowance</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFE600]"></span>
              <span>Complimentary hot meal, snack & alcoholic/non-alcoholic beverage</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFE600]"></span>
              <span>In-seat universal power outlets to keep all devices charged</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFE600]"></span>
              <span>Priority check-in desks and first-off baggage delivery</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 h-72">
          <img
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
            alt="ScootPlus cabin"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Feature 2: 787 Dreamliner vs Scoot-in-Silence vs Scoot Café */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dreamliner */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center mb-4">
            <Plane className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-black text-black mb-2">Boeing 787 Dreamliner</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Experience 4x larger dimmable windows, cleaner cabin air filtration, and higher humidity levels that significantly reduce jet lag on long flights.
          </p>
        </div>

        {/* Scoot-in-Silence */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-4">
            <VolumeX className="w-6 h-6 text-blue-900" />
          </div>
          <h3 className="text-xl font-black text-black mb-2">Scoot-in-Silence</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Our exclusive child-free quiet zone reserved for travelers aged 12 and above. Enjoy quiet sleep, adjustable headrests, and extra legroom stretch seats.
          </p>
        </div>

        {/* Scoot Café */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center mb-4">
            <Coffee className="w-6 h-6 text-amber-900" />
          </div>
          <h3 className="text-xl font-black text-black mb-2">Scoot Café Flavors</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Savor authentic Singaporean cuisine at 35,000 feet: Hainanese Chicken Rice, Nasi Lemak, Laksa, premium hot teas, and bubble tea options!
          </p>
        </div>
      </div>
    </div>
  );
};
