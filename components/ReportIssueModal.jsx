import React, { useState } from 'react';
import { ISSUE_CATEGORIES, USER_ROLES, DEPARTMENT_MAPPINGS } from '../data/mockData';
import ReportAnimation from './ReportAnimation';
import {
  X,
  MapPin,
  Camera,
  Construction,
  Trash2,
  Waves,
  Lightbulb,
  Droplets,
  Car,
  Sparkles,
  MoreHorizontal,
  Navigation,
  BellRing,
  Building2,
  User,
  Shield,
  Activity,
  Store,
  Check,
  Megaphone
} from 'lucide-react';

const ICON_MAP = {
  Construction,
  Trash2,
  Waves,
  Lightbulb,
  Droplets,
  Car,
  Sparkles,
  MoreHorizontal
};

const ROLE_ICONS = {
  User,
  Shield,
  Building2,
  Activity,
  Store
};

export default function ReportIssueModal({ isOpen, onClose, cityName, onSubmitIssue, defaultRole }) {
  const [selectedCat, setSelectedCat] = useState(ISSUE_CATEGORIES[0]);
  const [selectedRole, setSelectedRole] = useState(USER_ROLES[0]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(`${cityName} Main Road`);
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80');
  const [isLocating, setIsLocating] = useState(false);
  const [createdIssue, setCreatedIssue] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  if (!isOpen) return null;

  const currentDept = DEPARTMENT_MAPPINGS[selectedCat.id] || DEPARTMENT_MAPPINGS.other;

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setLocation(`Powerpet Ward 12, ${cityName} (GPS Verified)`);
      setIsLocating(false);
    }, 800);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    const issueObj = {
      id: `#${cityName.substring(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      category: selectedCat.name,
      categoryId: selectedCat.id,
      reporterRole: selectedRole.title,
      reporterRoleIconName: selectedRole.iconName,
      department: currentDept,
      title: `${selectedCat.name} near ${location.split(',')[0]}`,
      location: location || `${cityName} Centre`,
      reportedDate: 'Just Now',
      status: 'In Progress',
      upvotes: 1,
      hasUpvoted: true,
      description: description,
      image: photoUrl,
      updates: [
        { date: 'Just Now', text: `Issue submitted by ${selectedRole.title}` },
        { date: 'Just Now', text: `Auto-notified ${currentDept.deptName} (Officer: ${currentDept.officer} via SMS & Dispatch Terminal)` },
        { date: 'Just Now', text: `Assigned to ${cityName} Municipal Patrol & Maintenance Team` }
      ]
    };

    setCreatedIssue(issueObj);
    setShowAnimation(true);
  };

  const handleAnimationComplete = () => {
    onSubmitIssue(createdIssue);
    setShowAnimation(false);
    setCreatedIssue(null);
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 my-auto">
        
        {/* Top Navbar */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
              <Camera className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Report Issue</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-500 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {showAnimation && createdIssue ? (
          /* 2D ANIMATION & AUTO-NOTIFICATION SCENE */
          <ReportAnimation issue={createdIssue} onComplete={handleAnimationComplete} />
        ) : (
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            
            {/* Header Banner */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-emerald-950 text-base leading-tight">
                  Found an issue? Report it.
                </h4>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">
                  Submissions are instantly auto-notified to municipal departments.
                </p>
              </div>
              <div className="w-11 h-11 shrink-0 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md">
                <Megaphone className="w-5 h-5" />
              </div>
            </div>

            {/* Best UI Role Selector */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Who are you reporting as?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {USER_ROLES.map((role) => {
                  const RoleIcon = ROLE_ICONS[role.iconName] || User;
                  const isSelected = selectedRole.id === role.id;

                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition duration-200 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <RoleIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-extrabold text-slate-900 leading-tight truncate">{role.title}</p>
                        <p className="text-[10px] text-slate-500 truncate mt-0.5">{role.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Select Issue Category Grid */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2.5">
                Select Issue Category
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {ISSUE_CATEGORIES.map((cat) => {
                  const IconComponent = ICON_MAP[cat.iconName] || MoreHorizontal;
                  const isSelected = selectedCat.id === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCat(cat)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-2xl border transition text-center ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500 scale-105 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                          isSelected
                            ? 'bg-emerald-600 text-white'
                            : cat.bgClass
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-800 leading-none">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Auto-Notified Department Indicator Box */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-xs">
                <BellRing className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider block">
                  Auto-Notifying Department
                </span>
                <p className="text-xs font-black text-slate-900 truncate">{currentDept.deptName}</p>
                <p className="text-[11px] text-slate-600 truncate">Officer In-Charge: <strong>{currentDept.officer}</strong></p>
              </div>
            </div>

            {/* Add Details */}
            <div className="space-y-3">
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Add Details
              </label>

              <div>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue... (e.g. Broken street lights causing darkness or large pothole near main cross road)"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-900 placeholder:text-slate-400 font-medium resize-none"
                />
              </div>

              {/* Location Tag */}
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location of issue..."
                  className="w-full pl-10 pr-36 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-xs font-semibold text-slate-900"
                />
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-[11px] font-bold transition flex items-center gap-1"
                >
                  <Navigation className={`w-3 h-3 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Locating...' : 'Use current location'}</span>
                </button>
              </div>
            </div>

            {/* Add Photo */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                Add Photo
              </label>
              
              <div className="flex items-center gap-3">
                <div className="relative w-24 h-24 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-500 overflow-hidden shrink-0 group">
                  {photoUrl ? (
                    <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-slate-400 mb-1" />
                      <span className="text-[10px] font-bold">Tap to add</span>
                    </>
                  )}
                </div>

                <div className="text-xs text-slate-500 space-y-1">
                  <p className="font-semibold text-slate-700">Attach photo of defect</p>
                  <p className="text-[11px] text-slate-400">Sample photos attached or choose below:</p>
                  <div className="flex gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80')}
                      className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] font-bold text-slate-700"
                    >
                      Pothole
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80')}
                      className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] font-bold text-slate-700"
                    >
                      Street Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoUrl('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80')}
                      className="px-2 py-0.5 bg-slate-200 hover:bg-slate-300 rounded text-[10px] font-bold text-slate-700"
                    >
                      Garbage
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl shadow-lg shadow-emerald-600/30 transition hover:scale-[1.01] text-base flex items-center justify-center gap-2"
            >
              <BellRing className="w-5 h-5" />
              <span>Submit & Notify Department</span>
            </button>

          </form>
        )}

      </div>
    </div>
  );
}
