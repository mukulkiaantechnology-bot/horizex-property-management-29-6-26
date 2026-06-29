export const mockInvoices = [
  {
    id: 1,
    invoiceNumber: 'INV-2026-001',
    tenantId: 101,
    tenantName: 'Sarah Connor',
    unitNumber: 'Apt 101',
    propertyName: 'Parkview Heights',
    amount: 1100,
    dueDate: '2026-06-01',
    status: 'Paid',
    category: 'Rent',
    createdAt: '2026-05-25T08:00:00Z',
    payments: [
      { id: 10, amount: 1100, paymentMethod: 'E-Transfer', transactionId: 'TXN-99881', paymentDate: '2026-05-30T10:00:00Z' }
    ]
  },
  {
    id: 2,
    invoiceNumber: 'INV-2026-002',
    tenantId: 102,
    tenantName: 'Alice Cooper',
    unitNumber: 'Apt 201',
    propertyName: 'Sunset Towers',
    amount: 950,
    dueDate: '2026-06-01',
    status: 'Paid',
    category: 'Rent',
    createdAt: '2026-05-25T08:00:00Z',
    payments: [
      { id: 11, amount: 950, paymentMethod: 'E-Transfer', transactionId: 'TXN-99882', paymentDate: '2026-06-01T12:00:00Z' }
    ]
  },
  {
    id: 3,
    invoiceNumber: 'INV-2026-003',
    tenantId: 103,
    tenantName: 'John Doe',
    unitNumber: 'Apt 301',
    propertyName: 'Greenfield Commons',
    amount: 1200,
    dueDate: '2026-06-01',
    status: 'Overdue',
    category: 'Rent',
    createdAt: '2026-05-25T08:00:00Z',
    payments: []
  },
  {
    id: 4,
    invoiceNumber: 'INV-2026-004',
    tenantId: 101,
    tenantName: 'Sarah Connor',
    unitNumber: 'Apt 101',
    propertyName: 'Parkview Heights',
    amount: 1100,
    dueDate: '2026-07-01',
    status: 'Unpaid',
    category: 'Rent',
    createdAt: '2026-06-25T08:00:00Z',
    payments: []
  }
];

export const mockPaymentsReceived = [
  {
    id: 10,
    invoiceId: 1,
    invoiceNumber: 'INV-2026-001',
    tenantName: 'Sarah Connor',
    unitNumber: 'Apt 101',
    propertyName: 'Parkview Heights',
    amount: 1100,
    paymentMethod: 'E-Transfer',
    transactionId: 'TXN-99881',
    paymentDate: '2026-05-30T10:00:00Z'
  },
  {
    id: 11,
    invoiceId: 2,
    invoiceNumber: 'INV-2026-002',
    tenantName: 'Alice Cooper',
    unitNumber: 'Apt 201',
    propertyName: 'Sunset Towers',
    amount: 950,
    paymentMethod: 'E-Transfer',
    transactionId: 'TXN-99882',
    paymentDate: '2026-06-01T12:00:00Z'
  }
];

export const mockOutstandingDues = [
  {
    id: 3,
    tenantName: 'John Doe',
    unitNumber: 'Apt 301',
    propertyName: 'Greenfield Commons',
    dueDate: '2026-06-01',
    amount: 1200,
    daysOverdue: 28
  }
];

export const mockRefunds = [
  {
    id: 1,
    tenantId: 101,
    tenantName: 'Sarah Connor',
    unitId: 1,
    unitName: 'Apt 101',
    type: 'Security Deposit',
    status: 'Pending',
    amount: 1100,
    reason: 'Move out lease end',
    outcomeReason: ''
  }
];
