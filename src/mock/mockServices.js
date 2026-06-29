import { mockDashboardStats, mockRevenueAnalytics } from './dashboard';
import { mockProperties } from './properties';
import { mockApartments, mockUnitTypes } from './apartments';
import { mockTenants } from './tenants';
import { mockLeases } from './leases';
import { mockRenewals } from './renewals';
import { mockInvoices, mockPaymentsReceived, mockOutstandingDues, mockRefunds } from './rentCollection';
import { mockEmployees, mockClockLogs } from './employees';
import { mockMaintenanceTickets } from './maintenance';
import { mockMoveIns, mockMoveOuts, mockPrepUnits, mockInspections, mockInspectionTemplates, mockResponseGroups } from './tasks';
import { mockDocuments } from './documents';
import { mockNotifications } from './notifications';
import { mockTalCases } from './talCases';
import { mockCalendarEvents } from './calendar';
import { mockReports, mockReportsAnalytics } from './reports';
import { mockTaxSettings, mockQuickBooksSettings, mockChartOfAccounts } from './settings';
import { mockUsers, mockPermissions } from './users';
import { mockReadinessUnits, mockReadinessSettings, mockReadinessHolidays } from './readiness';
import { mockInsuranceCompliance, mockInsuranceStats } from './insurance';
import { mockRentRollData } from './rentRoll';
import { mockGeneralSettings, mockServiceItems } from './generalSettings';
import { mockLedgerData } from './accounting';
export { mockUsers, mockPermissions, mockReadinessUnits, mockReadinessSettings, mockReadinessHolidays, mockInsuranceCompliance, mockInsuranceStats, mockRentRollData, mockGeneralSettings, mockServiceItems, mockLedgerData };

// Initialize localStorage databases with mock seed data if empty
export const initMockDatabase = () => {
  if (localStorage.getItem('mock_db_version') !== '1.9') {
    localStorage.removeItem('mock_dashboard_stats');
    localStorage.removeItem('mock_revenue_analytics');
    localStorage.removeItem('mock_properties');
    localStorage.removeItem('mock_apartments');
    localStorage.removeItem('mock_unit_types');
    localStorage.removeItem('mock_tenants');
    localStorage.removeItem('mock_leases');
    localStorage.removeItem('mock_renewals');
    localStorage.removeItem('mock_invoices');
    localStorage.removeItem('mock_payments_received');
    localStorage.removeItem('mock_outstanding_dues');
    localStorage.removeItem('mock_refunds');
    localStorage.removeItem('mock_employees');
    localStorage.removeItem('mock_clock_logs');
    localStorage.removeItem('mock_maintenance_tickets');
    localStorage.removeItem('mock_move_ins');
    localStorage.removeItem('mock_move_outs');
    localStorage.removeItem('mock_prep_units');
    localStorage.removeItem('mock_inspections');
    localStorage.removeItem('mock_inspection_templates');
    localStorage.removeItem('mock_response_groups');
    localStorage.removeItem('mock_documents');
    localStorage.removeItem('mock_notifications');
    localStorage.removeItem('mock_tal_cases');
    localStorage.removeItem('mock_calendar_events');
    localStorage.removeItem('mock_reports');
    localStorage.removeItem('mock_tax_settings');
    localStorage.removeItem('mock_quickbooks_settings');
    localStorage.removeItem('mock_chart_of_accounts');
    localStorage.removeItem('mock_users');
    localStorage.removeItem('mock_permissions');
    localStorage.removeItem('mock_readiness_units');
    localStorage.removeItem('mock_readiness_settings');
    localStorage.removeItem('mock_readiness_holidays');
    localStorage.removeItem('mock_insurance_compliance');
    localStorage.removeItem('mock_insurance_stats');
    localStorage.removeItem('mock_rent_roll');
    localStorage.removeItem('mock_general_settings');
    localStorage.removeItem('mock_service_items');
    localStorage.removeItem('mock_ledger');
    localStorage.removeItem('mock_reports_analytics');
    localStorage.setItem('mock_db_version', '1.9');
  }

  const checkAndSeed = (key, initialData) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  };

  checkAndSeed('mock_dashboard_stats', mockDashboardStats);
  checkAndSeed('mock_revenue_analytics', mockRevenueAnalytics);
  checkAndSeed('mock_properties', mockProperties);
  checkAndSeed('mock_apartments', mockApartments);
  checkAndSeed('mock_unit_types', mockUnitTypes);
  checkAndSeed('mock_tenants', mockTenants);
  checkAndSeed('mock_leases', mockLeases);
  checkAndSeed('mock_renewals', mockRenewals);
  checkAndSeed('mock_invoices', mockInvoices);
  checkAndSeed('mock_payments_received', mockPaymentsReceived);
  checkAndSeed('mock_outstanding_dues', mockOutstandingDues);
  checkAndSeed('mock_refunds', mockRefunds);
  checkAndSeed('mock_employees', mockEmployees);
  checkAndSeed('mock_clock_logs', mockClockLogs);
  checkAndSeed('mock_maintenance_tickets', mockMaintenanceTickets);
  checkAndSeed('mock_move_ins', mockMoveIns);
  checkAndSeed('mock_move_outs', mockMoveOuts);
  checkAndSeed('mock_prep_units', mockPrepUnits);
  checkAndSeed('mock_inspections', mockInspections);
  checkAndSeed('mock_inspection_templates', mockInspectionTemplates);
  checkAndSeed('mock_response_groups', mockResponseGroups);
  checkAndSeed('mock_documents', mockDocuments);
  checkAndSeed('mock_notifications', mockNotifications);
  checkAndSeed('mock_tal_cases', mockTalCases);
  checkAndSeed('mock_calendar_events', mockCalendarEvents);
  checkAndSeed('mock_reports', mockReports);
  checkAndSeed('mock_tax_settings', mockTaxSettings);
  checkAndSeed('mock_quickbooks_settings', mockQuickBooksSettings);
  checkAndSeed('mock_chart_of_accounts', mockChartOfAccounts);
  checkAndSeed('mock_users', mockUsers);
  checkAndSeed('mock_permissions', mockPermissions);
  checkAndSeed('mock_readiness_units', mockReadinessUnits);
  checkAndSeed('mock_readiness_settings', mockReadinessSettings);
  checkAndSeed('mock_readiness_holidays', mockReadinessHolidays);
  checkAndSeed('mock_insurance_compliance', mockInsuranceCompliance);
  checkAndSeed('mock_insurance_stats', mockInsuranceStats);
  checkAndSeed('mock_rent_roll', mockRentRollData);
  checkAndSeed('mock_general_settings', mockGeneralSettings);
  checkAndSeed('mock_service_items', mockServiceItems);
  checkAndSeed('mock_ledger', mockLedgerData);
  checkAndSeed('mock_reports_analytics', mockReportsAnalytics);
};

// Auto-init database on load
initMockDatabase();

// Simulates real backend delay
const withDelay = (resultFn) => {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
    setTimeout(() => {
      try {
        resolve({ data: resultFn() });
      } catch (err) {
        reject(err);
      }
    }, delay);
  });
};

const getStore = (key) => JSON.parse(localStorage.getItem(key) || '[]');
const setStore = (key, val) => localStorage.setItem(key, JSON.stringify(val));

export const mockDashboardService = {
  getStats: () => withDelay(() => {
    const stats = JSON.parse(localStorage.getItem('mock_dashboard_stats'));
    // Dynamically count entities based on current storage
    stats.totalProperties = getStore('mock_properties').length;
    stats.totalUnits = getStore('mock_apartments').length;
    stats.totalTenants = getStore('mock_tenants').length;
    stats.activeLeases = getStore('mock_leases').filter(l => l.status === 'Active').length;
    stats.pendingMaintenance = getStore('mock_maintenance_tickets').filter(t => t.status !== 'Resolved').length;
    
    // Pagination slicing helper for components
    stats.leaseAlerts = getStore('mock_dashboard_stats').leaseAlerts || [];
    stats.refundAlerts = getStore('mock_refunds') || [];
    stats.reservedUnits = getStore('mock_dashboard_stats').reservedUnits || [];
    stats.pendingRefunds = (getStore('mock_dashboard_stats').pendingRefunds || []).map(item => ({
      depositAmount: 0,
      leaseExpiryDate: '',
      building: '',
      unitNumber: '',
      tenantName: '',
      ...item
    }));
    stats.recentActivity = (getStore('mock_dashboard_stats').recentActivity || []).map(act => 
      typeof act === 'object' ? (act.description || act.message || JSON.stringify(act)) : act
    );
    
    return stats;
  }),
  getRevenue: () => withDelay(() => {
    const invoices = getStore('mock_invoices');
    const properties = getStore('mock_properties');
    const apartments = getStore('mock_apartments');
    
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid' || inv.status === 'paid');
    const actualRevenue = paidInvoices.reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);
    const actualRent = paidInvoices.filter(inv => inv.type === 'Rent' || inv.type === 'rent').reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);
    const actualDeposit = paidInvoices.filter(inv => inv.type === 'Deposit' || inv.type === 'deposit').reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);
    const actualServiceFees = actualRevenue - actualRent - actualDeposit;
    
    const projectedRevenue = invoices.reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);
    const totalRevenue = actualRevenue;

    const monthlyRevenue = [
      { month: "Jan 2026", revenue: 24000, rent: 22000, other: 2000 },
      { month: "Feb 2026", revenue: 24500, rent: 22500, other: 2000 },
      { month: "Mar 2026", revenue: 26000, rent: 23500, other: 2500 },
      { month: "Apr 2026", revenue: 25800, rent: 23800, other: 2000 },
      { month: "May 2026", revenue: 27000, rent: 24500, other: 2500 },
      { month: "Jun 2026", revenue: 28400, rent: 25800, other: 2600 }
    ];

    const revenueByProperty = properties.map(p => {
      const propInvoices = invoices.filter(inv => {
        const apt = apartments.find(a => a.unitNumber === inv.unitName || a.id === inv.unitId);
        return apt && apt.propertyId === p.id;
      });
      const pPaid = propInvoices.filter(inv => inv.status === 'Paid' || inv.status === 'paid');
      
      const rent = pPaid.filter(inv => inv.type === 'Rent' || inv.type === 'rent').reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);
      const deposit = pPaid.filter(inv => inv.type === 'Deposit' || inv.type === 'deposit').reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);
      const serviceFees = pPaid.filter(inv => inv.type !== 'Rent' && inv.type !== 'rent' && inv.type !== 'Deposit' && inv.type !== 'deposit').reduce((acc, inv) => acc + (parseFloat(inv.amount) || 0), 0);
      const amount = rent + deposit + serviceFees;

      const monthly = [
        { month: "Jan 2026", amount: amount * 0.8, rent: rent * 0.8, deposit: deposit * 0.8, serviceFees: serviceFees * 0.8 },
        { month: "Feb 2026", amount: amount * 0.85, rent: rent * 0.85, deposit: deposit * 0.85, serviceFees: serviceFees * 0.85 },
        { month: "Mar 2026", amount: amount * 0.9, rent: rent * 0.9, deposit: deposit * 0.9, serviceFees: serviceFees * 0.9 },
        { month: "Apr 2026", amount: amount * 0.92, rent: rent * 0.92, deposit: deposit * 0.92, serviceFees: serviceFees * 0.92 },
        { month: "May 2026", amount: amount * 0.95, rent: rent * 0.95, deposit: deposit * 0.95, serviceFees: serviceFees * 0.95 },
        { month: "Jun 2026", amount, rent, deposit, serviceFees }
      ];

      return {
        id: p.id,
        name: p.name,
        amount,
        rent,
        deposit,
        serviceFees,
        monthly
      };
    });

    return {
      actualRevenue,
      actualRent,
      actualDeposit,
      actualServiceFees,
      projectedRevenue,
      totalRevenue,
      monthlyRevenue,
      revenueByProperty
    };
  }),
  getVacancyStats: () => withDelay(() => {
    const apartments = getStore('mock_apartments');
    const properties = getStore('mock_properties');
    
    const total = apartments.length;
    const vacant = apartments.filter(a => a.status === 'Vacant').length;
    const occupied = total - vacant;
    
    let totalVacantBedrooms = 0;
    apartments.forEach(a => {
      if (a.rentalMode === 'BEDROOM_WISE' && a.bedroomsList) {
        totalVacantBedrooms += a.bedroomsList.filter(b => b.status === 'Vacant').length;
      }
    });

    const fullUnitCount = apartments.filter(a => a.rentalMode === 'FULL_UNIT').length;
    const bedroomWiseCount = total - fullUnitCount;

    const vacancyByBuilding = properties.map(p => {
      const pUnits = apartments.filter(a => a.propertyId === p.id);
      const pVacant = pUnits.filter(a => a.status === 'Vacant').length;
      const pOccupied = pUnits.length - pVacant;
      
      const hasBedroomWise = pUnits.some(a => a.rentalMode === 'BEDROOM_WISE');
      let vacantBedrooms = 0;
      pUnits.forEach(a => {
        if (a.rentalMode === 'BEDROOM_WISE' && a.bedroomsList) {
          vacantBedrooms += a.bedroomsList.filter(b => b.status === 'Vacant').length;
        }
      });

      return {
        id: p.id,
        name: p.name,
        total: pUnits.length,
        vacant: pVacant,
        occupied: pOccupied,
        hasBedroomWise,
        vacantBedrooms
      };
    });

    return {
      total,
      vacant,
      occupied,
      totalVacantBedrooms,
      fullUnitCount,
      bedroomWiseCount,
      vacancyByBuilding
    };
  }),
  cancelRefund: (tenantId, unitId) => withDelay(() => {
    let refunds = getStore('mock_refunds');
    refunds = refunds.map(r => r.tenantId === tenantId && r.unitId === unitId ? { ...r, status: 'Cancelled', outcomeReason: 'Cancelled – lease renewed' } : r);
    setStore('mock_refunds', refunds);
    return { success: true };
  })
};

export const mockPropertyService = {
  getAll: (search = '') => withDelay(() => {
    let list = getStore('mock_properties');
    if (search) {
      list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.address.toLowerCase().includes(search.toLowerCase()));
    }
    // Update unit count and occupancy dynamically
    const allUnits = getStore('mock_apartments');
    return list.map(p => {
      const pUnits = allUnits.filter(u => u.propertyId === p.id);
      const occupiedCount = pUnits.filter(u => u.status === 'Occupied').length;
      const rate = pUnits.length ? Math.round((occupiedCount / pUnits.length) * 100) : 0;
      return {
        ...p,
        units: pUnits.length,
        totalUnits: pUnits.length,
        occupancy: `${rate}%`,
        occupancyRate: rate
      };
    });
  }),
  getById: (id) => withDelay(() => {
    const properties = getStore('mock_properties');
    const prop = properties.find(p => p.id === parseInt(id));
    if (!prop) throw new Error('Property not found');
    const allUnits = getStore('mock_apartments');
    const pUnits = allUnits.filter(u => u.propertyId === parseInt(id));
    const occupiedCount = pUnits.filter(u => u.status === 'Occupied').length;
    const rate = pUnits.length ? Math.round((occupiedCount / pUnits.length) * 100) : 0;
    
    return {
      ...prop,
      totalUnits: pUnits.length,
      occupancyRate: rate,
      units: pUnits.map(u => ({
        id: u.id,
        name: u.unitNumber,
        type: u.unitType,
        mode: u.rentalMode === 'FULL_UNIT' ? 'Full Unit' : 'Bedroom Mode',
        status: u.status,
        tenant: u.tenant || 'Vacant'
      }))
    };
  }),
  create: (data) => withDelay(() => {
    const list = getStore('mock_properties');
    const newProp = {
      id: list.length ? Math.max(...list.map(p => p.id)) + 1 : 1,
      name: data.name,
      address: data.address,
      status: data.status || 'Active',
      ownerNames: data.ownerNames || 'Owner User',
      ownerIds: data.ownerIds || [3],
      units: 0,
      totalUnits: 0,
      occupancy: '0%',
      occupancyRate: 0,
      revenue: 0
    };
    list.push(newProp);
    setStore('mock_properties', list);
    return newProp;
  }),
  update: (id, data) => withDelay(() => {
    let list = getStore('mock_properties');
    let updated = null;
    list = list.map(p => {
      if (p.id === parseInt(id)) {
        updated = { ...p, ...data };
        return updated;
      }
      return p;
    });
    setStore('mock_properties', list);
    return updated;
  }),
  delete: (id) => withDelay(() => {
    let list = getStore('mock_properties');
    list = list.filter(p => p.id !== parseInt(id));
    setStore('mock_properties', list);
    return { success: true };
  })
};

export const mockTenantService = {
  getAll: (search = '') => withDelay(() => {
    let list = getStore('mock_tenants');
    if (search) {
      list = list.filter(t => 
        t.firstName.toLowerCase().includes(search.toLowerCase()) || 
        t.lastName.toLowerCase().includes(search.toLowerCase()) ||
        t.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list.map(t => ({
      ...t,
      name: t.name || `${t.firstName || ''} ${t.lastName || ''}`.trim() || 'Unknown Tenant'
    }));
  }),
  getById: (id) => withDelay(() => {
    const list = getStore('mock_tenants');
    const tenant = list.find(t => t.id === parseInt(id));
    if (!tenant) throw new Error('Tenant not found');
    return tenant;
  }),
  create: (data) => withDelay(() => {
    const list = getStore('mock_tenants');
    const newTenant = {
      id: list.length ? Math.max(...list.map(t => t.id)) + 1 : 101,
      ...data,
      status: data.status || 'Active'
    };
    list.push(newTenant);
    setStore('mock_tenants', list);

    // If unit linked, update unit occupancy
    if (data.unitId) {
      let units = getStore('mock_apartments');
      units = units.map(u => u.id === parseInt(data.unitId) ? { ...u, status: 'Occupied', tenant: `${data.firstName} ${data.lastName}` } : u);
      setStore('mock_apartments', units);
    }
    return newTenant;
  }),
  update: (id, data) => withDelay(() => {
    let list = getStore('mock_tenants');
    let updated = null;
    list = list.map(t => {
      if (t.id === parseInt(id)) {
        updated = { ...t, ...data };
        return updated;
      }
      return t;
    });
    setStore('mock_tenants', list);
    return updated;
  }),
  delete: (id) => withDelay(() => {
    let list = getStore('mock_tenants');
    const tenant = list.find(t => t.id === parseInt(id));
    list = list.filter(t => t.id !== parseInt(id));
    setStore('mock_tenants', list);

    // Update unit status to vacant
    if (tenant && tenant.unitId) {
      let units = getStore('mock_apartments');
      units = units.map(u => u.id === tenant.unitId ? { ...u, status: 'Vacant', tenant: 'Vacant' } : u);
      setStore('mock_apartments', units);
    }
    return { success: true };
  })
};

export const mockApartmentService = {
  getAll: (filters = {}) => withDelay(() => {
    let list = getStore('mock_apartments');
    if (filters.search) {
      list = list.filter(u => u.unitNumber.toLowerCase().includes(filters.search.toLowerCase()));
    }
    if (filters.propertyId) {
      list = list.filter(u => u.propertyId === parseInt(filters.propertyId));
    }
    if (filters.unitType) {
      list = list.filter(u => u.unitType === filters.unitType);
    }
    if (filters.showInactive === 'false') {
      list = list.filter(u => u.unit_status !== 'INACTIVE');
    }
    
    // Paginate in memory
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    return {
      data: list.slice(startIndex, endIndex),
      pagination: {
        total: list.length,
        totalPages: Math.ceil(list.length / limit),
        page: page,
        limit: limit
      }
    };
  }),
  getById: (id) => withDelay(() => {
    const list = getStore('mock_apartments');
    const unit = list.find(u => u.id === parseInt(id));
    if (!unit) throw new Error('Unit not found');
    return unit;
  }),
  create: (data) => withDelay(() => {
    const list = getStore('mock_apartments');
    const properties = getStore('mock_properties');
    const prop = properties.find(p => p.id === parseInt(data.propertyId));
    
    const newUnit = {
      id: list.length ? Math.max(...list.map(u => u.id)) + 1 : 1,
      propertyId: parseInt(data.propertyId),
      propertyName: prop ? prop.name : 'Unknown Property',
      unitNumber: data.unitNumber,
      unitType: data.unitType,
      floor: data.floor,
      rentalMode: data.rentalMode || 'FULL_UNIT',
      bedrooms: parseInt(data.bedrooms) || 1,
      status: data.status || 'Vacant',
      tenant: data.status === 'Occupied' ? 'Initial Tenant' : 'Vacant',
      unit_status: data.unit_status || 'ACTIVE',
      gc_delivered_target_date: data.gc_delivered_target_date || '',
      reserved_flag: data.reserved_flag || false,
      reserve_firstName: data.reserve_firstName || '',
      reserve_lastName: data.reserve_lastName || '',
      reserve_email: data.reserve_email || '',
      reserve_phone: data.reserve_phone || '',
      tentative_move_in_date: data.tentative_move_in_date || '',
      classification: data.classification || 'Existing'
    };
    list.push(newUnit);
    setStore('mock_apartments', list);
    return newUnit;
  }),
  update: (id, data) => withDelay(() => {
    let list = getStore('mock_apartments');
    let updated = null;
    list = list.map(u => {
      if (u.id === parseInt(id)) {
        updated = { ...u, ...data };
        return updated;
      }
      return u;
    });
    setStore('mock_apartments', list);
    return updated;
  }),
  delete: (id) => withDelay(() => {
    let list = getStore('mock_apartments');
    list = list.filter(u => u.id !== parseInt(id));
    setStore('mock_apartments', list);
    return { success: true };
  }),
  getTypes: () => withDelay(() => getStore('mock_unit_types'))
};

export const mockLeaseService = {
  getAll: () => withDelay(() => getStore('mock_leases')),
  create: (data) => withDelay(() => {
    const list = getStore('mock_leases');
    const tenants = getStore('mock_tenants');
    const tenant = tenants.find(t => t.id === parseInt(data.tenantId));
    const apartments = getStore('mock_apartments');
    const unit = apartments.find(u => u.id === parseInt(data.unitId));

    const newLease = {
      id: list.length ? Math.max(...list.map(l => l.id)) + 1 : 1,
      tenantId: parseInt(data.tenantId),
      tenantName: tenant ? `${tenant.firstName} ${tenant.lastName}` : `Tenant #${data.tenantId}`,
      unitId: parseInt(data.unitId),
      unitNumber: unit ? unit.unitNumber : `Apt #${data.unitId}`,
      propertyId: unit ? unit.propertyId : 1,
      propertyName: unit ? unit.propertyName : 'Main Property',
      startDate: data.startDate,
      endDate: data.endDate,
      rentAmount: parseFloat(data.rentAmount),
      securityDeposit: parseFloat(data.securityDeposit || 0),
      status: 'Active',
      documentUrl: '#'
    };
    list.push(newLease);
    setStore('mock_leases', list);

    // Update Tenant lease info
    if (tenant) {
      let tenantsList = getStore('mock_tenants');
      tenantsList = tenantsList.map(t => t.id === tenant.id ? { 
        ...t, 
        unitId: newLease.unitId,
        unitNumber: newLease.unitNumber,
        propertyName: newLease.propertyName,
        propertyId: newLease.propertyId,
        leaseStart: newLease.startDate,
        leaseEnd: newLease.endDate,
        rent: newLease.rentAmount,
        deposit: newLease.securityDeposit
      } : t);
      setStore('mock_tenants', tenantsList);
    }
    
    // Update Apartment Tenant and Status
    if (unit) {
      let units = getStore('mock_apartments');
      units = units.map(u => u.id === unit.id ? { 
        ...u, 
        status: 'Occupied', 
        tenant: tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Tenant occupant' 
      } : u);
      setStore('mock_apartments', units);
    }

    return newLease;
  }),
  delete: (id) => withDelay(() => {
    let list = getStore('mock_leases');
    list = list.filter(l => l.id !== parseInt(id));
    setStore('mock_leases', list);
    return { success: true };
  })
};

export const mockMaintenanceService = {
  getAll: (filters = {}) => withDelay(() => {
    let list = getStore('mock_maintenance_tickets');
    if (filters.status && filters.status !== 'All') {
      list = list.filter(t => t.status.toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.priority && filters.priority !== 'All') {
      list = list.filter(t => t.priority.toLowerCase() === filters.priority.toLowerCase());
    }
    return list.map(t => ({
      ...t,
      dbId: t.dbId || t.id,
      name: t.name || t.title || 'General Maintenance Task',
      building: t.building || t.propertyName || 'Sunset Towers',
      vendor: t.vendor || t.assignedTo || 'Mike Johnson',
      dueDate: t.dueDate || (t.createdAt ? t.createdAt.split('T')[0] : '2026-06-30'),
      frequency: t.frequency || 'One-time',
      type: t.type || t.category || 'Other',
      status: t.status || 'Upcoming',
      notes: typeof t.notes === 'string' ? t.notes : (Array.isArray(t.notes) ? t.notes.map(n => n.text).join(', ') : '')
    }));
  }),
  create: (data) => withDelay(() => {
    const list = getStore('mock_maintenance_tickets');
    const id = list.length ? Math.max(...list.map(t => t.id)) + 1 : 301;
    const newTkt = {
      id,
      dbId: id,
      ticketNumber: `TKT-${1000 + list.length + 1}`,
      tenantName: data.tenantName || 'Admin User',
      propertyName: data.building || data.propertyName || 'Parkview Heights',
      unitNumber: data.unitNumber || 'Common Area',
      title: data.name || data.title || 'General Maintenance Task',
      description: data.description || data.notes || '',
      category: data.type || data.category || 'General',
      priority: data.priority || 'Medium',
      status: data.status || 'Upcoming',
      assignedTo: data.vendor || data.assignedTo || 'Unassigned',
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      name: data.name,
      building: data.building || data.propertyName || 'Parkview Heights',
      vendor: data.vendor,
      dueDate: data.dueDate,
      frequency: data.frequency,
      type: data.type
    };
    list.push(newTkt);
    setStore('mock_maintenance_tickets', list);
    return newTkt;
  }),
  update: (id, data) => withDelay(() => {
    let list = getStore('mock_maintenance_tickets');
    let updated = null;
    list = list.map(t => {
      if (t.id === parseInt(id)) {
        updated = {
          ...t,
          ...data,
          title: data.name || t.title,
          assignedTo: data.vendor || t.assignedTo,
          propertyName: data.building || t.propertyName
        };
        return updated;
      }
      return t;
    });
    setStore('mock_maintenance_tickets', list);
    return updated;
  }),
  addNote: (id, text, author) => withDelay(() => {
    let list = getStore('mock_maintenance_tickets');
    let updated = null;
    list = list.map(t => {
      if (t.id === parseInt(id)) {
        const notes = Array.isArray(t.notes) ? t.notes : [];
        const newNote = {
          id: notes.length ? Math.max(...notes.map(n => n.id)) + 1 : 1,
          author: author || 'Admin User',
          text: text,
          createdAt: new Date().toISOString()
        };
        updated = { ...t, notes: [...notes, newNote] };
        return updated;
      }
      return t;
    });
    setStore('mock_maintenance_tickets', list);
    return updated;
  }),
  delete: (id) => withDelay(() => {
    let list = getStore('mock_maintenance_tickets');
    list = list.filter(t => t.id !== parseInt(id));
    setStore('mock_maintenance_tickets', list);
    return { success: true };
  })
};

export const mockEmployeeService = {
  getAll: () => withDelay(() => getStore('mock_employees')),
  create: (data) => withDelay(() => {
    const list = getStore('mock_employees');
    const newEmp = {
      id: list.length ? Math.max(...list.map(e => e.id)) + 1 : 4,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || '',
      role: 'COWORKER',
      status: 'Invited',
      title: data.title || 'Staff member',
      createdAt: new Date().toISOString(),
      permissions: [
        { moduleName: 'Dashboard', canView: true, canAdd: false, canEdit: false, canDelete: false },
        { moduleName: 'Properties', canView: true, canAdd: false, canEdit: false, canDelete: false },
        { moduleName: 'Tenants', canView: true, canAdd: false, canEdit: false, canDelete: false },
        { moduleName: 'Leases', canView: true, canAdd: false, canEdit: false, canDelete: false },
        { moduleName: 'Maintenance', canView: true, canAdd: true, canEdit: true, canDelete: false },
        { moduleName: 'Accounting', canView: false, canAdd: false, canEdit: false, canDelete: false },
        { moduleName: 'Settings', canView: false, canAdd: false, canEdit: false, canDelete: false }
      ]
    };
    list.push(newEmp);
    setStore('mock_employees', list);
    return newEmp;
  }),
  updatePermissions: (id, permissions) => withDelay(() => {
    let list = getStore('mock_employees');
    let updated = null;
    list = list.map(e => {
      if (e.id === parseInt(id)) {
        updated = { ...e, permissions };
        return updated;
      }
      return e;
    });
    setStore('mock_employees', list);
    return updated;
  }),
  getClockLogs: () => withDelay(() => getStore('mock_clock_logs')),
  clockIn: (userId, userName) => withDelay(() => {
    const logs = getStore('mock_clock_logs');
    const active = logs.find(l => l.userId === userId && l.clockOut === null);
    if (active) return active; // already clocked in

    const newLog = {
      id: logs.length ? Math.max(...logs.map(l => l.id)) + 1 : 1,
      userId: userId,
      userName: userName,
      clockIn: new Date().toISOString(),
      clockOut: null,
      hoursWorked: 0.0
    };
    logs.push(newLog);
    setStore('mock_clock_logs', logs);
    return newLog;
  }),
  clockOut: (userId) => withDelay(() => {
    let logs = getStore('mock_clock_logs');
    let updated = null;
    logs = logs.map(l => {
      if (l.userId === userId && l.clockOut === null) {
        const inDate = new Date(l.clockIn);
        const outDate = new Date();
        const diffMs = outDate - inDate;
        const diffHrs = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
        updated = { ...l, clockOut: outDate.toISOString(), hoursWorked: diffHrs };
        return updated;
      }
      return l;
    });
    setStore('mock_clock_logs', logs);
    return updated;
  })
};

export const mockVehicleService = {
  getAll: (filters = {}) => withDelay(() => {
    const list = getStore('mock_apartments'); // vehicles are saved in units or setting up simple mock_vehicles if needed
    // Simple vehicles helper
    let vehicles = getStore('mock_vehicles');
    if (vehicles.length === 0) {
      vehicles = [
        { id: 1, make: 'Honda', model: 'Civic', color: 'Black', licensePlate: 'ABC 123', stallNumber: 'P-12', tenantName: 'Sarah Connor', propertyName: 'Parkview Heights' },
        { id: 2, make: 'Tesla', model: 'Model 3', color: 'White', licensePlate: 'TES-990', stallNumber: 'P-03', tenantName: 'Alice Cooper', propertyName: 'Sunset Towers' }
      ];
      setStore('mock_vehicles', vehicles);
    }
    return { data: vehicles, pagination: { total: vehicles.length, totalPages: 1, limit: 10 } };
  }),
  create: (data) => withDelay(() => {
    const list = getStore('mock_vehicles') || [];
    const newVeh = {
      id: list.length ? Math.max(...list.map(v => v.id)) + 1 : 1,
      ...data
    };
    list.push(newVeh);
    setStore('mock_vehicles', list);
    return newVeh;
  }),
  delete: (id) => withDelay(() => {
    let list = getStore('mock_vehicles');
    list = list.filter(v => v.id !== parseInt(id));
    setStore('mock_vehicles', list);
    return { success: true };
  })
};

export const mockDocumentService = {
  getAll: () => withDelay(() => getStore('mock_documents')),
  create: (name, type, size, propertyId) => withDelay(() => {
    const list = getStore('mock_documents');
    const newDoc = {
      id: list.length ? Math.max(...list.map(d => d.id)) + 1 : 1,
      name,
      type: type || 'OTHER',
      size: size || '1.0 MB',
      propertyId: propertyId ? parseInt(propertyId) : 1,
      createdAt: new Date().toISOString()
    };
    list.push(newDoc);
    setStore('mock_documents', list);
    return newDoc;
  }),
  delete: (id) => withDelay(() => {
    let list = getStore('mock_documents');
    list = list.filter(d => d.id !== parseInt(id));
    setStore('mock_documents', list);
    return { success: true };
  })
};

export const mockInvoiceService = {
  getAll: () => withDelay(() => getStore('mock_invoices')),
  create: (data) => withDelay(() => {
    const list = getStore('mock_invoices');
    const tenants = getStore('mock_tenants');
    const tenant = tenants.find(t => t.id === parseInt(data.tenantId));
    
    const newInvoice = {
      id: list.length ? Math.max(...list.map(i => i.id)) + 1 : 1,
      invoiceNumber: `INV-2026-${(list.length + 1).toString().padStart(3, '0')}`,
      tenantId: parseInt(data.tenantId),
      tenantName: tenant ? `${tenant.firstName} ${tenant.lastName}` : `Tenant #${data.tenantId}`,
      unitNumber: tenant ? tenant.unitNumber : 'Apt 101',
      propertyName: tenant ? tenant.propertyName : 'Parkview Heights',
      amount: parseFloat(data.amount),
      dueDate: data.dueDate,
      status: data.status || 'Unpaid',
      category: data.category || 'Rent',
      createdAt: new Date().toISOString(),
      payments: []
    };
    list.push(newInvoice);
    setStore('mock_invoices', list);
    return newInvoice;
  }),
  pay: (id, amount, method, transId) => withDelay(() => {
    let list = getStore('mock_invoices');
    let updated = null;
    list = list.map(inv => {
      if (inv.id === parseInt(id)) {
        const payments = inv.payments || [];
        const newPayment = {
          id: payments.length ? Math.max(...payments.map(p => p.id)) + 1 : 10,
          amount: parseFloat(amount),
          paymentMethod: method || 'Credit Card',
          transactionId: transId || `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
          paymentDate: new Date().toISOString()
        };
        
        updated = {
          ...inv,
          status: 'Paid',
          payments: [...payments, newPayment]
        };
        
        // Also log to received payments list
        const recList = getStore('mock_payments_received');
        recList.push({
          id: newPayment.id,
          invoiceId: inv.id,
          invoiceNumber: inv.invoiceNumber,
          tenantName: inv.tenantName,
          unitNumber: inv.unitNumber,
          propertyName: inv.propertyName,
          amount: newPayment.amount,
          paymentMethod: newPayment.paymentMethod,
          transactionId: newPayment.transactionId,
          paymentDate: newPayment.paymentDate
        });
        setStore('mock_payments_received', recList);
        
        return updated;
      }
      return inv;
    });
    setStore('mock_invoices', list);
    return updated;
  })
};

export const mockWorkflowService = {
  getMoveIns: () => withDelay(() => getStore('mock_move_ins')),
  updateMoveInRequirement: (moveInId, reqId, status) => withDelay(() => {
    let list = getStore('mock_move_ins');
    list = list.map(m => {
      if (m.id === parseInt(moveInId)) {
        const requirements = m.requirements.map(r => r.id === parseInt(reqId) ? { ...r, status } : r);
        const allCompleted = requirements.every(r => r.status === 'Completed');
        return {
          ...m,
          requirements,
          status: allCompleted ? 'Ready' : 'Awaiting Documents'
        };
      }
      return m;
    });
    setStore('mock_move_ins', list);
    return { success: true };
  }),
  approveMoveIn: (id) => withDelay(() => {
    let list = getStore('mock_move_ins');
    list = list.map(m => m.id === parseInt(id) ? { ...m, status: 'Approved' } : m);
    setStore('mock_move_ins', list);
    return { success: true };
  }),
  cancelMoveIn: (id) => withDelay(() => {
    let list = getStore('mock_move_ins');
    list = list.map(m => m.id === parseInt(id) ? { ...m, status: 'Cancelled' } : m);
    setStore('mock_move_ins', list);
    return { success: true };
  }),
  overrideMoveIn: (id) => withDelay(() => {
    let list = getStore('mock_move_ins');
    list = list.map(m => m.id === parseInt(id) ? { ...m, status: 'Approved' } : m);
    setStore('mock_move_ins', list);
    return { success: true };
  }),

  getMoveOuts: () => withDelay(() => getStore('mock_move_outs')),
  cancelMoveOut: (leaseId) => withDelay(() => {
    let list = getStore('mock_move_outs');
    list = list.filter(m => m.leaseId !== parseInt(leaseId));
    setStore('mock_move_outs', list);
    return { success: true };
  }),
  confirmMoveOut: (id) => withDelay(() => {
    let list = getStore('mock_move_outs');
    list = list.map(m => m.id === parseInt(id) ? { ...m, status: 'Confirmed' } : m);
    setStore('mock_move_outs', list);
    return { success: true };
  }),
  completeMoveOut: (id) => withDelay(() => {
    let list = getStore('mock_move_outs');
    list = list.map(m => m.id === parseInt(id) ? { ...m, status: 'Completed' } : m);
    setStore('mock_move_outs', list);
    return { success: true };
  }),
  scheduleFinalMoveOut: (id, date) => withDelay(() => {
    let list = getStore('mock_move_outs');
    list = list.map(m => m.id === parseInt(id) ? { ...m, status: 'Scheduled Final', finalInspectionDate: date } : m);
    setStore('mock_move_outs', list);
    return { success: true };
  }),

  getPrepUnits: () => withDelay(() => getStore('mock_prep_units')),
  updatePrepStage: (unitId, nextStage) => withDelay(() => {
    let list = getStore('mock_prep_units');
    let updated = null;
    list = list.map(u => {
      if (u.unitId === parseInt(unitId)) {
        updated = { ...u, current_stage: nextStage };
        return updated;
      }
      return u;
    });
    setStore('mock_prep_units', list);
    return { success: true, data: updated };
  }),

  getInspections: (page = 1, limit = 10) => withDelay(() => {
    const list = getStore('mock_inspections');
    const start = (page - 1) * limit;
    return {
      data: list.slice(start, start + limit),
      pagination: { total: list.length, totalPages: Math.ceil(list.length / limit), page, limit }
    };
  }),
  getInspectionById: (id) => withDelay(() => {
    const list = getStore('mock_inspections');
    const insp = list.find(i => i.id === parseInt(id));
    if (!insp) throw new Error('Inspection not found');
    return insp;
  }),
  createInspection: (data) => withDelay(() => {
    const list = getStore('mock_inspections');
    const templates = getStore('mock_inspection_templates');
    const template = templates.find(t => t.id === parseInt(data.templateId));
    const apartments = getStore('mock_apartments');
    const unit = apartments.find(u => u.id === parseInt(data.unitId));
    const employees = getStore('mock_employees');
    const coworker = employees.find(e => e.id === parseInt(data.inspectorId));

    const newInsp = {
      id: list.length ? Math.max(...list.map(i => i.id)) + 1 : 1,
      title: data.title || 'New Inspection',
      inspectorName: coworker ? `${coworker.firstName} ${coworker.lastName}` : 'Staff Inspector',
      inspectorId: parseInt(data.inspectorId),
      unitId: parseInt(data.unitId),
      unitNumber: unit ? unit.unitNumber : 'Apt 101',
      propertyName: unit ? unit.propertyName : 'Parkview Heights',
      status: 'Scheduled',
      scheduledDate: data.scheduledDate,
      completedDate: null,
      templateId: parseInt(data.templateId),
      templateName: template ? template.name : 'Standard Checklist',
      tickets: [],
      structure: template ? template.structure : { rooms: [] }
    };
    list.push(newInsp);
    setStore('mock_inspections', list);
    return newInsp;
  }),
  updateInspectionStatus: (id, status) => withDelay(() => {
    let list = getStore('mock_inspections');
    list = list.map(i => i.id === parseInt(id) ? { ...i, status } : i);
    setStore('mock_inspections', list);
    return { success: true };
  }),
  deleteInspection: (id) => withDelay(() => {
    let list = getStore('mock_inspections');
    list = list.filter(i => i.id !== parseInt(id));
    setStore('mock_inspections', list);
    return { success: true };
  }),
  addInspectionTicket: (id, ticketData) => withDelay(() => {
    let list = getStore('mock_inspections');
    let newTicket = null;
    list = list.map(i => {
      if (i.id === parseInt(id)) {
        const tickets = i.tickets || [];
        newTicket = {
          id: tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
          ...ticketData,
          status: 'Open',
          createdAt: new Date().toISOString()
        };
        // Also add to global maintenance list
        const mList = getStore('mock_maintenance_tickets');
        mList.push({
          id: 500 + newTicket.id,
          ticketNumber: `TKT-${2000 + newTicket.id}`,
          tenantName: 'Inspection Auto-Generated',
          propertyName: i.propertyName,
          unitNumber: i.unitNumber,
          title: newTicket.title,
          description: newTicket.description,
          category: 'Inspection Issue',
          priority: 'High',
          status: 'Open',
          assignedTo: 'Mike Johnson',
          notes: [],
          createdAt: new Date().toISOString()
        });
        setStore('mock_maintenance_tickets', mList);

        return { ...i, tickets: [...tickets, newTicket] };
      }
      return i;
    });
    setStore('mock_inspections', list);
    return newTicket;
  }),
  deleteInspectionTicket: (id, ticketId) => withDelay(() => {
    let list = getStore('mock_inspections');
    list = list.map(i => {
      if (i.id === parseInt(id)) {
        return { ...i, tickets: (i.tickets || []).filter(t => t.id !== parseInt(ticketId)) };
      }
      return i;
    });
    setStore('mock_inspections', list);
    return { success: true };
  }),

  getTemplates: (page = 1, limit = 10) => withDelay(() => {
    const list = getStore('mock_inspection_templates');
    const start = (page - 1) * limit;
    return {
      data: list.slice(start, start + limit),
      pagination: { total: list.length, totalPages: Math.ceil(list.length / limit), page, limit }
    };
  }),
  createTemplate: (data) => withDelay(() => {
    const list = getStore('mock_inspection_templates');
    const newTemp = {
      id: list.length ? Math.max(...list.map(t => t.id)) + 1 : 1,
      name: data.name,
      structure: data.structure || { rooms: [] }
    };
    list.push(newTemp);
    setStore('mock_inspection_templates', list);
    return newTemp;
  }),
  updateTemplate: (id, data) => withDelay(() => {
    let list = getStore('mock_inspection_templates');
    let updated = null;
    list = list.map(t => {
      if (t.id === parseInt(id)) {
        updated = { ...t, name: data.name, structure: data.structure };
        return updated;
      }
      return t;
    });
    setStore('mock_inspection_templates', list);
    return updated;
  }),
  deleteTemplate: (id) => withDelay(() => {
    let list = getStore('mock_inspection_templates');
    list = list.filter(t => t.id !== parseInt(id));
    setStore('mock_inspection_templates', list);
    return { success: true };
  }),
  duplicateTemplate: (id) => withDelay(() => {
    const list = getStore('mock_inspection_templates');
    const temp = list.find(t => t.id === parseInt(id));
    if (!temp) throw new Error('Template not found');
    const newTemp = {
      id: list.length ? Math.max(...list.map(t => t.id)) + 1 : 1,
      name: `${temp.name} (Copy)`,
      structure: JSON.parse(JSON.stringify(temp.structure))
    };
    list.push(newTemp);
    setStore('mock_inspection_templates', list);
    return newTemp;
  }),

  getResponseSeries: () => withDelay(() => getStore('mock_response_groups')),
  createResponseSeries: (data) => withDelay(() => {
    const list = getStore('mock_response_groups');
    const newSer = {
      id: list.length ? Math.max(...list.map(r => r.id)) + 1 : 1,
      name: data.name,
      responses: Array.isArray(data.responses) ? data.responses : (data.responses || '').split(',').map(s => s.trim())
    };
    list.push(newSer);
    setStore('mock_response_groups', list);
    return newSer;
  }),
  updateResponseSeries: (id, data) => withDelay(() => {
    let list = getStore('mock_response_groups');
    let updated = null;
    list = list.map(r => {
      if (r.id === parseInt(id)) {
        updated = {
          ...r,
          name: data.name,
          responses: Array.isArray(data.responses) ? data.responses : (data.responses || '').split(',').map(s => s.trim())
        };
        return updated;
      }
      return r;
    });
    setStore('mock_response_groups', list);
    return updated;
  }),
  deleteResponseSeries: (id) => withDelay(() => {
    let list = getStore('mock_response_groups');
    list = list.filter(r => r.id !== parseInt(id));
    setStore('mock_response_groups', list);
    return { success: true };
  })
};

export const mockOwnerService = {
  getAll: () => withDelay(() => {
    const list = getStore('mock_users').filter(u => u.role === 'OWNER');
    return list.map(u => ({
      properties: [],
      companyName: '',
      totalUnits: 0,
      ...u
    }));
  }),
  getDashboardStats: (ownerId) => withDelay(() => {
    // Return owner dashboard metrics
    return {
      totalProperties: ownerId ? 1 : 3,
      totalUnits: ownerId ? 16 : 118,
      occupancyRate: '93%',
      activeLeases: ownerId ? 14 : 110,
      collectedRent: 48500,
      outstandingRent: 1200,
      maintenanceTickets: 4,
      properties: [
        { id: 1, name: 'Parkview Heights', units: 42, occupancy: '95%', rentCollected: 48500, outstanding: 0 },
        { id: 2, name: 'Sunset Towers', units: 60, occupancy: '90%', rentCollected: 0, outstanding: 1200 }
      ]
    };
  })
};

export const mockSettingsService = {
  getTaxSettings: () => withDelay(() => getStore('mock_tax_settings')),
  saveTaxSettings: (data) => withDelay(() => {
    setStore('mock_tax_settings', data);
    return data;
  }),
  createTax: (data) => withDelay(() => {
    const list = getStore('mock_tax_settings');
    const newTax = {
      id: list.length ? Math.max(...list.map(t => t.id)) + 1 : 1,
      name: data.name,
      rate: parseFloat(data.rate) || 0,
      status: data.status || 'Active'
    };
    list.push(newTax);
    setStore('mock_tax_settings', list);
    return newTax;
  }),
  updateTax: (id, data) => withDelay(() => {
    let list = getStore('mock_tax_settings');
    let updated = null;
    list = list.map(item => {
      if (item.id === parseInt(id)) {
        updated = {
          ...item,
          ...data,
          rate: data.rate !== undefined ? parseFloat(data.rate) : item.rate
        };
        return updated;
      }
      return item;
    });
    setStore('mock_tax_settings', list);
    return updated;
  }),
  deleteTax: (id) => withDelay(() => {
    let list = getStore('mock_tax_settings');
    list = list.filter(item => item.id !== parseInt(id));
    setStore('mock_tax_settings', list);
    return { success: true };
  }),
  getQuickBooks: () => withDelay(() => JSON.parse(localStorage.getItem('mock_quickbooks_settings'))),
  disconnectQuickBooks: () => withDelay(() => {
    const qb = { connected: false, connectedEmail: '', lastSyncTime: null, companyName: '' };
    localStorage.setItem('mock_quickbooks_settings', JSON.stringify(qb));
    return qb;
  }),
  getChartOfAccounts: () => withDelay(() => getStore('mock_chart_of_accounts')),
  createChartOfAccount: (data) => withDelay(() => {
    const list = getStore('mock_chart_of_accounts');
    const newAcc = {
      id: list.length ? Math.max(...list.map(c => c.id)) + 1 : 1,
      code: data.code,
      name: data.name,
      type: data.type,
      balance: parseFloat(data.balance || 0)
    };
    list.push(newAcc);
    setStore('mock_chart_of_accounts', list);
    return newAcc;
  }),
  updateChartOfAccount: (id, data) => withDelay(() => {
    let list = getStore('mock_chart_of_accounts');
    let updated = null;
    list = list.map(item => {
      if (item.id === parseInt(id)) {
        updated = {
          ...item,
          ...data
        };
        return updated;
      }
      return item;
    });
    setStore('mock_chart_of_accounts', list);
    return updated;
  }),
  deleteChartOfAccount: (id) => withDelay(() => {
    let list = getStore('mock_chart_of_accounts');
    list = list.filter(item => item.id !== parseInt(id));
    setStore('mock_chart_of_accounts', list);
    return { success: true };
  })
};

export const mockCalendarService = {
  getAll: () => withDelay(() => getStore('mock_calendar_events'))
};

export const mockReportsService = {
  getAll: () => withDelay(() => getStore('mock_reports_analytics')),
  getRentRoll: () => withDelay(() => getStore('mock_rent_roll'))
};

export const mockCommunicationService = {
  getConversations: () => withDelay(() => [
    { id: 4, name: 'Sarah Smith', role: 'COWORKER', unreadCount: 1, lastMessage: 'Let me check the lease details.' },
    { id: 101, name: 'Sarah Connor', role: 'TENANT', unreadCount: 0, lastMessage: 'Thank you for repairing the AC!' },
    { id: 3, name: 'Owner User', role: 'OWNER', unreadCount: 0, lastMessage: 'Are the financial statements ready?' }
  ]),
  getHistory: (userId) => withDelay(() => {
    const currentLogs = getStore(`mock_chat_history_${userId}`);
    if (currentLogs.length > 0) return currentLogs;

    const defaultHistory = [
      { id: 1, senderId: parseInt(userId), content: 'Hello, I had a question regarding my unit.', createdAt: '2026-06-28T09:00:00Z' },
      { id: 2, senderId: 1, content: 'Sure, how can we help you today?', createdAt: '2026-06-28T09:05:00Z' }
    ];
    setStore(`mock_chat_history_${userId}`, defaultHistory);
    return defaultHistory;
  }),
  sendMessage: (receiverId, content) => withDelay(() => {
    const history = getStore(`mock_chat_history_${receiverId}`);
    const newMsg = {
      id: history.length ? Math.max(...history.map(m => m.id)) + 1 : 1,
      senderId: 1, // Logged in Admin
      content,
      createdAt: new Date().toISOString()
    };
    history.push(newMsg);
    setStore(`mock_chat_history_${receiverId}`, history);
    return newMsg;
  }),
  markAsRead: (senderId) => withDelay(() => {
    return { success: true };
  })
};

export const mockReadinessService = {
  getBuildings: () => withDelay(() => {
    return getStore('mock_properties').map(p => ({ id: p.id, name: p.name }));
  }),
  getStats: (propertyId, showLeased) => withDelay(() => {
    const units = getStore('mock_readiness_units');
    let filtered = units;
    if (propertyId) {
      // Compare by name or parsed ID
      const p = getStore('mock_properties').find(prop => prop.id === parseInt(propertyId));
      if (p) {
        filtered = units.filter(u => u.building === p.name);
      }
    }
    const totalUnits = filtered.length;
    const readyForLeasing = filtered.filter(u => {
      const allDone = Object.values(u.completion || {}).filter(v => v).length === 7;
      return allDone && (showLeased ? true : !u.reserved);
    }).length;
    const reservedUnits = filtered.filter(u => u.reserved).length;
    const overdueUnits = filtered.filter(u => u.daysLate > 0).length;

    return {
      totalUnits,
      readyForLeasing,
      reservedUnits,
      overdueUnits
    };
  }),
  getDashboard: (params) => withDelay(() => {
    const units = getStore('mock_readiness_units');
    let filtered = units;

    if (params.propertyId) {
      const p = getStore('mock_properties').find(prop => prop.id === parseInt(params.propertyId));
      if (p) {
        filtered = filtered.filter(u => u.building === p.name);
      }
    }

    if (params.search) {
      const s = params.search.toLowerCase();
      filtered = filtered.filter(u => u.unitNumber.toLowerCase().includes(s) || u.building.toLowerCase().includes(s));
    }

    if (params.status) {
      if (params.status === 'Reserved') {
        filtered = filtered.filter(u => u.reserved);
      } else if (params.status === 'Available') {
        filtered = filtered.filter(u => !u.reserved);
      }
    }

    const page = parseInt(params.page) || 1;
    const limit = parseInt(params.limit) || 15;
    const start = (page - 1) * limit;
    const end = page * limit;
    const paginated = filtered.slice(start, end);

    return {
      units: paginated,
      total: filtered.length
    };
  }),
  getSettings: () => withDelay(() => {
    return JSON.parse(localStorage.getItem('mock_readiness_settings')) || mockReadinessSettings;
  }),
  updateSettings: (newSettings) => withDelay(() => {
    localStorage.setItem('mock_readiness_settings', JSON.stringify(newSettings));
    return newSettings;
  }),
  getHolidays: () => withDelay(() => {
    return getStore('mock_readiness_holidays');
  }),
  addHoliday: (holiday) => withDelay(() => {
    const holidays = getStore('mock_readiness_holidays');
    const newHoliday = {
      id: holidays.length ? Math.max(...holidays.map(h => h.id)) + 1 : 1,
      ...holiday
    };
    holidays.push(newHoliday);
    setStore('mock_readiness_holidays', holidays);
    return newHoliday;
  }),
  deleteHoliday: (id) => withDelay(() => {
    let holidays = getStore('mock_readiness_holidays');
    holidays = holidays.filter(h => h.id !== parseInt(id));
    setStore('mock_readiness_holidays', holidays);
    return { success: true };
  }),
  updateStep: (unitId, stepKey, status, isGcDelivered) => withDelay(() => {
    let units = getStore('mock_readiness_units');
    let updatedUnit = null;
    units = units.map(u => {
      if (u.id === parseInt(unitId)) {
        const completion = { ...u.completion };
        completion[stepKey] = status;
        completion[stepKey + '_at'] = status ? new Date().toISOString() : null;
        
        const allDone = Object.values(completion).filter(v => v).length === 7;
        let stage = u.stage;
        if (allDone) {
          stage = u.reserved ? "Reserved – Ready" : "Unit Ready";
        } else if (completion.gc_delivered && !completion.gc_cleaned) {
          stage = "GC Cleaning In Progress";
        } else if (completion.gc_cleaned && !completion.ffe_installed) {
          stage = "Ops FF&E Pending";
        } else {
          stage = "On Schedule";
        }

        updatedUnit = { ...u, completion, stage };
        return updatedUnit;
      }
      return u;
    });
    setStore('mock_readiness_units', units);
    return updatedUnit;
  })
};

export const mockInsuranceService = {
  getCompliance: () => withDelay(() => {
    return getStore('mock_insurance_compliance');
  }),
  getStats: () => withDelay(() => {
    const list = getStore('mock_insurance_compliance');
    return {
      missing: list.filter(i => i.status === 'MISSING').length,
      expired: list.filter(i => i.status === 'EXPIRED').length,
      expiringSoon: list.filter(i => i.status === 'EXPIRING_SOON' || i.status === 'EXPIRING').length,
      active: list.filter(i => i.status === 'ACTIVE').length
    };
  }),
  create: (data) => withDelay(() => {
    const list = getStore('mock_insurance_compliance');
    const tenant = getStore('mock_tenants').find(t => t.id === parseInt(data.userId));
    const newRecord = {
      id: list.length ? Math.max(...list.map(i => i.id)) + 1 : 1,
      tenantId: parseInt(data.userId),
      tenantName: tenant ? tenant.name : 'Unknown Tenant',
      unitId: parseInt(data.unitId),
      leaseId: parseInt(data.leaseId),
      building: data.building || 'Parkview Heights',
      provider: data.provider,
      policyNumber: data.policyNumber,
      startDate: data.startDate,
      endDate: data.endDate,
      status: new Date(data.endDate) < new Date() ? 'EXPIRED' : 'ACTIVE',
      notes: data.notes || '',
      documentUrl: data.documentUrl || '',
      uploadedDocumentId: data.uploadedDocumentId || ''
    };
    list.push(newRecord);
    setStore('mock_insurance_compliance', list);
    return newRecord;
  }),
  update: (id, data) => withDelay(() => {
    let list = getStore('mock_insurance_compliance');
    let updated = null;
    list = list.map(item => {
      if (item.id === parseInt(id)) {
        updated = {
          ...item,
          provider: data.provider || item.provider,
          policyNumber: data.policyNumber || item.policyNumber,
          startDate: data.startDate || item.startDate,
          endDate: data.endDate || item.endDate,
          status: new Date(data.endDate) < new Date() ? 'EXPIRED' : 'ACTIVE',
          notes: data.notes !== undefined ? data.notes : item.notes
        };
        return updated;
      }
      return item;
    });
    setStore('mock_insurance_compliance', list);
    return updated;
  })
};

export const mockGeneralSettingsService = {
  getSettings: () => withDelay(() => {
    return getStore('mock_general_settings');
  }),
  saveSettings: (newSettings) => withDelay(() => {
    const current = getStore('mock_general_settings');
    current.settings = { ...current.settings, ...newSettings };
    setStore('mock_general_settings', current);
    return current;
  }),
  getServiceItems: () => withDelay(() => {
    return getStore('mock_service_items');
  }),
  addServiceItem: (item) => withDelay(() => {
    const list = getStore('mock_service_items');
    const newItem = {
      id: list.length ? Math.max(...list.map(i => i.id)) + 1 : 1,
      name: item.name,
      amount: parseFloat(item.amount) || 0
    };
    list.push(newItem);
    setStore('mock_service_items', list);
    return newItem;
  }),
  deleteServiceItem: (id) => withDelay(() => {
    let list = getStore('mock_service_items');
    list = list.filter(i => i.id !== parseInt(id));
    setStore('mock_service_items', list);
    return { success: true };
  }),
  getPayments: () => withDelay(() => {
    return getStore('mock_payments_received');
  }),
  createPayment: (payment) => withDelay(() => {
    const list = getStore('mock_payments_received');
    const newPayment = {
      id: list.length ? Math.max(...list.map(p => p.id)) + 1 : 201,
      tenant: payment.tenantName || 'Unknown Tenant',
      unit: payment.unitNumber || 'Apt -',
      date: new Date().toLocaleDateString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' }), // e.g. "27 Mar 2026"
      amount: parseFloat(payment.amount) || 0,
      paymentMethod: payment.paymentMethod || 'Cash',
      type: payment.type || 'Rent',
      status: 'Paid'
    };
    list.push(newPayment);
    setStore('mock_payments_received', list);
    return newPayment;
  })
};

export const mockLedgerService = {
  getTransactions: () => withDelay(() => {
    return getStore('mock_ledger');
  })
};

export const mockTicketsService = {
  getAll: () => withDelay(() => {
    const list = getStore('mock_maintenance_tickets');
    return list.map(t => ({
      ...t,
      dbId: t.id,
      id: `TKT-${t.id}`,
      subject: t.title || t.name || 'Maintenance Request',
      tenant: t.tenantName || 'Alice Cooper',
      unit: t.unitNumber || 'Apt 101',
      desc: t.description || t.notes || '',
      status: t.status || 'Open',
      priority: t.priority || 'Medium',
      attachments: t.attachments || []
    }));
  }),
  create: (data) => withDelay(() => {
    const list = getStore('mock_maintenance_tickets');
    const id = list.length ? Math.max(...list.map(t => t.id)) + 1 : 301;
    const newTkt = {
      id,
      dbId: id,
      ticketNumber: `TKT-${id}`,
      tenantName: data.tenant || data.tenantName || 'Alice Cooper',
      propertyName: data.building || data.propertyName || 'Sunset Towers',
      unitNumber: data.unit || data.unitNumber || 'Apt 101',
      title: data.subject || data.name || 'Maintenance Request',
      description: data.desc || data.description || '',
      category: data.category || 'General',
      priority: data.priority || 'Medium',
      status: data.status || 'Open',
      assignedTo: data.vendor || 'Mike Johnson',
      notes: [],
      createdAt: new Date().toISOString(),
      attachments: data.attachments || []
    };
    list.push(newTkt);
    setStore('mock_maintenance_tickets', list);
    return newTkt;
  }),
  update: (id, data) => withDelay(() => {
    let list = getStore('mock_maintenance_tickets');
    let updated = null;
    list = list.map(t => {
      if (t.id === parseInt(id)) {
        updated = {
          ...t,
          ...data,
          tenantName: data.tenant || t.tenantName,
          propertyName: data.building || t.propertyName,
          unitNumber: data.unit || t.unitNumber,
          title: data.subject || t.title,
          description: data.desc || t.description
        };
        return updated;
      }
      return t;
    });
    setStore('mock_maintenance_tickets', list);
    return updated;
  }),
  updateStatus: (id, status) => withDelay(() => {
    let list = getStore('mock_maintenance_tickets');
    let updated = null;
    list = list.map(t => {
      if (t.id === parseInt(id)) {
        updated = {
          ...t,
          status
        };
        return updated;
      }
      return t;
    });
    setStore('mock_maintenance_tickets', list);
    return updated;
  }),
  delete: (id) => withDelay(() => {
    let list = getStore('mock_maintenance_tickets');
    list = list.filter(t => t.id !== parseInt(id));
    setStore('mock_maintenance_tickets', list);
    return { success: true };
  })
};

export const mockTenantDashboardService = {
  getProfile: (tenantId) => withDelay(() => {
    const list = getStore('mock_tenants');
    const tenant = list.find(t => t.id === parseInt(tenantId)) || list[0];
    return {
      name: `${tenant.firstName} ${tenant.lastName}`,
      buildingName: tenant.propertyName || 'Parkview Heights',
      unitNumber: tenant.unitNumber || 'Apt 101'
    };
  }),
  getDashboard: (tenantId) => withDelay(() => {
    const list = getStore('mock_tenants');
    const tenant = list.find(t => t.id === parseInt(tenantId)) || list[0];
    const tickets = getStore('mock_maintenance_tickets').filter(t => t.tenantName === `${tenant.firstName} ${tenant.lastName}`);
    return {
      tenantName: `${tenant.firstName} ${tenant.lastName}`,
      stats: {
        recentTickets: tickets.slice(0, 3).map(t => ({
          id: `TKT-${t.id}`,
          subject: t.title || t.name || 'Maintenance Request',
          status: t.status || 'Open',
          priority: t.priority || 'Medium',
          createdAt: t.createdAt
        })),
        unreadCount: 0,
        nextDueDate: tenant.leaseEnd,
        currentRent: tenant.rent || 0,
        rentDueStatus: 'Paid',
        leaseStatus: tenant.status || 'Active',
        leaseExpiry: tenant.leaseEnd,
        openTickets: tickets.filter(t => t.status !== 'Resolved').length
      }
    };
  }),
  getLease: (tenantId) => withDelay(() => {
    const list = getStore('mock_tenants');
    const tenant = list.find(t => t.id === parseInt(tenantId)) || list[0];
    return {
      id: `LSE-${tenant.id}`,
      status: 'Active',
      property: tenant.propertyName || 'Parkview Heights',
      unit: tenant.unitNumber || 'Apt 101',
      address: '123 Parkview Ave, Montreal, QC',
      startDate: tenant.leaseStart || '2025-01-01',
      endDate: tenant.leaseEnd || '2025-12-31',
      monthlyRent: tenant.rent || 0,
      deposit: tenant.deposit || 0,
      adminPhone: '+1 (514) 555-0100'
    };
  }),
  getVehicles: (tenantId) => withDelay(() => {
    return [
      { id: 1, make: 'Toyota', model: 'Corolla', year: '2022', plate: 'XYZ 123', color: 'Silver' }
    ];
  }),
  getTickets: (tenantId) => withDelay(() => {
    const list = getStore('mock_tenants');
    const tenant = list.find(t => t.id === parseInt(tenantId)) || list[0];
    const tickets = getStore('mock_maintenance_tickets').filter(t => t.tenantName === `${tenant.firstName} ${tenant.lastName}`);
    return tickets.map(t => ({
      ...t,
      dbId: t.id,
      id: `TKT-${t.id}`,
      subject: t.title || t.name || 'Maintenance Request',
      tenant: t.tenantName || 'Alice Cooper',
      unit: t.unitNumber || 'Apt 101',
      desc: t.description || t.notes || '',
      status: t.status || 'Open',
      priority: t.priority || 'Medium',
      attachments: t.attachments || []
    }));
  }),
  createTicket: (tenantId, data) => withDelay(() => {
    const list = getStore('mock_tenants');
    const tenant = list.find(t => t.id === parseInt(tenantId)) || list[0];
    const mList = getStore('mock_maintenance_tickets');
    const id = mList.length ? Math.max(...mList.map(t => t.id)) + 1 : 301;
    const newTkt = {
      id,
      dbId: id,
      ticketNumber: `TKT-${id}`,
      tenantName: `${tenant.firstName} ${tenant.lastName}`,
      propertyName: tenant.propertyName || 'Parkview Heights',
      unitNumber: tenant.unitNumber || 'Apt 101',
      title: data.get ? data.get('title') : (data.title || 'General Maintenance Request'),
      description: data.get ? data.get('description') : (data.description || ''),
      category: data.get ? data.get('category') : (data.category || 'General'),
      priority: data.get ? data.get('priority') : (data.priority || 'Medium'),
      status: 'Open',
      assignedTo: 'Unassigned',
      notes: [],
      createdAt: new Date().toISOString(),
      attachments: []
    };
    mList.push(newTkt);
    setStore('mock_maintenance_tickets', mList);
    return newTkt;
  }),
  getReports: (tenantId) => withDelay(() => {
    return [];
  }),
  getInvoices: (tenantId) => withDelay(() => {
    const list = getStore('mock_tenants');
    const tenant = list.find(t => t.id === parseInt(tenantId)) || list[0];
    const invoices = getStore('mock_invoices') || [];
    return invoices.filter(i => i.tenantId === tenant.id || i.tenantName === `${tenant.firstName} ${tenant.lastName}`).map(i => ({
      ...i,
      dbId: i.id
    }));
  }),
  payInvoice: (tenantId, data) => withDelay(() => {
    let invoices = getStore('mock_invoices') || [];
    invoices = invoices.map(i => {
      if (i.id === parseInt(data.invoiceId)) {
        return {
          ...i,
          status: 'Paid',
          paidAmount: i.amount,
          paymentMethod: data.method || 'Credit Card',
          paymentDate: new Date().toLocaleDateString('en-CA')
        };
      }
      return i;
    });
    setStore('mock_invoices', invoices);
    return { success: true };
  }),
  getInsurance: (tenantId) => withDelay(() => {
    const list = getStore('mock_insurance_compliance') || [];
    const item = list.find(i => i.tenantId === parseInt(tenantId));
    return item || null;
  }),
  saveInsurance: (tenantId, data) => withDelay(() => {
    const list = getStore('mock_insurance_compliance') || [];
    const id = list.length ? Math.max(...list.map(i => i.id)) + 1 : 1;
    const newRecord = {
      id,
      tenantId: parseInt(tenantId),
      provider: data.get ? data.get('provider') : data.provider,
      policyNumber: data.get ? data.get('policyNumber') : data.policyNumber,
      startDate: data.get ? data.get('startDate') : data.startDate,
      endDate: data.get ? data.get('endDate') : data.endDate,
      status: 'ACTIVE',
      notes: '',
      documentUrl: '',
      uploadedDocumentId: ''
    };
    list.push(newRecord);
    setStore('mock_insurance_compliance', list);
    return newRecord;
  }),
  getDocuments: (tenantId) => withDelay(() => {
    const list = getStore('mock_documents') || [];
    return list.filter(d => d.tenantId === parseInt(tenantId));
  }),
  saveDocument: (tenantId, data) => withDelay(() => {
    const list = getStore('mock_documents') || [];
    const id = list.length ? Math.max(...list.map(d => d.id)) + 1 : 1;
    const newDoc = {
      id,
      tenantId: parseInt(tenantId),
      name: data.get ? data.get('name') : data.name,
      fileSize: '1.2 MB',
      uploadedAt: new Date().toISOString(),
      url: '#'
    };
    list.push(newDoc);
    setStore('mock_documents', list);
    return newDoc;
  })
};

export const mockOwnerDashboardService = {
  getProfile: (ownerId) => withDelay(() => {
    return {
      name: 'Owner User',
      email: 'owner@property.com',
      role: 'OWNER'
    };
  }),
  getStats: (ownerId) => withDelay(() => {
    return {
      propertyCount: 2,
      unitCount: 20,
      occupancy: {
        vacantUnits: 2,
        vacantUnitsList: ['Sunset Towers - Apt 304', 'Sunset Towers - Apt 405'],
        vacantBedrooms: 3,
        vacantBedroomsList: ['Sunset Towers - Apt 202 Bed A', 'Sunset Towers - Apt 202 Bed B']
      },
      outstandingDues: 2500,
      insuranceExpiryCount: 1,
      recentActivity: [
        { id: 1, text: 'Rent paid by Alice Cooper for Sunset Towers Apt 201', time: '2 hours ago' },
        { id: 2, text: 'Maintenance task leaking kitchen faucet completed', time: '1 day ago' }
      ],
      tenants: [
        { id: 101, name: 'Sarah Connor', unit: 'Apt 101', property: 'Parkview Heights' },
        { id: 102, name: 'Alice Cooper', unit: 'Apt 201', property: 'Sunset Towers' }
      ]
    };
  }),
  getFinancialPulse: (ownerId) => withDelay(() => {
    return [
      { month: '2026-01', expected: 15000, collected: 15000, dues: 0 },
      { month: '2026-02', expected: 15000, collected: 14000, dues: 1000 },
      { month: '2026-03', expected: 15000, collected: 15000, dues: 0 },
      { month: '2026-04', expected: 18000, collected: 17500, dues: 500 },
      { month: '2026-05', expected: 18000, collected: 18000, dues: 0 },
      { month: '2026-06', expected: 18000, collected: 15500, dues: 2500 }
    ];
  }),
  getProperties: (ownerId) => withDelay(() => {
    return getStore('mock_properties') || [];
  }),
  getFinancials: (ownerId) => withDelay(() => {
    return {
      collected: 18000,
      outstandingDues: 2500,
      securityDepositsHeld: 5000,
      netEarnings: 15500,
      transactions: [
        { id: 1, date: '2026-06-15', description: 'Monthly Revenue Payout', type: 'Payout', amount: 15500.00, status: 'Completed' },
        { id: 2, date: '2026-05-15', description: 'Monthly Revenue Payout', type: 'Payout', amount: 18000.00, status: 'Completed' }
      ]
    };
  }),
  getReports: (ownerId) => withDelay(() => {
    return [
      { id: 1, name: 'Monthly Owner Statement - Jun 2026', type: 'Owner Statement', generatedAt: '2026-06-25T16:00:00Z', url: '#' }
    ];
  })
};
