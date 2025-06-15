import React from 'react';
import { MapPin, Search, Filter, Star, Heart, Sparkles } from 'lucide-react';
import { DOTS_PATTERN } from '../../utils/patterns';

const FindBarbersTab = ({ 
  userLocation, 
  barbers, 
  onBarberSelect, 
  onBookVisit 
}) => {
  return (
    <div className="space-y-8">
      {/* Hero Search Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('" + DOTS_PATTERN + "')] opacity-30"></div>
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
                className="input-primary"
              />
            </div>
            <button className="bg-white/20 p-4 rounded-2xl hover:bg-white/30 transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-105">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
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
                    onClick={() => onBarberSelect(barber)}
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
                    onClick={() => onBookVisit(barber.id)}
                    className="btn-primary"
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
};

export default FindBarbersTab; 