import React, { useState, useEffect } from 'react';
import { db } from './data/db';
import { CITIES, USER_ROLES } from './data/mockData';
import Navbar from './components/Navbar';
import SwagatModal from './components/SwagatModal';
import GrandSwagatAnimation from './components/GrandSwagatAnimation';
import HeroSlider from './components/HeroSlider';
import QuickActions from './components/QuickActions';
import ReportIssueModal from './components/ReportIssueModal';
import IssueTrackerModal from './components/IssueTrackerModal';
import ExploreView from './components/ExploreView';
import JobsView from './components/JobsView';
import EmergencyView from './components/EmergencyView';
import BottomNav from './components/BottomNav';
import NotificationDrawer from './components/NotificationDrawer';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import {
  Search,
  MapPin,
  Clock,
  ThumbsUp,
  ChevronRight,
  ShieldCheck,
  Building2,
  Sparkles,
  UserCheck,
  Bell,
  LogOut,
  User,
  Database,
  Shield,
  Activity,
  Store,
  AlertTriangle
} from 'lucide-react';

const ROLE_ICONS = {
  User,
  Shield,
  Building2,
  Activity,
  Store
};

export default function App({ initialViewMode = 'mobile' }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const session = db.getCurrentSession();
    return session ? session.user : null;
  });

  const [selectedCity, setSelectedCity] = useState(() => {
    const session = db.getCurrentSession();
    if (session && session.user && session.user.city) return session.user.city;
    const saved = localStorage.getItem('swagat_city');
    return saved ? JSON.parse(saved) : CITIES[0];
  });

  const [userName, setUserName] = useState(() => {
    const session = db.getCurrentSession();
    if (session && session.user && session.user.name) return session.user.name;
    return localStorage.getItem('swagat_user_name') || 'Bhupathi';
  });

  const [userRole, setUserRole] = useState(() => {
    const session = db.getCurrentSession();
    if (session && session.user && session.user.role) return session.user.role;
    const saved = localStorage.getItem('swagat_user_role');
    return saved ? JSON.parse(saved) : USER_ROLES[0];
  });

  const [isSwagatModalOpen, setIsSwagatModalOpen] = useState(false);
  const [showGrandSwagat, setShowGrandSwagat] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedIssueForStatus, setSelectedIssueForStatus] = useState(null);
  
  const [issuesList, setIssuesList] = useState(() => db.getIssues());
  const [searchQuery, setSearchQuery] = useState('');

  const [notifications, setNotifications] = useState(() => db.getNotifications(currentUser?.id));
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    localStorage.setItem('swagat_city', JSON.stringify(selectedCity));
  }, [selectedCity]);

  useEffect(() => {
    localStorage.setItem('swagat_user_name', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('swagat_user_role', JSON.stringify(userRole));
  }, [userRole]);

  useEffect(() => {
    const hasSeen = localStorage.getItem('swagat_intro_seen');
    if (!hasSeen) {
      setIsSwagatModalOpen(true);
      localStorage.setItem('swagat_intro_seen', 'true');
    }
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
  };

  const handleAuthSuccess = (user, msg) => {
    setCurrentUser(user);
    setUserName(user.name);
    if (user.city) setSelectedCity(user.city);
    if (user.role) setUserRole(user.role);
    setNotifications(db.getNotifications(user.id));
    triggerToast(msg);
    setShowGrandSwagat(true);
  };

  const handleLogout = () => {
    db.logout();
    setCurrentUser(null);
    setUserName('Bhupathi');
    triggerToast('Logged out of account session.');
  };

  const handleCitySelectFinish = (cityObj) => {
    setSelectedCity(cityObj);
    setShowGrandSwagat(true);
  };

  const handleAddNewIssue = (newIssue) => {
    const updatedList = db.saveIssue(newIssue);
    setIssuesList(updatedList);
    setSelectedIssueForStatus(newIssue);

    const newNotif = {
      id: Date.now(),
      userId: currentUser?.id || 'guest',
      title: `${newIssue.department?.deptName || 'Department'} Auto-Notified`,
      message: `SMS dispatch alert sent to ${newIssue.department?.officer || 'Officer'} for issue ${newIssue.id}. Saved to Database.`,
      time: 'Just Now',
      read: false
    };

    const updatedNotifs = db.saveNotification(newNotif);
    setNotifications(updatedNotifs);
    triggerToast(`Notification sent to ${newIssue.department?.deptName.split('(')[0] || 'Department'} and saved to Database.`);
  };

  const handleUpvoteIssue = (issueId) => {
    const updatedList = db.upvoteIssue(issueId);
    setIssuesList(updatedList);

    if (selectedIssueForStatus && selectedIssueForStatus.id === issueId) {
      setSelectedIssueForStatus(prev => ({
        ...prev,
        hasUpvoted: !prev.hasUpvoted,
        upvotes: !prev.hasUpvoted ? prev.upvotes + 1 : prev.upvotes - 1
      }));
    }

    triggerToast('Upvote saved to Database.');
  };

  const handleQuickActionSelect = (actionId) => {
    if (actionId === 'report-issue') {
      setIsReportModalOpen(true);
    } else if (actionId === 'explore-city' || actionId === 'local-businesses') {
      setActiveTab('explore');
    } else if (actionId === 'jobs' || actionId === 'events' || actionId === 'city-2035') {
      setActiveTab('jobs');
    } else if (actionId === 'emergency' || actionId === 'blood-bank' || actionId === 'help-line') {
      setActiveTab('emergency');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const ActiveRoleIcon = ROLE_ICONS[userRole.iconName] || User;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-800 flex flex-col items-center justify-start py-0 md:py-6 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navbar */}
      <div className="w-full max-w-5xl">
        <Navbar
          selectedCity={selectedCity}
          onOpenSwagat={() => setIsSwagatModalOpen(true)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          userName={userName}
          currentUser={currentUser}
          onOpenAuth={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          unreadCount={unreadCount}
          onOpenNotifications={() => setIsNotificationDrawerOpen(true)}
        />
      </div>

      {/* Toast Alert */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Responsive Container */}
      <main
        className={`w-full transition-all duration-300 ${
          viewMode === 'mobile'
            ? 'max-w-md bg-white min-h-[92vh] md:min-h-[850px] md:my-4 md:rounded-[40px] shadow-2xl border-0 md:border-[10px] md:border-slate-800 relative overflow-hidden flex flex-col'
            : 'max-w-5xl bg-white min-h-[850px] my-4 rounded-3xl shadow-xl border border-slate-200 p-4 md:p-8 flex flex-col'
        }`}
      >
        {/* Simulated Mobile Status Bar */}
        {viewMode === 'mobile' && (
          <div className="hidden md:flex items-center justify-between px-6 pt-3 pb-1 text-xs font-bold text-slate-800 bg-white border-b border-slate-100">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span>100%</span>
            </div>
          </div>
        )}

        {/* Scrollable Main Content Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 space-y-6 pb-24 no-scrollbar">
          
          {/* TAB 1: HOME */}
          {activeTab === 'home' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Personalized Greeting */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      Hello, {userName}
                    </h1>
                  </div>

                  {/* Active Role & DB Sync Tag */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-extrabold text-xs shadow-2xs">
                      <ActiveRoleIcon className="w-3.5 h-3.5" />
                      <span>Role: {userRole.title}</span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
                      <Database className="w-3 h-3 text-emerald-600" /> DB Persistent
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                    Let's build a better {selectedCity.name} together
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <button
                    onClick={() => setShowGrandSwagat(true)}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black rounded-full text-xs transition flex items-center gap-1 shadow-md shadow-orange-500/20 active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Swagat Intro
                  </button>
                </div>
              </div>

              {/* City Happenings Image Slider Carousel */}
              <HeroSlider cityName={selectedCity.name} />

              {/* Search Services, places, jobs... Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search services, places, jobs in ${selectedCity.name}...`}
                  className="w-full pl-10 pr-4 py-3 bg-slate-100/90 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm text-slate-900 font-semibold placeholder:text-slate-400"
                />
              </div>

              {/* Color-Coded Quick Actions Grid */}
              <QuickActions
                cityName={selectedCity.name}
                onActionSelect={handleQuickActionSelect}
              />

              {/* Recent Community Reported Issues Feed */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900 tracking-tight">Recent Civic Reports</h3>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full">
                      {issuesList.length} Total in DB
                    </span>
                  </div>

                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="text-xs font-extrabold text-emerald-600 hover:underline flex items-center gap-0.5"
                  >
                    + Report New
                  </button>
                </div>

                <div className="space-y-3">
                  {issuesList.slice(0, 4).map((iss) => (
                    <div
                      key={iss.id}
                      onClick={() => setSelectedIssueForStatus(iss)}
                      className="p-4 bg-white border border-slate-200/80 hover:border-emerald-300 rounded-2xl shadow-2xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-lg shrink-0">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                              {iss.category}
                            </h4>
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-extrabold rounded-full">
                              {iss.status}
                            </span>
                            {iss.reporterRole && (
                              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full">
                                {iss.reporterRole.split('/')[0]}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                            {iss.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleUpvoteIssue(iss.id);
                          }}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold border transition ${
                            iss.hasUpvoted
                              ? 'bg-emerald-500 text-white border-emerald-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{iss.upvotes}</span>
                        </button>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: EXPLORE */}
          {activeTab === 'explore' && (
            <ExploreView cityName={selectedCity.name} />
          )}

          {/* TAB 3: JOBS */}
          {activeTab === 'jobs' && (
            <JobsView cityName={selectedCity.name} />
          )}

          {/* TAB 4: EMERGENCY */}
          {activeTab === 'emergency' && (
            <EmergencyView cityName={selectedCity.name} emergencyNumbers={selectedCity.emergencyNumbers} />
          )}

          {/* TAB 5: UPDATES */}
          {activeTab === 'updates' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-xl font-extrabold text-slate-900">City Updates & Department Log</h3>
              <p className="text-xs text-slate-500 font-semibold">
                Click any reported issue to view real-time status step-by-step from {selectedCity.name} Municipal Corporation.
              </p>

              <div className="space-y-3">
                {issuesList.map((iss) => (
                  <div
                    key={iss.id}
                    onClick={() => setSelectedIssueForStatus(iss)}
                    className="p-4 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 text-sm">{iss.id}</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 text-[10px] font-extrabold rounded-full">
                          {iss.status}
                        </span>
                        {iss.reporterRole && (
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-full">
                            {iss.reporterRole}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 font-bold mt-1">{iss.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{iss.reportedDate}</p>
                    </div>

                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-5 animate-fadeIn text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
                {userName.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">{userName}</h3>
                {currentUser && (
                  <p className="text-xs font-bold text-slate-400 mt-0.5">{currentUser.email}</p>
                )}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-950 font-bold text-xs rounded-full mt-1.5">
                  <ActiveRoleIcon className="w-3.5 h-3.5" />
                  <span>Role: {userRole.title}</span>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1">Citizen of {selectedCity.name}, {selectedCity.state}</p>
              </div>

              {/* Account Status Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Account Session Status:</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${currentUser ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                    {currentUser ? 'AUTHENTICATED USER' : 'GUEST SESSION'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Selected City:</span>
                  <span className="text-emerald-700">{selectedCity.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Persistent Database Records:</span>
                  <span className="text-emerald-700 font-extrabold">{issuesList.length} Total Issues Logged</span>
                </div>
              </div>

              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="w-full py-3.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 font-extrabold rounded-2xl transition flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out of Account</span>
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In or Register Account</span>
                </button>
              )}

              <button
                onClick={() => setIsSwagatModalOpen(true)}
                className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl transition"
              >
                Change City or Role Settings
              </button>
            </div>
          )}

        </div>

        {/* Bottom Navigation Bar */}
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenReportModal={() => setIsReportModalOpen(true)}
        />

      </main>

      {/* Modals & Animations */}
      <SwagatModal
        isOpen={isSwagatModalOpen}
        onClose={() => setIsSwagatModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={handleCitySelectFinish}
        userName={userName}
        setUserName={setUserName}
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {showGrandSwagat && (
        <GrandSwagatAnimation
          cityName={selectedCity.name}
          userName={userName}
          userRole={userRole}
          onClose={() => setShowGrandSwagat(false)}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        cityName={selectedCity.name}
        onSubmitIssue={handleAddNewIssue}
        defaultRole={userRole}
      />

      <IssueTrackerModal
        issue={selectedIssueForStatus}
        isOpen={!!selectedIssueForStatus}
        onClose={() => setSelectedIssueForStatus(null)}
        onUpvote={handleUpvoteIssue}
      />

      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onClearAll={() => setNotifications([])}
        onMarkRead={(id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))}
      />

    </div>
  );
}
