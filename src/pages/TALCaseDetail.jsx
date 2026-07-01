import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ArrowLeft, User, Calendar, DollarSign, Clock, FileText, ClipboardList, Scale } from 'lucide-react';
import { talCaseService, taskService, ledgerService } from '../mock/mockServices';
import { CaseSummaryCard } from '../components/tal/CaseSummaryCard';
import { LegalTimeline } from '../components/tal/LegalTimeline';
import { CaseDocuments } from '../components/tal/CaseDocuments';
import { CaseNotes } from '../components/tal/CaseNotes';
import { CaseTasks } from '../components/tal/CaseTasks';
import { CaseHearingList } from '../components/tal/CaseHearingList';
import api from '../api/client';

export const TALCaseDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [caseData, setCaseData] = useState(null);

  // Profile data states
  const [tenant, setTenant] = useState(null);
  const [lease, setLease] = useState(null);
  const [ledgerData, setLedgerData] = useState(null);

  const loadCaseDetail = async () => {
    try {
      setLoading(true);
      const data = talCaseService.getById(id);
      if (!data) return;

      setCaseData(data);

      // Call API endpoints to get details of tenant and lease
      const [tenantRes, leaseRes] = await Promise.all([
        api.get(`/api/admin/tenants/${data.tenantId}`).catch(() => null),
        api.get(`/api/admin/leases/${data.leaseId}`).catch(() => null)
      ]);

      if (tenantRes?.data) setTenant(tenantRes.data);
      if (leaseRes?.data) setLease(leaseRes.data);

      // Ledger statement
      setLedgerData(ledgerService.getLedger(data.tenantId));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCaseDetail();
  }, [id]);

  // Actions optimistic UI calls
  const handleAddHearing = (hearing) => {
    setCaseData(prev => ({
      ...prev,
      hearings: [...(prev.hearings || []), { ...hearing, id: Date.now() }]
    }));
    talCaseService.addHearing(id, hearing);
    loadCaseDetail();
  };

  const handleUploadDocument = (doc) => {
    setCaseData(prev => ({
      ...prev,
      documents: [...(prev.documents || []), { ...doc, id: Date.now() }]
    }));
    talCaseService.addDocument(id, doc);
    loadCaseDetail();
  };

  const handleDeleteDocument = (docId) => {
    setCaseData(prev => ({
      ...prev,
      documents: (prev.documents || []).filter(d => d.id !== docId)
    }));
    talCaseService.deleteDocument(id, docId);
    loadCaseDetail();
  };

  const handleAddNote = (note) => {
    setCaseData(prev => ({
      ...prev,
      notes: [...(prev.notes || []), { ...note, id: Date.now() }]
    }));
    talCaseService.addNote(id, note);
    loadCaseDetail();
  };

  const handleAddTask = (task) => {
    // Populate hierarchy linkage before sending to taskService
    const taskPayload = {
      ...task,
      entityType: 'TAL_CASE',
      entityId: parseInt(id),
      companyId: caseData.companyId || 1,
      propertyId: caseData.propertyId || 3,
      propertyName: caseData.propertyName || 'Greenfield Commons',
      unitId: caseData.unitId || 3,
      unitNumber: caseData.unitNumber || 'Apt 301',
      tenantId: caseData.tenantId || 103,
      tenantName: caseData.tenantName || 'John Doe',
      leaseId: caseData.leaseId || 3
    };

    taskService.create(taskPayload);
    loadCaseDetail();
  };

  const handleCompleteTask = (taskId) => {
    taskService.markComplete(taskId);
    loadCaseDetail();
  };

  const handleDeleteTask = (taskId) => {
    taskService.delete(taskId);
    loadCaseDetail();
  };

  const handleBack = () => {
    window.location.href = '/tal-cases';
  };

  return (
    <MainLayout title="TAL Legal Case File Details">
      <div className="flex flex-col gap-6 p-6">
        
        {/* Header Action Row */}
        <div className="flex justify-between items-center bg-white p-4 rounded-[22px] border border-slate-200 shadow-sm flex-wrap gap-4">
          <Button variant="secondary" onClick={handleBack} className="text-xs font-bold">
            <ArrowLeft size={16} className="mr-1.5" />
            Back to Case List
          </Button>
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono">
            TAL Case Detail Overview
          </span>
        </div>

        {loading || !caseData ? (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="w-10 h-10 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Summary + Audits */}
            <div className="lg:col-span-2 space-y-6">
              <CaseSummaryCard caseData={caseData} />
              
              {/* Profile Card & Lease Statement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Tenant profile info */}
                <Card className="p-5 bg-white border border-slate-200 rounded-[22px] shadow-sm">
                  <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                    <User size={14} className="text-indigo-600" />
                    Tenant Profile Details
                  </h4>
                  <div className="space-y-2 text-xs font-semibold text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Full Name</span>
                      <span className="text-slate-800">{caseData.tenantName}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Email</span>
                      <span className="text-slate-800">{tenant?.email || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Phone Number</span>
                      <span className="text-slate-800">{tenant?.phone || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Linked Apartment</span>
                      <span className="text-slate-800 font-mono">{caseData.propertyName} ({caseData.unitNumber})</span>
                    </div>
                  </div>
                </Card>

                {/* Lease Details */}
                <Card className="p-5 bg-white border border-slate-200 rounded-[22px] shadow-sm">
                  <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                    <Calendar size={14} className="text-indigo-600" />
                    Active Lease Details
                  </h4>
                  <div className="space-y-2 text-xs font-semibold text-slate-600">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Rent Amount</span>
                      <span className="text-slate-800 font-mono">${lease?.rentAmount || '1,200'}/month</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">Start Date</span>
                      <span className="text-slate-800 font-mono">{lease?.startDate || '2025-07-01'}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-400">End Date</span>
                      <span className="text-slate-800 font-mono">{lease?.endDate || '2026-06-30'}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Outstanding Balance</span>
                      <span className="text-rose-600 font-black font-mono">${(ledgerData?.closingBalance || 0).toLocaleString('en-CA')}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Linked Invoices Section */}
              <Card className="p-5 bg-white border border-slate-200 rounded-[22px] shadow-sm">
                <h4 className="text-xs font-black text-slate-800 tracking-wider uppercase mb-3 flex items-center gap-1.5">
                  <DollarSign size={14} className="text-indigo-600" />
                  Linked Invoices & Unpaid Dues
                </h4>
                {caseData.invoices?.length === 0 ? (
                  <p className="text-xs text-slate-400 font-semibold py-4 text-center">No invoices directly linked to this legal dispute case.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                          <th className="px-4 py-2">Invoice No</th>
                          <th className="px-4 py-2">Due Date</th>
                          <th className="px-4 py-2">Amount Due</th>
                          <th className="px-4 py-2">Outstanding</th>
                          <th className="px-4 py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {caseData.invoices?.map((inv) => (
                          <tr key={inv.id} className="hover:bg-slate-50/50">
                            <td className="px-4 py-2.5 font-bold font-mono text-slate-800">{inv.invoiceNo}</td>
                            <td className="px-4 py-2.5 font-semibold font-mono text-slate-500">{inv.dueDate}</td>
                            <td className="px-4 py-2.5 font-bold font-mono text-slate-800">${inv.amountDue}</td>
                            <td className="px-4 py-2.5 font-black font-mono text-rose-600">${inv.outstandingBalance}</td>
                            <td className="px-4 py-2.5">
                              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-rose-50 text-rose-700 border border-rose-100">
                                {inv.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card>

              {/* Case Hearings Schedule */}
              <CaseHearingList hearings={caseData.hearings} onAddHearing={handleAddHearing} />
              
              {/* Reusable Tasks Lists */}
              <CaseTasks
                tasks={caseData.tasks}
                onAddTask={handleAddTask}
                onCompleteTask={handleCompleteTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>

            {/* Right Column: Docs + Notes + Timeline */}
            <div className="space-y-6">
              <CaseDocuments
                documents={caseData.documents}
                onUpload={handleUploadDocument}
                onDelete={handleDeleteDocument}
              />
              <CaseNotes notes={caseData.notes} onAddNote={handleAddNote} />
              <LegalTimeline timeline={caseData.timeline} />
            </div>

          </div>
        )}
      </div>
    </MainLayout>
  );
};
