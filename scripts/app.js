const DEPOTS = [
  {
    id: 'depot1',
    name: 'La trousse',
    owner: 'Joel Mendy',
    phone: '77 435 16 95',
    location: 'Dakar grd yoff',
    products: 'Castel 33cl, Coca-Cola 1.5L, Flag Spéciale',
    icon: '🏭'
  },
  {
    id: 'depot2',
    name: 'Dépôt Fatou Service',
    owner: 'Fatou Ndiaye',
    phone: '78 234 56 78',
    location: 'Pikine',
    products: 'Kirène 1.5L, Gazelle, Youki',
    icon: '🏪'
  },
  {
    id: 'depot3',
    name: 'Dépôt Aliou Boissons',
    owner: 'Aliou Sow',
    phone: '76 345 67 89',
    location: 'Parcelles Assainies',
    products: 'Coca-Cola 33cl, Fanta, Sprite',
    icon: '🏬'
  }
];

const LOGIN_DEMO = {
  admin: { email: 'joel.mendy@latrousse.sn', pass: 'Depot2026!' },
  sec: { email: 'amadou.kane@latrousse.sn', pass: 'Depot2026!' }
};

const CFG = {
  admin: {
    name: 'Joel Mendy',
    init: 'JM',
    lbl: 'Propriétaire · Admin',
    badge: 'Admin',
    badgeBg: 'var(--gold-p)',
    badgeColor: 'var(--gold)',
    avBg: 'var(--gold-l)',
    sbBg: '#1a6b45',
    cta: { label: '+ Nouvelle commande', cls: 'btn bp bsm' },
    pill: { bg: '#fef6e4', color: '#c8860a', txt: 'Propriétaire' },
    nav: [
      { s: 'Principal' },
      { id: 'dashboard', ic: '📊', lb: 'Tableau de bord' },
      { id: 'stocks', ic: '📦', lb: 'Stocks & Produits' },
      { id: 'commandes', ic: '🧾', lb: 'Commandes & Factures' },
      { id: 'fournisseurs', ic: '🚚', lb: 'Fournisseurs' },
      { s: 'Communication' },
      { id: 'annuaire', ic: '🗺️', lb: 'Annuaire dépôts' },
      { id: 'messages', ic: '💬', lb: 'Messages clients' },
      { id: 'forum', ic: '🤝', lb: 'Forum propriétaires' },
      { id: 'notifications', ic: '🔔', lb: 'Notifications' },
      { s: 'Administration' },
      { id: 'equipe', ic: '👥', lb: 'Mon équipe' },
      { id: 'analytique', ic: '📈', lb: 'Analytique' },
      { id: 'profil', ic: '✏️', lb: 'Mon profil dépôt' }
    ]
  },
  sec: {
    name: 'Amadou Kane',
    init: 'AK',
    lbl: 'Secrétaire',
    badge: 'Secrétaire',
    badgeBg: 'var(--blue-p)',
    badgeColor: 'var(--blue)',
    avBg: '#378ADD',
    sbBg: '#1a3f6b',
    cta: { label: '+ Enregistrer mouvement', cls: 'btn bs bsm' },
    pill: { bg: 'var(--blue-p)', color: 'var(--blue)', txt: 'Secrétaire' },
    nav: [
      { s: 'Mon espace' },
      { id: 'stocks', ic: '📦', lb: 'Stocks & Produits' },
      { id: 'commandes', ic: '🧾', lb: 'Commandes & Factures' },
      { s: 'Communication' },
      { id: 'messages', ic: '💬', lb: 'Messages clients' },
      { id: 'notifications', ic: '🔔', lb: 'Notifications' },
      { s: 'Accès restreint' },
      { id: 'lk-analytique', ic: '📈', lb: 'Analytique', locked: true },
      { id: 'lk-forum', ic: '🤝', lb: 'Forum propriétaires', locked: true },
      { id: 'lk-equipe', ic: '👥', lb: 'Mon équipe', locked: true }
    ]
  }
};

const TITLES = {
  dashboard: 'Tableau de bord',
  stocks: 'Stocks & Produits',
  commandes: 'Commandes & Factures',
  fournisseurs: 'Fournisseurs',
  annuaire: 'Annuaire dépôts',
  messages: 'Messages clients',
  forum: 'Forum propriétaires',
  notifications: 'Notifications',
  equipe: 'Mon équipe',
  analytique: 'Analytique',
  profil: 'Mon profil dépôt',
  'lk-analytique': 'Analytique',
  'lk-forum': 'Forum propriétaires',
  'lk-equipe': 'Mon équipe'
};

const DEFAULT_PRODUCTS = [
  { name: 'Castel 33cl', category: 'Bière', brand: 'Castel · Carton 24', qty: 12, price: '4 200 F', badge: 'br', status: 'Stock bas' },
  { name: 'Flag Spéciale 65cl', category: 'Bière', brand: 'Flag · Carton 12', qty: 20, price: '9 500 F', badge: 'bgold', status: 'Limité' },
  { name: 'Heineken 33cl', category: 'Bière', brand: 'Heineken · Carton 24', qty: 30, price: '8 800 F', badge: 'bg', status: 'OK' },
  { name: 'Guinness Foreign Extra', category: 'Bière', brand: 'Guinness · Carton 24', qty: 18, price: '11 500 F', badge: 'bgold', status: 'Limité' },
  { name: 'Coca-Cola 1.5L', category: 'Soda', brand: 'SIBO · Carton 12', qty: 8, price: '7 800 F', badge: 'br', status: 'Stock bas' },
  { name: 'Sprite 33cl', category: 'Canette', brand: 'SIBO · Carton 24', qty: 64, price: '5 100 F', badge: 'bg', status: 'OK' },
  { name: 'Fanta Orange 33cl', category: 'Canette', brand: 'SIBO · Carton 24', qty: 40, price: '5 100 F', badge: 'bg', status: 'OK' },
  { name: 'Youki Tropical 35cl', category: 'Soda', brand: 'ABC · Casier 24', qty: 26, price: '4 900 F', badge: 'bg', status: 'OK' },
  { name: 'Kirène 1.5L', category: 'Eau', brand: 'SEAS · Carton 6', qty: 85, price: '3 600 F', badge: 'bg', status: 'OK' },
  { name: 'Casamancaise 1.5L', category: 'Eau', brand: 'Casamancaise · Pack 6', qty: 34, price: '3 900 F', badge: 'bg', status: 'OK' },
  { name: 'Jus Bissap 1L', category: 'Jus', brand: 'Local · Pack 12', qty: 16, price: '6 000 F', badge: 'bgold', status: 'Limité' },
  { name: 'Jus Gingembre 1L', category: 'Jus', brand: 'Local · Pack 12', qty: 14, price: '6 200 F', badge: 'bgold', status: 'Limité' },
  { name: 'Vin rouge Prestige 75cl', category: 'Vin', brand: 'Prestige · Carton 6', qty: 11, price: '18 500 F', badge: 'br', status: 'Stock bas' },
  { name: 'Vin blanc Doux 75cl', category: 'Vin', brand: 'Prestige · Carton 6', qty: 9, price: '17 900 F', badge: 'br', status: 'Stock bas' }
];
let DATA_PRODUITS = JSON.parse(localStorage.getItem('productsCatalog') || 'null') || DEFAULT_PRODUCTS;

const DEFAULT_COMMAND_HISTORY = [
  {
    ref: 'CMD-092',
    client: 'Restaurant Le Baobab',
    amount: '85 000 F',
    orderTotal: 85000,
    amountPaid: 0,
    amountDue: 85000,
    previousBalance: 0,
    totalDueWithPrevious: 85000,
    status: 'En attente',
    paymentStatus: 'Non payé',
    badge: 'bgold',
    lines: [{ name: 'Castel 33cl', qty: 10, price: 42000 }, { name: 'Sprite 33cl', qty: 5, price: 25500 }, { name: 'Kirène 1.5L', qty: 5, price: 18000 }],
    createdAt: '2026-03-28 09:15',
    timeline: ['Créée le 2026-03-28 09:15']
  },
  {
    ref: 'CMD-091',
    client: 'Bar Terranga',
    amount: '42 500 F',
    orderTotal: 42500,
    amountPaid: 0,
    amountDue: 42500,
    previousBalance: 0,
    totalDueWithPrevious: 42500,
    status: 'Crédit',
    paymentStatus: 'Crédit reporté',
    badge: 'br',
    lines: [{ name: 'Flag Spéciale 65cl', qty: 2, price: 19000 }, { name: 'Youki Tropical 35cl', qty: 5, price: 24500 }],
    createdAt: '2026-03-27 16:40',
    timeline: ['Créée le 2026-03-27 16:40', 'Client passé en crédit']
  },
  {
    ref: 'CMD-090',
    client: 'Épicerie Ndoye',
    amount: '128 000 F',
    orderTotal: 128000,
    amountPaid: 128000,
    amountDue: 0,
    previousBalance: 0,
    totalDueWithPrevious: 128000,
    status: 'Payé',
    paymentStatus: 'Payé',
    badge: 'bg',
    lines: [{ name: 'Coca-Cola 1.5L', qty: 8, price: 62400 }, { name: 'Kirène 1.5L', qty: 10, price: 36000 }, { name: 'Jus Bissap 1L', qty: 5, price: 30000 }],
    createdAt: '2026-03-27 11:05',
    timeline: ['Créée le 2026-03-27 11:05', 'Livrée le 2026-03-27 14:30', 'Payée le 2026-03-27 16:10']
  }
];
let COMMAND_HISTORY = JSON.parse(localStorage.getItem('commandHistory') || 'null') || DEFAULT_COMMAND_HISTORY;

const DEFAULT_CLIENTS = [
  { id: 'cli-1', name: 'Restaurant Le Baobab', phone: '77 801 22 33', zone: 'Médina', type: 'Restaurant', status: 'Actif', balanceDue: 85000 },
  { id: 'cli-2', name: 'Bar Terranga', phone: '78 450 90 11', zone: 'Plateau', type: 'Bar', status: 'Crédit', balanceDue: 42500 },
  { id: 'cli-3', name: 'Épicerie Ndoye', phone: '76 219 40 88', zone: 'Pikine', type: 'Épicerie', status: 'Actif', balanceDue: 0 },
  { id: 'cli-4', name: 'Supermarché City', phone: '70 600 12 45', zone: 'Sacré-Cœur', type: 'Supermarché', status: 'VIP', balanceDue: 0 }
];
let CLIENTS = JSON.parse(localStorage.getItem('clientsCatalog') || 'null') || DEFAULT_CLIENTS;

const DEFAULT_SUPPLIERS = [
  { id: 'sup-1', name: 'Brasseries Dakar', city: 'Dakar', delay: '24h', phone: '33 825 10 10', products: 'Bières, canettes', status: 'Prioritaire' },
  { id: 'sup-2', name: 'SEAS Distribution', city: 'Thiès', delay: '48h', phone: '33 951 88 22', products: 'Eaux, jus', status: 'Suivi' },
  { id: 'sup-3', name: 'SIBO Centre', city: 'Dakar', delay: '24h', phone: '33 839 65 20', products: 'Sodas, formats 1.5L', status: 'Actif' }
];
let SUPPLIERS = JSON.parse(localStorage.getItem('suppliersCatalog') || 'null') || DEFAULT_SUPPLIERS;

const DEFAULT_TEAM_MEMBERS = [
  { id: 'sec-1', name: 'Amadou Kane', role: 'Secrétaire', phone: '77 555 11 22', status: 'En ligne', shift: '08:00 - 17:00' },
  { id: 'sec-2', name: 'Fatou Diène', role: 'Secrétaire', phone: '78 222 44 66', status: 'En ligne', shift: '09:00 - 18:00' },
  { id: 'sec-3', name: 'Ibrahima Sarr', role: 'Livreur / aide stock', phone: '76 333 88 10', status: 'Hors ligne', shift: '07:30 - 15:30' }
];
let TEAM_MEMBERS = JSON.parse(localStorage.getItem('teamMembers') || 'null') || DEFAULT_TEAM_MEMBERS;

const DEFAULT_FORUM_TOPICS = [
  {
    id: 'forum-1',
    title: 'Comment réduire les ruptures sur les formats 1.5L ?',
    category: 'Stocks',
    author: 'Joel Mendy',
    depot: 'La trousse',
    createdAt: '2026-03-28 08:20',
    updatedAt: '2026-03-29 09:10',
    messages: [
      {
        id: 'forum-1-msg-1',
        author: 'Joel Mendy',
        depot: 'La trousse',
        text: 'Je cherche une méthode simple pour anticiper les ruptures sur Coca-Cola et Kirène 1.5L pendant les week-ends.',
        time: '2026-03-28 08:20'
      },
      {
        id: 'forum-1-msg-2',
        author: 'Fatou Ndiaye',
        depot: 'Dépôt Fatou Service',
        text: 'Chez nous, on suit les sorties du jeudi au samedi et on déclenche une commande fournisseur dès que le stock passe sous 15 cartons.',
        time: '2026-03-28 10:05'
      },
      {
        id: 'forum-1-msg-3',
        author: 'Aliou Sow',
        depot: 'Dépôt Aliou Boissons',
        text: 'On tient aussi une liste des clients qui commandent le plus en 1.5L. Ça aide à prévoir les pics avant les événements.',
        time: '2026-03-29 09:10'
      }
    ]
  },
  {
    id: 'forum-2',
    title: 'Quel planning efficace pour l’équipe secrétariat ?',
    category: 'Équipe',
    author: 'Aissatou Fall',
    depot: 'Dépôt Medina Plus',
    createdAt: '2026-03-27 14:40',
    updatedAt: '2026-03-29 07:55',
    messages: [
      {
        id: 'forum-2-msg-1',
        author: 'Aissatou Fall',
        depot: 'Dépôt Medina Plus',
        text: 'Je veux comparer vos horaires pour couvrir les commandes du matin et la clôture du soir sans surcharge.',
        time: '2026-03-27 14:40'
      },
      {
        id: 'forum-2-msg-2',
        author: 'Joel Mendy',
        depot: 'La trousse',
        text: 'On tourne avec 08:00-17:00 pour la saisie et un second renfort 10:00-19:00 les jours de livraison.',
        time: '2026-03-28 11:25'
      },
      {
        id: 'forum-2-msg-3',
        author: 'Fatou Ndiaye',
        depot: 'Dépôt Fatou Service',
        text: 'Le point clé, c’est une passation courte écrite entre les deux shifts pour les crédits, les commandes en attente et les clients à rappeler.',
        time: '2026-03-29 07:55'
      }
    ]
  }
];
let FORUM_TOPICS = JSON.parse(localStorage.getItem('forumTopics') || 'null') || DEFAULT_FORUM_TOPICS;

let CLIENT_ORDERS = JSON.parse(localStorage.getItem('clientOrders') || '[]');
let role = sessionStorage.getItem('userRole') || 'admin';
let cartData = [];
let currentOrderDepot = null;
let publicFiltersBound = false;
let selectedConversationId = null;
let selectedForumTopicId = FORUM_TOPICS[0]?.id || null;
let editingProductName = null;
let editingClientId = null;
let editingSupplierId = null;
let pendingDeletion = null;
let selectedPaymentOrderRef = null;

const R = () => role;
const formatAmount = value => value.toLocaleString('fr-FR') + ' F';
const parseAmount = value => parseInt(String(value || '0').replace(/\D/g, ''), 10) || 0;
const formatQty = value => Number(value || 0).toLocaleString('fr-FR', { minimumFractionDigits: Number.isInteger(Number(value || 0)) ? 0 : 1, maximumFractionDigits: 2 });
const parseQtyInput = value => {
  const normalized = String(value || '').trim().replace(',', '.');
  const parsed = parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};
const getProductByName = name => DATA_PRODUITS.find(product => product.name.toLowerCase() === String(name || '').trim().toLowerCase()) || null;
const getProductPrice = name => parseInt((getProductByName(name)?.price || '0').replace(/\D/g, ''), 10) || 0;
const getProductCategories = () => ['Toutes', ...new Set(DATA_PRODUITS.map(product => product.category))];
const getActiveSecretariesCount = () => TEAM_MEMBERS.filter(member => member.role === 'Secrétaire' && member.status === 'En ligne').length;
const getLowStockProducts = () => DATA_PRODUITS.filter(product => product.qty <= 12);
const getLimitedStockProducts = () => DATA_PRODUITS.filter(product => product.qty > 12 && product.qty <= 25);
const getPaidCommandsCount = () => COMMAND_HISTORY.filter(order => order.paymentStatus === 'Payé' || order.status === 'Payé').length;
const getPendingCommands = () => COMMAND_HISTORY.filter(order => order.status === 'En attente');
const getCreditCommands = () => COMMAND_HISTORY.filter(order => order.status === 'Crédit');
const getPendingCommandsTotal = () => getPendingCommands().reduce((sum, order) => sum + (order.totalDueWithPrevious || parseAmount(order.amount)), 0);
const getUnreadClientOrdersCount = () => CLIENT_ORDERS.filter(order => order.unread).length;
const getTodayOrdersCount = () => {
  const today = new Date().toLocaleDateString('fr-FR');
  return CLIENT_ORDERS.filter(order => String(order.timestamp).includes(today)).length;
};
const getMonthlyRevenue = () => COMMAND_HISTORY.reduce((sum, order) => sum + (order.amountPaid || (order.status === 'Payé' ? parseAmount(order.amount) : 0)), 0);
const getClientByName = name => CLIENTS.find(client => client.name.toLowerCase() === String(name || '').trim().toLowerCase()) || null;
const getClientById = id => CLIENTS.find(client => client.id === id) || null;
const getSupplierById = id => SUPPLIERS.find(supplier => supplier.id === id) || null;
const getCreditClients = () => CLIENTS.filter(client => client.status === 'Crédit');
const getTrackedSuppliers = () => SUPPLIERS.filter(supplier => supplier.status === 'Suivi');
const getFastSuppliers = () => SUPPLIERS.filter(supplier => supplier.delay === '24h');
const getNotificationCount = () => getLowStockProducts().length + getPendingCommands().length + getUnreadClientOrdersCount();
const getOrderBadge = status => ({
  'En attente': 'bgold',
  'Préparée': 'bb',
  'Livrée': 'bpur',
  'Payé': 'bg',
  'Crédit': 'br',
  'Annulée': 'bgr'
}[status] || 'bgold');
const getClientBalance = client => Math.max(0, client?.balanceDue || 0);
const getPaymentStatus = (amountDue, orderTotal, amountPaid) => {
  if (amountDue <= 0) return 'Payé';
  if (amountPaid > 0 && amountPaid < orderTotal) return 'Partiellement payé';
  if (amountPaid <= 0 && amountDue > orderTotal) return 'Crédit reporté';
  return 'Non payé';
};
const getClientStatusFromBalance = client => {
  if (!client) return 'Actif';
  if (getClientBalance(client) > 0) return 'Crédit';
  return client.status === 'VIP' ? 'VIP' : (client.status === 'Nouveau' ? 'Nouveau' : 'Actif');
};
const normalizeLine = line => {
  const qty = Number(line.qty || 0);
  const lineTotal = parseAmount(line.price);
  return { ...line, qty, price: lineTotal, unitPrice: qty > 0 ? Math.round(lineTotal / qty) : lineTotal, lineTotal };
};
const normalizeOrder = order => {
  const lines = (order.lines || []).map(normalizeLine);
  const orderTotal = order.orderTotal || lines.reduce((sum, line) => sum + (line.lineTotal || 0), 0) || parseAmount(order.amount);
  const amountPaid = Math.max(0, Math.min(order.amountPaid ?? (order.status === 'Payé' ? orderTotal : 0), (order.totalDueWithPrevious || orderTotal)));
  const previousBalance = Math.max(0, order.previousBalance || 0);
  const totalDueWithPrevious = Math.max(order.totalDueWithPrevious || (previousBalance + orderTotal), 0);
  const amountDue = Math.max(order.amountDue ?? Math.max(totalDueWithPrevious - amountPaid, 0), 0);
  const paymentStatus = order.paymentStatus || getPaymentStatus(amountDue, orderTotal, amountPaid);
  const status = order.status || (paymentStatus === 'Payé' ? 'Payé' : amountPaid > 0 ? 'Livrée' : 'En attente');
  return {
    ...order,
    lines,
    orderTotal,
    amountPaid,
    amountDue,
    previousBalance,
    totalDueWithPrevious,
    paymentStatus,
    status,
    amount: formatAmount(orderTotal),
    badge: getOrderBadge(status)
  };
};
const syncClientBalances = () => {
  CLIENTS = CLIENTS.map(client => {
    const latestOrder = COMMAND_HISTORY.find(order => order.client === client.name);
    const computedBalance = latestOrder ? latestOrder.amountDue : Math.max(0, client.balanceDue || 0);
    return { ...client, balanceDue: computedBalance, status: getClientStatusFromBalance({ ...client, balanceDue: computedBalance }) };
  });
};
COMMAND_HISTORY = COMMAND_HISTORY.map(normalizeOrder);
syncClientBalances();

function getGlobalSearchResults(term) {
  const q = String(term || '').trim().toLowerCase();
  if (!q) return [];
  const products = DATA_PRODUITS
    .filter(product => `${product.name} ${product.category} ${product.brand}`.toLowerCase().includes(q))
    .slice(0, 4)
    .map(product => ({ type: 'Produit', title: product.name, subtitle: `${product.category} · ${product.brand}`, view: 'stocks', action: () => { document.getElementById('stock-search').value = product.name; filterStockProducts(); } }));
  const clients = CLIENTS
    .filter(client => `${client.name} ${client.type} ${client.zone} ${client.phone}`.toLowerCase().includes(q))
    .slice(0, 4)
    .map(client => ({ type: 'Client', title: client.name, subtitle: `${client.type} · ${client.zone}`, view: 'commandes', action: () => { editClient(client.id); } }));
  const orders = COMMAND_HISTORY
    .filter(order => `${order.ref} ${order.client} ${order.status}`.toLowerCase().includes(q))
    .slice(0, 4)
    .map(order => ({ type: 'Commande', title: order.ref, subtitle: `${order.client} · ${order.status} · ${order.amount}`, view: 'commandes', action: () => {} }));
  const suppliers = SUPPLIERS
    .filter(supplier => `${supplier.name} ${supplier.city} ${supplier.products} ${supplier.status}`.toLowerCase().includes(q))
    .slice(0, 4)
    .map(supplier => ({ type: 'Fournisseur', title: supplier.name, subtitle: `${supplier.city} · ${supplier.products}`, view: 'fournisseurs', action: () => { editSupplier(supplier.id); } }));
  return [...products, ...clients, ...orders, ...suppliers];
}

function renderGlobalSearchResults(term) {
  const box = document.getElementById('global-search-results');
  if (!box) return;
  const results = getGlobalSearchResults(term);
  if (!term.trim()) {
    box.classList.remove('open');
    box.innerHTML = '';
    return;
  }
  if (results.length === 0) {
    box.innerHTML = `<div class="gs-empty">Aucun résultat pour "${term}".</div>`;
    box.classList.add('open');
    return;
  }
  box.innerHTML = results.map((item, index) => `
    ${index === 0 || results[index - 1].type !== item.type ? `<div class="gs-group">${item.type}</div>` : ''}
    <div class="gs-item" data-search-index="${index}">
      <div>
        <div class="gs-main">${item.title}</div>
        <div class="gs-sub">${item.subtitle}</div>
      </div>
      <div class="gs-tag">${item.view}</div>
    </div>`).join('');
  box.classList.add('open');
  box.querySelectorAll('.gs-item').forEach((node, index) => {
    node.onclick = () => {
      const item = results[index];
      closeGlobalSearch();
      gn(item.view);
      setTimeout(() => item.action(), 0);
    };
  });
}

function closeGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const box = document.getElementById('global-search-results');
  if (input) input.value = '';
  if (box) {
    box.classList.remove('open');
    box.innerHTML = '';
  }
}

function setupGlobalSearch() {
  const input = document.getElementById('global-search-input');
  const box = document.getElementById('global-search-results');
  if (!input || !box) return;
  input.addEventListener('input', e => renderGlobalSearchResults(e.target.value));
  document.addEventListener('click', e => {
    if (!e.target.closest('.global-search')) {
      box.classList.remove('open');
    }
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

function updateNetworkStatus() {
  const el = document.getElementById('network-status');
  if (!el) return;
  const online = navigator.onLine;
  el.textContent = online ? 'En ligne' : 'Hors ligne';
  el.classList.toggle('online', online);
  el.classList.toggle('offline', !online);
}

function setupNetworkStatus() {
  updateNetworkStatus();
  window.addEventListener('online', () => {
    updateNetworkStatus();
    showToast('Connexion Internet rétablie.', '📶');
  });
  window.addEventListener('offline', () => {
    updateNetworkStatus();
    showToast('Vous êtes hors ligne. Les données locales restent accessibles.', '⚠️');
  });
}
const getNavBadge = id => {
  if (id === 'commandes') return String(getPendingCommands().length);
  if (id === 'messages') return String(getUnreadClientOrdersCount());
  if (id === 'notifications') return String(getNotificationCount());
  return '';
};
const getTeamCoverageLabel = () => {
  const active = getActiveSecretariesCount();
  if (active >= 2) return 'équipe bien couverte';
  if (active === 1) return '1 secrétaire en poste';
  return 'aucun secrétaire connecté';
};

function showToast(msg, icon = '✅') {
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<span style="font-size:18px;">${icon}</span><span>${msg}</span>`;
  document.body.appendChild(t);
  setTimeout(() => {
    t.classList.add('hide');
    setTimeout(() => t.remove(), 350);
  }, 2500);
}

function togglePwd(inputId, eyeId) {
  const input = document.getElementById(inputId);
  const eye = document.getElementById(eyeId);
  if (!input) return;
  const hidden = input.type === 'password';
  input.type = hidden ? 'text' : 'password';
  if (eye) eye.textContent = hidden ? '🙈' : '👁';
}

function toggleDark() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('dark-icon').textContent = isDark ? '🌙' : '☀️';
  document.getElementById('dark-lbl').textContent = isDark ? 'Mode sombre' : 'Mode clair';
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function updateRoleDemoFields() {
  const creds = LOGIN_DEMO[role] || LOGIN_DEMO.admin;
  const email = document.getElementById('l-email');
  const pass = document.getElementById('l-pass');
  const err = document.getElementById('l-err');
  if (email) email.value = creds.email;
  if (pass) pass.value = creds.pass;
  if (err) err.style.display = 'none';
}

function renderPublicDepots(list = DEPOTS) {
  const container = document.getElementById('public-list');
  if (!container) return;
  container.innerHTML = `<div class="g g3">${list.map(depot => `
    <div class="dcard">
      <div class="dimg">${depot.icon}</div>
      <div class="dbody">
        <div class="dname">${depot.name}</div>
        <div class="dmeta">👤 ${depot.owner} · 📞 ${depot.phone}</div>
        <div style="font-size:12px;color:var(--tx2);margin-top:2px;">📍 ${depot.location} · ${depot.products}</div>
        <button class="btn bp bsm" style="width:100%;margin-top:8px;" onclick="openClientOrder('${depot.id}')">Passer une commande</button>
      </div>
    </div>`).join('')}</div>`;
}

function populatePublicZones() {
  const region = document.getElementById('region-filter');
  if (!region) return;
  const zones = [...new Set(DEPOTS.map(depot => depot.location))].sort((a, b) => a.localeCompare(b, 'fr'));
  region.innerHTML = `<option>Toutes les zones</option>${zones.map(zone => `<option>${zone}</option>`).join('')}`;
}

function setupPublicFilters() {
  if (publicFiltersBound) return;
  const search = document.getElementById('search-public');
  const region = document.getElementById('region-filter');
  const run = () => {
    const term = search.value.trim().toLowerCase();
    const regionValue = region.value;
    const list = DEPOTS.filter(depot => {
      const matchesTerm = !term || [depot.name, depot.owner, depot.location, depot.products].some(v => v.toLowerCase().includes(term));
      const matchesRegion = regionValue === 'Toutes les zones' || depot.location === regionValue;
      return matchesTerm && matchesRegion;
    });
    renderPublicDepots(list);
  };
  search.addEventListener('input', run);
  region.addEventListener('change', run);
  publicFiltersBound = true;
}
function showPublicHome() {
  document.body.setAttribute('data-mode', 'public');
  document.getElementById('public-home').style.display = 'block';
  document.querySelector('.private-views').style.display = 'none';
  renderPublicDepots();
  setupPublicFilters();
}

function showLogin() {
  document.body.setAttribute('data-mode', 'private');
  document.getElementById('public-home').style.display = 'none';
  document.querySelector('.private-views').style.display = 'block';
  document.getElementById('app').classList.remove('on');
  document.getElementById('login').style.display = 'flex';
  updateRoleDemoFields();
}

function showApp() {
  document.body.setAttribute('data-mode', 'private');
  document.getElementById('public-home').style.display = 'none';
  document.querySelector('.private-views').style.display = 'block';
  document.getElementById('login').style.display = 'none';
  document.getElementById('app').classList.add('on');
}

function openClientOrder(depotId) {
  currentOrderDepot = DEPOTS.find(d => d.id === depotId) || null;
  if (!currentOrderDepot) return;
  document.getElementById('order-depot-name').textContent = currentOrderDepot.name;
  document.getElementById('order-client-name').value = '';
  document.getElementById('order-client-phone').value = '';
  document.getElementById('order-products').value = '';
  document.getElementById('order-err').classList.remove('show');
  document.getElementById('client-order-overlay').classList.add('open');
}

function closeClientOrder() {
  document.getElementById('client-order-overlay').classList.remove('open');
  currentOrderDepot = null;
}

function sendClientOrder() {
  const name = document.getElementById('order-client-name').value.trim();
  const phone = document.getElementById('order-client-phone').value.trim();
  const products = document.getElementById('order-products').value.trim();
  const err = document.getElementById('order-err');
  if (!name || !phone || !products || !currentOrderDepot) {
    err.textContent = 'Veuillez remplir tous les champs.';
    err.classList.add('show');
    return;
  }
  CLIENT_ORDERS.unshift({
    id: 'order-' + Date.now(),
    depotId: currentOrderDepot.id,
    clientName: name,
    phone,
    products,
    timestamp: new Date().toLocaleString('fr-FR'),
    unread: true
  });
  localStorage.setItem('clientOrders', JSON.stringify(CLIENT_ORDERS));
  closeClientOrder();
  showToast('Demande envoyée. Réponse estimée sous 2 heures.', '🧾');
}

function setRegErr(id, msg) {
  const el = document.getElementById(id);
  el.textContent = msg;
  el.classList.add('show');
}

function clearRegErr(id) {
  document.getElementById(id).classList.remove('show');
}

function openPaymentModal(ref) {
  const order = COMMAND_HISTORY.find(item => item.ref === ref);
  if (!order) {
    showToast('Commande introuvable.', '⚠️');
    return;
  }
  selectedPaymentOrderRef = ref;
  document.getElementById('payment-order-ref').textContent = ref;
  document.getElementById('payment-client-name').textContent = order.client;
  document.getElementById('payment-current-due').textContent = formatAmount(order.amountDue || 0);
  document.getElementById('payment-paid-total').textContent = formatAmount(order.amountPaid || 0);
  document.getElementById('payment-amount-input').value = '0';
  clearRegErr('payment-err');
  document.getElementById('payment-overlay').classList.add('open');
  updatePaymentPreview();
}

function closePaymentModal() {
  selectedPaymentOrderRef = null;
  document.getElementById('payment-overlay').classList.remove('open');
}

function updatePaymentPreview() {
  const order = COMMAND_HISTORY.find(item => item.ref === selectedPaymentOrderRef);
  const input = document.getElementById('payment-amount-input');
  const newDueBox = document.getElementById('payment-new-due');
  const paidTotalBox = document.getElementById('payment-paid-total');
  if (!order || !input || !newDueBox || !paidTotalBox) return;
  const payment = Math.max(0, Math.min(parseAmount(input.value), order.amountDue || 0));
  const newDue = Math.max((order.amountDue || 0) - payment, 0);
  const newPaidTotal = (order.amountPaid || 0) + payment;
  paidTotalBox.textContent = formatAmount(newPaidTotal);
  newDueBox.textContent = formatAmount(newDue);
}

function submitPayment() {
  const order = COMMAND_HISTORY.find(item => item.ref === selectedPaymentOrderRef);
  const input = document.getElementById('payment-amount-input');
  if (!order || !input) {
    showToast('Commande introuvable.', '⚠️');
    return;
  }
  clearRegErr('payment-err');
  const payment = parseAmount(input.value);
  if (payment <= 0) {
    setRegErr('payment-err', 'Saisissez un montant de versement valide.');
    return;
  }
  if (payment > (order.amountDue || 0)) {
    setRegErr('payment-err', 'Le versement ne peut pas dépasser le reste dû.');
    return;
  }
  const now = new Date().toLocaleString('fr-FR');
  order.amountPaid = (order.amountPaid || 0) + payment;
  order.amountDue = Math.max((order.amountDue || 0) - payment, 0);
  order.paymentStatus = getPaymentStatus(order.amountDue, order.orderTotal || parseAmount(order.amount), order.amountPaid);
  if (order.amountDue <= 0) {
    order.status = 'Payé';
  } else if (order.amountPaid > 0) {
    order.status = order.amountDue > (order.orderTotal || 0) ? 'Crédit' : 'Livrée';
  }
  order.badge = getOrderBadge(order.status);
  order.timeline = order.timeline || [];
  order.timeline.unshift(`Versement de ${formatAmount(payment)} enregistré le ${now}`);
  const client = getClientByName(order.client);
  if (client) {
    client.balanceDue = order.amountDue;
    client.status = getClientStatusFromBalance(client);
    saveClients();
  }
  saveCommandHistory();
  closePaymentModal();
  showToast(`Versement enregistré sur ${order.ref}.`, '💸');
  gn('commandes');
}

function setRegisterStep(step) {
  const isOwnerStep = step === 1;
  document.getElementById('reg-step-1').style.display = isOwnerStep ? 'block' : 'none';
  document.getElementById('reg-step-2').style.display = step === 2 ? 'block' : 'none';
  document.getElementById('reg-success').style.display = step === 'success' ? 'block' : 'none';
  document.getElementById('step-dot-1').classList.toggle('active', step === 1 || step === 2 || step === 'success');
  document.getElementById('step-dot-2').classList.toggle('active', step === 2 || step === 'success');
  document.getElementById('step-lbl-1').classList.toggle('active', step === 1);
  document.getElementById('step-lbl-2').classList.toggle('active', step === 2 || step === 'success');
}

function openRegister() {
  document.getElementById('register-overlay').classList.add('open');
  setRegisterStep(1);
  clearRegErr('reg-err-1');
  clearRegErr('reg-err-2');
}

function closeRegister() {
  document.getElementById('register-overlay').classList.remove('open');
  setRegisterStep(1);
}

function regNext() {
  const required = ['reg-prenom', 'reg-nom', 'reg-email', 'reg-tel', 'reg-pass'];
  clearRegErr('reg-err-1');
  if (required.some(id => !document.getElementById(id).value.trim())) {
    setRegErr('reg-err-1', 'Veuillez remplir tous les champs obligatoires.');
    return;
  }
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;
  const pass2 = document.getElementById('reg-pass2').value;
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    setRegErr('reg-err-1', 'Adresse email invalide.');
    return;
  }
  if (pass.length < 8) {
    setRegErr('reg-err-1', 'Le mot de passe doit comporter au moins 8 caractères.');
    return;
  }
  if (pass !== pass2) {
    setRegErr('reg-err-1', 'Les mots de passe ne correspondent pas.');
    return;
  }
  setRegisterStep(2);
}

function regBack() {
  setRegisterStep(1);
}

function regSubmit() {
  clearRegErr('reg-err-2');
  if (!document.getElementById('reg-depot').value.trim() || !document.getElementById('reg-commune').value.trim()) {
    setRegErr('reg-err-2', 'Veuillez indiquer le nom du dépôt et la commune.');
    return;
  }
  setRegisterStep('success');
}

function accessDemoFromRegister() {
  closeRegister();
  showLogin();
  updateRoleDemoFields();
}

function pickRole(nextRole) {
  role = nextRole;
  document.querySelectorAll('.r-opt').forEach(el => el.classList.remove('sel'));
  document.getElementById('o-' + nextRole).classList.add('sel');
  updateRoleDemoFields();
}

async function doLogin() {
  const email = document.getElementById('l-email').value.trim().toLowerCase();
  const pass = document.getElementById('l-pass').value;
  const err = document.getElementById('l-err');

  if (!email || !pass) {
    err.textContent = 'Veuillez entrer votre email et mot de passe.';
    err.style.display = 'block';
    return;
  }

  // ✅ Vérifier d'abord les identifiants démo
  const creds = LOGIN_DEMO[role];
  if (creds && email === creds.email && pass === creds.pass) {
    sessionStorage.setItem('userRole', role);
    err.style.display = 'none';
    showApp();
    applyRole(role);
    gn(role === 'admin' ? 'dashboard' : 'stocks');
    return;
  }

  // ✅ Sinon essayer Firebase
  try {
    const { loginUser } = await import('./firebase-auth.js');
    await loginUser(email, pass);
    sessionStorage.setItem('userRole', role);
    err.style.display = 'none';
    showApp();
    applyRole(role);
    gn(role === 'admin' ? 'dashboard' : 'stocks');
  } catch (e) {
    const { getFirebaseErrorMessage } = await import('./firebase-auth.js');
    err.textContent = getFirebaseErrorMessage(e.code);
    err.style.display = 'block';
  }
}

function doLogout() {
  sessionStorage.removeItem('userRole');
  cartData = [];
  selectedConversationId = null;
  closeSidebar();
  pickRole('admin');
  showPublicHome();
  showToast('Déconnexion réussie.', '👋');
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sb-backdrop').classList.toggle('open');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sb-backdrop').classList.remove('open');
}
function applyRole(nextRole) {
  role = nextRole;
  const c = CFG[nextRole];
  document.body.setAttribute('data-role', nextRole);
  document.getElementById('sidebar').style.background = c.sbBg;
  document.getElementById('sb-av').textContent = c.init;
  document.getElementById('sb-av').style.background = c.avBg;
  document.getElementById('sb-nm').textContent = c.name;
  document.getElementById('sb-rl').textContent = c.lbl;
  document.getElementById('sb-bx').textContent = c.badge;
  document.getElementById('sb-bx').style.background = c.badgeBg;
  document.getElementById('sb-bx').style.color = c.badgeColor;
  document.getElementById('role-pill').textContent = c.pill.txt;
  document.getElementById('role-pill').style.background = c.pill.bg;
  document.getElementById('role-pill').style.color = c.pill.color;
  const cta = document.getElementById('main-cta');
  cta.textContent = c.cta.label;
  cta.className = c.cta.cls;
  cta.onclick = () => gn(nextRole === 'admin' ? 'commandes' : 'stocks');
  buildNav(c.nav);
}

function buildNav(items) {
  const el = document.getElementById('sb-nav');
  el.innerHTML = '';
  items.forEach(item => {
    if (item.s) {
      const section = document.createElement('div');
      section.className = 'nl';
      section.textContent = item.s;
      el.appendChild(section);
      return;
    }
    const link = document.createElement('div');
    link.className = 'ni' + (item.locked ? ' locked' : '');
    link.id = 'ni-' + item.id;
    const badge = item.badge || getNavBadge(item.id);
    link.innerHTML = `<span class="n-ic">${item.ic}</span>${item.lb}${badge && badge !== '0' ? `<span class="n-badge">${badge}</span>` : ''}${item.locked ? '<span style="margin-left:auto;font-size:10px;">🔒</span>' : ''}`;
    link.onclick = () => gn(item.id);
    el.appendChild(link);
  });
}

function buildClientInput() {
  return `<input type="text" id="cmd-client-input" list="client-list" placeholder="Saisir un nom ou sélectionner...">
  <datalist id="client-list">
    ${CLIENTS.map(client => `<option value="${client.name}">${client.type} · ${client.zone}</option>`).join('')}
  </datalist>`;
}

function buildProductDatalist(id) {
  return `<datalist id="${id}">${DATA_PRODUITS.map(product => `<option value="${product.name}">${product.category} · ${product.brand}</option>`).join('')}</datalist>`;
}

function buildProductCategorySelect(id) {
  return `<select id="${id}">${getProductCategories().map(category => `<option value="${category}">${category}</option>`).join('')}</select>`;
}

function buildCategoryDatalist(id) {
  return `<datalist id="${id}">${getProductCategories().filter(category => category !== 'Toutes').map(category => `<option value="${category}"></option>`).join('')}</datalist>`;
}

function buildDeleteBanner(viewId) {
  if (!pendingDeletion || pendingDeletion.view !== viewId) return '';
  return `<div class="alert ad" style="justify-content:space-between;align-items:center;">
    <span>Confirmer la suppression de ${pendingDeletion.label} ?</span>
    <span style="display:flex;gap:8px;flex-wrap:wrap;">
      <button class="btn bo bsm" onclick="cancelDeletion()">Annuler</button>
      <button class="btn bp bsm" onclick="confirmDeletion()">Confirmer</button>
    </span>
  </div>`;
}

function getFilteredProducts(category = 'Toutes', term = '') {
  const normalizedTerm = String(term || '').trim().toLowerCase();
  return DATA_PRODUITS.filter(product => {
    const matchesCategory = category === 'Toutes' || product.category === category;
    const haystack = `${product.name} ${product.category} ${product.brand}`.toLowerCase();
    const matchesTerm = !normalizedTerm || haystack.includes(normalizedTerm);
    return matchesCategory && matchesTerm;
  });
}

function renderCart() {
  const box = document.getElementById('cmd-cart-container');
  if (!box) return;
  if (cartData.length === 0) {
    box.innerHTML = '<div style="font-size:12px;color:var(--tx3);">Aucun produit ajouté pour le moment.</div>';
    updateOrderPaymentSummary();
    return;
  }
  let total = 0;
  box.innerHTML = cartData.map((item, index) => {
    total += item.price;
    return `<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;"><span>${item.name} × ${formatQty(item.qty)}</span><span style="display:flex;gap:10px;"><span>${formatAmount(item.price)}</span><span style="color:var(--red);cursor:pointer;" onclick="removeFromCart(${index})">✕</span></span></div>`;
  }).join('') + `<div style="border-top:1px solid var(--bdr);padding-top:8px;display:flex;justify-content:space-between;font-weight:600;margin-top:8px;"><span>Total commande</span><span style="color:var(--green);">${formatAmount(total)}</span></div>`;
  updateOrderPaymentSummary();
}

function addToCart() {
  const product = document.getElementById('cmd-prod-sel')?.value.trim();
  const qty = parseQtyInput(document.getElementById('cmd-prod-qty')?.value || '1');
  if (!getProductByName(product)) {
    showToast('Choisissez ou saisissez un produit existant.', '⚠️');
    return;
  }
  if (qty <= 0) {
    showToast('Saisissez une quantité valide, par exemple 0,5 ou 1.', '⚠️');
    return;
  }
  const existing = cartData.find(item => item.name === product);
  if (existing) {
    existing.qty += qty;
    existing.price = getProductPrice(product) * existing.qty;
  } else {
    cartData.push({ name: product, qty, price: getProductPrice(product) * qty });
  }
  renderCart();
}

function addProductToOrder(productName, qty = 1) {
  const existing = cartData.find(item => item.name === productName);
  if (existing) {
    existing.qty += qty;
    existing.price = getProductPrice(productName) * existing.qty;
  } else {
    cartData.push({ name: productName, qty, price: getProductPrice(productName) * qty });
  }
  showToast(`${productName} ajouté au panier.`, '🛒');
  gn('commandes');
}

function removeFromCart(index) {
  cartData.splice(index, 1);
  renderCart();
}

function updateOrderPaymentSummary() {
  const totalBox = document.getElementById('cmd-order-total');
  const previousBox = document.getElementById('cmd-previous-balance');
  const grandTotalBox = document.getElementById('cmd-grand-total');
  const remainingBox = document.getElementById('cmd-remaining-due');
  const paidInput = document.getElementById('cmd-amount-paid');
  const clientName = document.getElementById('cmd-client-input')?.value.trim();
  const client = getClientByName(clientName);
  const previousBalance = getClientBalance(client);
  const orderTotal = cartData.reduce((sum, item) => sum + item.price, 0);
  const totalDue = previousBalance + orderTotal;
  const amountPaid = Math.max(0, Math.min(parseAmount(paidInput?.value), totalDue));
  const remaining = Math.max(totalDue - amountPaid, 0);
  if (totalBox) totalBox.textContent = formatAmount(orderTotal);
  if (previousBox) previousBox.textContent = formatAmount(previousBalance);
  if (grandTotalBox) grandTotalBox.textContent = formatAmount(totalDue);
  if (remainingBox) remainingBox.textContent = formatAmount(remaining);
}

function submitForm() {
  if (cartData.length === 0) {
    showToast('Ajoutez au moins un produit.', '⚠️');
    return;
  }
  const client = document.getElementById('cmd-client-input')?.value.trim() || 'Nouveau client';
  let clientRecord = getClientByName(client);
  if (!clientRecord) {
    clientRecord = {
      id: 'cli-' + Date.now(),
      name: client,
      phone: 'Non renseigné',
      zone: 'À compléter',
      type: 'Client dépôt',
      status: 'Nouveau',
      balanceDue: 0
    };
    CLIENTS.unshift({
      ...clientRecord
    });
    saveClients();
  }
  const orderTotal = cartData.reduce((sum, item) => sum + item.price, 0);
  const previousBalance = getClientBalance(clientRecord);
  const totalDueWithPrevious = previousBalance + orderTotal;
  const amountPaid = Math.max(0, Math.min(parseAmount(document.getElementById('cmd-amount-paid')?.value), totalDueWithPrevious));
  const amountDue = Math.max(totalDueWithPrevious - amountPaid, 0);
  const paymentStatus = getPaymentStatus(amountDue, orderTotal, amountPaid);
  const orderLines = cartData.map(item => ({ name: item.name, qty: item.qty, unitPrice: getProductPrice(item.name), price: item.price, lineTotal: item.price }));
  const now = new Date().toLocaleString('fr-FR');
  const status = paymentStatus === 'Payé' ? 'Payé' : amountPaid > 0 ? 'Livrée' : (amountDue > orderTotal ? 'Crédit' : 'En attente');
  COMMAND_HISTORY.unshift(normalizeOrder({
    ref: 'CMD-' + String(93 + COMMAND_HISTORY.length).padStart(3, '0'),
    client,
    amount: formatAmount(orderTotal),
    orderTotal,
    amountPaid,
    amountDue,
    previousBalance,
    totalDueWithPrevious,
    status,
    paymentStatus,
    badge: getOrderBadge(status),
    lines: orderLines,
    createdAt: now,
    timeline: [
      `Créée le ${now}`,
      `Ancien solde client : ${formatAmount(previousBalance)}`,
      `Paiement reçu : ${formatAmount(amountPaid)}`,
      `Reste dû après commande : ${formatAmount(amountDue)}`
    ]
  }));
  clientRecord.balanceDue = amountDue;
  clientRecord.status = getClientStatusFromBalance(clientRecord);
  saveClients();
  saveCommandHistory();
  cartData = [];
  showToast('Commande enregistrée avec succès.', '🎉');
  buildNav(CFG[role].nav);
  gn('commandes');
}

function printInvoice(ref) {
  const order = COMMAND_HISTORY.find(item => item.ref === ref);
  if (!order) {
    showToast('Commande introuvable.', '⚠️');
    return;
  }
  const client = getClientByName(order.client);
  const invoiceWindow = window.open('', '_blank', 'width=900,height=700');
  if (!invoiceWindow) {
    showToast('Autorisez les fenêtres pour imprimer la facture.', '⚠️');
    return;
  }
  const rows = (order.lines || []).map((line, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${line.name}</td>
      <td style="text-align:center;">${formatQty(line.qty)}</td>
      <td style="text-align:center;">${line.qty >= 1 ? 'Casier/Carton' : 'Détail'}</td>
      <td style="text-align:right;">${formatAmount(line.unitPrice || ((line.lineTotal || line.price) / Math.max(line.qty || 1, 1)))}</td>
      <td style="text-align:center;">0%</td>
      <td style="text-align:right;">${formatAmount(line.lineTotal || line.price)}</td>
    </tr>`).join('');
  const orderDate = order.createdAt || new Date().toLocaleString('fr-FR');
  const sellerName = role === 'sec' ? CFG.sec.name : CFG.admin.name;
  const subtotal = order.orderTotal || parseAmount(order.amount);
  const globalDiscount = 0;
  const vat = 0;
  const totalCommande = subtotal - globalDiscount + vat;
  const previousBalance = order.previousBalance || 0;
  const totalToPay = order.totalDueWithPrevious || totalCommande;
  const amountPaid = order.amountPaid || 0;
  const amountDue = order.amountDue || 0;
  const paymentLabel = order.paymentStatus || order.status;
  invoiceWindow.document.write(`<!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Facture ${order.ref}</title>
    <style>
      *{box-sizing:border-box}
      @page{size:A4;margin:14mm}
      body{font-family:Arial,sans-serif;margin:0;color:#1d2433;background:#fff}
      .sheet{width:100%;max-width:190mm;margin:0 auto}
      .hero{background:#223f73;color:#fff;padding:14px 18px 12px;text-align:center}
      .hero h1{margin:0;font-size:22px;letter-spacing:.6px}
      .hero .sub{margin-top:6px;font-size:12px;font-style:italic;opacity:.92}
      .hero .meta{margin-top:6px;font-size:11px;line-height:1.5;opacity:.95}
      .headline{display:grid;grid-template-columns:1.25fr .95fr;gap:18px;margin:20px 0 16px}
      .invoice-title{font-size:32px;font-weight:800;color:#223f73;letter-spacing:.4px;padding-top:10px}
      .panel{border:1px solid #d5dbea;background:#fbfcff}
      .panel table{width:100%;border-collapse:collapse}
      .panel td{border:1px solid #d5dbea;padding:8px 10px;font-size:12px}
      .panel td:first-child{width:42%;font-weight:700;color:#223f73;background:#f1f4fa}
      .section-title{background:#223f73;color:#fff;font-weight:700;text-align:center;padding:5px 10px;font-size:12px;margin-top:10px}
      .client table,.lines,.totals{width:100%;border-collapse:collapse}
      .client td{border:1px solid #d5dbea;padding:7px 10px;font-size:12px}
      .client td:first-child{width:28%;font-weight:700;color:#223f73;background:#f7f9fc}
      .lines{margin-top:0}
      .lines th,.lines td{border:1px solid #d5dbea;padding:8px 8px;font-size:12px}
      .lines thead th{background:#223f73;color:#fff;text-transform:uppercase;font-size:11px}
      .lines tbody tr:nth-child(even){background:#f8fafe}
      .totals-wrap{display:grid;grid-template-columns:1fr 290px;gap:20px;margin-top:14px;align-items:start}
      .notes{font-size:12px;color:#283142}
      .notes .line{padding:7px 0;border-bottom:1px solid #d5dbea}
      .totals td{border:1px solid #d5dbea;padding:8px 10px;font-size:12px}
      .totals td:first-child{font-weight:700;color:#223f73;background:#f7f9fc}
      .totals .grand td{background:#223f73;color:#fff;font-size:15px;font-weight:800}
      .totals .danger td:last-child{color:#b42318;font-weight:800}
      .totals .success td:last-child{color:#166534;font-weight:800}
      .status-chip{display:inline-block;padding:6px 12px;border-radius:999px;background:#e9eef9;color:#223f73;font-size:12px;font-weight:700}
      .footer-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;margin-top:18px}
      .box-title{font-size:12px;font-weight:700;color:#223f73;margin-bottom:6px}
      .obs-box{min-height:84px;border:1px solid #d5dbea;background:#f7f9fc}
      .sign-col{display:grid;gap:24px}
      .sign-line{padding-top:38px;border-bottom:1px solid #223f73;font-size:12px;color:#223f73;text-align:center}
      .footer-bar{margin-top:18px;background:#223f73;color:#fff;padding:7px 12px;text-align:center;font-size:11px}
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="hero">
        <h1>DÉPÔT DE BOISSONS</h1>
        <div class="sub">Vente en gros et détail, boissons alcoolisées & non alcoolisées</div>
        <div class="meta">
          Avenue Cheikh Anta Diop, Dakar, Sénégal | Tél: +221 77 123 45 67 | Email: depot@boissons.sn<br>
          NINEA: 123456789 | RC: SN-DKR-2020-B-12345
        </div>
      </div>

      <div class="headline">
        <div class="invoice-title">FACTURE</div>
        <div class="panel">
          <table>
            <tr><td>N° Facture</td><td>${order.ref}</td></tr>
            <tr><td>Date</td><td>${orderDate}</td></tr>
            <tr><td>Vendeur</td><td>${sellerName}</td></tr>
            <tr><td>Paiement</td><td><span class="status-chip">${paymentLabel}</span></td></tr>
          </table>
        </div>
      </div>

      <div class="section-title">INFORMATIONS CLIENT</div>
      <div class="client">
        <table>
          <tr><td>Nom / Société</td><td>${order.client}</td><td>Mode de paiement</td><td>${paymentLabel}</td></tr>
          <tr><td>Adresse</td><td>${client?.zone || 'À compléter'}</td><td>Téléphone</td><td>${client?.phone || 'Non renseigné'}</td></tr>
          <tr><td>Ancien solde</td><td>${formatAmount(previousBalance)}</td><td>Versement du jour</td><td>${formatAmount(amountPaid)}</td></tr>
        </table>
      </div>

      <table class="lines">
        <thead>
          <tr>
            <th>#</th>
            <th>Désignation</th>
            <th>Qté</th>
            <th>Unité</th>
            <th>P.U (FCFA)</th>
            <th>Remise %</th>
            <th>Total (FCFA)</th>
          </tr>
        </thead>
        <tbody>${rows || '<tr><td colspan="7">Détail indisponible</td></tr>'}</tbody>
      </table>

      <div class="totals-wrap">
        <div class="notes">
          <div class="line"><strong>Arrêtée la présente facture à la somme de :</strong> ${formatAmount(totalToPay)}</div>
          <div class="line"><strong>Observations :</strong> Facture générée depuis DépôtConnect avec suivi de versement et solde reporté.</div>
        </div>
        <table class="totals">
          <tr><td>Sous-total HT</td><td style="text-align:right;">${formatAmount(subtotal)}</td></tr>
          <tr><td>TVA (18%)</td><td style="text-align:right;">${formatAmount(vat)}</td></tr>
          <tr><td>Remise globale</td><td style="text-align:right;">${formatAmount(globalDiscount)}</td></tr>
          <tr><td>Total commande</td><td style="text-align:right;">${formatAmount(totalCommande)}</td></tr>
          <tr><td>Ancien solde</td><td style="text-align:right;">${formatAmount(previousBalance)}</td></tr>
          <tr><td>Total à payer</td><td style="text-align:right;">${formatAmount(totalToPay)}</td></tr>
          <tr class="success"><td>Montant versé</td><td style="text-align:right;">${formatAmount(amountPaid)}</td></tr>
          <tr class="danger grand"><td>Reste à recouvrer</td><td style="text-align:right;">${formatAmount(amountDue)}</td></tr>
        </table>
      </div>

      <div class="footer-grid">
        <div>
          <div class="box-title">Observations</div>
          <div class="obs-box"></div>
          <div class="sign-line" style="margin-top:28px;">Cachet & Signature du vendeur</div>
        </div>
        <div class="sign-col">
          <div class="sign-line">Signature du client</div>
        </div>
      </div>

      <div class="footer-bar">Merci pour votre confiance ! | Dépôt de Boissons | Dakar, Sénégal | www.depotboissons.sn</div>
    </div>
  </body>
  </html>`);
  invoiceWindow.document.close();
  invoiceWindow.focus();
  order.timeline = order.timeline || [];
  order.timeline.unshift(`Facture imprimée le ${new Date().toLocaleString('fr-FR')}`);
  saveCommandHistory();
  setTimeout(() => invoiceWindow.print(), 250);
}

function printDeliveryNote(ref) {
  const order = COMMAND_HISTORY.find(item => item.ref === ref);
  if (!order) {
    showToast('Commande introuvable.', '⚠️');
    return;
  }
  const client = getClientByName(order.client);
  const noteWindow = window.open('', '_blank', 'width=900,height=700');
  if (!noteWindow) {
    showToast('Autorisez les fenêtres pour imprimer le bon.', '⚠️');
    return;
  }
  const rows = (order.lines || []).map((line, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${line.name}</td>
      <td style="text-align:center;">${formatQty(line.qty)}</td>
      <td style="text-align:center;">${line.qty >= 1 ? 'Casier/Carton' : 'Détail'}</td>
      <td></td>
    </tr>`).join('');
  const orderDate = order.createdAt || new Date().toLocaleString('fr-FR');
  const sellerName = role === 'sec' ? CFG.sec.name : CFG.admin.name;
  noteWindow.document.write(`<!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="UTF-8">
    <title>Bon de livraison ${order.ref}</title>
    <style>
      *{box-sizing:border-box}
      @page{size:A4;margin:14mm}
      body{font-family:Arial,sans-serif;margin:0;color:#1d2433;background:#fff}
      .sheet{width:100%;max-width:190mm;margin:0 auto}
      .hero{background:#223f73;color:#fff;padding:14px 18px 12px;text-align:center}
      .hero h1{margin:0;font-size:22px;letter-spacing:.6px}
      .hero .sub{margin-top:6px;font-size:12px;font-style:italic;opacity:.92}
      .hero .meta{margin-top:6px;font-size:11px;line-height:1.5;opacity:.95}
      .headline{display:grid;grid-template-columns:1.25fr .95fr;gap:18px;margin:20px 0 16px}
      .invoice-title{font-size:30px;font-weight:800;color:#223f73;letter-spacing:.4px;padding-top:10px}
      .panel{border:1px solid #d5dbea;background:#fbfcff}
      .panel table,.client table,.lines{width:100%;border-collapse:collapse}
      .panel td,.client td,.lines th,.lines td{border:1px solid #d5dbea;padding:8px 10px;font-size:12px}
      .panel td:first-child,.client td:first-child{font-weight:700;color:#223f73;background:#f1f4fa}
      .section-title{background:#223f73;color:#fff;font-weight:700;text-align:center;padding:5px 10px;font-size:12px;margin-top:10px}
      .client td:first-child{width:28%;background:#f7f9fc}
      .lines thead th{background:#223f73;color:#fff;text-transform:uppercase;font-size:11px}
      .lines tbody tr:nth-child(even){background:#f8fafe}
      .notes{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:18px}
      .note-box{border:1px solid #d5dbea;background:#f7f9fc;min-height:88px;padding:12px;font-size:12px;color:#283142}
      .sign{display:grid;grid-template-columns:1fr 1fr;gap:42px;margin-top:26px}
      .line{padding-top:42px;border-bottom:1px solid #223f73;font-size:12px;color:#223f73;text-align:center}
      .footer-bar{margin-top:18px;background:#223f73;color:#fff;padding:7px 12px;text-align:center;font-size:11px}
    </style>
  </head>
  <body>
    <div class="sheet">
      <div class="hero">
        <h1>DÉPÔT DE BOISSONS</h1>
        <div class="sub">Vente en gros et détail, boissons alcoolisées & non alcoolisées</div>
        <div class="meta">
          Avenue Cheikh Anta Diop, Dakar, Sénégal | Tél: +221 77 123 45 67 | Email: depot@boissons.sn<br>
          NINEA: 123456789 | RC: SN-DKR-2020-B-12345
        </div>
      </div>

      <div class="headline">
        <div class="invoice-title">BON DE LIVRAISON</div>
        <div class="panel">
          <table>
            <tr><td>N° BL</td><td>${order.ref}</td></tr>
            <tr><td>Date</td><td>${orderDate}</td></tr>
            <tr><td>Préparé par</td><td>${sellerName}</td></tr>
            <tr><td>Client</td><td>${order.client}</td></tr>
          </table>
        </div>
      </div>

      <div class="section-title">INFORMATIONS CLIENT & LIVRAISON</div>
      <div class="client">
        <table>
          <tr><td>Nom / Société</td><td>${order.client}</td><td>Téléphone</td><td>${client?.phone || 'Non renseigné'}</td></tr>
          <tr><td>Adresse / Zone</td><td>${client?.zone || 'À compléter'}</td><td>Statut commande</td><td>${order.paymentStatus || order.status}</td></tr>
        </table>
      </div>

      <table class="lines">
        <thead><tr><th>#</th><th>Désignation</th><th>Qté</th><th>Unité</th><th>Observation</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="5">Détail indisponible</td></tr>'}</tbody>
      </table>

      <div class="notes">
        <div class="note-box">
          <strong>Consignes de livraison :</strong><br>
          Marchandises remises en bon état, à vérifier par le client au moment de la réception.
        </div>
        <div class="note-box">
          <strong>Observations :</strong><br>
          Livraison liée à la commande ${order.ref}. Toute réserve doit être signalée à la remise.
        </div>
      </div>

      <div class="sign">
        <div><div class="line">Cachet & Signature du vendeur</div></div>
        <div><div class="line">Signature du client</div></div>
      </div>

      <div class="footer-bar">Bon de livraison généré par DépôtConnect | Dakar, Sénégal | www.depotboissons.sn</div>
    </div>
  </body>
  </html>`);
  noteWindow.document.close();
  noteWindow.focus();
  order.timeline = order.timeline || [];
  order.timeline.unshift(`Bon de livraison imprimé le ${new Date().toLocaleString('fr-FR')}`);
  saveCommandHistory();
  setTimeout(() => noteWindow.print(), 250);
}

function markOrderPaid(ref) {
  setOrderStatus(ref, 'Payé');
  showToast(`Commande ${ref} marquée comme payée.`, '💸');
}

function submitStock() {
  const name = document.getElementById('stock-prod')?.value.trim();
  const qty = parseInt(document.getElementById('stock-qty')?.value || '0', 10);
  const type = document.getElementById('stock-type')?.value;
  const product = getProductByName(name);
  if (!product || qty <= 0) {
    showToast('Choisissez un produit et une quantité valide.', '⚠️');
    return;
  }
  product.qty = Math.max(0, product.qty + (type === 'sortie' ? -qty : qty));
  if (product.qty <= 12) {
    product.status = 'Stock bas';
    product.badge = 'br';
  } else if (product.qty <= 25) {
    product.status = 'Limité';
    product.badge = 'bgold';
  } else {
    product.status = 'OK';
    product.badge = 'bg';
  }
  saveProducts();
  showToast('Mouvement de stock enregistré.', '📦');
  buildNav(CFG[role].nav);
  gn('stocks');
}

function resetProductEditor() {
  editingProductName = null;
}

function resetClientEditor() {
  editingClientId = null;
}

function resetSupplierEditor() {
  editingSupplierId = null;
}

function addProduct() {
  const name = document.getElementById('new-product-name')?.value.trim();
  const category = document.getElementById('new-product-category')?.value.trim();
  const brand = document.getElementById('new-product-brand')?.value.trim();
  const qty = parseInt(document.getElementById('new-product-qty')?.value || '0', 10);
  const priceInput = document.getElementById('new-product-price')?.value.trim();
  const priceValue = parseInt(String(priceInput).replace(/\D/g, ''), 10);
  const existing = editingProductName ? getProductByName(editingProductName) : null;
  if (!name || !category || !brand || qty < 0 || !priceValue) {
    showToast('Renseignez nom, catégorie, format et prix.', '⚠️');
    return;
  }
  if (!existing && getProductByName(name)) {
    showToast('Ce produit existe déjà dans le catalogue.', '⚠️');
    return;
  }
  let status = 'OK';
  let badge = 'bg';
  if (qty <= 12) {
    status = 'Stock bas';
    badge = 'br';
  } else if (qty <= 25) {
    status = 'Limité';
    badge = 'bgold';
  }
  if (existing) {
    existing.name = name;
    existing.category = category;
    existing.brand = brand;
    existing.qty = qty;
    existing.price = formatAmount(priceValue);
    existing.badge = badge;
    existing.status = status;
  } else {
    DATA_PRODUITS.unshift({
      name,
      category,
      brand,
      qty,
      price: formatAmount(priceValue),
      badge,
      status
    });
  }
  saveProducts();
  resetProductEditor();
  showToast(existing ? 'Produit mis à jour.' : 'Nouveau produit ajouté au catalogue.', existing ? '✏️' : '✅');
  gn('stocks');
}

function editProduct(productName) {
  const product = getProductByName(productName);
  if (!product) return;
  editingProductName = product.name;
  gn('stocks');
}

function deleteProduct(productName) {
  const product = getProductByName(productName);
  if (!product) return;
  pendingDeletion = { type: 'product', key: product.name, label: product.name, view: 'stocks' };
  gn('stocks');
}

function filterStockProducts() {
  const category = document.getElementById('stock-category-filter')?.value || 'Toutes';
  const term = document.getElementById('stock-search')?.value || '';
  const rows = getFilteredProducts(category, term);
  const tbody = document.getElementById('stock-products-body');
  const count = document.getElementById('stock-products-count');
  if (!tbody || !count) return;
  count.textContent = `${rows.length} produit(s) affiché(s)`;
  tbody.innerHTML = rows.map(item => `<tr><td><strong>${item.name}</strong><div style="font-size:11px;color:var(--tx3);">${item.brand}</div></td><td>${item.category}</td><td>${item.qty}</td><td>${item.price}</td><td><span class="badge ${item.badge}">${item.status}</span></td><td style="display:flex;gap:6px;flex-wrap:wrap;"><button class="btn ${role === 'sec' ? 'bs' : 'bp'} bsm" onclick="addProductToOrder('${item.name.replace(/'/g, "\\'")}')">Ajouter</button>${role === 'admin' ? `<button class="btn bo bsm" onclick="editProduct('${item.name.replace(/'/g, "\\'")}')">Modifier</button><button class="btn bo bsm" style="color:var(--red);border-color:var(--red);" onclick="deleteProduct('${item.name.replace(/'/g, "\\'")}')">Supprimer</button>` : ''}</td></tr>`).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--tx3);padding:18px;">Aucun produit ne correspond à cette recherche.</td></tr>`;
}

function refreshCommandProductSuggestions() {
  const category = document.getElementById('cmd-category-filter')?.value || 'Toutes';
  const term = document.getElementById('cmd-search')?.value || '';
  const list = document.getElementById('cmd-products-list');
  if (!list) return;
  const rows = getFilteredProducts(category, term);
  list.innerHTML = rows.map(product => `<option value="${product.name}">${product.category} · ${product.brand}</option>`).join('');
}

function setupProductTools(viewId) {
  if (viewId === 'stocks') {
    document.getElementById('stock-category-filter')?.addEventListener('change', filterStockProducts);
    document.getElementById('stock-search')?.addEventListener('input', filterStockProducts);
  }
  if (viewId === 'commandes') {
    document.getElementById('cmd-category-filter')?.addEventListener('change', refreshCommandProductSuggestions);
    document.getElementById('cmd-search')?.addEventListener('input', refreshCommandProductSuggestions);
    document.getElementById('cmd-client-input')?.addEventListener('input', updateOrderPaymentSummary);
    document.getElementById('cmd-amount-paid')?.addEventListener('input', updateOrderPaymentSummary);
    refreshCommandProductSuggestions();
    updateOrderPaymentSummary();
  }
}

function buildConversations() {
  const fromOrders = CLIENT_ORDERS.filter(order => order.depotId === 'depot1').slice(0, 5).map(order => ({
    id: order.id,
    name: order.clientName,
    initials: order.clientName.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(),
    preview: order.products.length > 40 ? order.products.slice(0, 40) + '...' : order.products,
    time: order.timestamp,
    unread: order.unread,
    bg: 'var(--green-p)',
    fg: 'var(--green)',
    messages: [{ side: 'left', name: order.clientName, text: order.products, time: order.timestamp, bg: 'var(--green-p)', fg: 'var(--green)' }]
  }));
  return fromOrders.concat([
    {
      id: 'fatou', name: 'Épicerie Fatou Diop', initials: 'FD', preview: 'Avez-vous Castel 33cl ?', time: '10:42', unread: false,
      bg: 'var(--gold-p)', fg: 'var(--gold)',
      messages: [
        { side: 'left', name: 'Épicerie Fatou Diop', text: 'Bonjour, avez-vous Castel 33cl en stock ?', time: '10:40', bg: 'var(--gold-p)', fg: 'var(--gold)' },
        { side: 'right', name: CFG[role].name, text: 'Oui, nous avons 12 cartons disponibles.', time: '10:42', bg: 'var(--green)', fg: '#fff' }
      ]
    },
    {
      id: 'terranga', name: 'Bar Terranga', initials: 'BT', preview: 'Commande CMD-091 reçue.', time: 'Hier', unread: false,
      bg: 'var(--blue-p)', fg: 'var(--blue)',
      messages: [
        { side: 'left', name: 'Bar Terranga', text: 'Merci, la commande CMD-091 est bien reçue.', time: 'Hier', bg: 'var(--blue-p)', fg: 'var(--blue)' },
        { side: 'right', name: CFG[role].name, text: 'Parfait, la livraison est confirmée pour 16h.', time: 'Hier', bg: 'var(--green)', fg: '#fff' }
      ]
    }
  ]);
}

function selectClientConv(id) {
  selectedConversationId = id;
  const order = CLIENT_ORDERS.find(item => item.id === id);
  if (order?.unread) {
    order.unread = false;
    localStorage.setItem('clientOrders', JSON.stringify(CLIENT_ORDERS));
    buildNav(CFG[role].nav);
  }
  gn('messages');
}

function sendMessageReply() {
  const input = document.getElementById('reply-message');
  if (!input || !input.value.trim()) {
    showToast('Saisissez un message avant envoi.', '⚠️');
    return;
  }
    showToast('Réponse envoyée au client.', '💬');
  input.value = '';
  buildNav(CFG[role].nav);
}

function saveTeamMembers() {
  localStorage.setItem('teamMembers', JSON.stringify(TEAM_MEMBERS));
}

function saveForumTopics() {
  localStorage.setItem('forumTopics', JSON.stringify(FORUM_TOPICS));
}

function saveProducts() {
  localStorage.setItem('productsCatalog', JSON.stringify(DATA_PRODUITS));
}

function saveCommandHistory() {
  COMMAND_HISTORY = COMMAND_HISTORY.map(normalizeOrder);
  localStorage.setItem('commandHistory', JSON.stringify(COMMAND_HISTORY));
}

function saveClients() {
  CLIENTS = CLIENTS.map(client => ({ ...client, balanceDue: Math.max(0, client.balanceDue || 0), status: getClientStatusFromBalance(client) }));
  localStorage.setItem('clientsCatalog', JSON.stringify(CLIENTS));
}

function saveSuppliers() {
  localStorage.setItem('suppliersCatalog', JSON.stringify(SUPPLIERS));
}

function addSecretary() {
  const name = document.getElementById('team-name')?.value.trim();
  const phone = document.getElementById('team-phone')?.value.trim();
  const shift = document.getElementById('team-shift')?.value.trim();
  if (!name || !phone || !shift) {
    showToast('Renseignez le nom, le téléphone et l’horaire.', '⚠️');
    return;
  }
  TEAM_MEMBERS.unshift({
    id: 'team-' + Date.now(),
    name,
    role: 'Secrétaire',
    phone,
    status: 'En ligne',
    shift
  });
  saveTeamMembers();
  showToast('Secrétaire ajouté à l’équipe.', '👥');
  gn('equipe');
}

function getForumTopicById(id) {
  return FORUM_TOPICS.find(topic => topic.id === id) || null;
}

function getForumTopicPreview(topic) {
  return topic.messages[topic.messages.length - 1]?.text || '';
}

function getForumTopicSortValue(topic) {
  if (topic.updatedAtMs) return topic.updatedAtMs;
  const parsed = Date.parse(String(topic.updatedAt || '').replace(' ', 'T'));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function openForumTopic(id) {
  if (!getForumTopicById(id)) return;
  selectedForumTopicId = id;
  gn('forum');
}

function submitForumTopic() {
  const title = document.getElementById('forum-topic-title')?.value.trim();
  const category = document.getElementById('forum-topic-category')?.value.trim() || 'Général';
  const message = document.getElementById('forum-topic-message')?.value.trim();
  if (!title || !message) {
    showToast('Ajoutez un titre et un message pour publier le sujet.', '⚠️');
    return;
  }
  const timestamp = new Date().toLocaleString('fr-FR');
  const topic = {
    id: 'forum-' + Date.now(),
    title,
    category,
    author: CFG.admin.name,
    depot: 'Dépôt Les 3 Lions',
    createdAt: timestamp,
    createdAtMs: Date.now(),
    updatedAt: timestamp,
    updatedAtMs: Date.now(),
    messages: [
      {
        id: 'forum-msg-' + Date.now(),
        author: CFG.admin.name,
        depot: 'Dépôt Les 3 Lions',
        text: message,
        time: timestamp
      }
    ]
  };
  FORUM_TOPICS.unshift(topic);
  selectedForumTopicId = topic.id;
  saveForumTopics();
  showToast('Sujet publié dans le forum propriétaires.', '🤝');
  gn('forum');
}

function submitForumReply() {
  const topic = getForumTopicById(selectedForumTopicId);
  const input = document.getElementById('forum-reply-input');
  const text = input?.value.trim();
  if (!topic || !text) {
    showToast('Saisissez une réponse avant l’envoi.', '⚠️');
    return;
  }
  const timestamp = new Date().toLocaleString('fr-FR');
  topic.messages.push({
    id: 'forum-reply-' + Date.now(),
    author: CFG.admin.name,
    depot: 'Dépôt Les 3 Lions',
    text,
    time: timestamp
  });
  topic.updatedAt = timestamp;
  topic.updatedAtMs = Date.now();
  saveForumTopics();
  showToast('Réponse ajoutée au sujet.', '💬');
  gn('forum');
}

function addClient() {
  const name = document.getElementById('client-name')?.value.trim();
  const phone = document.getElementById('client-phone')?.value.trim();
  const zone = document.getElementById('client-zone')?.value.trim();
  const type = document.getElementById('client-type')?.value.trim();
  const status = document.getElementById('client-status')?.value || 'Actif';
  const existing = editingClientId ? getClientById(editingClientId) : null;
  if (!name || !phone || !zone || !type) {
    showToast('Complétez les informations du client.', '⚠️');
    return;
  }
  if (!existing && getClientByName(name)) {
    showToast('Ce client existe déjà.', '⚠️');
    return;
  }
  if (existing) {
    existing.name = name;
    existing.phone = phone;
    existing.zone = zone;
    existing.type = type;
    existing.status = status;
  } else {
    CLIENTS.unshift({
      id: 'cli-' + Date.now(),
      name,
      phone,
      zone,
      type,
      status,
      balanceDue: 0
    });
  }
  editingClientId = null;
  saveClients();
  showToast(existing ? 'Client mis à jour.' : 'Client ajouté avec succès.', existing ? '✏️' : '👤');
  gn('commandes');
}

function addSupplier() {
  const name = document.getElementById('supplier-name')?.value.trim();
  const city = document.getElementById('supplier-city')?.value.trim();
  const delay = document.getElementById('supplier-delay')?.value.trim();
  const phone = document.getElementById('supplier-phone')?.value.trim();
  const products = document.getElementById('supplier-products')?.value.trim();
  const status = document.getElementById('supplier-status')?.value || 'Actif';
  const existing = editingSupplierId ? getSupplierById(editingSupplierId) : null;
  if (!name || !city || !delay || !phone || !products) {
    showToast('Complétez les informations du fournisseur.', '⚠️');
    return;
  }
  if (existing) {
    existing.name = name;
    existing.city = city;
    existing.delay = delay;
    existing.phone = phone;
    existing.products = products;
    existing.status = status;
  } else {
    SUPPLIERS.unshift({
      id: 'sup-' + Date.now(),
      name,
      city,
      delay,
      phone,
      products,
      status
    });
  }
  editingSupplierId = null;
  saveSuppliers();
  showToast(existing ? 'Fournisseur mis à jour.' : 'Fournisseur ajouté avec succès.', existing ? '✏️' : '🚚');
  gn('fournisseurs');
}

function editClient(id) {
  if (!getClientById(id)) return;
  editingClientId = id;
  gn('commandes');
}

function deleteClient(id) {
  const client = getClientById(id);
  if (!client) return;
  pendingDeletion = { type: 'client', key: id, label: client.name, view: 'commandes' };
  gn('commandes');
}

function editSupplier(id) {
  if (!getSupplierById(id)) return;
  editingSupplierId = id;
  gn('fournisseurs');
}

function deleteSupplier(id) {
  const supplier = getSupplierById(id);
  if (!supplier) return;
  pendingDeletion = { type: 'supplier', key: id, label: supplier.name, view: 'fournisseurs' };
  gn('fournisseurs');
}

function toggleMemberStatus(id) {
  const member = TEAM_MEMBERS.find(item => item.id === id);
  if (!member) return;
  member.status = member.status === 'En ligne' ? 'Hors ligne' : 'En ligne';
  saveTeamMembers();
  gn('equipe');
}

function setOrderStatus(ref, status) {
  const order = COMMAND_HISTORY.find(item => item.ref === ref);
  if (!order || order.status === status) return;
  order.status = status;
  if (status === 'Payé') {
    order.amountPaid = order.totalDueWithPrevious || order.orderTotal || parseAmount(order.amount);
    order.amountDue = 0;
    order.paymentStatus = 'Payé';
  } else if (status === 'Crédit') {
    order.paymentStatus = order.amountPaid > 0 ? 'Partiellement payé' : 'Crédit reporté';
    order.amountDue = Math.max((order.totalDueWithPrevious || order.orderTotal || 0) - (order.amountPaid || 0), 0);
  } else {
    order.paymentStatus = getPaymentStatus(order.amountDue || 0, order.orderTotal || parseAmount(order.amount), order.amountPaid || 0);
  }
  order.badge = getOrderBadge(status);
  order.timeline = order.timeline || [];
  order.timeline.unshift(`Statut changé en ${status} le ${new Date().toLocaleString('fr-FR')}`);
  const client = getClientByName(order.client);
  if (client) {
    client.balanceDue = order.amountDue || 0;
    client.status = getClientStatusFromBalance(client);
    saveClients();
  }
  saveCommandHistory();
  buildNav(CFG[role].nav);
  gn('commandes');
}

function confirmDeletion() {
  if (!pendingDeletion) return;
  if (pendingDeletion.type === 'product') {
    DATA_PRODUITS = DATA_PRODUITS.filter(item => item.name !== pendingDeletion.key);
    if (editingProductName === pendingDeletion.key) editingProductName = null;
    saveProducts();
    showToast('Produit supprimé du catalogue.', '🗑️');
  }
  if (pendingDeletion.type === 'client') {
    CLIENTS = CLIENTS.filter(item => item.id !== pendingDeletion.key);
    if (editingClientId === pendingDeletion.key) editingClientId = null;
    saveClients();
    showToast('Client supprimé.', '🗑️');
  }
  if (pendingDeletion.type === 'supplier') {
    SUPPLIERS = SUPPLIERS.filter(item => item.id !== pendingDeletion.key);
    if (editingSupplierId === pendingDeletion.key) editingSupplierId = null;
    saveSuppliers();
    showToast('Fournisseur supprimé.', '🗑️');
  }
  const nextView = pendingDeletion.view;
  pendingDeletion = null;
  gn(nextView);
}

function cancelDeletion() {
  if (!pendingDeletion) return;
  const nextView = pendingDeletion.view;
  pendingDeletion = null;
  gn(nextView);
}

function resetDemoData() {
  DATA_PRODUITS = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  COMMAND_HISTORY = JSON.parse(JSON.stringify(DEFAULT_COMMAND_HISTORY));
  CLIENTS = JSON.parse(JSON.stringify(DEFAULT_CLIENTS));
  SUPPLIERS = JSON.parse(JSON.stringify(DEFAULT_SUPPLIERS));
  TEAM_MEMBERS = JSON.parse(JSON.stringify(DEFAULT_TEAM_MEMBERS));
  FORUM_TOPICS = JSON.parse(JSON.stringify(DEFAULT_FORUM_TOPICS));
  CLIENT_ORDERS = [];
  cartData = [];
  selectedConversationId = null;
  selectedForumTopicId = FORUM_TOPICS[0]?.id || null;
  editingProductName = null;
  editingClientId = null;
  editingSupplierId = null;
  pendingDeletion = null;
  localStorage.removeItem('productsCatalog');
  localStorage.removeItem('commandHistory');
  localStorage.removeItem('clientsCatalog');
  localStorage.removeItem('suppliersCatalog');
  localStorage.removeItem('teamMembers');
  localStorage.removeItem('forumTopics');
  localStorage.removeItem('clientOrders');
  showToast('Les données de démo ont été réinitialisées.', '♻️');
  buildNav(CFG[role].nav);
  gn(role === 'admin' ? 'dashboard' : 'stocks');
}

const V = {
  dashboard: () => `
<div class="ph"><div class="pt">Bonjour, Joël 👋</div><div class="pd">La trousse · Dakar grd yoff - Vue propriétaire</div></div>
<div class="alert aw">${getLowStockProducts().length} produit(s) sont en stock bas : ${getLowStockProducts().map(product => product.name).join(', ') || 'aucun pour le moment'}. <span style="cursor:pointer;text-decoration:underline;" onclick="gn('stocks')">Voir le détail →</span></div>
<div class="alert ai">${getActiveSecretariesCount()} secrétaire(s) sont actuellement en ligne, ${getTeamCoverageLabel()}. <span style="cursor:pointer;text-decoration:underline;" onclick="gn('equipe')">Voir l’équipe →</span></div>
<div class="alert as">${getCreditClients().length} client(s) à crédit et ${getTrackedSuppliers().length} fournisseur(s) à suivre aujourd’hui. <span style="cursor:pointer;text-decoration:underline;" onclick="gn('commandes')">Voir les priorités →</span></div>
<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;"><button class="btn bo bsm" onclick="gn('commandes')">Commandes prioritaires</button><button class="btn bo bsm" onclick="gn('fournisseurs')">Fournisseurs suivis</button><button class="btn bo bsm" onclick="gn('stocks')">Stocks sensibles</button></div>
<div class="g g4" style="margin-bottom:16px;">
  <div class="kpi"><div class="kl">CA encaissé</div><div class="kv">${formatAmount(getMonthlyRevenue())}</div><div class="ks">${getPaidCommandsCount()} commande(s) payée(s)</div></div>
  <div class="kpi"><div class="kl">Commandes actives</div><div class="kv">${getPendingCommands().length}</div><div class="ks">${formatAmount(getPendingCommandsTotal())} à traiter</div></div>
  <div class="kpi"><div class="kl">Clients à crédit</div><div class="kv">${getCreditClients().length}</div><div class="ks">${getCreditCommands().length} commande(s) en crédit</div></div>
  <div class="kpi"><div class="kl">Secrétaires au travail</div><div class="kv">${getActiveSecretariesCount()}</div><div class="ks">${TEAM_MEMBERS.filter(member => member.role === 'Secrétaire').length} secrétaire(s) au total</div></div>
</div>
<div class="g g2">
  <div class="card">
    <div class="sh"><div class="st">État du stock</div></div>
    ${DATA_PRODUITS.slice(0, 4).map(item => `<div style="margin-bottom:10px;"><div style="display:flex;justify-content:space-between;margin-bottom:3px;font-size:13px;"><span>${item.name}</span><span style="font-weight:500;color:var(--green);">${item.qty} cartons</span></div><div class="progress"><div class="pf" style="width:${Math.min(item.qty, 100)}%;background:${item.qty <= 12 ? 'var(--red)' : item.qty <= 25 ? 'var(--gold)' : 'var(--green)'};"></div></div></div>`).join('')}
    <div style="margin-top:10px;font-size:12px;color:var(--tx2);">Stock bas : ${getLowStockProducts().length} · Stock limité : ${getLimitedStockProducts().length}</div>
  </div>
  <div class="card">
    <div class="sh"><div class="st">Dernières commandes</div><button class="btn bo bsm" onclick="gn('commandes')">Voir tout</button></div>
    <table><thead><tr><th>Client</th><th>Montant</th><th>Statut</th></tr></thead><tbody>
      ${COMMAND_HISTORY.slice(0, 3).map(c => `<tr><td>${c.client}</td><td>${formatAmount(c.totalDueWithPrevious || parseAmount(c.amount))}</td><td><span class="badge ${c.badge}">${c.paymentStatus || c.status}</span></td></tr>`).join('')}
    </tbody></table>
  </div>
</div>
<div class="g g2" style="margin-top:16px;">
  <div class="card">
    <div class="sh"><div class="st">Clients sensibles</div><button class="btn bo bsm" onclick="gn('commandes')">Gérer</button></div>
    ${getCreditClients().length ? `<table><thead><tr><th>Client</th><th>Zone</th><th>Solde</th></tr></thead><tbody>
      ${getCreditClients().map(client => `<tr><td><strong>${client.name}</strong><div style="font-size:11px;color:var(--tx3);">${client.phone}</div></td><td>${client.zone}</td><td><span class="badge br">${formatAmount(getClientBalance(client))}</span></td></tr>`).join('')}
    </tbody></table>` : `<div style="font-size:13px;color:var(--tx2);">Aucun client à crédit pour le moment.</div>`}
  </div>
  <div class="card">
    <div class="sh"><div class="st">Fournisseurs à surveiller</div><button class="btn bo bsm" onclick="gn('fournisseurs')">Ouvrir</button></div>
    ${getTrackedSuppliers().length ? `<table><thead><tr><th>Fournisseur</th><th>Délai</th><th>Produits</th></tr></thead><tbody>
      ${getTrackedSuppliers().map(supplier => `<tr><td><strong>${supplier.name}</strong><div style="font-size:11px;color:var(--tx3);">${supplier.city}</div></td><td>${supplier.delay}</td><td>${supplier.products}</td></tr>`).join('')}
    </tbody></table>` : `<div style="font-size:13px;color:var(--tx2);">Aucun fournisseur en suivi critique. ${getFastSuppliers().length} partenaire(s) livrent déjà en 24h.</div>`}
  </div>
</div>`,

  stocks: () => `
<div class="ph"><div class="pt">Stocks & Produits</div><div class="pd">${role === 'sec' ? 'Enregistrez les entrées, les sorties et les manquants.' : 'Suivez vos stocks et vos alertes de réapprovisionnement.'}</div></div>
<div class="alert ${role === 'sec' ? 'ai' : 'as'}">${role === 'sec' ? 'Mode secrétaire actif. Vous pouvez enregistrer les mouvements de stock.' : 'Mode propriétaire actif. Vous gardez une vision complète du stock.'}</div>
${buildDeleteBanner('stocks')}
<div class="g g2">
  <div class="card">
    <div class="sh"><div class="st">Catalogue actuel</div><span class="badge bb" id="stock-products-count">${DATA_PRODUITS.length} produit(s) affiché(s)</span></div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Catégorie</label>${buildProductCategorySelect('stock-category-filter')}</div>
      <div class="form-group"><label>Recherche</label><input type="text" id="stock-search" placeholder="Ex : bière, vin, canette, Coca..."></div>
    </div>
    <table><thead><tr><th>Produit</th><th>Catégorie</th><th>Stock</th><th>Prix</th><th>Statut</th><th>Action</th></tr></thead><tbody id="stock-products-body">
      ${DATA_PRODUITS.map(item => `<tr><td><strong>${item.name}</strong><div style="font-size:11px;color:var(--tx3);">${item.brand}</div></td><td>${item.category}</td><td>${item.qty}</td><td>${item.price}</td><td><span class="badge ${item.badge}">${item.status}</span></td><td style="display:flex;gap:6px;flex-wrap:wrap;"><button class="btn ${role === 'sec' ? 'bs' : 'bp'} bsm" onclick="addProductToOrder('${item.name.replace(/'/g, "\\'")}')">Ajouter</button>${role === 'admin' ? `<button class="btn bo bsm" onclick="editProduct('${item.name.replace(/'/g, "\\'")}')">Modifier</button><button class="btn bo bsm" style="color:var(--red);border-color:var(--red);" onclick="deleteProduct('${item.name.replace(/'/g, "\\'")}')">Supprimer</button>` : ''}</td></tr>`).join('')}
    </tbody></table>
  </div>
  <div class="card">
    <div class="sh"><div class="st">Nouveau mouvement</div><span class="badge ${role === 'sec' ? 'bb' : 'bg'}">${role === 'sec' ? 'Secrétaire' : 'Propriétaire'}</span></div>
    <div class="form-group"><label>Produit</label><input type="text" id="stock-prod" list="stock-products-list" placeholder="Sélectionner ou saisir un produit">${buildProductDatalist('stock-products-list')}</div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Type</label><select id="stock-type"><option value="entree">Entrée</option><option value="sortie">Sortie</option></select></div>
      <div class="form-group"><label>Quantité</label><input type="number" id="stock-qty" min="1" value="1"></div>
    </div>
    <button class="btn ${role === 'sec' ? 'bs' : 'bp'}" onclick="submitStock()">Enregistrer</button>
  </div>
</div>
${role === 'admin' ? `<div class="card" style="margin-top:16px;">
  <div class="sh"><div class="st">${editingProductName ? 'Modifier le produit' : 'Nouveau produit'}</div><span class="badge bg">Admin</span></div>
  <div class="g g2" style="margin-bottom:12px;">
    <div class="form-group"><label>Nom du produit</label><input type="text" id="new-product-name" placeholder="Ex : Desperados 50cl" value="${editingProductName ? getProductByName(editingProductName)?.name || '' : ''}"></div>
    <div class="form-group"><label>Catégorie</label><input type="text" id="new-product-category" list="new-product-categories" placeholder="Ex : Bière" value="${editingProductName ? getProductByName(editingProductName)?.category || '' : ''}">${buildCategoryDatalist('new-product-categories')}</div>
  </div>
  <div class="g g2" style="margin-bottom:12px;">
    <div class="form-group"><label>Format / fournisseur</label><input type="text" id="new-product-brand" placeholder="Ex : Desperados · Carton 24" value="${editingProductName ? getProductByName(editingProductName)?.brand || '' : ''}"></div>
    <div class="form-group"><label>Prix unitaire / carton</label><input type="text" id="new-product-price" placeholder="Ex : 9 500" value="${editingProductName ? String(getProductByName(editingProductName)?.price || '').replace(/[^\d]/g, '') : ''}"></div>
  </div>
  <div class="g g2">
    <div class="form-group"><label>Stock initial</label><input type="number" id="new-product-qty" min="0" value="${editingProductName ? getProductByName(editingProductName)?.qty || 0 : 0}"></div>
    <div class="form-group" style="display:flex;align-items:end;gap:8px;"><button class="btn bp" onclick="addProduct()">${editingProductName ? 'Enregistrer' : 'Ajouter au catalogue'}</button>${editingProductName ? `<button class="btn bo" onclick="resetProductEditor(); gn('stocks')">Annuler</button>` : ''}</div>
  </div>
</div>` : ''}`,

  commandes: () => `
<div class="ph"><div class="pt">Commandes & Factures</div><div class="pd">Suivez les commandes récentes et enregistrez de nouvelles demandes.</div></div>
<div class="alert ${role === 'sec' ? 'ai' : 'as'}">${role === 'sec' ? 'Mode secrétaire actif. Vous pouvez saisir les commandes et préparer le suivi client.' : 'Mode propriétaire actif. Vous pilotez les commandes, les crédits et les priorités clients.'}</div>
${buildDeleteBanner('commandes')}
<div class="g g2">
  <div class="card">
    <div class="sh"><div class="st">Commandes récentes</div></div>
    <table><thead><tr><th>Réf</th><th>Client</th><th>Montant</th><th>Statut</th><th>Actions</th></tr></thead><tbody>
      ${COMMAND_HISTORY.map(c => `<tr><td>${c.ref}</td><td>${c.client}<div style="font-size:11px;color:var(--tx3);">Solde client : ${formatAmount(c.amountDue || 0)}</div></td><td>${formatAmount(c.totalDueWithPrevious || parseAmount(c.amount))}<div style="font-size:11px;color:var(--tx3);">Payé : ${formatAmount(c.amountPaid || 0)}</div></td><td><span class="badge ${c.badge}">${c.paymentStatus || c.status}</span></td><td style="display:grid;gap:6px;"><div style="display:flex;gap:6px;flex-wrap:wrap;"><button class="btn bo bsm" onclick="printInvoice('${c.ref}')">Facture</button><button class="btn bo bsm" onclick="printDeliveryNote('${c.ref}')">BL</button>${c.paymentStatus !== 'Payé' ? `<button class="btn bo bsm" onclick="openPaymentModal('${c.ref}')">Versement</button><button class="btn ${role === 'sec' ? 'bs' : 'bp'} bsm" onclick="markOrderPaid('${c.ref}')">Payé</button>` : ''}</div><select onchange="setOrderStatus('${c.ref}', this.value)">${['En attente','Préparée','Livrée','Crédit','Payé','Annulée'].map(status => `<option value="${status}" ${c.status === status ? 'selected' : ''}>${status}</option>`).join('')}</select></td></tr>`).join('')}
    </tbody></table>
    <div style="margin-top:14px;">
      <div class="st" style="font-size:13px;margin-bottom:8px;">Historique récent</div>
      ${COMMAND_HISTORY.slice(0, 3).map(order => `<div style="padding:10px 0;border-top:1px solid var(--bdr);"><div style="font-weight:600;font-size:13px;">${order.ref} · ${order.client}</div><div style="font-size:12px;color:var(--tx2);display:grid;gap:4px;margin-top:6px;">${(order.timeline || [`Créée le ${order.createdAt || 'date inconnue'}`]).slice(0, 3).map(step => `<div>${step}</div>`).join('')}</div></div>`).join('')}
    </div>
  </div>
  <div class="card">
    <div class="sh"><div class="st">Nouvelle commande</div><button class="btn ${role === 'sec' ? 'bs' : 'bp'} bsm" onclick="addToCart()">+ Ajouter</button></div>
    <div class="form-group"><label>Client</label>${buildClientInput()}</div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Catégorie</label>${buildProductCategorySelect('cmd-category-filter')}</div>
      <div class="form-group"><label>Produit</label><input type="text" id="cmd-prod-sel" list="cmd-products-list" placeholder="Sélectionner ou saisir un produit">${buildProductDatalist('cmd-products-list')}</div>
    </div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Recherche rapide</label><input type="text" id="cmd-search" placeholder="Ex : bière, vin, soda, canette..."></div>
      <div class="form-group"><label>Quantité</label><input type="number" id="cmd-prod-qty" min="0.5" step="0.5" value="1"></div>
    </div>
    <div class="card" style="padding:12px;margin-bottom:12px;background:var(--sur2);"><div class="st" style="font-size:13px;margin-bottom:8px;">Panier</div><div id="cmd-cart-container"></div></div>
    <div class="card" style="padding:12px;margin-bottom:12px;background:var(--sur2);">
      <div class="st" style="font-size:13px;margin-bottom:8px;">Paiement client</div>
      <div class="g g2" style="margin-bottom:10px;">
        <div style="font-size:12px;color:var(--tx2);">Ancien solde<div style="font-size:15px;font-weight:600;color:var(--tx);" id="cmd-previous-balance">0 F</div></div>
        <div style="font-size:12px;color:var(--tx2);">Total commande<div style="font-size:15px;font-weight:600;color:var(--tx);" id="cmd-order-total">0 F</div></div>
      </div>
      <div class="g g2" style="margin-bottom:10px;">
        <div style="font-size:12px;color:var(--tx2);">Total à encaisser<div style="font-size:15px;font-weight:600;color:var(--green);" id="cmd-grand-total">0 F</div></div>
        <div class="form-group" style="margin:0;"><label>Montant payé maintenant</label><input type="number" id="cmd-amount-paid" min="0" step="500" value="0"></div>
      </div>
      <div style="font-size:12px;color:var(--tx2);">Reste après paiement<div style="font-size:15px;font-weight:700;color:var(--red);" id="cmd-remaining-due">0 F</div></div>
    </div>
    <button class="btn ${role === 'sec' ? 'bs' : 'bp'}" onclick="submitForm()">Valider</button>
  </div>
</div>
<div class="g g2" style="margin-top:16px;">
  <div class="card">
    <div class="sh"><div class="st">Base clients</div><span class="badge bb">${CLIENTS.length} client(s)</span></div>
    <table><thead><tr><th>Client</th><th>Type</th><th>Zone</th><th>Solde</th><th>Actions</th></tr></thead><tbody>
      ${CLIENTS.slice(0, 8).map(client => `<tr><td><strong>${client.name}</strong><div style="font-size:11px;color:var(--tx3);">${client.phone}</div></td><td>${client.type}</td><td>${client.zone}</td><td><span class="badge ${getClientBalance(client) > 0 ? 'br' : client.status === 'VIP' ? 'bgold' : 'bg'}">${formatAmount(getClientBalance(client))}</span></td><td style="display:flex;gap:6px;flex-wrap:wrap;"><button class="btn bo bsm" onclick="editClient('${client.id}')">Modifier</button><button class="btn bo bsm" style="color:var(--red);border-color:var(--red);" onclick="deleteClient('${client.id}')">Supprimer</button></td></tr>`).join('')}
    </tbody></table>
  </div>
  <div class="card">
    <div class="sh"><div class="st">${editingClientId ? 'Modifier le client' : 'Nouveau client'}</div><span class="badge ${role === 'sec' ? 'bb' : 'bg'}">${role === 'sec' ? 'Secrétaire' : 'Admin'}</span></div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Nom</label><input type="text" id="client-name" placeholder="Ex : Boutique Samba" value="${editingClientId ? getClientById(editingClientId)?.name || '' : ''}"></div>
      <div class="form-group"><label>Téléphone</label><input type="tel" id="client-phone" placeholder="77 XXX XX XX" value="${editingClientId ? getClientById(editingClientId)?.phone || '' : ''}"></div>
    </div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Zone</label><input type="text" id="client-zone" placeholder="Ex : Liberté 6" value="${editingClientId ? getClientById(editingClientId)?.zone || '' : ''}"></div>
      <div class="form-group"><label>Type</label><input type="text" id="client-type" placeholder="Ex : Épicerie" value="${editingClientId ? getClientById(editingClientId)?.type || '' : ''}"></div>
    </div>
    <div class="g g2">
      <div class="form-group"><label>Statut</label><select id="client-status">${['Actif','Crédit','VIP','Nouveau'].map(status => `<option value="${status}" ${(editingClientId ? getClientById(editingClientId)?.status : 'Actif') === status ? 'selected' : ''}>${status}</option>`).join('')}</select></div>
      <div class="form-group" style="display:flex;align-items:end;gap:8px;"><button class="btn ${role === 'sec' ? 'bs' : 'bp'}" onclick="addClient()">${editingClientId ? 'Enregistrer' : 'Ajouter le client'}</button>${editingClientId ? `<button class="btn bo" onclick="resetClientEditor(); gn('commandes')">Annuler</button>` : ''}</div>
    </div>
  </div>
</div>`,

  messages: () => {
    const convos = buildConversations();
    const active = convos.find(conv => conv.id === selectedConversationId) || convos[0] || null;
    if (!selectedConversationId && active) selectedConversationId = active.id;
    return `
<div class="ph"><div class="pt">Messages clients</div><div class="pd">${role === 'sec' ? 'Vous répondez au nom du dépôt.' : 'Commandes et réclamations des clients.'}</div></div>
<div class="alert ${role === 'sec' ? 'ai' : 'as'}">${convos.filter(conv => conv.unread).length} conversation(s) à suivre, dont ${getUnreadClientOrdersCount()} nouvelle(s) demande(s) client issues de l’accueil public.</div>
<div style="display:grid;grid-template-columns:262px 1fr;gap:16px;height:calc(100vh - ${role === 'sec' ? '220' : '200'}px);max-height:540px;">
  <div class="clist">
    <div style="font-size:11px;font-weight:600;color:var(--tx3);margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px;">Conversations (${convos.length})</div>
    ${convos.map(conv => `<div style="padding:9px;border-radius:7px;${active && active.id === conv.id ? 'background:var(--green-p);border:1px solid var(--green);' : ''}cursor:pointer;margin-bottom:3px;" onclick="selectClientConv('${conv.id}')"><div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;"><div style="width:25px;height:25px;border-radius:50%;background:${conv.bg};color:${conv.fg};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">${conv.initials}</div><span style="font-weight:500;font-size:13px;flex:1;">${conv.name}</span><span style="font-size:10px;color:var(--tx3);">${conv.time}</span></div><div style="font-size:12px;color:var(--tx2);padding-left:33px;">${conv.preview}</div>${conv.unread ? '<div style="padding-left:33px;margin-top:3px;"><span class="badge bgold" style="font-size:10px;">Nouveau</span></div>' : ''}</div>`).join('')}
  </div>
  <div class="cconv">
    <div class="chead"><div style="display:flex;align-items:center;justify-content:space-between;"><div><div style="font-weight:500;">${active ? active.name : 'Aucune conversation'}</div></div><button class="btn bo bsm" onclick="gn('commandes')">Créer commande</button></div></div>
    <div class="cbody">${active ? active.messages.map(msg => `<div class="msg ${msg.side === 'right' ? 'r' : ''}"><div class="mav" style="background:${msg.bg};color:${msg.fg};">${msg.name.split(' ').map(part => part[0]).join('').slice(0,2).toUpperCase()}</div><div class="mbody"><div class="mname">${msg.name}</div><div class="${msg.side === 'right' ? 'mb mbr' : 'mb mbl'}">${msg.text}</div><div class="mtime">${msg.time}</div></div></div>`).join('') : ''}</div>
    <div class="cfoot"><div style="display:flex;gap:7px;"><input type="text" id="reply-message" placeholder="Écrire un message..." style="flex:1;border-radius:18px;"><button class="btn bp bsm" onclick="sendMessageReply()">Envoyer</button></div></div>
  </div>
</div>`;
  },

  fournisseurs: () => `
<div class="ph"><div class="pt">Fournisseurs</div><div class="pd">Suivez vos partenaires de livraison et vos contacts utiles.</div></div>
${buildDeleteBanner('fournisseurs')}
<div class="g g3" style="margin-bottom:16px;">
  <div class="kpi"><div class="kl">Fournisseurs</div><div class="kv">${SUPPLIERS.length}</div><div class="ks">partenaires actifs</div></div>
  <div class="kpi"><div class="kl">Livraison rapide</div><div class="kv">${SUPPLIERS.filter(supplier => supplier.delay === '24h').length}</div><div class="ks">en 24h</div></div>
  <div class="kpi"><div class="kl">Sous suivi</div><div class="kv">${SUPPLIERS.filter(supplier => supplier.status === 'Suivi').length}</div><div class="ks">à surveiller</div></div>
</div>
<div class="g g2">
  <div class="card">
    <div class="sh"><div class="st">Partenaires clés</div><span class="badge bg">${SUPPLIERS.length} fournisseurs</span></div>
    <table><thead><tr><th>Nom</th><th>Ville</th><th>Délai</th><th>Produits</th><th>Actions</th></tr></thead><tbody>
      ${SUPPLIERS.map(supplier => `<tr><td><strong>${supplier.name}</strong><div style="font-size:11px;color:var(--tx3);">${supplier.phone}</div></td><td>${supplier.city}</td><td>${supplier.delay}</td><td>${supplier.products}</td><td style="display:flex;gap:6px;flex-wrap:wrap;"><button class="btn bo bsm" onclick="editSupplier('${supplier.id}')">Modifier</button><button class="btn bo bsm" style="color:var(--red);border-color:var(--red);" onclick="deleteSupplier('${supplier.id}')">Supprimer</button></td></tr>`).join('')}
    </tbody></table>
  </div>
  <div class="card">
    <div class="sh"><div class="st">${editingSupplierId ? 'Modifier le fournisseur' : 'Nouveau fournisseur'}</div><span class="badge bg">Admin</span></div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Nom</label><input type="text" id="supplier-name" placeholder="Ex : Global Drinks" value="${editingSupplierId ? getSupplierById(editingSupplierId)?.name || '' : ''}"></div>
      <div class="form-group"><label>Ville</label><input type="text" id="supplier-city" placeholder="Ex : Dakar" value="${editingSupplierId ? getSupplierById(editingSupplierId)?.city || '' : ''}"></div>
    </div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Délai</label><input type="text" id="supplier-delay" placeholder="Ex : 24h" value="${editingSupplierId ? getSupplierById(editingSupplierId)?.delay || '' : ''}"></div>
      <div class="form-group"><label>Téléphone</label><input type="tel" id="supplier-phone" placeholder="33 XXX XX XX" value="${editingSupplierId ? getSupplierById(editingSupplierId)?.phone || '' : ''}"></div>
    </div>
    <div class="form-group"><label>Produits couverts</label><input type="text" id="supplier-products" placeholder="Ex : Bières, vins, canettes" value="${editingSupplierId ? getSupplierById(editingSupplierId)?.products || '' : ''}"></div>
    <div class="g g2">
      <div class="form-group"><label>Statut</label><select id="supplier-status">${['Actif','Prioritaire','Suivi'].map(status => `<option value="${status}" ${(editingSupplierId ? getSupplierById(editingSupplierId)?.status : 'Actif') === status ? 'selected' : ''}>${status}</option>`).join('')}</select></div>
      <div class="form-group" style="display:flex;align-items:end;gap:8px;"><button class="btn bp" onclick="addSupplier()">${editingSupplierId ? 'Enregistrer' : 'Ajouter le fournisseur'}</button>${editingSupplierId ? `<button class="btn bo" onclick="resetSupplierEditor(); gn('fournisseurs')">Annuler</button>` : ''}</div>
    </div>
  </div>
</div>`,
  annuaire: () => `
<div class="ph"><div class="pt">Annuaire dépôts</div><div class="pd">Répertoire des dépôts partenaires et contacts utiles.</div></div>
<div class="g g3">${DEPOTS.map(depot => `<div class="card"><div class="st" style="margin-bottom:6px;">${depot.name}</div><div style="font-size:13px;color:var(--tx2);margin-bottom:4px;">${depot.owner}</div><div style="font-size:12px;color:var(--tx3);">${depot.location}</div><div style="font-size:12px;color:var(--tx3);margin-top:6px;">${depot.phone}</div></div>`).join('')}</div>`,
  forum: () => {
    const topics = [...FORUM_TOPICS].sort((a, b) => getForumTopicSortValue(b) - getForumTopicSortValue(a));
    const active = getForumTopicById(selectedForumTopicId) || topics[0] || null;
    if (!selectedForumTopicId && active) selectedForumTopicId = active.id;
    return `
<div class="ph"><div class="pt">Forum propriétaires</div><div class="pd">Un espace d’échange pour partager vos conseils, votre organisation et vos retours du terrain.</div></div>
<div class="alert ap">${topics.length} sujet(s) actifs dans la démo. Les nouveaux sujets et les réponses restent enregistrés localement sur cet appareil.</div>
<div class="g g2">
  <div class="card">
    <div class="sh"><div class="st">Nouveau sujet</div><span class="badge bpur">Propriétaires</span></div>
    <div class="form-group"><label>Titre</label><input type="text" id="forum-topic-title" placeholder="Ex : Comment gérer les commandes à crédit en fin de mois ?"></div>
    <div class="g g2" style="margin-bottom:12px;">
      <div class="form-group"><label>Catégorie</label><select id="forum-topic-category"><option>Stocks</option><option>Équipe</option><option>Clients</option><option>Fournisseurs</option><option>Organisation</option><option>Général</option></select></div>
      <div class="form-group"><label>Dépôt</label><input type="text" value="Dépôt Les 3 Lions" disabled></div>
    </div>
    <div class="form-group"><label>Message</label><textarea id="forum-topic-message" rows="4" placeholder="Partagez votre question ou votre retour d’expérience..."></textarea></div>
    <button class="btn bp" onclick="submitForumTopic()">Publier le sujet</button>
  </div>
  <div class="card">
    <div class="sh"><div class="st">Sujets récents</div><span class="badge bgold">${topics.length} sujet(s)</span></div>
    <div class="clist" style="max-height:340px;">
      ${topics.map(topic => `<div style="padding:10px;border-radius:10px;cursor:pointer;border:1px solid ${active && active.id === topic.id ? 'var(--purple)' : 'var(--bdr)'};background:${active && active.id === topic.id ? 'var(--purple-p)' : 'var(--sur)'};margin-bottom:8px;" onclick="openForumTopic('${topic.id}')"><div style="display:flex;align-items:center;justify-content:space-between;gap:8px;"><div style="font-size:13px;font-weight:700;color:var(--tx);">${topic.title}</div><span class="badge bpur">${topic.category}</span></div><div style="font-size:12px;color:var(--tx3);margin-top:4px;">${topic.author} · ${topic.depot}</div><div style="font-size:12px;color:var(--tx2);margin-top:6px;">${getForumTopicPreview(topic).slice(0, 110)}${getForumTopicPreview(topic).length > 110 ? '...' : ''}</div><div style="font-size:11px;color:var(--tx3);margin-top:6px;">${topic.messages.length} message(s) · Dernière activité ${topic.updatedAt}</div></div>`).join('')}
    </div>
  </div>
</div>
<div class="card" style="margin-top:16px;">
  ${active ? `<div class="chead"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;"><div><div style="font-weight:700;font-size:16px;">${active.title}</div><div style="font-size:12px;color:var(--tx3);margin-top:4px;">${active.category} · Démarré par ${active.author} (${active.depot}) le ${active.createdAt}</div></div><span class="badge bpur">${active.messages.length} message(s)</span></div></div>
  <div class="cbody" style="max-height:420px;">
    ${active.messages.map(msg => `<div class="msg ${msg.author === CFG.admin.name ? 'r' : ''}"><div class="mav" style="background:${msg.author === CFG.admin.name ? 'var(--purple)' : 'var(--purple-p)'};color:${msg.author === CFG.admin.name ? '#fff' : 'var(--purple)'};">${msg.author.split(' ').map(part => part[0]).join('').slice(0,2).toUpperCase()}</div><div class="mbody"><div class="mname">${msg.author} · ${msg.depot}</div><div class="${msg.author === CFG.admin.name ? 'mb mbrs' : 'mb mbl'}">${msg.text}</div><div class="mtime">${msg.time}</div></div></div>`).join('')}
  </div>
  <div class="cfoot"><div style="display:flex;gap:8px;"><input type="text" id="forum-reply-input" placeholder="Écrire une réponse à ce sujet..." style="flex:1;border-radius:18px;"><button class="btn bp bsm" onclick="submitForumReply()">Répondre</button></div></div>` : `<div style="padding:20px;font-size:13px;color:var(--tx2);">Aucun sujet disponible pour le moment.</div>`}
</div>`;
  },
  notifications: () => `
<div class="ph"><div class="pt">Notifications</div><div class="pd">Retrouvez ici vos alertes, messages et rappels opérationnels.</div></div>
<div class="card">
  <div class="ni-item"><div class="nd" style="background:var(--red);"></div><div><div style="font-size:13px;">${getLowStockProducts().length} alerte(s) stock bas nécessitent un réapprovisionnement</div><div style="font-size:11px;color:var(--tx3);">${getLowStockProducts().map(product => product.name).join(', ') || 'Aucune rupture en cours'}</div></div></div>
  <div class="ni-item"><div class="nd" style="background:var(--gold);"></div><div><div style="font-size:13px;">${getPendingCommands().length} commande(s) restent en attente</div><div style="font-size:11px;color:var(--tx3);">Montant en traitement : ${formatAmount(getPendingCommandsTotal())}</div></div></div>
  <div class="ni-item"><div class="nd" style="background:var(--blue);"></div><div><div style="font-size:13px;">${getUnreadClientOrdersCount()} message(s) client non lus</div><div style="font-size:11px;color:var(--tx3);">${getTodayOrdersCount()} demande(s) reçue(s) aujourd’hui depuis l’accueil public</div></div></div>
</div>`,
  equipe: () => {
    const activeCount = TEAM_MEMBERS.filter(member => member.status === 'En ligne').length;
    return `
<div class="ph"><div class="pt">Mon équipe</div><div class="pd">Le propriétaire peut suivre l’activité de l’équipe et ajouter des secrétaires.</div></div>
<div class="g g3" style="margin-bottom:16px;">
  <div class="kpi"><div class="kl">Membres</div><div class="kv">${TEAM_MEMBERS.length}</div><div class="ks">membres dans l’équipe</div></div>
  <div class="kpi"><div class="kl">En ligne</div><div class="kv">${activeCount}</div><div class="ks">actifs en ce moment</div></div>
  <div class="kpi"><div class="kl">Secrétaires</div><div class="kv">${TEAM_MEMBERS.filter(member => member.role === 'Secrétaire').length}</div><div class="ks">profils enregistrés</div></div>
</div>
<div class="g g2">
  <div class="card">
    <div class="sh"><div class="st">Équipe active</div><span class="badge bg">${activeCount} actif(s)</span></div>
    <table><thead><tr><th>Nom</th><th>Rôle</th><th>Horaire</th><th>Statut</th></tr></thead><tbody>
      ${TEAM_MEMBERS.map(member => `<tr><td><strong>${member.name}</strong><div style="font-size:11px;color:var(--tx3);">${member.phone}</div></td><td>${member.role}</td><td>${member.shift}</td><td><button class="btn ${member.status === 'En ligne' ? 'bp' : 'bo'} bsm" onclick="toggleMemberStatus('${member.id}')">${member.status}</button></td></tr>`).join('')}
    </tbody></table>
  </div>
  <div class="card">
    <div class="sh"><div class="st">Ajouter un secrétaire</div><span class="badge bgr">Admin</span></div>
    <div class="form-group"><label>Nom complet</label><input type="text" id="team-name" placeholder="Ex : Aïssatou Fall"></div>
    <div class="form-group"><label>Téléphone</label><input type="tel" id="team-phone" placeholder="77 XXX XX XX"></div>
    <div class="form-group"><label>Horaire</label><input type="text" id="team-shift" placeholder="Ex : 08:00 - 17:00"></div>
    <button class="btn bp" onclick="addSecretary()">Ajouter à l’équipe</button>
  </div>
</div>`;
  },
  analytique: () => `
<div class="ph"><div class="pt">Analytique</div><div class="pd">Consultez vos indicateurs clés pour piloter l’activité du dépôt.</div></div>
<div class="g g3"><div class="kpi"><div class="kl">Ventes encaissées</div><div class="kv">${formatAmount(getMonthlyRevenue())}</div><div class="ks">${getPaidCommandsCount()} facture(s) réglée(s)</div></div><div class="kpi"><div class="kl">Panier moyen</div><div class="kv">${formatAmount(Math.round(COMMAND_HISTORY.reduce((sum, order) => sum + (order.orderTotal || parseAmount(order.amount)), 0) / Math.max(COMMAND_HISTORY.length, 1)))}</div><div class="ks">calculé sur ${COMMAND_HISTORY.length} commande(s)</div></div><div class="kpi"><div class="kl">Clients actifs</div><div class="kv">${new Set(COMMAND_HISTORY.map(order => order.client)).size}</div><div class="ks">dont ${getCreditCommands().length} compte(s) à crédit</div></div></div>`,
  profil: () => `
<div class="ph"><div class="pt">Mon profil dépôt</div><div class="pd">Informations publiques et coordonnées du dépôt.</div></div>
<div class="card"><div class="form-group"><label>Nom du dépôt</label><input type="text" value="La trousse"></div><div class="form-group"><label>Responsable</label><input type="text" value="Joël Mendy"></div><div class="form-group"><label>Zone</label><input type="text" value="Dakar grd yoff"></div><div class="form-group"><label>Téléphone</label><input type="tel" value="77 435 16 95"></div><div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;"><button class="btn bo" onclick="resetDemoData()">Réinitialiser les données de démo</button><button class="btn bp" onclick="gn('dashboard')">Retour au tableau de bord</button></div></div>`
};

function renderLocked(id) {
  const labels = { 'lk-analytique': 'Analytique', 'lk-forum': 'Forum propriétaires', 'lk-equipe': 'Mon équipe' };
  document.getElementById('content').innerHTML = `<div class="lock-pg"><div style="font-size:38px;">🔒</div><div style="font-size:15px;font-weight:500;color:var(--tx);">Accès restreint — ${labels[id]}</div><div style="font-size:13px;color:var(--tx3);">Cette section est réservée au propriétaire du dépôt.</div></div>`;
}

function gn(id) {
  document.querySelectorAll('.ni').forEach(link => link.classList.remove('on'));
  document.getElementById('ni-' + id)?.classList.add('on');
  document.getElementById('tb-title').textContent = TITLES[id] || '';
  const content = document.getElementById('content');
  content.innerHTML = '';
  if (id.startsWith('lk-')) {
    renderLocked(id);
    return;
  }
  if (V[id]) content.innerHTML = V[id]();
  content.scrollTop = 0;
  if (id === 'commandes') renderCart();
  if (id === 'stocks' || id === 'commandes') setupProductTools(id);
}
window.showPublicHome = showPublicHome;
window.showLogin = showLogin;
window.togglePwd = togglePwd;
window.toggleDark = toggleDark;
window.openRegister = openRegister;
window.closeRegister = closeRegister;
window.regNext = regNext;
window.regBack = regBack;
window.regSubmit = regSubmit;
window.accessDemoFromRegister = accessDemoFromRegister;
window.pickRole = pickRole;
window.doLogin = doLogin;
window.doLogout = doLogout;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.openClientOrder = openClientOrder;
window.closeClientOrder = closeClientOrder;
window.sendClientOrder = sendClientOrder;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.gn = gn;
window.addToCart = addToCart;
window.addProductToOrder = addProductToOrder;
window.removeFromCart = removeFromCart;
window.submitForm = submitForm;
window.updateOrderPaymentSummary = updateOrderPaymentSummary;
window.printInvoice = printInvoice;
window.printDeliveryNote = printDeliveryNote;
window.markOrderPaid = markOrderPaid;
window.updatePaymentPreview = updatePaymentPreview;
window.submitPayment = submitPayment;
window.submitStock = submitStock;
window.addProduct = addProduct;
window.resetProductEditor = resetProductEditor;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.filterStockProducts = filterStockProducts;
window.selectClientConv = selectClientConv;
window.sendMessageReply = sendMessageReply;
window.addSecretary = addSecretary;
window.addClient = addClient;
window.editClient = editClient;
window.deleteClient = deleteClient;
window.resetClientEditor = resetClientEditor;
window.addSupplier = addSupplier;
window.editSupplier = editSupplier;
window.deleteSupplier = deleteSupplier;
window.resetSupplierEditor = resetSupplierEditor;
window.openForumTopic = openForumTopic;
window.submitForumTopic = submitForumTopic;
window.submitForumReply = submitForumReply;
window.setOrderStatus = setOrderStatus;
window.confirmDeletion = confirmDeletion;
window.cancelDeletion = cancelDeletion;
window.resetDemoData = resetDemoData;
window.closeGlobalSearch = closeGlobalSearch;
window.toggleMemberStatus = toggleMemberStatus;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-btn-public').onclick = showLogin;
  document.getElementById('register-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeRegister(); });
  document.getElementById('client-order-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) closeClientOrder(); });
  document.getElementById('payment-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) closePaymentModal(); });
  document.getElementById('payment-amount-input')?.addEventListener('input', updatePaymentPreview);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('dark-icon').textContent = '☀️';
    document.getElementById('dark-lbl').textContent = 'Mode clair';
  }

  pickRole(role);
  renderPublicDepots();
  populatePublicZones();
  setupPublicFilters();
  setupGlobalSearch();
  setupNetworkStatus();
  registerServiceWorker();

  const sessionRole = sessionStorage.getItem('userRole');
  if (sessionRole && CFG[sessionRole]) {
    showApp();
    applyRole(sessionRole);
    gn(sessionRole === 'admin' ? 'dashboard' : 'stocks');
  } else {
    sessionStorage.removeItem('userRole');
    showPublicHome();
  }
});

document.addEventListener('click', e => {
  const btn = e.target.closest('.btn');
  if (btn && !btn.getAttribute('onclick') && !btn.onclick) {
    showToast('Action : ' + btn.textContent.trim() + ' (maquette)', 'ℹ️');
  }
});
