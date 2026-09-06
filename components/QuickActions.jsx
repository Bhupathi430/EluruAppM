import React from 'react';
import {
  Camera,
  Globe,
  Store,
  Briefcase,
  Calendar,
  Sparkles,
  Siren,
  Droplet,
  PhoneCall
} from 'lucide-react';

export default function QuickActions({ cityName, onActionSelect }) {
  const actions = [
    // Green (Services / Good)
    {
      id: 'report-issue',
      label: 'Report Issue',
      category: 'green',
      icon: Camera,
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
      iconBg: 'bg-emerald-700 text-white',
      badgeText: 'Services / Good'
    },
    {
      id: 'explore-city',
      label: `Explore ${cityName}`,
      category: 'green',
      icon: Globe,
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
      iconBg: 'bg-emerald-700 text-white',
      badgeText: 'Services / Good'
    },
    {
      id: 'local-businesses',
      label: 'Local Businesses',
      category: 'green',
      icon: Store,
      badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
      iconBg: 'bg-emerald-700 text-white',
      badgeText: 'Services / Good'
    },
    // Yellow (Opportunities / Info)
    {
      id: 'jobs',
      label: 'Jobs',
      category: 'yellow',
      icon: Briefcase,
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200',
      iconBg: 'bg-amber-600 text-white',
      badgeText: 'Opportunities / Info'
    },
    {
      id: 'events',
      label: 'Events',
      category: 'yellow',
      icon: Calendar,
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200',
      iconBg: 'bg-amber-600 text-white',
      badgeText: 'Opportunities / Info'
    },
    {
      id: 'city-2035',
      label: `${cityName} 2035`,
      category: 'yellow',
      icon: Sparkles,
      badgeBg: 'bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200',
      iconBg: 'bg-amber-600 text-white',
      badgeText: 'Opportunities / Info'
    },
    // Red (Problems / Urgent)
    {
      id: 'emergency',
      label: 'Emergency',
      category: 'red',
      icon: Siren,
      badgeBg: 'bg-red-100 text-red-900 border-red-200 hover:bg-red-200',
      iconBg: 'bg-red-600 text-white',
      badgeText: 'Problems / Urgent'
    },
    {
      id: 'blood-bank',
      label: 'Blood Bank',
      category: 'red',
      icon: Droplet,
      badgeBg: 'bg-red-100 text-red-900 border-red-200 hover:bg-red-200',
      iconBg: 'bg-red-600 text-white',
      badgeText: 'Problems / Urgent'
    },
    {
      id: 'help-line',
      label: 'Help Line',
      category: 'red',
      icon: PhoneCall,
      badgeBg: 'bg-red-100 text-red-900 border-red-200 hover:bg-red-200',
      iconBg: 'bg-red-600 text-white',
      badgeText: 'Problems / Urgent'
    }
  ];

  return (
    <div className="space-y-3">
      {/* Legend Banner (matching top legend in image) */}
      <div className="flex items-center justify-between text-[11px] font-bold px-2 py-1 bg-slate-100/70 rounded-xl border border-slate-200/80 overflow-x-auto gap-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-700">Green = Services</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span className="text-slate-700">Yellow = Opportunities</span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
          <span className="text-slate-700">Red = Urgent</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Quick Actions</h3>
        <span className="text-xs font-semibold text-slate-400">9 Tools</span>
      </div>

      {/* Grid of Action Buttons */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        {actions.map((act) => {
          const IconComp = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => onActionSelect(act.id)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-200 text-center shadow-2xs hover:shadow-md hover:scale-[1.03] active:scale-95 group ${act.badgeBg}`}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 shadow-xs group-hover:rotate-6 transition ${act.iconBg}`}>
                <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-xs sm:text-sm font-extrabold leading-tight tracking-tight line-clamp-2">
                {act.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
