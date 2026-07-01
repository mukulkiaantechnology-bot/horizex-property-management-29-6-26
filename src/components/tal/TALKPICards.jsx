import React from 'react';
import { Gavel, FileText, Calendar, Clock, CheckCircle2, ShieldAlert, TrendingUp, BarChart2 } from 'lucide-react';

export const TALKPICards = ({ metrics = {} }) => {
  const cards = [
    {
      title: 'Active',
      value: metrics.activeCases ?? 0,
      icon: Gavel,
      color: 'bg-violet-500 text-white'
    },
    {
      title: 'Filed',
      value: metrics.filedThisMonth ?? 0,
      icon: FileText,
      color: 'bg-blue-500 text-white'
    },
    {
      title: 'Scheduled',
      value: metrics.hearingsScheduled ?? 0,
      icon: Calendar,
      color: 'bg-orange-500 text-white'
    },
    {
      title: 'Awaiting',
      value: metrics.awaitingDocuments ?? 0,
      icon: Clock,
      color: 'bg-amber-500 text-white'
    },
    {
      title: 'Pending',
      value: metrics.judgementPending ?? 0,
      icon: ShieldAlert,
      color: 'bg-purple-500 text-white'
    },
    {
      title: 'Closed',
      value: metrics.closedCases ?? 0,
      icon: CheckCircle2,
      color: 'bg-slate-500 text-white'
    },
    {
      title: 'Success',
      value: `${metrics.successRate ?? 85}%`,
      icon: TrendingUp,
      color: 'bg-emerald-500 text-white'
    },
    {
      title: 'Resolution',
      value: `${metrics.avgResolutionDays ?? 14}d`,
      icon: BarChart2,
      color: 'bg-rose-500 text-white'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="p-3 sm:p-4 bg-white border border-slate-200 rounded-[18px] shadow-sm flex items-center gap-3 hover:shadow-md transition-all duration-300"
        >
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${card.color} shrink-0 shadow-sm`}>
            <card.icon size={16} />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest block truncate" title={card.title}>
              {card.title}
            </span>
            <span className="text-base sm:text-lg font-black text-slate-800 font-mono tracking-tight block mt-0.5">
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
