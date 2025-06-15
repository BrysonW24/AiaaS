import React, { useState } from 'react';
import { MapPin, Star, Scissors, Award, Sparkles, CheckCircle } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState('landing');

  const barberInfo = {
    name: "Elite Cuts Studio",
    rating: 4.8,
    address: "123 George St, Sydney",
    specialty: "Modern Fades & Styling",
    image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=400&h=300&fit=crop",
    basePoints: 15,
    bonusPoints: 10
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="relative max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-3xl">
              <Scissors className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Welcome to</h1>
          <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            MyStyles
          </h2>
          <p className="text-white/80 text-lg mt-2">AI-Powered Barber Network</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={barberInfo.image} 
              alt={barberInfo.name}
              className="w-20 h-20 rounded-2xl object-cover shadow-lg"
            />
            <div className="flex-1">
              <h3 className="text-white font-bold text-xl">{barberInfo.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-medium">{barberInfo.rating}</span>
                <span className="text-white/60">• {barberInfo.specialty}</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-white/60">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{barberInfo.address}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-500/20 rounded-2xl p-4 border border-green-400/30">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Ready to check-in</span>
            </div>
            <p className="text-green-100 text-sm">
              Scan QR code to earn instant loyalty points!
            </p>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-green-400/30">
          <div className="flex items-center justify-center gap-3">
            <Sparkles className="w-6 h-6" />
            <span className="font-bold text-lg">Check-in Now!</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;
