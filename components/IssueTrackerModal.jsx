import React, { useState } from 'react';
import { X, MapPin, ThumbsUp, Share2, Clock, CheckCircle2, AlertCircle, BellRing, Building2, PhoneCall, Send, AlertTriangle } from 'lucide-react';

export default function IssueTrackerModal({ issue, isOpen, onClose, onUpvote }) {
  if (!isOpen || !issue) return null;

  const [copied, setCopied] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);

  const dept = issue.department || {
    deptName: "Roads & Infrastructure Department (RID)",
    officer: "Er. K. Ramesh",
    designation: "Chief Engineer",
    contact: "+91 8812 245001"
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  const steps = [
    { label: 'Reported', completed: true },
    { label: 'In Progress', completed: issue.status !== 'Reported' },
    { label: 'Under Review', completed: issue.status === 'Under Review' || issue.status === 'Resolved' },
    { label: 'Resolved', completed: issue.status === 'Resolved' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 my-auto">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-extrabold text-slate-900">Issue Status & Department Alert</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Card Header */}
          <div className="p-4 bg-red-50/70 border border-red-100 rounded-2xl relative">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-500 text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-lg leading-tight">
                    {issue.category}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {issue.location}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 bg-red-100 text-red-700 font-extrabold text-xs rounded-full border border-red-200 shrink-0">
                {issue.status}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-red-100/60 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Reported: {issue.reportedDate}</span>
              <span className="font-bold text-slate-800">ID: {issue.id}</span>
            </div>
          </div>

          {/* Department Auto-Notified Officer Card */}
          <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <BellRing className="w-4 h-4 text-amber-600 animate-bounce" /> Auto-Notified Department
              </span>
              <span className="px-2 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-black rounded-full uppercase tracking-wider">
                ALERT DELIVERED
              </span>
            </div>

            <div className="border-t border-amber-200/60 pt-2 space-y-1 text-xs">
              <p className="font-black text-slate-900 text-sm">{dept.deptName}</p>
              <p className="text-slate-700 font-semibold">
                Assigned Officer: <strong className="text-slate-900">{dept.officer}</strong> ({dept.designation})
              </p>
              <p className="text-slate-500 text-[11px]">Direct Line: {dept.contact}</p>
            </div>

            {/* Send SMS Reminder */}
            <button
              onClick={handleSendReminder}
              className={`w-full mt-2 py-2 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition ${
                reminderSent
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{reminderSent ? 'SMS & Terminal Reminder Sent to Officer!' : 'Send SMS Reminder to Department Officer'}</span>
            </button>
          </div>

          {/* Tracking Status Progress Bar */}
          <div>
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3">
              Tracking Status
            </h4>

            <div className="relative flex items-center justify-between px-2">
              <div className="absolute left-6 right-6 top-3.5 h-0.5 bg-slate-200 -z-0" />

              {steps.map((step, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition ${
                      step.completed
                        ? 'bg-red-500 text-white ring-4 ring-red-100'
                        : 'bg-white border-2 border-slate-300 text-slate-400'
                    }`}
                  >
                    {step.completed ? '✓' : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-1.5 ${
                      step.completed ? 'text-slate-900' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Details
            </h4>

            {issue.image && (
              <div className="h-44 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={issue.image} alt={issue.title} className="w-full h-full object-cover" />
              </div>
            )}

            <p className="text-sm font-semibold text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              "{issue.description}"
            </p>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{issue.location}</span>
              </div>

              {/* Upvote Button */}
              <button
                onClick={() => onUpvote(issue.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-extrabold transition shadow-2xs ${
                  issue.hasUpvoted
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{issue.upvotes} Upvotes</span>
              </button>
            </div>
          </div>

          {/* Timeline Updates Feed */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Updates & Department Audit Logs
            </h4>

            <div className="space-y-3 border-l-2 border-slate-200 pl-4 ml-2">
              {issue.updates && issue.updates.map((upd, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-red-500 ring-4 ring-white" />
                  <p className="text-[11px] font-bold text-slate-400">{upd.date}</p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{upd.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="w-full py-3.5 border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold rounded-2xl flex items-center justify-center gap-2 text-sm transition"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Copied Share Link!' : 'Share Issue'}</span>
          </button>

        </div>
      </div>
    </div>
  );
}
