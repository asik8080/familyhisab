(function () {
const SUPABASE_URL = 'https://oidhtcrntwoirwgqksnj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Ls36tMXF2P0e8enwbrPNCA_STcAhs9u';
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

const authView = document.querySelector('#authView');
const dashboardView = document.querySelector('#dashboardView');
const authForm = document.querySelector('#authForm');
const authMessage = document.querySelector('#authMessage');
const authSubmit = document.querySelector('#authSubmit');
const nameField = document.querySelector('#nameField');
const signInTab = document.querySelector('#signInTab');
const signUpTab = document.querySelector('#signUpTab');
const expenseForm = document.querySelector('#expenseForm');
const expenseMessage = document.querySelector('#expenseMessage');
const expenseSubmit = document.querySelector('#expenseSubmit');
const expensesTableBody = document.querySelector('#expensesTableBody');
const expensesEmpty = document.querySelector('#expensesEmpty');
const expenseDate = document.querySelector('#expenseDate');
let authMode = 'signIn';
let currentUser = null;
let expensesChannel = null;

function formatCurrency(amount) {
  return `BDT ${Number(amount || 0).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function showExpenseMessage(message, isError = false) {
  expenseMessage.textContent = message;
  expenseMessage.className = `rounded-xl px-3 py-2 text-xs leading-5 ${isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`;
}

function renderExpenses(expenses) {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const monthPrefix = new Date().toISOString().slice(0, 7);
  const monthlyTotal = expenses.filter((expense) => expense.expense_date.startsWith(monthPrefix)).reduce((sum, expense) => sum + Number(expense.amount), 0);
  document.querySelector('#totalExpense').textContent = formatCurrency(total);
  document.querySelector('#monthlyExpense').textContent = formatCurrency(monthlyTotal);
  document.querySelector('#transactionCount').textContent = expenses.length;
  document.querySelector('#transactionCountLabel').textContent = `${expenses.length} ${expenses.length === 1 ? 'entry' : 'entries'}`;
  expensesEmpty.classList.toggle('hidden', expenses.length > 0);
  expensesTableBody.innerHTML = expenses.map((expense) => `<tr><td class="py-4 pr-4"><p class="max-w-[180px] truncate text-sm font-bold text-ink">${escapeHtml(expense.title)}</p><p class="mt-1 text-[11px] text-slate-400">Added ${new Date(expense.created_at).toLocaleDateString('en-GB')}</p></td><td class="py-4 pr-4"><span class="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">${escapeHtml(expense.category)}</span></td><td class="py-4 pr-4 text-xs text-slate-500">${new Date(`${expense.expense_date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td><td class="py-4 pr-4 text-right text-sm font-bold text-ink">${formatCurrency(expense.amount)}</td><td class="py-4 text-right"><button type="button" data-delete-expense="${escapeHtml(expense.id)}" class="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600" aria-label="Delete ${escapeHtml(expense.title)}"><i data-lucide="trash-2" class="h-4 w-4"></i></button></td></tr>`).join('');
  expensesTableBody.querySelectorAll('[data-delete-expense]').forEach((button) => button.addEventListener('click', () => deleteExpense(button.dataset.deleteExpense)));
  if (window.lucide) lucide.createIcons();
}

async function loadExpenses() {
  if (!currentUser) return;
  const { data, error } = await supabase.from('expenses').select('id, title, amount, category, expense_date, created_at').eq('user_id', currentUser.id).order('expense_date', { ascending: false }).order('created_at', { ascending: false });
  if (error) {
    showExpenseMessage(error.message, true);
    return;
  }
  renderExpenses(data || []);
}

async function deleteExpense(expenseId) {
  const { error } = await supabase.from('expenses').delete().eq('id', expenseId).eq('user_id', currentUser.id);
  if (error) {
    showExpenseMessage(error.message, true);
    return;
  }
  await loadExpenses();
}

function subscribeToExpenses() {
  if (expensesChannel || !currentUser) return;
  expensesChannel = supabase.channel(`expenses-${currentUser.id}`).on('postgres_changes', { event: '*', schema: 'public', table: 'expenses', filter: `user_id=eq.${currentUser.id}` }, loadExpenses).subscribe();
}

function unsubscribeFromExpenses() {
  if (expensesChannel) supabase.removeChannel(expensesChannel);
  expensesChannel = null;
}

function showMessage(message, isError = false) {
  authMessage.textContent = message;
  authMessage.className = `rounded-xl px-4 py-3 text-xs leading-5 ${isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`;
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignUp = mode === 'signUp';
  nameField.classList.toggle('hidden', !isSignUp);
  document.querySelector('#passwordInput').setAttribute('autocomplete', isSignUp ? 'new-password' : 'current-password');
  authSubmit.childNodes[0].textContent = isSignUp ? 'Create account ' : 'Sign In ';
  signInTab.className = isSignUp ? 'rounded-lg px-4 py-2.5 text-sm font-bold text-slate-500 transition' : 'rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-sm';
  signUpTab.className = isSignUp ? 'rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-ink shadow-sm' : 'rounded-lg px-4 py-2.5 text-sm font-bold text-slate-500 transition';
  authMessage.classList.add('hidden');
}

async function showDashboard(isVisible, user = currentUser) {
  authView.classList.toggle('hidden', isVisible);
  dashboardView.classList.toggle('hidden', !isVisible);
  if (isVisible) {
    currentUser = user;
    expenseDate.value = new Date().toISOString().slice(0, 10);
    await loadExpenses();
    subscribeToExpenses();
  } else {
    unsubscribeFromExpenses();
  }
}

signInTab.addEventListener('click', () => setAuthMode('signIn'));
signUpTab.addEventListener('click', () => setAuthMode('signUp'));

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  authSubmit.disabled = true;
  authMessage.classList.add('hidden');
  const email = document.querySelector('#emailInput').value.trim();
  const password = document.querySelector('#passwordInput').value;
  const name = document.querySelector('#nameInput').value.trim();
  let result;

  if (authMode === 'signUp') {
    result = await supabase.auth.signUp({ email, password, options: { data: { name } } });
    if (!result.error && result.data.user && result.data.session) {
      await supabase.from('users').upsert({ id: result.data.user.id, name, email }, { onConflict: 'id' });
    }
  } else {
    result = await supabase.auth.signInWithPassword({ email, password });
  }

  authSubmit.disabled = false;
  if (result.error) {
    showMessage(result.error.message, true);
    return;
  }
  if (authMode === 'signUp' && !result.data.session) {
    authMessage.classList.remove('hidden');
    showMessage('Account created. Check your email to confirm, then sign in.');
    return;
  }
  currentUser = result.data.user;
  await showDashboard(true, currentUser);
});

expenseForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!currentUser) return;
  expenseSubmit.disabled = true;
  expenseMessage.classList.add('hidden');
  const { error } = await supabase.from('expenses').insert({
    user_id: currentUser.id,
    title: document.querySelector('#expenseTitle').value.trim(),
    amount: Number(document.querySelector('#expenseAmount').value),
    category: document.querySelector('#expenseCategory').value,
    expense_date: expenseDate.value,
  });
  expenseSubmit.disabled = false;
  if (error) {
    showExpenseMessage(error.message, true);
    return;
  }
  expenseForm.reset();
  expenseDate.value = new Date().toISOString().slice(0, 10);
  await loadExpenses();
});

document.querySelector('#logoutButton').addEventListener('click', async () => {
  await supabase.auth.signOut();
  currentUser = null;
  showDashboard(false);
});

supabase.auth.getSession().then(({ data: { session } }) => {
  currentUser = session?.user || null;
  return showDashboard(Boolean(session), currentUser);
});

supabase.auth.onAuthStateChange((_event, session) => {
  currentUser = session?.user || null;
  showDashboard(Boolean(session), currentUser);
});

function setSidebar(open) {
  document.querySelector('#sidebar').classList.toggle('-translate-x-full', !open);
  document.querySelector('#mobileOverlay').classList.toggle('hidden', !open);
}

document.querySelector('#openSidebar').addEventListener('click', () => setSidebar(true));
document.querySelector('#closeSidebar').addEventListener('click', () => setSidebar(false));
document.querySelector('#mobileOverlay').addEventListener('click', () => setSidebar(false));
document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((navItem) => {
      navItem.classList.remove('bg-navy', 'text-white', 'shadow-lg', 'shadow-navy/10');
      navItem.classList.add('text-slate-500');
    });
    item.classList.add('bg-navy', 'text-white', 'shadow-lg', 'shadow-navy/10');
    item.classList.remove('text-slate-500');
    setSidebar(false);
  });
});

document.querySelector('#profileButton').addEventListener('click', (event) => {
  event.currentTarget.classList.toggle('bg-white');
  event.currentTarget.setAttribute('aria-expanded', event.currentTarget.getAttribute('aria-expanded') !== 'true');
});

if (window.lucide) lucide.createIcons();
})();