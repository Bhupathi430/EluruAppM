import React, { useState } from 'react';
import { POPULAR_PLACES } from '../data/mockData';
import { Search, MapPin, Star, Phone, Utensils, Hotel, Hospital, GraduationCap, ShoppingBag, Scissors, Dumbbell, SlidersHorizontal } from 'lucide-react';

export default function ExploreView({ cityName }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: SlidersHorizontal },
    { name: 'Restaurants', icon: Utensils },
    { name: 'Hotels', icon: Hotel },
    { name: 'Hospitals', icon: Hospital },
    { name: 'Education', icon: GraduationCap },
    { name: 'Shops', icon: ShoppingBag },
    { name: 'Salons', icon: Scissors },
    { name: 'Gyms', icon: Dumbbell }
  ];

  const filteredPlaces = POPULAR_PLACES.filter((place) => {
    const matchesCat = selectedCategory === 'All' || place.category === selectedCategory;
    const matchesQuery = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Search Header */}
      <div className="space-y-3">
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Explore {cityName}</h3>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search places, services in ${cityName}...`}
            className="w-full pl-10 pr-4 py-3 bg-slate-100/80 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-900 font-semibold placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Category Pills Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Categories</span>
          <button onClick={() => setSelectedCategory('All')} className="text-xs font-bold text-emerald-600 hover:underline">
            View All
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.name;

            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border text-xs font-extrabold shrink-0 transition ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Popular Places Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Popular Places</span>
          <span className="text-xs text-slate-400 font-bold">{filteredPlaces.length} Results</span>
        </div>

        <div className="space-y-3">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="p-3 bg-white border border-slate-200/80 rounded-2xl flex items-center gap-3 shadow-2xs hover:shadow-md transition group"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100 group-hover:scale-105 transition"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-slate-900 text-sm truncate">{place.name}</h4>
                <p className="text-[11px] text-slate-500 font-medium truncate">{place.subCategory}</p>

                <div className="flex items-center gap-3 mt-1.5 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{place.rating}</span>
                    <span className="text-slate-400 font-normal">({place.reviews})</span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500 font-semibold">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>{place.distance}</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${place.phone}`}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition"
                title="Call Now"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
