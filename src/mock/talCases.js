// ============================================================
// TAL CASES MOCK DATABASE — Phase 5
// Fully normalized: all relationships use ID references only.
// No data duplication across stores.
// ============================================================

// ─── CONFIGURABLE STATUS WORKFLOWS ────────────────────────────
export const TAL_CASE_STATUSES = {
  DRAFT:             { label: 'Draft',             color: 'bg-slate-100 text-slate-600 border-slate-200',    step: 1 },
  PREPARING:         { label: 'Preparing',          color: 'bg-blue-50 text-blue-700 border-blue-200',        step: 2 },
  NOTICE_SENT:       { label: 'Notice Sent',        color: 'bg-indigo-50 text-indigo-700 border-indigo-200',  step: 3 },
  FILED:             { label: 'Filed',              color: 'bg-violet-50 text-violet-700 border-violet-200',  step: 4 },
  AWAITING_HEARING:  { label: 'Awaiting Hearing',   color: 'bg-amber-50 text-amber-700 border-amber-200',     step: 5 },
  HEARING_SCHEDULED: { label: 'Hearing Scheduled',  color: 'bg-orange-50 text-orange-700 border-orange-200',  step: 6 },
  UNDER_REVIEW:      { label: 'Under Review',       color: 'bg-cyan-50 text-cyan-700 border-cyan-200',        step: 7 },
  JUDGEMENT_PENDING: { label: 'Judgement Pending',  color: 'bg-purple-50 text-purple-700 border-purple-200',  step: 8 },
  RESOLVED:          { label: 'Resolved',           color: 'bg-emerald-50 text-emerald-700 border-emerald-200', step: 9 },
  CLOSED:            { label: 'Closed',             color: 'bg-slate-200 text-slate-700 border-slate-300',    step: 10 },
  APPEALED:          { label: 'Appealed',           color: 'bg-rose-50 text-rose-700 border-rose-200',        step: 11 },
};

export const TAL_CASE_PRIORITIES = {
  LOW:    { label: 'Low',    color: 'bg-slate-100 text-slate-600' },
  MEDIUM: { label: 'Medium', color: 'bg-amber-50 text-amber-700' },
  HIGH:   { label: 'High',   color: 'bg-orange-50 text-orange-700' },
  URGENT: { label: 'Urgent', color: 'bg-rose-50 text-rose-700' },
};

export const TAL_DOCUMENT_TYPES = {
  NOTICE:       { label: 'Notice',       icon: 'FileText' },
  EVIDENCE:     { label: 'Evidence',     icon: 'File' },
  LEASE:        { label: 'Lease',        icon: 'FileText' },
  PHOTOS:       { label: 'Photos',       icon: 'Image' },
  COURT_FILING: { label: 'Court Filing', icon: 'Gavel' },
  JUDGEMENT:    { label: 'Judgement',    icon: 'Scale' },
  OTHER:        { label: 'Other',        icon: 'Paperclip' },
};

// ─── CONFIGURABLE TASK WORKFLOWS ──────────────────────────────
export const TASK_STATUSES = {
  PENDING:     { label: 'Pending',     color: 'bg-amber-50 text-amber-700 border-amber-200' },
  IN_PROGRESS: { label: 'In Progress', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  COMPLETED:   { label: 'Completed',   color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  CANCELLED:   { label: 'Cancelled',   color: 'bg-slate-100 text-slate-500 border-slate-200' },
  OVERDUE:     { label: 'Overdue',     color: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export const TASK_PRIORITIES = {
  LOW:    { label: 'Low',    color: 'bg-slate-100 text-slate-600' },
  MEDIUM: { label: 'Medium', color: 'bg-amber-50 text-amber-700' },
  HIGH:   { label: 'High',   color: 'bg-orange-50 text-orange-700' },
  URGENT: { label: 'Urgent', color: 'bg-rose-50 text-rose-700' },
};

// ─── SEED: LAWYERS ────────────────────────────────────────────
export const mockLawyers = [
  { id: 'lwy-001', name: 'Me. Jean Tremblay', firm: 'Tremblay Legal Group', phone: '514-555-0101', email: 'jtremblay@legal.ca', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z', createdBy: 'System', updatedBy: 'System' },
  { id: 'lwy-002', name: 'Me. Marie Leblanc',  firm: 'Leblanc & Associates', phone: '514-555-0102', email: 'mleblanc@legal.ca',  createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z', createdBy: 'System', updatedBy: 'System' },
  { id: 'lwy-003', name: 'Me. Ahmed Hassan',   firm: 'Hassan Law Office',    phone: '514-555-0103', email: 'ahassan@legal.ca',   createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z', createdBy: 'System', updatedBy: 'System' },
];

// ─── SEED: JUDGES ─────────────────────────────────────────────
export const mockJudges = [
  { id: 'jdg-001', name: 'Justice Robert Côté',    courtRoom: 'Room 4A', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z', createdBy: 'System', updatedBy: 'System' },
  { id: 'jdg-002', name: 'Justice Fatima Al-Said', courtRoom: 'Room 2B', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-01-01T00:00:00Z', createdBy: 'System', updatedBy: 'System' },
];

// ─── SEED: TAL CASES (normalized — IDs only for relationships) ──
export const mockTalCases = [
  {
    id: 1,
    caseNumber: 'TAL-2026-000001',

    // Hierarchy references (ID only)
    companyId: 1,
    propertyId: 3,
    propertyName: 'Greenfield Commons',
    unitId: 3,
    unitNumber: 'Apt 301',
    tenantId: 103,
    tenantName: 'John Doe',
    leaseId: 3,
    renewalId: null,

    // Linked financial records (ID refs only)
    invoiceIds: [3],

    // Related sub-entity ID refs
    hearingIds: [1],
    documentIds: [1, 2],
    noteIds: [1],
    taskIds: [1, 2],

    // Case details
    subject: 'Unpaid Rent Recovery',
    caseSummary: 'Claim filed for recovery of $1,150 in outstanding rent and associated late fees for the period of June 2026. Tenant acknowledged debt but has not made payment.',
    status: 'Hearing Scheduled',
    priority: 'High',
    filedDate: '2026-06-10',
    closedDate: null,

    // Assigned team
    assignedManagerId: 'usr-001',
    assignedManagerName: 'Admin User',
    assignedLawyerId: 'lwy-001',
    assignedLawyerName: 'Me. Jean Tremblay',

    // Next hearing (denormalized for table display performance)
    nextHearingDate: '2026-07-20T10:00:00Z',
    courtRoom: 'Room 4A',
    judgeId: 'jdg-001',
    judgeName: 'Justice Robert Côté',

    // Append-only audit timeline (embedded for atomic reads)
    timeline: [
      { id: 1, date: '2026-06-01T09:00:00Z', event: 'Case Created: TAL-2026-000001', actor: 'Admin User', createdAt: '2026-06-01T09:00:00Z' },
      { id: 2, date: '2026-06-05T14:00:00Z', event: 'Status changed: Draft → Preparing', actor: 'Admin User', createdAt: '2026-06-05T14:00:00Z' },
      { id: 3, date: '2026-06-08T10:00:00Z', event: 'Notice Sent to tenant John Doe via registered mail', actor: 'Admin User', createdAt: '2026-06-08T10:00:00Z' },
      { id: 4, date: '2026-06-08T10:05:00Z', event: 'Status changed: Preparing → Notice Sent', actor: 'Admin User', createdAt: '2026-06-08T10:05:00Z' },
      { id: 5, date: '2026-06-10T09:00:00Z', event: 'Case Filed at Tribunal Administratif du Logement', actor: 'Me. Jean Tremblay', createdAt: '2026-06-10T09:00:00Z' },
      { id: 6, date: '2026-06-10T09:05:00Z', event: 'Status changed: Notice Sent → Filed', actor: 'Admin User', createdAt: '2026-06-10T09:05:00Z' },
      { id: 7, date: '2026-06-15T11:00:00Z', event: 'Hearing scheduled for 2026-07-20 in Room 4A', actor: 'Me. Jean Tremblay', createdAt: '2026-06-15T11:00:00Z' },
      { id: 8, date: '2026-06-15T11:05:00Z', event: 'Status changed: Filed → Hearing Scheduled', actor: 'Admin User', createdAt: '2026-06-15T11:05:00Z' },
    ],

    // Audit fields
    createdAt: '2026-06-01T09:00:00Z',
    updatedAt: '2026-06-15T11:05:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 2,
    caseNumber: 'TAL-2026-000002',

    companyId: 1,
    propertyId: 2,
    propertyName: 'Sunset Towers',
    unitId: 2,
    unitNumber: 'Apt 201',
    tenantId: 102,
    tenantName: 'Alice Cooper',
    leaseId: 2,
    renewalId: 1,

    invoiceIds: [],
    hearingIds: [],
    documentIds: [3],
    noteIds: [2],
    taskIds: [3],

    subject: 'Contested Rent Increase',
    caseSummary: 'Tenant has formally contested the proposed 4.5% rent increase for the upcoming renewal term, citing comparable unit rates in the same building.',
    status: 'Preparing',
    priority: 'Medium',
    filedDate: null,
    closedDate: null,

    assignedManagerId: 'usr-001',
    assignedManagerName: 'Admin User',
    assignedLawyerId: 'lwy-002',
    assignedLawyerName: 'Me. Marie Leblanc',

    nextHearingDate: null,
    courtRoom: null,
    judgeId: null,
    judgeName: null,

    timeline: [
      { id: 1, date: '2026-06-20T08:00:00Z', event: 'Case Created: TAL-2026-000002', actor: 'Admin User', createdAt: '2026-06-20T08:00:00Z' },
      { id: 2, date: '2026-06-22T09:00:00Z', event: 'Status changed: Draft → Preparing', actor: 'Admin User', createdAt: '2026-06-22T09:00:00Z' },
      { id: 3, date: '2026-06-23T10:00:00Z', event: 'Document uploaded: Rent increase notice letter', actor: 'Admin User', createdAt: '2026-06-23T10:00:00Z' },
    ],

    createdAt: '2026-06-20T08:00:00Z',
    updatedAt: '2026-06-23T10:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 3,
    caseNumber: 'TAL-2026-000003',

    companyId: 1,
    propertyId: 1,
    propertyName: 'Parkview Heights',
    unitId: 1,
    unitNumber: 'Apt 101',
    tenantId: 101,
    tenantName: 'Sarah Connor',
    leaseId: 1,
    renewalId: null,

    invoiceIds: [4],
    hearingIds: [2],
    documentIds: [4, 5],
    noteIds: [3],
    taskIds: [4],

    subject: 'Property Damage Recovery',
    caseSummary: 'Tenant caused water damage to the unit bathroom. Insurance estimate places repair cost at $3,200. TAL case filed for cost recovery.',
    status: 'Under Review',
    priority: 'Urgent',
    filedDate: '2026-06-18',
    closedDate: null,

    assignedManagerId: 'usr-001',
    assignedManagerName: 'Admin User',
    assignedLawyerId: 'lwy-003',
    assignedLawyerName: 'Me. Ahmed Hassan',

    nextHearingDate: '2026-07-28T14:00:00Z',
    courtRoom: 'Room 2B',
    judgeId: 'jdg-002',
    judgeName: 'Justice Fatima Al-Said',

    timeline: [
      { id: 1, date: '2026-06-18T10:00:00Z', event: 'Case Created: TAL-2026-000003', actor: 'Admin User', createdAt: '2026-06-18T10:00:00Z' },
      { id: 2, date: '2026-06-18T10:30:00Z', event: 'Status changed: Draft → Filed', actor: 'Admin User', createdAt: '2026-06-18T10:30:00Z' },
      { id: 3, date: '2026-06-19T09:00:00Z', event: 'Document uploaded: Damage photos package', actor: 'Admin User', createdAt: '2026-06-19T09:00:00Z' },
      { id: 4, date: '2026-06-20T11:00:00Z', event: 'Hearing scheduled for 2026-07-28 in Room 2B', actor: 'Me. Ahmed Hassan', createdAt: '2026-06-20T11:00:00Z' },
      { id: 5, date: '2026-06-25T10:00:00Z', event: 'Status changed: Filed → Under Review', actor: 'Admin User', createdAt: '2026-06-25T10:00:00Z' },
    ],

    createdAt: '2026-06-18T10:00:00Z',
    updatedAt: '2026-06-25T10:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
];

// ─── SEED: CASE HEARINGS ───────────────────────────────────────
export const mockCaseHearings = [
  {
    id: 1,
    caseId: 1,
    date: '2026-07-20T10:00:00Z',
    courtRoom: 'Room 4A',
    judgeId: 'jdg-001',
    judgeName: 'Justice Robert Côté',
    notes: 'Initial hearing. Both parties to present evidence.',
    outcome: null,
    reminderSent: false,
    createdAt: '2026-06-15T11:00:00Z',
    updatedAt: '2026-06-15T11:00:00Z',
    createdBy: 'Me. Jean Tremblay',
    updatedBy: 'Me. Jean Tremblay',
  },
  {
    id: 2,
    caseId: 3,
    date: '2026-07-28T14:00:00Z',
    courtRoom: 'Room 2B',
    judgeId: 'jdg-002',
    judgeName: 'Justice Fatima Al-Said',
    notes: 'Damage assessment hearing.',
    outcome: null,
    reminderSent: false,
    createdAt: '2026-06-20T11:00:00Z',
    updatedAt: '2026-06-20T11:00:00Z',
    createdBy: 'Me. Ahmed Hassan',
    updatedBy: 'Me. Ahmed Hassan',
  },
];

// ─── SEED: CASE DOCUMENTS ─────────────────────────────────────
export const mockCaseDocuments = [
  {
    id: 1,
    caseId: 1,
    name: 'TAL Notice — John Doe.pdf',
    type: 'NOTICE',
    size: '128 KB',
    uploadedAt: '2026-06-08T10:00:00Z',
    url: '#mock-document-1',
    createdAt: '2026-06-08T10:00:00Z',
    updatedAt: '2026-06-08T10:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 2,
    caseId: 1,
    name: 'Lease Agreement — Apt 301.pdf',
    type: 'LEASE',
    size: '256 KB',
    uploadedAt: '2026-06-10T09:00:00Z',
    url: '#mock-document-2',
    createdAt: '2026-06-10T09:00:00Z',
    updatedAt: '2026-06-10T09:00:00Z',
    createdBy: 'Me. Jean Tremblay',
    updatedBy: 'Me. Jean Tremblay',
  },
  {
    id: 3,
    caseId: 2,
    name: 'Rent Increase Notice — Alice Cooper.pdf',
    type: 'NOTICE',
    size: '96 KB',
    uploadedAt: '2026-06-23T10:00:00Z',
    url: '#mock-document-3',
    createdAt: '2026-06-23T10:00:00Z',
    updatedAt: '2026-06-23T10:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 4,
    caseId: 3,
    name: 'Damage Photos Package.zip',
    type: 'PHOTOS',
    size: '4.2 MB',
    uploadedAt: '2026-06-19T09:00:00Z',
    url: '#mock-document-4',
    createdAt: '2026-06-19T09:00:00Z',
    updatedAt: '2026-06-19T09:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 5,
    caseId: 3,
    name: 'Insurance Damage Estimate.pdf',
    type: 'EVIDENCE',
    size: '512 KB',
    uploadedAt: '2026-06-19T09:30:00Z',
    url: '#mock-document-5',
    createdAt: '2026-06-19T09:30:00Z',
    updatedAt: '2026-06-19T09:30:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
];

// ─── SEED: CASE NOTES ─────────────────────────────────────────
export const mockCaseNotes = [
  {
    id: 1,
    caseId: 1,
    text: 'Spoke with tenant. He acknowledges the debt but is seeking a payment plan. Lawyer advises we proceed with TAL hearing as planned.',
    author: 'Admin User',
    timestamp: '2026-06-12T15:30:00Z',
    createdAt: '2026-06-12T15:30:00Z',
    updatedAt: '2026-06-12T15:30:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 2,
    caseId: 2,
    text: 'Tenant has submitted comparable rent analysis showing similar units renting at $900-$920. This may affect our position.',
    author: 'Me. Marie Leblanc',
    timestamp: '2026-06-24T10:00:00Z',
    createdAt: '2026-06-24T10:00:00Z',
    updatedAt: '2026-06-24T10:00:00Z',
    createdBy: 'Me. Marie Leblanc',
    updatedBy: 'Me. Marie Leblanc',
  },
  {
    id: 3,
    caseId: 3,
    text: 'Plumber confirmed damage was caused by tenant negligence (leaving tap running). Strong case for full recovery.',
    author: 'Me. Ahmed Hassan',
    timestamp: '2026-06-21T14:00:00Z',
    createdAt: '2026-06-21T14:00:00Z',
    updatedAt: '2026-06-21T14:00:00Z',
    createdBy: 'Me. Ahmed Hassan',
    updatedBy: 'Me. Ahmed Hassan',
  },
];

// ─── SEED: CASE TASKS ─────────────────────────────────────────
// entityType: 'TAL_CASE' — reusable for RENEWAL, INVOICE, MAINTENANCE
export const mockCaseTasks = [
  {
    id: 'TASK-2026-000001',
    title: 'Gather all unpaid invoice records',
    description: 'Compile invoices INV-2026-000003 and supporting payment records for case TAL-2026-000001.',
    entityType: 'TAL_CASE',
    entityId: 1,

    // Full hierarchy linkage (for future Calendar/Notification modules)
    companyId: 1,
    propertyId: 3,
    propertyName: 'Greenfield Commons',
    unitId: 3,
    unitNumber: 'Apt 301',
    tenantId: 103,
    tenantName: 'John Doe',
    leaseId: 3,

    assignedTo: 'Admin User',
    assignedToId: 'usr-001',
    dueDate: '2026-07-05',
    priority: 'HIGH',
    status: 'COMPLETED',
    completionDate: '2026-07-03',
    reminderDate: '2026-07-04',
    reminderSent: true,

    history: [
      { date: '2026-06-10T09:00:00Z', activity: 'Task Created', actor: 'Admin User' },
      { date: '2026-07-03T11:00:00Z', activity: 'Status changed: Pending → Completed', actor: 'Admin User' },
    ],

    createdAt: '2026-06-10T09:00:00Z',
    updatedAt: '2026-07-03T11:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 'TASK-2026-000002',
    title: 'Serve legal notice via registered mail',
    description: 'Send TAL notice package to tenant John Doe at Apt 301 via registered Canada Post.',
    entityType: 'TAL_CASE',
    entityId: 1,

    companyId: 1,
    propertyId: 3,
    propertyName: 'Greenfield Commons',
    unitId: 3,
    unitNumber: 'Apt 301',
    tenantId: 103,
    tenantName: 'John Doe',
    leaseId: 3,

    assignedTo: 'Me. Jean Tremblay',
    assignedToId: 'lwy-001',
    dueDate: '2026-07-18',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    completionDate: null,
    reminderDate: '2026-07-17',
    reminderSent: false,

    history: [
      { date: '2026-06-15T11:00:00Z', activity: 'Task Created', actor: 'Admin User' },
      { date: '2026-06-16T09:00:00Z', activity: 'Status changed: Pending → In Progress', actor: 'Me. Jean Tremblay' },
    ],

    createdAt: '2026-06-15T11:00:00Z',
    updatedAt: '2026-06-16T09:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Me. Jean Tremblay',
  },
  {
    id: 'TASK-2026-000003',
    title: 'Prepare comparable rent analysis rebuttal',
    description: 'Research and document counter-evidence for TAL-2026-000002 rent increase contestation.',
    entityType: 'TAL_CASE',
    entityId: 2,

    companyId: 1,
    propertyId: 2,
    propertyName: 'Sunset Towers',
    unitId: 2,
    unitNumber: 'Apt 201',
    tenantId: 102,
    tenantName: 'Alice Cooper',
    leaseId: 2,

    assignedTo: 'Me. Marie Leblanc',
    assignedToId: 'lwy-002',
    dueDate: '2026-07-01',
    priority: 'MEDIUM',
    status: 'OVERDUE',
    completionDate: null,
    reminderDate: '2026-06-30',
    reminderSent: true,

    history: [
      { date: '2026-06-22T09:00:00Z', activity: 'Task Created', actor: 'Admin User' },
    ],

    createdAt: '2026-06-22T09:00:00Z',
    updatedAt: '2026-06-22T09:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
  {
    id: 'TASK-2026-000004',
    title: 'File damage claim and supporting evidence at TAL',
    description: 'Submit case TAL-2026-000003 with all damage documentation to Tribunal Administratif du Logement.',
    entityType: 'TAL_CASE',
    entityId: 3,

    companyId: 1,
    propertyId: 1,
    propertyName: 'Parkview Heights',
    unitId: 1,
    unitNumber: 'Apt 101',
    tenantId: 101,
    tenantName: 'Sarah Connor',
    leaseId: 1,

    assignedTo: 'Me. Ahmed Hassan',
    assignedToId: 'lwy-003',
    dueDate: '2026-07-25',
    priority: 'URGENT',
    status: 'PENDING',
    completionDate: null,
    reminderDate: '2026-07-24',
    reminderSent: false,

    history: [
      { date: '2026-06-18T10:00:00Z', activity: 'Task Created', actor: 'Admin User' },
    ],

    createdAt: '2026-06-18T10:00:00Z',
    updatedAt: '2026-06-18T10:00:00Z',
    createdBy: 'Admin User',
    updatedBy: 'Admin User',
  },
];
