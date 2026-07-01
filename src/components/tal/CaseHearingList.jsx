import React, { useState } from 'react';
import { Card } from '../Card';
import { Scale, Plus, Calendar, Clock, MapPin, UserCheck, Play } from 'lucide-react';
import { Button } from '../Button';

export const CaseHearingList = ({ hearings = [], onAddHearing }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [date, setDate] = useState('');
  const [courtRoom, setCourtRoom] = useState('');
  const [judgeName, setJudgeName] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !judgeName || !courtRoom) return;

    onAddHearing({
      date,
      courtRoom,
      judgeId: `jdg-${Math.floor(100 + Math.random() * 900)}`,
      judgeName,
      notes,
      outcome: null,
      reminderSent: false
    });

    setDate('');
    setCourtRoom('');
    setJudgeName('');
    setNotes('');
    setShowAddForm(false);
  };

  return (
    <Card className="p-5 bg-white border border-slate-200 rounded-[22px] shadow-sm">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-black text-slate-800 tracking-wider uppercase">Tribunal Hearings Schedule</h3>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">Assigned judge, court rooms, and dockets</p>
        </div>
        <Button
          variant="secondary"
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-[10px] font-black uppercase tracking-wider py-1.5 h-8.5"
        >
          {showAddForm ? 'Cancel' : 'Add Hearing'}
        </Button>
      </div>

      {/* Add Hearing Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 mb-5 space-y-3.5">
          <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest flex items-center gap-1">
            <Scale size={12} />
            Schedule New Hearing
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Date & Time</label>
              <input
                type="datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-700"
              />
            </div>
            <div>
              <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Court Room</label>
              <input
                type="text"
                required
                placeholder="e.g. Room 4A"
                value={courtRoom}
                onChange={(e) => setCourtRoom(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-700"
              />
            </div>
            <div>
              <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Judge Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Justice Smith"
                value={judgeName}
                onChange={(e) => setJudgeName(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-700"
              />
            </div>
          </div>
          <div>
            <label className="text-[9px] font-bold text-slate-400 uppercase block mb-1">Filing Notes / Objectives</label>
            <input
              type="text"
              placeholder="e.g. Evidentiary submissions..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-500 text-slate-700"
            />
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              className="text-[10px] font-black uppercase tracking-wider px-4 py-2"
            >
              Post Schedule
            </Button>
          </div>
        </form>
      )}

      {/* Hearings List */}
      {hearings.length === 0 ? (
        <div className="py-6 text-center text-xs font-semibold text-slate-400">
          No hearings scheduled yet.
        </div>
      ) : (
        <div className="space-y-3">
          {[...hearings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((h) => (
            <div key={h.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                  <p className="text-xs font-black text-slate-800">
                    {new Date(h.date).toLocaleDateString('en-CA')} @ {new Date(h.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {h.notes && (
                  <p className="text-[10px] text-slate-400 font-bold tracking-wide pl-4.5">{h.notes}</p>
                )}
              </div>

              <div className="flex items-center gap-4 text-[10px] text-slate-500 font-semibold pl-4.5 sm:pl-0">
                <div className="flex items-center gap-1">
                  <MapPin size={11} className="text-slate-400 shrink-0" />
                  <span>{h.courtRoom}</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserCheck size={11} className="text-slate-400 shrink-0" />
                  <span>{h.judgeName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
export default CaseHearingList;
