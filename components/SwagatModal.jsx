import React, { useState } from 'react';
import { CITIES, USER_ROLES } from '../data/mockData';
import {
  MapPin,
  Sparkles,
  User,
  ArrowRight,
  CheckCircle2,
  Search,
  Shield,
  Building2,
  Activity,
  Store,
  Check,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';

const ROLE_ICONS = {
  User,
  Shield,
  Building2,
  Activity,
  Store
};

export default function SwagatModal({
  isOpen,
  onClose,
  selectedCity,
  onSelectCity,
  userName,
  setUserName,
  userRole,
  setUserRole
}) {
  const [step, setStep] = useState(1);
  const [tempCity, setTempCity] = useState(selectedCity || CITIES[0]);
  const [tempName, setTempName] = useState(userName || 'Bhupathi');
  const [tempRole, setTempRole] = useState(userRole || USER_ROLES[0]);
  const [citySearch, setCitySearch] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const filteredCities = CITIES.filter(c =>
    c.name.toLowerCase().includes(citySearch.toLowerCase()) ||
    c.state.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCityChoose = (cityObj) => {
    setTempCity(cityObj);
    setIsCustom(false);
  };

  const handleProceedToSwagat = (e) => {
    e.preventDefault();
    if (!tempName.trim()) return;

    let finalCity = tempCity;
    if (isCustom && customCity.trim()) {
      finalCity = {
        id: customCity.toLowerCase().replace(/\s+/g, '-'),
        name: customCity,
        state: 'India',
        tagline: `Smart City Portal for ${customCity}`,
        swagatMessage: `Swagatham to ${customCity}. Welcome to the Smart Civic Portal.`,
        welcomeImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
        bannerTitle: `Together, Let's Build a Better ${customCity}`,
        popularPlaces: 'City Centre, Central Park, Government Hospital',
        emergencyNumbers: {
          police: '100',
          ambulance: '108',
          fire: '101',
          hospital: '1800-123-456',
          bloodBank: '1800-999-888',
          womenHelpline: '181',
          childHelpline: '1098'
        }
      };
    }

    setTempCity(finalCity);
    setStep(2);
    triggerConfetti();
  };

  const handleFinishOnboarding = () => {
    onSelectCity(tempCity);
    setUserName(tempName);
    if (setUserRole) setUserRole(tempRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 my-auto">
        
        {step === 1 ? (
          <div className="p-5 sm:p-7 space-y-5 max-h-[85vh] overflow-y-auto">
            
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                <Building className="w-4 h-4 text-emerald-600" /> City Onboarding
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Select City, Name & Role
              </h2>
              <p className="text-slate-500 text-xs mt-0.5 font-medium">
                Choose your city & official reporting role to personalize your civic experience.
              </p>
            </div>

            <form onSubmit={handleProceedToSwagat} className="space-y-5">
              
              {/* User Name Input */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="e.g. Bhupathi"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-900 font-semibold text-sm outline-none"
                  />
                </div>
              </div>

              {/* Best UI Role Selector Grid */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Select Your Reporting Role
                  </label>
                  <span className="text-[10px] font-bold text-slate-400">Step 2 of 3</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1">
                  {USER_ROLES.map((role) => {
                    const RoleIcon = ROLE_ICONS[role.iconName] || User;
                    const isSelected = tempRole.id === role.id;

                    return (
                      <button
                        type="button"
                        key={role.id}
                        onClick={() => setTempRole(role)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition duration-200 ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500 shadow-xs'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          <RoleIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-extrabold truncate">{role.title.split('/')[0]}</p>
                          <p className="text-[10px] text-slate-500 truncate mt-0.5">{role.description}</p>
                        </div>
                        {isSelected && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Best UI City Selector Grid */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Select Your City ({CITIES.length}+ Cities)
                  </label>
                  <span className="text-[10px] font-bold text-emerald-600">Searchable</span>
                </div>

                {/* City Search Input */}
                <div className="relative mb-2.5">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    placeholder="Search city name or state..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {filteredCities.map((c) => {
                    const isSelected = !isCustom && tempCity.id === c.id;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => handleCityChoose(c)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition duration-200 text-xs font-semibold ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                        }`}>
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate min-w-0">
                          <p className="leading-tight text-slate-900 font-extrabold truncate">{c.name}</p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{c.state}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Custom City Input */}
                <div className="mt-2.5">
                  <button
                    type="button"
                    onClick={() => setIsCustom(!isCustom)}
                    className="text-xs font-extrabold text-emerald-700 hover:underline inline-flex items-center gap-1"
                  >
                    {isCustom ? '← Select from city list' : '+ City not listed? Type custom city'}
                  </button>

                  {isCustom && (
                    <input
                      type="text"
                      value={customCity}
                      onChange={(e) => setCustomCity(e.target.value)}
                      placeholder="Type your city name..."
                      className="mt-1.5 w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition hover:scale-[1.01]"
              >
                <span>Continue to Swagat Intro</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        ) : (
          /* Step 2: Swagat Intro Banner Screen */
          <div className="relative text-center">
            <div className="relative h-52 bg-slate-900 overflow-hidden">
              <img
                src={tempCity.welcomeImage}
                alt={tempCity.name}
                className="w-full h-full object-cover opacity-80 scale-105 transition duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Swagat Intro
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6 text-left">
                <p className="text-emerald-400 font-bold text-xs uppercase tracking-wider">Namaste & Welcome</p>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Swagatham to {tempCity.name}
                </h3>
              </div>
            </div>

            <div className="p-5 sm:p-7 space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-left">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Personalized Greeting</p>
                  <span className="px-2 py-0.5 bg-emerald-200 text-emerald-950 font-extrabold text-[10px] rounded-full">
                    {tempRole.title}
                  </span>
                </div>
                <p className="text-lg font-black text-emerald-950 mt-1">
                  Hello, {tempName} 👋
                </p>
                <p className="text-xs sm:text-sm text-emerald-800 font-medium mt-1 leading-snug">
                  "{tempCity.swagatMessage}"
                </p>
              </div>

              <div className="space-y-1.5 text-left text-xs text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Report streetlights, road damage & drainage with 2D GPS animation.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Classified reporting as Citizen, Police, Municipal or Emergency Staff.</span>
                </div>
              </div>

              <button
                onClick={handleFinishOnboarding}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-600/30 transition hover:scale-[1.02] flex items-center justify-center gap-2 text-base"
              >
                <span>Enter {tempCity.name} Portal</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
