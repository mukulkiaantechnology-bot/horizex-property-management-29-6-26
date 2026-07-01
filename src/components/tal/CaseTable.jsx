import React from 'react';
import { Eye, Edit3, ArrowUpDown, ShieldAlert } from 'lucide-react';
import { CaseStatusBadge } from './CaseStatusBadge';
import { TAL_CASE_PRIORITIES } from '../../mock/talCases';

export const CaseTable = ({ cases = [], onView, onStatusChange }) => {
  const getPriorityStyle = (priority) => {
    const config = Object.values(TAL_CASE_PRIORITIES).find(
      p => p.label.toLowerCase() === (priority || '').toLowerCase()
    );
    return config?.color || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[22px] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Case Info</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Property & Unit</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Tenant</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">AR Dues</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Priority</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Filed Date</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Hearing</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Workflow Status</th>
              <th className="px-5 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cases.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-5 py-12 text-center text-xs font-semibold text-slate-400 bg-white">
                  No active TAL legal cases found matching the filters.
                </td>
              </tr>
            ) : (
              cases.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 font-mono tracking-tight">{c.caseNumber}</span>
                      <span className="text-[10px] font-medium text-slate-400 mt-0.5 truncate max-w-[140px]">{c.subject}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{c.propertyName}</span>
                      <span className="text-[10px] font-semibold text-slate-400 mt-0.5">{c.unitNumber}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{c.tenantName}</span>
                      <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider mt-0.5">Manager: {c.assignedManagerName || 'Unassigned'}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-black text-slate-800 font-mono">
                      ${(c.outstandingBalance || 0).toLocaleString('en-CA')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-md ${getPriorityStyle(c.priority)}`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {c.filedDate ? new Date(c.filedDate).toLocaleDateString('en-CA') : 'Not Filed'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800 font-mono">
                        {c.nextHearingDate ? new Date(c.nextHearingDate).toLocaleDateString('en-CA') : 'None'}
                      </span>
                      {c.courtRoom && (
                        <span className="text-[9px] font-semibold text-slate-400 mt-0.5">{c.courtRoom}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <CaseStatusBadge status={c.status} />
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => onView(c.id)}
                        title="View Details"
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-indigo-600 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <select
                        value={c.status}
                        onChange={(e) => onStatusChange(c.id, e.target.value)}
                        className="text-[10px] font-bold border border-slate-200 rounded-lg px-1.5 py-1 text-slate-700 bg-white outline-none"
                      >
                        <option value="Draft">Draft</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Notice Sent">Notice Sent</option>
                        <option value="Filed">Filed</option>
                        <option value="Awaiting Hearing">Awaiting Hearing</option>
                        <option value="Hearing Scheduled">Hearing Scheduled</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Judgement Pending">Judgement Pending</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                        <option value="Appealed">Appealed</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
