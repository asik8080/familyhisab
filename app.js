(function () {
const SUPABASE_URL = 'https://oidhtcrntwoirwgqksnj.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Ls36tMXF2P0e8enwbrPNCA_STcAhs9u';
const { createClient } = window.supabase;
const rememberMe = document.querySelector('#rememberMe');
rememberMe.checked = localStorage.getItem('familyhisab:remember') === 'true';
rememberMe.addEventListener('change', () => localStorage.setItem('familyhisab:remember', String(rememberMe.checked)));
const authStorage = {
  getItem(key) {
    return (rememberMe.checked ? localStorage : sessionStorage).getItem(key);
  },
  setItem(key, value) {
    const selectedStorage = rememberMe.checked ? localStorage : sessionStorage;
    const otherStorage = rememberMe.checked ? sessionStorage : localStorage;
    selectedStorage.setItem(key, value);
    otherStorage.removeItem(key);
  },
  removeItem(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};
const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, { auth: { storage: authStorage } });

const authView = document.querySelector('#authView');
const dashboardView = document.querySelector('#dashboardView');
const authForm = document.querySelector('#authForm');
const authMessage = document.querySelector('#authMessage');
const authSubmit = document.querySelector('#authSubmit');
const signupFields = document.querySelector('#signupFields');
const signupDetails = document.querySelector('#signupDetails');
const confirmPasswordField = document.querySelector('#confirmPasswordField');
const signupLoginPrompt = document.querySelector('#signupLoginPrompt');
const signupLoginLink = document.querySelector('#signupLoginLink');
const passwordField = document.querySelector('#passwordField');
const authOptions = document.querySelector('#authOptions');
const forgotPasswordLink = document.querySelector('#forgotPasswordLink');
const backToSignIn = document.querySelector('#backToSignIn');
const getCodeButton = document.querySelector('#getCodeButton');
const resetCodeField = document.querySelector('#resetCodeField');
const resetCodeInput = document.querySelector('#resetCodeInput');
const confirmCodeButton = document.querySelector('#confirmCodeButton');
const newPasswordFields = document.querySelector('#newPasswordFields');
const newPasswordInput = document.querySelector('#newPasswordInput');
const confirmPasswordInput = document.querySelector('#confirmPasswordInput');
const signInTab = document.querySelector('#signInTab');
const signUpTab = document.querySelector('#signUpTab');
const expenseForm = document.querySelector('#expenseForm');
const expenseMessage = document.querySelector('#expenseMessage');
const expenseSubmit = document.querySelector('#expenseSubmit');
const expensesTableBody = document.querySelector('#expensesTableBody');
const expensesEmpty = document.querySelector('#expensesEmpty');
const expenseDate = document.querySelector('#expenseDate');
const expenseMemoDate = document.querySelector('#expenseMemoDate');
const profileButton = document.querySelector('#profileButton');
const profileDropdown = document.querySelector('#profileDropdown');
const profileModal = document.querySelector('#profileModal');
const profileForm = document.querySelector('#profileForm');
const profileMessage = document.querySelector('#profileMessage');
const saveProfileButton = document.querySelector('#saveProfileButton');
const profileAvatarPreview = document.querySelector('#profileAvatarPreview');
const avatarInput = document.querySelector('#avatarInput');
const firstNameInput = document.querySelector('#firstNameInput');
const lastNameInput = document.querySelector('#lastNameInput');
const familyNameInput = document.querySelector('#familyNameInput');
const birthDateInput = document.querySelector('#birthDateInput');
const phoneInput = document.querySelector('#phoneInput');
const maritalStatusInput = document.querySelector('#maritalStatusInput');
const nationalityInput = document.querySelector('#nationalityInput');
const idCardInput = document.querySelector('#idCardInput');
const signupConfirmPasswordInput = document.querySelector('#signupConfirmPasswordInput');
const dashboardMain = document.querySelector('#dashboardMain');
const expenseTypesView = document.querySelector('#expenseTypesView');
const expenseTypeModal = document.querySelector('#expenseTypeModal');
const expenseTypeForm = document.querySelector('#expenseTypeForm');
const expenseTypeName = document.querySelector('#expenseTypeName');
const expenseTypeDescription = document.querySelector('#expenseTypeDescription');
const expenseTypeSearch = document.querySelector('#expenseTypeSearch');
const expenseTypesTableBody = document.querySelector('#expenseTypesTableBody');
const expenseTypesEmpty = document.querySelector('#expenseTypesEmpty');
const expenseTypeModalTitle = document.querySelector('#expenseTypeModalTitle');
const expenseMemoView = document.querySelector('#expenseMemoView');
const expenseMemoForm = document.querySelector('#expenseMemoForm');
const memoRows = document.querySelector('#memoRows');
const memoTotal = document.querySelector('#memoTotal');
const allExpensesView = document.querySelector('#allExpensesView');
const allExpensesTableBody = document.querySelector('#allExpensesTableBody');
const allExpensesEmpty = document.querySelector('#allExpensesEmpty');
const allExpensesSearch = document.querySelector('#allExpensesSearch');
const expenseDateFilter = document.querySelector('#expenseDateFilter');
const expenseTypeFilter = document.querySelector('#expenseTypeFilter');
const expensePageSize = document.querySelector('#expensePageSize');
const expensePageLabel = document.querySelector('#expensePageLabel');
const expensePrevPage = document.querySelector('#expensePrevPage');
const expenseNextPage = document.querySelector('#expenseNextPage');
let authMode = 'signIn';
let currentUser = null;
let currentProfile = null;
let expensesChannel = null;
let resetStep = 'requestCode';
let editingExpenseTypeId = null;
let allExpenses = [];
let allExpensesPage = 1;
let showingDeletedExpenses = false;
let memoRowId = 0;
let editingExpenseId = null;
let expenseTypes = JSON.parse(localStorage.getItem('familyhisab:expense-types') || 'null') || [
  { id: 'ET-001', name: 'Groceries', description: 'Daily household food and market expenses.', deleted: false },
  { id: 'ET-002', name: 'Mobile Bill', description: 'Monthly mobile recharge and phone bills.', deleted: false },
  { id: 'ET-003', name: 'Transportation', description: 'Bus, rideshare, fuel, and travel costs.', deleted: false },
];

function formatCurrency(amount) {
  return `BDT ${Number(amount || 0).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function saveExpenseTypes() {
  localStorage.setItem('familyhisab:expense-types', JSON.stringify(expenseTypes));
}

function renderExpenseTypes() {
  const query = expenseTypeSearch.value.trim().toLowerCase();
  const visibleTypes = expenseTypes.filter((type) => !type.deleted && `${type.name} ${type.description}`.toLowerCase().includes(query));
  expenseTypesTableBody.innerHTML = visibleTypes.map((type) => `<tr class="transition hover:bg-slate-50"><td class="px-5 py-4 text-xs font-semibold text-slate-500">${escapeHtml(type.id)}</td><td class="px-5 py-4 text-sm font-semibold text-slate-800">${escapeHtml(type.name)}</td><td class="max-w-md px-5 py-4 text-sm text-slate-500">${escapeHtml(type.description || 'No description')}</td><td class="px-5 py-4 text-right"><div class="inline-flex items-center gap-1"><button type="button" data-edit-expense-type="${escapeHtml(type.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600" aria-label="Edit ${escapeHtml(type.name)}"><i data-lucide="pencil" class="h-4 w-4"></i></button><button type="button" data-delete-expense-type="${escapeHtml(type.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600" aria-label="Delete ${escapeHtml(type.name)}"><i data-lucide="trash-2" class="h-4 w-4"></i></button></div></td></tr>`).join('');
  expenseTypesEmpty.classList.toggle('hidden', visibleTypes.length > 0);
  expenseTypesTableBody.querySelectorAll('[data-edit-expense-type]').forEach((button) => button.addEventListener('click', () => openExpenseTypeModal(button.dataset.editExpenseType)));
  expenseTypesTableBody.querySelectorAll('[data-delete-expense-type]').forEach((button) => button.addEventListener('click', () => {
    const type = expenseTypes.find((item) => item.id === button.dataset.deleteExpenseType);
    if (!type || !window.confirm(`Move "${type.name}" to deleted expense types?`)) return;
    type.deleted = true;
    saveExpenseTypes();
    renderExpenseTypes();
  }));
  if (window.lucide) lucide.createIcons();
}

function setExpenseTypesView(isVisible) {
  dashboardMain.classList.toggle('hidden', isVisible);
  expenseTypesView.classList.toggle('hidden', !isVisible);
  if (isVisible) renderExpenseTypes();
}

function openExpenseTypeModal(typeId = null) {
  editingExpenseTypeId = typeId;
  const type = expenseTypes.find((item) => item.id === typeId);
  expenseTypeModalTitle.textContent = type ? 'Edit Expense Type' : 'Add New Expense Type';
  expenseTypeName.value = type?.name || '';
  expenseTypeDescription.value = type?.description || '';
  expenseTypeModal.classList.remove('hidden');
  expenseTypeModal.classList.add('flex');
  expenseTypeName.focus();
}

function closeExpenseTypeModal() {
  expenseTypeModal.classList.add('hidden');
  expenseTypeModal.classList.remove('flex');
  expenseTypeForm.reset();
  editingExpenseTypeId = null;
  expenseTypeModalTitle.textContent = 'Add New Expense Type';
}

function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `fixed right-5 top-5 z-[70] rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-xl ${isError ? 'bg-rose-600' : 'bg-emerald-600'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function setAppView(view) {
  showingDeletedExpenses = view === 'deleted';
  dashboardMain.classList.toggle('hidden', view !== 'dashboard');
  expenseMemoView.classList.toggle('hidden', view !== 'memo');
  allExpensesView.classList.toggle('hidden', view !== 'all' && view !== 'deleted');
  expenseTypesView.classList.toggle('hidden', view !== 'types');
  if (view === 'memo' && !memoRows.children.length) addMemoRow();
  if (view === 'all' || view === 'deleted') loadAllExpenses(view === 'deleted');
}

function renderMemoTotal() {
  const total = [...memoRows.querySelectorAll('[data-memo-row]')].reduce((sum, row) => sum + (Number(row.querySelector('[data-field="quantity"]').value) || 0) * (Number(row.querySelector('[data-field="unit-price"]').value) || 0), 0);
  memoTotal.textContent = `৳ ${total.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function addMemoRow(values = {}) {
  memoRowId += 1;
  const row = document.createElement('div');
  row.dataset.memoRow = String(memoRowId);
  row.className = 'grid gap-3 px-5 py-5 sm:grid-cols-[2fr_1.3fr_0.8fr_0.7fr_1fr_auto] sm:items-end';
  row.innerHTML = `<div><label class="mb-2 block text-xs font-semibold text-slate-600">Item name</label><input data-field="name" required value="${escapeHtml(values.name || '')}" placeholder="Rui Fish" class="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm" /></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Expense type</label><input data-field="expense-type" required value="${escapeHtml(values.expenseType || '')}" placeholder="Food & Groceries" class="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm" /></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Unit</label><input data-field="unit" required value="${escapeHtml(values.unit || 'pcs')}" placeholder="kg" class="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm" /></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Quantity</label><input data-field="quantity" required min="0.001" step="0.001" type="number" value="${values.quantity || 1}" class="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm" /></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Unit price</label><input data-field="unit-price" required min="0.01" step="0.01" type="number" value="${values.unitPrice || ''}" placeholder="0.00" class="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm" /></div><button type="button" data-remove-memo-row class="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="Remove item"><i data-lucide="trash-2" class="h-4 w-4"></i></button>`;
  row.querySelectorAll('input').forEach((input) => input.addEventListener('input', renderMemoTotal));
  row.querySelector('[data-remove-memo-row]').addEventListener('click', () => { if (memoRows.children.length > 1) row.remove(); renderMemoTotal(); });
  memoRows.appendChild(row);
  if (window.lucide) lucide.createIcons();
  renderMemoTotal();
}

function formatTaka(amount) {
  return `৳ ${Number(amount || 0).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getFilteredAllExpenses() {
  const query = allExpensesSearch.value.trim().toLowerCase();
  const type = expenseTypeFilter.value;
  const now = new Date();
  return allExpenses.filter((expense) => {
    const date = new Date(`${expense.expense_date}T00:00:00`);
    const matchesText = !query || `${expense.item_name || expense.title} ${expense.note || ''}`.toLowerCase().includes(query);
    const matchesType = type === 'all' || expense.expense_type === type;
    let matchesDate = true;
    if (expenseDateFilter.value === 'today') matchesDate = date.toDateString() === now.toDateString();
    if (expenseDateFilter.value === 'month') matchesDate = date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    if (expenseDateFilter.value === 'week') matchesDate = (now - date) / 86400000 < 7 && date <= now;
    return matchesText && matchesType && matchesDate;
  });
}

function renderAllExpenses() {
  const filtered = getFilteredAllExpenses();
  const pageSize = Number(expensePageSize.value);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  allExpensesPage = Math.min(allExpensesPage, totalPages);
  const pageRows = filtered.slice((allExpensesPage - 1) * pageSize, allExpensesPage * pageSize);
  const expenseAction = showingDeletedExpenses
    ? (expense) => `<button type="button" data-restore-all-expense="${expense.id}" class="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" aria-label="Restore expense"><i data-lucide="undo-2" class="h-4 w-4"></i></button>`
    : (expense) => `<button type="button" data-edit-all-expense="${expense.id}" class="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600" aria-label="Edit expense"><i data-lucide="pencil" class="h-4 w-4"></i></button><button type="button" data-delete-all-expense="${expense.id}" class="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600" aria-label="Delete expense"><i data-lucide="trash-2" class="h-4 w-4"></i></button>`;
  allExpensesTableBody.innerHTML = pageRows.map((expense) => `<tr class="transition hover:bg-slate-50"><td class="px-5 py-4 text-sm text-slate-600">${new Date(`${expense.expense_date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td><td class="px-5 py-4"><p class="text-sm font-semibold text-slate-800">${escapeHtml(expense.item_name || expense.title)}</p><p class="mt-1 text-xs text-slate-400">${escapeHtml(expense.quantity || 1)} ${escapeHtml(expense.unit || 'pcs')}${expense.note ? ` · ${escapeHtml(expense.note)}` : ''}</p></td><td class="px-5 py-4"><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">${escapeHtml(expense.expense_type || expense.category || 'All Cost')}</span></td><td class="px-5 py-4 text-sm text-slate-600">${formatTaka(expense.unit_price || expense.amount)}</td><td class="px-5 py-4 font-['Space_Grotesk'] text-sm font-bold text-slate-900">${formatTaka(expense.total_amount || expense.amount)}</td><td class="px-5 py-4 text-sm text-slate-600">${escapeHtml(expense.added_by || 'You')}</td><td class="px-5 py-4 text-right">${expenseAction(expense)}</td></tr>`).join('');
  allExpensesEmpty.classList.toggle('hidden', pageRows.length > 0);
  document.querySelector('#allExpensesMonthlyTotal').textContent = formatTaka(allExpenses.filter((expense) => new Date(expense.expense_date).getMonth() === new Date().getMonth()).reduce((sum, expense) => sum + Number(expense.total_amount || expense.amount || 0), 0));
  document.querySelector('#allExpensesTransactionCount').textContent = allExpenses.length;
  expensePageLabel.textContent = `Page ${allExpensesPage} of ${totalPages}`;
  expensePrevPage.disabled = allExpensesPage === 1;
  expenseNextPage.disabled = allExpensesPage === totalPages;
  allExpensesTableBody.querySelectorAll('[data-delete-all-expense]').forEach((button) => button.addEventListener('click', () => softDeleteExpense(button.dataset.deleteAllExpense)));
  allExpensesTableBody.querySelectorAll('[data-restore-all-expense]').forEach((button) => button.addEventListener('click', () => restoreExpense(button.dataset.restoreAllExpense)));
  allExpensesTableBody.querySelectorAll('[data-edit-all-expense]').forEach((button) => button.addEventListener('click', () => {
    const expense = allExpenses.find((item) => item.id === button.dataset.editAllExpense);
    if (!expense) return;
    editingExpenseId = expense.id;
    memoRows.innerHTML = '';
    addMemoRow({ name: expense.item_name || expense.title, expenseType: expense.expense_type || expense.category, unit: expense.unit, quantity: expense.quantity, unitPrice: expense.unit_price || expense.amount });
    window.location.hash = '#expense/add';
    setAppView('memo');
  }));
  if (window.lucide) lucide.createIcons();
}

async function loadAllExpenses(includeDeleted = false) {
  if (!currentUser) return;
  const { data, error } = await supabase.from('expenses').select('id, expense_date, item_name, title, expense_type, category, unit, quantity, unit_price, total_amount, amount, note, user_id').eq('user_id', currentUser.id).eq('is_deleted', includeDeleted).order('expense_date', { ascending: false });
  if (error) { showToast(error.message, true); return; }
  allExpenses = data || [];
  allExpensesPage = 1;
  renderAllExpenses();
}

async function softDeleteExpense(expenseId) {
  const previous = allExpenses;
  allExpenses = allExpenses.filter((expense) => expense.id !== expenseId);
  renderAllExpenses();
  const { error } = await supabase.from('expenses').update({ is_deleted: true }).eq('id', expenseId).eq('user_id', currentUser.id);
  if (error) { allExpenses = previous; renderAllExpenses(); showToast(error.message, true); return; }
  showToast('Expense moved to Deleted Expenses.');
}

async function restoreExpense(expenseId) {
  const previous = allExpenses;
  allExpenses = allExpenses.filter((expense) => expense.id !== expenseId);
  renderAllExpenses();
  const { error } = await supabase.from('expenses').update({ is_deleted: false }).eq('id', expenseId).eq('user_id', currentUser.id);
  if (error) { allExpenses = previous; renderAllExpenses(); showToast(error.message, true); return; }
  showToast('Expense restored successfully.');
}

function showExpenseMessage(message, isError = false) {
  expenseMessage.textContent = message;
  expenseMessage.className = `rounded-xl px-3 py-2 text-xs leading-5 ${isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`;
}

function getInitials(name) {
  return (name || 'User').trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

function updateProfileUI(profile) {
  const displayName = profile.name || currentUser?.user_metadata?.name || 'Family member';
  const email = profile.email || currentUser?.email || '';
  const initials = getInitials(displayName);
  const avatarImage = profile.avatar_url ? `<img src="${escapeHtml(profile.avatar_url)}" alt="${escapeHtml(displayName)}" class="h-full w-full object-cover">` : initials;
  const headerAvatar = profileButton.children[0];
  headerAvatar.innerHTML = avatarImage;
  headerAvatar.className = 'grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-[#e6d8ca] text-xs font-bold text-[#674a39]';
  profileButton.children[1].querySelector('span:first-child').textContent = displayName;
  document.querySelector('#dropdownName').textContent = displayName;
  document.querySelector('#dropdownEmail').textContent = email;
  profileAvatarPreview.innerHTML = profile.avatar_url ? `<img src="${escapeHtml(profile.avatar_url)}" alt="${escapeHtml(displayName)}" class="h-full w-full object-cover">` : initials;
  document.querySelector('#profileNameInput').value = displayName;
  document.querySelector('#profilePhoneInput').value = profile.phone || '';
  document.querySelector('#profileEmailInput').value = email;
}

async function loadProfile() {
  if (!currentUser) return;
  const { data, error } = await supabase.from('users').select('id, name, email, phone, avatar_url').eq('id', currentUser.id).maybeSingle();
  if (error) {
    showProfileMessage(error.message, true);
    return;
  }
  if (data) {
    currentProfile = data;
  } else {
    currentProfile = { id: currentUser.id, name: currentUser.user_metadata?.name || '', email: currentUser.email || '', phone: '', avatar_url: '' };
    const { error: profileInsertError } = await supabase.from('users').upsert(currentProfile, { onConflict: 'id' });
    if (profileInsertError) showProfileMessage(profileInsertError.message, true);
  }
  updateProfileUI(currentProfile);
}

async function syncSignupProfile(user) {
  const metadata = user?.user_metadata || {};
  if (!metadata.first_name && !metadata.last_name && !metadata.family_name) return;
  const { error } = await supabase.from('users').upsert({
    id: user.id,
    name: metadata.name || `${metadata.first_name || ''} ${metadata.last_name || ''}`.trim(),
    first_name: metadata.first_name || '',
    last_name: metadata.last_name || '',
    email: user.email || '',
    family_name: metadata.family_name || '',
    birth_date: metadata.birth_date || null,
    phone: metadata.phone || '',
    marital_status: metadata.marital_status || '',
    nationality: metadata.nationality || 'Bangladeshi',
    id_card: metadata.id_card || null,
  }, { onConflict: 'id' });
  if (error) showProfileMessage(`Profile sync failed: ${error.message}`, true);
}

function showProfileMessage(message, isError = false) {
  profileMessage.textContent = message;
  profileMessage.className = `rounded-xl px-3 py-2 text-xs leading-5 ${isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`;
}

function setProfileModal(isOpen) {
  profileModal.classList.toggle('hidden', !isOpen);
  profileModal.classList.toggle('flex', isOpen);
  if (isOpen) profileDropdown.classList.add('hidden');
}

async function uploadAvatar(file) {
  if (!currentUser || !file) return null;
  const extension = file.name.split('.').pop().toLowerCase();
  const path = `${currentUser.id}/avatar.${extension}`;
  const { error } = await supabase.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type, cacheControl: '3600' });
  if (error) throw error;
  return `${supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl}?v=${Date.now()}`;
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
  const { data, error } = await supabase.from('expenses').select('id, title, amount, category, expense_date, created_at').eq('user_id', currentUser.id).eq('is_deleted', false).order('expense_date', { ascending: false }).order('created_at', { ascending: false });
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
  const isReset = mode === 'reset';
  resetStep = 'requestCode';
  signupFields.classList.toggle('hidden', !isSignUp);
  signupDetails.classList.toggle('hidden', !isSignUp);
  confirmPasswordField.classList.toggle('hidden', !isSignUp);
  signupLoginPrompt.classList.toggle('hidden', !isSignUp);
  passwordField.classList.toggle('hidden', isReset);
  authOptions.classList.toggle('hidden', isSignUp || isReset);
  backToSignIn.classList.toggle('hidden', !isReset);
  getCodeButton.classList.toggle('hidden', !isReset);
  resetCodeField.classList.add('hidden');
  newPasswordFields.classList.add('hidden');
  authSubmit.classList.toggle('hidden', isReset);
  const passwordInput = document.querySelector('#passwordInput');
  passwordInput.required = !isReset;
  [firstNameInput, lastNameInput, familyNameInput, birthDateInput, phoneInput, maritalStatusInput, nationalityInput].forEach((input) => { input.required = isSignUp; });
  signupConfirmPasswordInput.required = isSignUp;
  passwordInput.setAttribute('autocomplete', isSignUp ? 'new-password' : 'current-password');
  authSubmit.childNodes[0].textContent = isReset ? 'Send reset link ' : isSignUp ? 'Create account ' : 'Sign In ';
  authSubmit.classList.toggle('bg-navy', !isSignUp);
  authSubmit.classList.toggle('bg-[#0088ff]', isSignUp);
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
    expenseMemoDate.value = new Date().toISOString().slice(0, 10);
    await syncSignupProfile(currentUser);
    await loadProfile();
    await loadExpenses();
    subscribeToExpenses();
    const route = window.location.hash;
    setAppView(route === '#expense-types' ? 'types' : route === '#expenses/all' ? 'all' : route === '#deleted-expenses' ? 'deleted' : route === '#expense/add' ? 'memo' : 'dashboard');
  } else {
    unsubscribeFromExpenses();
  }
}

signInTab.addEventListener('click', () => setAuthMode('signIn'));
signUpTab.addEventListener('click', () => setAuthMode('signUp'));
forgotPasswordLink.addEventListener('click', () => setAuthMode('reset'));
backToSignIn.addEventListener('click', () => setAuthMode('signIn'));
signupLoginLink.addEventListener('click', () => setAuthMode('signIn'));

document.querySelectorAll('[data-password-toggle]').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const input = document.querySelector(`#${toggle.dataset.passwordToggle}`);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    toggle.innerHTML = `<i data-lucide="${isPassword ? 'eye-off' : 'eye'}" class="h-4 w-4"></i>`;
    lucide.createIcons();
  });
});

setAuthMode('signIn');

getCodeButton.addEventListener('click', async () => {
  const email = document.querySelector('#emailInput').value.trim();
  if (!email) {
    showMessage('Enter your email address first.', true);
    return;
  }
  getCodeButton.disabled = true;
  authMessage.classList.add('hidden');
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  getCodeButton.disabled = false;
  if (error) {
    showMessage(error.message, true);
    return;
  }
  resetCodeField.classList.remove('hidden');
  showMessage('A verification code has been sent to your email.');
});

confirmCodeButton.addEventListener('click', async () => {
  const email = document.querySelector('#emailInput').value.trim();
  const token = resetCodeInput.value.trim();
  if (!token) {
    showMessage('Enter the verification code from your email.', true);
    return;
  }
  confirmCodeButton.disabled = true;
  const { error } = await supabase.auth.verifyOtp({ email, token, type: 'recovery' });
  confirmCodeButton.disabled = false;
  if (error) {
    showMessage(error.message, true);
    return;
  }
  resetStep = 'changePassword';
  resetCodeField.classList.add('hidden');
  newPasswordFields.classList.remove('hidden');
  authSubmit.classList.remove('hidden');
  authSubmit.childNodes[0].textContent = 'Change password ';
  showMessage('Code confirmed. Enter and confirm your new password.');
});

authForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (authMode === 'reset') {
    if (resetStep !== 'changePassword') return;
    const newPassword = newPasswordInput.value;
    if (newPassword.length < 6) {
      showMessage('New password must be at least 6 characters.', true);
      return;
    }
    if (newPassword !== confirmPasswordInput.value) {
      showMessage('New password and confirm password do not match.', true);
      return;
    }
    authSubmit.disabled = true;
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    authSubmit.disabled = false;
    if (error) {
      showMessage(error.message, true);
      return;
    }
    setAuthMode('signIn');
    showMessage('Password changed successfully. You can now sign in with your new password.');
    return;
  }
  authSubmit.disabled = true;
  authMessage.classList.add('hidden');
  const email = document.querySelector('#emailInput').value.trim();
  const password = document.querySelector('#passwordInput').value;
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const fullName = `${firstName} ${lastName}`.trim();
  const confirmPassword = signupConfirmPasswordInput.value;
  let result;

  if (authMode === 'signUp') {
    if (password !== confirmPassword) {
      authSubmit.disabled = false;
      showMessage('Password and confirm password do not match.', true);
      return;
    }
    const profilePayload = { name: fullName, first_name: firstName, last_name: lastName, email, family_name: familyNameInput.value.trim(), birth_date: birthDateInput.value, phone: phoneInput.value.trim(), marital_status: maritalStatusInput.value, nationality: nationalityInput.value.trim(), id_card: idCardInput.value.trim() || null };
    result = await supabase.auth.signUp({ email, password, options: { data: profilePayload } });
    if (!result.error && result.data.user && result.data.session) {
      const { error: profileError } = await supabase.from('users').upsert({ id: result.data.user.id, ...profilePayload }, { onConflict: 'id' });
      if (profileError) {
        authSubmit.disabled = false;
        showMessage(`Account created, but profile could not be saved: ${profileError.message}`, true);
        return;
      }
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

profileButton.addEventListener('click', (event) => {
  event.stopPropagation();
  profileDropdown.classList.toggle('hidden');
  profileButton.setAttribute('aria-expanded', String(!profileDropdown.classList.contains('hidden')));
});

document.querySelector('#openProfileButton').addEventListener('click', () => setProfileModal(true));
document.querySelector('#closeProfileModal').addEventListener('click', () => setProfileModal(false));
document.querySelector('#cancelProfileButton').addEventListener('click', () => setProfileModal(false));
profileModal.addEventListener('click', (event) => {
  if (event.target === profileModal) setProfileModal(false);
});
document.addEventListener('click', (event) => {
  if (!profileDropdown.contains(event.target) && !profileButton.contains(event.target)) {
    profileDropdown.classList.add('hidden');
    profileButton.setAttribute('aria-expanded', 'false');
  }
});

document.querySelector('#dropdownLogoutButton').addEventListener('click', async () => {
  await supabase.auth.signOut();
  currentUser = null;
  profileDropdown.classList.add('hidden');
  showDashboard(false);
});

avatarInput.addEventListener('change', async () => {
  const file = avatarInput.files[0];
  if (!file) return;
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    showProfileMessage('Please choose a PNG, JPG, or WEBP image.', true);
    return;
  }
  try {
    profileAvatarPreview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Selected avatar" class="h-full w-full object-cover">`;
    showProfileMessage('Uploading avatar...');
    const avatarUrl = await uploadAvatar(file);
    const { error } = await supabase.from('users').upsert({ id: currentUser.id, name: currentProfile.name || currentUser.user_metadata?.name || 'Family member', email: currentUser.email, phone: currentProfile.phone || '', avatar_url: avatarUrl }, { onConflict: 'id' });
    if (error) throw error;
    currentProfile = { ...currentProfile, avatar_url: avatarUrl };
    updateProfileUI(currentProfile);
    showProfileMessage('Avatar updated.');
  } catch (error) {
    showProfileMessage(`Avatar upload failed: ${error.message}`, true);
  } finally {
    avatarInput.value = '';
  }
});

profileForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  saveProfileButton.disabled = true;
  profileMessage.classList.add('hidden');
  const name = document.querySelector('#profileNameInput').value.trim();
  const phone = document.querySelector('#profilePhoneInput').value.trim();
  const { data, error } = await supabase.from('users').upsert({ id: currentUser.id, name, email: currentUser.email, phone, avatar_url: currentProfile?.avatar_url || null }, { onConflict: 'id' }).select('id, name, email, phone, avatar_url').single();
  saveProfileButton.disabled = false;
  if (error) {
    showProfileMessage(error.message, true);
    return;
  }
  currentProfile = data;
  updateProfileUI(currentProfile);
  showProfileMessage('Profile saved successfully.');
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

const expensesToggle = document.querySelector('#expensesToggle');
const expensesSubmenu = document.querySelector('#expensesSubmenu');
const expensesChevron = expensesToggle.querySelector('.expenses-chevron');
const expenseLinks = document.querySelectorAll('.expense-subitem');

function setExpensesExpanded(isExpanded) {
  expensesToggle.setAttribute('aria-expanded', String(isExpanded));
  expensesSubmenu.classList.toggle('grid-rows-[1fr]', isExpanded);
  expensesSubmenu.classList.toggle('grid-rows-[0fr]', !isExpanded);
  expensesChevron.classList.toggle('rotate-180', isExpanded);
}

function setActiveExpenseLink(activeLink) {
  expenseLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle('bg-slate-100', isActive);
    link.classList.toggle('font-semibold', isActive);
    link.classList.toggle('text-slate-900', isActive);
    link.classList.toggle('text-slate-600', !isActive);
    link.querySelector('.active-indicator').classList.toggle('opacity-0', !isActive);
  });
}

document.querySelector('#openSidebar').addEventListener('click', () => setSidebar(true));
document.querySelector('#closeSidebar').addEventListener('click', () => setSidebar(false));
document.querySelector('#mobileOverlay').addEventListener('click', () => setSidebar(false));
expensesToggle.addEventListener('click', () => setExpensesExpanded(expensesToggle.getAttribute('aria-expanded') !== 'true'));
expenseLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveExpenseLink(link);
    setExpensesExpanded(true);
    const view = link.dataset.expenseLink === 'types' ? 'types' : link.dataset.expenseLink === 'all' ? 'all' : link.dataset.expenseLink === 'deleted' ? 'deleted' : link.dataset.expenseLink === 'add' ? 'memo' : 'dashboard';
    window.location.hash = link.getAttribute('href');
    setAppView(view);
    setSidebar(false);
  });
});
document.querySelector('#expenseTypesBack').addEventListener('click', () => {
  setAppView('dashboard');
  window.location.hash = '#dashboard';
});
document.querySelector('#addExpenseTypeButton').addEventListener('click', () => openExpenseTypeModal());
document.querySelector('#closeExpenseTypeModal').addEventListener('click', closeExpenseTypeModal);
document.querySelector('#resetExpenseType').addEventListener('click', () => {
  expenseTypeForm.reset();
  expenseTypeName.focus();
});
expenseTypeModal.addEventListener('click', (event) => {
  if (event.target === expenseTypeModal) closeExpenseTypeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !expenseTypeModal.classList.contains('hidden')) closeExpenseTypeModal();
});
expenseTypeSearch.addEventListener('input', renderExpenseTypes);
expenseTypeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = expenseTypeName.value.trim();
  const description = expenseTypeDescription.value.trim();
  if (!name) return;
  if (editingExpenseTypeId) {
    const type = expenseTypes.find((item) => item.id === editingExpenseTypeId);
    if (type) Object.assign(type, { name, description });
  } else {
    expenseTypes.push({ id: `ET-${String(expenseTypes.length + 1).padStart(3, '0')}`, name, description, deleted: false });
  }
  saveExpenseTypes();
  renderExpenseTypes();
  closeExpenseTypeModal();
});
document.querySelector('#addMemoRow').addEventListener('click', () => addMemoRow());
document.querySelector('#memoBackButton').addEventListener('click', () => { window.location.hash = '#dashboard'; setAppView('dashboard'); });
document.querySelector('#newExpenseButton').addEventListener('click', () => { window.location.hash = '#expense/add'; setAppView('memo'); });
expenseMemoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!currentUser) return showToast('Please sign in before saving an invoice.', true);
  const rows = [...memoRows.querySelectorAll('[data-memo-row]')].map((row) => ({ item_name: row.querySelector('[data-field="name"]').value.trim(), expense_type: row.querySelector('[data-field="expense-type"]').value.trim(), unit: row.querySelector('[data-field="unit"]').value.trim(), quantity: Number(row.querySelector('[data-field="quantity"]').value), unit_price: Number(row.querySelector('[data-field="unit-price"]').value) }));
  if (rows.some((row) => !row.item_name || !row.expense_type || !row.unit || !Number.isFinite(row.quantity) || row.quantity <= 0 || !Number.isFinite(row.unit_price) || row.unit_price <= 0)) return showToast('Please complete every item with a valid name, quantity, unit, and price.', true);
  const saveButton = document.querySelector('#saveInvoiceButton');
  saveButton.disabled = true;
  const { error } = editingExpenseId
    ? await supabase.from('expenses').update({ ...rows[0], total_amount: rows[0].quantity * rows[0].unit_price }).eq('id', editingExpenseId).eq('user_id', currentUser.id)
    : await supabase.from('expenses').insert(rows.map((row) => {
      const totalAmount = row.quantity * row.unit_price;
      return { ...row, user_id: currentUser.id, title: row.item_name, amount: totalAmount, category: row.expense_type, expense_date: expenseMemoDate.value, total_amount: totalAmount, is_deleted: false };
    }));
  saveButton.disabled = false;
  if (error) return showToast(error.message, true);
  showToast('Invoice saved successfully!');
  expenseMemoForm.reset();
  memoRows.innerHTML = '';
  addMemoRow();
  editingExpenseId = null;
  window.location.hash = '#expenses/all';
  setAppView('all');
});
[allExpensesSearch, expenseDateFilter, expenseTypeFilter, expensePageSize].forEach((control) => control.addEventListener('input', () => { allExpensesPage = 1; renderAllExpenses(); }));
expensePrevPage.addEventListener('click', () => { if (allExpensesPage > 1) { allExpensesPage -= 1; renderAllExpenses(); } });
expenseNextPage.addEventListener('click', () => { const totalPages = Math.max(1, Math.ceil(getFilteredAllExpenses().length / Number(expensePageSize.value))); if (allExpensesPage < totalPages) { allExpensesPage += 1; renderAllExpenses(); } });
document.querySelector('#exportExpensesButton').addEventListener('click', () => {
  const rows = getFilteredAllExpenses();
  const csv = [['Date', 'Item', 'Expense Type', 'Unit Price', 'Total Amount'], ...rows.map((expense) => [expense.expense_date, expense.item_name || expense.title, expense.expense_type || expense.category, expense.unit_price || expense.amount, expense.total_amount || expense.amount])].map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  link.download = 'all-expenses.csv';
  link.click();
  URL.revokeObjectURL(link.href);
});
document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((navItem) => {
      navItem.classList.remove('bg-navy', 'text-white', 'shadow-lg', 'shadow-navy/10');
      navItem.classList.add('text-slate-500');
    });
    item.classList.add('bg-navy', 'text-white', 'shadow-lg', 'shadow-navy/10');
    item.classList.remove('text-slate-500');
    setAppView('dashboard');
    setSidebar(false);
  });
});

if (window.lucide) lucide.createIcons();
})();