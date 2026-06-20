const state = {
  currentPage: 'dashboard',
  theme: 'light',
  savings: [
    { id: 1, name: 'Emergency Fund', risk: 'Low Risk', riskLevel: 'low', balance: 12000, purpose: 'Recommended', progress: 80, returnRate: 3.5, icon: 'shield' },
    { id: 2, name: 'Mutual Funds', risk: 'Moderate Risk', riskLevel: 'moderate', balance: 8500, purpose: 'Recommended', progress: 58, returnRate: 8.8, icon: 'pie-chart' },
    { id: 3, name: 'SIP', risk: 'Balanced', riskLevel: 'balanced', balance: 7200, purpose: 'Monthly plan', progress: 65, returnRate: 10.2, icon: 'clock' },
    { id: 4, name: 'Stocks', risk: 'High Risk', riskLevel: 'high', balance: 14900, purpose: 'Long-term gain', progress: 42, returnRate: 13.7, icon: 'trending-up' },
    { id: 5, name: 'Fixed Deposit', risk: 'Secure', riskLevel: 'secure', balance: 5000, purpose: 'Stable yield', progress: 90, returnRate: 5.1, icon: 'shield-check' }
  ],
  savingsFilter: 'all',
  savingsSort: 'balance-desc',
  transactions: [
    { id: 1, date: '2026-06-10', description: 'Coffee subscription', category: 'Bills', amount: '-₹24.99', type: 'Expense', status: 'Completed' },
    { id: 2, date: '2026-06-10', description: 'Grocery market', category: 'Food', amount: '-₹84.20', type: 'Expense', status: 'Completed' },
    { id: 3, date: '2026-06-09', description: 'Monthly salary', category: 'Investment', amount: '+₹5,200.00', type: 'Income', status: 'Completed' },
    { id: 4, date: '2026-06-08', description: 'Gym membership', category: 'Health', amount: '-₹54.00', type: 'Expense', status: 'Pending' },
    { id: 5, date: '2026-06-07', description: 'Ride share', category: 'Transport', amount: '-₹18.40', type: 'Expense', status: 'Completed' },
    { id: 6, date: '2026-06-06', description: 'Weekend dining', category: 'Entertainment', amount: '-₹120.30', type: 'Expense', status: 'Completed' },
    { id: 7, date: '2026-06-05', description: 'Book purchase', category: 'Education', amount: '-₹35.00', type: 'Expense', status: 'Completed' },
    { id: 8, date: '2026-06-04', description: 'Dividend payout', category: 'Investment', amount: '+₹420.00', type: 'Income', status: 'Completed' },
    { id: 9, date: '2026-06-03', description: 'Taxi ride', category: 'Transport', amount: '-₹16.50', type: 'Expense', status: 'Completed' },
    { id: 10, date: '2026-06-02', description: 'Pharmacy', category: 'Health', amount: '-₹30.00', type: 'Expense', status: 'Completed' },
    { id: 11, date: '2026-06-01', description: 'Gadget purchase', category: 'Shopping', amount: '-₹235.00', type: 'Expense', status: 'Pending' },
    { id: 12, date: '2026-05-31', description: 'Utility payment', category: 'Bills', amount: '-₹160.00', type: 'Expense', status: 'Completed' },
  ],
  currentPageIndex: 1,
  rowsPerPage: 6,
  budgets: [
    { label: 'Food', limit: 500, spent: 320, remaining: 180, status: 'On track' },
    { label: 'Transport', limit: 220, spent: 144, remaining: 76, status: 'Good' },
    { label: 'Shopping', limit: 750, spent: 620, remaining: 130, status: 'Review' },
    { label: 'Bills', limit: 460, spent: 412, remaining: 48, status: 'Checked' },
    { label: 'Health', limit: 190, spent: 116, remaining: 74, status: 'Stable' },
    { label: 'Entertainment', limit: 260, spent: 198, remaining: 62, status: 'Good' },
    { label: 'Education', limit: 180, spent: 90, remaining: 90, status: 'Balanced' },
    { label: 'Investment', limit: 920, spent: 725, remaining: 195, status: 'On track' },
    { label: 'Other', limit: 160, spent: 78, remaining: 82, status: 'Healthy' },
  ],
  chatMessages: [
    { role: 'ai', text: 'Hello Alex! How can I help you improve your financial plan today?' },
    { role: 'user', text: 'How can I reduce expenses?' },
    { role: 'ai', text: 'Review your shopping and subscription categories. Shifting a small portion of discretionary spend into automated savings can improve cash flow quickly.' }
  ],
  stockData: {
    ticker: 'ACME',
    company: 'Acme Dynamics',
    price: '$148.72',
    marketCap: '$176B',
    volume: '2.1M',
    high52: '$162.30',
    low52: '$103.15',
    peRatio: '24.8',
    recommendation: 'Strong growth signal with moderate volatility. Hold current shares and consider adding on dips.',
    risk: 'Medium',
    confidence: '86%',
    chart: [118, 125, 132, 141, 138, 145, 156, 148, 152, 161, 155, 148],
  },
  notifications: 3,
  notificationsList: [
    { id: 1, text: 'New message from FinSight Advisor', time: '2m', read: false },
    { id: 2, text: 'Portfolio alert: ACME reached target', time: '1h', read: false },
    { id: 3, text: 'Import completed for May statement', time: '3h', read: false },
  ],
  profile: {
    name: 'Arjun Singh',
    email: 'arjunsingh24@gmail.com',
    phone: '+91 7861831987',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80'
  },
};

const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.sidebar-link');
const profileMenu = document.getElementById('profileMenu');
const profileMenuButton = document.getElementById('profileMenuButton');
const transactionBody = document.getElementById('transactionBody');
const transactionSearch = document.getElementById('transactionSearch');
const transactionFilter = document.getElementById('transactionFilter');
const transactionPagination = document.getElementById('transactionPagination');
const budgetCards = document.getElementById('budgetCards');
const stockSearchInput = document.getElementById('stockSearchInput');
const stockSearchButton = document.getElementById('stockSearchButton');
const chatHistory = document.getElementById('chatHistory');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const promptButtons = document.querySelectorAll('.prompt-btn');
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const importStatus = document.getElementById('importStatus');
const importProgress = document.getElementById('importProgress');
const themeSelect = document.getElementById('themeSelect');
const themeToggle = document.getElementById('themeToggle');
const menuOverlay = document.getElementById('menuOverlay');

const savingsGrid = document.getElementById('savingsGrid');
const savingsSortSelect = document.getElementById('savingsSortSelect');
const savingsTotalBalance = document.getElementById('savingsTotalBalance');
const savingsAvgReturn = document.getElementById('savingsAvgReturn');
const savingsGoalCount = document.getElementById('savingsGoalCount');

const charts = {};

function init() {
  state.theme = localStorage.getItem('finsightTheme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(state.theme);

  // Load custom budgets if they exist
  const savedBudgets = localStorage.getItem('finsightBudgets');
  if (savedBudgets) {
    try {
      state.budgets = JSON.parse(savedBudgets);
    } catch (e) {
      console.error('Error parsing saved budgets:', e);
    }
  }

  bindNavigation();
  initializeTransactions();
  renderBudgetCards();
  renderChat();
  initCharts();
  setStockDetails();
  setupImport();
  initializeProfile();
  bindUIControls();
  setupStockSuggestions();
  updateNotificationBadge();
  initializeSavings();

  // Show default page on load, checking hash first
  const hash = window.location.hash.substring(1);
  const validPages = ['dashboard', 'budget', 'stocks', 'advisor', 'savings', 'reports', 'import', 'profile'];
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  } else {
    showPage(state.currentPage);
  }
}

function updateNotificationBadge() {
  const badge = document.getElementById('notifBadge');
  if (!badge) return;
  const count = state.notificationsList.filter(n => !n.read).length;
  state.notifications = count;
  if (count > 0) {
    badge.textContent = String(count);
    badge.setAttribute('aria-label', `${count} new notifications`);
  } else {
    badge.textContent = '';
    badge.removeAttribute('aria-label');
  }
}

function renderNotificationsPanel() {
  const list = document.getElementById('notifList');
  const empty = document.getElementById('notifEmpty');
  if (!list || !empty) return;
  list.innerHTML = '';
  if (!state.notificationsList.length) {
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  state.notificationsList.slice().reverse().forEach((n) => {
    const li = document.createElement('li');
    li.className = n.read ? '' : 'unread';
    const btn = document.createElement('button');
    btn.className = 'notif-item';
    btn.setAttribute('role', 'menuitem');
    btn.setAttribute('tabindex', '0');
    btn.innerHTML = `<div><strong>${n.text}</strong></div><div class="muted">${n.time}</div>`;
    // clicking the item marks it read and stops propagation
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      n.read = true;
      updateNotificationBadge();
      renderNotificationsPanel();
    });
    li.appendChild(btn);
    list.appendChild(li);
  });
}

function toggleNotificationsPanel(e) {
  e && e.stopPropagation();
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  const isOpen = !panel.hidden;
  if (isOpen) closeNotificationsPanel();
  else openNotificationsPanel();
}

function openNotificationsPanel() {
  closeProfileMenu();
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  panel.hidden = false;
  renderNotificationsPanel();
  if (menuOverlay) menuOverlay.hidden = false;
  document.body.classList.add('menu-open');
  const notificationsButton = document.getElementById('notificationsButton');
  if (notificationsButton) notificationsButton.setAttribute('aria-expanded', 'true');
  panel.onclick = (ev) => ev.stopPropagation();
}

function closeNotificationsPanel() {
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  panel.hidden = true;
  if (menuOverlay) menuOverlay.hidden = true;
  document.body.classList.remove('menu-open');
  const notificationsButton = document.getElementById('notificationsButton');
  if (notificationsButton) notificationsButton.setAttribute('aria-expanded', 'false');
}

function clearNotifications() {
  state.notificationsList = [];
  renderNotificationsPanel();
  updateNotificationBadge();
}

function markAllRead() {
  state.notificationsList = state.notificationsList.map(n => ({ ...n, read: true }));
  renderNotificationsPanel();
  updateNotificationBadge();
}

function simulateNotification() {
  const id = Date.now();
  const text = ['New AI insight available', 'Price alert: ACME moved 3%', 'Reminder: Billing due tomorrow'][Math.floor(Math.random()*3)];
  state.notificationsList.push({ id, text, time: 'now', read: false });
  renderNotificationsPanel();
  updateNotificationBadge();
}

function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast-item ${type}`;
  
  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>`;
  } else if (type === 'info') {
    iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>`;
  } else {
    iconSvg = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>`;
  }
  
  toast.innerHTML = `
    ${iconSvg}
    <span class="toast-message">${message}</span>
  `;
  
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

function renderThemeIcon() {
  const icon = themeToggle.querySelector('.theme-icon');
  if (!icon) return;

  if (state.theme === 'dark') {
    icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z" />';
  } else {
    icon.innerHTML = '<circle cx="12" cy="12" r="5" /><path d="M12 1V3" /><path d="M12 21V23" /><path d="M4.22 4.22L5.64 5.64" /><path d="M18.36 18.36L19.78 19.78" /><path d="M1 12H3" /><path d="M21 12H23" /><path d="M4.22 19.78L5.64 18.36" /><path d="M18.36 5.64L19.78 4.22" />';
  }
}

function toggleTheme() {
  const newTheme = state.theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

function setTheme(theme) {
  state.theme = theme;
  document.body.classList.toggle('dark', theme === 'dark');
  document.body.classList.toggle('light', theme === 'light');
  
  if (themeSelect) {
    themeSelect.value = theme;
  }

  // Toggle active class on visual theme options
  const themeOptionLight = document.getElementById('themeOptionLight');
  const themeOptionDark = document.getElementById('themeOptionDark');
  if (themeOptionLight) {
    themeOptionLight.classList.toggle('active', theme === 'light');
  }
  if (themeOptionDark) {
    themeOptionDark.classList.toggle('active', theme === 'dark');
  }
  
  renderThemeIcon();
  localStorage.setItem('finsightTheme', theme);
  applyThemeToCharts();
}

function applyThemeToCharts() {
  const isDark = state.theme === 'dark';
  const textColor = isDark ? '#eaf3ff' : '#0a1628';
  const subtextColor = isDark ? '#a3b3cf' : '#5f718d';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(10, 22, 40, 0.08)';

  if (charts.expenseDoughnut) {
    charts.expenseDoughnut.options.plugins.legend.labels.color = subtextColor;
    charts.expenseDoughnut.update();
  }

  if (charts.expenseBar) {
    charts.expenseBar.options.scales.x.ticks.color = subtextColor;
    charts.expenseBar.options.scales.y.ticks.color = subtextColor;
    charts.expenseBar.options.scales.y.grid.color = gridColor;
    charts.expenseBar.update();
  }

  if (charts.incomeLine) {
    charts.incomeLine.options.plugins.legend.labels.color = subtextColor;
    charts.incomeLine.options.scales.x.ticks.color = subtextColor;
    charts.incomeLine.options.scales.y.ticks.color = subtextColor;
    charts.incomeLine.options.scales.y.grid.color = gridColor;
    charts.incomeLine.update();
  }

  if (charts.savingsArea) {
    charts.savingsArea.options.scales.x.ticks.color = subtextColor;
    charts.savingsArea.options.scales.y.ticks.color = subtextColor;
    charts.savingsArea.options.scales.y.grid.color = gridColor;
    charts.savingsArea.update();
  }

  if (charts.portfolioRadar) {
    charts.portfolioRadar.options.scales.r.grid.color = gridColor;
    charts.portfolioRadar.options.scales.r.angleLines.color = gridColor;
    charts.portfolioRadar.options.scales.r.pointLabels.color = subtextColor;
    charts.portfolioRadar.update();
  }

  if (charts.stockChart) {
    charts.stockChart.options.scales.x.ticks.color = subtextColor;
    charts.stockChart.options.scales.y.ticks.color = subtextColor;
    charts.stockChart.options.scales.y.grid.color = gridColor;
    charts.stockChart.update();
  }
}

function bindNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = link.dataset.page;
      if (target) {
        showPage(target);
        closeMobileSidebar();
      }
    });
  });

  document.querySelectorAll('[data-page]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const page = button.dataset.page;
      if (page) {
        showPage(page);
        closeAllDropdowns();
      }
    });
  });
}

function showPage(targetPage) {
  state.currentPage = targetPage;
  pages.forEach((page) => {
    page.classList.toggle('page-active', page.id === targetPage);
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.page === targetPage);
  });

  document.getElementById('globalSearch').value = '';
}

function initializeTransactions() {
  const savedTransactions = localStorage.getItem('finsightTransactions');
  if (savedTransactions) {
    try {
      state.transactions = JSON.parse(savedTransactions);
    } catch (e) {
      console.error('Error parsing saved transactions:', e);
    }
  }

  transactionSearch.addEventListener('input', updateTransactionListing);
  transactionFilter.addEventListener('change', updateTransactionListing);
  state.currentPageIndex = 1;
  updateTransactionListing();
}

function updateTransactionListing() {
  const query = transactionSearch.value.trim().toLowerCase();
  const category = transactionFilter.value;
  const filtered = state.transactions.filter((row) => {
    const matchesQuery = row.description.toLowerCase().includes(query) || row.category.toLowerCase().includes(query) || row.type.toLowerCase().includes(query);
    const matchesCategory = category === 'all' || row.category === category;
    return matchesQuery && matchesCategory;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / state.rowsPerPage));
  if (state.currentPageIndex > totalPages) {
    state.currentPageIndex = totalPages;
  }

  const start = (state.currentPageIndex - 1) * state.rowsPerPage;
  const pageRows = filtered.slice(start, start + state.rowsPerPage);

  transactionBody.innerHTML = pageRows.map(renderTransactionRow).join('');
  transactionPagination.innerHTML = renderPagination(totalPages);
}

function renderTransactionRow(row) {
  return `
    <tr>
      <td>${row.date}</td>
      <td>${row.description}</td>
      <td>${row.category}</td>
      <td>${row.amount}</td>
      <td>${row.type}</td>
      <td>${row.status}</td>
      <td>
        <div class="action-buttons">
          <button class="edit" data-id="${row.id}">Edit</button>
          <button class="delete" data-id="${row.id}">Delete</button>
        </div>
      </td>
    </tr>
  `;
}

function renderPagination(totalPages) {
  let html = '';
  for (let page = 1; page <= totalPages; page += 1) {
    html += `<button class="${page === state.currentPageIndex ? 'active' : ''}" data-page="${page}">${page}</button>`;
  }
  return html;
}

transactionPagination.addEventListener('click', (event) => {
  const target = event.target.closest('button');
  if (!target) return;
  const page = Number(target.dataset.page);
  if (page && page !== state.currentPageIndex) {
    state.currentPageIndex = page;
    updateTransactionListing();
  }
});

function renderBudgetCards() {
  budgetCards.innerHTML = state.budgets
    .map((item) => {
      const usage = Math.min(100, Math.round((item.spent / item.limit) * 100));
      return `
      <article class="budget-card glass-card">
        <div class="budget-heading">
          <span>${item.label}</span>
          <strong>${item.status}</strong>
        </div>
        <div>
          <p>Budget limit</p>
          <strong>₹${item.limit}</strong>
        </div>
        <div>
          <p>Spent amount</p>
          <strong>₹${item.spent}</strong>
        </div>
        <div>
          <p>Remaining amount</p>
          <strong>₹${item.remaining}</strong>
        </div>
        <div class="progress-bar"><span style="width:${usage}%"></span></div>
      </article>
    `;
    })
    .join('');
}

function bindUIControls() {
  profileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleProfileMenu();
  });

  // Close any open dropdowns when clicking outside or pressing Escape
  document.addEventListener('click', () => {
    closeAllDropdowns();
  });

  if (menuOverlay) {
    menuOverlay.addEventListener('click', closeAllDropdowns);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllDropdowns();
  });

  themeToggle.addEventListener('click', toggleTheme);
  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      setTheme(e.target.value);
    });
  }

  // Profile Page Visual Theme Option Listeners
  const themeOptionLight = document.getElementById('themeOptionLight');
  const themeOptionDark = document.getElementById('themeOptionDark');
  if (themeOptionLight) {
    themeOptionLight.addEventListener('click', () => {
      setTheme('light');
    });
  }
  if (themeOptionDark) {
    themeOptionDark.addEventListener('click', () => {
      setTheme('dark');
    });
  }

  // Preference Toggle Listeners
  const pushNotificationsToggle = document.getElementById('pushNotificationsToggle');
  const emailUpdatesToggle = document.getElementById('emailUpdatesToggle');
  
  if (pushNotificationsToggle) {
    pushNotificationsToggle.addEventListener('change', (e) => {
      const status = e.target.checked ? 'enabled' : 'disabled';
      showToast(`Push notifications ${status}!`, 'info');
      state.notificationsList.push({
        id: Date.now(),
        text: `Push notifications have been ${status}.`,
        time: 'now',
        read: false
      });
      updateNotificationBadge();
      renderNotificationsPanel();
    });
  }
  
  if (emailUpdatesToggle) {
    emailUpdatesToggle.addEventListener('change', (e) => {
      const status = e.target.checked ? 'subscribed' : 'unsubscribed';
      showToast(`Email newsletter subscription: ${status}!`, 'info');
      state.notificationsList.push({
        id: Date.now(),
        text: `Email newsletter subscription: ${status}.`,
        time: 'now',
        read: false
      });
      updateNotificationBadge();
      renderNotificationsPanel();
    });
  }

  // Security Actions Listeners
  const btnConfigure2fa = document.getElementById('btnConfigure2fa');
  const btnUpdatePassword = document.getElementById('btnUpdatePassword');
  const btnManageDevices = document.getElementById('btnManageDevices');
  
  if (btnConfigure2fa) {
    btnConfigure2fa.addEventListener('click', () => {
      showToast('Two-Factor Authentication setup initiated!', 'success');
      state.notificationsList.push({
        id: Date.now(),
        text: '2FA configuration wizard opened.',
        time: 'now',
        read: false
      });
      updateNotificationBadge();
      renderNotificationsPanel();
    });
  }
  
  if (btnUpdatePassword) {
    btnUpdatePassword.addEventListener('click', () => {
      showToast('Password update request sent to your email!', 'success');
      state.notificationsList.push({
        id: Date.now(),
        text: 'Password recovery verification email sent.',
        time: 'now',
        read: false
      });
      updateNotificationBadge();
      renderNotificationsPanel();
    });
  }
  
  if (btnManageDevices) {
    btnManageDevices.addEventListener('click', () => {
      showToast('Active session list updated.', 'info');
      state.notificationsList.push({
        id: Date.now(),
        text: 'Connected devices log audited.',
        time: 'now',
        read: false
      });
      updateNotificationBadge();
      renderNotificationsPanel();
    });
  }

  stockSearchButton.addEventListener('click', handleStockSearch);

  chatForm.addEventListener('submit', handleChatSubmit);
  promptButtons.forEach((button) => button.addEventListener('click', () => {
    chatInput.value = button.textContent;
    chatInput.focus();
  }));

  dropZone.addEventListener('dragover', handleDragOver);
  dropZone.addEventListener('drop', handleDrop);
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  fileInput.addEventListener('change', handleFileSelect);

  const notificationsButton = document.getElementById('notificationsButton');
  const markAllBtn = document.getElementById('markAllRead');
  const clearBtn = document.getElementById('clearNotifications');
  const simulateBtn = document.getElementById('simulateNotif');
  if (notificationsButton) notificationsButton.addEventListener('click', (e) => { e.stopPropagation(); toggleNotificationsPanel(e); });
  if (markAllBtn) markAllBtn.addEventListener('click', (e) => { e.stopPropagation(); markAllRead(); });
  if (clearBtn) clearBtn.addEventListener('click', (e) => { e.stopPropagation(); clearNotifications(); });
  if (simulateBtn) simulateBtn.addEventListener('click', (e) => { e.stopPropagation(); simulateNotification(); });

  // Budget Modal bindings
  const openBudgetModalBtn = document.getElementById('openBudgetModalBtn');
  const closeBudgetModalBtn = document.getElementById('closeBudgetModalBtn');
  const cancelBudgetBtn = document.getElementById('cancelBudgetBtn');
  const budgetForm = document.getElementById('budgetForm');
  const budgetModal = document.getElementById('budgetModal');

  if (openBudgetModalBtn) openBudgetModalBtn.addEventListener('click', openBudgetModal);
  if (closeBudgetModalBtn) closeBudgetModalBtn.addEventListener('click', closeBudgetModal);
  if (cancelBudgetBtn) cancelBudgetBtn.addEventListener('click', closeBudgetModal);
  if (budgetModal) {
    budgetModal.addEventListener('click', (e) => {
      if (e.target === budgetModal) closeBudgetModal();
    });
  }
  if (budgetForm) budgetForm.addEventListener('submit', handleCreateBudget);

  // Transaction Table Edit/Delete bindings using event delegation
  if (transactionBody) {
    transactionBody.addEventListener('click', (event) => {
      const editBtn = event.target.closest('button.edit');
      const deleteBtn = event.target.closest('button.delete');
      
      if (editBtn) {
        const id = Number(editBtn.dataset.id);
        openEditTransactionModal(id);
      } else if (deleteBtn) {
        const id = Number(deleteBtn.dataset.id);
        deleteTransaction(id);
      }
    });
  }

  // Generate Report Button
  const generateReportBtn = document.getElementById('generateReportBtn');
  if (generateReportBtn) {
    generateReportBtn.addEventListener('click', () => {
      exportTransactionsToCSV();
    });
  }

  // Export Excel Button (Reports page)
  const exportExcelBtn = document.getElementById('exportExcelBtn');
  if (exportExcelBtn) {
    exportExcelBtn.addEventListener('click', () => {
      exportTransactionsToCSV();
    });
  }

  // Download PDF Button (Reports page)
  const downloadPdfBtn = document.getElementById('downloadPdfBtn');
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', () => {
      if (typeof showToast === 'function') {
        showToast('Generating PDF report... (Dummy feature)', 'info');
      } else {
        alert('Generating PDF report... (Dummy feature)');
      }
    });
  }

  // Transaction Modal bindings
  const closeTransactionModalBtn = document.getElementById('closeTransactionModalBtn');
  const cancelTransactionBtn = document.getElementById('cancelTransactionBtn');
  const transactionForm = document.getElementById('transactionForm');
  const transactionModal = document.getElementById('transactionModal');

  if (closeTransactionModalBtn) closeTransactionModalBtn.addEventListener('click', closeTransactionModal);
  if (cancelTransactionBtn) cancelTransactionBtn.addEventListener('click', closeTransactionModal);
  if (transactionModal) {
    transactionModal.addEventListener('click', (e) => {
      if (e.target === transactionModal) closeTransactionModal();
    });
  }
  if (transactionForm) transactionForm.addEventListener('submit', handleEditTransactionSubmit);

  // Mobile Menu & Sidebar toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openMobileSidebar();
    });
  }

  const sidebarToggle = document.getElementById('sidebarToggle');
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (window.innerWidth <= 768) {
        closeMobileSidebar();
      } else {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) sidebar.classList.toggle('collapsed');
      }
    });
  }

  // Payment Modal bindings
  const tradeBadge = document.getElementById('tradeBadge');
  if (tradeBadge) {
    tradeBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = tradeBadge.textContent.trim();
      if (action === 'BUY') {
        openPaymentModal();
      }
    });
  }

  const closePaymentModalBtn = document.getElementById('closePaymentModalBtn');
  const cancelPaymentBtn = document.getElementById('cancelPaymentBtn');
  const paymentModal = document.getElementById('paymentModal');
  const paymentForm = document.getElementById('paymentForm');
  const paymentSharesInput = document.getElementById('paymentShares');
  const successCloseBtn = document.getElementById('successCloseBtn');

  if (closePaymentModalBtn) closePaymentModalBtn.addEventListener('click', closePaymentModal);
  if (cancelPaymentBtn) cancelPaymentBtn.addEventListener('click', closePaymentModal);
  if (successCloseBtn) successCloseBtn.addEventListener('click', closePaymentModal);
  if (paymentModal) {
    paymentModal.addEventListener('click', (e) => {
      if (e.target === paymentModal) closePaymentModal();
    });
  }
  if (paymentSharesInput) {
    paymentSharesInput.addEventListener('input', updatePaymentTotal);
    paymentSharesInput.addEventListener('change', updatePaymentTotal);
  }
  if (paymentForm) {
    paymentForm.addEventListener('submit', handlePaymentSubmit);
  }

  // global outside click listener above handles closing for all dropdowns
}

function closeAllDropdowns() {
  closeProfileMenu();
  closeNotificationsPanel();
  closeBudgetModal();
  closeTransactionModal();
  closePaymentModal();
  closeMobileSidebar();
}

function toggleNotificationsPanel(e) {
  e && e.stopPropagation();
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  const isOpen = !panel.hidden;
  if (isOpen) {
    closeNotificationsPanel();
  } else {
    closeProfileMenu();
    openNotificationsPanel();
  }
}

function openNotificationsPanel() {
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  panel.hidden = false;
  renderNotificationsPanel();
  if (menuOverlay) menuOverlay.hidden = false;
  document.body.classList.add('menu-open');
  const notificationsButton = document.getElementById('notificationsButton');
  if (notificationsButton) notificationsButton.setAttribute('aria-expanded', 'true');
  panel.onclick = (ev) => ev.stopPropagation();
}

function closeNotificationsPanel() {
  const panel = document.getElementById('notifPanel');
  if (!panel) return;
  panel.hidden = true;
  if (menuOverlay) menuOverlay.hidden = true;
  document.body.classList.remove('menu-open');
  const notificationsButton = document.getElementById('notificationsButton');
  if (notificationsButton) notificationsButton.setAttribute('aria-expanded', 'false');
}

function toggleProfileMenu() {
  const isOpen = !profileMenu.hidden;
  if (isOpen) {
    closeProfileMenu();
  } else {
    closeNotificationsPanel();
    openProfileMenu();
  }
}

function openProfileMenu() {
  if (!profileMenu) return;
  profileMenu.hidden = false;
  if (menuOverlay) menuOverlay.hidden = false;
  document.body.classList.add('menu-open');
  if (profileMenuButton) profileMenuButton.setAttribute('aria-expanded', 'true');
  profileMenu.onclick = (ev) => ev.stopPropagation();
}

function closeProfileMenu() {
  if (!profileMenu) return;
  profileMenu.hidden = true;
  if (menuOverlay) menuOverlay.hidden = true;
  document.body.classList.remove('menu-open');
  if (profileMenuButton) profileMenuButton.setAttribute('aria-expanded', 'false');
}

function setStockDetails() {
  document.getElementById('stockTicker').textContent = state.stockData.ticker;
  document.querySelector('.stock-summary span').textContent = state.stockData.company;
  document.getElementById('stockPrice').textContent = state.stockData.price;
  document.getElementById('stockMarketCap').textContent = state.stockData.marketCap;
  document.getElementById('stockVolume').textContent = state.stockData.volume;
  document.getElementById('stockHigh').textContent = state.stockData.high52;
  document.getElementById('stockLow').textContent = state.stockData.low52;
  document.getElementById('stockPE').textContent = state.stockData.peRatio;
  document.getElementById('stockRecommendation').textContent = state.stockData.recommendation;
  
  // Set badge and AI stats dynamically
  const badge = document.getElementById('tradeBadge');
  if (badge) {
    const action = state.stockData.tradeBadge || 'BUY';
    badge.textContent = action;
    
    // Smooth custom badge colors based on recommendation action
    if (action === 'BUY') {
      badge.style.background = 'rgba(14, 165, 233, 0.16)';
      badge.style.color = state.theme === 'dark' ? '#0ea5e9' : '#0ea5e9';
    } else if (action === 'SELL') {
      badge.style.background = 'rgba(217, 83, 79, 0.16)';
      badge.style.color = '#d9534f';
    } else { // HOLD
      badge.style.background = 'rgba(244, 180, 0, 0.16)';
      badge.style.color = state.theme === 'dark' ? '#ffc107' : '#b08200';
    }
  }

  const riskEl = document.getElementById('stockRisk');
  const confEl = document.getElementById('stockConfidence');
  if (riskEl) riskEl.textContent = state.stockData.riskLevel || 'Medium';
  if (confEl) confEl.textContent = state.stockData.confidence || '86%';
}

async function handleStockSearch() {
  const query = stockSearchInput.value.trim();
  if (!query) return;
  
  // Show visual loading indicator
  const searchBtn = document.getElementById('stockSearchButton');
  const originalText = searchBtn.textContent;
  searchBtn.textContent = 'Analyzing...';
  searchBtn.disabled = true;
  
  let data;
  let useFallbackScraper = false;
  
  try {
    const apiBase = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isLocal || window.location.protocol === 'file:') {
      try {
        const response = await fetch(`${apiBase}/api/stock?symbol=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Symbol not found');
        data = await response.json();
        if (data.error || !data.price) {
          throw new Error('Stock data unavailable');
        }
      } catch (localErr) {
        console.warn("Local server connection failed, using public CORS proxy fallback:", localErr);
        useFallbackScraper = true;
      }
    } else {
      useFallbackScraper = true;
    }
    
    if (useFallbackScraper) {
      // 1. Fetch Chart Data via AllOrigins CORS proxy
      const chartUrl = `https://query2.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(query).toUpperCase()}?range=1mo&interval=1d`;
      const proxyChartUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(chartUrl)}`;
      
      const chartRes = await fetch(proxyChartUrl);
      if (!chartRes.ok) throw new Error('Symbol not found');
      const chartWrapper = await chartRes.json();
      const chartJson = JSON.parse(chartWrapper.contents);
      
      if (!chartJson.chart || !chartJson.chart.result || chartJson.chart.result.length === 0) {
        const errDescription = chartJson.chart?.error?.description || 'Symbol not found';
        throw new Error(errDescription);
      }
      
      const c = chartJson.chart.result[0];
      const meta = c.meta || {};
      
      data = {
        symbol: meta.symbol || query.toUpperCase(),
        companyName: meta.longName || meta.shortName || query.toUpperCase(),
        price: meta.regularMarketPrice,
        volume: meta.regularMarketVolume,
        high52: meta.fiftyTwoWeekHigh,
        low52: meta.fiftyTwoWeekLow,
        currency: meta.currency || 'USD',
        history: (c.indicators?.quote?.[0]?.close || []).filter(x => x !== null),
        marketCap: null,
        peRatio: null
      };
      
      // 2. Fetch HTML page to scrape Market Cap & PE Ratio
      try {
        const htmlUrl = `https://finance.yahoo.com/quote/${encodeURIComponent(query).toUpperCase()}`;
        const proxyHtmlUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(htmlUrl)}`;
        
        const htmlRes = await fetch(proxyHtmlUrl);
        if (htmlRes.ok) {
          const htmlWrapper = await htmlRes.json();
          const htmlData = htmlWrapper.contents;
          
          // Scrape Market Cap
          const m_cap = htmlData.match(/"marketCap"[^>]*>([^<]+)/);
          if (m_cap) {
            data.marketCap = m_cap[1].trim();
          }
          
          // Scrape PE
          const m_pe = htmlData.match(/"trailingPE"[^>]*>([^<]+)/);
          if (m_pe) {
            const peVal = m_pe[1].trim();
            if (peVal !== '--') {
              data.peRatio = parseFloat(peVal.replace(',', ''));
            }
          }
        }
      } catch (scrapeErr) {
        console.warn("Scraper fallback error:", scrapeErr);
      }
    }
    
    if (!data || !data.price) {
      throw new Error('Stock data unavailable');
    }
    
    // Update state
    state.stockData.ticker = data.symbol;
    state.stockData.company = data.companyName || `${data.symbol} Holdings`;
    
    // Normalize pence-quoted stocks (GBp/GBX) to GBP (Pounds)
    let priceVal = data.price;
    let highVal = data.high52;
    let lowVal = data.low52;
    let currencyCode = data.currency || 'USD';
    
    if (currencyCode === 'GBp' || currencyCode === 'GBX') {
      priceVal = priceVal / 100;
      if (highVal) highVal = highVal / 100;
      if (lowVal) lowVal = lowVal / 100;
      currencyCode = 'GBP';
    }
    
    // Map currency symbols
    const currencyMap = { 'USD': '$', 'INR': '₹', 'GBP': '£', 'EUR': '€', 'JPY': '¥', 'CAD': 'CA$' };
    const curSymbol = currencyMap[currencyCode.toUpperCase()] || `${currencyCode} `;
    
    state.stockData.price = `${curSymbol}${priceVal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    // Format market cap
    let marketCapFormatted = 'N/A';
    if (data.marketCap) {
      // Note: Scraped marketCap is already string formatted like "4.377T" or "24.399B"
      marketCapFormatted = `${curSymbol}${data.marketCap}`;
    }
    state.stockData.marketCap = marketCapFormatted;
    
    // Format volume
    let volumeFormatted = 'N/A';
    if (data.volume) {
      if (data.volume >= 1e6) {
        volumeFormatted = `${(data.volume / 1e6).toFixed(2)}M`;
      } else {
        volumeFormatted = data.volume.toLocaleString('en-US');
      }
    }
    state.stockData.volume = volumeFormatted;
    
    state.stockData.high52 = highVal ? `${curSymbol}${highVal.toLocaleString('en-US', {maximumFractionDigits: 2})}` : 'N/A';
    state.stockData.low52 = lowVal ? `${curSymbol}${lowVal.toLocaleString('en-US', {maximumFractionDigits: 2})}` : 'N/A';
    state.stockData.peRatio = data.peRatio ? data.peRatio.toFixed(2) : 'N/A';
    
    // Generate AI recommendations from metrics
    const normPrice = priceVal;
    const normHigh = highVal || priceVal;
    const normLow = lowVal || priceVal;
    const pctFromHigh = ((normHigh - normPrice) / normHigh) * 100;
    const pctFromLow = ((normPrice - normLow) / normLow) * 100;
    
    let rec = '';
    let badge = 'HOLD';
    let risk = 'Low';
    let confidence = '80%';
    
    if (pctFromHigh < 5) {
      rec = `Strong momentum on ${data.symbol}. Trading near its 52-week high of ${curSymbol}${normHigh.toFixed(2)}. Potential breakout watch. Consider scaling in.`;
      badge = 'BUY';
      risk = 'Medium';
      confidence = '88%';
    } else if (pctFromLow < 8) {
      rec = `${data.symbol} is trading close to its 52-week support floor of ${curSymbol}${normLow.toFixed(2)}. Buying opportunity for value investors with tight stop-losses.`;
      badge = 'BUY';
      risk = 'High';
      confidence = '85%';
    } else if (data.peRatio > 40) {
      rec = `${data.symbol} shows high growth expectations with a P/E of ${data.peRatio.toFixed(1)}. Valuation is stretched compared to peers. Maintain current shares.`;
      badge = 'HOLD';
      risk = 'High';
      confidence = '82%';
    } else {
      rec = `${data.symbol} exhibits solid support with moderate volatility. Valuation (P/E: ${data.peRatio ? data.peRatio.toFixed(1) : 'N/A'}) is reasonable. Hold or accumulate on minor dips.`;
      badge = 'BUY';
      risk = 'Low';
      confidence = '86%';
    }
    
    state.stockData.recommendation = rec;
    state.stockData.tradeBadge = badge;
    state.stockData.riskLevel = risk;
    state.stockData.confidence = confidence;
    
    // Use actual history data if available, otherwise generate random trend
    if (data.history && data.history.length > 0) {
      state.stockData.chart = data.history;
    } else {
      state.stockData.chart = Array.from({ length: 12 }, () => 90 + Math.random() * 80);
    }
    
    const stockGrid = document.querySelector('.stock-grid');
    if (stockGrid) {
      stockGrid.removeAttribute('hidden');
    }

    setStockDetails();
    updateStockChart();
    
    showToast(`Analyzed ${data.symbol} successfully!`, 'success');
  } catch (err) {
    console.warn(`Real-time fetch failed for "${query}", generating simulated analysis:`, err);
    
    // Generate realistic simulated data
    const ticker = query.toUpperCase();
    const currencyMap = { 'NS': '₹', 'L': '£', 'DE': '€', 'PA': '€', 'AS': '€', 'T': '¥', 'TW': 'NT$' };
    const suffix = ticker.split('.').pop();
    const curSymbol = currencyMap[suffix] || '$';
    
    const mockPrice = 100 + Math.random() * 900;
    
    state.stockData.ticker = ticker;
    state.stockData.company = `${ticker} Corp (Simulated)`;
    state.stockData.price = `${curSymbol}${mockPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    state.stockData.marketCap = `${curSymbol}${(10 + Math.random() * 250).toFixed(1)}B`;
    state.stockData.volume = `${(1.2 + Math.random() * 8.5).toFixed(1)}M`;
    state.stockData.high52 = `${curSymbol}${(mockPrice * 1.15).toLocaleString('en-US', {maximumFractionDigits: 2})}`;
    state.stockData.low52 = `${curSymbol}${(mockPrice * 0.75).toLocaleString('en-US', {maximumFractionDigits: 2})}`;
    state.stockData.peRatio = `${(12 + Math.random() * 28).toFixed(1)}`;
    
    const recText = `${ticker} exhibits stable metrics in this category. Our simulated model indicates solid long-term fundamentals with a minor accumulation range near current support.`;
    state.stockData.recommendation = recText;
    state.stockData.tradeBadge = Math.random() > 0.4 ? 'BUY' : 'HOLD';
    state.stockData.riskLevel = Math.random() > 0.5 ? 'Medium' : 'Low';
    state.stockData.confidence = `${(80 + Math.floor(Math.random() * 15))}%`;
    state.stockData.chart = Array.from({ length: 12 }, () => mockPrice * (0.85 + Math.random() * 0.3));
    
    const stockGrid = document.querySelector('.stock-grid');
    if (stockGrid) {
      stockGrid.removeAttribute('hidden');
    }

    setStockDetails();
    updateStockChart();
    
    showToast(`Analyzed ${ticker} (Simulated Fallback) successfully!`, 'success');
  } finally {
    searchBtn.textContent = originalText;
    searchBtn.disabled = false;
  }
}

async function handleChatSubmit(event) {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;
  addChatMessage('user', question);
  chatInput.value = '';
  
  const loadingMsg = addChatLoadingMessage();
  
  try {
    const response = await generateChatResponseAsync(question);
    removeChatLoadingMessage(loadingMsg);
    addChatMessage('ai', response);
  } catch (error) {
    console.error("Error generating chat response:", error);
    removeChatLoadingMessage(loadingMsg);
    addChatMessage('ai', "### **Error**\nI'm sorry, I encountered an issue while communicating with the stock search service. Please verify your connection or try again.");
  }
}

function addChatMessage(role, text) {
  state.chatMessages.push({ role, text });
  renderChat();
}

function addChatLoadingMessage() {
  const loadingMsg = { role: 'ai', text: '...', isLoading: true };
  state.chatMessages.push(loadingMsg);
  renderChat();
  return loadingMsg;
}

function removeChatLoadingMessage(loadingMsg) {
  const idx = state.chatMessages.indexOf(loadingMsg);
  if (idx > -1) {
    state.chatMessages.splice(idx, 1);
    renderChat();
  }
}

function parseMarkdown(text) {
  if (!text) return '';
  
  let html = text;
  
  // 1. Parse tables
  const lines = html.split('\n');
  let inTable = false;
  let tableHtml = '';
  const processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      if (!inTable) {
        inTable = true;
        tableHtml = '<table>';
      }
      
      if (line.includes('---')) {
        continue;
      }
      
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      const isHeader = !tableHtml.includes('<tr>');
      
      tableHtml += '<tr>';
      cells.forEach(cell => {
        const tag = isHeader ? 'th' : 'td';
        tableHtml += `<${tag}>${parseInlineMarkdown(cell)}</${tag}>`;
      });
      tableHtml += '</tr>';
    } else {
      if (inTable) {
        inTable = false;
        tableHtml += '</table>';
        processedLines.push(tableHtml);
        tableHtml = '';
      }
      processedLines.push(line);
    }
  }
  if (inTable) {
    tableHtml += '</table>';
    processedLines.push(tableHtml);
  }
  
  html = processedLines.join('\n');
  
  // 2. Parse headings
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // 3. Parse bullet lists
  html = html.replace(/^\s*[\*\-]\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gim, '<ul>$1</ul>');
  html = html.replace(/<\/ul>\s*<ul>/gim, '');
  
  // 4. Parse numbered lists
  html = html.replace(/^\s*\d+\.\s+(.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/gim, '<ol>$1</ol>');
  html = html.replace(/<\/ol>\s*<ol>/gim, '');
  
  // 5. Parse inline elements
  html = parseInlineMarkdown(html);
  
  // 6. Handle paragraph breaks
  const finalLines = html.split('\n');
  for (let j = 0; j < finalLines.length; j++) {
    const l = finalLines[j];
    if (!l.startsWith('<h') && !l.startsWith('<t') && !l.startsWith('<u') && !l.startsWith('<o') && !l.startsWith('<l') && l.trim().length > 0) {
      finalLines[j] = `<p>${l}</p>`;
    }
  }
  html = finalLines.join('');
  
  return html;
}

function parseInlineMarkdown(text) {
  let res = text;
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  res = res.replace(/`(.*?)`/g, '<code>$1</code>');
  return res;
}

function renderChat() {
  chatHistory.innerHTML = state.chatMessages
    .map((message) => {
      if (message.role === 'ai') {
        const bubbleContent = message.isLoading
          ? `<div class="typing-indicator">
               <span></span>
               <span></span>
               <span></span>
             </div>`
          : parseMarkdown(message.text);
        return `
          <div class="message ai">
            <div class="avatar ai-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor" class="ai-sparkle-svg">
                <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10-0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z"></path>
              </svg>
            </div>
            <div class="bubble">${bubbleContent}</div>
          </div>
        `;
      } else {
        return `
          <div class="message user">
            <div class="bubble">${message.text}</div>
            <div class="avatar user-avatar">
              <img src="${state.profile.avatar}" alt="${state.profile.name}" />
            </div>
          </div>
        `;
      }
    })
    .join('');
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function generateChatResponseAsync(prompt) {
  const lower = prompt.toLowerCase();
  
  // Extract potential stock symbols or company names
  const stopWords = new Set(['what', 'is', 'the', 'of', 'in', 'and', 'to', 'a', 'about', 'how', 'does', 'do', 'you', 'think', 'recommend', 'should', 'buy', 'sell', 'stock', 'share', 'shares', 'price', 'info', 'details', 'tell', 'me', 'on', 'for', 'with', 'at', 'any']);
  const words = prompt.replace(/[?.,!]/g, '').split(/\s+/).map(w => w.trim()).filter(w => w.length > 1);
  
  let detectedSymbolOrName = null;
  
  for (const word of words) {
    if (word.length >= 2 && word.length <= 5 && /^[A-Za-z]+$/.test(word)) {
      if (word === word.toUpperCase() && !stopWords.has(word.toLowerCase())) {
        detectedSymbolOrName = word;
        break;
      }
    }
  }
  
  if (!detectedSymbolOrName) {
    for (const word of words) {
      if (!stopWords.has(word.toLowerCase())) {
        detectedSymbolOrName = word;
        break;
      }
    }
  }

  // Check if we should call the Yahoo Finance proxy APIs
  if (detectedSymbolOrName && (lower.includes('stock') || lower.includes('price') || lower.includes('share') || lower.includes('company') || lower.includes('ticker') || lower.includes('market') || lower.includes('portfolio') || /^[A-Z]{2,5}$/.test(detectedSymbolOrName))) {
    try {
      const searchRes = await fetch(`/api/search?q=${encodeURIComponent(detectedSymbolOrName)}`);
      if (searchRes.ok) {
        const suggestions = await searchRes.json();
        if (suggestions && suggestions.length > 0) {
          const match = suggestions[0];
          const ticker = match.symbol;
          
          const stockRes = await fetch(`/api/stock?symbol=${ticker}`);
          if (stockRes.ok) {
            const stockData = await stockRes.json();
            return formatStockResponse(stockData);
          }
        }
      }
    } catch (e) {
      console.error("Error fetching live stock details in chat:", e);
    }
  }
  
  // Local fallback templates
  let totalIncome = 0;
  let totalExpenses = 0;
  const categoryTotals = {};
  
  state.transactions.forEach(t => {
    const val = Math.abs(parseFloat(t.amount.replace(/[\₹\+,]/g, '')));
    if (t.type === 'Income') {
      totalIncome += val;
    } else if (t.type === 'Expense') {
      totalExpenses += val;
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + val;
    }
  });

  let highestExpenseCategory = 'Discretionary';
  let highestExpenseValue = 0;
  for (const cat in categoryTotals) {
    if (categoryTotals[cat] > highestExpenseValue) {
      highestExpenseValue = categoryTotals[cat];
      highestExpenseCategory = cat;
    }
  }

  const totalSavings = state.savings.reduce((acc, curr) => acc + curr.balance, 0);

  // 1. Savings trajectory
  if (lower.includes('savings') || lower.includes('sip') || lower.includes('goal')) {
    const topSavings = state.savings[0];
    const avgReturn = (state.savings.reduce((acc, curr) => acc + curr.returnRate * curr.balance, 0) / totalSavings).toFixed(1);
    return `### **Savings & Investment Analysis**
Your total active savings base stands at **₹${totalSavings.toLocaleString('en-US')}** with an average annual yield of **${avgReturn}%**.

**Primary Target**: **${topSavings.name}**
* Current Balance: **₹${topSavings.balance.toLocaleString('en-US')}**
* Progress: **${topSavings.progress}%** of target

**Strategic Recommendations**:
1. **Increase Monthly Allocations**: Adjusting your systematic investment plan (SIP) or mutual fund contribution by **10% (approx. ₹150/month)** can shave 3 months off your emergency reserve target.
2. **Automated Round-ups**: Enable transactions round-up to automatically route spare change to this fund.`;
  }
  
  // 2. Reduce expenses / Category budget analysis
  if (lower.includes('reduce') || lower.includes('expense') || lower.includes('spending') || lower.includes('cut')) {
    let maxUtilizationCat = 'Shopping';
    let maxUtilizationPct = 0;
    state.budgets.forEach(b => {
      const pct = (b.spent / b.limit) * 100;
      if (pct > maxUtilizationPct) {
        maxUtilizationPct = pct;
        maxUtilizationCat = b.label;
      }
    });

    let advice = `### **Expense and Budget Audit**
An analysis of your recent ledger shows that **${highestExpenseCategory}** is your largest spending category this month, totaling **₹${highestExpenseValue.toFixed(2)}**. `;
    if (maxUtilizationPct > 80) {
      const budget = state.budgets.find(b => b.label === maxUtilizationCat);
      advice += `\n\n**Alert**: Your budget for **${maxUtilizationCat}** has reached **${maxUtilizationPct.toFixed(0)}%** utilization (spent **₹${budget.spent}** of **₹${budget.limit}** limit).
      
**Action Plan**:
* **Discretionary Lock**: Pause non-essential purchases in the **${maxUtilizationCat}** category for the next 10 days.
* **Limit Adjustment**: Lower next month's cap for **${maxUtilizationCat}** to **₹450** to instantly save **₹170** and increase your investable surplus.`;
    } else {
      advice += `\n\nYour budgets are currently in a healthy state, with all categories well below their limits. \n\n**Action Plan**: Since you have surplus cash flow, I recommend transferring 5% of your remaining monthly balance into your interest-bearing Fixed Deposit (yielding **5.1%**).`;
    }
    return advice;
  }
  
  // 3. Growth portfolio recommendations
  if (lower.includes('portfolio') || lower.includes('invest') || lower.includes('growth') || lower.includes('asset')) {
    const stocksBal = state.savings.find(s => s.name === 'Stocks')?.balance || 0;
    const mfBal = state.savings.find(s => s.name === 'Mutual Funds')?.balance || 0;
    const totalInvestments = stocksBal + mfBal;
    
    return `### **Growth Portfolio Recommendation**
You currently hold **₹${totalInvestments.toLocaleString('en-US')}** in market-exposed assets (Stocks and Mutual Funds), which comprises **${((totalInvestments/totalSavings)*100).toFixed(0)}%** of your total savings net worth.

Here is a institutional-grade growth model designed to optimize yield while mitigating volatility:
1. **Core Market (60%)**: Allocation to low-cost broad-market index ETFs (e.g., tracking S&P 500 or Nasdaq-100) to capture index growth.
2. **Growth Equities (20%)**: Large-cap technology or energy leaders showing strong free cash flow and revenue expansion.
3. **Emerging Markets (10%)**: International and emerging markets exposure for geographical diversification.
4. **Defensive/Fixed Income (10%)**: Secure, high-yield fixed deposits (like your FD earning 5.1%) to act as a buffer during market drawdowns.`;
  }
  
  // 4. Financial Health Score Explanation
  if (lower.includes('health') || lower.includes('score')) {
    const overBudgetCount = state.budgets.filter(b => b.spent > b.limit).length;
    const reviewBudgetCount = state.budgets.filter(b => b.spent / b.limit > 0.8).length;
    let score = 88 - (overBudgetCount * 10) - (reviewBudgetCount * 3);
    if (score > 100) score = 100;
    if (score < 50) score = 50;

    return `### **Financial Health Assessment**
Your current Financial Health Score is **${score}/100**, which represents a **Strong** financial standing.

**Positive Anchors**:
* **Healthy Savings Base**: Total savings of **₹${totalSavings.toLocaleString()}** represents a strong safety net.
* **Positive Cash Flow**: Income-to-expense ratio is positive.

**Risk Factors**:
* **High Budget Utilization**: You have **${reviewBudgetCount}** categories (principally **Shopping**) that are close to exceeding their caps. Keeping budget utilization below 75% will boost your health score to **90+**.`;
  }

  // 5. Default Context-Aware Response
  return `### **FinSight AI Assistant**
Welcome! I am your AI Financial Advisor. Based on your active account telemetry, here is your summary:
* **Total Assets**: ₹${totalSavings.toLocaleString()}
* **Primary Objective**: ${state.savings[0].name} (${state.savings[0].progress}% complete)
* **Top Expense Category**: ${highestExpenseCategory} (₹${highestExpenseValue.toFixed(0)} spent)

**How I can assist you today**:
1. **Analyze Budgets**: Ask *"How can I reduce expenses?"* or *"Analyze my spending"*
2. **Investments**: Ask *"Recommend a growth portfolio"* or *"What is my savings trajectory?"*
3. **Health Audit**: Ask *"Explain my financial health score"*
4. **Stock Information**: Ask about **any stock ticker or company name** (e.g., *"What is Apple's stock price?"*, *"Is MSFT a good buy?"*, *"Search stock Tesla"*).`;
}

function formatStockResponse(data) {
  const symbol = data.symbol;
  const companyName = data.companyName || symbol;
  const currency = data.currency || 'USD';
  const price = data.price ? parseFloat(data.price).toFixed(2) : 'N/A';
  const high52 = data.high52 ? parseFloat(data.high52).toFixed(2) : 'N/A';
  const low52 = data.low52 ? parseFloat(data.low52).toFixed(2) : 'N/A';
  const volume = data.volume ? formatCompactNumber(data.volume) : 'N/A';
  const marketCap = data.marketCap || 'N/A';
  const peRatio = data.peRatio || 'N/A';
  
  let positionPct = 0;
  if (data.price && data.high52 && data.low52) {
    const range = data.high52 - data.low52;
    if (range > 0) {
      positionPct = ((data.price - data.low52) / range) * 100;
    }
  }
  
  let signal = 'HOLD';
  let adviceText = '';
  if (positionPct > 85) {
    signal = 'ACCUMULATE / HOLD';
    adviceText = `Trading near its 52-week high, ${companyName} shows strong momentum but potential near-term overvaluation risk. Consider dollar-cost averaging into a position rather than a large lump-sum purchase.`;
  } else if (positionPct < 25) {
    signal = 'WATCHLIST / VALUE BUY';
    adviceText = `Currently trading near its 52-week low. This represents a potential turnaround play or value opportunity, but carries risk due to downward trend. Ensure there are no structural issues with the company's business model before buying.`;
  } else {
    signal = 'BUY / HOLD';
    adviceText = `Trading in the middle of its 52-week range. The stock shows stable consolidated behavior. Ideal for steady long-term accumulation.`;
  }
  
  if (peRatio !== 'N/A' && !isNaN(peRatio)) {
    const pe = parseFloat(peRatio);
    if (pe > 35) {
      adviceText += ` The trailing P/E of **${peRatio}** is elevated, indicating that the market has priced in high growth expectations. Best suited for growth portfolios with a higher risk tolerance.`;
    } else if (pe < 15) {
      adviceText += ` The trailing P/E of **${peRatio}** is low, suggesting the stock may be undervalued or defensive in nature relative to its earnings.`;
    }
  }

  const currencySymbol = currency === 'INR' ? '₹' : (currency === 'USD' ? '$' : currency + ' ');

  return `### **Live Analysis: ${companyName} (${symbol})**
Here is the real-time financial telemetry for **${symbol}** trading on the **Yahoo Finance** indexes:

| Metric | Value |
| :--- | :--- |
| **Current Price** | **${currencySymbol}${price}** |
| **Market Capitalization** | ${marketCap} |
| **Trailing P/E Ratio** | ${peRatio} |
| **Trading Volume** | ${volume} |
| **52-Week Range** | ${currencySymbol}${low52} – ${currencySymbol}${high52} |

**Technical Signal**: \`${signal}\`
* **Price Position**: The stock is currently trading at **${positionPct.toFixed(0)}%** of its 52-week range.
* **Investment Outlook**: ${adviceText}

*Note: All stock data is fetched live and updated in real-time. Make sure to combine this analysis with the company's latest quarterly reports and macroeconomic factors before making investment decisions.*`;
}

function formatCompactNumber(number) {
  if (isNaN(number)) return number;
  const num = parseFloat(number);
  if (num >= 1.0e9) return (num / 1.0e9).toFixed(2) + 'B';
  if (num >= 1.0e6) return (num / 1.0e6).toFixed(2) + 'M';
  if (num >= 1.0e3) return (num / 1.0e3).toFixed(2) + 'K';
  return num.toString();
}



function setupImport() {
  importProgress.querySelector('span').style.width = '0%';
}

function handleDragOver(event) {
  event.preventDefault();
  dropZone.classList.add('dragover');
}

function handleDrop(event) {
  event.preventDefault();
  dropZone.classList.remove('dragover');
  const file = event.dataTransfer.files[0];
  if (file) {
    processFile(file);
  }
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    processFile(file);
  }
}

function processFile(file) {
  importStatus.textContent = `Importing ${file.name}...`;
  let progress = 0;
  const progressFill = importProgress.querySelector('span');
  const interval = setInterval(() => {
    progress += 12;
    progressFill.style.width = `${Math.min(progress, 100)}%`;
    if (progress >= 100) {
      clearInterval(interval);
      importStatus.textContent = 'Import completed successfully. Your dashboard has been updated.';
    }
  }, 230);
}

function initCharts() {
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js is not loaded. Skipping chart initialization.');
    document.querySelectorAll('.chart-card').forEach(card => {
      const canvas = card.querySelector('canvas');
      if (canvas) {
        canvas.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'chart-fallback';
        fallback.style.display = 'flex';
        fallback.style.alignItems = 'center';
        fallback.style.justifyContent = 'center';
        fallback.style.height = '180px';
        fallback.style.color = 'var(--subtext)';
        fallback.style.fontSize = '0.9rem';
        fallback.style.border = '1px dashed var(--border)';
        fallback.style.borderRadius = '14px';
        fallback.style.background = 'var(--surface-muted)';
        fallback.textContent = 'Chart visualization offline';
        card.appendChild(fallback);
      }
    });
    return;
  }
  const expenseDoughnut = document.getElementById('expenseDoughnut').getContext('2d');
  charts.expenseDoughnut = new Chart(expenseDoughnut, {
    type: 'doughnut',
    data: {
      labels: ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Entertainment'],
      datasets: [{
        data: [18, 12, 24, 20, 10, 16],
        backgroundColor: ['#38bdf8', '#34d399', '#4f46e5', '#818cf8', '#fbbf24', '#fb7185'],
        borderWidth: 0,
        cutout: '78%',
        spacing: 4,
        borderRadius: 8,
        hoverOffset: 8
      }],
    },
    options: {
      animation: false,
      onHover: (event, activeElements) => {
        const centerLabel = document.querySelector('.doughnut-center-label');
        const centerValue = document.querySelector('.doughnut-center-value');
        if (!centerLabel || !centerValue) return;

        if (activeElements && activeElements.length > 0) {
          const index = activeElements[0].index;
          const label = charts.expenseDoughnut.data.labels[index];
          const val = charts.expenseDoughnut.data.datasets[0].data[index];
          const calculatedAmount = (val / 100) * 10520;
          
          centerLabel.textContent = label;
          centerValue.textContent = `₹${Math.round(calculatedAmount).toLocaleString('en-US')}`;
          centerLabel.style.color = charts.expenseDoughnut.data.datasets[0].backgroundColor[index];
        } else {
          centerLabel.textContent = 'Total Spent';
          centerValue.textContent = '₹10,520';
          centerLabel.style.color = 'var(--subtext)';
        }
      },
      plugins: { 
        tooltip: {
          enabled: false // Disable the default overlapping tooltip popup box
        },
        legend: { 
          position: 'bottom', 
          labels: { 
            color: 'var(--subtext)',
            usePointStyle: true,
            pointStyle: 'circle',
            font: {
              family: "'Inter', sans-serif",
              size: 12,
              weight: '500'
            },
            padding: 16
          } 
        } 
      },
    },
  });

  const expenseBar = document.getElementById('expenseBar').getContext('2d');
  const barGradient = expenseBar.createLinearGradient(0, 0, 0, 260);
  barGradient.addColorStop(0, '#0284c7');
  barGradient.addColorStop(1, 'rgba(2, 132, 199, 0.1)');

  charts.expenseBar = new Chart(expenseBar, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Expenses',
        data: [4800, 5200, 5000, 4700, 5120, 5280],
        backgroundColor: barGradient,
        hoverBackgroundColor: '#0284c7',
        borderRadius: 8,
        maxBarThickness: 24,
      }],
    },
    options: {
      animation: false,
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { 
          grid: { display: false }, 
          ticks: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 11 }
          } 
        },
        y: { 
          grid: { color: 'rgba(163, 179, 207, 0.08)', drawBorder: false }, 
          ticks: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 11 }
          } 
        },
      },
    },
  });

  const incomeLine = document.getElementById('incomeLine').getContext('2d');
  const incomeGrad = incomeLine.createLinearGradient(0, 0, 0, 250);
  incomeGrad.addColorStop(0, 'rgba(14, 165, 233, 0.25)');
  incomeGrad.addColorStop(1, 'rgba(14, 165, 233, 0.00)');

  const expenseGrad = incomeLine.createLinearGradient(0, 0, 0, 250);
  expenseGrad.addColorStop(0, 'rgba(2, 132, 199, 0.20)');
  expenseGrad.addColorStop(1, 'rgba(2, 132, 199, 0.00)');

  charts.incomeLine = new Chart(incomeLine, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Income',
          data: [8200, 9000, 8800, 9300, 9500, 9800],
          borderColor: '#0ea5e9',
          borderWidth: 3,
          backgroundColor: incomeGrad,
          tension: 0.38,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#0ea5e9',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
        },
        {
          label: 'Expense',
          data: [5600, 5900, 5800, 5400, 5700, 6100],
          borderColor: '#0284c7',
          borderWidth: 3,
          backgroundColor: expenseGrad,
          tension: 0.38,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#0284c7',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
        },
      ],
    },
    options: {
      animation: false,
      plugins: { 
        legend: { 
          labels: { 
            color: 'var(--subtext)',
            usePointStyle: true,
            pointStyle: 'circle',
            font: { family: "'Inter', sans-serif", size: 12, weight: '500' }
          } 
        } 
      },
      scales: {
        x: { 
          ticks: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 11 }
          }, 
          grid: { display: false } 
        },
        y: { 
          ticks: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 11 }
          }, 
          grid: { color: 'rgba(163, 179, 207, 0.08)' } 
        },
      },
    },
  });

  const savingsArea = document.getElementById('savingsArea').getContext('2d');
  const savingsGrad = savingsArea.createLinearGradient(0, 0, 0, 250);
  savingsGrad.addColorStop(0, 'rgba(2, 132, 199, 0.25)');
  savingsGrad.addColorStop(1, 'rgba(2, 132, 199, 0.00)');

  charts.savingsArea = new Chart(savingsArea, {
    type: 'line',
    data: {
      labels: ['2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2'],
      datasets: [{
        label: 'Savings Growth',
        data: [12000, 14600, 17150, 19900, 23020, 25640],
        borderColor: '#0284c7',
        borderWidth: 3,
        backgroundColor: savingsGrad,
        fill: true,
        tension: 0.38,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#0284c7',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      }],
    },
    options: {
      animation: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { 
          ticks: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 11 }
          }, 
          grid: { display: false } 
        },
        y: { 
          ticks: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 11 }
          }, 
          grid: { color: 'rgba(163, 179, 207, 0.08)' } 
        },
      },
    },
  });

  const portfolioRadar = document.getElementById('portfolioRadar').getContext('2d');
  charts.portfolioRadar = new Chart(portfolioRadar, {
    type: 'radar',
    data: {
      labels: ['Growth', 'Stability', 'Liquidity', 'Diversification', 'Risk', 'Returns'],
      datasets: [{
        label: 'Portfolio Metrics',
        data: [82, 72, 68, 74, 60, 80],
        backgroundColor: 'rgba(14, 165, 233, 0.15)',
        borderColor: '#0ea5e9',
        borderWidth: 2.5,
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4.5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#0ea5e9',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2.5,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        r: { 
          grid: { 
            circular: true,
            color: 'rgba(163, 179, 207, 0.12)' 
          }, 
          angleLines: { color: 'rgba(163, 179, 207, 0.12)' }, 
          suggestedMin: 0,
          suggestedMax: 100,
          pointLabels: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 12, weight: '600' }
          }, 
          ticks: { display: false } 
        },
      },
      plugins: { 
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleFont: { family: "'Inter', sans-serif", size: 13, weight: '600' },
          bodyFont: { family: "'Inter', sans-serif", size: 12 },
          padding: 10,
          cornerRadius: 12,
          displayColors: false
        }
      },
    },
  });

  const stockChart = document.getElementById('stockChart').getContext('2d');
  const stockGrad = stockChart.createLinearGradient(0, 0, 0, 200);
  stockGrad.addColorStop(0, 'rgba(2, 132, 199, 0.22)');
  stockGrad.addColorStop(1, 'rgba(2, 132, 199, 0.00)');

  charts.stockChart = new Chart(stockChart, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Price',
        data: state.stockData.chart,
        borderColor: '#0284c7',
        borderWidth: 3,
        backgroundColor: stockGrad,
        tension: 0.38,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#0284c7',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      }],
    },
    options: {
      animation: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { 
          ticks: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 10 }
          }, 
          grid: { display: false } 
        },
        y: { 
          ticks: { 
            color: 'var(--subtext)',
            font: { family: "'Inter', sans-serif", size: 10 }
          }, 
          grid: { color: 'rgba(163, 179, 207, 0.08)' } 
        },
      },
    },
  });
}

function updateStockChart() {
  if (charts.stockChart) {
    charts.stockChart.data.datasets[0].data = state.stockData.chart;
    charts.stockChart.resize();
    charts.stockChart.update();
  }
}

// Budget Modal Functions
function openBudgetModal() {
  const modal = document.getElementById('budgetModal');
  const errorDiv = document.getElementById('budgetFormError');
  if (!modal) return;
  
  // Reset form and errors
  document.getElementById('budgetForm').reset();
  if (errorDiv) {
    errorDiv.hidden = true;
    errorDiv.textContent = '';
  }
  modal.hidden = false;
}

function closeBudgetModal() {
  const modal = document.getElementById('budgetModal');
  if (modal) modal.hidden = true;
}

function handleCreateBudget(event) {
  event.preventDefault();
  const nameInput = document.getElementById('budgetName');
  const limitInput = document.getElementById('budgetLimit');
  const spentInput = document.getElementById('budgetSpent');
  
  if (!nameInput || !limitInput || !spentInput) return;
  
  const label = nameInput.value.trim();
  const limit = parseFloat(limitInput.value);
  const spent = parseFloat(spentInput.value) || 0;
  
  // Validation
  if (!label) {
    showBudgetError('Category name is required.');
    return;
  }
  if (isNaN(limit) || limit <= 0) {
    showBudgetError('Budget limit must be a positive number.');
    return;
  }
  if (isNaN(spent) || spent < 0) {
    showBudgetError('Spent amount cannot be negative.');
    return;
  }
  
  // Check if duplicate category label exists
  const exists = state.budgets.some(b => b.label.toLowerCase() === label.toLowerCase());
  if (exists) {
    showBudgetError(`A budget for "${label}" already exists.`);
    return;
  }
  
  const remaining = Math.max(0, limit - spent);
  
  // Derive status based on spending ratio
  let status = 'On track';
  const ratio = spent / limit;
  if (ratio > 1.0) {
    status = 'Over budget';
  } else if (ratio > 0.85) {
    status = 'Review';
  } else if (ratio > 0.5) {
    status = 'Caution';
  } else {
    status = 'Healthy';
  }
  
  // Add to state
  state.budgets.push({ label, limit, spent, remaining, status });
  
  // Persist in localStorage
  localStorage.setItem('finsightBudgets', JSON.stringify(state.budgets));
  
  // Re-render
  renderBudgetCards();
  
  // Add notification
  state.notificationsList.push({
    id: Date.now(),
    text: `New budget category "${label}" created.`,
    time: 'now',
    read: false
  });
  updateNotificationBadge();
  renderNotificationsPanel();
  
  // Close modal
  closeBudgetModal();
}

function showBudgetError(msg) {
  const errorDiv = document.getElementById('budgetFormError');
  if (errorDiv) {
    errorDiv.textContent = msg;
    errorDiv.hidden = false;
  }
}

function openEditTransactionModal(id) {
  const transaction = state.transactions.find(t => t.id === id);
  if (!transaction) return;

  const modal = document.getElementById('transactionModal');
  const errorDiv = document.getElementById('transactionFormError');
  if (!modal) return;

  // Populate inputs
  document.getElementById('transactionEditId').value = transaction.id;
  document.getElementById('transactionDateInput').value = transaction.date;
  document.getElementById('transactionDescriptionInput').value = transaction.description;
  document.getElementById('transactionCategoryInput').value = transaction.category;
  document.getElementById('transactionAmountInput').value = transaction.amount;
  document.getElementById('transactionTypeInput').value = transaction.type;
  document.getElementById('transactionStatusInput').value = transaction.status;

  if (errorDiv) {
    errorDiv.hidden = true;
    errorDiv.textContent = '';
  }
  modal.hidden = false;
}

function closeTransactionModal() {
  const modal = document.getElementById('transactionModal');
  if (modal) modal.hidden = true;
}

function handleEditTransactionSubmit(event) {
  event.preventDefault();

  const idInput = document.getElementById('transactionEditId');
  const dateInput = document.getElementById('transactionDateInput');
  const descInput = document.getElementById('transactionDescriptionInput');
  const catInput = document.getElementById('transactionCategoryInput');
  const amountInput = document.getElementById('transactionAmountInput');
  const typeInput = document.getElementById('transactionTypeInput');
  const statusInput = document.getElementById('transactionStatusInput');

  if (!idInput || !dateInput || !descInput || !catInput || !amountInput || !typeInput || !statusInput) return;

  const id = Number(idInput.value);
  const date = dateInput.value;
  const description = descInput.value.trim();
  const category = catInput.value;
  const amountStr = amountInput.value.trim();
  const type = typeInput.value;
  const status = statusInput.value;

  if (!description) {
    showTransactionError('Description is required.');
    return;
  }

  const formattedAmount = formatAmount(amountStr, type);
  if (!formattedAmount) {
    showTransactionError('Amount must be a valid number (e.g. -₹84.20 or 84.20).');
    return;
  }

  const index = state.transactions.findIndex(t => t.id === id);
  if (index === -1) {
    showTransactionError('Transaction not found.');
    return;
  }

  // Update transaction
  state.transactions[index] = {
    id,
    date,
    description,
    category,
    amount: formattedAmount,
    type,
    status
  };

  // Persist in localStorage
  localStorage.setItem('finsightTransactions', JSON.stringify(state.transactions));

  // Re-render
  updateTransactionListing();

  // Add notification
  state.notificationsList.push({
    id: Date.now(),
    text: `Transaction "${description}" updated.`,
    time: 'now',
    read: false
  });
  updateNotificationBadge();
  renderNotificationsPanel();

  // Close modal
  closeTransactionModal();
}

function formatAmount(amountStr, type) {
  let clean = amountStr.replace(/[\s₹,]/g, '');
  let isNegative = clean.startsWith('-');
  let isPositive = clean.startsWith('+');
  let valStr = clean;
  if (isNegative || isPositive) {
    valStr = clean.slice(1);
  }
  let val = parseFloat(valStr);
  if (isNaN(val)) return null;

  let formattedVal = val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (isNegative) {
    return `-₹${formattedVal}`;
  } else if (isPositive) {
    return `+₹${formattedVal}`;
  } else {
    // Default sign based on type if not explicitly provided
    return type === 'Expense' ? `-₹${formattedVal}` : `+₹${formattedVal}`;
  }
}

function showTransactionError(msg) {
  const errorDiv = document.getElementById('transactionFormError');
  if (errorDiv) {
    errorDiv.textContent = msg;
    errorDiv.hidden = false;
  }
}

function deleteTransaction(id) {
  const transaction = state.transactions.find(t => t.id === id);
  const desc = transaction ? transaction.description : '';
  if (confirm(`Are you sure you want to delete the transaction "${desc}"?`)) {
    state.transactions = state.transactions.filter(t => t.id !== id);
    localStorage.setItem('finsightTransactions', JSON.stringify(state.transactions));
    updateTransactionListing();

    // Add notification
    state.notificationsList.push({
      id: Date.now(),
      text: `Transaction "${desc}" deleted.`,
      time: 'now',
      read: false
    });
    updateNotificationBadge();
    renderNotificationsPanel();
  }
}

function exportTransactionsToCSV() {
  if (!state.transactions || state.transactions.length === 0) {
    alert('No transactions to export.');
    return;
  }

  // Create CSV header
  const headers = ['ID', 'Date', 'Description', 'Category', 'Amount', 'Type', 'Status'];
  const csvRows = [];
  csvRows.push(headers.join(','));

  // Create CSV rows
  state.transactions.forEach(t => {
    // Wrap strings in quotes to handle commas
    const row = [
      t.id,
      `"${t.date}"`,
      `"${t.description.replace(/"/g, '""')}"`,
      `"${t.category}"`,
      `"${t.amount}"`,
      `"${t.type}"`,
      `"${t.status}"`
    ];
    csvRows.push(row.join(','));
  });

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'financial_report_dummy.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Also show a toast since webviews might intercept/block silent downloads
  if (typeof showToast === 'function') {
    showToast('Report generated and downloaded successfully.', 'success');
  }
}

function renderSavingsCards() {
  if (!savingsGrid) return;

  // 1. Filter savings list
  let filtered = [...state.savings];
  if (state.savingsFilter !== 'all') {
    if (state.savingsFilter === 'low-secure') {
      filtered = filtered.filter(item => item.riskLevel === 'low' || item.riskLevel === 'secure');
    } else if (state.savingsFilter === 'balanced-moderate') {
      filtered = filtered.filter(item => item.riskLevel === 'balanced' || item.riskLevel === 'moderate');
    } else if (state.savingsFilter === 'high') {
      filtered = filtered.filter(item => item.riskLevel === 'high');
    }
  }

  // 2. Sort savings list
  if (state.savingsSort === 'balance-desc') {
    filtered.sort((a, b) => b.balance - a.balance);
  } else if (state.savingsSort === 'balance-asc') {
    filtered.sort((a, b) => a.balance - b.balance);
  } else if (state.savingsSort === 'return-desc') {
    filtered.sort((a, b) => b.returnRate - a.returnRate);
  } else if (state.savingsSort === 'progress-desc') {
    filtered.sort((a, b) => b.progress - a.progress);
  }

  // 3. Compute stats
  const total = state.savings.reduce((sum, item) => sum + item.balance, 0);
  const weightedReturnSum = state.savings.reduce((sum, item) => sum + (item.balance * item.returnRate), 0);
  const avgReturn = total > 0 ? (weightedReturnSum / total) : 0;
  const count = state.savings.length;

  // Update DOM stats elements
  if (savingsTotalBalance) {
    savingsTotalBalance.textContent = `₹${total.toLocaleString('en-US')}`;
  }
  if (savingsAvgReturn) {
    savingsAvgReturn.textContent = `${avgReturn.toFixed(1)}%`;
  }
  if (savingsGoalCount) {
    savingsGoalCount.textContent = count;
  }

  // 4. Render cards
  const icons = {
    'shield': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    'pie-chart': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>`,
    'clock': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    'trending-up': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
    'shield-check': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 11l2 2 4-4"/></svg>`
  };

  if (filtered.length === 0) {
    savingsGrid.innerHTML = `<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--subtext);">No savings goals match the active filter.</div>`;
    return;
  }

  savingsGrid.innerHTML = filtered.map(item => {
    return `
      <article class="savings-card glass-card card-${item.riskLevel}">
        <div class="savings-card-header">
          <div class="savings-icon-container">
            ${icons[item.icon] || icons['shield']}
          </div>
          <div class="savings-title-info">
            <span class="savings-category">${item.name}</span>
            <span class="savings-badge badge-${item.riskLevel}">${item.risk}</span>
          </div>
        </div>
        <div class="savings-balance-section">
          <span class="savings-balance-label">Balance</span>
          <strong class="savings-balance">₹${item.balance.toLocaleString('en-US')}</strong>
        </div>
        <div class="savings-progress-section">
          <div class="savings-progress-meta">
            <span>Allocation Progress</span>
            <strong>${item.progress}%</strong>
          </div>
          <div class="savings-progress-bar">
            <span style="width: ${item.progress}%" class="progress-${item.riskLevel}"></span>
          </div>
        </div>
        <div class="savings-card-footer">
          <span class="savings-purpose">${item.purpose}</span>
          <span class="savings-return"><span class="arrow-up">↑</span> ${item.returnRate}% Return</span>
        </div>
      </article>
    `;
  }).join('');
}

function initializeSavings() {
  // Bind sort selector
  if (savingsSortSelect) {
    savingsSortSelect.addEventListener('change', (e) => {
      state.savingsSort = e.target.value;
      renderSavingsCards();
    });
  }

  // Bind filters
  const filterContainer = document.getElementById('savingsFilterControls');
  if (filterContainer) {
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn) return;

      // Update active class
      filterContainer.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      state.savingsFilter = btn.dataset.filter;
      renderSavingsCards();
    });
  }

  // Initial render
  renderSavingsCards();
}

function openMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.add('open');
  if (menuOverlay) menuOverlay.removeAttribute('hidden');
}

function closeMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.remove('open');
  if (menuOverlay) menuOverlay.setAttribute('hidden', '');
}

let suggestionDebounceTimeout = null;
let activeSuggestionIndex = -1;
let currentSuggestions = [];

function setupStockSuggestions() {
  const stockSuggestions = document.getElementById('stockSuggestions');
  if (!stockSuggestions || !stockSearchInput) return;

  // Listen to input events on the search bar
  stockSearchInput.addEventListener('input', () => {
    clearTimeout(suggestionDebounceTimeout);
    const query = stockSearchInput.value.trim();
    if (!query) {
      stockSuggestions.hidden = true;
      currentSuggestions = [];
      activeSuggestionIndex = -1;
      return;
    }

    suggestionDebounceTimeout = setTimeout(async () => {
      try {
        const apiBase = window.location.protocol === 'file:' ? 'http://localhost:3000' : '';
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        let data = [];

        if (isLocal || window.location.protocol === 'file:') {
          try {
            const response = await fetch(`${apiBase}/api/search?q=${encodeURIComponent(query)}`);
            if (response.ok) {
              data = await response.json();
            } else {
              throw new Error('Local search API failed');
            }
          } catch (localErr) {
            console.warn("Local search failed, falling back to client proxy:", localErr);
            data = await fetchSearchSuggestionsFallback(query);
          }
        } else {
          data = await fetchSearchSuggestionsFallback(query);
        }

        currentSuggestions = data;
        activeSuggestionIndex = -1;
        renderSuggestions(data);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 200); // 200ms debounce
  });

  // Handle keyboard navigation inside the input
  stockSearchInput.addEventListener('keydown', (event) => {
    if (stockSuggestions.hidden || currentSuggestions.length === 0) {
      if (event.key === 'Enter') {
        handleStockSearch();
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex + 1) % currentSuggestions.length;
      updateActiveSuggestion();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex - 1 + currentSuggestions.length) % currentSuggestions.length;
      updateActiveSuggestion();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (activeSuggestionIndex >= 0 && activeSuggestionIndex < currentSuggestions.length) {
        selectSuggestion(currentSuggestions[activeSuggestionIndex]);
      } else {
        handleStockSearch();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      stockSuggestions.hidden = true;
      activeSuggestionIndex = -1;
    }
  });

  // Hide suggestions when clicking outside
  document.addEventListener('click', (event) => {
    if (!stockSearchInput.contains(event.target) && !stockSuggestions.contains(event.target)) {
      stockSuggestions.hidden = true;
      activeSuggestionIndex = -1;
    }
  });

  // Show suggestions when clicking back into input if it has content
  stockSearchInput.addEventListener('focus', () => {
    if (stockSearchInput.value.trim() && currentSuggestions.length > 0) {
      stockSuggestions.hidden = false;
    }
  });
}

async function fetchSearchSuggestionsFallback(query) {
  try {
    const searchUrl = `https://query2.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(searchUrl)}`;
    const res = await fetch(proxyUrl);
    if (!res.ok) return [];
    const wrapper = await res.json();
    const parsed = JSON.parse(wrapper.contents);
    const suggestions = [];
    let count = 0;
    for (const quote of parsed.quotes || []) {
      if (count >= 6) break;
      const symbol = quote.symbol;
      const name = quote.longname || quote.shortname || symbol;
      const exch = quote.exchange;
      const quoteType = quote.quoteType;
      if (symbol && (quoteType === 'EQUITY' || quoteType === 'ETF')) {
        suggestions.push({ symbol, name, exchange: exch });
        count++;
      }
    }
    return suggestions;
  } catch (err) {
    console.error("Fallback search failed:", err);
    return [];
  }
}

function renderSuggestions(suggestions) {
  const stockSuggestions = document.getElementById('stockSuggestions');
  if (!stockSuggestions) return;

  stockSuggestions.innerHTML = '';
  if (suggestions.length === 0) {
    stockSuggestions.hidden = true;
    return;
  }

  suggestions.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'stock-suggestion-item';
    div.dataset.index = index;
    div.innerHTML = `
      <span class="stock-suggestion-ticker">${item.symbol}</span>
      <span class="stock-suggestion-name">${item.name}</span>
      <span class="stock-suggestion-exchange">${item.exchange}</span>
    `;
    div.addEventListener('click', () => {
      selectSuggestion(item);
    });
    stockSuggestions.appendChild(div);
  });

  stockSuggestions.hidden = false;
}

function updateActiveSuggestion() {
  const stockSuggestions = document.getElementById('stockSuggestions');
  if (!stockSuggestions) return;

  const items = stockSuggestions.querySelectorAll('.stock-suggestion-item');
  items.forEach((item, idx) => {
    if (idx === activeSuggestionIndex) {
      item.classList.add('active');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('active');
    }
  });
}

function selectSuggestion(item) {
  if (!stockSearchInput) return;
  stockSearchInput.value = item.symbol;
  const stockSuggestions = document.getElementById('stockSuggestions');
  if (stockSuggestions) {
    stockSuggestions.hidden = true;
  }
  currentSuggestions = [];
  activeSuggestionIndex = -1;
  handleStockSearch();
}

function initializeProfile() {
  // Load profile values from localStorage if they exist
  const savedProfile = localStorage.getItem('finsightUserProfile');
  if (savedProfile) {
    try {
      const parsed = JSON.parse(savedProfile);
      state.profile = { ...state.profile, ...parsed };
    } catch (e) {
      console.error('Error parsing saved profile:', e);
    }
  }

  // Populate fields in DOM
  updateProfileDOM();

  // Bind edit events for profile picture (avatar)
  const avatarEditBtn = document.getElementById('avatarEditBtn');
  const profileAvatarInput = document.getElementById('profileAvatarInput');
  const profileMainAvatar = document.getElementById('profileMainAvatar');

  if (avatarEditBtn && profileAvatarInput) {
    // When clicking the edit badge, open the file picker
    avatarEditBtn.addEventListener('click', () => {
      profileAvatarInput.click();
    });
  }
  
  if (profileMainAvatar && profileAvatarInput) {
    // Alternatively, let them click the picture itself
    profileMainAvatar.style.cursor = 'pointer';
    profileMainAvatar.addEventListener('click', () => {
      profileAvatarInput.click();
    });
  }

  if (profileAvatarInput) {
    profileAvatarInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (!file) return;

      // Limit file size to 2MB to keep it safe for localStorage
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image file must be less than 2MB', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result;
        state.profile.avatar = base64Data;
        saveProfile();
        updateProfileDOM();
        showToast('Profile picture updated successfully!', 'success');
      };
      reader.readAsDataURL(file);
    });
  }

  // Bind edit events for user name
  const nameEditBtn = document.getElementById('nameEditBtn');
  const profileMainName = document.getElementById('profileMainName');

  if (nameEditBtn && profileMainName) {
    nameEditBtn.addEventListener('click', () => {
      startNameEdit();
    });
    
    profileMainName.style.cursor = 'pointer';
    profileMainName.addEventListener('click', () => {
      startNameEdit();
    });
  }

  // Bind edit events for email and phone number
  const profileMainEmail = document.getElementById('profileMainEmail');
  const profileMainPhone = document.getElementById('profileMainPhone');

  if (profileMainEmail) {
    profileMainEmail.addEventListener('click', () => {
      startContactEdit('email');
    });
  }
  if (profileMainPhone) {
    profileMainPhone.addEventListener('click', () => {
      startContactEdit('phone');
    });
  }
}

function updateProfileDOM() {
  const profileHeaderAvatar = document.getElementById('profileHeaderAvatar');
  const profileHeaderName = document.getElementById('profileHeaderName');
  const profileMainAvatar = document.getElementById('profileMainAvatar');
  const profileMainName = document.getElementById('profileMainName');
  const profileMainEmail = document.getElementById('profileMainEmail');
  const profileMainPhone = document.getElementById('profileMainPhone');

  if (profileHeaderAvatar) profileHeaderAvatar.src = state.profile.avatar;
  if (profileMainAvatar) profileMainAvatar.src = state.profile.avatar;
  if (profileHeaderName) profileHeaderName.textContent = state.profile.name;
  if (profileMainName) profileMainName.textContent = state.profile.name;
  if (profileMainEmail) profileMainEmail.textContent = state.profile.email;
  if (profileMainPhone) profileMainPhone.textContent = state.profile.phone;
}

function saveProfile() {
  localStorage.setItem('finsightUserProfile', JSON.stringify(state.profile));
}

function startNameEdit() {
  const profileMainName = document.getElementById('profileMainName');
  if (!profileMainName) return;

  // Prevent multiple inputs if already editing
  if (profileMainName.tagName.toLowerCase() === 'input') return;

  const currentName = profileMainName.textContent.trim();
  const parent = profileMainName.parentNode;

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'profile-name-edit-input';
  input.value = currentName;
  input.maxLength = 40;

  // Swap h2 with input
  parent.replaceChild(input, profileMainName);
  input.focus();
  input.select();

  // Save on Enter or Blur
  let saved = false;
  const finishEdit = () => {
    if (saved) return;
    saved = true;

    const newName = input.value.trim() || currentName;
    state.profile.name = newName;
    saveProfile();

    const h2 = document.createElement('h2');
    h2.id = 'profileMainName';
    h2.textContent = newName;
    h2.style.cursor = 'pointer';
    h2.addEventListener('click', () => startNameEdit());

    parent.replaceChild(h2, input);
    updateProfileDOM();

    if (newName !== currentName) {
      showToast('Name updated successfully!', 'success');
      // If AI Advisor was opened, renderChat to update the chat names immediately
      renderChat();
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      finishEdit();
    } else if (e.key === 'Escape') {
      input.value = currentName; // revert
      finishEdit();
    }
  });

  input.addEventListener('blur', finishEdit);
}

function startContactEdit(type) {
  const elementId = type === 'email' ? 'profileMainEmail' : 'profileMainPhone';
  const element = document.getElementById(elementId);
  if (!element) return;

  if (element.tagName.toLowerCase() === 'input') return;

  const currentValue = element.textContent.trim();
  const parent = element.parentNode;

  const input = document.createElement('input');
  input.type = type === 'email' ? 'email' : 'text';
  input.className = 'profile-contact-edit-input';
  input.value = currentValue;
  input.maxLength = 50;

  parent.replaceChild(input, element);
  input.focus();
  input.select();

  let saved = false;
  const finishEdit = () => {
    if (saved) return;
    saved = true;

    const newValue = input.value.trim() || currentValue;
    
    // Simple email validation
    if (type === 'email' && newValue !== currentValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newValue)) {
        showToast('Please enter a valid email address', 'error');
        // Revert back
        const span = document.createElement('span');
        span.id = elementId;
        span.textContent = currentValue;
        span.style.cursor = 'pointer';
        span.addEventListener('click', () => startContactEdit(type));
        parent.replaceChild(span, input);
        return;
      }
    }

    state.profile[type] = newValue;
    saveProfile();

    const span = document.createElement('span');
    span.id = elementId;
    span.textContent = newValue;
    span.style.cursor = 'pointer';
    span.addEventListener('click', () => startContactEdit(type));

    parent.replaceChild(span, input);
    updateProfileDOM();

    if (newValue !== currentValue) {
      showToast(`${type.charAt(0).toUpperCase() + type.slice(1)} updated successfully!`, 'success');
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      finishEdit();
    } else if (e.key === 'Escape') {
      input.value = currentValue; // revert
      finishEdit();
    }
  });

  input.addEventListener('blur', finishEdit);
}

function openPaymentModal() {
  closeAllDropdowns();
  
  const paymentModal = document.getElementById('paymentModal');
  const paymentForm = document.getElementById('paymentForm');
  const paymentSuccessContainer = document.getElementById('paymentSuccessContainer');
  
  if (!paymentModal) return;
  
  // Populate stock details in the modal
  document.getElementById('paymentCompanyName').textContent = state.stockData.company;
  document.getElementById('paymentTicker').textContent = state.stockData.ticker;
  
  const priceStr = state.stockData.price;
  const match = priceStr.match(/^([^\d\s\-\+,]+)?\s*([\d\.,]+)/);
  let symbol = '$';
  let price = 0;
  if (match) {
    symbol = match[1] || '$';
    price = parseFloat(match[2].replace(/,/g, ''));
  }
  
  document.getElementById('paymentPrice').textContent = priceStr;
  document.getElementById('paymentShares').value = 1;
  
  // Store currency and price on the form dataset
  paymentForm.dataset.symbol = symbol;
  paymentForm.dataset.price = price;
  
  // Reset visibility
  paymentForm.hidden = false;
  paymentSuccessContainer.hidden = true;
  
  // Update calculations
  updatePaymentTotal();
  
  // Show modal
  paymentModal.hidden = false;
  document.body.classList.add('menu-open');
}

function closePaymentModal() {
  const paymentModal = document.getElementById('paymentModal');
  if (paymentModal) {
    paymentModal.hidden = true;
    document.body.classList.remove('menu-open');
  }
}

function updatePaymentTotal() {
  const paymentForm = document.getElementById('paymentForm');
  if (!paymentForm) return;
  
  const symbol = paymentForm.dataset.symbol || '$';
  const price = parseFloat(paymentForm.dataset.price) || 0;
  const shares = parseInt(document.getElementById('paymentShares').value) || 0;
  
  const sharesCost = price * shares;
  
  let brokerage = 1.50;
  let tax = Math.max(0.10, sharesCost * 0.0005);
  
  if (symbol === '₹') {
    brokerage = 120.00;
    tax = Math.max(10.00, sharesCost * 0.0005);
  } else if (symbol === '£') {
    brokerage = 1.20;
    tax = Math.max(0.10, sharesCost * 0.0005);
  } else if (symbol === '€') {
    brokerage = 1.40;
    tax = Math.max(0.10, sharesCost * 0.0005);
  }
  
  const total = sharesCost + brokerage + tax;
  
  document.getElementById('sharesCost').textContent = `${symbol}${sharesCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById('brokerageFee').textContent = `${symbol}${brokerage.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById('regulatoryTax').textContent = `${symbol}${tax.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById('totalPayable').textContent = `${symbol}${total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

async function handlePaymentSubmit(event) {
  event.preventDefault();
  
  const paymentForm = document.getElementById('paymentForm');
  const confirmBtn = document.getElementById('confirmPaymentBtn');
  const cancelBtn = document.getElementById('cancelPaymentBtn');
  const closeBtn = document.getElementById('closePaymentModalBtn');
  const paymentSuccessContainer = document.getElementById('paymentSuccessContainer');
  const sharesInput = document.getElementById('paymentShares');
  
  if (!paymentForm || !confirmBtn) return;
  
  const shares = parseInt(sharesInput.value) || 1;
  const ticker = state.stockData.ticker;
  const symbol = paymentForm.dataset.symbol || '$';
  const price = parseFloat(paymentForm.dataset.price) || 0;
  const totalCost = (price * shares);
  
  const originalText = confirmBtn.textContent;
  confirmBtn.textContent = 'Processing...';
  confirmBtn.disabled = true;
  cancelBtn.disabled = true;
  closeBtn.disabled = true;
  sharesInput.disabled = true;
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  paymentForm.hidden = true;
  paymentSuccessContainer.hidden = false;
  
  const successMessage = document.getElementById('successMessage');
  successMessage.textContent = `Bought ${shares} share${shares > 1 ? 's' : ''} of ${ticker} for a total value of ${symbol}${totalCost.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} successfully.`;
  
  let totalCostINR = totalCost;
  if (symbol === '$') {
    totalCostINR = totalCost * 83.30;
  } else if (symbol === '£') {
    totalCostINR = totalCost * 105.50;
  } else if (symbol === '€') {
    totalCostINR = totalCost * 89.20;
  }
  
  const dateStr = new Date().toISOString().split('T')[0];
  const newTx = {
    date: dateStr,
    description: `Bought ${shares} ${ticker} shares`,
    category: 'Investment',
    amount: `-₹${totalCostINR.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
    type: 'Expense',
    status: 'Completed'
  };
  
  state.transactions.unshift(newTx);
  
  localStorage.setItem('finsightTransactions', JSON.stringify(state.transactions));
  
  if (typeof updateTransactionListing === 'function') {
    updateTransactionListing();
  }
  
  confirmBtn.textContent = originalText;
  confirmBtn.disabled = false;
  cancelBtn.disabled = false;
  closeBtn.disabled = false;
  sharesInput.disabled = false;
  
  showToast(`Successfully purchased ${shares} shares of ${ticker}!`, 'success');
}

init();
