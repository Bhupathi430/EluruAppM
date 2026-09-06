import React, { useState } from 'react';
import { JOBS_LIST } from '../data/mockData';
import { Briefcase, MapPin, DollarSign, CheckCircle, Sparkles } from 'lucide-react';

export default function JobsView({ cityName }) {
  const [filter, setFilter] = useState('All');
  const [appliedJobId, setAppliedJobId] = useState(null);

  const filteredJobs = JOBS_LIST.filter(j => {
    if (filter === 'All') return true;
    return j.type === filter;
  });

  const handleApply = (id) => {
    setAppliedJobId(id);
    setTimeout(() => setAppliedJobId(null), 2500);
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Jobs Banner */}
      <div className="p-5 bg-gradient-to-r from-amber-100 via-amber-50 to-orange-100 border border-amber-200/80 rounded-3xl flex items-center justify-between gap-3 shadow-xs">
        <div>
          <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 text-[10px] font-extrabold uppercase rounded-full tracking-wider">
            Local Employment
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-amber-950 mt-1 leading-tight">
            Find Jobs. Build Future. <br />Grow {cityName}.
          </h3>
        </div>
        <div className="w-13 h-13 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
          <Briefcase className="w-6 h-6 stroke-[2.5]" />
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {['All', 'Full Time', 'Part Time', 'Internship'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-2xl border text-xs font-extrabold transition shrink-0 ${
              filter === type
                ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {type === 'All' ? 'All Jobs' : type}
          </button>
        ))}
      </div>

      {/* Latest Jobs Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Latest Jobs</span>
          <span className="text-xs text-slate-400 font-bold">{filteredJobs.length} Available</span>
        </div>

        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 bg-white border border-slate-200/80 rounded-2xl shadow-2xs hover:shadow-md transition space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-base">{job.title}</h4>
                    {job.isNew && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">
                    {job.company} • <span className="text-slate-400">{job.location.replace('Eluru', cityName)}</span>
                  </p>
                </div>

                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 font-bold text-[11px] rounded-xl shrink-0">
                  {job.type}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                <span className="font-extrabold text-slate-800">{job.salary}</span>
                <span className="text-[11px] text-slate-400 font-medium">{job.posted}</span>
              </div>

              {/* Action */}
              <button
                onClick={() => handleApply(job.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5 ${
                  appliedJobId === job.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {appliedJobId === job.id ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Application Submitted!</span>
                  </>
                ) : (
                  <span>Apply Now</span>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
