import React from 'react';
import { Eye, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { hasPermission } from '../../utils/permissions';

export const PayrollTable = ({ records = [], onApprove, onReject, onPay, onViewPayslip, settings = {} }) => {
  
  const getStatusBadge = (status) => {
    const base = 'px-2.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase border ';
    switch (status) {
      case 'Paid':
        return base + 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Approved':
        return base + 'bg-green-50 text-green-600 border-green-100';
      case 'Level 1 Approved':
        return base + 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Pending Approval':
        return base + 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Rejected':
        return base + 'bg-rose-50 text-rose-600 border-rose-100';
      default:
        return base + 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const isCoworker = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user.role === 'COWORKER';
    } catch (e) {
      return false;
    }
  };

  const canApprove = hasPermission('Payroll', 'edit') || !isCoworker();

  return (
    <div className="overflow-x-auto w-full bg-white border border-slate-100 rounded-3xl shadow-card">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Run ID</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Employee</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Period / Cycle</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Basic</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Allowances</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Overtime</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Deductions / Tax</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right font-black">Net Salary</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 text-slate-600 text-sm">
          {records.length === 0 ? (
            <tr>
              <td colSpan="10" className="p-12 text-center text-slate-400">
                <div className="flex flex-col items-center justify-center gap-2">
                  <span className="text-2xl text-slate-300">∅</span>
                  <p className="font-semibold text-slate-500">No payroll runs found</p>
                </div>
              </td>
            </tr>
          ) : (
            records.map((rec) => {
              const showWorkflowApproval = rec.status === 'Pending Approval' || (rec.status === 'Level 1 Approved' && settings.approvalWorkflowType === 'TwoLevelApproval');
              
              return (
                <tr key={rec.id} className="hover:bg-slate-50/20 transition-colors duration-200">
                  <td className="px-6 py-4 font-mono font-bold text-slate-700 text-xs">
                    {rec.payrollNo}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-800">{rec.employeeName}</span>
                      <span className="text-xs text-slate-400">{rec.department} · {rec.employeeNo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-700">{rec.payrollMonth}</span>
                      <span className="text-xs text-slate-400 font-mono">{rec.periodStart} to {rec.periodEnd}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-700">
                    ${rec.basicSalary?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500">
                    +${rec.allowances?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-indigo-600 font-medium">
                    +${rec.overtimePay?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-rose-500 text-xs">
                    -${(rec.deductions + rec.tax)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-slate-900 bg-slate-50/30">
                    ${rec.netSalary?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={getStatusBadge(rec.status)}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button 
                        onClick={() => onViewPayslip && onViewPayslip(rec)}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
                        title="View & Generate Payslip"
                      >
                        <Eye size={16} />
                      </button>
                      
                      {/* Configurable Workflow Actions */}
                      {showWorkflowApproval && canApprove && (
                        <>
                          <button 
                            onClick={() => {
                              const level = rec.status === 'Level 1 Approved' ? 2 : 1;
                              onApprove && onApprove(rec.payrollNo, level);
                            }}
                            className="px-2 py-1 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all border border-emerald-100"
                            title="Approve Run"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => {
                              const reason = window.prompt("Enter rejection reason:");
                              if (reason !== null) {
                                onReject && onReject(rec.payrollNo, reason);
                              }
                            }}
                            className="px-2 py-1 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-all border border-rose-100"
                            title="Reject Run"
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {/* Pay Action */}
                      {rec.status === 'Approved' && canApprove && (
                        <button 
                          onClick={() => onPay && onPay(rec.payrollNo)}
                          className="px-2.5 py-1 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-all shadow-md shadow-emerald-600/10 border-none"
                          title="Process Payout"
                        >
                          Pay
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollTable;
