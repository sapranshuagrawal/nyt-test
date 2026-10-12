import React, { useState } from 'react';
import { X, Check, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSubscribed: boolean;
  onSubscribe: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  isSubscribed,
  onSubscribe
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'annual'>('weekly');
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onSubscribe();
    setSubscribedSuccess(true);
    setTimeout(() => {
      setSubscribedSuccess(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-sm shadow-2xl overflow-hidden font-nyt-sans border border-[#121212] animate-in zoom-in-95 duration-150">
        {/* Header banner */}
        <div className="bg-[#121212] text-white p-6 relative text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded hover:bg-neutral-800 text-gray-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="font-nyt-masthead text-3xl block mb-2">The New York Times</span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            Special Introductory Offer
          </h2>
          <p className="text-xs text-gray-300 mt-1">
            Unlimited access to all of The Times. Independent journalism that matters.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {subscribedSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="text-xl font-bold text-[#121212]">Welcome to All Access!</h3>
              <p className="text-xs text-[#727272]">
                Your subscription is now active. Enjoy unlimited access across all devices.
              </p>
            </div>
          ) : isSubscribed ? (
            <div className="py-8 text-center space-y-4">
              <ShieldCheck className="w-12 h-12 text-[#567b95] mx-auto" />
              <h3 className="text-xl font-bold text-[#121212]">You are already subscribed</h3>
              <p className="text-xs text-[#727272]">
                Your account has full digital access to News, Games, Cooking, Wirecutter, and The Athletic.
              </p>
              <button
                onClick={onClose}
                className="bg-[#121212] hover:bg-neutral-800 text-white px-6 py-2 rounded text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Plan cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Weekly Plan */}
                <div
                  onClick={() => setSelectedPlan('weekly')}
                  className={`border-2 p-4 rounded cursor-pointer transition-all ${
                    selectedPlan === 'weekly'
                      ? 'border-[#567b95] bg-[#f2f7fa]'
                      : 'border-[#e2e2e2] hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#567b95]">
                      Most Popular
                    </span>
                    {selectedPlan === 'weekly' && <Check className="w-4 h-4 text-[#567b95]" />}
                  </div>
                  <div className="text-2xl font-bold text-[#121212]">$1 / week</div>
                  <div className="text-[11px] text-[#727272] mt-0.5">Billed every 4 weeks ($4/mo)</div>
                  <p className="text-xs text-[#444] mt-3">Cancel anytime. 1 year intro price.</p>
                </div>

                {/* Annual Plan */}
                <div
                  onClick={() => setSelectedPlan('annual')}
                  className={`border-2 p-4 rounded cursor-pointer transition-all ${
                    selectedPlan === 'annual'
                      ? 'border-[#567b95] bg-[#f2f7fa]'
                      : 'border-[#e2e2e2] hover:border-gray-400'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#727272]">
                      Annual Value
                    </span>
                    {selectedPlan === 'annual' && <Check className="w-4 h-4 text-[#567b95]" />}
                  </div>
                  <div className="text-2xl font-bold text-[#121212]">$40 / year</div>
                  <div className="text-[11px] text-[#727272] mt-0.5">Save 25% versus weekly</div>
                  <p className="text-xs text-[#444] mt-3">Billed annually. Full suite access.</p>
                </div>
              </div>

              {/* What's included checklist */}
              <div className="bg-[#f9f9f9] border border-[#e2e2e2] rounded p-4 mb-6 text-xs text-[#333]">
                <h4 className="font-bold text-[#121212] uppercase tracking-wider text-[11px] mb-2.5">
                  All Access Digital includes:
                </h4>
                <ul className="space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#567b95]" />
                    <span>Unlimited articles and live news coverage on desktop, tablet, and mobile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#567b95]" />
                    <span>The Crossword, Wordle, Spelling Bee, and full Games catalog</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#567b95]" />
                    <span>NYT Cooking: 20,000+ tested recipes and meal planner</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#567b95]" />
                    <span>Wirecutter independent product reviews and buying guides</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#567b95]" />
                    <span>The Athletic in-depth sports reporting and live analysis</span>
                  </li>
                </ul>
              </div>

              {/* Subscribe button */}
              <button
                onClick={handleConfirm}
                className="w-full bg-[#567b95] hover:bg-[#43647b] text-white py-3 rounded text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Start Subscription for {selectedPlan === 'weekly' ? '$1/Week' : '$40/Year'}
              </button>
              <p className="text-[10px] text-center text-[#727272] mt-2">
                Simulated checkout for demo. Instant access enabled upon clicking.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
