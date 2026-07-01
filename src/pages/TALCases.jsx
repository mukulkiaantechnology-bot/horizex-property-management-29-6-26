import React, { useState, useEffect } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Search, Plus, Filter, Gavel, Calendar, ClipboardList, TrendingUp, X } from 'lucide-react';
import {
  talCaseService,
  taskService,
  legalAnalyticsService
} from '../mock/mockServices';
import { TAL_CASE_STATUSES, mockLawyers } from '../mock/talCases';
import { TALKPICards } from '../components/tal/TALKPICards';
import { CaseTable } from '../components/tal/CaseTable';
import { CaseStatusChart } from '../components/tal/CaseStatusChart';
import { UpcomingHearingsWidget } from '../components/tal/UpcomingHearingsWidget';
import { UrgentCasesWidget } from '../components/tal/UrgentCasesWidget';
import { HearingCalendarWidget } from '../components/tal/HearingCalendarWidget';
import { DashboardTasksWidget } from '../components/tal/DashboardTasksWidget';
import api from '../api/client';

export const TALCases = ({ defaultTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab); // 'overview', 'cases', 'calendar', 'tasks'
  const [loading, setLoading] = useState(true);

  // Data States
  const [cases, setCases] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [statusBreakdown, setStatusBreakdown] = useState([]);
  const [upcomingHearings, setUpcomingHearings] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [urgentCases, setUrgentCases] = useState([]);

  // Form selections dropdown data
  const [leases, setLeases] = useState([]);
  const [lawyers, setLawyers] = useState(mockLawyers);

  // Filter States
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedLawyer, setSelectedLawyer] = useState('');

  // Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form Fields
  const [formSubject, setFormSubject] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formPriority, setFormPriority] = useState('MEDIUM');
  const [formLeaseId, setFormLeaseId] = useState('');
  const [formLawyerId, setFormLawyerId] = useState('');

  const loadData = () => {
    try {
      setLoading(true);
      const caseList = talCaseService.getAll();
      setCases(caseList);

      // Decoupled business calculations
      setMetrics(legalAnalyticsService.getMetrics());
      setStatusBreakdown(legalAnalyticsService.getCasesByStatus());
      setUpcomingHearings(legalAnalyticsService.getUpcomingHearings(30));
      setOverdueTasks(legalAnalyticsService.getOverdueTasks());

      const summary = legalAnalyticsService.getDashboardSummary();
      setUrgentCases(summary.urgentCases || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const loadLeaseDropdownData = async () => {
    try {
      const leaseRes = await api.get('/api/admin/leases');
      setLeases(leaseRes.data?.data || leaseRes.data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
    loadLeaseDropdownData();
  }, []);

  useEffect(() => {
    const handleCompanyChange = () => {
      loadData();
      loadLeaseDropdownData();
    };
    window.addEventListener('companyChanged', handleCompanyChange);
    return () => window.removeEventListener('companyChanged', handleCompanyChange);
  }, []);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  // Filter & Search logic
  const filteredCases = cases.filter(c => {
    const matchesSearch =
      (c.caseNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.tenantName || '').toLowerCase().includes(search.toLowerCase()) ||
      (c.subject || '').toLowerCase().includes(search.toLowerCase());

    const matchesStatus = !selectedStatus || c.status === selectedStatus;
    const matchesPriority = !selectedPriority || c.priority === selectedPriority;
    const matchesLawyer = !selectedLawyer || c.assignedLawyerId === selectedLawyer;

    return matchesSearch && matchesStatus && matchesPriority && matchesLawyer;
  });

  const handleStatusChange = (caseId, newStatus) => {
    // Optimistic UI updates
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status: newStatus } : c));
    talCaseService.update(caseId, { status: newStatus });
    loadData();
  };

  const handleCreateCaseSubmit = (e) => {
    e.preventDefault();
    if (!formSubject || !formLeaseId || !formLawyerId) return;

    const matchedLease = leases.find(l => l.id === parseInt(formLeaseId));
    const matchedLawyer = lawyers.find(l => l.id === formLawyerId);

    const newCasePayload = {
      companyId: matchedLease?.companyId || 1,
      propertyId: matchedLease?.propertyId || 3,
      propertyName: matchedLease?.propertyName || 'Greenfield Commons',
      unitId: matchedLease?.unitId || 3,
      unitNumber: matchedLease?.unitNumber || 'Apt 301',
      tenantId: matchedLease?.tenantId || 103,
      tenantName: matchedLease?.tenantName || 'John Doe',
      leaseId: matchedLease?.id || 3,
      renewalId: null,

      subject: formSubject,
      caseSummary: formSummary,
      status: 'Draft',
      priority: formPriority,
      filedDate: new Date().toLocaleDateString('en-CA'),
      
      assignedManagerId: 'usr-001',
      assignedManagerName: 'Admin User',
      assignedLawyerId: formLawyerId,
      assignedLawyerName: matchedLawyer?.name || 'Unassigned',
      nextHearingDate: null,
      courtRoom: null,
      judgeId: null,
      judgeName: null
    };

    // Optimistic update
    const tempCase = { ...newCasePayload, id: Date.now(), caseNumber: 'TAL-2026-TEMP' };
    setCases(prev => [tempCase, ...prev]);

    talCaseService.create(newCasePayload);
    setShowCreateModal(false);
    
    // Reset inputs
    setFormSubject('');
    setFormSummary('');
    setFormPriority('MEDIUM');
    setFormLeaseId('');
    setFormLawyerId('');

    loadData();
  };

  const handleCompleteTask = (taskId) => {
    // Optimistic update
    setOverdueTasks(prev => prev.filter(t => t.id !== taskId));
    taskService.markComplete(taskId);
    loadData();
  };

  const handleViewDetail = (id) => {
    window.location.href = `/tal-cases/${id}`;
  };

  return (
    <MainLayout title="TAL Cases">
      <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-6">
        
        {/* Workspace Action Tab Selection Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center bg-white p-3 sm:p-4 rounded-[22px] border border-slate-200 shadow-sm gap-3">
          {/* 2-col grid on mobile, flex row on sm+ */}
          <div className="grid grid-cols-2 sm:flex gap-2">
            {[
              { id: 'overview', label: 'Case Overview', icon: TrendingUp },
              { id: 'cases', label: 'All Cases', icon: Gavel },
              { id: 'calendar', label: 'Hearings', icon: Calendar },
              { id: 'tasks', label: 'Action Tasks', icon: ClipboardList }
            ].map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'secondary'}
                onClick={() => setActiveTab(tab.id)}
                className="text-xs font-bold justify-center"
              >
                <tab.icon size={14} className="mr-1 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </Button>
            ))}
          </div>

          <Button
            variant="primary"
            onClick={() => setShowCreateModal(true)}
            className="text-xs font-bold justify-center w-full sm:w-auto"
          >
            <Plus size={16} className="mr-1.5 shrink-0" />
            File Legal Case
          </Button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Overview Dashboard Tab */}
            {activeTab === 'overview' && (
              <div className="flex flex-col gap-6">
                <TALKPICards metrics={metrics} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <CaseStatusChart statusBreakdown={statusBreakdown} />
                  <UpcomingHearingsWidget hearings={upcomingHearings.slice(0, 3)} />
                  <UrgentCasesWidget cases={urgentCases} onView={handleViewDetail} />
                </div>
              </div>
            )}

            {/* TAL Cases List Grid Tab */}
            {activeTab === 'cases' && (
              <div className="flex flex-col gap-6">
                {/* Search & Filter Toolbar */}
                <div className="bg-white p-4 sm:p-5 rounded-[22px] border border-slate-200 shadow-sm flex flex-col gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search Case #, Tenant or Subject..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold outline-none focus:bg-white focus:border-indigo-500 transition-all text-slate-800"
                    />
                  </div>

                  {/* Dropdowns + Reset */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                    >
                      <option value="">All Statuses</option>
                      {Object.keys(TAL_CASE_STATUSES).map(k => (
                        <option key={k} value={TAL_CASE_STATUSES[k].label}>{TAL_CASE_STATUSES[k].label}</option>
                      ))}
                    </select>

                    <select
                      value={selectedLawyer}
                      onChange={(e) => setSelectedLawyer(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                    >
                      <option value="">All Lawyers</option>
                      {lawyers.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                      ))}
                    </select>

                    <Button
                      variant="secondary"
                      onClick={() => { setSearch(''); setSelectedStatus(''); setSelectedPriority(''); setSelectedLawyer(''); }}
                      className="sm:w-36 text-xs font-bold rounded-2xl h-11 justify-center"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>

                <CaseTable
                  cases={filteredCases}
                  onView={handleViewDetail}
                  onStatusChange={handleStatusChange}
                />
              </div>
            )}

            {/* Hearing Monthly Calendar Tab */}
            {activeTab === 'calendar' && (
              <HearingCalendarWidget hearings={upcomingHearings} />
            )}

            {/* Action Tasks Tab */}
            {activeTab === 'tasks' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <DashboardTasksWidget tasks={overdueTasks} onCompleteTask={handleCompleteTask} />
                </div>
                <div className="bg-slate-900 rounded-[22px] p-6 text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider mb-2">Legal Management Checklist</h3>
                    <p className="text-xs text-slate-400 font-medium">Verify court filings are submitted 15 days before hearings.</p>
                  </div>
                  <div className="mt-5">
                    <Button onClick={() => setActiveTab('cases')} className="w-full text-xs font-bold bg-indigo-600 border-none hover:bg-indigo-700">Open Case List</Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* File Case Modal Dialog */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[26px] p-5 sm:p-6 max-w-lg w-full border border-slate-100 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute right-6 top-6 p-1.5 hover:bg-slate-100 rounded-full text-slate-400"
            >
              <X size={18} />
            </button>
            <h3 className="text-base font-black text-slate-800 tracking-tight mb-4">File TAL Case</h3>
            <form onSubmit={handleCreateCaseSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Select Lease & Tenant</label>
                <select
                  required
                  value={formLeaseId}
                  onChange={(e) => setFormLeaseId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none"
                >
                  <option value="">-- Choose Lease Agreement --</option>
                  {leases.map(l => (
                    <option key={l.id} value={l.id}>{l.tenantName} - {l.propertyName} ({l.unitNumber})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Assigned Lawyer</label>
                <select
                  required
                  value={formLawyerId}
                  onChange={(e) => setFormLawyerId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none"
                >
                  <option value="">-- Choose Attorney Counsel --</option>
                  {lawyers.map(l => (
                    <option key={l.id} value={l.id}>{l.name} ({l.firm})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Case Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Unpaid Rent Recovery"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-indigo-500 text-slate-800"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Case Priority</label>
                  <select
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Case Summary Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the claim case details..."
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold outline-none focus:border-indigo-500 text-slate-800 resize-none"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <Button onClick={() => setShowCreateModal(false)} variant="secondary" className="flex-1 text-xs font-bold">Cancel</Button>
                <Button type="submit" variant="primary" className="flex-1 text-xs font-bold">Generate & File</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
