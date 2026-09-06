import React from 'react';
import { Home, Compass, Plus, Bell, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, onOpenReportModal }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'add', label: 'Report', icon: Plus, isFloating: true },
    { id: 'updates', label: 'Updates', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-2 py-1.5 max-w-lg mx-auto sm:max-w-none">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        {tabs.map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.isFloating) {
            return (
              <button
                key={tab.id}
                onClick={onOpenReportModal}
                className="w-13 h-13 -mt-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-600/40 ring-4 ring-white transition hover:scale-110 active:scale-95"
                title="Report an Issue"
              >
                <Plus className="w-7 h-7 stroke-[2.5]" />
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl transition ${
                isActive ? 'text-emerald-600 font-extrabold' : 'text-slate-400 hover:text-slate-700 font-semibold'
              }`}
            >
              <IconComp className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
