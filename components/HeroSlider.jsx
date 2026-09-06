import React, { useState, useEffect } from 'react';
import { CITY_SLIDERS } from '../data/mockData';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export default function HeroSlider({ cityName }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CITY_SLIDERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? CITY_SLIDERS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CITY_SLIDERS.length);
  };

  const currentSlide = CITY_SLIDERS[currentIndex];
  const slideTitle = currentSlide.title.replace('City', cityName);
  const slideSubtitle = currentSlide.subtitle;

  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-100 group">
      {/* Slide Image Background */}
      <div className="relative h-44 sm:h-52 md:h-64 w-full bg-slate-900 overflow-hidden">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className="w-full h-full object-cover opacity-75 transform scale-105 group-hover:scale-100 transition-transform duration-700"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${currentSlide.color} opacity-85 mix-blend-multiply`} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90" />

        {/* Tag badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            {currentSlide.tag}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
            {slideTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-100 mt-1.5 line-clamp-2 max-w-xl font-medium drop-shadow-sm">
            {slideSubtitle}
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center transition opacity-0 group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm flex items-center justify-center transition opacity-0 group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-2.5 right-4 flex items-center gap-1.5 z-10">
        {CITY_SLIDERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-6 bg-emerald-400' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
