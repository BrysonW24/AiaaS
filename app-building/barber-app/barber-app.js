import React, { useState, useRef } from 'react';
import { MapPin, Camera, Upload, Star, Scissors, User, CreditCard, Award, Search, Filter, Heart, Clock, Phone, Calendar, Sparkles, Zap, TrendingUp } from 'lucide-react';

// SVG patterns as constants to avoid issues with quotes
const DOTS_PATTERN = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
const CIRCLES_PATTERN = "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E";
const HEXAGON_PATTERN = "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='10,1 4,7 4,13 10,19 16,13 16,7'/%3E%3C/g%3E%3C/svg%3E";

const MyStylesApp = () => {
  const [activeTab, setActiveTab] = useState('find');
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(245);
  const [userLocation, setUserLocation] = useState('Sydney, NSW');
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Mock data for barbers
  const barbers = [
    {
      id: 1,
      name: "Elite Cuts Studio",
      rating: 4.8,
      distance: 0.3,
      price: "$35-50",
      image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=300&h=200&fit=crop",
      specialty: "Modern Fades",
      visits: 8,
      address: "123 George St, Sydney",
      phone: "(02) 9876 5432",
      hours: "9:00 AM - 7:00 PM",
      trending: true
    },
    {
      id: 2,
      name: "The Barber Co.",
      rating: 4.6,
      distance: 0.7,
      price: "$30-45",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=200&fit=crop",
      specialty: "Classic Cuts",
      visits: 3,
      address: "456 Pitt St, Sydney",
      phone: "(02) 9876 5433",
      hours: "8:00 AM - 6:00 PM",
      trending: false
    },
    {
      id: 3,
      name: "Sharp & Styled",
      rating: 4.9,
      distance: 1.2,
      price: "$40-60",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300&h=200&fit=crop",
      specialty: "Beard Styling",
      visits: 12,
      address: "789 Oxford St, Sydney",
      phone: "(02) 9876 5434",
      hours: "10:00 AM - 8:00 PM",
      trending: true
    }
  ];

  // Mock hairstyles
  const hairstyles = [
    { id: 1, name: "Classic Fade", image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=200&h=200&fit=crop", trending: true },
    { id: 2, name: "Pompadour", image: "https://images.unsplash.com/photo-1622287162775-7c75e12dffb3?w=200&h=200&fit=crop", trending: false },
    { id: 3, name: "Buzz Cut", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop", trending: false },
    { id: 4, name: "Textured Crop", image: "https://images.unsplash.com/photo-1615311884581-2e7e1f49a7fd?w=200&h=200&fit=crop", trending: true },
    { id: 5, name: "Side Part", image: "https://images.unsplash.com/photo-1622287162714-f3f0ac17e08b?w=200&h=200&fit=crop", trending: false },
    { id: 6, name: "Quiff", image: "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=200&h=200&fit=crop", trending: true }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateBookingVisit = (barberId) => {
    const points = Math.floor(Math.random() * 20) + 10;
    setLoyaltyPoints(prev => prev + points);
    alert(`Booking confirmed! You earned ${points} loyalty points.`);
  };

  const FindBarbersTab = () => (
    <div className="space-y-8">
      {/* Hero Search Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="relative rounded-3xl p-8 text-white backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-xl font-medium">{userLocation}</span>
            <div className="ml-auto flex items-center gap-2 bg-emerald-500/90 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Discover amazing barbers near you..." 
                className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/95 backdrop-blur-sm shadow-xl border border-white/20"
              />
            </div>
            <button className="bg-white/20 p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-2xl p-6 border border-orange-100">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-orange-500" />
          <h3 className="font-bold text-gray-900">Trending Now</h3>
          <div className="ml-auto bg-orange-100 px-2 py-1 rounded-full">
            <span className="text-xs font-medium text-orange-700">Hot</span>
          </div>
        </div>
        <p className="text-sm text-gray-600">Modern fades and textured crops are the most booked styles this week!</p>
      </div>

      {/* Barbers List */}
      <div className="space-y-6">
        {barbers.map(barber => (
          <div key={barber.id} className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
            {barber.trending && (
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Trending
              </div>
            )}
            <div className="flex">
              <div className="relative overflow-hidden">
                <img 
                  src={barber.image} 
                  alt={barber.name}
                  className="w-32 h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-purple-600 transition-colors duration-300">{barber.name}</h3>
                  <button 
                    onClick={() => setSelectedBarber(barber)}
                    className="text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-200"
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-bold text-yellow-700">{barber.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{barber.distance} km</span>
                  </div>
                  <div className="bg-emerald-50 px-2 py-1 rounded-lg">
                    <span className="text-sm font-bold text-emerald-700">{barber.price}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{barber.specialty}</p>
                    <div className="flex items-center gap-2">
                      <div className="bg-purple-50 px-2 py-1 rounded-full">
                        <p className="text-xs text-purple-700 font-bold">{barber.visits} visits</p>
                      </div>
                      <div className="bg-blue-50 px-2 py-1 rounded-full">
                        <p className="text-xs text-blue-700 font-bold">{barber.visits * 15} pts earned</p>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => simulateBookingVisit(barber.id)}
                    className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-600 text-white px-6 py-3 rounded-2xl hover:shadow-2xl transition-all duration-300 text-sm font-bold group-hover:scale-105 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <span className="relative z-10">Book Now</span>
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const AIStylesTab = () => (
    <div className="space-y-8">
      {/* AI Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 opacity-90"></div>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${CIRCLES_PATTERN})` }}></div>
        <div className="relative rounded-3xl p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Sparkles className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-1">AI Style Visualizer</h2>
              <p className="opacity-90 text-lg">Transform your look with cutting-edge AI technology</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-medium">Powered by advanced neural networks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Upload Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <Camera className="w-7 h-7 text-purple-600" />
            Upload Your Photo
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center gap-3">
                <Upload className="w-8 h-8" />
                <span className="font-bold">From Gallery</span>
              </div>
            </button>
            <button 
              onClick={() => cameraInputRef.current?.click()}
              className="group relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-600 text-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex flex-col items-center gap-3">
                <Camera className="w-8 h-8" />
                <span className="font-bold">Take Photo</span>
              </div>
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {uploadedImage && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Photo Preview</h3>
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="w-56 h-56 object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-full shadow-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 text-lg">AI Analysis Complete</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "Based on your facial structure and features, I recommend trying a textured crop or modern fade. 
                Your bone structure would complement shorter sides with added volume on top. The AI has also detected 
                that warmer tones would enhance your natural coloring."
              </p>
            </div>
          </div>
        )}

        {/* Styles Grid */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Try Different Styles</h3>
            <div className="bg-orange-100 px-3 py-1 rounded-full">
              <span className="text-orange-700 font-bold text-sm">6 Styles Available</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {hairstyles.map(style => (
              <div 
                key={style.id}
                onClick={() => setSelectedStyle(style)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedStyle?.id === style.id 
                    ? 'ring-4 ring-purple-500 shadow-2xl transform scale-105' 
                    : 'hover:shadow-xl hover:scale-102'
                }`}
              >
                {style.trending && (
                  <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    Hot
                  </div>
                )}
                <img 
                  src={style.image} 
                  alt={style.name}
                  className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-bold text-lg">{style.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white/90 text-sm">Trending</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedStyle && (
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Style Applied: {selectedStyle.name}</h3>
              <div className="bg-green-100 p-2 rounded-xl">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 mb-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">🤖</div>
                <span className="font-bold text-gray-900">AI Preview Complete</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                This style has been virtually applied using our advanced AI! The result shows how this cut would 
                complement your facial features. Share this preview with your barber for the perfect execution.
              </p>
            </div>
            <button className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-lg hover:scale-105">
              <div className="flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6" />
                Save Style & Find Barbers
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const LoyaltyTab = () => (
    <div className="space-y-8">
      {/* Loyalty Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 opacity-90"></div>
        <div className="absolute inset-0" style={{ backgroundImage: `url(${HEXAGON_PATTERN})` }}></div>
        <div className="relative rounded-3xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-3">Loyalty Rewards</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black">{loyaltyPoints}</span>
                <span className="text-xl opacity-90">points</span>
              </div>
              <p className="opacity-90 text-lg mt-2">Ready to spend</p>
            </div>
            <div className="relative">
              <Award className="w-20 h-20 opacity-80" />
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 p-1 rounded-full">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-green-300" />
              <span className="font-medium">+{loyaltyPoints - 180} points this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visit History */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
          <Clock className="w-7 h-7 text-purple-600" />
          Your Barber Journey
        </h3>
        <div className="space-y-4">
          {barbers.map(barber => (
            <div key={barber.id} className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl hover:shadow-lg transition-all duration-300 border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={barber.image} 
                    alt={barber.name}
                    className="w-16 h-16 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {barber.visits}
                  </div>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-lg">{barber.name}</p>
                  <p className="text-gray-600">{barber.visits} visits • {barber.specialty}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-xl">
                  <p className="font-black text-purple-700 text-lg">{barber.visits * 15}</p>
                  <p className="text-xs text-purple-600 font-medium">points earned</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Section */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-3">
          <Award className="w-7 h-7 text-yellow-500" />
          Redeem Rewards
        </h3>
        <div className="space-y-4">
          <div className="group relative overflow-hidden flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 to-emerald-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Scissors className="w-6 h-6 text-green-600" />
                <p className="font-bold text-gray-900 text-lg">Free Premium Haircut</p>
              </div>
              <p className="text-green-700 font-medium">500 points required • Save $50</p>
            </div>
            <button 
              disabled={loyaltyPoints < 500}
              className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                loyaltyPoints >= 500 
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loyaltyPoints >= 500 ? 'Redeem Now' : `Need ${500 - loyaltyPoints} more`}
            </button>
          </div>
          
          <div className="group relative overflow-hidden flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-6 h-6 text-blue-600" />
                <p className="font-bold text-gray-900 text-lg">20% Off Next Visit</p>
              </div>
              <p className="text-blue-700 font-medium">200 points required • Save up to $12</p>
            </div>
            <button 
              disabled={loyaltyPoints < 200}
              className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                loyaltyPoints >= 200 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loyaltyPoints >= 200 ? 'Redeem Now' : `Need ${200 - loyaltyPoints} more`}
            </button>
          </div>
          
          <div className="group relative overflow-hidden flex items-center justify-between p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-200 hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <p className="font-bold text-gray-900 text-lg">Premium Styling Package</p>
              </div>
              <p className="text-purple-700 font-medium">300 points required • Includes wash & style</p>
            </div>
            <button 
              disabled={loyaltyPoints < 300}
              className={`relative px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                loyaltyPoints >= 300 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {loyaltyPoints >= 300 ? 'Redeem Now' : `Need ${300 - loyaltyPoints} more`}
            </button>
          </div>
        </div>
        
        {/* VIP Status */}
        <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-yellow-600" />
                <h4 className="font-bold text-gray-900 text-lg">VIP Status Progress</h4>
              </div>
              <p className="text-gray-600">Collect 500 points to unlock VIP benefits</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-yellow-600">{Math.round((loyaltyPoints / 500) * 100)}%</p>
              <p className="text-sm text-yellow-700">Complete</p>
            </div>
          </div>
          <div className="mt-4 bg-white/80 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-500 to-orange-500 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min((loyaltyPoints / 500) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-lg shadow-xl border-b border-white/20">
        <div className="max-w-md mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-3 rounded-2xl shadow-lg">
                  <Scissors className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  MyStyles
                </h1>
                <p className="text-sm text-gray-600 font-medium">AI-Powered Styling</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">{loyaltyPoints}</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-100 to-blue-100 p-3 rounded-2xl shadow-lg">
                <User className="w-6 h-6 text-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-6 py-8">
        {activeTab === 'find' && <FindBarbersTab />}
        {activeTab === 'ai' && <AIStylesTab />}
        {activeTab === 'loyalty' && <LoyaltyTab />}
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
        <div className="max-w-md mx-auto px-6">
          <div className="flex justify-around py-4">
            <button 
              onClick={() => setActiveTab('find')}
              className={`relative flex flex-col items-center gap-2 py-3 px-6 rounded-2xl transition-all duration-300 ${
                activeTab === 'find' 
                  ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {activeTab === 'find' && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 rounded-2xl"></div>
              )}
              <MapPin className={`w-6 h-6 transition-all duration-300 ${activeTab === 'find' ? 'scale-110' : ''}`} />
              <span className="text-xs font-bold">Discover</span>
              {activeTab === 'find' && <div className="absolute -top-1 right-2 w-2 h-2 bg-purple-500 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('ai')}
              className={`relative flex flex-col items-center gap-2 py-3 px-6 rounded-2xl transition-all duration-300 ${
                activeTab === 'ai' 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {activeTab === 'ai' && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 rounded-2xl"></div>
              )}
              <Sparkles className={`w-6 h-6 transition-all duration-300 ${activeTab === 'ai' ? 'scale-110' : ''}`} />
              <span className="text-xs font-bold">AI Styles</span>
              {activeTab === 'ai' && <div className="absolute -top-1 right-2 w-2 h-2 bg-green-500 rounded-full"></div>}
            </button>
            <button 
              onClick={() => setActiveTab('loyalty')}
              className={`relative flex flex-col items-center gap-2 py-3 px-6 rounded-2xl transition-all duration-300 ${
                activeTab === 'loyalty' 
                  ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-600 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {activeTab === 'loyalty' && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-orange-600/10 rounded-2xl"></div>
              )}
              <Award className={`w-6 h-6 transition-all duration-300 ${activeTab === 'loyalty' ? 'scale-110' : ''}`} />
              <span className="text-xs font-bold">Rewards</span>
              {activeTab === 'loyalty' && <div className="absolute -top-1 right-2 w-2 h-2 bg-yellow-500 rounded-full"></div>}
            </button>
          </div>
        </div>
      </div>
      
      {/* Spacing for fixed bottom nav */}
      <div className="h-24"></div>
    </div>
  );
};

export default MyStylesApp;