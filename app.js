const state = {
  currentPage: 'dashboard',
  theme: 'light',
  portfolioCash: 1000000,
  portfolioHoldings: [],
  portfolioTrades: [],
  savings: [
    { id: 1, name: 'Emergency Fund', risk: 'Low Risk', riskLevel: 'low', balance: 120000, purpose: 'Recommended', progress: 80, returnRate: 3.5, icon: 'shield' },
    { id: 2, name: 'Mutual Funds', risk: 'Moderate Risk', riskLevel: 'moderate', balance: 285000, purpose: 'Recommended', progress: 58, returnRate: 8.8, icon: 'pie-chart' },
    { id: 3, name: 'SIP', risk: 'Balanced', riskLevel: 'balanced', balance: 172000, purpose: 'Monthly plan', progress: 65, returnRate: 10.2, icon: 'clock' },
    { id: 4, name: 'Stocks', risk: 'High Risk', riskLevel: 'high', balance: 349000, purpose: 'Long-term gain', progress: 42, returnRate: 13.7, icon: 'trending-up' },
    { id: 5, name: 'Fixed Deposit', risk: 'Secure', riskLevel: 'secure', balance: 150000, purpose: 'Stable yield', progress: 90, returnRate: 5.1, icon: 'shield-check' }
  ],
  savingsFilter: 'all',
  savingsSort: 'balance-desc',
  transactions: [
    { id: 1, date: '2026-06-10', description: 'Coffee subscription', category: 'Bills', amount: '-₹250.00', type: 'Expense', status: 'Completed' },
    { id: 2, date: '2026-06-10', description: 'Grocery market', category: 'Food', amount: '-₹840.00', type: 'Expense', status: 'Completed' },
    { id: 3, date: '2026-06-09', description: 'Monthly salary', category: 'Investment', amount: '+₹2,00,000.00', type: 'Income', status: 'Completed' },
    { id: 4, date: '2026-06-08', description: 'Gym membership', category: 'Health', amount: '-₹2,500.00', type: 'Expense', status: 'Pending' },
    { id: 5, date: '2026-06-07', description: 'Ride share', category: 'Transport', amount: '-₹180.00', type: 'Expense', status: 'Completed' },
    { id: 6, date: '2026-06-06', description: 'Weekend dining', category: 'Entertainment', amount: '-₹1,200.00', type: 'Expense', status: 'Completed' },
    { id: 7, date: '2026-06-05', description: 'Book purchase', category: 'Education', amount: '-₹350.00', type: 'Expense', status: 'Completed' },
    { id: 8, date: '2026-06-04', description: 'Dividend payout', category: 'Investment', amount: '+₹38,400.00', type: 'Income', status: 'Completed' },
    { id: 9, date: '2026-06-03', description: 'Taxi ride', category: 'Transport', amount: '-₹165.00', type: 'Expense', status: 'Completed' },
    { id: 10, date: '2026-06-02', description: 'Pharmacy', category: 'Health', amount: '-₹300.00', type: 'Expense', status: 'Completed' },
    { id: 11, date: '2026-06-01', description: 'Gadget purchase', category: 'Shopping', amount: '-₹15,000.00', type: 'Expense', status: 'Pending' },
    { id: 12, date: '2026-05-31', description: 'Utility payment', category: 'Bills', amount: '-₹3,500.00', type: 'Expense', status: 'Completed' },
  ],
  currentPageIndex: 1,
  rowsPerPage: 6,
  budgets: [
    { label: 'Food', limit: 5000, spent: 3200, remaining: 1800, status: 'On track' },
    { label: 'Transport', limit: 2200, spent: 1440, remaining: 760, status: 'Good' },
    { label: 'Shopping', limit: 7500, spent: 6200, remaining: 1300, status: 'Review' },
    { label: 'Bills', limit: 4600, spent: 4120, remaining: 480, status: 'Checked' },
    { label: 'Health', limit: 1900, spent: 1160, remaining: 740, status: 'Stable' },
    { label: 'Entertainment', limit: 2600, spent: 1980, remaining: 620, status: 'Good' },
    { label: 'Education', limit: 1800, spent: 900, remaining: 900, status: 'Balanced' },
    { label: 'Investment', limit: 9200, spent: 7250, remaining: 1950, status: 'On track' },
    { label: 'Other', limit: 1600, spent: 780, remaining: 820, status: 'Healthy' },
  ],
  chatMessages: [],
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

let supabaseClient = null;

function init() {
  state.theme = localStorage.getItem('finsightTheme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(state.theme);

  // Initialize Supabase if credentials exist
  initSupabase();

  // Authenticate user
  const authOverlay = document.getElementById('authOverlay');
  const isLoggedIn = localStorage.getItem('finsight_logged_in') === 'true';
  const userId = localStorage.getItem('finsight_supabase_user_id');
  const supabaseActive = localStorage.getItem('finsight_supabase_url') && localStorage.getItem('finsight_supabase_key');

  const verifiedLoggedIn = isLoggedIn && (!supabaseActive || userId);

  // Bind Supabase settings modals
  bindSupabaseControls();

  if (verifiedLoggedIn) {
    if (authOverlay) {
      authOverlay.style.display = 'none';
      authOverlay.classList.add('fade-out');
    }
    
    // If Supabase is active, pull latest cloud state
    if (supabaseClient && userId) {
      fetchProfileData(userId);
      fetchCloudData(userId);
    }
  } else {
    if (authOverlay) {
      authOverlay.style.display = 'flex';
      authOverlay.classList.remove('fade-out');
    }
    localStorage.removeItem('finsight_logged_in');
  }
  setupAuth();

  // Clear legacy unscaled data from localStorage if present
  const storedBudgets = localStorage.getItem('finsightBudgets');
  if (storedBudgets) {
    try {
      const parsed = JSON.parse(storedBudgets);
      const foodB = parsed.find(b => b.label === 'Food');
      if (foodB && foodB.limit <= 500) {
        localStorage.removeItem('finsightBudgets');
        localStorage.removeItem('finsightTransactions');
        console.log('Cleared legacy unscaled data from localStorage.');
      }
    } catch(e) {}
  }

  // Load custom budgets if they exist
  const savedBudgets = localStorage.getItem('finsightBudgets');
  if (savedBudgets) {
    try {
      state.budgets = JSON.parse(savedBudgets);
    } catch (e) {
      console.error('Error parsing saved budgets:', e);
    }
  }

  // Load portfolio simulation state if it exists
  const savedCash = localStorage.getItem('finsightPortfolioCash');
  if (savedCash !== null) {
    state.portfolioCash = parseFloat(savedCash);
  }
  const savedHoldings = localStorage.getItem('finsightPortfolioHoldings');
  if (savedHoldings) {
    try {
      state.portfolioHoldings = JSON.parse(savedHoldings);
    } catch (e) {
      console.error('Error parsing saved holdings:', e);
    }
  }
  const savedTrades = localStorage.getItem('finsightPortfolioTrades');
  if (savedTrades) {
    try {
      state.portfolioTrades = JSON.parse(savedTrades);
    } catch (e) {
      console.error('Error parsing saved trades:', e);
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
  initFloatingObjects();
  initGlobalSearch();
  setupStockSuggestions();
  updateNotificationBadge();
  initializeSavings();
  setupPortfolio();
  renderPortfolio();

  // Show default page on load, checking hash first
  const hash = window.location.hash.substring(1);
  const validPages = ['dashboard', 'budget', 'stocks', 'advisor', 'savings', 'reports', 'import', 'profile', 'portfolio'];
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  } else {
    showPage(state.currentPage);
  }
}

function setupAuth() {
  const authOverlay = document.getElementById('authOverlay');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const switchToSignUp = document.getElementById('switchToSignUp');
  const switchToLogin = document.getElementById('switchToLogin');
  const loginFormContainer = document.getElementById('loginFormContainer');
  const signupFormContainer = document.getElementById('signupFormContainer');

  if (switchToSignUp) {
    switchToSignUp.addEventListener('click', () => {
      loginFormContainer.hidden = true;
      signupFormContainer.hidden = false;
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener('click', () => {
      signupFormContainer.hidden = true;
      loginFormContainer.hidden = false;
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value.trim();
      const emailLower = email.toLowerCase();

      if (supabaseClient) {
        // Cloud Auth Mode
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'Sign In';
        if (submitBtn) {
          submitBtn.textContent = 'Signing in...';
          submitBtn.disabled = true;
        }
        
        try {
          const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: emailLower,
            password: password
          });
          
          if (error) throw error;
          
          const user = data.user;
          localStorage.setItem('finsight_logged_in', 'true');
          localStorage.setItem('finsight_supabase_user_id', user.id);
          
          await fetchProfileData(user.id);
          await fetchCloudData(user.id);
          
          showToast(`Logged in successfully!`, 'success');
          
          if (authOverlay) {
            authOverlay.classList.add('fade-out');
            setTimeout(() => {
              authOverlay.style.display = 'none';
            }, 800);
          }
        } catch (err) {
          showToast(`Login failed: ${err.message}`, 'error');
        } finally {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        }
        return;
      }

      // Local Fallback Auth Mode
      const users = JSON.parse(localStorage.getItem('finsight_users') || '{}');
      
      let authenticated = false;
      let userName = "Arjun Singh";
      let resolvedEmail = email;

      if ((emailLower === 'arjun@finsight.ai' || emailLower === 'arjun@finsightai' || emailLower === 'arjun') && password === 'admin') {
        authenticated = true;
        resolvedEmail = 'arjun@finsight.ai';
      } else {
        const matchedKey = Object.keys(users).find(k => {
          const cleanKey = k.toLowerCase().replace(/[^a-z0-9]/g, '');
          const cleanEmail = emailLower.replace(/[^a-z0-9]/g, '');
          return cleanKey === cleanEmail || k.toLowerCase() === emailLower;
        });
        
        if (matchedKey && users[matchedKey].password === password) {
          authenticated = true;
          userName = users[matchedKey].name;
          resolvedEmail = matchedKey;
        }
      }

      if (authenticated) {
        localStorage.setItem('finsight_logged_in', 'true');
        localStorage.setItem('finsight_user_name', userName);
        localStorage.setItem('finsight_user_email', resolvedEmail);
        
        updateProfileInfo(userName, resolvedEmail);
        
        showToast(`Welcome back, ${userName}!`, 'success');
        
        if (authOverlay) {
          authOverlay.classList.add('fade-out');
          setTimeout(() => {
            authOverlay.style.display = 'none';
          }, 800);
        }
      } else {
        showToast('Invalid email or password. Try arjun@finsight.ai / admin', 'error');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const password = document.getElementById('signupPassword').value.trim();
      const emailLower = email.toLowerCase();

      if (!name || !email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
      }

      if (supabaseClient) {
        // Cloud Signup Mode
        const submitBtn = signupForm.querySelector('button[type="submit"]');
        const originalText = submitBtn ? submitBtn.textContent : 'Sign Up';
        if (submitBtn) {
          submitBtn.textContent = 'Creating account...';
          submitBtn.disabled = true;
        }

        try {
          const { data, error } = await supabaseClient.auth.signUp({
            email: emailLower,
            password: password,
            options: {
              data: {
                name: name
              }
            }
          });

          if (error) throw error;

          const user = data.user;
          localStorage.setItem('finsight_logged_in', 'true');
          localStorage.setItem('finsight_supabase_user_id', user.id);
          localStorage.setItem('finsight_user_name', name);
          localStorage.setItem('finsight_user_email', emailLower);

          updateProfileInfo(name, emailLower);
          
          // Seeding the new cloud user profile with any current local state data
          await uploadLocalDataToSupabase(user.id);
          
          showToast(`Account created! Welcome, ${name}!`, 'success');

          if (authOverlay) {
            authOverlay.classList.add('fade-out');
            setTimeout(() => {
              authOverlay.style.display = 'none';
            }, 800);
          }
        } catch (err) {
          showToast(`Sign up failed: ${err.message}`, 'error');
        } finally {
          if (submitBtn) {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }
        }
        return;
      }

      // Local Fallback Signup Mode
      const users = JSON.parse(localStorage.getItem('finsight_users') || '{}');
      if (users[emailLower] || emailLower === 'arjun@finsight.ai' || emailLower === 'arjun@finsightai' || emailLower === 'arjun') {
        showToast('An account with this email already exists', 'error');
        return;
      }

      users[emailLower] = { name, password };
      localStorage.setItem('finsight_users', JSON.stringify(users));

      localStorage.setItem('finsight_logged_in', 'true');
      localStorage.setItem('finsight_user_name', name);
      localStorage.setItem('finsight_user_email', emailLower);

      updateProfileInfo(name, emailLower);

      showToast(`Account created! Welcome, ${name}!`, 'success');

      if (authOverlay) {
        authOverlay.classList.add('fade-out');
        setTimeout(() => {
          authOverlay.style.display = 'none';
        }, 800);
      }
    });
  }
}

function updateProfileInfo(name, email) {
  const profileHeaderName = document.getElementById('profileHeaderName');
  if (profileHeaderName) profileHeaderName.textContent = name;

  const profileMainName = document.getElementById('profileMainName');
  if (profileMainName) profileMainName.textContent = name;

  const profileMainEmail = document.getElementById('profileMainEmail');
  if (profileMainEmail) profileMainEmail.textContent = email;
  
  const savedProfile = localStorage.getItem('finsightUserProfile');
  if (savedProfile) {
    try {
      const prof = JSON.parse(savedProfile);
      prof.name = name;
      prof.email = email;
      localStorage.setItem('finsightUserProfile', JSON.stringify(prof));
    } catch (e) {}
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

  if (targetPage === 'portfolio') {
    refreshPortfolioPrices();
    renderPortfolio();
  }
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
    if (e.key === 'Escape') {
      closeAllDropdowns();
      closeBudgetModal();
      closeTransactionModal();
      closePaymentModal();
    }
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

  // API Key Config Dialog bindings
  const configureApiKeyBtn = document.getElementById('configureApiKeyBtn');
  const apiKeyModal = document.getElementById('apiKeyModal');
  const closeApiKeyModalBtn = document.getElementById('closeApiKeyModalBtn');
  const apiKeyForm = document.getElementById('apiKeyForm');
  const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
  const clearApiKeyBtn = document.getElementById('clearApiKeyBtn');
  const aiStatusDot = document.getElementById('aiStatusDot');
  const aiStatusText = document.getElementById('aiStatusText');

  function updateAiModelStatus() {
    const savedKey = localStorage.getItem('finsight_gemini_api_key');
    if (savedKey) {
      if (aiStatusDot) {
        aiStatusDot.style.background = '#22c55e';
        aiStatusDot.style.color = '#22c55e';
        aiStatusDot.style.boxShadow = '0 0 10px #22c55e';
      }
      if (aiStatusText) aiStatusText.textContent = 'Gemini Online';
    } else {
      if (aiStatusDot) {
        aiStatusDot.style.background = '#eab308';
        aiStatusDot.style.color = '#eab308';
        aiStatusDot.style.boxShadow = '0 0 10px #eab308';
      }
      if (aiStatusText) aiStatusText.textContent = 'Local Mode';
    }
  }

  // Initial call to set status indicator on load
  updateAiModelStatus();

  if (configureApiKeyBtn) {
    configureApiKeyBtn.addEventListener('click', () => {
      const savedKey = localStorage.getItem('finsight_gemini_api_key') || '';
      geminiApiKeyInput.value = savedKey;
      apiKeyModal.removeAttribute('hidden');
    });
  }

  if (closeApiKeyModalBtn) {
    closeApiKeyModalBtn.addEventListener('click', () => {
      apiKeyModal.setAttribute('hidden', '');
    });
  }

  if (apiKeyModal) {
    apiKeyModal.addEventListener('click', (e) => {
      if (e.target === apiKeyModal) {
        apiKeyModal.setAttribute('hidden', '');
      }
    });
  }

  if (apiKeyForm) {
    apiKeyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newKey = geminiApiKeyInput.value.trim();
      if (newKey) {
        localStorage.setItem('finsight_gemini_api_key', newKey);
        if (typeof showToast === 'function') {
          showToast('Gemini API Key configured successfully!', 'success');
        }
        updateAiModelStatus();
        apiKeyModal.setAttribute('hidden', '');
      }
    });
  }

  if (clearApiKeyBtn) {
    clearApiKeyBtn.addEventListener('click', () => {
      localStorage.removeItem('finsight_gemini_api_key');
      geminiApiKeyInput.value = '';
      if (typeof showToast === 'function') {
        showToast('Gemini API Key removed.', 'info');
      }
      updateAiModelStatus();
      apiKeyModal.setAttribute('hidden', '');
    });
  }

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

  if (openBudgetModalBtn) openBudgetModalBtn.addEventListener('click', (e) => { e.stopPropagation(); openBudgetModal(); });
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

  // Watch Demo Button — scroll to features on home page
  const watchDemoBtn = document.getElementById('watchDemoBtn');
  if (watchDemoBtn) {
    watchDemoBtn.addEventListener('click', () => {
      showPage('home');
      setTimeout(() => {
        const featureGrid = document.querySelector('.feature-grid');
        if (featureGrid) {
          featureGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  }

  // Sign Out Button — clear session and reload
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      // Clear session keys
      localStorage.removeItem('finsight_logged_in');
      localStorage.removeItem('finsight_user_name');
      localStorage.removeItem('finsight_user_email');
      
      showToast('Signed out successfully. Reloading...', 'success');
      closeProfileMenu();
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    });
  }

  // Savings Filter Buttons
  const savingsFilterControls = document.getElementById('savingsFilterControls');
  if (savingsFilterControls) {
    savingsFilterControls.querySelectorAll('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        savingsFilterControls.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        const savingsGrid = document.getElementById('savingsGrid');
        if (!savingsGrid) return;
        
        const cards = savingsGrid.querySelectorAll('.savings-card');
        cards.forEach(card => {
          const risk = card.dataset.risk || '';
          if (filter === 'all') {
            card.style.display = '';
          } else if (filter === 'low-secure') {
            card.style.display = (risk === 'low' || risk === 'secure') ? '' : 'none';
          } else if (filter === 'balanced-moderate') {
            card.style.display = (risk === 'balanced' || risk === 'moderate') ? '' : 'none';
          } else if (filter === 'high') {
            card.style.display = (risk === 'high') ? '' : 'none';
          }
        });
      });
    });
  }

  // Savings Sort Dropdown
  const savingsSortSelect = document.getElementById('savingsSortSelect');
  if (savingsSortSelect) {
    savingsSortSelect.addEventListener('change', () => {
      const sortBy = savingsSortSelect.value;
      const savingsGrid = document.getElementById('savingsGrid');
      if (!savingsGrid) return;
      
      const cards = Array.from(savingsGrid.querySelectorAll('.savings-card'));
      cards.sort((a, b) => {
        const aBalance = parseFloat(a.dataset.balance) || 0;
        const bBalance = parseFloat(b.dataset.balance) || 0;
        const aReturn = parseFloat(a.dataset.returnRate) || 0;
        const bReturn = parseFloat(b.dataset.returnRate) || 0;
        const aProgress = parseFloat(a.dataset.progress) || 0;
        const bProgress = parseFloat(b.dataset.progress) || 0;
        
        switch (sortBy) {
          case 'balance-desc': return bBalance - aBalance;
          case 'balance-asc': return aBalance - bBalance;
          case 'return-desc': return bReturn - aReturn;
          case 'progress-desc': return bProgress - aProgress;
          default: return 0;
        }
      });
      
      cards.forEach(card => savingsGrid.appendChild(card));
    });
  }

  // Download PDF Button — use native print dialog
  const downloadPdfBtnEl = document.getElementById('downloadPdfBtn');
  if (downloadPdfBtnEl) {
    // Remove existing listeners by replacing the element
    const newPdfBtn = downloadPdfBtnEl.cloneNode(true);
    downloadPdfBtnEl.parentNode.replaceChild(newPdfBtn, downloadPdfBtnEl);
    newPdfBtn.addEventListener('click', () => {
      showToast('Opening print dialog for PDF export...', 'info');
      setTimeout(() => window.print(), 500);
    });
  }

  // Footer links navigation
  document.querySelectorAll('.landing-footer a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const page = link.getAttribute('href').substring(1);
      if (page) showPage(page);
    });
  });

  // global outside click listener above handles closing for all dropdowns
}

function closeAllDropdowns() {
  closeProfileMenu();
  closeNotificationsPanel();
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

function detectStockSymbol(prompt) {
  const lower = prompt.toLowerCase();
  const stopWords = new Set([
    'what', 'is', 'the', 'of', 'in', 'and', 'to', 'a', 'about', 'how', 'does', 'do', 'you', 'think', 'recommend', 'should', 'buy', 'sell', 
    'stock', 'share', 'shares', 'price', 'info', 'details', 'tell', 'me', 'on', 'for', 'with', 'at', 'any', 'invest', 'investment', 
    'investments', 'portfolio', 'market', 'markets', 'recommendation', 'recommendations', 'grow', 'growth', 'saving', 'savings', 
    'budget', 'budgets', 'spend', 'spending', 'spent', 'reduce', 'cost', 'costs', 'expense', 'expenses', 'income', 'yield', 
    'return', 'returns', 'rate', 'rates', 'interest', 'debt', 'debts', 'tax', 'taxes', 'fund', 'funds', 'sip', 'sips', 'fd', 'fds', 
    'transaction', 'transactions', 'help', 'guide', 'explain', 'show', 'view', 'display', 'check', 'analyze', 'analysis', 
    'audit', 'track', 'chart', 'graph', 'report', 'reports', 'summary', 'detail', 'details', 'list', 'table', 'data', 'information',
    'make', 'learn', 'get', 'create', 'add', 'edit', 'delete', 'remove', 'clear',
    'give', 'some', 'suggest', 'suggestion', 'suggestions', 'this', 'that', 'these', 'those', 'who', 'where', 'when', 'why', 'which',
    'only', 'own', 'same', 'each', 'every', 'other', 'another', 'none', 'both', 'all'
  ]);
  const words = prompt.split(/\s+/).map(w => w.replace(/^[?.,!]+|[?.,!]+$/g, '').trim()).filter(w => w.length > 1);
  
  let detectedSymbolOrName = null;
  // First attempt: look for clean uppercase words (e.g. AAPL, RELIANCE.NS)
  for (const word of words) {
    if (word === word.toUpperCase() && !stopWords.has(word.toLowerCase())) {
      if (/^[A-Z]{2,6}$/.test(word) || /^[A-Z]+\.[A-Z]{2,3}$/.test(word)) {
        detectedSymbolOrName = word;
        break;
      }
    }
  }
  
  // Second attempt: look for any non-stopword if no uppercase match found
  if (!detectedSymbolOrName) {
    for (const word of words) {
      if (!stopWords.has(word.toLowerCase())) {
        detectedSymbolOrName = word;
        break;
      }
    }
  }
  return detectedSymbolOrName;
}

function isStockQuery(prompt, detectedSymbol) {
  if (!detectedSymbol) return false;
  const lower = prompt.toLowerCase();
  
  // If the symbol is a clean uppercase ticker (e.g., 2 to 6 letters), or contains exchange suffix like .NS or .BO
  if (/^[A-Z]{2,6}$/.test(detectedSymbol) || /^[A-Z]+\.[A-Z]{2,3}$/.test(detectedSymbol)) return true;
  
  // Otherwise, the prompt must contain a stock-related keyword
  const keywords = ['stock', 'price', 'share', 'shares', 'ticker', 'market', 'symbol', 'quote', 'portfolio', 'buy', 'sell'];
  return keywords.some(keyword => lower.includes(keyword));
}

function getLocalFallbackAdvice(prompt) {
  const lower = prompt.toLowerCase();
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

async function generateChatResponseAsync(prompt) {
  // 1. Try to call the backend chat API with Gemini
  try {
    const savedKey = localStorage.getItem('finsight_gemini_api_key') || '';
    const headers = { 'Content-Type': 'application/json' };
    if (savedKey) {
      headers['Authorization'] = `Bearer ${savedKey}`;
    }
    
    // Build context
    const context = {
      savings: state.savings || [],
      budgets: state.budgets || [],
      transactions: state.transactions || []
    };
    
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ prompt, context })
    });
    
    if (response.ok) {
      const data = await response.json();
      
      // If it returned a key-missing message and the query is about a stock,
      // let's fetch live stock details and append them to the key-missing message!
      if (data.key_missing) {
        let stockInfoText = "";
        const detectedSymbolOrName = detectStockSymbol(prompt);
        if (detectedSymbolOrName && isStockQuery(prompt, detectedSymbolOrName)) {
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
                  stockInfoText = "\n\n" + formatStockResponse(stockData);
                }
              }
            }
          } catch (e) {
            console.error("Local fallback stock fetch failed:", e);
          }
        } else {
          // If no stock detected, run local rule-based finance templates as fallback
          stockInfoText = "\n\n" + getLocalFallbackAdvice(prompt);
        }
        return data.reply + stockInfoText;
      }
      
      return data.reply;
    }
  } catch (error) {
    console.error("Failed to query backend AI Advisor:", error);
  }
  
  // 2. Full local rule-based system if server fails completely or goes offline
  const detectedSymbolOrName = detectStockSymbol(prompt);
  if (detectedSymbolOrName && isStockQuery(prompt, detectedSymbolOrName)) {
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
      console.error("Error fetching live stock details in local fallback:", e);
    }
  }
  
  return getLocalFallbackAdvice(prompt);
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
          const calculatedAmount = (val / 100) * 105200;
          
          centerLabel.textContent = label;
          centerValue.textContent = `₹${Math.round(calculatedAmount).toLocaleString('en-US')}`;
          centerLabel.style.color = charts.expenseDoughnut.data.datasets[0].backgroundColor[index];
        } else {
          centerLabel.textContent = 'Total Spent';
          centerValue.textContent = '₹1,05,200';
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
  dbSync('budget');
  
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
  dbSync('transaction', state.transactions[index]);

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
    dbSync('transaction-delete', id);
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
      <article class="savings-card glass-card card-${item.riskLevel}" data-risk="${item.riskLevel}" data-balance="${item.balance}" data-return-rate="${item.returnRate}" data-progress="${item.progress}">
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

  // Override profile fields with logged-in credentials if present
  const loggedInName = localStorage.getItem('finsight_user_name');
  const loggedInEmail = localStorage.getItem('finsight_user_email');
  if (loggedInName) state.profile.name = loggedInName;
  if (loggedInEmail) state.profile.email = loggedInEmail;

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
  
  // Calculate totalCost in INR
  let totalCostINR = totalCost;
  if (symbol === '$') {
    totalCostINR = totalCost * 83.30;
  } else if (symbol === '£') {
    totalCostINR = totalCost * 105.50;
  } else if (symbol === '€') {
    totalCostINR = totalCost * 89.20;
  }

  // Include simulated brokerage & tax in the deduction
  let brokerage = symbol === '₹' ? 120.00 : 1.50;
  let tax = Math.max(0.10, totalCost * 0.0005);
  if (symbol === '₹') tax = Math.max(10.00, totalCost * 0.0005);
  let totalDeductionVal = totalCost + brokerage + tax;
  let totalDeductionINR = totalDeductionVal;
  if (symbol === '$') totalDeductionINR = totalDeductionVal * 83.30;
  else if (symbol === '£') totalDeductionINR = totalDeductionVal * 105.50;
  else if (symbol === '€') totalDeductionINR = totalDeductionVal * 89.20;

  // Check mock cash balance
  if (state.portfolioCash < totalDeductionINR) {
    showToast(`Insufficient simulation funds. You need ₹${totalDeductionINR.toLocaleString('en-US', {maximumFractionDigits:2})} but only have ₹${state.portfolioCash.toLocaleString('en-US', {maximumFractionDigits:2})}.`, 'error');
    return;
  }
  
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
  
  // Deduct from mock cash balance
  state.portfolioCash -= totalDeductionINR;
  localStorage.setItem('finsightPortfolioCash', state.portfolioCash.toString());

  // Record/Update holdings
  const costPerShareINR = totalCostINR / shares;
  let holding = state.portfolioHoldings.find(h => h.ticker === ticker);
  if (holding) {
    const oldShares = holding.shares;
    const newShares = oldShares + shares;
    const newAvgPrice = ((oldShares * holding.avgPrice) + totalCostINR) / newShares;
    holding.shares = newShares;
    holding.avgPrice = newAvgPrice;
    holding.currentPrice = costPerShareINR; // Init currentPrice to latest purchase price
  } else {
    state.portfolioHoldings.push({
      ticker: ticker,
      company: state.stockData.company || ticker,
      shares: shares,
      avgPrice: costPerShareINR,
      currentPrice: costPerShareINR,
      currency: '₹'
    });
  }
  localStorage.setItem('finsightPortfolioHoldings', JSON.stringify(state.portfolioHoldings));

  // Record trade log
  const dateStr = new Date().toISOString().split('T')[0];
  state.portfolioTrades.unshift({
    date: dateStr,
    type: 'BUY',
    ticker: ticker,
    shares: shares,
    price: costPerShareINR,
    total: -totalDeductionINR
  });
  localStorage.setItem('finsightPortfolioTrades', JSON.stringify(state.portfolioTrades));
  dbSync('portfolio');

  // Add ledger transaction log
  const newTx = {
    id: Date.now(),
    date: dateStr,
    description: `Bought ${shares} ${ticker} shares`,
    category: 'Investment',
    amount: `-₹${totalCostINR.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
    type: 'Expense',
    status: 'Completed'
  };
  state.transactions.unshift(newTx);
  localStorage.setItem('finsightTransactions', JSON.stringify(state.transactions));
  dbSync('transaction', newTx);
  
  if (typeof updateTransactionListing === 'function') {
    updateTransactionListing();
  }

  // Refresh Portfolio
  renderPortfolio();
  
  confirmBtn.textContent = originalText;
  confirmBtn.disabled = false;
  cancelBtn.disabled = false;
  closeBtn.disabled = false;
  sharesInput.disabled = false;
  
  showToast(`Successfully purchased ${shares} shares of ${ticker}!`, 'success');
}

init();

function initFloatingObjects() {
  const container = document.getElementById('floatingObjects');
  if (!container) return;
  
  // Clear any existing
  container.innerHTML = '';
  
  // === Create varied floating objects ===
  
  // 1) Neon Rings (8 items)
  for (let i = 0; i < 8; i++) {
    const obj = document.createElement('div');
    obj.classList.add('floating-object', 'neon-ring');
    const size = Math.random() * 50 + 25;
    const left = Math.random() * 95;
    const duration = Math.random() * 20 + 20;
    const delay = Math.random() * -35;
    const driftX = (Math.random() - 0.5) * 120;
    const driftRot = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 360 + 180);
    obj.style.cssText = `width:${size}px;height:${size}px;left:${left}vw;animation-duration:${duration}s;animation-delay:${delay}s;--drift-x:${driftX}px;--drift-rot:${driftRot}deg;`;
    container.appendChild(obj);
  }
  
  // 2) Hexagons (6 items)
  for (let i = 0; i < 6; i++) {
    const obj = document.createElement('div');
    obj.classList.add('floating-object', 'hexagon');
    const size = Math.random() * 40 + 20;
    const left = Math.random() * 95;
    const duration = Math.random() * 25 + 25;
    const delay = Math.random() * -40;
    obj.style.cssText = `width:${size}px;height:${size}px;left:${left}vw;animation-duration:${duration}s;animation-delay:${delay}s;`;
    container.appendChild(obj);
  }
  
  // 3) Glowing Orbs (5 items)
  for (let i = 0; i < 5; i++) {
    const obj = document.createElement('div');
    obj.classList.add('floating-object', 'glow-orb');
    const size = Math.random() * 30 + 10;
    const left = Math.random() * 95;
    const duration = Math.random() * 30 + 25;
    const delay = Math.random() * -35;
    const driftX = (Math.random() - 0.5) * 80;
    obj.style.cssText = `width:${size}px;height:${size}px;left:${left}vw;animation-duration:${duration}s;animation-delay:${delay}s;--drift-x:${driftX}px;`;
    container.appendChild(obj);
  }
  
  // 4) Diamonds (5 items - floating diamond outlines)
  for (let i = 0; i < 5; i++) {
    const obj = document.createElement('div');
    obj.classList.add('floating-object', 'diamond');
    const size = Math.random() * 20 + 10;
    const left = Math.random() * 95;
    const duration = Math.random() * 25 + 20;
    const delay = Math.random() * -30;
    const driftX = (Math.random() - 0.5) * 80;
    const driftRot = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 180 + 90);
    obj.style.cssText = `width:${size}px;height:${size}px;left:${left}vw;animation-duration:${duration}s;animation-delay:${delay}s;--drift-x:${driftX}px;--drift-rot:${driftRot}deg;`;
    container.appendChild(obj);
  }
  
  // 5) Plus Markers (4 items - floating crosses)
  for (let i = 0; i < 4; i++) {
    const obj = document.createElement('div');
    obj.classList.add('floating-object', 'plus-marker');
    const left = Math.random() * 95;
    const duration = Math.random() * 25 + 20;
    const delay = Math.random() * -30;
    const driftX = (Math.random() - 0.5) * 80;
    obj.style.cssText = `left:${left}vw;animation-duration:${duration}s;animation-delay:${delay}s;--drift-x:${driftX}px;`;
    container.appendChild(obj);
  }
  
  // 6) Grid Dots (6 items - small pulsing dots)
  for (let i = 0; i < 6; i++) {
    const obj = document.createElement('div');
    obj.classList.add('floating-object', 'grid-dot');
    const size = Math.random() * 5 + 3;
    const left = Math.random() * 95;
    const duration = Math.random() * 35 + 30;
    const delay = Math.random() * -40;
    const driftX = (Math.random() - 0.5) * 60;
    obj.style.cssText = `width:${size}px;height:${size}px;left:${left}vw;animation-duration:${duration}s;animation-delay:${delay}s;--drift-x:${driftX}px;`;
    container.appendChild(obj);
  }
  
  // === Initialize canvas particle constellation ===
  initBgCanvas();
}

// Animated particle constellation on canvas
function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  let particles = [];
  const PARTICLE_COUNT = 60;
  const CONNECTION_DIST = 120;
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.8,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const isDark = document.documentElement.classList.contains('dark');
    const baseColor = isDark ? '14, 165, 233' : '2, 132, 199';
    const lineColor = isDark ? '14, 165, 233' : '2, 132, 199';
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < CONNECTION_DIST) {
          const opacity = (1 - dist / CONNECTION_DIST) * 0.25;
          ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    // Draw particles
    for (const p of particles) {
      ctx.fillStyle = `rgba(${baseColor}, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Update positions
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around edges
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = canvas.height + 10;
      if (p.y > canvas.height + 10) p.y = -10;
    }
    
    animationId = requestAnimationFrame(draw);
  }
  
  resize();
  createParticles();
  draw();
  
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

function initGlobalSearch() {
  const searchInput = document.getElementById('globalSearch');
  const resultsOverlay = document.getElementById('globalSearchResults');
  
  if (!searchInput || !resultsOverlay) return;

  let activeIndex = -1;

  // Compile search data dynamically
  const getSearchData = (query) => {
    const data = [
      { type: 'Page', icon: '📄', title: 'Dashboard', meta: 'Navigate to overview & cash flows', keywords: ['home', 'dashboard', 'overview'], action: () => showPage('dashboard') },
      { type: 'Page', icon: '📄', title: 'Budgets & Expense limits', meta: 'Manage category caps & limits', keywords: ['budget', 'expenses', 'limits'], action: () => showPage('budget') },
      { type: 'Page', icon: '📄', title: 'Stock & Equity Analyzer', meta: 'Run live technical analysis', keywords: ['stocks', 'analyzer', 'market', 'trade', 'apple', 'aapl', 'tesla', 'tsla'], action: () => showPage('stocks') },
      { type: 'Page', icon: '📄', title: 'AI Wealth Advisor', meta: 'Chat with FinSight assistant', keywords: ['ai', 'advisor', 'bot', 'help', 'chat'], action: () => showPage('advisor') },
      { type: 'Page', icon: '📄', title: 'AI Savings Goals', meta: 'Review risk metrics & targets', keywords: ['savings', 'goals', 'emergency fund', 'retirement'], action: () => showPage('savings') },
      { type: 'Page', icon: '📄', title: 'Financial Statement Reports', meta: 'Print ledger audits & statements', keywords: ['reports', 'analytics', 'charts', 'summary'], action: () => showPage('reports') },
      { type: 'Page', icon: '📄', title: 'Bank Statement Import', meta: 'Import CSV or PDF ledger files', keywords: ['import', 'bank', 'csv', 'sync'], action: () => showPage('import') },
      { type: 'Page', icon: '📄', title: 'Profile Settings', meta: 'Edit credentials & parameters', keywords: ['profile', 'settings', 'account'], action: () => showPage('profile') },
      { type: 'Action', icon: '⚡', title: 'Create New Budget Category', meta: 'Define fresh category limit', keywords: ['create budget', 'new budget'], action: () => { showPage('budget'); openBudgetModal(); } },
      { type: 'Action', icon: '⚡', title: 'Export Transactions (CSV)', meta: 'Download transaction ledger file', keywords: ['export', 'csv', 'download'], action: () => { exportTransactionsToCSV(); } },
      { type: 'Action', icon: '🔌', title: 'Connect Supabase Database', meta: 'Set up cloud sync credentials', keywords: ['supabase', 'database', 'connect'], action: () => { showPage('profile'); const connectBtn = document.getElementById('connectSupabaseBtn'); if (connectBtn) connectBtn.click(); } },
      { type: 'Action', icon: '🔑', title: 'Configure Gemini API Key', meta: 'Set up live AI Advisor key', keywords: ['gemini', 'api key', 'key'], action: () => { const keyBtn = document.getElementById('configApiKeyBtn'); if (keyBtn) keyBtn.click(); } }
    ];

    // 1. Add Ticker Search Option (if query is a word)
    const cleanQuery = query.trim().toUpperCase();
    if (cleanQuery.length > 0 && /^[A-Z0-9\.\-]+$/.test(cleanQuery)) {
      data.unshift({
        type: 'Stock Ticker',
        icon: '📈',
        title: `Analyze Ticker: ${cleanQuery}`,
        meta: `Launch live telemetry for ${cleanQuery}`,
        keywords: [cleanQuery.toLowerCase()],
        action: () => {
          showPage('stocks');
          const tickerInput = document.getElementById('stockTickerInput');
          if (tickerInput) {
            tickerInput.value = cleanQuery;
            setStockDetails(cleanQuery);
          }
        }
      });
    }

    // 2. Add Transactions
    if (state && state.transactions) {
      state.transactions.forEach(t => {
        const descText = t.description || '';
        data.push({
          type: 'Transaction',
          icon: '💸',
          title: descText,
          meta: `${t.category} • ${t.date}`,
          badge: t.amount,
          badgeClass: t.type === 'Income' ? 'income' : 'expense',
          keywords: [descText.toLowerCase(), t.category.toLowerCase(), t.amount.toLowerCase(), t.date],
          action: () => {
            openEditTransactionModal(t.id);
          }
        });
      });
    }
    
    // 3. Add Savings
    if (state && state.savings) {
      state.savings.forEach(s => {
        data.push({
          type: 'Savings Goal',
          icon: '🎯',
          title: s.name,
          meta: `${s.risk} • Return Rate: ${s.returnRate}%`,
          badge: `₹${s.balance.toLocaleString('en-IN')}`,
          keywords: [s.name.toLowerCase(), s.risk.toLowerCase()],
          action: () => showPage('savings')
        });
      });
    }

    return data;
  };

  const renderResults = (results, query) => {
    resultsOverlay.innerHTML = '';
    activeIndex = -1;
    
    if (results.length === 0) {
      resultsOverlay.innerHTML = `<div class="search-empty">No results found for "${query}"</div>`;
      return;
    }

    results.forEach((res, index) => {
      const itemEl = document.createElement('div');
      itemEl.classList.add('search-result-item');
      
      let badgeHTML = '';
      if (res.badge) {
        const badgeClass = res.badgeClass ? ` ${res.badgeClass}` : '';
        badgeHTML = `<div class="search-result-badge${badgeClass}">${res.badge}</div>`;
      }

      itemEl.innerHTML = `
        <div class="search-result-icon">${res.icon}</div>
        <div class="search-result-content">
          <div class="search-result-title">${res.title}</div>
          <div class="search-result-meta">${res.meta}</div>
        </div>
        ${badgeHTML}
      `;

      itemEl.addEventListener('click', () => {
        res.action();
        searchInput.value = '';
        resultsOverlay.hidden = true;
      });

      resultsOverlay.appendChild(itemEl);
    });
  };

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      resultsOverlay.hidden = true;
      return;
    }

    const searchData = getSearchData(query);
    const results = searchData.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.type.toLowerCase().includes(query) ||
      item.keywords.some(k => k.includes(query))
    ).slice(0, 8); // Max 8 results

    renderResults(results, query);
    resultsOverlay.hidden = false;
  });

  // Keyboard Navigation
  searchInput.addEventListener('keydown', (e) => {
    const items = resultsOverlay.querySelectorAll('.search-result-item');
    if (resultsOverlay.hidden || items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) items[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % items.length;
      items[activeIndex].classList.add('active');
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) items[activeIndex].classList.remove('active');
      activeIndex = (activeIndex - 1 + items.length) % items.length;
      items[activeIndex].classList.add('active');
      items[activeIndex].scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) {
        items[activeIndex].click();
      } else if (items.length > 0) {
        items[0].click();
      }
    } else if (e.key === 'Escape') {
      resultsOverlay.hidden = true;
      searchInput.blur();
    }
  });

  // Hide on outside click
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !resultsOverlay.contains(e.target)) {
      resultsOverlay.hidden = true;
    }
  });
  
  // Show on focus if there's text
  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim().length > 0) {
      searchInput.dispatchEvent(new Event('input'));
    }
  });
}

// === Portfolio Simulation System ===
function setupPortfolio() {
  const sellModal = document.getElementById('sellModal');
  const sellForm = document.getElementById('sellForm');
  const closeSellModalBtn = document.getElementById('closeSellModalBtn');
  const cancelSellBtn = document.getElementById('cancelSellBtn');
  const sellSharesInput = document.getElementById('sellShares');
  const sellSuccessCloseBtn = document.getElementById('sellSuccessCloseBtn');

  if (closeSellModalBtn) closeSellModalBtn.addEventListener('click', closeSellModal);
  if (cancelSellBtn) cancelSellBtn.addEventListener('click', closeSellModal);
  if (sellSuccessCloseBtn) sellSuccessCloseBtn.addEventListener('click', closeSellModal);
  
  if (sellModal) {
    sellModal.addEventListener('click', (e) => {
      if (e.target === sellModal) closeSellModal();
    });
  }

  if (sellSharesInput) {
    sellSharesInput.addEventListener('input', updateSellCalculations);
  }

  if (sellForm) {
    sellForm.addEventListener('submit', handleSellSubmit);
  }
}

function openSellModal(ticker) {
  closeAllDropdowns();
  
  const sellModal = document.getElementById('sellModal');
  const sellForm = document.getElementById('sellForm');
  const sellSuccessContainer = document.getElementById('sellSuccessContainer');
  
  if (!sellModal) return;
  
  const holding = state.portfolioHoldings.find(h => h.ticker === ticker);
  if (!holding) {
    showToast(`No holding found for ${ticker}`, 'error');
    return;
  }
  
  document.getElementById('sellCompanyName').textContent = holding.company;
  document.getElementById('sellTicker').textContent = holding.ticker;
  document.getElementById('sellPrice').textContent = `₹${holding.currentPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById('sellSharesOwned').textContent = holding.shares;
  
  const sellSharesInput = document.getElementById('sellShares');
  sellSharesInput.value = 1;
  sellSharesInput.max = holding.shares;
  sellSharesInput.disabled = false;
  
  sellForm.dataset.ticker = ticker;
  sellForm.dataset.price = holding.currentPrice;
  
  // Reset visibility
  sellForm.hidden = false;
  sellSuccessContainer.hidden = true;
  
  const errorDiv = document.getElementById('sellFormError');
  if (errorDiv) {
    errorDiv.hidden = true;
    errorDiv.textContent = '';
  }
  
  updateSellCalculations();
  
  sellModal.hidden = false;
  document.body.classList.add('menu-open');
}

function closeSellModal() {
  const sellModal = document.getElementById('sellModal');
  if (sellModal) {
    sellModal.hidden = true;
    document.body.classList.remove('menu-open');
  }
}

function updateSellCalculations() {
  const sellForm = document.getElementById('sellForm');
  if (!sellForm) return;
  
  const price = parseFloat(sellForm.dataset.price) || 0;
  const shares = parseInt(document.getElementById('sellShares').value) || 0;
  
  const proceeds = price * shares;
  document.getElementById('sellProceeds').textContent = `₹${proceeds.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

async function handleSellSubmit(event) {
  event.preventDefault();
  
  const sellForm = document.getElementById('sellForm');
  const confirmBtn = document.getElementById('confirmSellBtn');
  const cancelBtn = document.getElementById('cancelSellBtn');
  const closeBtn = document.getElementById('closeSellModalBtn');
  const sellSuccessContainer = document.getElementById('sellSuccessContainer');
  const sharesInput = document.getElementById('sellShares');
  
  if (!sellForm || !confirmBtn) return;
  
  const ticker = sellForm.dataset.ticker;
  const price = parseFloat(sellForm.dataset.price) || 0;
  const sharesToSell = parseInt(sharesInput.value) || 1;
  
  const holding = state.portfolioHoldings.find(h => h.ticker === ticker);
  if (!holding) {
    showToast('Holding not found', 'error');
    return;
  }
  
  if (sharesToSell > holding.shares) {
    const errorDiv = document.getElementById('sellFormError');
    if (errorDiv) {
      errorDiv.textContent = `You can only sell up to ${holding.shares} shares.`;
      errorDiv.hidden = false;
    }
    return;
  }
  
  const originalText = confirmBtn.textContent;
  confirmBtn.textContent = 'Processing...';
  confirmBtn.disabled = true;
  cancelBtn.disabled = true;
  closeBtn.disabled = true;
  sharesInput.disabled = true;
  
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  sellForm.hidden = true;
  sellSuccessContainer.hidden = false;
  
  const proceeds = price * sharesToSell;
  const successMessage = document.getElementById('sellSuccessMessage');
  successMessage.textContent = `Sold ${sharesToSell} share${sharesToSell > 1 ? 's' : ''} of ${ticker} for ₹${proceeds.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} successfully.`;
  
  // Update mock cash balance
  state.portfolioCash += proceeds;
  localStorage.setItem('finsightPortfolioCash', state.portfolioCash.toString());
  
  // Deduct holdings shares
  holding.shares -= sharesToSell;
  if (holding.shares <= 0) {
    state.portfolioHoldings = state.portfolioHoldings.filter(h => h.ticker !== ticker);
  }
  localStorage.setItem('finsightPortfolioHoldings', JSON.stringify(state.portfolioHoldings));
  
  // Record trade log
  const dateStr = new Date().toISOString().split('T')[0];
  state.portfolioTrades.unshift({
    date: dateStr,
    type: 'SELL',
    ticker: ticker,
    shares: sharesToSell,
    price: price,
    total: proceeds
  });
  localStorage.setItem('finsightPortfolioTrades', JSON.stringify(state.portfolioTrades));
  dbSync('portfolio');

  // Add ledger transaction log
  const newTx = {
    id: Date.now(),
    date: dateStr,
    description: `Sold ${sharesToSell} ${ticker} shares`,
    category: 'Investment',
    amount: `+₹${proceeds.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
    type: 'Income',
    status: 'Completed'
  };
  state.transactions.unshift(newTx);
  localStorage.setItem('finsightTransactions', JSON.stringify(state.transactions));
  dbSync('transaction', newTx);
  
  if (typeof updateTransactionListing === 'function') {
    updateTransactionListing();
  }
  
  renderPortfolio();
  
  confirmBtn.textContent = originalText;
  confirmBtn.disabled = false;
  cancelBtn.disabled = false;
  closeBtn.disabled = false;
  sharesInput.disabled = false;
  
  showToast(`Successfully sold ${sharesToSell} shares of ${ticker}!`, 'success');
}

function renderPortfolio() {
  const holdingsBody = document.getElementById('portfolioHoldingsBody');
  const tradesBody = document.getElementById('portfolioTradesBody');
  
  if (!holdingsBody || !tradesBody) return;
  
  // Render balances
  const holdingsVal = state.portfolioHoldings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  const totalVal = state.portfolioCash + holdingsVal;
  const pl = totalVal - 1000000;
  const plPct = (pl / 1000000) * 100;
  
  document.getElementById('portfolioCashBalance').textContent = `₹${state.portfolioCash.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  document.getElementById('portfolioTotalValue').textContent = `₹${totalVal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  
  const plCard = document.getElementById('portfolioPLCard');
  if (plCard) {
    if (pl >= 0) {
      plCard.className = 'summary-card total-pl-card profit-glow';
    } else {
      plCard.className = 'summary-card total-pl-card loss-glow';
    }
  }
  
  const plEl = document.getElementById('portfolioTotalPL');
  const plPctEl = document.getElementById('portfolioPLPct');
  const plSign = pl >= 0 ? '+' : '';
  const plClass = pl >= 0 ? 'portfolio-profit pulse-green' : 'portfolio-loss pulse-red';
  
  plEl.textContent = `${plSign}₹${pl.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  plEl.className = plClass;
  plPctEl.textContent = `${plSign}${plPct.toFixed(2)}% absolute return`;
  plPctEl.className = `summary-meta ${plClass}`;
  
  const chartValEl = document.getElementById('portfolioChartValue');
  if (chartValEl) {
    chartValEl.textContent = `₹${holdingsVal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
  }
  
  // Holdings rows
  if (state.portfolioHoldings.length === 0) {
    holdingsBody.innerHTML = `<tr><td colspan="8" class="text-center">No current holdings. Go to Stock Analyzer to search and buy stocks.</td></tr>`;
  } else {
    holdingsBody.innerHTML = state.portfolioHoldings.map(h => {
      const cost = h.shares * h.avgPrice;
      const val = h.shares * h.currentPrice;
      const profit = val - cost;
      const profitPct = cost > 0 ? (profit / cost) * 100 : 0;
      const profitSign = profit >= 0 ? '+' : '';
      const profitClass = profit >= 0 ? 'portfolio-profit' : 'portfolio-loss';
      
      return `
        <tr>
          <td><span class="ticker-badge">${h.ticker}</span></td>
          <td>${h.company}</td>
          <td>${h.shares}</td>
          <td>₹${h.avgPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td>₹${h.currentPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td>₹${val.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td class="${profitClass}">${profitSign}₹${profit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})} (${profitSign}${profitPct.toFixed(2)}%)</td>
          <td>
            <button class="table-action-btn btn-sell" onclick="openSellModal('${h.ticker}')">Sell</button>
          </td>
        </tr>
      `;
    }).join('');
  }
  
  // Trade Ledger rows
  if (state.portfolioTrades.length === 0) {
    tradesBody.innerHTML = `<tr><td colspan="6" class="text-center">No trades logged yet.</td></tr>`;
  } else {
    tradesBody.innerHTML = state.portfolioTrades.map(t => {
      const typeClass = t.type === 'BUY' ? 'success' : 'warning';
      const plSign = t.type === 'BUY' ? '-' : '+';
      const plClass = t.type === 'BUY' ? 'portfolio-loss' : 'portfolio-profit';
      return `
        <tr>
          <td>${t.date}</td>
          <td><span class="status-chip ${typeClass}">${t.type}</span></td>
          <td><span class="ticker-badge">${t.ticker}</span></td>
          <td>${t.shares}</td>
          <td>₹${t.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
          <td class="${plClass}">${plSign}₹${Math.abs(t.total).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
        </tr>
      `;
    }).join('');
  }
  
  // Re-draw chart
  initPortfolioChart();
}

function initPortfolioChart() {
  const canvas = document.getElementById('portfolioDoughnut');
  if (!canvas) return;
  
  if (charts.portfolioChart) {
    charts.portfolioChart.destroy();
  }
  
  const holdingsVal = state.portfolioHoldings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  
  let labels = [];
  let data = [];
  let bgColors = [];
  
  if (state.portfolioHoldings.length === 0) {
    labels = ['Mock Cash Balance'];
    data = [100];
    bgColors = ['rgba(14, 165, 233, 0.45)'];
  } else {
    // Add holdings
    state.portfolioHoldings.forEach((h, idx) => {
      const val = h.shares * h.currentPrice;
      const pct = holdingsVal > 0 ? (val / (holdingsVal + state.portfolioCash)) * 100 : 0;
      labels.push(h.ticker);
      data.push(pct);
      
      const colors = [
        '#0ea5e9', '#818cf8', '#22c55e', '#a855f7', '#f43f5e', 
        '#eab308', '#ec4899', '#14b8a6', '#f97316'
      ];
      bgColors.push(colors[idx % colors.length]);
    });
    
    // Add Cash
    const cashPct = (state.portfolioCash / (holdingsVal + state.portfolioCash)) * 100;
    labels.push('Cash');
    data.push(cashPct);
    bgColors.push('rgba(148, 163, 184, 0.25)');
  }
  
  const isDark = state.theme === 'dark';
  const labelColor = isDark ? '#94a3b8' : '#64748b';
  const borderVal = isDark ? '#1e293b' : '#ffffff';

  charts.portfolioChart = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: bgColors,
        borderWidth: 2,
        borderColor: borderVal
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: labelColor,
            font: {
              family: 'Inter',
              size: 11
            },
            padding: 12
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw.toFixed(1)}%`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });
}

async function refreshPortfolioPrices() {
  if (state.portfolioHoldings.length === 0) return;
  
  for (let holding of state.portfolioHoldings) {
    try {
      const response = await fetch(`/api/stock?symbol=${encodeURIComponent(holding.ticker)}`);
      if (response.ok) {
        const info = await response.json();
        if (info && info.price) {
          const match = info.price.match(/^([^\d\s\-\+,]+)?\s*([\d\.,]+)/);
          if (match) {
            const sym = match[1] || '$';
            let price = parseFloat(match[2].replace(/,/g, ''));
            if (sym === '$') price = price * 83.30;
            else if (sym === '£') price = price * 105.50;
            else if (sym === '€') price = price * 89.20;
            holding.currentPrice = price;
          }
        }
      } else {
        // Fallback: simulate minor random float fluctuation (e.g. -0.3% to +0.3%)
        const delta = 1 + ((Math.random() - 0.5) * 0.006);
        holding.currentPrice *= delta;
      }
    } catch (e) {
      const delta = 1 + ((Math.random() - 0.5) * 0.006);
      holding.currentPrice *= delta;
    }
  }
  
  localStorage.setItem('finsightPortfolioHoldings', JSON.stringify(state.portfolioHoldings));
}

function resetPortfolioData() {
  if (confirm('Are you sure you want to clear your portfolio and reset your mock balance to ₹10,00,000?')) {
    state.portfolioCash = 1000000;
    state.portfolioHoldings = [];
    state.portfolioTrades = [];
    
    localStorage.setItem('finsightPortfolioCash', '1000000');
    localStorage.setItem('finsightPortfolioHoldings', JSON.stringify([]));
    localStorage.setItem('finsightPortfolioTrades', JSON.stringify([]));
    dbSync('portfolio');
    
    renderPortfolio();
    showToast('Simulation portfolio has been reset.', 'success');
  }
}

// =========================================================================
// Supabase Integration Modules
// =========================================================================

function initSupabase() {
  const url = localStorage.getItem('finsight_supabase_url');
  const key = localStorage.getItem('finsight_supabase_key');
  const indicator = document.getElementById('supabaseSyncIndicator');
  
  if (url && key && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key);
      if (indicator) indicator.style.display = 'flex';
      console.log('Supabase connection initialized successfully.');
      return true;
    } catch (e) {
      console.error('Failed to initialize Supabase client:', e);
      supabaseClient = null;
      if (indicator) indicator.style.display = 'none';
    }
  } else {
    supabaseClient = null;
    if (indicator) indicator.style.display = 'none';
  }
  return false;
}

function bindSupabaseControls() {
  const modal = document.getElementById('supabaseModal');
  const connectBtn = document.getElementById('connectSupabaseBtn');
  const closeBtn = document.getElementById('closeSupabaseModalBtn');
  const form = document.getElementById('supabaseForm');
  const clearBtn = document.getElementById('clearSupabaseBtn');
  const urlInput = document.getElementById('supabaseUrlInput');
  const keyInput = document.getElementById('supabaseKeyInput');
  
  if (connectBtn) {
    connectBtn.addEventListener('click', () => {
      urlInput.value = localStorage.getItem('finsight_supabase_url') || '';
      keyInput.value = localStorage.getItem('finsight_supabase_key') || '';
      modal.removeAttribute('hidden');
      modal.style.display = 'flex';
      closeProfileMenu();
    });
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.setAttribute('hidden', '');
      modal.style.display = 'none';
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to disconnect from Supabase Cloud? This will return the application to local storage mode.')) {
        localStorage.removeItem('finsight_supabase_url');
        localStorage.removeItem('finsight_supabase_key');
        localStorage.removeItem('finsight_supabase_user_id');
        localStorage.removeItem('finsight_logged_in');
        
        initSupabase();
        modal.setAttribute('hidden', '');
        modal.style.display = 'none';
        showToast('Disconnected from Supabase Cloud.', 'info');
        
        window.location.reload();
      }
    });
  }
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = urlInput.value.trim();
      const key = keyInput.value.trim();
      
      localStorage.setItem('finsight_supabase_url', url);
      localStorage.setItem('finsight_supabase_key', key);
      
      const success = initSupabase();
      
      modal.setAttribute('hidden', '');
      modal.style.display = 'none';
      
      if (success) {
        showToast('Successfully connected to Supabase Database!', 'success');
        if (confirm('Database connected! Would you like to log in to your cloud database profile now?')) {
          localStorage.removeItem('finsight_logged_in');
          window.location.reload();
        }
      } else {
        showToast('Connection failed. Please check your URL and Key.', 'error');
      }
    });
  }
}

async function uploadLocalDataToSupabase(userId) {
  if (!supabaseClient || !userId) return;
  
  showToast('Syncing local data to Supabase cloud...', 'info');
  
  try {
    // 1. Sync Savings Goals
    if (state.savings && state.savings.length > 0) {
      const rows = state.savings.map(s => ({
        user_id: userId,
        name: s.name,
        risk: s.risk,
        risk_level: s.riskLevel,
        balance: s.balance,
        purpose: s.purpose,
        progress: s.progress,
        return_rate: s.returnRate,
        icon: s.icon
      }));
      await supabaseClient.from('savings').delete().eq('user_id', userId);
      await supabaseClient.from('savings').insert(rows);
    }
    
    // 2. Sync Budgets
    if (state.budgets && state.budgets.length > 0) {
      const rows = state.budgets.map(b => ({
        user_id: userId,
        label: b.label,
        limit: b.limit,
        spent: b.spent,
        status: b.status
      }));
      await supabaseClient.from('budgets').delete().eq('user_id', userId);
      await supabaseClient.from('budgets').insert(rows);
    }
    
    // 3. Sync Transactions
    if (state.transactions && state.transactions.length > 0) {
      const rows = state.transactions.map(t => {
        let amountNum = parseFloat(t.amount.replace(/[^\d\.-]/g, ''));
        if (isNaN(amountNum)) amountNum = 0;
        return {
          id: String(t.id),
          user_id: userId,
          date: t.date,
          description: t.description,
          category: t.category,
          amount: amountNum,
          type: t.type,
          status: t.status
        };
      });
      await supabaseClient.from('transactions').delete().eq('user_id', userId);
      await supabaseClient.from('transactions').insert(rows);
    }
    
    // 4. Sync Portfolio State
    await supabaseClient.from('portfolio_state').upsert({
      user_id: userId,
      cash_balance: state.portfolioCash,
      holdings: state.portfolioHoldings,
      trades: state.portfolioTrades
    });
    
    showToast('Cloud sync complete!', 'success');
  } catch (e) {
    console.error('Error uploading local data:', e);
    showToast('Failed to sync some local data to the cloud.', 'warning');
  }
}

async function fetchCloudData(userId) {
  if (!supabaseClient || !userId) return;
  
  try {
    // Fetch Savings
    const { data: savingsData } = await supabaseClient.from('savings').select('*').eq('user_id', userId);
    if (savingsData && savingsData.length > 0) {
      state.savings = savingsData.map(s => ({
        id: s.id,
        name: s.name,
        risk: s.risk,
        riskLevel: s.risk_level,
        balance: Number(s.balance),
        purpose: s.purpose,
        progress: s.progress,
        returnRate: Number(s.return_rate),
        icon: s.icon
      }));
      localStorage.setItem('finsightSavings', JSON.stringify(state.savings));
    }
    
    // Fetch Budgets
    const { data: budgetsData } = await supabaseClient.from('budgets').select('*').eq('user_id', userId);
    if (budgetsData && budgetsData.length > 0) {
      state.budgets = budgetsData.map(b => ({
        label: b.label,
        limit: Number(b.limit),
        spent: Number(b.spent),
        remaining: Math.max(0, Number(b.limit) - Number(b.spent)),
        status: b.status
      }));
      localStorage.setItem('finsightBudgets', JSON.stringify(state.budgets));
    }
    
    // Fetch Transactions
    const { data: txData } = await supabaseClient.from('transactions').select('*').eq('user_id', userId).order('date', { ascending: false });
    if (txData && txData.length > 0) {
      state.transactions = txData.map(t => {
        const sign = t.type === 'Income' ? '+' : '-';
        return {
          id: isNaN(Number(t.id)) ? t.id : Number(t.id),
          date: t.date,
          description: t.description,
          category: t.category,
          amount: `${sign}₹${Math.abs(Number(t.amount)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
          type: t.type,
          status: t.status
        };
      });
      localStorage.setItem('finsightTransactions', JSON.stringify(state.transactions));
    }
    
    // Fetch Portfolio State
    const { data: portfolioData } = await supabaseClient.from('portfolio_state').select('*').eq('user_id', userId).maybeSingle();
    if (portfolioData) {
      state.portfolioCash = Number(portfolioData.cash_balance);
      state.portfolioHoldings = portfolioData.holdings || [];
      state.portfolioTrades = portfolioData.trades || [];
      
      localStorage.setItem('finsightPortfolioCash', String(state.portfolioCash));
      localStorage.setItem('finsightPortfolioHoldings', JSON.stringify(state.portfolioHoldings));
      localStorage.setItem('finsightPortfolioTrades', JSON.stringify(state.portfolioTrades));
    }
    
    // Trigger redraws
    updateTransactionListing();
    renderBudgetCards();
    renderSavingsCards();
    renderPortfolio();
  } catch (e) {
    console.error('Error fetching cloud data:', e);
  }
}

async function fetchProfileData(userId) {
  if (!supabaseClient || !userId) return;
  try {
    const { data: profile } = await supabaseClient.from('profiles').select('*').eq('id', userId).maybeSingle();
    if (profile) {
      localStorage.setItem('finsight_user_name', profile.full_name || 'Arjun Singh');
      localStorage.setItem('finsight_user_email', profile.email);
      updateProfileInfo(profile.full_name || 'Arjun Singh', profile.email);
    }
  } catch (e) {
    console.error('Error fetching profile:', e);
  }
}

async function dbSync(type, data) {
  if (!supabaseClient) return;
  const userId = localStorage.getItem('finsight_supabase_user_id');
  if (!userId) return;

  try {
    if (type === 'transaction') {
      const t = data;
      let amountNum = parseFloat(t.amount.replace(/[^\d\.-]/g, ''));
      if (isNaN(amountNum)) amountNum = 0;
      await supabaseClient.from('transactions').upsert({
        id: String(t.id),
        user_id: userId,
        date: t.date,
        description: t.description,
        category: t.category,
        amount: amountNum,
        type: t.type,
        status: t.status
      });
    } else if (type === 'transaction-delete') {
      const id = data;
      await supabaseClient.from('transactions').delete().eq('id', String(id)).eq('user_id', userId);
    } else if (type === 'budget') {
      const rows = state.budgets.map(b => ({
        user_id: userId,
        label: b.label,
        limit: b.limit,
        spent: b.spent,
        status: b.status
      }));
      await supabaseClient.from('budgets').delete().eq('user_id', userId);
      await supabaseClient.from('budgets').insert(rows);
    } else if (type === 'portfolio') {
      await supabaseClient.from('portfolio_state').upsert({
        user_id: userId,
        cash_balance: state.portfolioCash,
        holdings: state.portfolioHoldings,
        trades: state.portfolioTrades
      });
    }
  } catch (e) {
    console.error('Supabase DB Sync Error:', e);
  }
}

function closeProfileMenu() {
  const profileMenu = document.getElementById('profileMenu');
  const profileMenuButton = document.getElementById('profileMenuButton');
  if (profileMenu && profileMenuButton) {
    profileMenu.hidden = true;
    profileMenuButton.setAttribute('aria-expanded', 'false');
  }
}
