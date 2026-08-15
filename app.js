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
    this.enteredPin = '';
    this.posCart = [];
    this.isAdminAuthenticated = true;
    this.userRole = 'admin';
    this.init();
  }

  // Load Database from LocalStorage or Seed Defaults
  loadDatabase() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDatabase));
      return defaultDatabase;
    }
    try {
      const parsed = JSON.parse(data);
      // Merge missing structures if updated
      const settings = { ...defaultDatabase.settings, ...parsed.settings };
      if (!settings.adminPin) settings.adminPin = '1234';
      if (!settings.staffPin) settings.staffPin = '5678';
      const envUrl = (typeof window !== 'undefined' && window.ENV_SUPABASE_URL) ? window.ENV_SUPABASE_URL : '';
      const envKey = (typeof window !== 'undefined' && window.ENV_SUPABASE_KEY) ? window.ENV_SUPABASE_KEY : '';
      if (!settings.supabaseUrl) settings.supabaseUrl = envUrl || DEFAULT_SUPABASE_URL;
      if (!settings.supabaseKey) settings.supabaseKey = envKey || DEFAULT_SUPABASE_KEY;
      return { ...defaultDatabase, ...parsed, settings };
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
    // Apply Theme
    document.documentElement.setAttribute('data-theme', this.db.settings.theme || 'dark');
    
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then(() => console.log('[PWA] Service Worker active')).catch(err => console.warn('[PWA] SW Error', err));
    }

    // Initialize Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Populate Settings Form
    this.loadSettingsForm();

    // Render Initial View
    this.navigate(this.currentView);

    // Initial Cloud Pull & Auto Polling every 10 seconds for multi-device sync
    this.pullFromSupabase(false);
    setInterval(() => {
      this.pullFromSupabase(false);
    }, 10000);
  }

  // Security & Authentication Engine (Admin & Secrétariat)
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
      this.isAdminAuthenticated = true;
      this.userRole = 'admin';
      this.updateSidebarUserBadge('ZABRE S. Constantin', 'Promoteur / Admin', 'ZC');
      const lockScreen = document.getElementById('lock-screen');
      if (lockScreen) lockScreen.classList.remove('active');
      this.clearPin();
    } else if (isMatchStaff) {
      this.isAdminAuthenticated = false;
      this.userRole = 'staff';
      this.updateSidebarUserBadge('Secrétariat LSS', 'Service Accueil & Caisse', 'SEC');
      const lockScreen = document.getElementById('lock-screen');
      if (lockScreen) lockScreen.classList.remove('active');
      this.clearPin();
      if (['dashboard', 'reports', 'settings'].includes(this.currentView)) {
        this.navigate('sales');
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
    this.isAdminAuthenticated = false;
    this.userRole = null;
    this.clearPin();
    this.selectRoleTab('admin');
    const lockScreen = document.getElementById('lock-screen');
    if (lockScreen) lockScreen.classList.add('active');
    const inputField = document.getElementById('pin-input-field');
    if (inputField) inputField.focus();
  }

  // Navigation SPA Router
  navigate(viewName) {
    const adminRestrictedViews = ['dashboard', 'reports', 'settings'];
    const storedAdminPin = (this.db && this.db.settings && this.db.settings.adminPin) ? String(this.db.settings.adminPin).trim() : '1234';

    if (this.userRole === 'staff' && adminRestrictedViews.includes(viewName)) {
      const viewTitles = {
        dashboard: 'Tableau de Bord Financier',
        reports: 'Rapports Financiers & Bilans DGI',
        settings: 'Paramètres & Identifiants Fiscaux'
      };
      const entered = prompt(`🔒 Accès Réservé Administrateur (${viewTitles[viewName] || viewName})\n\nEntrez le Code PIN Administrateur (Défaut: 1234) :`);
      const rawEntered = String(entered || '').trim();
      if (rawEntered !== storedAdminPin && rawEntered !== '1234') {
        alert('❌ Code PIN Administrateur incorrect ! Accès réservé.');
        return;
      }
      this.isAdminAuthenticated = true;
      this.userRole = 'admin';
      this.updateSidebarUserBadge('ZABRE S. Constantin', 'Promoteur / Admin', 'ZC');
    }

    this.currentView = viewName;
    
    // Update active nav menu link
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    const targetNav = Array.from(document.querySelectorAll('.nav-item')).find(el => el.getAttribute('onclick')?.includes(viewName));
    if (targetNav) targetNav.classList.add('active');

    // Update Topbar Title
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
      settings: "Paramètres & Sécurité"
    };
    document.getElementById('current-page-title').innerText = titles[viewName] || "LSS Manager";

    // Switch View Section
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    const activeSec = document.getElementById(`view-${viewName}`);
    if (activeSec) activeSec.classList.add('active');

    // Refresh View Specific Data
    this.renderCurrentView();

    // Close mobile sidebar if open
    document.getElementById('sidebar').classList.remove('mobile-open');

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
    document.getElementById('sidebar').classList.toggle('mobile-open');
  }

  // View Rendering Methods
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
    }
  }

  // 1. DASHBOARD RENDER
  renderDashboard() {
    // Financial Computations
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

    // Tickets Tbody
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

    // Stock Alerts
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

  // 2. MAINTENANCE TICKETS
  renderTickets() {
    const tbody = document.getElementById('tickets-tbody');
    tbody.innerHTML = '';
    this.db.tickets.forEach(t => {
      const waMessage = encodeURIComponent(`Bonjour ${t.clientName}, Living Stone Service vous informe que votre appareil (${t.deviceModel}) est au statut: ${t.status}. Montant: ${t.costTTC} FCFA.`);
      const waLink = `https://wa.me/${t.clientPhone.replace(/[^0-9]/g, '')}?text=${waMessage}`;

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

  // 3. POS SALES & INVENTORY
  renderPOSProducts() {
    const grid = document.getElementById('pos-products-grid');
    grid.innerHTML = '';
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
    this.renderCart();
  }

  filterProducts(query) {
    const q = query.toLowerCase();
    const grid = document.getElementById('pos-products-grid');
    grid.innerHTML = '';
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
    if (this.posCart.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 40px;">Aucun article dans le panier</p>';
      document.getElementById('cart-subtotal-ht').innerText = '0 FCFA';
      document.getElementById('cart-vat-amount').innerText = '0 FCFA';
      document.getElementById('cart-total-ttc').innerText = '0 FCFA';
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

    document.getElementById('cart-subtotal-ht').innerText = this.formatFCFA(subtotalHT);
    document.getElementById('cart-vat-amount').innerText = applyVat ? this.formatFCFA(vatAmount) : '0 FCFA (Exonéré)';
    document.getElementById('cart-total-ttc').innerText = this.formatFCFA(totalTTC);
  }

  removeFromCart(index) {
    this.posCart.splice(index, 1);
    this.renderCart();
  }

  checkoutPOS() {
    if (this.posCart.length === 0) {
      alert('Votre panier est vide!');
      return;
    }

    let subtotalHT = 0;
    this.posCart.forEach(item => {
      subtotalHT += item.priceHT * item.qty;
      // Reduce Stock Qty
      const p = this.db.inventory.find(inv => inv.id === item.id);
      if (p) p.stockQty -= item.qty;
    });

    const vatAmount = Math.round(subtotalHT * 0.18);
    const totalTTC = subtotalHT + vatAmount;

    const invoiceId = `FACT-2026-${String(this.db.invoices.length + 1).padStart(3, '0')}`;
    const newInvoice = {
      id: invoiceId,
      docType: 'facture',
      clientName: document.getElementById('pos-client-name').value || 'Client Comptant',
      clientIfu: '',
      clientPhone: '',
      items: this.posCart.map(c => ({ desc: c.name, qty: c.qty, priceHT: c.priceHT })),
      subtotalHT: subtotalHT,
      vatAmount: vatAmount,
      totalTTC: totalTTC,
      paymentStatus: 'Payé',
      dateCreated: new Date().toISOString().split('T')[0]
    };

    this.db.invoices.unshift(newInvoice);
    this.saveDatabase();
    
    // Print Official A4 Invoice
    this.printInvoiceA4(invoiceId);

    // Reset Cart
    this.posCart = [];
    this.renderCart();
    this.renderPOSProducts();
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

  // 4. PROJECTS
  renderProjects() {
    const tbody = document.getElementById('projects-tbody');
    tbody.innerHTML = '';
    this.db.projects.forEach(p => {
      tbody.innerHTML += `
        <tr>
          <td><strong>${p.id}</strong></td>
          <td>${p.title}</td>
          <td>${p.clientName}</td>
          <td>${p.category}</td>
          <td><strong>${this.formatFCFA(p.budgetTTC)}</strong></td>
          <td><span class="badge ${this.getBadgeClass(p.status)}">${p.status}</span></td>
          <td><button class="btn btn-secondary btn-sm" onclick="alert('Détails du contrat enregistré.')">Fiche</button></td>
        </tr>
      `;
    });
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

  // 5. ACADEMY / STUDENTS
  renderStudents() {
    const tbody = document.getElementById('students-tbody');
    tbody.innerHTML = '';
    this.db.students.forEach(s => {
      tbody.innerHTML += `
        <tr>
          <td><strong>${s.id}</strong></td>
          <td>${s.fullName}<br><small style="color: var(--text-muted);">${s.phone}</small></td>
          <td>${s.track}</td>
          <td>${s.startDate} au ${s.endDate}</td>
          <td>ZABRE S. Constantin</td>
          <td><span class="badge badge-success">${s.status}</span></td>
          <td>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-secondary btn-sm" onclick="app.editStudent('${s.id}')">
                <i data-lucide="edit-3"></i> Modifier
              </button>
              <button class="btn btn-primary btn-sm" onclick="app.openCertModal('${s.id}')">
                <i data-lucide="award"></i> Aperçu & Éditeur A4
              </button>
            </div>
          </td>
        </tr>
      `;
    });
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
    document.getElementById('stg-id').value = s.id;
    document.getElementById('stg-name').value = s.fullName;
    document.getElementById('stg-phone').value = s.phone || '';
    document.getElementById('stg-track').value = s.track;
    document.getElementById('stg-start').value = s.startDate;
    document.getElementById('stg-end').value = s.endDate;
    
    const skillsList = s.skills && s.skills.length > 0 ? s.skills : this.getDefaultSkillsForTrack(s.track);
    document.getElementById('stg-skills').value = skillsList.join('\n');

    this.openModal('modal-student');
    if (window.lucide) window.lucide.createIcons();
  }

  saveStudent(e) {
    e.preventDefault();
    const stgId = document.getElementById('stg-id').value;
    const rawSkills = document.getElementById('stg-skills').value || '';
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

    document.getElementById('stg-id').value = '';
    this.saveDatabase();
    this.closeModal('modal-student');
    this.renderStudents();
  }

  openCertModal(studentId) {
    const s = this.db.students.find(st => st.id === studentId);
    if (!s) return;

    this.currentCertStudent = s;
    const settings = this.db.settings;

    document.getElementById('ce-ifu').innerText = settings.ifu || '00320159Z';
    document.getElementById('ce-rccm').innerText = settings.rccm || 'BF-OUA-01-2026-A10-13450';
    document.getElementById('ce-phone').innerText = `Tél : ${settings.phone || '(+226) 70 00 00 00'}`;
    const emailEl = document.getElementById('ce-email');
    if (emailEl) {
      emailEl.innerText = settings.email || 'contactlivingstoneservice@gmail.com';
      emailEl.href = `mailto:${settings.email || 'contactlivingstoneservice@gmail.com'}`;
    }
    document.getElementById('ce-cert-number').innerText = s.certNumber || `N° ${s.id}/LSS`;
    document.getElementById('ce-student-name').innerText = s.fullName.toUpperCase();
    document.getElementById('ce-track-name').innerText = s.track.toUpperCase();
    document.getElementById('ce-start-date').innerText = s.startDate;
    document.getElementById('ce-end-date').innerText = s.endDate;
    document.getElementById('ce-promoter-name').innerText = settings.promoterName || 'ZABRE S. Constantin';
    const mottoEl = document.getElementById('ce-motto');
    if (mottoEl) mottoEl.innerText = settings.motto || "L'Excellence & la Qualité au Service de l'Innovation IT";

    // Populate skills list
    const skills = s.skills && s.skills.length > 0 ? s.skills : this.getDefaultSkillsForTrack(s.track);
    document.getElementById('ce-skills-list').innerHTML = skills.map(sk => `<li>${sk.replace(/^[•\-\*]\s*/, '')}</li>`).join('');

    // Format current date
    const today = new Date();
    const formattedDate = s.issueDate || `${today.getDate()} ${today.toLocaleDateString('fr-FR', { month: 'long' })} ${today.getFullYear()}`;
    document.getElementById('ce-issue-date').innerText = formattedDate;

    // Set WhatsApp link
    const waMsg = encodeURIComponent(`Bonjour ${s.fullName}, Living Stone Service vous informe que votre Attestation de Fin de Stage Pratique (${s.track}) N° ${s.id}/LSS est disponible!`);
    const waPhone = (s.phone || '').replace(/[^0-9]/g, '');
    document.getElementById('cert-wa-link').href = `https://wa.me/${waPhone}?text=${waMsg}`;

    this.isCertEditing = false;
    this.applyCertEditState();
    this.openModal('modal-cert-editor');

    if (window.lucide) window.lucide.createIcons();
  }

  toggleCertEdit() {
    if (this.isCertEditing) {
      // User clicked "Valider & Enregistrer": Save edits back to student object & DB!
      this.saveCertCanvasEdits();
    }
    this.isCertEditing = !this.isCertEditing;
    this.applyCertEditState();
  }

  saveCertCanvasEdits() {
    if (!this.currentCertStudent) return;
    const s = this.currentCertStudent;

    s.fullName = document.getElementById('ce-student-name').innerText.trim();
    s.track = document.getElementById('ce-track-name').innerText.trim();
    s.startDate = document.getElementById('ce-start-date').innerText.trim();
    s.endDate = document.getElementById('ce-end-date').innerText.trim();
    s.issueDate = document.getElementById('ce-issue-date').innerText.trim();
    s.certNumber = document.getElementById('ce-cert-number').innerText.trim();

    // Extract skills array from LI elements
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

    if (this.isCertEditing) {
      container.classList.add('cert-editing-active');
      btn.className = 'btn btn-success btn-sm';
      btn.innerHTML = '<i data-lucide="check"></i> Valider & Enregistrer';
    } else {
      container.classList.remove('cert-editing-active');
      btn.className = 'btn btn-warning btn-sm';
      btn.innerHTML = '<i data-lucide="edit-3"></i> Modifier le Texte';
    }

    if (window.lucide) window.lucide.createIcons();
  }

  printCurrentCertificate() {
    if (this.isCertEditing) {
      this.saveCertCanvasEdits();
      this.isCertEditing = false;
      this.applyCertEditState();
    }
    const certHtml = document.getElementById('cert-preview-content').outerHTML;
    const printArea = document.getElementById('print-area');
    printArea.innerHTML = certHtml;
    printArea.classList.add('print-landscape-mode');
    document.body.classList.add('print-landscape-mode');

    // Inject dynamic @page landscape rule so browser print dialog automatically defaults to Landscape A4
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


  // 6. INVOICES & ESTIMATES (DGI BURKINA FASO)
  renderInvoices() {
    const tbody = document.getElementById('invoices-tbody');
    tbody.innerHTML = '';
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

  addInvoiceRow() {
    const wrapper = document.getElementById('inv-items-wrapper');
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

    document.getElementById('inv-form-id').value = inv.id;
    document.getElementById('inv-doc-type').value = inv.docType;
    document.getElementById('inv-client-name').value = inv.clientName;
    document.getElementById('inv-client-ifu').value = inv.clientIfu || '';
    document.getElementById('inv-client-phone').value = inv.clientPhone || '';
    if (document.getElementById('inv-apply-vat')) {
      document.getElementById('inv-apply-vat').value = inv.applyVat !== false ? 'true' : 'false';
    }

    // Populate item rows
    const wrapper = document.getElementById('inv-items-wrapper');
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

    this.openModal('modal-invoice');
    if (window.lucide) window.lucide.createIcons();
  }

  saveInvoice(e) {
    e.preventDefault();
    const invId = document.getElementById('inv-form-id').value;
    const docType = document.getElementById('inv-doc-type').value;
    const applyVat = document.getElementById('inv-apply-vat') ? document.getElementById('inv-apply-vat').value === 'true' : true;
    
    const rows = document.querySelectorAll('.inv-item-row');
    const items = [];
    let subtotalHT = 0;

    rows.forEach(r => {
      const desc = r.querySelector('.item-desc').value;
      const qty = Number(r.querySelector('.item-qty').value || 1);
      const priceHT = Number(r.querySelector('.item-price').value || 0);
      subtotalHT += qty * priceHT;
      items.push({ desc, qty, priceHT });
    });

    const vatAmount = applyVat ? Math.round(subtotalHT * 0.18) : 0;
    const totalTTC = subtotalHT + vatAmount;

    if (invId) {
      const inv = this.db.invoices.find(i => i.id === invId);
      if (inv) {
        inv.docType = docType;
        inv.clientName = document.getElementById('inv-client-name').value;
        inv.clientIfu = document.getElementById('inv-client-ifu').value;
        inv.clientPhone = document.getElementById('inv-client-phone').value;
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
        clientName: document.getElementById('inv-client-name').value,
        clientIfu: document.getElementById('inv-client-ifu').value,
        clientPhone: document.getElementById('inv-client-phone').value,
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

    document.getElementById('inv-form-id').value = '';
    this.saveDatabase();
    this.closeModal('modal-invoice');
    this.renderInvoices();
  }

  // 7. EXPENSES
  renderExpenses() {
    const tbody = document.getElementById('expenses-tbody');
    tbody.innerHTML = '';
    this.db.expenses.forEach(e => {
      tbody.innerHTML += `
        <tr>
          <td><strong>${e.id}</strong></td>
          <td>${e.date}</td>
          <td><span class="badge badge-purple">${e.category}</span></td>
          <td>${e.description}</td>
          <td><strong style="color: var(--accent-danger);">${this.formatFCFA(e.amount)}</strong></td>
          <td>${e.paymentMethod}</td>
        </tr>
      `;
    });
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

  // 8. FINANCIAL REPORTS & DGI BILAN
  renderFinancialReport() {
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

    document.getElementById('report-total-ca').innerText = this.formatFCFA(totalCA);
    document.getElementById('report-ca-ht').innerText = this.formatFCFA(totalHT);
    document.getElementById('report-ca-tva').innerText = this.formatFCFA(totalTVA);
    document.getElementById('report-total-dep').innerText = this.formatFCFA(totalExp);
    document.getElementById('report-net-profit').innerText = this.formatFCFA(netProfit);

    // SVG Chart
    const maxVal = Math.max(totalCA, totalExp, 1);
    const caHeight = Math.round((totalCA / maxVal) * 140);
    const expHeight = Math.round((totalExp / maxVal) * 140);

    const chartBox = document.getElementById('chart-container');
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

  // 9. CLIENTS CRM
  renderClients() {
    const tbody = document.getElementById('clients-tbody');
    tbody.innerHTML = '';
    this.db.clients.forEach(c => {
      const waLink = `https://wa.me/${c.phone.replace(/[^0-9]/g, '')}`;
      tbody.innerHTML += `
        <tr>
          <td><strong>${c.id}</strong></td>
          <td>${c.name}</td>
          <td><span class="badge ${c.type === 'Entreprise' ? 'badge-info' : 'badge-purple'}">${c.type}</span></td>
          <td>${c.phone}</td>
          <td>${c.ifu || 'N/A'}</td>
          <td>${c.address || 'Ouagadougou'}</td>
          <td>
            <a href="${waLink}" target="_blank" class="btn btn-success btn-sm"><i data-lucide="message-square"></i> WhatsApp</a>
          </td>
        </tr>
      `;
    });
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

  // 10. SETTINGS & DB MANAGEMENT
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
    this.db.settings.companyName = document.getElementById('set-company-name').value;
    this.db.settings.promoterName = document.getElementById('set-promoter-name').value;
    this.db.settings.phone = document.getElementById('set-phone').value;
    this.db.settings.email = document.getElementById('set-email').value;
    this.db.settings.motto = document.getElementById('set-motto').value;
    this.db.settings.poBox = document.getElementById('set-po-box').value;
    this.db.settings.ifu = document.getElementById('set-ifu').value;
    this.db.settings.ifuDate = document.getElementById('set-ifu-date').value;
    this.db.settings.rccm = document.getElementById('set-rccm').value;
    this.db.settings.rccmDate = document.getElementById('set-rccm-date').value;
    this.db.settings.adminPin = document.getElementById('set-admin-pin').value;
    if (document.getElementById('set-staff-pin')) {
      this.db.settings.staffPin = document.getElementById('set-staff-pin').value;
    }
    this.db.settings.supabaseUrl = document.getElementById('set-supabase-url').value;
    this.db.settings.supabaseKey = document.getElementById('set-supabase-key').value;

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
    
    // Update settings UI if present
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

  resetDatabase() {
    if (confirm('Attention! Voulez-vous vraiment réinitialiser toutes les données de l\'atelier aux valeurs de démonstration?')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDatabase));
      this.db = defaultDatabase;
      this.init();
      alert('Base de données réinitialisée aux valeurs de démonstration.');
    }
  }

  purgeAllData() {
    if (!confirm('⚠️ ATTENTION : Vous allez PURGER ET RÉINITIALISER TOUTE LA BASE DE DONNÉES À ZÉRO.\n\nSont supprimés définitivement :\n- Tous les Tickets de Maintenance\n- Toutes les Factures & Devis DGI\n- Toutes les Ventes POS\n- Tous les Stagiaires (LSS Académie)\n- Toutes les Dépenses & Projets\n- Tous les Clients & Stocks\n\nLes compteurs de numérotation seront remis à 000. Les paramètres de l\'entreprise (Nom, IFU, RCCM, PIN) seront conservés.\n\nVoulez-vous vraiment continuer ?')) {
      return;
    }

    const enteredPin = prompt('Entrez votre Code PIN de Sécurité (Par défaut: 1234) pour valider la purge complète :');
    if (enteredPin !== this.db.settings.adminPin) {
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
    this.posCart = [];
    this.db.settings.counters = { tickets: 0, invoices: 0, students: 0, expenses: 0 };

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

      // 1. Try Upsert via POST with on_conflict=id
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

      // 2. Fallback to PATCH if row already exists or Prefer header variation
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
      if (isManual) alert('⚠️ Supabase non configuré.\n\nPour partager les données entre plusieurs appareils (PC & Android), veuillez renseigner l\'URL et la Clé API Supabase dans Paramètres sur CHACUN des appareils.');
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

          // Avoid overwriting local changes if local state was updated more recently
          if (!isManual && this.lastLocalUpdate && cloudUpdatedAt && cloudUpdatedAt <= this.lastLocalUpdate) {
            const statusElem = document.getElementById('sync-status');
            if (statusElem) {
              statusElem.style.cursor = 'default';
              statusElem.onclick = null;
              statusElem.innerHTML = '<span class="status-dot" style="background: #22c55e;"></span><span>Cloud Synchro OK</span>';
            }
            return;
          }

          // Do not re-render DOM during auto-polling if user has an active modal open
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
  // OFFICIAL A4 PRINTING ENGINE ENGINE (DGI & LSS COMPLIANCE)
  // =========================================================================

  printTicketReceipt(ticketId) {
    const t = this.db.tickets.find(tk => tk.id === ticketId);
    if (!t) return;
    const s = this.db.settings;

    const printHtml = `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #0f172a;">
        <!-- Top Header Grid (Conforme Attestation) -->
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
            <strong style="color: #109e2b; font-size: 13px;">MAINTENANCE & VENTES</strong><br>
            Ouagadougou, Burkina Faso<br>
            Tél : ${s.phone || '(+226) 70 00 00 00 / (+226) 76 00 00 00'}<br>
            <a href="mailto:${s.email || 'contactlivingstoneservice@gmail.com'}" style="color: #0252df; text-decoration: none;">${s.email || 'contactlivingstoneservice@gmail.com'}</a>
          </div>
        </div>

        <!-- Title & Document Number Badge -->
        <h2 style="font-size: 18pt; font-weight: 900; color: #0252df; text-transform: uppercase; text-align: center; margin-bottom: 4px; letter-spacing: 0.5px;">
          REÇU DE DÉPÔT & DE MAINTENANCE IT
        </h2>
        <div style="font-size: 12pt; font-weight: 800; color: #f37021; text-align: center; margin-bottom: 20px;">
          Ticket N° ${t.id} — Date de Dépôt: ${t.dateReceived}
        </div>

        <!-- Metadata Info Grid -->
        <div class="print-meta-grid" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <strong style="color: #0252df;">INFORMATIONS CLIENT:</strong><br>
            Nom / Raison Sociale: <strong>${t.clientName}</strong><br>
            Téléphone WhatsApp: ${t.clientPhone}
          </div>
          <div>
            <strong style="color: #0252df;">DÉTAILS ÉQUIPEMENT DÉPOSÉ:</strong><br>
            Modèle Appareil: <strong>${t.deviceModel}</strong><br>
            N° Série: ${t.serialNumber || 'N/A'}<br>
            Accessoires Déposés: ${t.accessories || 'Aucun'}
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <strong style="color: #0f172a;">DIAGNOSTIC INITIAL & PANNE SIGNALÉE:</strong>
          <p style="background: #f1f5f9; border-left: 4px solid #f37021; padding: 12px; border-radius: 4px; font-size: 10.5pt; margin-top: 6px; color: #334155;">
            ${t.problemDesc}
          </p>
        </div>

        <table class="print-table">
          <thead>
            <tr>
              <th style="background: #0252df; color: #ffffff; padding: 10px;">Désignation Prestation / Réparation</th>
              <th style="background: #0252df; color: #ffffff; padding: 10px; text-align: right;">Montant HT</th>
              <th style="background: #0252df; color: #ffffff; padding: 10px; text-align: right;">TVA (18%)</th>
              <th style="background: #0252df; color: #ffffff; padding: 10px; text-align: right;">Total TTC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Main d'œuvre, Diagnostic & Maintenance IT (Statut: <strong>${t.status}</strong>)</td>
              <td style="text-align: right;">${this.formatFCFA(t.costHT)}</td>
              <td style="text-align: right;">${this.formatFCFA(t.vat18)}</td>
              <td style="text-align: right;"><strong>${this.formatFCFA(t.costTTC)}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="print-totals" style="width: 300px; margin-left: auto; border: 1px solid #cbd5e1; padding: 14px; border-radius: 8px; margin-bottom: 30px;">
          <div class="print-totals-row"><span>Sous-total HT:</span> <span>${this.formatFCFA(t.costHT)}</span></div>
          <div class="print-totals-row"><span>TVA (18% CGI):</span> <span>${this.formatFCFA(t.vat18)}</span></div>
          <div class="print-totals-row grand-total" style="color: #0252df; border-top: 2px solid #0252df;"><span>Net à Payer TTC:</span> <span>${this.formatFCFA(t.costTTC)}</span></div>
        </div>

        <div class="print-signatures" style="margin-top: 40px;">
          <div class="print-signature-box">Signature du Client</div>
          <div class="print-signature-box">
            <strong>LE PROMOTEUR LSS</strong><br>
            <span style="color: #0252df; font-weight: 800;">${s.promoterName}</span><br>
            <small style="color: #64748b;">(Cachet & Signature Officiels)</small>
          </div>
        </div>

        <!-- Official Motto Footer -->
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

  preparePortraitPrint(printHtml) {
    const printArea = document.getElementById('print-area');
    printArea.classList.remove('print-landscape-mode');
    document.body.classList.remove('print-landscape-mode');
    const styleEl = document.getElementById('print-page-style');
    if (styleEl) styleEl.innerHTML = '';
    printArea.innerHTML = printHtml;
    window.print();
  }

  printReceipt(ticketId) {
    const t = this.db.tickets.find(tk => tk.id === ticketId);
    if (!t) return;
    const s = this.db.settings;

    const printHtml = `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #0f172a; page-break-inside: avoid; break-inside: avoid;">
        <!-- Top Header Grid (Conforme Attestation) -->
        <div class="cert-top-grid" style="border-bottom: 2px solid #109e2b; padding-bottom: 10px; margin-bottom: 12px;">
          <div class="cert-left-meta" style="font-size: 8.5pt;">
            <strong style="color: #0252df; font-size: 11pt;">${s.companyName}</strong><br>
            Entreprise Individuelle<br>
            BP : ${s.poBox || '06 BV 30379 Ouaga Zogona 10020 OUAGADOUGOU'}<br>
            N° IFU : ${s.ifu} (du ${s.ifuDate || '2026-07-20'})<br>
            N° RCCM : ${s.rccm} (du ${s.rccmDate || '2026-07-17'})
          </div>
          <div class="cert-center-logo">
            <img src="logo.png" alt="LSS Logo" style="height: 52px; width: auto;">
          </div>
          <div class="cert-right-meta" style="font-size: 8.5pt;">
            <strong style="color: #109e2b; font-size: 11pt;">MAINTENANCE & FORMATIONS</strong><br>
            Ouagadougou, Burkina Faso<br>
            Tél : ${s.phone || '(+226) 70 00 00 00 / (+226) 76 00 00 00'}<br>
            <a href="mailto:${s.email || 'contactlivingstoneservice@gmail.com'}" style="color: #0252df; text-decoration: none;">${s.email || 'contactlivingstoneservice@gmail.com'}</a>
          </div>
        </div>

        <!-- Title & Document Number Badge -->
        <h2 style="font-size: 18pt; font-weight: 900; color: #0252df; text-transform: uppercase; text-align: center; margin-bottom: 4px; letter-spacing: 0.5px;">
          REÇU DE DÉPÔT & DE MAINTENANCE IT
        </h2>
        <div style="font-size: 12pt; font-weight: 800; color: #f37021; text-align: center; margin-bottom: 20px;">
          Ticket N° ${t.id} — Date de Dépôt: ${t.dateReceived}
        </div>

        <!-- Metadata Info Grid -->
        <div class="print-meta-grid" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
          <div>
            <strong style="color: #0252df;">INFORMATIONS CLIENT:</strong><br>
            Nom / Raison Sociale: <strong>${t.clientName}</strong><br>
            Téléphone WhatsApp: ${t.clientPhone}
          </div>
          <div>
            <strong style="color: #0252df;">DÉTAILS ÉQUIPEMENT DÉPOSÉ:</strong><br>
            Modèle Appareil: <strong>${t.deviceModel}</strong><br>
            N° Série: ${t.serialNumber || 'N/A'}<br>
            Accessoires Déposés: ${t.accessories || 'Aucun'}
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <strong style="color: #0f172a;">DIAGNOSTIC INITIAL & PANNE SIGNALÉE:</strong>
          <p style="background: #f1f5f9; border-left: 4px solid #f37021; padding: 12px; border-radius: 4px; font-size: 10.5pt; margin-top: 6px; color: #334155;">
            ${t.problemDesc}
          </p>
        </div>

        <table class="print-table">
          <thead>
            <tr>
              <th style="background: #0252df; color: #ffffff; padding: 10px;">Désignation Prestation / Réparation</th>
              <th style="background: #0252df; color: #ffffff; padding: 10px; text-align: right;">Montant HT</th>
              <th style="background: #0252df; color: #ffffff; padding: 10px; text-align: right;">TVA (18%)</th>
              <th style="background: #0252df; color: #ffffff; padding: 10px; text-align: right;">Total TTC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Main d'œuvre, Diagnostic & Maintenance IT (Statut: <strong>${t.status}</strong>)</td>
              <td style="text-align: right;">${this.formatFCFA(t.costHT)}</td>
              <td style="text-align: right;">${this.formatFCFA(t.vat18)}</td>
              <td style="text-align: right;"><strong>${this.formatFCFA(t.costTTC)}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="print-totals" style="width: 300px; margin-left: auto; border: 1px solid #cbd5e1; padding: 14px; border-radius: 8px; margin-bottom: 30px;">
          <div class="print-totals-row"><span>Sous-total HT:</span> <span>${this.formatFCFA(t.costHT)}</span></div>
          <div class="print-totals-row"><span>TVA (18% CGI):</span> <span>${this.formatFCFA(t.vat18)}</span></div>
          <div class="print-totals-row grand-total" style="color: #0252df; border-top: 2px solid #0252df;"><span>Net à Payer TTC:</span> <span>${this.formatFCFA(t.costTTC)}</span></div>
        </div>

        <div class="print-signatures" style="margin-top: 40px;">
          <div class="print-signature-box">Signature du Client</div>
          <div class="print-signature-box">
            <strong>LE PROMOTEUR LSS</strong><br>
            <span style="color: #0252df; font-weight: 800;">${s.promoterName}</span><br>
            <small style="color: #64748b;">(Cachet & Signature Officiels)</small>
          </div>
        </div>

        <!-- Official Motto Footer -->
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

  printInvoiceA4(invoiceId) {
    const inv = this.db.invoices.find(i => i.id === invoiceId);
    if (!inv) return;
    const s = this.db.settings;

    let itemsHtml = '';
    inv.items.forEach(item => {
      const lineHT = item.qty * item.priceHT;
      itemsHtml += `
        <tr>
          <td>${item.desc}</td>
          <td style="text-align: center;">${item.qty}</td>
          <td style="text-align: right;">${this.formatFCFA(item.priceHT)}</td>
          <td style="text-align: right;"><strong>${this.formatFCFA(lineHT)}</strong></td>
        </tr>
      `;
    });

    const printHtml = `
      <div style="font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #0f172a; page-break-inside: avoid; break-inside: avoid;">
        <!-- Top Header Grid (Conforme Attestation) -->
        <div class="cert-top-grid" style="border-bottom: 2px solid #109e2b; padding-bottom: 8px; margin-bottom: 10px;">
          <div class="cert-left-meta" style="font-size: 8.5pt;">
            <strong style="color: #0252df; font-size: 11pt;">${s.companyName}</strong><br>
            Entreprise Individuelle<br>
            BP : ${s.poBox || '06 BV 30379 Ouaga Zogona 10020 OUAGADOUGOU'}<br>
            N° IFU : ${s.ifu} (du ${s.ifuDate || '2026-07-20'})<br>
            N° RCCM : ${s.rccm} (du ${s.rccmDate || '2026-07-17'})
          </div>
          <div class="cert-center-logo">
            <img src="logo.png" alt="LSS Logo" style="height: 52px; width: auto;">
          </div>
          <div class="cert-right-meta" style="font-size: 8.5pt;">
            <strong style="color: #109e2b; font-size: 11pt;">MAINTENANCE & VENTES</strong><br>
            Ouagadougou, Burkina Faso<br>
            Tél : ${s.phone || '(+226) 70 00 00 00 / (+226) 76 00 00 00'}<br>
            <a href="mailto:${s.email || 'contactlivingstoneservice@gmail.com'}" style="color: #0252df; text-decoration: none;">${s.email || 'contactlivingstoneservice@gmail.com'}</a>
          </div>
        </div>

        <!-- Document Title & Badge -->
        <h2 style="font-size: 15pt; font-weight: 900; color: #0252df; text-transform: uppercase; text-align: center; margin-bottom: 2px; letter-spacing: 0.5px;">
          ${inv.docType.toUpperCase()} OFFICIELLE DGI
        </h2>
        <div style="font-size: 10.5pt; font-weight: 800; color: #f37021; text-align: center; margin-bottom: 10px;">
          N° ${inv.id} — Date: ${inv.dateCreated}
        </div>

        <div class="print-meta-grid" style="background: #f8fafc; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px; font-size: 9pt;">
          <div>
            <strong style="color: #0252df;">FACTURÉ À / CLIENT:</strong><br>
            Nom / Raison Sociale: <strong>${inv.clientName}</strong><br>
            IFU Client: ${inv.clientIfu || 'Non spécifié'}<br>
            Téléphone: ${inv.clientPhone || 'N/A'}
          </div>
          <div>
            <strong style="color: #0252df;">RÈGLEMENT & FISCALITÉ:</strong><br>
            Statut: <strong>${inv.paymentStatus || 'Payé'}</strong><br>
            Devise: Franc CFA (XOF)<br>
            Réglementation: Code Général des Impôts (TVA 18%)
          </div>
        </div>

        <table class="print-table" style="margin-bottom: 10px;">
          <thead>
            <tr>
              <th style="background: #0252df; color: #ffffff; padding: 6px 8px; font-size: 8.5pt;">Désignation Prestation / Article</th>
              <th style="background: #0252df; color: #ffffff; padding: 6px 8px; text-align: center; font-size: 8.5pt;">Qté</th>
              <th style="background: #0252df; color: #ffffff; padding: 6px 8px; text-align: right; font-size: 8.5pt;">Prix Unitaire HT</th>
              <th style="background: #0252df; color: #ffffff; padding: 6px 8px; text-align: right; font-size: 8.5pt;">Total HT</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div class="print-totals" style="width: 290px; margin-left: auto; border: 1px solid #cbd5e1; padding: 8px 12px; border-radius: 6px; margin-bottom: 10px;">
          <div class="print-totals-row" style="font-size: 9pt;"><span>Total Général HT:</span> <span>${this.formatFCFA(inv.subtotalHT)}</span></div>
          <div class="print-totals-row" style="font-size: 9pt;"><span>TVA (18% CGI):</span> <span>${this.formatFCFA(inv.vatAmount)}</span></div>
          <div class="print-totals-row grand-total" style="color: #0252df; border-top: 2px solid #0252df; font-size: 11pt;"><span>Total Général TTC:</span> <span>${this.formatFCFA(inv.totalTTC)}</span></div>
        </div>

        <div style="margin-top: 10px; font-size: 9.5pt; font-style: italic; text-align: center; background: #f1f5f9; padding: 6px 10px; border-radius: 6px; color: #334155;">
          Arrêtée la présente facture à la somme de : <strong>${this.numberToWordsFCFA(inv.totalTTC)} Francs CFA TTC</strong>.
        </div>

        <div class="print-signatures" style="margin-top: 18px; padding-top: 6px;">
          <div class="print-signature-box">Le Client (Bon pour accord)</div>
          <div class="print-signature-box">
            <strong>LE PROMOTEUR LSS</strong><br>
            <span style="color: #0252df; font-weight: 800;">${s.promoterName}</span><br>
            <small style="color: #64748b;">(Cachet & Signature Officiels)</small>
          </div>
        </div>

        <!-- Official Motto Footer -->
        <div style="margin-top: 16px; padding-top: 6px; border-top: 1px dashed #cbd5e1; text-align: center; font-size: 8pt; color: #64748b;">
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
        <!-- Top Header Grid (Conforme Attestation) -->
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

        <!-- Official Motto Footer -->
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
    // Simple helper string representation for invoices
    return new Intl.NumberFormat('fr-FR').format(Math.round(amount || 0));
  }

  // Modal Controls
  openModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add('active');
  }

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove('active');
  }
}

// Global App Instance
window.app = new LSSApp();
