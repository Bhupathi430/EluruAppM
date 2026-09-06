import React from 'react';
import { MapPin, Bell, Smartphone, Monitor, ChevronDown, Building2, UserCheck, LogIn } from 'lucide-react';

export default function Navbar({
  selectedCity,
  onOpenSwagat,
  viewMode,
  setViewMode,
  userName,
  currentUser,
  onOpenAuth,
  onLogout,
  unreadCount,
  onOpenNotifications
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        
        {/* Left: Brand logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 font-black text-xl hover:scale-105 transition">
            <Building2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                City<span className="text-emerald-600">Swagat</span>
              </span>
              <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded uppercase tracking-wider">
                SWAGATHAM
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold hidden sm:block">
              Smart Civic Portal for {selectedCity.name}
            </p>
          </div>
        </div>

        {/* Center: City Switcher Pill */}
        <button
          onClick={onOpenSwagat}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-extrabold text-xs transition shadow-2xs group"
          title="Click to switch city or view Swagat intro"
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition" />
          <span className="truncate max-w-[110px] sm:max-w-[180px]">{selectedCity.name}</span>
          <ChevronDown className="w-3.5 h-3.5 text-emerald-600" />
        </button>

        {/* Right: View Mode (Mobile vs Desktop), Notifications & User Account */}
        <div className="flex items-center gap-2">
          
          {/* View Mode Toggle (Mobile vs Desktop) */}
          <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                viewMode === 'mobile'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Mobile App Frame View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>

            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                viewMode === 'desktop'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Full Desktop Web View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop</span>
            </button>
          </div>

          {/* Working Notification Bell Button */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
            title="Click to open Notification Center"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-red-500 text-white font-black text-[10px] rounded-full ring-2 ring-white animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Account Authentication Button / User Badge */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-extrabold transition"
                title="Account Settings"
              >
                <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-[11px] flex items-center justify-center">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline truncate max-w-[80px]">{currentUser.name}</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
