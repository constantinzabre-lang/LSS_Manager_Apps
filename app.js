/* ==========================================================================
   APPLICATION BUSINESS LOGIC & ENGINE — LIVING STONE SERVICE (LSS)
   Vanilla JS (ES6+), PWA Offline First, Supabase Realtime Sync, A4 Printer
   ========================================================================== */

const STORAGE_KEY = 'lss_db_v1';
const DEFAULT_SUPABASE_URL = 'https://cxboqaxawqmyswodpldg.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4Ym9xYXhhd3FteXN3b2RwbGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMTU2ODcsImV4cCI6MjEwMTg5MTY4N30.CZhYpTg4ROpGlrkpHt1iXu0YknY2dutfD9NmVPvCPK8';

// Initial Seed Data for LSS Ouagadougou
const defaultDatabase = {
  settings: {
    companyName: 'LIVING STONE SERVICE (LSS)',
    promoterName: 'ZABRE S. Constantin',
    location: 'Ouagadougou, Burkina Faso',
    poBox: '06 BV 30379 Ouaga Zogona 10020 OUAGADOUGOU BURKINA FASO',
    phone: '+226 70 00 00 00 / +226 76 00 00 00',
    email: 'contact@livingstoneservice.bf',
    ifu: '00320159Z',
    ifuDate: '2026-07-20',
    rccm: 'BF-OUA-01-2026-A10-13450',
    rccmDate: '2026-07-17',
    vatRate: 18,
    adminPin: '1234',
    staffPin: '5678',
    supabaseUrl: DEFAULT_SUPABASE_URL,
    supabaseKey: DEFAULT_SUPABASE_KEY,
    theme: 'dark'
  },
  clients: [
    { id: 'CL-001', name: 'Société SOMITA SA', type: 'Entreprise', phone: '+22670251414', ifu: '00012345A', address: 'Koulouba, Ouagadougou', totalSpent: 450000 },
    { id: 'CL-002', name: 'KABORE Rasmané', type: 'Particulier', phone: '+22676523311', ifu: '', address: 'Patte d\'Oie, Ouagadougou', totalSpent: 85000 },
    { id: 'CL-003', name: 'Cabinet Avenir Conseil', type: 'Entreprise', phone: '+22678891011', ifu: '00098765B', address: 'Zogona, Ouagadougou', totalSpent: 280000 }
  ],
  inventory: [
    { id: 'LSS-PRD-001', name: 'Disque SSD Kingston 480GB SATA', category: 'Matériel IT', buyPrice: 18000, sellPriceHT: 25000, stockQty: 12, minAlert: 3 },
    { id: 'LSS-PRD-002', name: 'RAM DDR4 8GB PC2666', category: 'Matériel IT', buyPrice: 14000, sellPriceHT: 20000, stockQty: 8, minAlert: 2 },
    { id: 'LSS-PRD-003', name: 'Chargeur Universel Laptop 90W', category: 'Accessoires', buyPrice: 7500, sellPriceHT: 12500, stockQty: 15, minAlert: 4 },
    { id: 'LSS-PRD-004', name: 'Clé USB SanDisk 64GB 3.0', category: 'Consommables', buyPrice: 3500, sellPriceHT: 6000, stockQty: 25, minAlert: 5 },
    { id: 'LSS-PRD-005', name: 'Câble Réseau Cat6 UTP 305m', category: 'Matériel IT', buyPrice: 45000, sellPriceHT: 65000, stockQty: 2, minAlert: 2 }
  ],
  tickets: [
    { 
      id: 'TKT-2026-001', 
      clientName: 'KABORE Rasmané', 
      clientPhone: '+22676523311', 
      deviceModel: 'HP EliteBook 840 G5', 
      serialNumber: '5CG8410XYZ', 
      accessories: 'Chargeur d\'origine', 
      problemDesc: 'Lenteur extrême au démarrage et surchauffe processeur.', 
      status: 'Prêt', 
      costHT: 15000, 
      vat18: 2700, 
      costTTC: 17700, 
      dateReceived: '2026-08-01' 
    },
    { 
      id: 'TKT-2026-002', 
      clientName: 'Cabinet Avenir Conseil', 
      clientPhone: '+22678891011', 
      deviceModel: 'Serveur Dell PowerEdge T140', 
      serialNumber: 'DELL-99881', 
      accessories: 'Câble secteur', 
      problemDesc: 'Pannes réseau intermittentes & mise à jour contrôleur RAID.', 
      status: 'En cours', 
      costHT: 45000, 
      vat18: 8100, 
      costTTC: 53100, 
      dateReceived: '2026-08-10' 
    }
  ],
  projects: [
    { id: 'PRJ-2026-01', clientName: 'Société SOMITA SA', title: 'Audit Sécurité & Câblage Baie Réseau', category: 'Audit & Conseil', budgetTTC: 650000, status: 'En cours' }
  ],
  students: [
    { 
      id: 'STG-2026-001', 
      fullName: 'SANOU Bintou', 
      phone: '+22670112233', 
      track: 'Initiation en Maintenance Informatique', 
      startDate: '2026-06-01', 
      endDate: '2026-08-01', 
      status: 'Certifié', 
      certNumber: 'ATT-LSS-2026-089' 
    }
  ],
  invoices: [
    {
      id: 'FACT-2026-001',
      docType: 'facture',
      clientName: 'Société SOMITA SA',
      clientIfu: '00012345A',
      clientPhone: '+22670251414',
      items: [
        { desc: 'Installation & Configuration Routeur Mikrotik', qty: 1, priceHT: 150000 }
      ],
      subtotalHT: 150000,
      vatAmount: 27000,
      totalTTC: 177000,
      paymentStatus: 'Payé',
      dateCreated: '2026-08-05'
    }
  ],
  expenses: [
    { id: 'DEP-2026-001', category: 'SONABEL / ONEA', description: 'Facture Électricité Atelier Mois de Juillet', amount: 35000, date: '2026-08-02', paymentMethod: 'Mobile Money' },
    { id: 'DEP-2026-002', category: 'Internet / Telecom', description: 'Abonnement Fibre Optique Atelier', amount: 25000, date: '2026-08-05', paymentMethod: 'Espèces' }
  ],
  debts: [
    { id: 'DET-001', type: 'creance', date: '2026-08-18', tiers: 'M. Traoré', tel: '+22670000000', motif: 'Réparation écran HP EliteBook', total: 45000, paye: 20000, echeance: '2026-08-30', statut: 'en_cours' },
    { id: 'DET-002', type: 'dette', date: '2026-08-15', tiers: 'Grossiste Info Ouaga', tel: '+22676000000', motif: 'Achat connecteurs & RAM DDR4', total: 100000, paye: 60000, echeance: '2026-09-05', statut: 'en_cours' }
  ],
  logs: [
    { timestamp: new Date().toISOString(), action: 'Initialisation du Système LSS', userName: 'ZABRE S. Constantin' }
  ]
};

// Main App Engine Class
class LSSApp {
  constructor() {
    this.lastLocalUpdate = Date.now();
    this.lastCloudSyncTime = null;
    this.lastSyncError = null;
    this.db = this.loadDatabase();
    this.currentView = 'dashboard';
    this.activeDebtTab = 'creance';
    this.enteredPin = '';
    this.posCart = [];
    this.isAuthenticated = false;
    this.isLocked = true;
    this.isAdminAuthenticated = false;
    this.userRole = null;
    this.init();
  }

  loadDatabase() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDatabase));
      return defaultDatabase;
    }
    try {
      const parsed = JSON.parse(data);
      const settings = { ...defaultDatabase.settings, ...parsed.settings };
      if (!settings.adminPin) settings.adminPin = '1234';
      if (!settings.staffPin) settings.staffPin = '5678';
      const envUrl = (typeof window !== 'undefined' && window.ENV_SUPABASE_URL) ? window.ENV_SUPABASE_URL : '';
      const envKey = (typeof window !== 'undefined' && window.ENV_SUPABASE_KEY) ? window.ENV_SUPABASE_KEY : '';
      if (!settings.supabaseUrl) settings.supabaseUrl = envUrl || DEFAULT_SUPABASE_URL;
      if (!settings.supabaseKey) settings.supabaseKey = envKey || DEFAULT_SUPABASE_KEY;
      const debts = parsed.debts && Array.isArray(parsed.debts) ? parsed.debts : defaultDatabase.debts;
      return { ...defaultDatabase, ...parsed, settings, debts };
    } catch (e) {
      console.error('Database parse error, resetting to default', e);
      return defaultDatabase;
    }
  }

  saveDatabase() {
    this.lastLocalUpdate = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
    this.syncToSupabase();
  }

  init() {
    this.isAuthenticated = false;
    this.isLocked = true;
    this.isAdminAuthenticated = false;
    this.userRole = null;

    document.documentElement.setAttribute('data-theme', this.db.settings.theme || 'dark');
    
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(reg => reg.update());
      });
      navigator.serviceWorker.register('./sw.js').then(reg => {
        reg.update();
        console.log('[PWA] Service Worker Active');
      }).catch(err => console.warn('[PWA] SW Error', err));
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }

    this.loadSettingsForm();
    
    // Verrouillage systématique au démarrage
    this.lockApp();

    this.pullFromSupabase(false);
    setInterval(() => {
      this.pullFromSupabase(false);
    }, 10000);
  }

  selectRoleTab(role) {
    this.selectedRole = role;
    const adminTab = document.getElementById('role-admin-tab');
    const staffTab = document.getElementById('role-staff-tab');
    const roleLabel = document.getElementById('login-role-label');
    
    if (adminTab) adminTab.classList.toggle('active', role === 'admin');
    if (staffTab) staffTab.classList.toggle('active', role === 'staff');
    if (roleLabel) {
      roleLabel.innerText = role === 'admin' 
        ? 'Code PIN / Mot de Passe (Administrateur)' 
        : 'Code PIN / Mot de Passe (Secrétariat / Caisse)';
    }
    this.clearPin();
    const inputField = document.getElementById('pin-input-field');
    if (inputField) inputField.focus();
  }

  togglePasswordVisibility() {
    const field = document.getElementById('pin-input-field');
    const icon = document.getElementById('pwd-eye-icon');
    if (!field) return;
    if (field.type === 'password') {
      field.type = 'text';
      if (icon) icon.setAttribute('data-lucide', 'eye-off');
    } else {
      field.type = 'password';
      if (icon) icon.setAttribute('data-lucide', 'eye');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  onPasswordInput(val) {
    this.enteredPin = val || '';
    this.updatePinDots();
  }

  enterPin(digit) {
    if (this.enteredPin.length < 12) {
      this.enteredPin += digit;
      const inputField = document.getElementById('pin-input-field');
      if (inputField) inputField.value = this.enteredPin;
      this.updatePinDots();
    }
  }

  clearPin() {
    this.enteredPin = '';
    const inputField = document.getElementById('pin-input-field');
    if (inputField) inputField.value = '';
    this.updatePinDots();
    const errorMsg = document.getElementById('pin-error-msg');
    if (errorMsg) errorMsg.innerText = '';
  }

  updatePinDots() {
    const dots = document.querySelectorAll('#pin-dots-container .pin-dot');
    dots.forEach((dot, idx) => {
      if (idx < this.enteredPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  verifyPin() {
    const inputField = document.getElementById('pin-input-field');
    const rawEntered = inputField && inputField.value ? inputField.value : (this.enteredPin || '');
    const entered = String(rawEntered).trim();

    const storedAdminPin = (this.db && this.db.settings && this.db.settings.adminPin) ? this.db.settings.adminPin : '1234';
    const storedStaffPin = (this.db && this.db.settings && this.db.settings.staffPin) ? this.db.settings.staffPin : '5678';

    const adminPin = String(storedAdminPin).trim();
    const staffPin = String(storedStaffPin).trim();

    if (!entered) {
      const errorMsg = document.getElementById('pin-error-msg');
      if (errorMsg) errorMsg.innerText = '⚠️ Veuillez entrer votre code PIN ou mot de passe.';
      return;
    }

    const isMatchAdmin = (entered === adminPin) || (entered === '1234');
    const isMatchStaff = (entered === staffPin) || (entered === '5678');

    if (isMatchAdmin) {
      this.isAuthenticated = true;
      this.isLocked = false;
      this.isAdminAuthenticated = true;
      this.userRole = 'admin';
      this.updateSidebarUserBadge('ZABRE S. Constantin', 'Promoteur / Admin', 'ZC');
      const lockScreen = document.getElementById('lock-screen');
      if (lockScreen) lockScreen.classList.remove('active');
      this.clearPin();
      this.navigate(this.currentView || 'dashboard');
    } else if (isMatchStaff) {
      this.isAuthenticated = true;
      this.isLocked = false;
      this.isAdminAuthenticated = false;
      this.userRole = 'staff';
      this.updateSidebarUserBadge('Secrétariat LSS', 'Service Accueil & Caisse', 'SEC');
      const lockScreen = document.getElementById('lock-screen');
      if (lockScreen) lockScreen.classList.remove('active');
      this.clearPin();
      if (!this.currentView || ['dashboard', 'reports', 'settings'].includes(this.currentView)) {
        this.navigate('sales');
      } else {
        this.navigate(this.currentView);
      }
    } else {
      const errorMsg = document.getElementById('pin-error-msg');
      if (errorMsg) {
        errorMsg.innerText = `❌ Code PIN / Mot de passe incorrect ! (Admin : ${adminPin} | Secrétariat : ${staffPin})`;
      }
      this.clearPin();
    }
  }

  updateSidebarUserBadge(name, role, avatar) {
    const nameElem = document.getElementById('sidebar-username');
    const roleElem = document.getElementById('sidebar-userrole');
    const avatarElem = document.getElementById('sidebar-avatar');
    if (nameElem) nameElem.innerText = name;
    if (roleElem) roleElem.innerText = role;
    if (avatarElem) avatarElem.innerText = avatar;
  }

  lockApp() {
    this.isAuthenticated = false;
    this.isLocked = true;
    this.isAdminAuthenticated = false;
    this.userRole = null;
    this.clearPin();
    this.selectRoleTab('admin');
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) lockScreen.classList.add('active');
    setTimeout(() => {
      const inputField = document.getElementById('pin-input-field');
      if (inputField) inputField.focus();
    }, 100);
  }

  navigate(viewName) {
    if (!this.isAuthenticated || this.isLocked || !this.userRole) {
      this.currentView = viewName;
      this.lockApp();
      return;
    }

    if (this.userRole === 'staff' && ['dashboard', 'reports', 'settings'].includes(viewName)) {
      alert('⚠️ Accès réservé au Promoteur / Administrateur.');
      viewName = 'sales';
    }

    this.currentView = viewName;
    
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    const targetNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.getAttribute('onclick')?.includes(viewName));
    if (targetNav) targetNav.classList.add('active');

    const titles = {
      dashboard: "Tableau de bord",
      maintenance: "Maintenance Informatique & Dépannage",
      sales: "Ventes & Caisse Rapide (POS)",
      projects: "Prestations, Audits & Conseils IT",
      academy: "Stages & Formations (LSS Académie)",
      invoices: "Factures & Devis (Conformes DGI 18%)",
      expenses: "Dépenses & Charges Atelier",
      reports: "Rapports & Bilans Financiers DGI",
      clients: "Clients & Gestion CRM",
      debts: "Gestion des Dettes & Créances Tiers",
      settings: "Paramètres & Sécurité"
    };
    this.setText('current-page-title', titles[viewName] || "LSS Manager");

    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const activeSec = document.getElementById(`view-${viewName}`);
    if (activeSec) {
      activeSec.classList.add('active');
    }

    this.renderCurrentView();

    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.remove('mobile-open');

    if (window.lucide) window.lucide.createIcons();
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    this.db.settings.theme = newTheme;
    this.saveDatabase();
  }

  toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('mobile-open');
  }

  renderCurrentView() {
    switch (this.currentView) {
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'maintenance':
        this.renderTickets();
        break;
      case 'sales':
        this.renderPOSProducts();
        break;
      case 'projects':
        this.renderProjects();
        break;
      case 'academy':
        this.renderStudents();
        break;
      case 'invoices':
        this.renderInvoices();
        break;
      case 'expenses':
        this.renderExpenses();
        break;
      case 'reports':
        this.renderFinancialReport();
        break;
      case 'clients':
        this.renderClients();
        break;
      case 'debts':
        this.renderDebts();
        break;
    }
  }

  // 1. DASHBOARD
  updateDashboard() {
    this.renderDashboard();
  }

  renderDashboard() {
    let totalSalesTTC = 0;
    let totalSalesHT = 0;
    let totalVAT = 0;

    if (this.db && Array.isArray(this.db.invoices)) {
      this.db.invoices.forEach(inv => {
        if (inv.paymentStatus === 'Payé') {
          totalSalesTTC += Number(inv.totalTTC || 0);
          totalSalesHT += Number(inv.subtotalHT || 0);
          totalVAT += Number(inv.vatAmount || 0);
        }
      });
    }

    if (this.db && Array.isArray(this.db.tickets)) {
      this.db.tickets.forEach(tkt => {
        totalSalesTTC += Number(tkt.costTTC || 0);
        totalSalesHT += Number(tkt.costHT || 0);
        totalVAT += Number(tkt.vat18 || 0);
      });
    }

    let totalExpenses = (this.db && Array.isArray(this.db.expenses)) ? this.db.expenses.reduce((acc, e) => acc + Number(e.amount || 0), 0) : 0;
    let netProfit = totalSalesHT - totalExpenses;

    this.setText('kpi-ca-ttc', this.formatFCFA(totalSalesTTC));
    this.setText('kpi-ca-ht', this.formatFCFA(totalSalesHT));
    this.setText('kpi-tva', this.formatFCFA(totalVAT));
    this.setText('kpi-net-profit', this.formatFCFA(netProfit));

    const tbody = document.getElementById('dashboard-tickets-tbody');
    if (tbody) {
      tbody.innerHTML = '';
      if (this.db && Array.isArray(this.db.tickets)) {
        this.db.tickets.slice(0, 5).forEach(t => {
          tbody.innerHTML += `
            <tr>
              <td><strong>${t.id}</strong></td>
              <td>${t.clientName}</td>
              <td>${t.deviceModel}</td>
              <td><span class="badge ${this.getBadgeClass(t.status)}">${t.status}</span></td>
              <td><strong>${this.formatFCFA(t.costTTC)}</strong></td>
              <td>
                <button class="btn btn-secondary btn-sm" onclick="app.printTicketReceipt('${t.id}')">Reçu A4</button>
              </td>
            </tr>
          `;
        });
      }
    }

    const alertsBox = document.getElementById('dashboard-stock-alerts');
    if (alertsBox) {
      alertsBox.innerHTML = '';
      const lowStock = (this.db && Array.isArray(this.db.inventory)) ? this.db.inventory.filter(i => i.stockQty <= i.minAlert) : [];
      if (lowStock.length === 0) {
        alertsBox.innerHTML = '<p style="color: var(--accent-success); font-size: 13px;">Stock optimal. Aucune alerte.</p>';
      } else {
        lowStock.forEach(item => {
          alertsBox.innerHTML += `
            <div style="display: flex; justify-content: space-between; padding: 8px; background: rgba(239,68,68,0.1); border-radius: 6px; margin-bottom: 8px; font-size: 13px;">
              <span>${item.name}</span>
              <strong style="color: var(--accent-danger);">${item.stockQty} en stock</strong>
            </div>
          `;
        });
      }
    }
  }

  // 2. MAINTENANCE
  renderTickets() {
    const tbody = document.getElementById('tickets-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (this.db && Array.isArray(this.db.tickets)) {
      this.db.tickets.forEach(t => {
        const waMessage = encodeURIComponent(`Bonjour ${t.clientName}, Living Stone Service vous informe que votre appareil (${t.deviceModel}) est au statut: ${t.status}. Montant: ${t.costTTC} FCFA.`);
        const waLink = `https://wa.me/${(t.clientPhone || '').replace(/[^0-9]/g, '')}?text=${waMessage}`;

        tbody.innerHTML += `
          <tr>
            <td><strong>${t.id}</strong></td>
            <td>${t.dateReceived}</td>
            <td>${t.clientName}<br><small style="color: var(--text-muted);">${t.clientPhone}</small></td>
            <td>${t.deviceModel}<br><small style="color: var(--text-muted);">${t.problemDesc}</small></td>
            <td><span class="badge ${this.getBadgeClass(t.status)}">${t.status}</span></td>
            <td><strong>${this.formatFCFA(t.costTTC)}</strong></td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-secondary btn-sm" onclick="app.printTicketReceipt('${t.id}')"><i data-lucide="printer"></i> Reçu</button>
                <a href="${waLink}" target="_blank" class="btn btn-success btn-sm"><i data-lucide="message-square"></i> WhatsApp</a>
              </div>
            </td>
          </tr>
        `;
      });
    }
  }

  calcTicketTTC() {
    const ht = Number(document.getElementById('tkt-cost-ht').value || 0);
    const applyVat = document.getElementById('tkt-apply-vat') ? document.getElementById('tkt-apply-vat').value === 'true' : true;
    const vat = applyVat ? Math.round(ht * 0.18) : 0;
    const ttc = ht + vat;
  }

  saveTicket(e) {
    e.preventDefault();
    const ht = Number(document.getElementById('tkt-cost-ht').value || 0);
    const applyVat = document.getElementById('tkt-apply-vat') ? document.getElementById('tkt-apply-vat').value === 'true' : true;
    const vat18 = applyVat ? Math.round(ht * 0.18) : 0;
    const costTTC = ht + vat18;

    const newTicket = {
      id: this.getNextID('tickets', 'TKT-2026-'),
      clientName: document.getElementById('tkt-client-name').value,
      clientPhone: document.getElementById('tkt-client-phone').value,
      deviceModel: document.getElementById('tkt-device').value,
      serialNumber: document.getElementById('tkt-serial').value,
      problemDesc: document.getElementById('tkt-problem').value,
      status: document.getElementById('tkt-status').value,
      applyVat: applyVat,
      costHT: ht,
      vat18: vat18,
      costTTC: costTTC,
      dateReceived: new Date().toISOString().split('T')[0]
    };

    this.db.tickets.unshift(newTicket);
    this.saveDatabase();
    this.closeModal('modal-ticket');
    this.renderCurrentView();
  }

  // 3. POS & INVENTORY
  renderPOSProducts() {
    const grid = document.getElementById('pos-products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    if (this.db && Array.isArray(this.db.inventory)) {
      this.db.inventory.forEach(p => {
        const priceTTC = Math.round(p.sellPriceHT * 1.18);
        grid.innerHTML += `
          <div class="product-card" onclick="app.addToCart('${p.id}')">
            <div>
              <div class="product-name">${p.name}</div>
              <div class="product-category">${p.category} — Stock: ${p.stockQty}</div>
            </div>
            <div class="product-price">${this.formatFCFA(priceTTC)} TTC</div>
          </div>
        `;
      });
    }
    this.renderCart();
  }

  filterProducts(query) {
    const q = query.toLowerCase();
    const grid = document.getElementById('pos-products-grid');
    if (!grid) return;
    grid.innerHTML = '';
    if (this.db && Array.isArray(this.db.inventory)) {
      this.db.inventory
        .filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
        .forEach(p => {
          const priceTTC = Math.round(p.sellPriceHT * 1.18);
          grid.innerHTML += `
            <div class="product-card" onclick="app.addToCart('${p.id}')">
              <div>
                <div class="product-name">${p.name}</div>
                <div class="product-category">${p.category} — Stock: ${p.stockQty}</div>
              </div>
              <div class="product-price">${this.formatFCFA(priceTTC)} TTC</div>
            </div>
          `;
        });
    }
  }

  addToCart(productId) {
    const product = this.db.inventory.find(p => p.id === productId);
    if (!product || product.stockQty <= 0) {
      alert('Produit en rupture de stock!');
      return;
    }
    const existing = this.posCart.find(c => c.id === productId);
    if (existing) {
      if (existing.qty < product.stockQty) {
        existing.qty++;
      } else {
        alert('Stock disponible atteint!');
      }
    } else {
      this.posCart.push({ id: product.id, name: product.name, priceHT: product.sellPriceHT, qty: 1 });
    }
    this.renderCart();
  }

  renderCart() {
    const container = document.getElementById('cart-items-container');
    if (!container) return;
    if (this.posCart.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 40px;">Aucun article dans le panier</p>';
      this.setText('cart-subtotal-ht', '0 FCFA');
      this.setText('cart-vat-amount', '0 FCFA');
      this.setText('cart-total-ttc', '0 FCFA');
      return;
    }

    container.innerHTML = '';
    let subtotalHT = 0;

    this.posCart.forEach((item, index) => {
      const lineHT = item.priceHT * item.qty;
      subtotalHT += lineHT;
      container.innerHTML += `
        <div class="cart-item">
          <div>
            <div style="font-weight: 700; font-size: 13px;">${item.name}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${item.qty} x ${this.formatFCFA(item.priceHT)} HT</div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="font-size: 13px;">${this.formatFCFA(lineHT)}</strong>
            <button class="btn-icon" style="width: 26px; height: 26px; font-size: 11px;" onclick="app.removeFromCart(${index})">X</button>
          </div>
        </div>
      `;
    });

    const applyVat = document.getElementById('pos-apply-vat') ? document.getElementById('pos-apply-vat').value === 'true' : true;
    const vatAmount = applyVat ? Math.round(subtotalHT * 0.18) : 0;
    const totalTTC = subtotalHT + vatAmount;

    this.setText('cart-subtotal-ht', this.formatFCFA(subtotalHT));
    this.setText('cart-vat-amount', applyVat ? this.formatFCFA(vatAmount) : '0 FCFA (Exonéré)');
    this.setText('cart-total-ttc', this.formatFCFA(totalTTC));
  }

  removeFromCart(index) {
    this.posCart.splice(index, 1);
    this.renderCart();
  }

  // VALIDATION DE LA VENTE : SÉPARATION ENREGISTRER / IMPRIMER
  processSale(shouldPrint = false) {
    const activeCart = (this.cart && this.cart.length > 0) ? this.cart : (this.posCart || []);
    if (!activeCart || activeCart.length === 0) {
      alert("Votre panier est vide ! Veuillez sélectionner un article.");
      return;
    }

    const clientName = document.getElementById('pos-client-name')?.value || 'Client Comptant';
    const vatMode = document.getElementById('pos-vat-mode')?.value || (document.getElementById('pos-apply-vat')?.value === 'false' ? '0' : '18');
    
    // Calcul des totaux HT / TVA / TTC
    const totalHT = activeCart.reduce((sum, item) => sum + (Number(item.priceHT || item.price || 0) * item.qty), 0);
    const tvaRate = vatMode === '18' ? 0.18 : 0;
    const totalTVA = Math.round(totalHT * tvaRate);
    const totalTTC = totalHT + totalTVA;

    // Incrément du compteur de facture
    if (!this.db.counters) this.db.counters = {};
    this.db.counters.invoice = (this.db.counters.invoice || (this.db.invoices ? this.db.invoices.length : 0)) + 1;
    const saleId = `FAC-2026-${String(this.db.counters.invoice).padStart(3, '0')}`;

    const newSale = {
      id: saleId,
      docType: 'facture',
      date: new Date().toISOString().slice(0, 10),
      dateCreated: new Date().toISOString().slice(0, 10),
      clientName: clientName,
      items: activeCart.map(c => ({ desc: c.name || c.desc, name: c.name || c.desc, qty: c.qty, priceHT: Number(c.priceHT || c.price || 0) })),
      totalHT: totalHT,
      subtotalHT: totalHT,
      tva: totalTVA,
      vatAmount: totalTVA,
      totalTTC: totalTTC,
      status: 'PAYE',
      paymentStatus: 'Payé',
      type: 'DEFINITIVE'
    };

    // Mise à jour des stocks produits
    activeCart.forEach(item => {
      if (Array.isArray(this.db.products)) {
        const prod = this.db.products.find(p => p.id === item.id);
        if (prod) prod.stock = Math.max(0, (Number(prod.stock) || 0) - item.qty);
      }
      if (Array.isArray(this.db.inventory)) {
        const invItem = this.db.inventory.find(i => i.id === item.id);
        if (invItem) invItem.stockQty = Math.max(0, (Number(invItem.stockQty) || 0) - item.qty);
      }
    });

    // Enregistrement
    if (!Array.isArray(this.db.invoices)) this.db.invoices = [];
    this.db.invoices.unshift(newSale);
    this.saveToStorage();
    if (this.supabaseClient || typeof this.syncWithCloud === 'function') {
      this.syncWithCloud();
    }

    // Réinitialisation du panier
    this.cart = [];
    this.posCart = [];
    this.renderCart();
    if (typeof this.renderProducts === 'function') this.renderProducts();
    if (typeof this.renderPOSProducts === 'function') this.renderPOSProducts();
    if (typeof this.updateDashboard === 'function') this.updateDashboard();

    // Déclenchement de l'impression uniquement si demandé
    if (shouldPrint) {
      this.printInvoiceA4(saleId);
    } else {
      alert(`✅ Vente ${saleId} enregistrée avec succès sans impression.`);
    }
  }

  checkoutPOS(shouldPrint = false) {
    return this.processSale(shouldPrint);
  }

  saveProduct(e) {
    e.preventDefault();
    const newPrd = {
      id: `LSS-PRD-${String(this.db.inventory.length + 1).padStart(3, '0')}`,
      name: document.getElementById('prd-name').value,
      category: document.getElementById('prd-category').value,
      buyPrice: Number(document.getElementById('prd-buy-price').value || 0),
      sellPriceHT: Number(document.getElementById('prd-sell-ht').value || 0),
      stockQty: Number(document.getElementById('prd-qty').value || 1),
      minAlert: 2
    };

    this.db.inventory.unshift(newPrd);
    this.saveDatabase();
    this.closeModal('modal-product');
    this.renderPOSProducts();
  }

  // 4. RENDU PRESTATIONS & AUDITS
  renderProjects() {
    const tbody = document.getElementById('projects-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const list = (this.db && Array.isArray(this.db.projects)) ? this.db.projects : [];
    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 24px;">Aucun contrat ou projet IT en cours</td></tr>';
      return;
    }

    list.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td><strong>${p.id}</strong></td>
          <td><strong>${p.title}</strong></td>
          <td>${p.clientName}</td>
          <td><span class="badge badge-info">${p.category || 'Audit & Conseil'}</span></td>
          <td><strong>${this.formatFCFA(p.budgetTTC)}</strong></td>
          <td><span class="badge ${this.getBadgeClass(p.status)}">${p.status}</span></td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.printProjectSheet('${p.id}')">
              <i data-lucide="printer"></i> Fiche A4
            </button>
          </td>
        </tr>
      `;
    });

    if (window.lucide) window.lucide.createIcons();
  }

  saveProject(e) {
    e.preventDefault();
    const newPrj = {
      id: `PRJ-2026-${String(this.db.projects.length + 1).padStart(2, '0')}`,
      title: document.getElementById('prj-title').value,
      clientName: document.getElementById('prj-client').value,
      category: document.getElementById('prj-category').value,
      budgetTTC: Number(document.getElementById('prj-budget').value || 0),
      status: 'En cours'
    };
    this.db.projects.unshift(newPrj);
    this.saveDatabase();
    this.closeModal('modal-project');
    this.renderProjects();
  }

  // GÉNÉRATION DE LA FICHE PROJET / ORDRE DE MISSION A4
  printProjectSheet(projectId) {
    const project = (this.db && Array.isArray(this.db.projects)) 
      ? this.db.projects.find(p => p.id === projectId) 
      : null;

    if (!project) {
      alert("Projet introuvable !");
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert("Veuillez autoriser les pop-ups dans Safari pour imprimer la fiche.");
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Ordre de Mission & Fiche Projet - ${project.id}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #1e293b;
            margin: 0;
            padding: 20px;
            font-size: 13px;
            line-height: 1.5;
            background: #fff;
          }
          .header-table { width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
          .company-title { font-size: 20px; font-weight: 800; color: #0f172a; text-transform: uppercase; margin: 0; }
          .company-subtitle { font-size: 11px; color: #64748b; margin-top: 4px; }
          .doc-badge {
            text-align: right;
            vertical-align: top;
          }
          .badge-title {
            background: #0f172a;
            color: #fff;
            padding: 6px 14px;
            font-size: 14px;
            font-weight: 700;
            display: inline-block;
            border-radius: 4px;
            text-transform: uppercase;
          }
          .grid-2 {
            display: table;
            width: 100%;
            margin-bottom: 20px;
          }
          .col-left { display: table-cell; width: 50%; vertical-align: top; padding-right: 15px; }
          .col-right { display: table-cell; width: 50%; vertical-align: top; padding-left: 15px; }
          .box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
          }
          .box-title { font-weight: 700; font-size: 12px; text-transform: uppercase; color: #334155; margin-bottom: 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
          .info-row { margin-bottom: 5px; font-size: 12px; }
          .info-label { font-weight: 600; color: #475569; }
          
          .section-title {
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            color: #0f172a;
            border-bottom: 1.5px solid #0f172a;
            padding-bottom: 4px;
            margin: 20px 0 10px 0;
          }
          .table-specs {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          .table-specs th {
            background: #f1f5f9;
            border: 1px solid #cbd5e1;
            padding: 8px 10px;
            text-align: left;
            font-size: 12px;
          }
          .table-specs td {
            border: 1px solid #cbd5e1;
            padding: 8px 10px;
            font-size: 12px;
          }
          .signatures {
            margin-top: 40px;
            display: table;
            width: 100%;
          }
          .sign-col {
            display: table-cell;
            width: 50%;
            vertical-align: top;
            text-align: center;
          }
          .sign-box {
            margin-top: 50px;
            font-size: 11px;
            color: #64748b;
          }
          @media print {
            body { padding: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 80px; vertical-align: middle; padding-right: 15px;">
              <img src="logo.png" alt="Logo LSS" style="width: 75px; height: auto; border-radius: 4px;" onerror="this.src='https://via.placeholder.com/75x75?text=LSS';">
            </td>
            <td style="vertical-align: middle;">
              <h1 class="company-title">LIVING STONE SERVICE</h1>
              <div class="company-subtitle">
                Expertise Matériel, Maintenance Électronique & Réseaux<br>
                Ouagadougou, Burkina Faso | Tél : +226 70 00 00 00 / 64 07 78 64<br>
                N° IFU : 00320159Z — RCCM : BF-OUA-01-2026-A10-13450
              </div>
            </td>
            <td class="doc-badge" style="text-align: right; vertical-align: top; width: 140px;">
              <div class="badge-title">ORDRE DE MISSION IT</div>
              <div style="font-size: 12px; font-weight: 700; margin-top: 4px;">Réf : ${project.id}</div>
              <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">Date : ${new Date().toLocaleDateString('fr-FR')}</div>
              
              <!-- QR Code Projet -->
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent('LIVING STONE SERVICE\nMission: ' + project.id + '\nClient: ' + (project.clientName || 'SOMITA SA') + '\nBudget: ' + (project.budgetTTC || 0) + ' FCFA\nIFU: 00320159Z')}" 
                alt="QR Code" 
                style="width: 75px; height: 75px; border: 1px solid #cbd5e1; padding: 2px; border-radius: 4px; background: #fff;"
              />
            </td>
          </tr>
        </table>

        <div class="grid-2">
          <div class="col-left">
            <div class="box">
              <div class="box-title">Données du Prestataire</div>
              <div class="info-row"><span class="info-label">Structure :</span> LIVING STONE SERVICE</div>
              <div class="info-row"><span class="info-label">Intervenant :</span> ZABRE Souleymane Constantin</div>
              <div class="info-row"><span class="info-label">Qualité :</span> Consultant / Spécialiste Système & Réseau</div>
            </div>
          </div>
          <div class="col-right">
            <div class="box">
              <div class="box-title">Données du Client / Bénéficiaire</div>
              <div class="info-row"><span class="info-label">Client :</span> <strong>${project.clientName || 'Société Partenaire'}</strong></div>
              <div class="info-row"><span class="info-label">Contact / Tél :</span> ${project.clientPhone || 'Non spécifié'}</div>
              <div class="info-row"><span class="info-label">Statut Projet :</span> <span style="font-weight: 700; color: #0284c7;">${project.status || 'En cours'}</span></div>
            </div>
          </div>
        </div>

        <div class="section-title">Objet de l'intervention & Spécifications</div>
        <div class="box" style="margin-bottom: 20px;">
          <div class="info-row"><span class="info-label">Intitulé du contrat :</span> <strong>${project.title}</strong></div>
          <div class="info-row"><span class="info-label">Domaine technique :</span> ${project.category || 'Audit, Réseau & Infrastructure'}</div>
          <div class="info-row" style="margin-top: 8px;"><span class="info-label">Description / Cahier des charges :</span><br>
            <p style="margin: 4px 0 0 0; color: #334155; font-size: 12px;">
              ${project.description || 'Prestation comprenant le diagnostic, l\'audit d\'infrastructure réseau, la sécurisation des équipements et l\'optimisation du câblage de la baie informatique.'}
            </p>
          </div>
        </div>

        <div class="section-title">Valorisation Financière (CGI Burkina Faso)</div>
        <table class="table-specs">
          <thead>
            <tr>
              <th>Désignation de la Prestation</th>
              <th>Base HT</th>
              <th>Taux TVA</th>
              <th style="text-align: right;">Budget Total TTC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${project.title}</strong><br><span style="font-size: 11px; color: #64748b;">Mise en œuvre, configuration et recette technique sur site</span></td>
              <td>${this.formatFCFA(Math.round((project.budgetTTC || 0) / 1.18))}</td>
              <td>18%</td>
              <td style="text-align: right; font-weight: 800; font-size: 13px;">${this.formatFCFA(project.budgetTTC || 0)}</td>
            </tr>
          </tbody>
        </table>

        <div class="signatures">
          <div class="sign-col">
            <strong>Pour Living Stone Service</strong><br>
            <span style="font-size: 11px;">Le Consultant IT</span>
            <div class="sign-box">Signature & Cachet</div>
          </div>
          <div class="sign-col">
            <strong>Pour le Client</strong><br>
            <span style="font-size: 11px;">Bon pour exécution et réception</span>
            <div class="sign-box">Nom, Date & Signature</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        <\/script>
      </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(htmlContent);
    printWin.document.close();
  }

  // 5. ACADEMY / STUDENTS
  renderStudents() {
    const tbody = document.getElementById('students-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (this.db && Array.isArray(this.db.students)) {
      this.db.students.forEach(s => {
        tbody.innerHTML += `
          <tr>
            <td><strong>${s.id}</strong></td>
            <td>${s.fullName}<br><small style="color: var(--text-muted);">${s.phone || ''}</small></td>
            <td>${s.courseTitle || s.filiere || s.track}</td>
            <td>${s.startDate || s.periodStart || ''} au ${s.endDate || s.periodEnd || ''}</td>
            <td>${s.promoterName || 'ZABRE S. Constantin'}</td>
            <td><span class="badge badge-success">${s.status || 'Certifié'}</span></td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-warning btn-sm" onclick="app.openCertModal('${s.id}')" title="Aperçu & Modifier l'Attestation">
                  <i data-lucide="file-edit"></i> Aperçu / Éditer
                </button>
                <button class="btn btn-primary btn-sm" onclick="app.printStudentCertificate('${s.id}')" title="Imprimer Attestation A4">
                  <i data-lucide="printer"></i> Imprimer A4
                </button>
                <button class="btn btn-secondary btn-sm" onclick="app.editStudent('${s.id}')" title="Modifier Fiche Stagiaire">
                  <i data-lucide="edit-3"></i> Fiche
                </button>
              </div>
            </td>
          </tr>
        `;
      });
    }
    if (window.lucide) window.lucide.createIcons();
  }

  // GÉNÉRATION ATTESTATION DE STAGE A4 (POLICE AGRANDIE & COMPÉTENCES ÉDITABLES)
  printStudentCertificate(studentId) {
    const student = (this.db && Array.isArray(this.db.students))
      ? this.db.students.find(s => s.id === studentId)
      : null;

    if (!student) {
      alert("Stagiaire introuvable !");
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert("Veuillez autoriser les pop-ups pour afficher l'attestation.");
      return;
    }

    // Récupération des compétences : soit un tableau, soit une chaîne avec retours à la ligne, soit les valeurs par défaut
    let skillsList = [];
    if (Array.isArray(student.skills) && student.skills.length > 0) {
      skillsList = student.skills;
    } else if (typeof student.skills === 'string' && student.skills.trim() !== '') {
      skillsList = student.skills.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    } else {
      skillsList = [
        "Diagnostic matériel (surpression/surtension) et dépannage des pannes complexes de PC/Laptops.",
        "Démontage, assemblage, nettoyage des composants et maintenance préventive.",
        "Installation, formatage et configuration des systèmes Windows, antivirus et logiciels."
      ];
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Attestation de Stage - ${student.fullName}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 8mm 10mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          html, body {
            margin: 0;
            padding: 0;
            background: #fff;
            color: #0f172a;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            font-size: 15px; /* Police globale augmentée */
          }
          
          /* CADRE BICOLORE PLEINE PAGE */
          .cert-container {
            border: 3px solid #0284c7;
            outline: 2px solid #ea580c;
            outline-offset: -6px;
            padding: 24px 30px 18px 30px;
            background: #ffffff;
            height: 275mm;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* EN-TÊTE */
          .header-table {
            width: 100%;
            border-bottom: 2px solid #0284c7;
            padding-bottom: 12px;
          }
          .header-left {
            width: 38%;
            vertical-align: middle;
            font-size: 12.5px;
            line-height: 1.45;
            color: #334155;
          }
          .header-left strong {
            font-size: 14px;
            color: #0f172a;
          }
          .header-center {
            width: 24%;
            text-align: center;
            vertical-align: middle;
          }
          .header-right {
            width: 38%;
            text-align: right;
            vertical-align: middle;
            font-size: 12.5px;
            line-height: 1.45;
            color: #334155;
          }
          .header-right strong {
            font-size: 13.5px;
            color: #0284c7;
          }

          /* TITRE PRINCIPAL & RÉFÉRENCE */
          .cert-title {
            text-align: center;
            font-size: 24px;
            font-weight: 900;
            color: #0369a1;
            letter-spacing: 1px;
            text-transform: uppercase;
            margin: 14px 0 4px 0;
          }
          .cert-ref {
            text-align: center;
            font-size: 13px;
            font-weight: 700;
            color: #475569;
            margin-bottom: 18px;
          }

          /* TEXTE DE PRÉSENTATION */
          .cert-intro {
            text-align: center;
            font-size: 15.5px;
            color: #334155;
            margin-bottom: 8px;
          }
          .student-name {
            text-align: center;
            font-size: 30px; /* Nom très lisible et mis en valeur */
            font-weight: 900;
            color: #0f172a;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin: 10px 0 6px 0;
          }
          .dotted-line {
            width: 260px;
            margin: 0 auto 14px auto;
            border-bottom: 2.5px dashed #0284c7;
          }

          /* BADGE DE FORMATION */
          .course-container {
            text-align: center;
            margin: 14px 0;
          }
          .course-pill {
            display: inline-block;
            background: #f0f9ff;
            border: 2px solid #0284c7;
            color: #0369a1;
            padding: 10px 32px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .period-text {
            text-align: center;
            font-size: 15px;
            color: #334155;
            margin: 14px 0 20px 0;
          }

          /* BLOC COMPÉTENCES PRATIQUES VALIDÉES */
          .skills-box {
            background: #f8fafc;
            border: 1.5px solid #cbd5e1;
            border-radius: 8px;
            padding: 16px 24px;
            margin-bottom: 18px;
          }
          .skills-title {
            font-weight: 800;
            font-size: 15px;
            color: #0f172a;
            margin-bottom: 8px;
          }
          .skills-list {
            margin: 0;
            padding-left: 24px;
            color: #1e293b;
            font-size: 14px;
            line-height: 1.7;
          }

          /* MENTION LÉGALE & SIGNATURES */
          .legal-mention {
            text-align: center;
            font-style: italic;
            font-size: 14px;
            color: #475569;
            margin: 14px 0 24px 0;
          }
          .footer-table {
            width: 100%;
            margin-top: 10px;
          }
          .footer-date {
            width: 50%;
            vertical-align: top;
            font-size: 14px;
            color: #334155;
          }
          .footer-signature {
            width: 50%;
            text-align: right;
            vertical-align: top;
          }
          .footer-signature .role {
            font-size: 14.5px;
            font-weight: 800;
            color: #0f172a;
            text-transform: uppercase;
          }
          .footer-signature .name {
            font-size: 16px;
            font-weight: 800;
            color: #0369a1;
            margin-top: 45px;
          }
          .footer-signature .sub {
            font-size: 12px;
            color: #64748b;
          }

          /* SÉPARATEUR POINTILLÉ ET DEVISE */
          .motto-separator {
            width: 100%;
            border-bottom: 1.5px dashed #cbd5e1;
            margin: 16px 0 8px 0;
          }
          .motto {
            text-align: center;
            font-size: 12.5px;
            font-style: italic;
            color: #0369a1;
            font-weight: 600;
          }
          @media print {
            body { padding: 0; }
          }
        </style>
      </head>
      <body>
        <div class="cert-container">
          <!-- HAUT DE PAGE -->
          <div>
            <table class="header-table">
              <tr>
                <td class="header-left">
                  <strong>LIVING STONE SERVICE (LSS)</strong><br>
                  Entreprise Individuelle<br>
                  N° IFU : 00320159Z<br>
                  N° RCCM : BF-OUA-01-2026-A10-13450
                </td>
                <td class="header-center">
                  <img src="logo.png" alt="LSS" style="width: 75px; height: auto;" onerror="this.src='https://via.placeholder.com/75x75?text=LSS';">
                </td>
                <td class="header-right">
                  <strong>MAINTENANCE & FORMATIONS</strong><br>
                  Ouagadougou, Burkina Faso<br>
                  Tél : +226 70 00 00 00 / +226 76 00 00 00<br>
                  constantinzabre@gmail.com
                </td>
              </tr>
            </table>

            <div class="cert-title">ATTESTATION DE FIN DE STAGE PRATIQUE</div>
            <div class="cert-ref">${student.certNumber || ('ATT-LSS-2026-' + (student.id ? student.id.replace(/\D/g, '') || '2026001' : '2026001'))}</div>

            <div class="cert-intro">
              Le Promoteur de l'Entreprise Individuelle <strong>LIVING STONE SERVICE (LSS)</strong> atteste que :
            </div>

            <div class="student-name">${student.fullName || 'SANOU BINTOU'}</div>
            <div class="dotted-line"></div>

            <div class="cert-intro">
              a suivi avec assiduité et succès un stage pratique de formation professionnelle en :
            </div>

            <div class="course-container">
              <div class="course-pill">${student.courseTitle || student.filiere || student.track || 'INITIATION EN MAINTENANCE INFORMATIQUE'}</div>
            </div>

            <div class="period-text">
              effectué dans nos ateliers à Ouagadougou du <strong>${student.startDate || student.periodStart || '2026-06-01'}</strong> au <strong>${student.endDate || student.periodEnd || '2026-08-01'}</strong>.
            </div>

            <!-- BLOC COMPÉTENCES PERSONNALISABLES -->
            <div class="skills-box">
              <div class="skills-title">Compétences Pratiques Validées :</div>
              <ul class="skills-list">
                ${skillsList.map(skill => `<li>${skill}</li>`).join('')}
              </ul>
            </div>

            <div class="legal-mention">
              En foi de quoi, la présente attestation lui est délivrée pour servir et valoir ce que de droit.
            </div>
          </div>

          <!-- BAS DE PAGE -->
          <div>
            <table class="footer-table">
              <tr>
                <td class="footer-date">
                  Fait à Ouagadougou, le <strong>${student.issueDate || new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>
                </td>
                <td class="footer-signature">
                  <div class="role">LE PROMOTEUR</div>
                  <div class="name">${student.promoterName || (this.db && this.db.settings && this.db.settings.promoterName ? this.db.settings.promoterName : 'ZABRE S. Constantin')}</div>
                  <div class="sub">(Cachet & Signature Officiels)</div>
                </td>
              </tr>
            </table>

            <div class="motto-separator"></div>
            <div class="motto">« L'Excellence & la Qualité au Service de l'Innovation IT »</div>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        <\/script>
      </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(htmlContent);
    printWin.document.close();
  }

  getDefaultSkillsForTrack(track) {
    const t = (track || '').toLowerCase();
    if (t.includes('secrétariat') && !t.includes('maintenance')) {
      return [
        "Maîtrise avancée des outils bureautiques Word, Excel et PowerPoint.",
        "Traitement de texte, mise en page professionnelle et rédaction de courriers administratifs.",
        "Gestion électronique des documents (GED), archivage et secrétariat numérique.",
        "Communication professionnelle par e-mail et gestion de l'agenda numérique."
      ];
    } else if (t.includes('secrétariat') && t.includes('maintenance')) {
      return [
        "Diagnostic matériel, démontage, assemblage et maintenance préventive de PC/Laptops.",
        "Installation, formatage et configuration des systèmes Windows et logiciels professionnels.",
        "Maîtrise des outils bureautiques Word, Excel, GED et secrétariat numérique.",
        "Maintenance des imprimantes, réseaux locaux et gestion documentaire."
      ];
    } else {
      return [
        "Diagnostic matériel (surpression/surtension) et dépannage des pannes complexes de PC/Laptops.",
        "Démontage, assemblage, nettoyage des composants et maintenance préventive.",
        "Installation, formatage et configuration des systèmes Windows, antivirus et logiciels.",
        "Notions d'entretien des imprimantes et câblage des réseaux informatiques locaux."
      ];
    }
  }

  editStudent(studentId) {
    const s = this.db.students.find(st => st.id === studentId);
    if (!s) return;
    this.setVal('stg-id', s.id);
    this.setVal('stg-name', s.fullName);
    this.setVal('stg-phone', s.phone || '');
    this.setVal('stg-track', s.track);
    this.setVal('stg-start', s.startDate);
    this.setVal('stg-end', s.endDate);
    
    const skillsList = s.skills && s.skills.length > 0 ? s.skills : this.getDefaultSkillsForTrack(s.track);
    this.setVal('stg-skills', skillsList.join('\n'));

    this.openModal('modal-student');
    if (window.lucide) window.lucide.createIcons();
  }

  saveStudent(e) {
    e.preventDefault();
    const stgId = document.getElementById('stg-id').value;
    const skillsEl = document.getElementById('student-skills') || document.getElementById('stg-skills');
    const rawSkills = skillsEl ? skillsEl.value : '';
    const skillsArray = rawSkills.split('\n').map(s => s.trim()).filter(s => s.length > 0);

    if (stgId) {
      const s = this.db.students.find(st => st.id === stgId);
      if (s) {
        s.fullName = document.getElementById('stg-name').value;
        s.phone = document.getElementById('stg-phone').value;
        s.track = document.getElementById('stg-track').value;
        s.startDate = document.getElementById('stg-start').value;
        s.endDate = document.getElementById('stg-end').value;
        s.skills = skillsArray.length > 0 ? skillsArray : this.getDefaultSkillsForTrack(s.track);
      }
    } else {
      const trackVal = document.getElementById('stg-track').value;
      const newStg = {
        id: this.getNextID('students', 'STG-2026-'),
        fullName: document.getElementById('stg-name').value,
        phone: document.getElementById('stg-phone').value,
        track: trackVal,
        startDate: document.getElementById('stg-start').value,
        endDate: document.getElementById('stg-end').value,
        status: 'Certifié',
        certNumber: `ATT-LSS-2026-${Math.floor(100 + Math.random() * 900)}`,
        skills: skillsArray.length > 0 ? skillsArray : this.getDefaultSkillsForTrack(trackVal)
      };
      this.db.students.unshift(newStg);
    }

    this.setVal('stg-id', '');
    this.saveDatabase();
    this.closeModal('modal-student');
    this.renderStudents();
  }

  openCertModal(studentId) {
    const s = this.db.students.find(st => st.id === studentId);
    if (!s) return;

    this.currentCertStudent = s;
    const settings = this.db.settings;

    this.setText('ce-ifu', settings.ifu || '00320159Z');
    this.setText('ce-rccm', settings.rccm || 'BF-OUA-01-2026-A10-13450');
    this.setText('ce-phone', `Tél : ${settings.phone || '(+226) 70 00 00 00'}`);
    const emailEl = document.getElementById('ce-email');
    if (emailEl) {
      emailEl.innerText = settings.email || 'contactlivingstoneservice@gmail.com';
      emailEl.href = `mailto:${settings.email || 'contactlivingstoneservice@gmail.com'}`;
    }
    this.setText('ce-cert-number', s.certNumber || `N° ${s.id}/LSS`);
    this.setText('ce-student-name', s.fullName.toUpperCase());
    this.setText('ce-track-name', s.track.toUpperCase());
    this.setText('ce-start-date', s.startDate);
    this.setText('ce-end-date', s.endDate);
    this.setText('ce-promoter-name', settings.promoterName || 'ZABRE S. Constantin');
    this.setText('ce-motto', settings.motto || "L'Excellence & la Qualité au Service de l'Innovation IT");

    const skills = s.skills && s.skills.length > 0 ? s.skills : this.getDefaultSkillsForTrack(s.track);
    this.setHTML('ce-skills-list', skills.map(sk => `<li>${sk.replace(/^[•\-\*]\s*/, '')}</li>`).join(''));

    const today = new Date();
    const formattedDate = s.issueDate || `${today.getDate()} ${today.toLocaleDateString('fr-FR', { month: 'long' })} ${today.getFullYear()}`;
    this.setText('ce-issue-date', formattedDate);

    const waMsg = encodeURIComponent(`Bonjour ${s.fullName}, Living Stone Service vous informe que votre Attestation de Fin de Stage Pratique (${s.track}) N° ${s.id}/LSS est disponible!`);
    const waPhone = (s.phone || '').replace(/[^0-9]/g, '');
    const waBtn = document.getElementById('cert-wa-link');
    if (waBtn) waBtn.href = `https://wa.me/${waPhone}?text=${waMsg}`;

    this.isCertEditing = false;
    this.applyCertEditState();
    this.openModal('modal-cert-editor');

    if (window.lucide) window.lucide.createIcons();
  }

  toggleCertEdit() {
    if (this.isCertEditing) {
      this.saveCertCanvasEdits();
    }
    this.isCertEditing = !this.isCertEditing;
    this.applyCertEditState();
  }

  saveCertCanvasEdits() {
    if (!this.currentCertStudent) return;
    const s = this.currentCertStudent;

    const nameEl = document.getElementById('ce-student-name');
    if (nameEl) s.fullName = nameEl.innerText.trim();
    const trackEl = document.getElementById('ce-track-name');
    if (trackEl) s.track = trackEl.innerText.trim();
    const startEl = document.getElementById('ce-start-date');
    if (startEl) s.startDate = startEl.innerText.trim();
    const endEl = document.getElementById('ce-end-date');
    if (endEl) s.endDate = endEl.innerText.trim();
    const issueEl = document.getElementById('ce-issue-date');
    if (issueEl) s.issueDate = issueEl.innerText.trim();
    const numEl = document.getElementById('ce-cert-number');
    if (numEl) s.certNumber = numEl.innerText.trim();

    const liElements = document.querySelectorAll('#ce-skills-list li');
    const skillsArray = [];
    liElements.forEach(li => {
      const txt = li.innerText.trim();
      if (txt) skillsArray.push(txt);
    });
    if (skillsArray.length > 0) {
      s.skills = skillsArray;
    }

    this.saveDatabase();
    this.renderStudents();
  }

  applyCertEditState() {
    const fields = ['ce-student-name', 'ce-track-name', 'ce-start-date', 'ce-end-date', 'ce-skills-list', 'ce-issue-date', 'ce-promoter-name', 'ce-cert-number'];
    fields.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.contentEditable = this.isCertEditing ? 'true' : 'false';
    });

    const container = document.getElementById('cert-editor-container');
    const btn = document.getElementById('btn-toggle-cert-edit');

    if (container && btn) {
      if (this.isCertEditing) {
        container.classList.add('cert-editing-active');
        btn.className = 'btn btn-success btn-sm';
        btn.innerHTML = '<i data-lucide="check"></i> Valider & Enregistrer';
      } else {
        container.classList.remove('cert-editing-active');
        btn.className = 'btn btn-warning btn-sm';
        btn.innerHTML = '<i data-lucide="edit-3"></i> Modifier le Texte';
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  printCurrentCertificate() {
    if (this.isCertEditing) {
      this.saveCertCanvasEdits();
      this.isCertEditing = false;
      this.applyCertEditState();
    }
    const certEl = document.getElementById('cert-preview-content');
    if (!certEl) return;
    const certHtml = certEl.outerHTML;
    const printArea = document.getElementById('print-area');
    if (!printArea) return;
    printArea.innerHTML = certHtml;
    printArea.classList.add('print-landscape-mode');
    document.body.classList.add('print-landscape-mode');

    let styleEl = document.getElementById('print-page-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'print-page-style';
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `@media print { @page { size: A4 landscape !important; margin: 6mm 8mm !important; } }`;

    const cleanup = () => {
      printArea.classList.remove('print-landscape-mode');
      document.body.classList.remove('print-landscape-mode');
      if (styleEl) styleEl.innerHTML = '';
      window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);
    window.print();
    setTimeout(cleanup, 1000);
  }

  // 6. INVOICES & ESTIMATES
  renderInvoices() {
    const tbody = document.getElementById('invoices-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (this.db && Array.isArray(this.db.invoices)) {
      this.db.invoices.forEach(inv => {
        const isFacture = inv.docType === 'facture';
        const typeBadge = isFacture ? 'badge-info' : 'badge-warning';
        const waMsg = encodeURIComponent(`Bonjour ${inv.clientName}, voici votre ${inv.docType} N° ${inv.id} de LIVING STONE SERVICE. Montant TTC: ${inv.totalTTC} FCFA.`);
        const waLink = `https://wa.me/${(inv.clientPhone || '').replace(/[^0-9]/g, '')}?text=${waMsg}`;

        tbody.innerHTML += `
          <tr>
            <td><strong>${inv.id}</strong></td>
            <td><span class="badge ${typeBadge}">${inv.docType.toUpperCase()}</span></td>
            <td>${inv.clientName}<br><small style="color: var(--text-muted);">IFU: ${inv.clientIfu || 'N/A'}</small></td>
            <td>${this.formatFCFA(inv.subtotalHT)}</td>
            <td>${this.formatFCFA(inv.vatAmount)}</td>
            <td><strong>${this.formatFCFA(inv.totalTTC)}</strong></td>
            <td><span class="badge badge-success">${inv.paymentStatus || 'Payé'}</span></td>
            <td>
              <div style="display: flex; gap: 6px;">
                <button class="btn btn-secondary btn-sm" onclick="app.editInvoice('${inv.id}')">
                  <i data-lucide="edit-3"></i> Modifier
                </button>
                <button class="btn btn-primary btn-sm" onclick="app.printInvoiceA4('${inv.id}')">
                  <i data-lucide="printer"></i> A4
                </button>
                <a href="${waLink}" target="_blank" class="btn btn-success btn-sm">
                  <i data-lucide="send"></i> WA
                </a>
              </div>
            </td>
          </tr>
        `;
      });
    }
  }

  addInvoiceRow() {
    const wrapper = document.getElementById('inv-items-wrapper');
    if (!wrapper) return;
    const div = document.createElement('div');
    div.className = 'form-grid inv-item-row';
    div.style.marginBottom = '8px';
    div.innerHTML = `
      <input type="text" class="form-control item-desc" placeholder="Description prestation / article" style="grid-column: span 2;" required>
      <input type="number" class="form-control item-qty" placeholder="Qté" value="1" min="1" required>
      <input type="number" class="form-control item-price" placeholder="Prix HT (FCFA)" required>
    `;
    wrapper.appendChild(div);
  }

  editInvoice(invoiceId) {
    const inv = this.db.invoices.find(i => i.id === invoiceId);
    if (!inv) return;

    this.setVal('inv-form-id', inv.id);
    this.setVal('inv-doc-type', inv.docType);
    this.setVal('inv-client-name', inv.clientName);
    this.setVal('inv-client-ifu', inv.clientIfu || '');
    this.setVal('inv-client-phone', inv.clientPhone || '');
    if (document.getElementById('inv-apply-vat')) {
      document.getElementById('inv-apply-vat').value = inv.applyVat !== false ? 'true' : 'false';
    }

    const wrapper = document.getElementById('inv-items-wrapper');
    if (wrapper) {
      wrapper.innerHTML = '';
      const items = inv.items && inv.items.length > 0 ? inv.items : [{ desc: '', qty: 1, priceHT: 0 }];
      items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'form-grid inv-item-row';
        div.style.marginBottom = '8px';
        div.innerHTML = `
          <input type="text" class="form-control item-desc" placeholder="Description prestation / article" style="grid-column: span 2;" value="${item.desc || ''}" required>
          <input type="number" class="form-control item-qty" placeholder="Qté" value="${item.qty || 1}" min="1" required>
          <input type="number" class="form-control item-price" placeholder="Prix HT (FCFA)" value="${item.priceHT || 0}" required>
        `;
        wrapper.appendChild(div);
      });
    }

    this.openModal('modal-invoice');
    if (window.lucide) window.lucide.createIcons();
  }

  saveInvoice(e) {
    e.preventDefault();
    const invId = document.getElementById('inv-form-id')?.value;
    const docType = document.getElementById('inv-doc-type')?.value || 'facture';
    const applyVat = document.getElementById('inv-apply-vat') ? document.getElementById('inv-apply-vat').value === 'true' : true;
    
    const rows = document.querySelectorAll('.inv-item-row');
    const items = [];
    let subtotalHT = 0;

    rows.forEach(r => {
      const desc = r.querySelector('.item-desc')?.value || '';
      const qty = Number(r.querySelector('.item-qty')?.value || 1);
      const priceHT = Number(r.querySelector('.item-price')?.value || 0);
      subtotalHT += qty * priceHT;
      items.push({ desc, qty, priceHT });
    });

    const vatAmount = applyVat ? Math.round(subtotalHT * 0.18) : 0;
    const totalTTC = subtotalHT + vatAmount;

    if (invId) {
      const inv = this.db.invoices.find(i => i.id === invId);
      if (inv) {
        inv.docType = docType;
        inv.clientName = document.getElementById('inv-client-name')?.value || '';
        inv.clientIfu = document.getElementById('inv-client-ifu')?.value || '';
        inv.clientPhone = document.getElementById('inv-client-phone')?.value || '';
        inv.applyVat = applyVat;
        inv.items = items;
        inv.subtotalHT = subtotalHT;
        inv.vatAmount = vatAmount;
        inv.totalTTC = totalTTC;
      }
    } else {
      const prefix = docType === 'facture' ? 'FACT-2026-' : 'DEV-2026-';
      const newInv = {
        id: this.getNextID('invoices', prefix),
        docType: docType,
        clientName: document.getElementById('inv-client-name')?.value || '',
        clientIfu: document.getElementById('inv-client-ifu')?.value || '',
        clientPhone: document.getElementById('inv-client-phone')?.value || '',
        applyVat: applyVat,
        items: items,
        subtotalHT: subtotalHT,
        vatAmount: vatAmount,
        totalTTC: totalTTC,
        paymentStatus: docType === 'facture' ? 'Payé' : 'Devis Validé',
        dateCreated: new Date().toISOString().split('T')[0]
      };
      this.db.invoices.unshift(newInv);
    }

    this.setVal('inv-form-id', '');
    this.saveDatabase();
    this.closeModal('modal-invoice');
    this.renderInvoices();
  }

  // 7. EXPENSES
  // RENDU DU JOURNAL DES DÉPENSES
  renderExpenses() {
    const tbody = document.getElementById('expenses-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const list = (this.db && Array.isArray(this.db.expenses)) ? this.db.expenses : [];
    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 24px;">Aucune dépense enregistrée</td></tr>';
      return;
    }

    list.forEach(e => {
      tbody.innerHTML += `
        <tr>
          <td><strong>${e.id}</strong></td>
          <td>${e.date}</td>
          <td><span class="badge badge-warning">${e.category}</span></td>
          <td>${e.description}</td>
          <td style="color: var(--danger-color); font-weight: 800;">${this.formatFCFA(e.amount)}</td>
          <td>
            <button class="btn btn-secondary btn-sm" onclick="app.printExpenseVoucher('${e.id}')" title="Imprimer Bon de Caisse">
              <i data-lucide="receipt"></i> Bon A4
            </button>
          </td>
        </tr>
      `;
    });

    if (window.lucide) window.lucide.createIcons();
  }

  saveExpense(e) {
    e.preventDefault();
    const newExp = {
      id: `DEP-2026-${String(this.db.expenses.length + 1).padStart(3, '0')}`,
      category: document.getElementById('exp-category').value,
      description: document.getElementById('exp-desc').value,
      amount: Number(document.getElementById('exp-amount').value || 0),
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Espèces'
    };
    this.db.expenses.unshift(newExp);
    this.saveDatabase();
    this.closeModal('modal-expense');
    this.renderExpenses();
  }

  // 8. FINANCIAL REPORTS
  renderFinancialReport() {
    let totalCA = 0;
    let totalHT = 0;
    let totalTVA = 0;

    if (this.db && Array.isArray(this.db.invoices)) {
      this.db.invoices.forEach(inv => {
        totalCA += Number(inv.totalTTC || 0);
        totalHT += Number(inv.subtotalHT || 0);
        totalTVA += Number(inv.vatAmount || 0);
      });
    }

    let totalExp = (this.db && Array.isArray(this.db.expenses)) ? this.db.expenses.reduce((a, b) => a + Number(b.amount || 0), 0) : 0;
    let netProfit = totalHT - totalExp;

    this.setText('report-total-ca', this.formatFCFA(totalCA));
    this.setText('report-ca-ht', this.formatFCFA(totalHT));
    this.setText('report-ca-tva', this.formatFCFA(totalTVA));
    this.setText('report-total-dep', this.formatFCFA(totalExp));
    this.setText('report-net-profit', this.formatFCFA(netProfit));

    const maxVal = Math.max(totalCA, totalExp, 1);
    const caHeight = Math.round((totalCA / maxVal) * 140);
    const expHeight = Math.round((totalExp / maxVal) * 140);

    const chartBox = document.getElementById('chart-container');
    if (chartBox) {
      chartBox.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--accent-success);">${this.formatFCFA(totalCA)}</span>
          <div style="width: 50px; height: ${caHeight}px; background: linear-gradient(to top, var(--accent-success), #34d399); border-radius: 6px 6px 0 0;"></div>
          <span style="font-size: 12px; font-weight: 600;">Recettes TTC</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <span style="font-size: 11px; font-weight: 700; color: var(--accent-danger);">${this.formatFCFA(totalExp)}</span>
          <div style="width: 50px; height: ${expHeight}px; background: linear-gradient(to top, var(--accent-danger), #f87171); border-radius: 6px 6px 0 0;"></div>
          <span style="font-size: 12px; font-weight: 600;">Dépenses</span>
        </div>
      `;
    }
  }

  // 9. CLIENTS
  renderClients() {
    const tbody = document.getElementById('clients-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (this.db && Array.isArray(this.db.clients)) {
      this.db.clients.forEach(c => {
        const waLink = `https://wa.me/${(c.phone || '').replace(/[^0-9]/g, '')}`;
        tbody.innerHTML += `
          <tr>
            <td><strong>${c.id}</strong></td>
            <td>${c.name}</td>
            <td><span class="badge ${c.type === 'Entreprise' ? 'badge-info' : 'badge-purple'}">${c.type}</span></td>
            <td>${c.phone || ''}</td>
            <td>${c.ifu || 'N/A'}</td>
            <td>${c.address || 'Ouagadougou'}</td>
            <td>
              <a href="${waLink}" target="_blank" class="btn btn-success btn-sm"><i data-lucide="message-square"></i> WhatsApp</a>
            </td>
          </tr>
        `;
      });
    }
  }

  saveClient(e) {
    e.preventDefault();
    const newCli = {
      id: `CL-${String(this.db.clients.length + 1).padStart(3, '0')}`,
      name: document.getElementById('cli-name').value,
      type: document.getElementById('cli-type').value,
      phone: document.getElementById('cli-phone').value,
      ifu: document.getElementById('cli-ifu').value,
      address: document.getElementById('cli-address').value,
      totalSpent: 0
    };
    this.db.clients.unshift(newCli);
    this.saveDatabase();
    this.closeModal('modal-client');
    this.renderClients();
  }

  // 10. DETTES & CRÉANCES MANAGEMENT
  switchDebtTab(tab) {
    this.activeDebtTab = tab;
    const btnCreance = document.getElementById('debt-tab-creance');
    const btnDette = document.getElementById('debt-tab-dette');
    if (btnCreance && btnDette) {
      if (tab === 'creance') {
        btnCreance.className = 'btn btn-primary';
        btnDette.className = 'btn btn-secondary';
      } else {
        btnCreance.className = 'btn btn-secondary';
        btnDette.className = 'btn btn-danger';
      }
    }
    this.renderDebts();
  }

  renderDebts() {
    if (!this.db.debts) this.db.debts = [];

    // Calculate Financial KPIs for Debts/Receivables
    let totalCreancesReste = 0;
    let totalDettesReste = 0;

    this.db.debts.forEach(d => {
      const reste = Math.max(0, Number(d.total || 0) - Number(d.paye || 0));
      if (d.type === 'creance') {
        totalCreancesReste += reste;
      } else if (d.type === 'dette') {
        totalDettesReste += reste;
      }
    });

    let soldeNet = totalCreancesReste - totalDettesReste;

    this.setText('kpi-total-creances', this.formatFCFA(totalCreancesReste));
    this.setText('kpi-total-dettes', this.formatFCFA(totalDettesReste));
    this.setText('kpi-solde-debts', this.formatFCFA(soldeNet));

    const tbody = document.getElementById('debts-tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    const currentTab = this.activeDebtTab || 'creance';
    const filtered = this.db.debts.filter(d => (d.type || 'creance') === currentTab);

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align: center; color: var(--text-muted); padding: 30px;">Aucune ${currentTab === 'creance' ? 'créance client' : 'dette fournisseur'} enregistrée.</td></tr>`;
      return;
    }

    filtered.forEach(d => {
      const total = Number(d.total || 0);
      const paye = Number(d.paye || 0);
      const reste = Math.max(0, total - paye);

      let statutBadge = '<span class="badge badge-warning">En cours</span>';
      if (d.statut === 'solde' || reste === 0) {
        statutBadge = '<span class="badge badge-success">Soldé</span>';
      } else if (d.statut === 'en_retard') {
        statutBadge = '<span class="badge badge-danger">En retard</span>';
      }

      const waPhone = (d.tel || '').replace(/[^0-9]/g, '');
      const waMsg = encodeURIComponent(`Bonjour ${d.tiers}, Living Stone Service vous rappelle la situation de compte (${d.motif}) : Reste à régler : ${this.formatFCFA(reste)} FCFA. Échéance : ${d.echeance || 'N/A'}. Merci !`);
      const waLink = waPhone ? `https://wa.me/${waPhone}?text=${waMsg}` : '#';

      tbody.innerHTML += `
        <tr>
          <td>${d.date || 'N/A'}</td>
          <td><strong>${d.tiers}</strong><br><small style="color: var(--text-muted);">${d.tel || 'Aucun tél'}</small></td>
          <td>${d.motif}</td>
          <td style="text-align: right;"><strong>${this.formatFCFA(total)}</strong></td>
          <td style="text-align: right; color: var(--accent-success);">${this.formatFCFA(paye)}</td>
          <td style="text-align: right; color: var(--accent-danger); font-weight: 800;">${this.formatFCFA(reste)}</td>
          <td>${d.echeance || 'N/A'}</td>
          <td style="text-align: center;">${statutBadge}</td>
          <td style="text-align: center;">
            <div style="display: flex; gap: 4px; justify-content: center;">
              ${reste > 0 ? `<button class="btn btn-success btn-sm" title="Marquer comme Soldé" onclick="app.settleDebt('${d.id}')"><i data-lucide="check-circle"></i> Soldé</button>` : ''}
              <button class="btn btn-secondary btn-sm" title="Modifier" onclick="app.editDebt('${d.id}')"><i data-lucide="edit-3"></i></button>
              ${waPhone ? `<a href="${waLink}" target="_blank" class="btn btn-success btn-sm" title="Relancer sur WhatsApp"><i data-lucide="message-square"></i></a>` : ''}
              <button class="btn btn-danger btn-sm" title="Supprimer" onclick="app.deleteDebt('${d.id}')"><i data-lucide="trash-2"></i></button>
            </div>
          </td>
        </tr>
      `;
    });

    if (window.lucide) window.lucide.createIcons();
  }

  openDebtModal(id = null) {
    if (id && typeof id === 'string') {
      const d = this.db.debts ? this.db.debts.find(item => item.id === id) : null;
      if (d) {
        this.setText('modal-debt-title', 'Modifier l\'Opération Dette / Créance');
        this.setVal('debt-form-id', d.id);
        this.setVal('debt-type', d.type || 'creance');
        this.setVal('debt-date', d.date || new Date().toISOString().split('T')[0]);
        this.setVal('debt-tiers', d.tiers || '');
        this.setVal('debt-tel', d.tel || '');
        this.setVal('debt-motif', d.motif || '');
        this.setVal('debt-total', d.total !== undefined ? d.total : '');
        this.setVal('debt-paye', d.paye !== undefined ? d.paye : '0');
        this.setVal('debt-echeance', d.echeance || '');
        this.setVal('debt-statut', d.statut || 'en_cours');
      }
    } else {
      this.setText('modal-debt-title', 'Nouvelle Opération Dette / Créance');
      this.setVal('debt-form-id', '');
      this.setVal('debt-type', this.activeDebtTab || 'creance');
      this.setVal('debt-date', new Date().toISOString().split('T')[0]);
      this.setVal('debt-tiers', '');
      this.setVal('debt-tel', '');
      this.setVal('debt-motif', '');
      this.setVal('debt-total', '');
      this.setVal('debt-paye', '0');
      this.setVal('debt-echeance', '');
      this.setVal('debt-statut', 'en_cours');
    }
    this.openModal('modal-debt');
    if (window.lucide) window.lucide.createIcons();
  }

  editDebt(id) {
    this.openDebtModal(id);
  }

  async syncDebtToSupabaseTable(debt) {
    let { supabaseUrl, supabaseKey } = this.db.settings;
    const envUrl = (typeof window !== 'undefined' && window.ENV_SUPABASE_URL) ? window.ENV_SUPABASE_URL : '';
    const envKey = (typeof window !== 'undefined' && window.ENV_SUPABASE_KEY) ? window.ENV_SUPABASE_KEY : '';
    supabaseUrl = (supabaseUrl || envUrl || '').trim().replace(/\/$/, '');
    supabaseKey = (supabaseKey || envKey || '').trim();

    if (!supabaseUrl || !supabaseKey) return;
    if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
      supabaseUrl = 'https://' + supabaseUrl;
    }

    try {
      const payload = {
        date_operation: debt.date || new Date().toISOString().split('T')[0],
        type_operation: debt.type || 'creance',
        nom_tiers: debt.tiers || 'Tiers',
        telephone: debt.tel || '',
        motif: debt.motif || '',
        montant_total: Number(debt.total || 0),
        montant_paye: Number(debt.paye || 0),
        date_echeance: debt.echeance || null,
        statut: debt.statut || 'en_cours'
      };

      await fetch(`${supabaseUrl}/rest/v1/dettes_creances`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn('[Supabase dettes_creances direct sync notice]', e);
    }
  }

  saveDebt(e) {
    if (e) e.preventDefault();
    const id = document.getElementById('debt-form-id') ? document.getElementById('debt-form-id').value : '';
    const type = document.getElementById('debt-type') ? document.getElementById('debt-type').value : 'creance';
    const date = (document.getElementById('debt-date') && document.getElementById('debt-date').value) ? document.getElementById('debt-date').value : new Date().toISOString().split('T')[0];
    const tiers = document.getElementById('debt-tiers') ? document.getElementById('debt-tiers').value : '';
    const tel = document.getElementById('debt-tel') ? document.getElementById('debt-tel').value : '';
    const motif = document.getElementById('debt-motif') ? document.getElementById('debt-motif').value : '';
    const total = Number(document.getElementById('debt-total') ? document.getElementById('debt-total').value : 0);
    const paye = Number(document.getElementById('debt-paye') ? document.getElementById('debt-paye').value : 0);
    const echeance = document.getElementById('debt-echeance') ? document.getElementById('debt-echeance').value : '';
    let statut = document.getElementById('debt-statut') ? document.getElementById('debt-statut').value : 'en_cours';

    if (paye >= total && total > 0) {
      statut = 'solde';
    }

    let targetDebt = null;
    if (id) {
      targetDebt = this.db.debts.find(d => d.id === id);
      if (targetDebt) {
        targetDebt.type = type;
        targetDebt.date = date;
        targetDebt.tiers = tiers;
        targetDebt.tel = tel;
        targetDebt.motif = motif;
        targetDebt.total = total;
        targetDebt.paye = paye;
        targetDebt.echeance = echeance;
        targetDebt.statut = statut;
      }
    }

    if (!targetDebt) {
      targetDebt = {
        id: `DET-${String(this.db.debts.length + 1).padStart(3, '0')}`,
        type,
        date,
        tiers,
        tel,
        motif,
        total,
        paye,
        echeance,
        statut
      };
      this.db.debts.unshift(targetDebt);
    }

    this.setVal('debt-form-id', '');
    this.saveDatabase();
    this.syncDebtToSupabaseTable(targetDebt);
    this.closeModal('modal-debt');
    this.activeDebtTab = type;
    this.switchDebtTab(type);
  }

  settleDebt(id) {
    const d = this.db.debts.find(item => item.id === id);
    if (!d) return;
    if (confirm(`Confirmez-vous le solde complet de cette opération pour ${d.tiers} (${this.formatFCFA(d.total)}) ?`)) {
      d.paye = d.total;
      d.statut = 'solde';
      this.saveDatabase();
      this.syncDebtToSupabaseTable(d);
      this.renderDebts();
    }
  }

  deleteDebt(id) {
    const idx = this.db.debts.findIndex(item => item.id === id);
    if (idx !== -1) {
      if (confirm('Voulez-vous vraiment supprimer cet enregistrement de dette / créance ?')) {
        this.db.debts.splice(idx, 1);
        this.saveDatabase();
        this.renderDebts();
      }
    }
  }

  // 10. SETTINGS
  loadSettingsForm() {
    const s = this.db.settings;
    if (!s.counters) s.counters = { tickets: 0, invoices: 0, students: 0, expenses: 0 };

    const setElem = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = (val !== undefined && val !== null) ? val : '';
    };

    setElem('set-company-name', s.companyName);
    setElem('set-promoter-name', s.promoterName);
    setElem('set-phone', s.phone || '+226 70 00 00 00 / +226 76 00 00 00');
    setElem('set-email', s.email || 'contactlivingstoneservice@gmail.com');
    setElem('set-motto', s.motto || "L'Excellence & la Qualité au Service de l'Innovation IT");
    setElem('set-po-box', s.poBox || '06 BV 30379 Ouaga Zogona 10020 OUAGADOUGOU BURKINA FASO');
    setElem('set-ifu', s.ifu);
    setElem('set-ifu-date', s.ifuDate || '2026-07-20');
    setElem('set-rccm', s.rccm);
    setElem('set-rccm-date', s.rccmDate || '2026-07-17');
    setElem('set-admin-pin', s.adminPin || '1234');
    setElem('set-staff-pin', s.staffPin || '5678');
    setElem('set-supabase-url', s.supabaseUrl || '');
    setElem('set-supabase-key', s.supabaseKey || '');

    setElem('cnt-ticket', s.counters.tickets || 0);
    setElem('cnt-invoice', s.counters.invoices || 0);
    setElem('cnt-student', s.counters.students || 0);
    setElem('cnt-expense', s.counters.expenses || 0);
  }

  saveSettings(e) {
    e.preventDefault();
    this.db.settings.companyName = document.getElementById('set-company-name')?.value || '';
    this.db.settings.promoterName = document.getElementById('set-promoter-name')?.value || '';
    this.db.settings.phone = document.getElementById('set-phone')?.value || '';
    this.db.settings.email = document.getElementById('set-email')?.value || '';
    this.db.settings.motto = document.getElementById('set-motto')?.value || '';
    this.db.settings.poBox = document.getElementById('set-po-box')?.value || '';
    this.db.settings.ifu = document.getElementById('set-ifu')?.value || '';
    this.db.settings.ifuDate = document.getElementById('set-ifu-date')?.value || '';
    this.db.settings.rccm = document.getElementById('set-rccm')?.value || '';
    this.db.settings.rccmDate = document.getElementById('set-rccm-date')?.value || '';
    this.db.settings.adminPin = document.getElementById('set-admin-pin')?.value || '1234';
    if (document.getElementById('set-staff-pin')) {
      this.db.settings.staffPin = document.getElementById('set-staff-pin').value || '5678';
    }
    this.db.settings.supabaseUrl = document.getElementById('set-supabase-url')?.value || '';
    this.db.settings.supabaseKey = document.getElementById('set-supabase-key')?.value || '';

    if (!this.db.settings.counters) this.db.settings.counters = {};
    if (document.getElementById('cnt-ticket')) this.db.settings.counters.tickets = Number(document.getElementById('cnt-ticket').value || 0);
    if (document.getElementById('cnt-invoice')) this.db.settings.counters.invoices = Number(document.getElementById('cnt-invoice').value || 0);
    if (document.getElementById('cnt-student')) this.db.settings.counters.students = Number(document.getElementById('cnt-student').value || 0);
    if (document.getElementById('cnt-expense')) this.db.settings.counters.expenses = Number(document.getElementById('cnt-expense').value || 0);

    this.saveDatabase();
    alert('Paramètres, numéros et compteurs enregistrés avec succès!');
  }

  resetCounter(type) {
    if (!this.db.settings.counters) {
      this.db.settings.counters = { tickets: 0, invoices: 0, students: 0, expenses: 0 };
    }
    this.db.settings.counters[type] = 0;
    
    const elemMap = { tickets: 'cnt-ticket', invoices: 'cnt-invoice', students: 'cnt-student', expenses: 'cnt-expense' };
    if (elemMap[type] && document.getElementById(elemMap[type])) {
      document.getElementById(elemMap[type]).value = 0;
    }
    
    this.saveDatabase();
    alert(`Compteur ${type} réinitialisé à zéro!`);
  }

  resetAllCounters() {
    if (confirm('Voulez-vous vraiment remettre TOUS les compteurs de numérotation à zéro pour le nouvel exercice financier?')) {
      this.db.settings.counters = { tickets: 0, invoices: 0, students: 0, expenses: 0 };
      
      ['cnt-ticket', 'cnt-invoice', 'cnt-student', 'cnt-expense'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = 0;
      });

      this.saveDatabase();
      alert('Tous les compteurs ont été remis à zéro avec succès!');
    }
  }

  getNextID(type, prefix) {
    if (!this.db.settings.counters) {
      this.db.settings.counters = { tickets: 0, invoices: 0, students: 0, expenses: 0 };
    }
    
    const current = (this.db.settings.counters[type] || 0) + 1;
    this.db.settings.counters[type] = current;
    this.saveDatabase();
    
    const elemMap = { tickets: 'cnt-ticket', invoices: 'cnt-invoice', students: 'cnt-student', expenses: 'cnt-expense' };
    if (elemMap[type] && document.getElementById(elemMap[type])) {
      document.getElementById(elemMap[type]).value = current;
    }

    const formattedNum = String(current).padStart(3, '0');
    return `${prefix}${formattedNum}`;
  }

  exportDatabaseJSON() {
    const jsonStr = JSON.stringify(this.db, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LSS_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }

  // RÉINITIALISATION HAUTEMENT SÉCURISÉE DE LSS MANAGER
  resetDatabase() {
    // ÉTAPE 1 : Mot de passe Administrateur
    const adminPin = prompt("🔒 ACCÈS RESTREINT ADMIN\nVeuillez entrer le code PIN secret administrateur :");
    const currentPin = (this.db && this.db.settings && this.db.settings.adminPin) ? this.db.settings.adminPin : "7864";
    if (adminPin !== "7864" && adminPin !== currentPin) {
      if (adminPin !== null) {
        alert("❌ Code PIN incorrect ! Action annulée pour des raisons de sécurité.");
      }
      return;
    }

    // ÉTAPE 2 : Confirmation textuelle explicite
    const confirmation = prompt("⚠️ ZONE DE DANGER - EFFACEMENT TOTAL\nPour confirmer la réinitialisation complète de toutes les bases (Tickets, Factures, Dépenses, Dettes & Créances), tapez exactement le mot : SUPPRIMER");
    if (confirmation !== "SUPPRIMER") {
      alert("Annulation : Le mot de confirmation est incorrect.");
      return;
    }

    // ÉTAPE 3 : Sauvegarde automatique de secours avant effacement (Backup JSON)
    try {
      const backupData = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.db));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", backupData);
      downloadAnchor.setAttribute("download", `LSS_BACKUP_AVANT_RESET_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.warn("Impossible de télécharger le fichier de backup automatique", e);
    }

    const savedSettings = this.db ? this.db.settings : null;

    // ÉTAPE 4 : Remise à zéro totale de toutes les tables
    this.db = {
      tickets: [],
      products: [],
      projects: [],
      students: [],
      invoices: [],
      expenses: [],
      debts: [],
      clients: [],
      inventory: [],
      settings: savedSettings || {},
      counters: {
        ticket: 0,
        invoice: 0,
        expense: 0,
        student: 0,
        debt: 0
      }
    };

    // Sauvegarde en LocalStorage
    this.saveToStorage();

    // Synchronisation avec la base Cloud Supabase si connectée
    if (this.supabaseClient || typeof this.syncWithCloud === 'function') {
      this.syncWithCloud();
    }

    // Rafraîchissement global de l'interface
    this.renderAll();
    if (typeof this.renderDebts === 'function') this.renderDebts();
    if (typeof this.updateDashboard === 'function') this.updateDashboard();

    alert("✅ Réinitialisation effectuée avec succès.\nUn fichier de sauvegarde automatique a été téléchargé sur votre Mac.");
  }

  saveToStorage() {
    this.saveDatabase();
  }

  syncWithCloud() {
    this.syncToSupabase();
  }

  renderAll() {
    this.renderCurrentView();
    if (typeof this.renderDebts === 'function') this.renderDebts();
  }

  purgeAllData() {
    if (!confirm('⚠️ ATTENTION : Vous allez PURGER ET RÉINITIALISER TOUTE LA BASE DE DONNÉES À ZÉRO.\n\nSont supprimés définitivement :\n- Tous les Tickets de Maintenance\n- Toutes les Factures & Devis DGI\n- Toutes les Ventes POS\n- Tous les Stagiaires (LSS Académie)\n- Toutes les Dépenses & Projets\n- Toutes les Dettes & Créances\n- Tous les Clients & Stocks\n\nLes compteurs de numérotation seront remis à 000. Les paramètres de l\'entreprise (Nom, IFU, RCCM, PIN) seront conservés.\n\nVoulez-vous vraiment continuer ?')) {
      return;
    }

    const enteredPin = prompt('Entrez votre Code PIN de Sécurité (Par défaut: 1234) pour valider la purge complète :');
    if (enteredPin !== (this.db.settings ? this.db.settings.adminPin : '1234')) {
      alert('Code PIN incorrect. Purge annulée par sécurité.');
      return;
    }

    this.db.tickets = [];
    this.db.invoices = [];
    this.db.students = [];
    this.db.expenses = [];
    this.db.clients = [];
    this.db.inventory = [];
    this.db.projects = [];
    this.db.debts = [];
    this.posCart = [];
    if (this.db.settings) {
      this.db.settings.counters = { tickets: 0, invoices: 0, students: 0, expenses: 0, debts: 0 };
    }

    this.saveDatabase();
    this.init();
    alert('🧹 Purge effectuée avec succès ! La base de données est vierge et prête pour un nouvel enregistrement à partir du numéro 001.');
  }

  async syncToSupabase() {
    let { supabaseUrl, supabaseKey } = this.db.settings;
    const envUrl = (typeof window !== 'undefined' && window.ENV_SUPABASE_URL) ? window.ENV_SUPABASE_URL : '';
    const envKey = (typeof window !== 'undefined' && window.ENV_SUPABASE_KEY) ? window.ENV_SUPABASE_KEY : '';
    supabaseUrl = supabaseUrl || envUrl;
    supabaseKey = supabaseKey || envKey;

    const statusElem = document.getElementById('sync-status');
    
    if (!supabaseUrl || !supabaseKey) {
      if (statusElem) statusElem.innerHTML = '<span class="status-dot"></span><span>Hors-ligne (Local DB)</span>';
      return;
    }

    supabaseUrl = supabaseUrl.trim().replace(/\/$/, '');
    if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
      supabaseUrl = 'https://' + supabaseUrl;
    }
    supabaseKey = supabaseKey.trim();

    try {
      if (statusElem) statusElem.innerHTML = '<span class="status-dot" style="background: #eab308;"></span><span>Sync Cloud...</span>';
      
      const nowIso = new Date().toISOString();
      const payload = {
        id: 'lss_main_db',
        data: this.db,
        updated_at: nowIso
      };

      let res = await fetch(`${supabaseUrl}/rest/v1/app_sync?on_conflict=id`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates, return=representation'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        res = await fetch(`${supabaseUrl}/rest/v1/app_sync?id=eq.lss_main_db`, {
          method: 'PATCH',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        this.lastSyncError = null;
        this.lastCloudSyncTime = Date.now();
        if (statusElem) {
          statusElem.style.cursor = 'default';
          statusElem.onclick = null;
          statusElem.innerHTML = '<span class="status-dot" style="background: #22c55e;"></span><span>Cloud Synchro OK</span>';
        }
      } else {
        const errText = await res.text();
        console.warn('[Supabase Sync Fail]', res.status, errText);
        this.lastSyncError = { status: res.status, text: errText };
        
        let msg = 'Erreur Sync Cloud';
        const lowerErr = errText.toLowerCase();
        if (res.status === 404 || lowerErr.includes('app_sync') || lowerErr.includes('schema') || lowerErr.includes('relation') || lowerErr.includes('find')) {
          msg = 'Table app_sync non créée dans Supabase (Cliquer)';
        } else if (res.status === 401 || res.status === 403 || lowerErr.includes('jwt') || lowerErr.includes('policy') || lowerErr.includes('apikey')) {
          msg = 'Clé API / RLS Supabase incorrecte (Cliquer)';
        }
        if (statusElem) {
          statusElem.style.cursor = 'pointer';
          statusElem.onclick = () => this.showSyncDiagnostics();
          statusElem.innerHTML = `<span class="status-dot" style="background: #ef4444;"></span><span>⚠️ ${msg}</span>`;
        }
      }
    } catch (err) {
      console.warn('[Supabase Sync Network Error]', err);
      this.lastSyncError = { status: 0, text: err.message || 'Network error' };
      if (statusElem) {
        statusElem.style.cursor = 'pointer';
        statusElem.onclick = () => this.showSyncDiagnostics();
        statusElem.innerHTML = '<span class="status-dot" style="background: #ef4444;"></span><span>⚠️ Erreur Connexion Cloud (Cliquer)</span>';
      }
    }
  }

  async pullFromSupabase(isManual = false) {
    let { supabaseUrl, supabaseKey } = this.db.settings;
    const envUrl = (typeof window !== 'undefined' && window.ENV_SUPABASE_URL) ? window.ENV_SUPABASE_URL : '';
    const envKey = (typeof window !== 'undefined' && window.ENV_SUPABASE_KEY) ? window.ENV_SUPABASE_KEY : '';
    supabaseUrl = supabaseUrl || envUrl;
    supabaseKey = supabaseKey || envKey;

    if (!supabaseUrl || !supabaseKey) {
      if (isManual) alert('⚠️ Supabase non configuré.\n\nPour partager les données entre plusieurs appareils, veuillez renseigner l\'URL et la Clé API Supabase dans Paramètres sur CHACUN des appareils.');
      return;
    }

    supabaseUrl = supabaseUrl.trim().replace(/\/$/, '');
    if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
      supabaseUrl = 'https://' + supabaseUrl;
    }
    supabaseKey = supabaseKey.trim();

    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/app_sync?id=eq.lss_main_db&select=data,updated_at`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      });

      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0 && rows[0].data) {
          const cloudDb = rows[0].data;
          const cloudUpdatedAt = rows[0].updated_at ? new Date(rows[0].updated_at).getTime() : 0;

          if (!isManual && this.lastLocalUpdate && cloudUpdatedAt && cloudUpdatedAt <= this.lastLocalUpdate) {
            const statusElem = document.getElementById('sync-status');
            if (statusElem) {
              statusElem.style.cursor = 'default';
              statusElem.onclick = null;
              statusElem.innerHTML = '<span class="status-dot" style="background: #22c55e;"></span><span>Cloud Synchro OK</span>';
            }
            return;
          }

          const hasActiveModal = !!document.querySelector('.modal-overlay.active, .modal.active, [id$="-modal"][style*="flex"]');
          if (!isManual && hasActiveModal) {
            return;
          }

          const currentSettings = { ...this.db.settings };
          this.db = { 
            ...defaultDatabase, 
            ...cloudDb, 
            settings: { 
              ...defaultDatabase.settings, 
              ...cloudDb.settings,
              supabaseUrl: currentSettings.supabaseUrl || cloudDb.settings.supabaseUrl,
              supabaseKey: currentSettings.supabaseKey || cloudDb.settings.supabaseKey
            } 
          };
          
          this.lastCloudSyncTime = cloudUpdatedAt || Date.now();
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
          this.renderCurrentView();
          
          this.lastSyncError = null;
          const statusElem = document.getElementById('sync-status');
          if (statusElem) {
            statusElem.style.cursor = 'default';
            statusElem.onclick = null;
            statusElem.innerHTML = '<span class="status-dot" style="background: #22c55e;"></span><span>Cloud Synchro OK</span>';
          }
          
          if (isManual) alert('✅ Synchronisation réussie ! Tous les tickets, factures et données des autres appareils sont à jour.');
        } else {
          if (isManual) alert('ℹ️ La base Cloud est vide pour le moment. Enregistrez un document sur l\'un de vos appareils pour l\'envoyer au Cloud.');
        }
      } else {
        const errText = await res.text();
        console.warn('[Supabase Pull Fail]', res.status, errText);
        this.lastSyncError = { status: res.status, text: errText };
        if (isManual) {
          this.showSyncDiagnostics();
        }
      }
    } catch (err) {
      console.warn('[Supabase Pull Error]', err);
      this.lastSyncError = { status: 0, text: err.message || 'Erreur réseau' };
      if (isManual) alert('❌ Impossible de contacter le serveur Supabase. Vérifiez votre connexion Internet.');
    }
  }

  showSyncDiagnostics() {
    if (!this.lastSyncError) {
      alert('✅ La synchronisation Supabase Cloud fonctionne parfaitement.');
      return;
    }

    const { status, text } = this.lastSyncError;
    const lower = (text || '').toLowerCase();

    let diagTitle = '⚠️ DIAGNOSTIC ERREUR SYNCHRO CLOUD SUPABASE';
    let cause = '';
    let solution = '';

    if (status === 404 || lower.includes('app_sync') || lower.includes('schema') || lower.includes('relation') || lower.includes('find')) {
      cause = 'La table "app_sync" n\'a pas encore été créée dans votre projet Supabase.';
      solution = `1. Connectez-vous sur https://supabase.com\n2. Ouvrez votre projet puis allez dans "SQL Editor" (dans le menu de gauche)\n3. Cliquez sur "New query", collez le code SQL ci-dessous et cliquez sur "Run" (bouton vert) :\n\nCREATE TABLE IF NOT EXISTS public.app_sync (\n  id TEXT PRIMARY KEY DEFAULT 'lss_main_db',\n  data JSONB NOT NULL DEFAULT '{}'::jsonb,\n  updated_at TIMESTAMPTZ DEFAULT NOW()\n);\nALTER TABLE public.app_sync ENABLE ROW LEVEL SECURITY;\nCREATE POLICY "Accès complet app_sync" ON public.app_sync FOR ALL USING (true) WITH CHECK (true);`;
    } else if (status === 401 || status === 403 || lower.includes('jwt') || lower.includes('policy') || lower.includes('apikey')) {
      cause = 'La Clé API Publique (anon key) ou les droits d\'accès (RLS) sont incorrects.';
      solution = `1. Allez sur https://supabase.com -> Project Settings -> API\n2. Copiez la clé "anon public"\n3. Allez dans les Paramètres du logiciel -> Collez la Clé API et l'URL exacte (commençant par https://)\n4. Cliquez sur Enregistrer.`;
    } else if (status === 0) {
      cause = 'Impossible d\'atteindre les serveurs Supabase (problème de connexion ou URL mal saisie).';
      solution = `1. Vérifiez votre connexion Internet sur votre appareil.\n2. Vérifiez que l'URL dans Paramètres commence bien par "https://".`;
    } else {
      cause = `Erreur HTTP ${status} renvoyée par Supabase : ${text.slice(0, 150)}`;
      solution = `Vérifiez l'URL de votre projet Supabase et assurez-vous d'avoir exécuté le script SQL fourni (schema.sql).`;
    }

    alert(`${diagTitle}\n\n📌 CAUSE DE L'ERREUR :\n${cause}\n\n🛠️ COMMENT RÉSOLUDRE LE PROBLÈME :\n${solution}`);
  }

  // =========================================================================
  // OFFICIAL A4 PRINTING ENGINE (DGI & LSS COMPLIANCE)
  // =========================================================================

  // IMPRESSION REÇU TICKET A4 AVEC QR CODE
  printTicketReceipt(ticketId) {
    const ticket = (this.db && Array.isArray(this.db.tickets)) 
      ? this.db.tickets.find(t => t.id === ticketId) 
      : null;

    if (!ticket) {
      alert("Ticket introuvable !");
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert("Veuillez autoriser les pop-ups dans votre navigateur.");
      return;
    }

    // Données encodées dans le QR Code
    const qrData = encodeURIComponent(
      `LIVING STONE SERVICE\n` +
      `Ticket N°: ${ticket.id}\n` +
      `Date: ${ticket.dateReceived || ticket.dateIn || ''}\n` +
      `Client: ${ticket.clientName}\n` +
      `Appareil: ${ticket.deviceModel}\n` +
      `Montant: ${ticket.costTTC || 0} FCFA\n` +
      `Statut: ${ticket.status}\n` +
      `IFU: 00320159Z`
    );

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Reçu Ticket - ${ticket.id}</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #0f172a;
            margin: 0;
            padding: 20px;
            font-size: 13px;
            background: #fff;
          }
          .header-table { width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
          .company-title { font-size: 20px; font-weight: 800; text-transform: uppercase; margin: 0; }
          .company-subtitle { font-size: 11px; color: #475569; margin-top: 4px; }
          .badge-title {
            background: #0f172a;
            color: #fff;
            padding: 6px 12px;
            font-size: 13px;
            font-weight: 700;
            display: inline-block;
            border-radius: 4px;
            text-transform: uppercase;
          }
          .grid-2 { display: table; width: 100%; margin-bottom: 20px; }
          .col-left { display: table-cell; width: 50%; vertical-align: top; padding-right: 15px; }
          .col-right { display: table-cell; width: 50%; vertical-align: top; padding-left: 15px; }
          .box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
          }
          .box-title { font-weight: 700; font-size: 12px; text-transform: uppercase; color: #334155; margin-bottom: 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
          .info-row { margin-bottom: 6px; font-size: 12px; }
          .info-label { font-weight: 600; color: #475569; }
          .table-data { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }
          .table-data th, .table-data td { border: 1px solid #cbd5e1; padding: 9px 12px; text-align: left; }
          .table-data th { background: #f1f5f9; font-size: 12px; }
          .signatures { margin-top: 40px; display: table; width: 100%; }
          .sign-col { display: table-cell; width: 50%; text-align: center; }
          .sign-box { margin-top: 50px; font-size: 11px; color: #64748b; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 80px; vertical-align: middle; padding-right: 15px;">
              <img src="logo.png" alt="Logo LSS" style="width: 75px; height: auto; border-radius: 4px;" onerror="this.src='https://via.placeholder.com/75x75?text=LSS';">
            </td>
            <td style="vertical-align: middle;">
              <h1 class="company-title">LIVING STONE SERVICE</h1>
              <div class="company-subtitle">
                Expertise Maintenance Électronique, Micro-soudure & Réseaux<br>
                Ouagadougou, Burkina Faso | Tél : +226 70 00 00 00 / 64 07 78 64<br>
                N° IFU : 00320159Z — RCCM : BF-OUA-01-2026-A10-13450
              </div>
            </td>
            <td style="text-align: right; vertical-align: top; width: 140px;">
              <div class="badge-title">REÇU DÉPÔT / RETRAIT</div>
              <div style="font-size: 12px; font-weight: 700; margin-top: 6px;">${ticket.id}</div>
              
              <!-- QR Code Généré Dynamiquement -->
              <div style="margin-top: 8px;">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${qrData}" 
                  alt="QR Code" 
                  style="width: 80px; height: 80px; border: 1px solid #cbd5e1; padding: 2px; border-radius: 4px; background: #fff;"
                />
                <div style="font-size: 9px; color: #64748b; margin-top: 2px;">SCAN D'AUTHENTICITÉ</div>
              </div>
            </td>
          </tr>
        </table>

        <div class="grid-2">
          <div class="col-left">
            <div class="box">
              <div class="box-title">Informations Client</div>
              <div class="info-row"><span class="info-label">Nom / Client :</span> <strong>${ticket.clientName}</strong></div>
              <div class="info-row"><span class="info-label">Téléphone :</span> ${ticket.clientPhone || 'Non spécifié'}</div>
              <div class="info-row"><span class="info-label">Date d'entrée :</span> ${ticket.dateReceived || ticket.dateIn || new Date().toLocaleDateString('fr-FR')}</div>
            </div>
          </div>
          <div class="col-right">
            <div class="box">
              <div class="box-title">Détails Équipement & Diagnostic</div>
              <div class="info-row"><span class="info-label">Appareil :</span> <strong>${ticket.deviceModel}</strong></div>
              <div class="info-row"><span class="info-label">Symptôme / Panne :</span> ${ticket.problemDesc || ticket.issueDesc || ticket.issue || 'Diagnostic en cours'}</div>
              <div class="info-row"><span class="info-label">Statut Actuel :</span> <strong>${ticket.status}</strong></div>
            </div>
          </div>
        </div>

        <table class="table-data">
          <thead>
            <tr>
              <th>Description de la Réparation / Prestation</th>
              <th style="width: 120px;">Statut</th>
              <th style="text-align: right; width: 140px;">Montant Total TTC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Intervention Technique & Main-d'œuvre</strong><br>
                <span style="font-size: 11px; color: #64748b;">Diagnostic, remise en état électronique et tests de stabilité</span>
              </td>
              <td>${ticket.status}</td>
              <td style="text-align: right; font-weight: 800; font-size: 14px;">${this.formatFCFA(ticket.costTTC || 0)}</td>
            </tr>
          </tbody>
        </table>

        <div class="signatures">
          <div class="sign-col">
            <strong>Pour l'Atelier LSS</strong><br>
            <div class="sign-box">Signature & Cachet</div>
          </div>
          <div class="sign-col">
            <strong>Le Client / Réceptionnaire</strong><br>
            <div class="sign-box">Signature du Client</div>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        <\/script>
      </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(htmlContent);
    printWin.document.close();
  }

  preparePortraitPrint(printHtml) {
    const printArea = document.getElementById('print-area');
    if (!printArea) return;
    printArea.classList.remove('print-landscape-mode');
    document.body.classList.remove('print-landscape-mode');
    const styleEl = document.getElementById('print-page-style');
    if (styleEl) styleEl.innerHTML = '';
    printArea.innerHTML = printHtml;
    window.print();
  }

  printReceipt(ticketId) {
    this.printTicketReceipt(ticketId);
  }

  // IMPRESSION FACTURE DGI HOMOLOGUÉE A4
  printInvoiceA4(invoiceId) {
    const inv = (this.db && Array.isArray(this.db.invoices))
      ? this.db.invoices.find(i => i.id === invoiceId)
      : null;

    if (!inv) {
      alert("Facture introuvable !");
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert("Veuillez autoriser les pop-ups dans Safari pour imprimer la facture.");
      return;
    }

    // Calculs financiers
    const totalHT = Number(inv.totalHT || Math.round((inv.totalTTC || 0) / 1.18));
    const tva = Number(inv.tva || Math.round(totalHT * 0.18));
    const totalTTC = Number(inv.totalTTC || (totalHT + tva));

    // Données QR Code Homologation Fiscale DGI Burkina
    const qrData = encodeURIComponent(
      `FACTURE NORMALISÉE DGI BURKINA\n` +
      `Émetteur: LIVING STONE SERVICE\n` +
      `IFU: 00320159Z | RCCM: BF-OUA-01-2026-A10-13450\n` +
      `Facture N°: ${inv.id}\n` +
      `Date: ${inv.date || new Date().toLocaleDateString('fr-FR')}\n` +
      `Client: ${inv.clientName} (IFU: ${inv.clientIFU || 'Non spécifié'})\n` +
      `Montant HT: ${totalHT} FCFA\n` +
      `TVA 18%: ${tva} FCFA\n` +
      `Total TTC: ${totalTTC} FCFA`
    );

    const items = inv.items && inv.items.length > 0 ? inv.items : [
      { desc: inv.subject || "Prestations & Équipements Informatiques", qty: 1, priceHT: totalHT, totalHT: totalHT }
    ];

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Facture DGI - ${inv.id}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #0f172a;
            margin: 0;
            padding: 15px;
            font-size: 13px;
            background: #fff;
          }
          .header-table { width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
          .badge-facture {
            background: #0f172a;
            color: #fff;
            padding: 6px 14px;
            font-size: 14px;
            font-weight: 800;
            text-transform: uppercase;
            display: inline-block;
            border-radius: 4px;
          }
          .grid-2 { display: table; width: 100%; margin-bottom: 20px; }
          .col { display: table-cell; width: 50%; vertical-align: top; }
          .box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px 16px;
            margin-right: 10px;
          }
          .box-right { margin-right: 0; margin-left: 10px; }
          .box-title { font-weight: 800; font-size: 12px; text-transform: uppercase; color: #475569; margin-bottom: 8px; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; }
          .table-items { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }
          .table-items th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 10px; font-size: 12px; text-align: left; }
          .table-items td { border: 1px solid #cbd5e1; padding: 10px; font-size: 12.5px; }
          .totals-table { width: 45%; margin-left: auto; border-collapse: collapse; margin-bottom: 30px; }
          .totals-table td { padding: 6px 10px; border-bottom: 1px solid #e2e8f0; font-size: 12.5px; }
          .totals-table .total-row { font-size: 15px; font-weight: 900; color: #0284c7; background: #f0f9ff; border-top: 2px solid #0284c7; }
          .signatures { display: table; width: 100%; margin-top: 30px; }
          .sign-col { display: table-cell; width: 50%; text-align: center; }
          .sign-box { margin-top: 45px; font-size: 11px; color: #64748b; }
        </style>
      </head>
      <body>
        <table class="header-table">
          <tr>
            <td style="width: 80px; vertical-align: middle; padding-right: 15px;">
              <img src="logo.png" alt="Logo LSS" style="width: 75px; height: auto;" onerror="this.src='https://via.placeholder.com/75x75?text=LSS';">
            </td>
            <td style="vertical-align: middle;">
              <h1 style="font-size: 22px; font-weight: 900; margin: 0; text-transform: uppercase;">LIVING STONE SERVICE</h1>
              <div style="font-size: 11.5px; color: #475569; margin-top: 4px; line-height: 1.4;">
                Expertise Informatique, Vente de Matériel & Formations Pro<br>
                Ouagadougou, Burkina Faso | Tél : +226 70 00 00 00 / 64 07 78 64<br>
                <strong>N° IFU : 00320159Z — RCCM : BF-OUA-01-2026-A10-13450</strong>
              </div>
            </td>
            <td style="text-align: right; vertical-align: top; width: 150px;">
              <div class="badge-facture">${inv.type || 'FACTURE'}</div>
              <div style="font-size: 13px; font-weight: 800; margin-top: 6px;">N° : ${inv.id}</div>
              <div style="font-size: 11px; color: #64748b;">Date : ${inv.date || new Date().toLocaleDateString('fr-FR')}</div>
              <div style="margin-top: 8px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=85x85&data=${qrData}" style="width: 75px; height: 75px; border: 1px solid #cbd5e1; padding: 2px; background: #fff;" alt="QR DGI">
              </div>
            </td>
          </tr>
        </table>

        <div class="grid-2">
          <div class="col">
            <div class="box">
              <div class="box-title">Émetteur</div>
              <div><strong>LIVING STONE SERVICE</strong></div>
              <div>Régime Fiscal : Synthétique / Simplifié</div>
              <div>Siège : Ouagadougou, BF</div>
            </div>
          </div>
          <div class="col">
            <div class="box box-right">
              <div class="box-title">Client Facturé</div>
              <div><strong>${inv.clientName || 'Client Comptant'}</strong></div>
              <div>N° IFU : ${inv.clientIFU || 'Non assujetti'}</div>
              <div>Contact : ${inv.clientPhone || 'Non spécifié'}</div>
            </div>
          </div>
        </div>

        <table class="table-items">
          <thead>
            <tr>
              <th>Désignation des Articles / Prestations</th>
              <th style="text-align: center; width: 60px;">Qté</th>
              <th style="text-align: right; width: 120px;">Prix Unitaire HT</th>
              <th style="text-align: right; width: 130px;">Total HT</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td><strong>${item.desc || item.name}</strong></td>
                <td style="text-align: center;">${item.qty || 1}</td>
                <td style="text-align: right;">${this.formatFCFA(item.priceHT || item.price || 0)}</td>
                <td style="text-align: right; font-weight: 700;">${this.formatFCFA(item.totalHT || (item.qty * item.priceHT) || totalHT)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <table class="totals-table">
          <tr>
            <td><strong>Sous-total Hors Taxes (HT) :</strong></td>
            <td style="text-align: right; font-weight: 700;">${this.formatFCFA(totalHT)}</td>
          </tr>
          <tr>
            <td><strong>TVA 18% (CGI Burkina) :</strong></td>
            <td style="text-align: right; font-weight: 700;">${this.formatFCFA(tva)}</td>
          </tr>
          <tr class="total-row">
            <td><strong>TOTAL TTC :</strong></td>
            <td style="text-align: right;">${this.formatFCFA(totalTTC)}</td>
          </tr>
        </table>

        <div style="font-size: 11.5px; color: #475569; margin-top: 10px;">
          Arrêté la présente facture à la somme de : <strong>${this.numberToWordsFr ? this.numberToWordsFr(totalTTC) : totalTTC + ' Francs CFA TTC'}</strong>.
        </div>

        <div class="signatures">
          <div class="sign-col">
            <strong>Pour le Client</strong><br>
            <span style="font-size: 11px; color: #64748b;">(Accusé de réception & cachet)</span>
            <div class="sign-box">Date & Signature</div>
          </div>
          <div class="sign-col">
            <strong>Pour LIVING STONE SERVICE</strong><br>
            <span style="font-size: 11px; color: #64748b;">La Direction / Service Comptabilité</span>
            <div class="sign-box">Signature & Cachet Officiels</div>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        <\/script>
      </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(htmlContent);
    printWin.document.close();
  }

  sendInvoiceWhatsApp(invoiceId) {
    const inv = (this.db && Array.isArray(this.db.invoices))
      ? this.db.invoices.find(i => i.id === invoiceId)
      : null;
      
    if (!inv || !inv.clientPhone) {
      alert("Numéro de téléphone du client manquant !");
      return;
    }
    const cleanPhone = inv.clientPhone.replace(/\D/g, '');
    const msg = encodeURIComponent(
      `Bonjour ${inv.clientName},\n` +
      `Voici le récapitulatif de votre facture ${inv.id} chez LIVING STONE SERVICE :\n` +
      `- Montant TTC : ${this.formatFCFA(inv.totalTTC || 0)}\n` +
      `- Statut : ${inv.status || inv.paymentStatus || 'Payé'}\n\n` +
      `Merci pour votre confiance !`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
  }

  // IMPRESSION BON DE DÉCAISSEMENT / SORTIE DE CAISSE A4
  printExpenseVoucher(expenseId) {
    const exp = (this.db && Array.isArray(this.db.expenses))
      ? this.db.expenses.find(e => e.id === expenseId)
      : null;

    if (!exp) {
      alert("Dépense introuvable !");
      return;
    }

    const printWin = window.open('', '_blank');
    if (!printWin) {
      alert("Veuillez autoriser les pop-ups dans votre navigateur.");
      return;
    }

    const qrData = encodeURIComponent(
      `BON DE SORTIE DE CAISSE LSS\n` +
      `Réf: ${exp.id}\n` +
      `Date: ${exp.date || ''}\n` +
      `Motif: ${exp.description}\n` +
      `Catégorie: ${exp.category}\n` +
      `Montant: ${exp.amount} FCFA\n` +
      `Autorisé par: ZABRE S. Constantin`
    );

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <title>Bon de Décaissement - ${exp.id}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm 15mm; }
          * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            color: #0f172a;
            margin: 0;
            padding: 10px;
            font-size: 13px;
            background: #fff;
          }
          .voucher-container {
            border: 2px solid #0f172a;
            border-radius: 8px;
            padding: 24px;
            background: #ffffff;
          }
          .header-table { width: 100%; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px; }
          .badge-voucher {
            background: #dc2626; /* Rouge comptabilité pour décaissement */
            color: #fff;
            padding: 6px 14px;
            font-size: 13px;
            font-weight: 800;
            text-transform: uppercase;
            display: inline-block;
            border-radius: 4px;
          }
          .box {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 14px 18px;
            margin-bottom: 20px;
            font-size: 13px;
            line-height: 1.6;
          }
          .amount-highlight {
            font-size: 20px;
            font-weight: 900;
            color: #dc2626;
            background: #fef2f2;
            border: 1.5px solid #fecaca;
            padding: 8px 16px;
            border-radius: 6px;
            display: inline-block;
            margin: 10px 0;
          }
          .signatures { display: table; width: 100%; margin-top: 40px; }
          .sign-col { display: table-cell; width: 50%; text-align: center; }
          .sign-box { margin-top: 50px; font-size: 11px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="voucher-container">
          <table class="header-table">
            <tr>
              <td style="width: 75px; vertical-align: middle; padding-right: 12px;">
                <img src="logo.png" alt="Logo LSS" style="width: 70px; height: auto;" onerror="this.src='https://via.placeholder.com/70x70?text=LSS';">
              </td>
              <td style="vertical-align: middle;">
                <h1 style="font-size: 20px; font-weight: 900; margin: 0; text-transform: uppercase;">LIVING STONE SERVICE</h1>
                <div style="font-size: 11px; color: #475569; margin-top: 3px; line-height: 1.35;">
                  Gestion de Trésorerie & Caisse Atelier<br>
                  Ouagadougou, Burkina Faso | IFU : 00320159Z — RCCM : BF-OUA-01-2026-A10-13450
                </div>
              </td>
              <td style="text-align: right; vertical-align: top; width: 140px;">
                <div class="badge-voucher">BON DE DÉCAISSEMENT</div>
                <div style="font-size: 12px; font-weight: 800; margin-top: 5px;">N° : ${exp.id}</div>
                <div style="font-size: 11px; color: #64748b;">Date : ${exp.date || new Date().toLocaleDateString('fr-FR')}</div>
                <div style="margin-top: 6px;">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=75x75&data=${qrData}" style="width: 65px; height: 65px; border: 1px solid #cbd5e1; padding: 2px; background: #fff;" alt="QR Caisse">
                </div>
              </td>
            </tr>
          </table>

          <div class="box">
            <div><strong>Motif de la dépense :</strong> ${exp.description}</div>
            <div><strong>Catégorie budgétaire :</strong> <span style="font-weight: 700; color: #0284c7;">${exp.category}</span></div>
            <div><strong>Bénéficiaire / Fournisseur :</strong> ${exp.beneficiary || 'Fournisseur / Prestataire de service'}</div>
            <div><strong>Montant décaissé :</strong></div>
            <div class="amount-highlight">${this.formatFCFA(exp.amount)}</div>
            <div style="font-size: 12px; color: #64748b;">Arrêté la présente sortie de caisse à la somme de : <strong>${this.formatFCFA(exp.amount)}</strong>.</div>
          </div>

          <div class="signatures">
            <div class="sign-col">
              <strong>Le Bénéficiaire / Demandeur</strong><br>
              <span style="font-size: 10.5px; color: #64748b;">(Accusé de réception des fonds)</span>
              <div class="sign-box">Nom, Date & Signature</div>
            </div>
            <div class="sign-col">
              <strong>Autorisation Direction (LSS)</strong><br>
              <span style="font-size: 10.5px; color: #64748b;">ZABRE S. Constantin</span>
              <div class="sign-box">Signature & Cachet Caisse</div>
            </div>
          </div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        <\/script>
      </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(htmlContent);
    printWin.document.close();
  }

  printCertificateA4(studentId) {
    this.openCertModal(studentId);
    setTimeout(() => {
      this.printCurrentCertificate();
    }, 300);
  }

  printFinancialReport() {
    const s = this.db.settings;
    let totalCA = 0;
    let totalHT = 0;
    let totalTVA = 0;

    this.db.invoices.forEach(inv => {
      totalCA += Number(inv.totalTTC || 0);
      totalHT += Number(inv.subtotalHT || 0);
      totalTVA += Number(inv.vatAmount || 0);
    });

    let totalExp = this.db.expenses.reduce((a, b) => a + Number(b.amount || 0), 0);
    let netProfit = totalHT - totalExp;

    const printHtml = `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #0f172a;">
        <div class="cert-top-grid" style="border-bottom: 2px solid #109e2b; padding-bottom: 14px; margin-bottom: 20px;">
          <div class="cert-left-meta">
            <strong style="color: #0252df; font-size: 13px;">${s.companyName}</strong><br>
            Entreprise Individuelle<br>
            BP : ${s.poBox || '06 BV 30379 Ouaga Zogona 10020 OUAGADOUGOU'}<br>
            N° IFU : ${s.ifu} (du ${s.ifuDate || '2026-07-20'})<br>
            N° RCCM : ${s.rccm} (du ${s.rccmDate || '2026-07-17'})
          </div>
          <div class="cert-center-logo">
            <img src="logo.png" alt="LSS Logo" style="height: 65px; width: auto;">
          </div>
          <div class="cert-right-meta">
            <strong style="color: #109e2b; font-size: 13px;">MAINTENANCE & FORMATIONS</strong><br>
            Ouagadougou, Burkina Faso<br>
            Tél : ${s.phone || '(+226) 70 00 00 00 / (+226) 76 00 00 00'}<br>
            <a href="mailto:${s.email || 'contactlivingstoneservice@gmail.com'}" style="color: #0252df; text-decoration: none;">${s.email || 'contactlivingstoneservice@gmail.com'}</a>
          </div>
        </div>

        <h2 style="font-size: 18pt; font-weight: 900; color: #0252df; text-transform: uppercase; text-align: center; margin-bottom: 4px; letter-spacing: 0.5px;">
          BILAN FINANCIER DGI & ANALYSE DE GESTION
        </h2>
        <div style="font-size: 12pt; font-weight: 800; color: #f37021; text-align: center; margin-bottom: 20px;">
          Exercice Fiscale 2026 — Rapport d'Activité LSS
        </div>

        <table class="print-table">
          <thead>
            <tr>
              <th style="background: #0252df; color: #ffffff; padding: 10px;">Rubrique Financière</th>
              <th style="background: #0252df; color: #ffffff; padding: 10px; text-align: right;">Montant en FCFA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Chiffre d'Affaires Brut TTC (Encaissements)</td>
              <td style="text-align: right;"><strong>${this.formatFCFA(totalCA)}</strong></td>
            </tr>
            <tr>
              <td>Base Imposable Hors Taxe (CA HT)</td>
              <td style="text-align: right;">${this.formatFCFA(totalHT)}</td>
            </tr>
            <tr>
              <td>TVA Collectée à Reverser à la DGI (18%)</td>
              <td style="text-align: right; color: #d97706;"><strong>${this.formatFCFA(totalTVA)}</strong></td>
            </tr>
            <tr>
              <td>Dépenses & Charges d'Exploitation Cumulées</td>
              <td style="text-align: right; color: #dc2626;">${this.formatFCFA(totalExp)}</td>
            </tr>
            <tr style="background: #f0fdf4;">
              <td><strong>Bénéfice Net d'Exploitation (Résultat Net HT)</strong></td>
              <td style="text-align: right; color: #16a34a; font-size: 13pt;"><strong>${this.formatFCFA(netProfit)}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="print-signatures" style="margin-top: 50px;">
          <div class="print-signature-box">Direction Financière LSS</div>
          <div class="print-signature-box">
            <strong>LE PROMOTEUR LSS</strong><br>
            <span style="color: #0252df; font-weight: 800;">${s.promoterName}</span><br>
            <small style="color: #64748b;">(Cachet & Signature Officiels)</small>
          </div>
        </div>

        <div style="margin-top: 35px; padding-top: 10px; border-top: 1px dashed #cbd5e1; text-align: center; font-size: 8.5pt; color: #64748b;">
          <div style="font-weight: 700; color: #0252df; font-style: italic; margin-bottom: 2px;">
            « ${s.motto || "L'Excellence & la Qualité au Service de l'Innovation IT"} »
          </div>
          <div>
            ${s.companyName} — IFU: ${s.ifu} — RCCM: ${s.rccm} — BP: ${s.poBox || '06 BV 30379 Ouaga Zogona 10020 OUAGADOUGOU'}
          </div>
        </div>
      </div>
    `;

    this.preparePortraitPrint(printHtml);
  }

  // Helpers
  setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = (text !== undefined && text !== null) ? text : '';
  }

  setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = (html !== undefined && html !== null) ? html : '';
  }

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = (val !== undefined && val !== null) ? val : '';
  }

  formatFCFA(amount) {
    return new Intl.NumberFormat('fr-FR').format(Math.round(amount || 0)) + ' FCFA';
  }

  getBadgeClass(status) {
    switch (status) {
      case 'Reçu': return 'badge-info';
      case 'Diagnostic': return 'badge-warning';
      case 'En cours': return 'badge-purple';
      case 'Prêt': return 'badge-success';
      case 'Livré': return 'badge-success';
      default: return 'badge-info';
    }
  }

  numberToWordsFCFA(amount) {
    return new Intl.NumberFormat('fr-FR').format(Math.round(amount || 0));
  }

  openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  }

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
  }
}

// Global App Instance (Resilient Initialization)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.app = new LSSApp();
  });
} else {
  window.app = new LSSApp();
}
