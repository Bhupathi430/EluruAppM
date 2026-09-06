import React, { useEffect, useState } from 'react';
import { CheckCircle2, ShieldCheck, MapPin, Sparkles, Send, Wrench, Siren, UserCheck, BellRing, Building2, PhoneCall } from 'lucide-react';
import { veenaSynth } from '../utils/veenaSound';
import confetti from 'canvas-confetti';

export default function ReportAnimation({ issue, onComplete }) {
  const [phase, setPhase] = useState(1);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Initializing 2D GPS scan...');

  const dept = issue.department || {
    deptName: "Roads & Infrastructure Department",
    officer: "Er. K. Ramesh",
    designation: "Chief Engineer",
    contact: "+91 8812 245001"
  };

  useEffect(() => {
    // Play reporting Veena sound effect on submission scan start
    veenaSynth.playReportDispatchSound();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase(2);
          // Play triumphant dispatch sound on completion
          veenaSynth.playReportDispatchSound();
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.5 }
            });
          } catch (e) {}
          return 100;
        }

        if (prev === 25) setStatusMessage(`Auto-routing issue to ${dept.deptName.split('(')[0]}...`);
        if (prev === 65) setStatusMessage(`Sending SMS & Dispatch Alert to ${dept.officer}...`);
        if (prev === 90) setStatusMessage('Department officer notified & log created!');

        return prev + 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [issue, dept]);

  return (
    <div className="p-6 text-center space-y-6 animate-fadeIn">
      {phase === 1 ? (
        /* PHASE 1: 2D ANIMATED DISPATCH & DEPARTMENT AUTO-NOTIFICATION */
        <div className="space-y-6 py-2">
          
          {/* Animated 2D Vector Illustration Container */}
          <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            
            {/* Outer Pulsing Radar & Department Signal Rings */}
            <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-dashed border-emerald-500/40 animate-spin-slow" />
            <div className="absolute inset-6 rounded-full bg-emerald-50 border border-emerald-200 shadow-inner flex items-center justify-center" />

            {/* Floating 2D Vector Icons */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-bounce">
                <Send className="w-10 h-10 stroke-[2.5]" />
              </div>
              <div className="absolute -top-2 -right-2 px-2.5 py-0.5 bg-amber-400 text-amber-950 text-[10px] font-black rounded-full shadow-md animate-pulse uppercase tracking-wider">
                GPS DISPATCH
              </div>
            </div>

            {/* Orbiting Municipal Badges */}
            <div className="absolute top-2 left-2 p-2 bg-white rounded-xl shadow-md border border-slate-100 animate-pulse">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-md border border-slate-100 animate-pulse">
              <BellRing className="w-5 h-5 text-red-500" />
            </div>
          </div>

          {/* Progress Bar & Status Text */}
          <div className="space-y-2 max-w-xs mx-auto">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
              <span className="truncate pr-2">{statusMessage}</span>
              <span className="text-emerald-600 font-black">{progress}%</span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-150 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Target Department Badge */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl max-w-sm mx-auto text-left text-xs font-semibold text-slate-700 space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
              <BellRing className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>Target Department Alert:</span>
            </div>
            <p className="font-extrabold text-slate-900 text-sm leading-tight">{dept.deptName}</p>
            <p className="text-[11px] text-slate-500">Officer In-Charge: <strong>{dept.officer}</strong> ({dept.designation})</p>
          </div>

        </div>
      ) : (
        /* PHASE 2: SUCCESS CONFIRMATION & DISPATCH RECEIPT */
        <div className="space-y-5 py-2 animate-fadeIn">
          
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full uppercase tracking-wider">
              Issue Logged & Department Auto-Notified
            </span>
            <h3 className="text-2xl font-black text-slate-900 mt-2">
              Reference ID: {issue.id}
            </h3>
            <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto font-medium">
              An instant notification has been dispatched to {dept.deptName}.
            </p>
          </div>

          {/* Department Dispatch Receipt Card */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl max-w-sm mx-auto text-left space-y-2">
            <div className="flex items-center justify-between text-xs font-extrabold text-emerald-900">
              <span className="flex items-center gap-1">
                <BellRing className="w-3.5 h-3.5 text-emerald-600" /> Department Dispatch Status
              </span>
              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] uppercase font-bold">
                SENT via SMS & Terminal
              </span>
            </div>

            <div className="border-t border-emerald-200/60 pt-2 space-y-1 text-xs">
              <p className="font-bold text-slate-900">{dept.deptName}</p>
              <p className="text-slate-600 text-[11px]">
                Assigned Officer: <strong>{dept.officer}</strong>
              </p>
              <p className="text-slate-500 text-[10px]">Contact: {dept.contact}</p>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-600/30 transition hover:scale-[1.02] text-base"
          >
            View Live Department Tracker
          </button>

        </div>
      )}
    </div>
  );
}
