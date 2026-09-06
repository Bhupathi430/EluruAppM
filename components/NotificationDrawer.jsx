import React from 'react';
import { X, BellRing, CheckCircle2, ShieldAlert, MessageSquare, Trash2, Check, Bell } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose, notifications, onClearAll, onMarkRead }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:justify-end p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 my-auto sm:mr-4">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <BellRing className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">Notification Center</h3>
              <p className="text-[11px] text-slate-500 font-semibold">{notifications.length} Active Alerts</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <button
                onClick={onClearAll}
                className="p-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                title="Clear All"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-3 max-h-[70vh] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
                <Bell className="w-6 h-6" />
              </div>
              <p className="text-sm font-extrabold text-slate-700">No New Notifications</p>
              <p className="text-xs text-slate-400 font-medium">You are all caught up with municipal alerts.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => onMarkRead(notif.id)}
                className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-start gap-3 ${
                  notif.read
                    ? 'bg-slate-50/70 border-slate-200 text-slate-600'
                    : 'bg-emerald-50/70 border-emerald-200 text-slate-900 shadow-2xs'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-base shadow-2xs">
                  <BellRing className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-extrabold text-xs text-slate-900 truncate">{notif.title}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 mt-0.5 leading-snug">{notif.message}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
