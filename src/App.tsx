/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScootHeader } from './components/scoot/ScootHeader';
import { ScootFooter } from './components/scoot/ScootFooter';
import { ScootHomeView } from './components/scoot/ScootHomeView';
import { FlightSearchResults } from './components/scoot/FlightSearchResults';
import { SeatSelectionModal } from './components/scoot/SeatSelectionModal';
import { BoardingPassModal } from './components/scoot/BoardingPassModal';
import { ManageBookingView } from './components/scoot/ManageBookingView';
import { FlightStatusView } from './components/scoot/FlightStatusView';
import { DealsView } from './components/scoot/DealsView';
import { ScootExperienceView } from './components/scoot/ScootExperienceView';
import { KrisFlyerModal } from './components/scoot/KrisFlyerModal';
import {
  Airport,
  TripType,
  CabinClass,
  FlightOption,
  FareTier,
  BookingRecord,
  DealOffer
} from './types/scoot';
import { AIRPORTS, PRELOADED_BOOKINGS } from './data/scootData';

type ScootScreen =
  | 'home'
  | 'search-results'
  | 'customize-flight'
  | 'manage'
  | 'checkin'
  | 'status'
  | 'deals'
  | 'experience';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScootScreen>('home');

  // Search parameters
  const [searchOrigin, setSearchOrigin] = useState<Airport>(AIRPORTS[0]); // SIN
  const [searchDestination, setSearchDestination] = useState<Airport>(AIRPORTS[3]); // NRT
  const [searchDepDate, setSearchDepDate] = useState('2026-10-15');
  const [searchPassengers, setSearchPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [searchCabinClass, setSearchCabinClass] = useState<CabinClass>('Economy');
  const [searchPromoCode, setSearchPromoCode] = useState<string | undefined>(undefined);

  // Selected flight for customization
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(null);
  const [selectedFareTier, setSelectedFareTier] = useState<FareTier>('flybag');
  const [selectedTotalPrice, setSelectedTotalPrice] = useState<number>(248);

  // Active booking for manage/boarding pass
  const [activeBooking, setActiveBooking] = useState<BookingRecord | null>(PRELOADED_BOOKINGS[0]);
  const [isBoardingPassOpen, setIsBoardingPassOpen] = useState(false);

  // KrisFlyer modal
  const [isKrisFlyerOpen, setIsKrisFlyerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('Sapranshu Agrawal');

  // Handlers
  const handleSearchFlights = (params: {
    origin: Airport;
    destination: Airport;
    tripType: TripType;
    departureDate: string;
    returnDate?: string;
    passengers: { adults: number; children: number; infants: number };
    cabinClass: CabinClass;
    promoCode?: string;
  }) => {
    setSearchOrigin(params.origin);
    setSearchDestination(params.destination);
    setSearchDepDate(params.departureDate);
    setSearchPassengers(params.passengers);
    setSearchCabinClass(params.cabinClass);
    setSearchPromoCode(params.promoCode);
    setCurrentScreen('search-results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCustomize = (
    flight: FlightOption,
    tier: FareTier,
    totalPrice: number
  ) => {
    setSelectedFlight(flight);
    setSelectedFareTier(tier);
    setSelectedTotalPrice(totalPrice);
    setCurrentScreen('customize-flight');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingConfirmed = (record: BookingRecord) => {
    setActiveBooking(record);
    setIsBoardingPassOpen(true);
    setCurrentScreen('manage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDeal = (deal: DealOffer) => {
    setSearchOrigin(deal.origin);
    setSearchDestination(deal.destination);
    setSearchDepDate('2026-10-20');
    setCurrentScreen('search-results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleManageLookup = (bookingRef: string, lastName: string) => {
    const found = PRELOADED_BOOKINGS.find(
      (b) => b.bookingRef.toUpperCase() === bookingRef.toUpperCase()
    );
    if (found) {
      setActiveBooking(found);
    } else {
      setActiveBooking({
        bookingRef,
        lastName,
        passengerName: `Mr. ${lastName}`,
        flightNumber: 'TR 898',
        origin: AIRPORTS[0],
        destination: AIRPORTS[3],
        departureDate: '15 Oct 2026',
        departureTime: '01:10',
        seat: '14A',
        gate: 'D42',
        boardingGroup: 'Group 2',
        cabinClass: 'Economy',
        status: 'Confirmed',
        meal: 'Singapore Signature Chicken Rice',
        baggageKg: 20
      });
    }
    setCurrentScreen('manage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckinLookup = (bookingRef: string, departureCity: string) => {
    handleManageLookup(bookingRef, 'Traveler');
    setIsBoardingPassOpen(true);
  };

  const handleNavSelect = (
    tab: 'book' | 'manage' | 'checkin' | 'status' | 'deals' | 'experience'
  ) => {
    if (tab === 'book') setCurrentScreen('home');
    else if (tab === 'manage') setCurrentScreen('manage');
    else if (tab === 'checkin') {
      setCurrentScreen('manage');
      setIsBoardingPassOpen(true);
    } else if (tab === 'status') setCurrentScreen('status');
    else if (tab === 'deals') setCurrentScreen('deals');
    else if (tab === 'experience') setCurrentScreen('experience');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Map currentScreen to tab
  const getActiveTab = (): 'book' | 'manage' | 'checkin' | 'status' | 'deals' | 'experience' => {
    if (currentScreen === 'home' || currentScreen === 'search-results' || currentScreen === 'customize-flight')
      return 'book';
    if (currentScreen === 'manage') return 'manage';
    if (currentScreen === 'checkin') return 'checkin';
    if (currentScreen === 'status') return 'status';
    if (currentScreen === 'deals') return 'deals';
    return 'experience';
  };

  return (
    <div className="min-h-screen bg-[#f4f5f8] text-[#1D1D1B] flex flex-col font-scoot selection:bg-[#FFE600] selection:text-black">
      {/* Scoot Brand Header */}
      <ScootHeader
        activeTab={getActiveTab()}
        onSelectTab={handleNavSelect}
        onOpenKrisFlyer={() => setIsKrisFlyerOpen(true)}
        isLoggedIn={isLoggedIn}
        userName={userName}
      />

      {/* Main App Screens */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <ScootHomeView
            onSearchFlights={handleSearchFlights}
            onManageBookingLookup={handleManageLookup}
            onCheckinLookup={handleCheckinLookup}
            onFlightStatusSearch={(fNo) => setCurrentScreen('status')}
            onSelectDeal={handleSelectDeal}
            onOpenExperience={() => setCurrentScreen('experience')}
          />
        )}

        {currentScreen === 'search-results' && (
          <FlightSearchResults
            origin={searchOrigin}
            destination={searchDestination}
            departureDate={searchDepDate}
            passengers={searchPassengers}
            cabinClass={searchCabinClass}
            promoCode={searchPromoCode}
            onBack={() => setCurrentScreen('home')}
            onProceedToCustomize={handleProceedToCustomize}
          />
        )}

        {currentScreen === 'customize-flight' && selectedFlight && (
          <SeatSelectionModal
            flight={selectedFlight}
            fareTier={selectedFareTier}
            initialPrice={selectedTotalPrice}
            onBack={() => setCurrentScreen('search-results')}
            onBookingConfirmed={handleBookingConfirmed}
          />
        )}

        {currentScreen === 'manage' && (
          <ManageBookingView
            initialBooking={activeBooking}
            onOpenBoardingPass={(b) => {
              setActiveBooking(b);
              setIsBoardingPassOpen(true);
            }}
            onBackToHome={() => setCurrentScreen('home')}
          />
        )}

        {currentScreen === 'status' && <FlightStatusView />}

        {currentScreen === 'deals' && (
          <DealsView onSelectDeal={handleSelectDeal} />
        )}

        {currentScreen === 'experience' && <ScootExperienceView />}
      </main>

      {/* Scoot Brand Footer */}
      <ScootFooter onNavigate={handleNavSelect} />

      {/* Modals */}
      <BoardingPassModal
        booking={activeBooking}
        onClose={() => setIsBoardingPassOpen(false)}
      />

      <KrisFlyerModal
        isOpen={isKrisFlyerOpen}
        onClose={() => setIsKrisFlyerOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogin={(name) => {
          setIsLoggedIn(true);
          setUserName(name);
        }}
      />
    </div>
  );
}
