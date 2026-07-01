import React from 'react';
import { Card } from '../Card';
import { Button } from '../Button';
import { Eye, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RENEWAL_STATUSES } from '../../mock/renewals';

export const UpcomingRenewalsWidget = ({ renewals = [] }) => {
  const navigate = useNavigate();

  // Filter for upcoming active items that are not resolved yet (i.e. not accepted, not refusing/expired)
  const upcoming = renewals
    .filter(r => r.status !== 'Accepted' && r.status !== 'Expired' && r.status !== 'Not Renewing')
    .slice(0, 5);

  return (
    <Card className="p-6 rounded-[22px] bg-white shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-black text-slate-800 tracking-tight">Upcoming Renewals</h3>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Lease renewals pending response or notice</p>
          </div>
          <Clock className="text-indigo-500" size={20} />
        </div>

        {upcoming.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-slate-400">
            <span className="text-sm font-medium">No upcoming renewals found.</span>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {upcoming.map(ren => {
              const statusConfig = RENEWAL_STATUSES[ren.status.toUpperCase().replace(' ', '_')] || RENEWAL_STATUSES.DRAFT;
              return (
                <div key={ren.id} className="py-3 flex items-center justify-between gap-3 group">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{ren.tenantName}</p>
                    <p className="text-xs text-slate-400 font-medium">
                      {ren.propertyName} • <span className="font-bold text-slate-600">{ren.unitNumber}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-8 h-8 !p-0 rounded-lg opacity-60 group-hover:opacity-100 transition-opacity"
                      onClick={() => navigate(`/leases/renewals/${ren.id}`)}
                    >
                      <Eye size={14} />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100">
        <Button
          variant="secondary"
          className="w-full text-xs font-bold"
          onClick={() => navigate('/leases/renewals')}
        >
          View All Renewals
        </Button>
      </div>
    </Card>
  );
};
