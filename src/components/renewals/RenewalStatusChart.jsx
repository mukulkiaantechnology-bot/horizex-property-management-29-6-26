import React from 'react';
import { Card } from '../Card';
import { PieChart as PieIcon } from 'lucide-react';

export const RenewalStatusChart = ({ renewals = [] }) => {
  const total = renewals.length || 1;
  const counts = {
    Accepted: renewals.filter(r => r.status === 'Accepted').length,
    Negotiating: renewals.filter(r => r.status === 'Negotiating').length,
    Refused: renewals.filter(r => r.status === 'Refused').length,
    'Open Case': renewals.filter(r => r.status === 'Open Case').length,
    Other: renewals.filter(r => !['Accepted', 'Negotiating', 'Refused', 'Open Case'].includes(r.status)).length
  };

  const percentages = {
    Accepted: Math.round((counts.Accepted / total) * 100),
    Negotiating: Math.round((counts.Negotiating / total) * 100),
    Refused: Math.round((counts.Refused / total) * 100),
    'Open Case': Math.round((counts['Open Case'] / total) * 100),
    Other: Math.round((counts.Other / total) * 100)
  };

  const chartSegments = [
    { label: 'Accepted', value: counts.Accepted, pct: percentages.Accepted, color: 'bg-emerald-500', barColor: '#10b981' },
    { label: 'Negotiating', value: counts.Negotiating, pct: percentages.Negotiating, color: 'bg-purple-500', barColor: '#a855f7' },
    { label: 'Refused', value: counts.Refused, pct: percentages.Refused, color: 'bg-rose-500', barColor: '#f43f5e' },
    { label: 'Open Case', value: counts['Open Case'], pct: percentages['Open Case'], color: 'bg-orange-500', barColor: '#f97316' },
    { label: 'Other', value: counts.Other, pct: percentages.Other, color: 'bg-slate-400', barColor: '#94a3b8' }
  ].filter(s => s.value > 0);

  return (
    <Card className="p-6 rounded-[22px] bg-white shadow-sm border border-slate-200 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-black text-slate-800 tracking-tight">Status Distribution</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Lease renewals outcome breakdown</p>
          </div>
          <PieIcon className="text-indigo-500" size={20} />
        </div>

        {renewals.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-slate-400">
            <span className="text-sm font-medium">No renewal stats available</span>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Visual stacked progress bar chart */}
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
              {chartSegments.map((seg, idx) => (
                <div
                  key={idx}
                  style={{ width: `${(seg.value / total) * 100}%` }}
                  className={`${seg.color} h-full transition-all duration-500`}
                  title={`${seg.label}: ${seg.value} (${seg.pct}%)`}
                />
              ))}
            </div>

            {/* Legends & percentage bars */}
            <div className="space-y-3 pt-2">
              {chartSegments.map((seg, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${seg.color}`}></span>
                      <span>{seg.label}</span>
                    </div>
                    <div className="text-slate-500 font-mono text-[11px]">
                      {seg.value} ({seg.pct}%)
                    </div>
                  </div>
                  <div className="h-1 bg-slate-50 w-full rounded-full overflow-hidden">
                    <div
                      style={{ width: `${seg.pct}%` }}
                      className={`h-full ${seg.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
