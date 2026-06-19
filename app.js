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
    { date: '2026-06-10', description: 'Coffee subscription', category: 'Bills', amount: '-$24.99', type: 'Expense', status: 'Completed' },
    { date: '2026-06-10', description: 'Grocery market', category: 'Food', amount: '-$84.20', type: 'Expense', status: 'Completed' },
    { date: '2026-06-09', description: 'Monthly salary', category: 'Investment', amount: '+$5,200.00', type: 'Income', status: 'Completed' },
    { date: '2026-06-08', description: 'Gym membership', category: 'Health', amount: '-$54.00', type: 'Expense', status: 'Pending' },
    { date: '2026-06-07', description: 'Ride share', category: 'Transport', amount: '-$18.40', type: 'Expense', status: 'Completed' },
    { date: '2026-06-06', description: 'Weekend dining', category: 'Entertainment', amount: '-$120.30', type: 'Expense', status: 'Completed' },
    { date: '2026-06-05', description: 'Book purchase', category: 'Education', amount: '-$35.00', type: 'Expense', status: 'Completed' },
    { date: '2026-06-04', description: 'Dividend payout', category: 'Investment', amount: '+$420.00', type: 'Income', status: 'Completed' },
    { date: '2026-06-03', description: 'Taxi ride', category: 'Transport', amount: '-$16.50', type: 'Expense', status: 'Completed' },
    { date: '2026-06-02', description: 'Pharmacy', category: 'Health', amount: '-$30.00', type: 'Expense', status: 'Completed' },
    { date: '2026-06-01', description: 'Gadget purchase', category: 'Shopping', amount: '-$235.00', type: 'Expense', status: 'Pending' },
    { date: '2026-05-31', description: 'Utility payment', category: 'Bills', amount: '-$160.00', type: 'Expense', status: 'Completed' },
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
  bindUIControls();
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
          <strong>$${item.limit}</strong>
        </div>
        <div>
          <p>Spent amount</p>
          <strong>$${item.spent}</strong>
        </div>
        <div>
          <p>Remaining amount</p>
          <strong>$${item.remaining}</strong>
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

  stockSearchButton.addEventListener('click', handleStockSearch);
  stockSearchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleStockSearch();
    }
  });

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

  // global outside click listener above handles closing for all dropdowns
}

function closeAllDropdowns() {
  closeProfileMenu();
  closeNotificationsPanel();
  closeBudgetModal();
  closeTransactionModal();
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
  document.getElementById('tradeBadge').textContent = 'BUY';
}

function handleStockSearch() {
  const query = stockSearchInput.value.trim();
  if (!query) return;
  state.stockData.ticker = query.toUpperCase().slice(0, 5);
  state.stockData.company = `${query} Holdings`;
  state.stockData.price = `$${(120 + Math.random() * 80).toFixed(2)}`;
  state.stockData.marketCap = `${(60 + Math.random() * 280).toFixed(0)}B`;
  state.stockData.volume = `${(0.8 + Math.random() * 3.6).toFixed(1)}M`;
  state.stockData.high52 = `$${(parseFloat(state.stockData.price.slice(1)) + 15).toFixed(2)}`;
  state.stockData.low52 = `$${(parseFloat(state.stockData.price.slice(1)) - 35).toFixed(2)}`;
  state.stockData.peRatio = `${(14 + Math.random() * 20).toFixed(1)}`;
  state.stockData.recommendation = `The ${query.toUpperCase()} outlook shows steady momentum. Consider adding to your portfolio on pullbacks while monitoring volatility.`;
  state.stockData.chart = Array.from({ length: 12 }, () => 90 + Math.random() * 80);
  setStockDetails();
  updateStockChart();
}

function handleChatSubmit(event) {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;
  addChatMessage('user', question);
  chatInput.value = '';
  setTimeout(() => {
    addChatMessage('ai', generateChatResponse(question));
  }, 600);
}

function addChatMessage(role, text) {
  state.chatMessages.push({ role, text });
  renderChat();
}

function renderChat() {
  chatHistory.innerHTML = state.chatMessages
    .map((message) => {
      if (message.role === 'ai') {
        return `
          <div class="message ai">
            <div class="avatar ai-avatar">
              <svg viewBox="0 0 24 24" fill="currentColor" class="ai-sparkle-svg">
                <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10-0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z"></path>
              </svg>
            </div>
            <div class="bubble">${message.text}</div>
          </div>
        `;
      } else {
        return `
          <div class="message user">
            <div class="bubble">${message.text}</div>
            <div class="avatar user-avatar">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80" alt="Alex Rivera" />
            </div>
          </div>
        `;
      }
    })
    .join('');
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function generateChatResponse(prompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes('savings')) {
    return 'Your savings trajectory looks strong. I recommend increasing your monthly SIP by 10% to reach your emergency fund target in 8 months.';
  }
  if (lower.includes('reduce') || lower.includes('expense')) {
    return 'Review your shopping and subscription categories. Shifting a small portion of discretionary spend into automated savings can improve cash flow quickly.';
  }
  if (lower.includes('health score') || lower.includes('financial health')) {
    return 'Your financial health score is excellent. Keep an eye on expense categories above 70% utilization to maintain balance.';
  }
  return 'I recommend reviewing your upcoming bills and rebalancing your investments toward a mix of stable and growth assets for the next quarter.';
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
        backgroundColor: ['#1e88e5', '#00c896', '#2d5bf8', '#7d5fff', '#f4b400', '#ff6d6d'],
        borderWidth: 0,
        cutout: '78%',
        spacing: 4,
        borderRadius: 8
      }],
    },
    options: {
      animation: false,
      plugins: { 
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
  barGradient.addColorStop(0, '#1e88e5');
  barGradient.addColorStop(1, 'rgba(30, 136, 229, 0.1)');

  charts.expenseBar = new Chart(expenseBar, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Expenses',
        data: [4800, 5200, 5000, 4700, 5120, 5280],
        backgroundColor: barGradient,
        hoverBackgroundColor: '#1e88e5',
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
  incomeGrad.addColorStop(0, 'rgba(0, 200, 150, 0.25)');
  incomeGrad.addColorStop(1, 'rgba(0, 200, 150, 0.00)');

  const expenseGrad = incomeLine.createLinearGradient(0, 0, 0, 250);
  expenseGrad.addColorStop(0, 'rgba(30, 136, 229, 0.20)');
  expenseGrad.addColorStop(1, 'rgba(30, 136, 229, 0.00)');

  charts.incomeLine = new Chart(incomeLine, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Income',
          data: [8200, 9000, 8800, 9300, 9500, 9800],
          borderColor: '#00c896',
          borderWidth: 3,
          backgroundColor: incomeGrad,
          tension: 0.38,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#00c896',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 2,
        },
        {
          label: 'Expense',
          data: [5600, 5900, 5800, 5400, 5700, 6100],
          borderColor: '#1e88e5',
          borderWidth: 3,
          backgroundColor: expenseGrad,
          tension: 0.38,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#1e88e5',
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
  savingsGrad.addColorStop(0, 'rgba(30, 136, 229, 0.25)');
  savingsGrad.addColorStop(1, 'rgba(30, 136, 229, 0.00)');

  charts.savingsArea = new Chart(savingsArea, {
    type: 'line',
    data: {
      labels: ['2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4', '2027 Q1', '2027 Q2'],
      datasets: [{
        label: 'Savings Growth',
        data: [12000, 14600, 17150, 19900, 23020, 25640],
        borderColor: '#1e88e5',
        borderWidth: 3,
        backgroundColor: savingsGrad,
        fill: true,
        tension: 0.38,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#1e88e5',
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
        backgroundColor: 'rgba(0, 200, 150, 0.15)',
        borderColor: '#00c896',
        borderWidth: 2.5,
        pointBackgroundColor: '#00c896',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 4.5,
        pointHoverRadius: 7,
        pointHoverBackgroundColor: '#00c896',
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
  stockGrad.addColorStop(0, 'rgba(30, 136, 229, 0.22)');
  stockGrad.addColorStop(1, 'rgba(30, 136, 229, 0.00)');

  charts.stockChart = new Chart(stockChart, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Price',
        data: state.stockData.chart,
        borderColor: '#1e88e5',
        borderWidth: 3,
        backgroundColor: stockGrad,
        tension: 0.38,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#1e88e5',
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
    showTransactionError('Amount must be a valid number (e.g. -$84.20 or 84.20).');
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
  let clean = amountStr.replace(/[\s$,]/g, '');
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
    return `-$${formattedVal}`;
  } else if (isPositive) {
    return `+$${formattedVal}`;
  } else {
    // Default sign based on type if not explicitly provided
    return type === 'Expense' ? `-$${formattedVal}` : `+$${formattedVal}`;
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
    savingsTotalBalance.textContent = `$${total.toLocaleString('en-US')}`;
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
          <strong class="savings-balance">$${item.balance.toLocaleString('en-US')}</strong>
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

init();
