import React from 'react';
import { Siren, PhoneCall, ShieldAlert, HeartPulse, Flame, Phone } from 'lucide-react';

export default function EmergencyView({ cityName, emergencyNumbers }) {
  const numbers = emergencyNumbers || {
    police: "100",
    ambulance: "108",
    fire: "101",
    hospital: "08812 230 000",
    bloodBank: "08812 234 567",
    womenHelpline: "181",
    childHelpline: "1098"
  };

  const quickContacts = [
    { title: "Police", number: numbers.police, icon: ShieldAlert, color: "from-red-500 to-red-700" },
    { title: "Ambulance", number: numbers.ambulance, icon: HeartPulse, color: "from-rose-500 to-red-600" },
    { title: "Fire Service", number: numbers.fire, icon: Flame, color: "from-orange-500 to-red-600" }
  ];

  const services = [
    { title: `${cityName} Government Hospital`, number: numbers.hospital },
    { title: `Blood Bank, ${cityName}`, number: numbers.bloodBank },
    { title: "Women Helpline", number: numbers.womenHelpline },
    { title: "Child Helpline", number: numbers.childHelpline }
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Emergency Header */}
      <div className="p-5 bg-gradient-to-r from-red-100 via-rose-50 to-red-100 border border-red-200 rounded-3xl flex items-center justify-between gap-3 shadow-xs">
        <div>
          <span className="px-2.5 py-0.5 bg-red-200 text-red-900 text-[10px] font-extrabold uppercase rounded-full tracking-wider">
            24/7 Helpline
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-red-950 mt-1 leading-tight">
            In Case of Emergency,<br />We're Here to Help
          </h3>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0 animate-pulse">
          <Siren className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* Quick Contacts Grid */}
      <div>
        <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block mb-2.5">
          Quick Contacts
        </span>

        <div className="grid grid-cols-3 gap-2.5">
          {quickContacts.map((qc) => {
            const IconComponent = qc.icon;

            return (
              <a
                key={qc.title}
                href={`tel:${qc.number}`}
                className="p-3 sm:p-4 bg-red-50 hover:bg-red-100/80 border border-red-200 rounded-2xl flex flex-col items-center justify-center text-center transition group shadow-2xs hover:scale-105"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${qc.color} text-white flex items-center justify-center mb-2 shadow-sm`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-xs font-extrabold text-red-950 leading-tight">{qc.title}</span>
                <span className="text-sm font-black text-red-600 mt-0.5">{qc.number}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Important Services List */}
      <div className="space-y-3">
        <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
          Important Services
        </span>

        <div className="space-y-2">
          {services.map((svc) => (
            <div
              key={svc.title}
              className="p-3.5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between gap-3 shadow-2xs"
            >
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">{svc.title}</h4>
                <p className="text-xs font-bold text-slate-500 mt-0.5">{svc.number}</p>
              </div>

              <a
                href={`tel:${svc.number}`}
                className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition"
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
