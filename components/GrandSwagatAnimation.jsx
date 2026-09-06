import React, { useEffect } from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Check, Building2, Award } from 'lucide-react';
import { veenaSynth } from '../utils/veenaSound';
import confetti from 'canvas-confetti';

export default function GrandSwagatAnimation({ cityName, userName, userRole, onClose }) {

  useEffect(() => {
    // Play classical Veena sound effect on login
    veenaSynth.playSwagatMelody();

    // Trigger celebratory confetti burst
    try {
      const duration = 2 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch (e) {}

  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fadeIn">
      
      <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-emerald-500/30 text-white text-center p-6 sm:p-8 space-y-6 relative">
        
        {/* Animated Glowing Vector Checkmark Badge Centerpiece */}
        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-emerald-400/50 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/40 flex items-center justify-center border-2 border-white/30 animate-bounce">
            <Check className="w-16 h-16 text-white stroke-[3.5]" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-400/30">
            <Award className="w-3.5 h-3.5" /> Authentication Verified
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-emerald-200">
            Swagatham to {cityName}
          </h2>
          <p className="text-emerald-300 text-sm font-extrabold">
            Successfully Logged In as {userName}
          </p>
          <p className="text-xs text-slate-300 font-semibold">
            Role: <strong className="text-emerald-200">{userRole ? userRole.title : 'Citizen'}</strong>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02] text-base"
        >
          Enter {cityName} Portal
        </button>

      </div>
    </div>
  );
}
