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
const profileView = document.querySelector('#profileView');
const expenseTypesView = document.querySelector('#expenseTypesView');
const expenseTypeModal = document.querySelector('#expenseTypeModal');
const expenseTypeForm = document.querySelector('#expenseTypeForm');
const expenseTypeParent = document.querySelector('#expenseTypeParent');
const expenseTypeParentField = document.querySelector('#expenseTypeParentField');
const expenseTypeNameLabel = document.querySelector('#expenseTypeNameLabel');
const expenseTypeName = document.querySelector('#expenseTypeName');
const expenseTypeDescription = document.querySelector('#expenseTypeDescription');
const expenseTypeParentRequired = document.querySelector('#expenseTypeParentRequired');
const expenseTypeParentHint = document.querySelector('#expenseTypeParentHint');
const expenseTypeSearch = document.querySelector('#expenseTypeSearch');
const expenseTypeViewFilter = document.querySelector('#expenseTypeViewFilter');
const expenseTypesTableBody = document.querySelector('#expenseTypesTableBody');
const expenseTypesEmpty = document.querySelector('#expenseTypesEmpty');
const expenseTypeModalTitle = document.querySelector('#expenseTypeModalTitle');
const expenseMemoView = document.querySelector('#expenseMemoView');
const expenseMemoForm = document.querySelector('#expenseMemoForm');
const memoRows = document.querySelector('#memoRows');
const memoTotal = document.querySelector('#memoTotal');
const incomeView = document.querySelector('#incomeView');
const allIncomeView = document.querySelector('#allIncomeView');
const incomeForm = document.querySelector('#incomeForm');
const incomeMessage = document.querySelector('#incomeMessage');
const incomeSubmit = document.querySelector('#incomeSubmit');
const incomeTableBody = document.querySelector('#incomeTableBody');
const incomeEmpty = document.querySelector('#incomeEmpty');
const incomeDate = document.querySelector('#incomeDate');
const incomeTypesView = document.querySelector('#incomeTypesView');
const incomeTypeForm = document.querySelector('#incomeTypeForm');
const incomeTypeName = document.querySelector('#incomeTypeName');
const incomeTypeDescription = document.querySelector('#incomeTypeDescription');
const incomeTypeMessage = document.querySelector('#incomeTypeMessage');
const incomeTypesTableBody = document.querySelector('#incomeTypesTableBody');
const incomeTypesEmpty = document.querySelector('#incomeTypesEmpty');
const allIncomeSearch = document.querySelector('#allIncomeSearch');
const allIncomeSourceFilter = document.querySelector('#allIncomeSourceFilter');
const allIncomeStartDate = document.querySelector('#allIncomeStartDate');
const allIncomeEndDate = document.querySelector('#allIncomeEndDate');
const allIncomeTableBody = document.querySelector('#allIncomeTableBody');
const allIncomeEmpty = document.querySelector('#allIncomeEmpty');
const incomeTypeModal = document.querySelector('#incomeTypeModal');
const incomeTypeModalContent = document.querySelector('#incomeTypeModalContent');
const closeIncomeTypeModal = document.querySelector('#closeIncomeTypeModal');
let incomes = [];
let incomeTypes = [];
let showingDeletedIncomes = false;
const allExpensesView = document.querySelector('#allExpensesView');
const allExpensesTableBody = document.querySelector('#allExpensesTableBody');
const allExpensesEmpty = document.querySelector('#allExpensesEmpty');
const newExpenseButton = document.querySelector('#newExpenseButton');
const allExpensesSearch = document.querySelector('#allExpensesSearch');
const expenseDateFilter = document.querySelector('#expenseDateFilter');
const expenseTypeFilter = document.querySelector('#expenseTypeFilter');
const expensePageSize = document.querySelector('#expensePageSize');
const expensePageLabel = document.querySelector('#expensePageLabel');
const expensePrevPage = document.querySelector('#expensePrevPage');
const expenseNextPage = document.querySelector('#expenseNextPage');
const membersView = document.querySelector('#membersView');
const membersTableBody = document.querySelector('#membersTableBody');
const membersEmpty = document.querySelector('#membersEmpty');
const reportsView = document.querySelector('#reportsView');
const cashInHandView = document.querySelector('#cashInHandView');
const incomeStatementView = document.querySelector('#incomeStatementView');
const expenseReportView = document.querySelector('#expenseReportView');
const reportTableBody = document.querySelector('#reportTableBody');
const reportSummaryIncome = document.querySelector('#reportSummaryIncome');
const reportSummaryExpense = document.querySelector('#reportSummaryExpense');
const reportSummaryBalance = document.querySelector('#reportSummaryBalance');
const reportSummaryAverage = document.querySelector('#reportSummaryAverage');
const reportRangeSelect = document.querySelector('#reportRangeSelect');
const dashboardChart = document.querySelector('#dashboardChart');
const dashboardChartLabels = document.querySelector('#dashboardChartLabels');
const cashInHandTableBody = document.querySelector('#cashInHandTableBody');
const incomeStatementTableBody = document.querySelector('#incomeStatementTableBody');
const expenseReportTableBody = document.querySelector('#expenseReportTableBody');
const expenseReportHeadFilter = document.querySelector('#expenseReportHeadFilter');
const expenseReportMemberFilter = document.querySelector('#expenseReportMemberFilter');
const expenseReportStartDate = document.querySelector('#expenseReportStartDate');
const expenseReportEndDate = document.querySelector('#expenseReportEndDate');
const expenseReportPdfButton = document.querySelector('#expenseReportPdfButton');
const expenseReportCsvButton = document.querySelector('#expenseReportCsvButton');
const statementIncomeTableBody = document.querySelector('#statementIncomeTableBody');
const statementExpenseTableBody = document.querySelector('#statementExpenseTableBody');
const statementIncomeSummaryBody = document.querySelector('#statementIncomeSummaryBody');
const statementExpenseSummaryBody = document.querySelector('#statementExpenseSummaryBody');
const statementStartDate = document.querySelector('#statementStartDate');
const statementEndDate = document.querySelector('#statementEndDate');
const statementOpeningBalance = document.querySelector('#statementOpeningBalance');
const statementApplyButton = document.querySelector('#statementApplyButton');
const userRoleFilter = document.querySelector('#userRoleFilter');
const addUserButton = document.querySelector('#addUserButton');
const addUserModal = document.querySelector('#addUserModal');
const addUserForm = document.querySelector('#addUserForm');
const closeAddUserModal = document.querySelector('#closeAddUserModal');
const cancelAddUser = document.querySelector('#cancelAddUser');
const newUserName = document.querySelector('#newUserName');
const newUserEmail = document.querySelector('#newUserEmail');
const newUserPassword = document.querySelector('#newUserPassword');
const newUserConfirmPassword = document.querySelector('#newUserConfirmPassword');
const newUserRole = document.querySelector('#newUserRole');
let authMode = 'signIn';
let currentUser = null;
let currentProfile = null;
let dashboardLoadUserId = null;
let expensesChannel = null;
let resetStep = 'requestCode';
let editingExpenseTypeId = null;
let creatingExpenseName = false;
let allExpenses = [];
let allExpensesPage = 1;
let showingDeletedExpenses = false;
let allExpensesLoadId = 0;
let memoRowId = 0;
let editingExpenseId = null;
let editingIncomeId = null;
let members = [];
let expenseTypes = [];

function isAdmin() {
  return currentProfile?.role === 'Admin';
}

const clearExpensesButton = document.createElement('button');
clearExpensesButton.type = 'button';
clearExpensesButton.className = 'inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold tracking-wide text-rose-700 transition hover:bg-rose-100';
clearExpensesButton.innerHTML = '<i data-lucide="trash-2" class="h-4 w-4"></i> Clear Table';
clearExpensesButton.addEventListener('click', clearAllExpenses);
newExpenseButton?.parentElement?.appendChild(clearExpensesButton);

function formatCurrency(amount) {
  return `BDT ${Number(amount || 0).toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

const detailedExpenseCategories = [
  { type: 'FISH', names: ['Rui', 'Boya', 'Elish', 'Pangash', 'Shrimp'] },
  { type: 'MEAT', names: ['Beef', 'Chicken', 'Mutton', 'Duck'] },
  { type: 'VEGETABLES & FRUITS', names: ['Potato', 'Tomato', 'Onion', 'Brinjal', 'Green Chili', 'Seasonal Fruits'] },
  { type: 'GROCERIES & GRAINS', names: ['Rice', 'Flour (Atta)', 'Lentils (Dal)', 'Cooking Oil', 'Salt & Sugar', 'Milk & Baby Food'] },
  { type: 'HOUSING', names: ['House Rent', 'Maintenance & Repairs', 'Property Tax / Service Charge'] },
  { type: 'UTILITIES', names: ['Electricity Bill', 'Gas Bill', 'Water Bill', 'Internet & Wi-Fi', 'Mobile Recharge & SIM Bill'] },
  { type: 'CLOTHING', names: ['Daily Wear Clothing', 'Special Occasion / Eid Shopping', 'Tailoring & Alteration'] },
  { type: 'HEALTHCARE', names: ['Doctor Consultation', 'Pharmacy / Medicines', 'Medical Tests & Diagnostics'] },
  { type: 'EDUCATION', names: ['School / College Fees', 'Books & Stationery', 'Coaching & Private Tuition'] },
  { type: 'TRANSPORTATION', names: ['Rickshaw / Bus Fare', 'Bike Fuel', 'Ride Sharing'] },
];

const defaultIncomeSources = [
  { type: 'JOB / SALARY', sources: ['Monthly Salary', 'Bonus', 'Overtime', 'Incentive / Commission'] },
  { type: 'BUSINESS', sources: ['Shop Sales', 'Service Income', 'Client Payment', 'Wholesale Profit'] },
  { type: 'FREELANCING / ONLINE', sources: ['Web Development', 'Client Project', 'Ad Revenue', 'Consultancy'] },
  { type: 'INVESTMENT & RENT', sources: ['House Rent', 'Shop Rent', 'Bank Interest', 'Dividend / Profit Share'] },
  { type: 'OTHERS', sources: ['Family Support / Remittance', 'Gift Received', 'Sale of Old Items', 'Miscellaneous'] },
];

async function ensureDetailedExpenseCategories() {
  if (!currentUser) return false;
  const { data: existing, error: loadError } = await supabase.from('expense_categories').select('id, name, parent_id, is_deleted').eq('family_id', currentUser.id);
  if (loadError) { showToast(loadError.message, true); return false; }

  const activeCategories = (existing || []).filter((category) => !category.is_deleted);
  if (activeCategories.length) {
    const { error } = await supabase.from('expense_categories').update({ is_deleted: true }).eq('family_id', currentUser.id).eq('is_deleted', false);
    if (error) { showToast(error.message, true); return false; }
  }

  const categoryByName = new Map((existing || []).map((category) => [category.name, category]));
  for (const category of detailedExpenseCategories) {
    let parent = categoryByName.get(category.type);
    if (parent) {
      const { error } = await supabase.from('expense_categories').update({ parent_id: null, is_deleted: false }).eq('id', parent.id).eq('family_id', currentUser.id);
      if (error) { showToast(error.message, true); return false; }
    } else {
      const { data, error } = await supabase.from('expense_categories').insert({ family_id: currentUser.id, name: category.type, parent_id: null, description: 'Expense type', is_deleted: false }).select('id, name, parent_id').single();
      if (error) { showToast(error.message, true); return false; }
      parent = data;
      categoryByName.set(category.type, parent);
    }
    for (const name of category.names) {
      const child = categoryByName.get(`${category.type}:${name}`) || (existing || []).find((item) => item.name === name && item.parent_id === parent.id);
      if (child) {
        const { error } = await supabase.from('expense_categories').update({ parent_id: parent.id, is_deleted: false }).eq('id', child.id).eq('family_id', currentUser.id);
        if (error) { showToast(error.message, true); return false; }
      } else {
        const { error } = await supabase.from('expense_categories').insert({ family_id: currentUser.id, name, parent_id: parent.id, description: 'Expense name', is_deleted: false });
        if (error) { showToast(error.message, true); return false; }
      }
    }
  }
  return true;
}

async function ensureDefaultIncomeSources() {
  if (!currentUser) return false;
  const { data: loadedCategories, error: loadError } = await supabase.from('income_categories').select('id, name, description, is_deleted').eq('user_id', currentUser.id);
  if (loadError) { showToast(loadError.message, true); return false; }
  const uniqueCategories = new Map();
  const duplicateIds = [];
  (loadedCategories || []).forEach((category) => {
    const key = `${category.name}|${category.description || ''}`;
    if (uniqueCategories.has(key)) duplicateIds.push(category.id);
    else uniqueCategories.set(key, category);
  });
  if (duplicateIds.length) {
    const { error } = await supabase.from('income_categories').delete().in('id', duplicateIds).eq('user_id', currentUser.id);
    if (error) { showToast(error.message, true); return false; }
  }
  const existing = [...uniqueCategories.values()];
  const activeCategories = (existing || []).filter((category) => !category.is_deleted);
  if (activeCategories.length) {
    const { error } = await supabase.from('income_categories').update({ is_deleted: true }).eq('user_id', currentUser.id).eq('is_deleted', false);
    if (error) { showToast(error.message, true); return false; }
  }

  const categoryByKey = new Map((existing || []).map((category) => [`${category.name}|${category.description || ''}`, category]));
  for (const group of defaultIncomeSources) {
    const typeDescription = 'Income type';
    const sourceDescription = `Income source under ${group.type}`;
    const rows = [{ name: group.type, description: typeDescription }, ...group.sources.map((source) => ({ name: source, description: sourceDescription }))];
    for (const row of rows) {
      const key = `${row.name}|${row.description}`;
      const existingRow = categoryByKey.get(key);
      const result = existingRow
        ? await supabase.from('income_categories').update({ name: row.name, description: row.description, is_deleted: false }).eq('id', existingRow.id).eq('user_id', currentUser.id)
        : await supabase.from('income_categories').insert({ user_id: currentUser.id, name: row.name, description: row.description, is_deleted: false });
      if (result.error) { showToast(result.error.message, true); return false; }
      if (!existingRow) categoryByKey.set(key, { name: row.name, description: row.description, is_deleted: false });
    }
  }
  return true;
}

async function loadExpenseTypes() {
  if (!currentUser) return;
  const { data, error } = await supabase.from('expense_categories').select('id, family_id, name, parent_id, description, is_deleted').eq('family_id', currentUser.id).eq('is_deleted', false).order('name');
  if (error) { showToast(error.message, true); return; }
  expenseTypes = data || [];
  renderExpenseTypes();
  refreshMemoExpenseTypeOptions();
}

function renderExpenseTypes() {
  const query = expenseTypeSearch.value.trim().toLowerCase();
  const viewFilter = expenseTypeViewFilter.value;
  const matches = expenseTypes.filter((type) => `${type.name} ${type.description || ''}`.toLowerCase().includes(query));
  const filteredTypes = viewFilter === 'names' ? expenseTypes.filter((type) => Boolean(type.parent_id)) : expenseTypes;
  const visibleTypes = filteredTypes.filter((type) => matches.includes(type) || matches.some((match) => match.id === type.parent_id));
  const parents = visibleTypes.filter((type) => !type.parent_id);
  const orderedTypes = parents.flatMap((parent) => [parent, ...visibleTypes.filter((type) => type.parent_id === parent.id)]);
  expenseTypesTableBody.innerHTML = orderedTypes.map((type) => `<tr class="border-b border-slate-100 transition hover:bg-blue-50/40"><td class="px-5 py-4 text-sm ${type.parent_id ? 'pl-10 font-bold text-emerald-700' : 'font-bold text-blue-700'}">${type.parent_id ? '<span class="mr-2 font-bold text-emerald-400">↳</span>' : ''}${escapeHtml(type.name)}</td><td class="max-w-md px-5 py-4 text-sm font-medium text-slate-600">${escapeHtml(type.description || 'No description')}</td><td class="px-5 py-4 text-right"><div class="inline-flex items-center gap-1"><button type="button" data-edit-expense-type="${escapeHtml(type.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600" aria-label="Edit ${escapeHtml(type.name)}"><i data-lucide="pencil" class="h-4 w-4"></i></button><button type="button" data-delete-expense-type="${escapeHtml(type.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600" aria-label="Delete ${escapeHtml(type.name)}"><i data-lucide="trash-2" class="h-4 w-4"></i></button></div></td></tr>`).join('');
  expenseTypesEmpty.classList.toggle('hidden', orderedTypes.length > 0);
  expenseTypesTableBody.querySelectorAll('[data-edit-expense-type]').forEach((button) => button.addEventListener('click', () => openExpenseTypeModal(button.dataset.editExpenseType)));
  expenseTypesTableBody.querySelectorAll('[data-delete-expense-type]').forEach((button) => button.addEventListener('click', () => {
    const type = expenseTypes.find((item) => item.id === button.dataset.deleteExpenseType);
    if (!type || !window.confirm(`Move "${type.name}" to deleted expense types?`)) return;
    supabase.from('expense_categories').update({ is_deleted: true }).eq('id', type.id).eq('family_id', currentUser.id).then(({ error }) => error ? showToast(error.message, true) : loadExpenseTypes());
  }));
  if (window.lucide) lucide.createIcons();
}

function setExpenseTypesView(isVisible) {
  dashboardMain.classList.toggle('hidden', isVisible);
  expenseTypesView.classList.toggle('hidden', !isVisible);
  if (isVisible) loadExpenseTypes();
}

function openExpenseTypeModal(typeId = null, asExpenseName = false) {
  editingExpenseTypeId = typeId;
  creatingExpenseName = asExpenseName;
  const type = expenseTypes.find((item) => item.id === typeId);
  expenseTypeModalTitle.textContent = type ? 'Edit Expense Item / Type' : asExpenseName ? 'Add Expense Name' : 'Add Expense Type';
  expenseTypeParent.innerHTML = `<option value="">Choose an Expense Type</option>${expenseTypes.filter((item) => !item.parent_id && item.id !== typeId).map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`).join('')}`;
  expenseTypeParent.value = type?.parent_id || '';
  expenseTypeParent.required = asExpenseName;
  expenseTypeParentField.classList.toggle('hidden', !asExpenseName && !type?.parent_id);
  expenseTypeNameLabel.textContent = asExpenseName || type?.parent_id ? 'Expense Name' : 'Expense Type';
  expenseTypeParentRequired.classList.toggle('hidden', !asExpenseName);
  expenseTypeParentHint.textContent = asExpenseName ? 'Choose the parent type for this expense name.' : 'Leave empty to create a main expense type.';
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
  creatingExpenseName = false;
  expenseTypeParent.required = false;
  expenseTypeParentField.classList.remove('hidden');
  expenseTypeNameLabel.textContent = 'Expense Name';
  expenseTypeParentRequired.classList.add('hidden');
  expenseTypeParentHint.textContent = 'Leave empty to create a main expense type.';
  expenseTypeModalTitle.textContent = 'Add Expense Type';
}

function showToast(message, isError = false) {
  const toast = document.createElement('div');
  toast.className = `fixed right-5 top-5 z-[70] rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-xl ${isError ? 'bg-rose-600' : 'bg-emerald-600'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function showIncomeMessage(message, isError = false) {
  incomeMessage.textContent = message;
  incomeMessage.className = `rounded-xl px-3 py-2 text-xs leading-5 ${isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`;
}

function setupIncomeTableForm() {
  incomeForm.className = 'overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft';
  incomeForm.parentElement.className = 'mt-7 space-y-5';
  const fields = incomeForm.querySelector('.mt-6.space-y-4');
  fields.className = 'grid gap-3 border-t border-slate-200 px-5 py-5 sm:grid-cols-[2fr_1fr_1fr_2fr_auto] sm:items-end';
  fields.querySelector('.grid.gap-4').className = 'contents';
  incomeForm.querySelector('#incomeMessage').classList.add('sm:col-span-4');
}

setupIncomeTableForm();
const incomeTypeLayout = incomeTypeForm.parentElement;
incomeTypeModalContent.appendChild(incomeTypeForm);
incomeTypeForm.parentElement.className = 'mt-0';
incomeTypeLayout.className = 'mt-7';

function showIncomeTypeMessage(message, isError = false) {
  incomeTypeMessage.textContent = message;
  incomeTypeMessage.className = `rounded-xl px-3 py-2 text-xs leading-5 ${isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`;
}

function setIncomeTypeModal(isOpen) {
  incomeTypeModal.classList.toggle('hidden', !isOpen);
  incomeTypeModal.classList.toggle('flex', isOpen);
  if (isOpen) incomeTypeName.focus();
}

async function loadIncomeTypes() {
  if (!currentUser) return;
  const { data, error } = await supabase.from('income_categories').select('id, name, description').eq('user_id', currentUser.id).eq('is_deleted', false).order('name');
  if (error) { showIncomeTypeMessage(error.message, true); return; }
  incomeTypes = data || [];
  const incomeSource = document.querySelector('#incomeSource');
  if (incomeSource?.tagName === 'INPUT') {
    const incomeTypeSelect = document.createElement('select');
    incomeTypeSelect.id = 'incomeSource';
    incomeTypeSelect.required = true;
    incomeTypeSelect.className = incomeSource.className;
    incomeSource.replaceWith(incomeTypeSelect);
  }
  if (incomeSource || document.querySelector('#incomeSource')) document.querySelector('#incomeSource').innerHTML = `<option value="">Choose an income source</option>${incomeTypes.filter((type) => (type.description || '').startsWith('Income source under ')).map((type) => `<option value="${escapeHtml(type.name)}">${escapeHtml(type.name)}</option>`).join('')}`;
  incomeTypesTableBody.innerHTML = incomeTypes.map((type) => `<tr class="transition hover:bg-slate-50"><td class="px-5 py-4 text-sm font-semibold text-slate-800">${escapeHtml(type.name)}</td><td class="px-5 py-4 text-sm text-slate-500">${escapeHtml(type.description || 'No description')}</td><td class="px-5 py-4 text-right"><button type="button" data-delete-income-type="${escapeHtml(type.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600" aria-label="Delete ${escapeHtml(type.name)}"><i data-lucide="trash-2" class="h-4 w-4"></i></button></td></tr>`).join('');
  incomeTypesEmpty.classList.toggle('hidden', incomeTypes.length > 0);
  incomeTypesTableBody.querySelectorAll('[data-delete-income-type]').forEach((button) => button.addEventListener('click', async () => {
    const { error: deleteError } = await supabase.from('income_categories').update({ is_deleted: true }).eq('id', button.dataset.deleteIncomeType).eq('user_id', currentUser.id);
    if (deleteError) showIncomeTypeMessage(deleteError.message, true);
    else loadIncomeTypes();
  }));
  if (window.lucide) lucide.createIcons();
}

function renderIncomes() {
  const monthPrefix = new Date().toISOString().slice(0, 7);
  const total = incomes.reduce((sum, income) => sum + Number(income.amount), 0);
  const monthlyTotal = incomes.filter((income) => income.income_date.startsWith(monthPrefix)).reduce((sum, income) => sum + Number(income.amount), 0);
  document.querySelector('#incomeTotal').textContent = formatTaka(total);
  document.querySelector('#incomeMonthlyTotal').textContent = formatTaka(monthlyTotal);
  document.querySelector('#incomeCountLabel').textContent = `${incomes.length} ${incomes.length === 1 ? 'entry' : 'entries'}`;
  incomeEmpty.classList.toggle('hidden', incomes.length > 0);
  const incomeAction = showingDeletedIncomes
    ? (income) => `<div class="inline-flex items-center gap-1"><button type="button" data-restore-income="${escapeHtml(income.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600" aria-label="Restore ${escapeHtml(income.source)}"><i data-lucide="undo-2" class="h-4 w-4"></i></button><button type="button" data-permanent-delete-income="${escapeHtml(income.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600" aria-label="Permanently delete ${escapeHtml(income.source)}"><i data-lucide="trash-2" class="h-4 w-4"></i></button></div>`
    : (income) => `<button type="button" data-delete-income="${escapeHtml(income.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600" aria-label="Delete ${escapeHtml(income.source)}"><i data-lucide="trash-2" class="h-4 w-4"></i></button>`;
  incomeTableBody.innerHTML = incomes.map((income) => `<tr class="transition hover:bg-slate-50"><td class="px-5 py-4"><div class="flex flex-col gap-1"><p class="text-sm font-semibold text-slate-800">${escapeHtml(income.source)}</p>${income.note ? `<p class="text-xs font-normal text-slate-500">${escapeHtml(income.note)}</p>` : ''}</div></td><td class="px-5 py-4 text-sm text-slate-600">${new Date(`${income.income_date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td><td class="px-5 py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-emerald-700">${formatTaka(income.amount)}</td><td class="px-5 py-4 text-right">${incomeAction(income)}</td></tr>`).join('');
  incomeTableBody.querySelectorAll('[data-delete-income]').forEach((button) => button.addEventListener('click', () => deleteIncome(button.dataset.deleteIncome)));
  incomeTableBody.querySelectorAll('[data-restore-income]').forEach((button) => button.addEventListener('click', () => restoreIncome(button.dataset.restoreIncome)));
  incomeTableBody.querySelectorAll('[data-permanent-delete-income]').forEach((button) => button.addEventListener('click', () => permanentlyDeleteIncome(button.dataset.permanentDeleteIncome)));
  if (window.lucide) lucide.createIcons();
  renderDashboardChart();
}

async function loadIncomes(includeDeleted = false) {
  if (!currentUser) return;
  const { data, error } = await supabase.from('incomes').select('id, source, amount, income_date, note').eq('user_id', currentUser.id).eq('is_deleted', includeDeleted).order('income_date', { ascending: false }).order('created_at', { ascending: false });
  if (error) { showIncomeMessage(error.message, true); return; }
  incomes = data || [];
  renderIncomes();
  renderAllIncome();
}

function renderAllIncome() {
  if (!allIncomeTableBody) return;
  const sources = [...new Set(incomes.map((income) => income.source).filter(Boolean))].sort();
  const selectedSource = allIncomeSourceFilter.value || 'all';
  allIncomeSourceFilter.innerHTML = `<option value="all">All sources</option>${sources.map((source) => `<option value="${escapeHtml(source)}">${escapeHtml(source)}</option>`).join('')}`;
  allIncomeSourceFilter.value = sources.includes(selectedSource) ? selectedSource : 'all';
  const query = allIncomeSearch.value.trim().toLowerCase();
  const rows = incomes.filter((income) => {
    const text = `${income.source || ''} ${income.note || ''}`.toLowerCase();
    return (!query || text.includes(query)) && (allIncomeSourceFilter.value === 'all' || income.source === allIncomeSourceFilter.value) && (!allIncomeStartDate.value || income.income_date >= allIncomeStartDate.value) && (!allIncomeEndDate.value || income.income_date <= allIncomeEndDate.value);
  });
  const total = rows.reduce((sum, income) => sum + Number(income.amount || 0), 0);
  document.querySelector('#allIncomeFilteredTotal').textContent = formatTaka(total);
  document.querySelector('#allIncomeFilteredCount').textContent = String(rows.length);
  allIncomeEmpty.classList.toggle('hidden', rows.length > 0);
  allIncomeTableBody.innerHTML = rows.map((income) => `<tr class="transition hover:bg-emerald-50/40"><td class="px-5 py-4 text-sm font-bold text-slate-800">${escapeHtml(income.source)}</td><td class="px-5 py-4 text-sm text-slate-500">${escapeHtml(income.note || 'No note')}</td><td class="px-5 py-4 text-sm text-slate-600">${new Date(`${income.income_date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td><td class="px-5 py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-emerald-700">${formatTaka(income.amount)}</td><td class="px-5 py-4 text-right"><div class="inline-flex items-center gap-1"><button type="button" data-edit-all-income="${escapeHtml(income.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600" aria-label="Edit ${escapeHtml(income.source)}"><i data-lucide="pencil" class="h-4 w-4"></i></button><button type="button" data-all-income-delete="${escapeHtml(income.id)}" class="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600" aria-label="Delete ${escapeHtml(income.source)}"><i data-lucide="trash-2" class="h-4 w-4"></i></button></div></td></tr>`).join('');
  allIncomeTableBody.querySelectorAll('[data-edit-all-income]').forEach((button) => button.addEventListener('click', () => {
    const income = incomes.find((item) => item.id === button.dataset.editAllIncome);
    if (!income) return;
    editingIncomeId = income.id;
    document.querySelector('#incomeSource').value = income.source || '';
    document.querySelector('#incomeAmount').value = income.amount || '';
    incomeDate.value = income.income_date || '';
    document.querySelector('#incomeNote').value = income.note || '';
    window.location.hash = '#income/add';
    setAppView('income');
    document.querySelector('#incomeSource').focus();
  }));
  allIncomeTableBody.querySelectorAll('[data-all-income-delete]').forEach((button) => button.addEventListener('click', () => deleteIncome(button.dataset.allIncomeDelete)));
  if (window.lucide) lucide.createIcons();
}

async function deleteIncome(incomeId) {
  const previous = incomes;
  incomes = incomes.filter((income) => income.id !== incomeId);
  renderIncomes();
  const { error } = await supabase.from('incomes').update({ is_deleted: true }).eq('id', incomeId).eq('user_id', currentUser.id);
  if (error) { incomes = previous; renderIncomes(); showIncomeMessage(error.message, true); return; }
  showToast('Income deleted successfully.');
}

async function restoreIncome(incomeId) {
  const previous = incomes;
  incomes = incomes.filter((income) => income.id !== incomeId);
  renderIncomes();
  const { error } = await supabase.from('incomes').update({ is_deleted: false }).eq('id', incomeId).eq('user_id', currentUser.id);
  if (error) { incomes = previous; renderIncomes(); showIncomeMessage(error.message, true); return; }
  showToast('Income restored successfully.');
}

async function permanentlyDeleteIncome(incomeId) {
  const income = incomes.find((item) => item.id === incomeId);
  if (!income || !window.confirm(`Permanently delete "${income.source}"? This cannot be undone.`)) return;
  const previous = incomes;
  incomes = incomes.filter((item) => item.id !== incomeId);
  renderIncomes();
  const { error } = await supabase.from('incomes').delete().eq('id', incomeId).eq('user_id', currentUser.id).eq('is_deleted', true);
  if (error) { incomes = previous; renderIncomes(); showIncomeMessage(error.message, true); return; }
  showToast('Income permanently deleted.');
}

function setAppView(view) {
  showingDeletedExpenses = view === 'deleted';
  clearExpensesButton.classList.toggle('hidden', showingDeletedExpenses);
  document.querySelector('#allExpensesTitle').textContent = showingDeletedExpenses ? 'Deleted Expenses' : 'All Expenses';
  showingDeletedIncomes = view === 'deleted-income';
  dashboardMain.classList.toggle('hidden', view !== 'dashboard');
  profileView.classList.toggle('hidden', view !== 'profile');
  incomeTypesView.classList.toggle('hidden', view !== 'income-types');
  incomeView.classList.toggle('hidden', view !== 'income' && view !== 'deleted-income');
  allIncomeView.classList.toggle('hidden', view !== 'income-all');
  expenseMemoView.classList.toggle('hidden', view !== 'memo');
  allExpensesView.classList.toggle('hidden', view !== 'all' && view !== 'deleted');
  expenseTypesView.classList.toggle('hidden', view !== 'types');
  reportsView.classList.toggle('hidden', view !== 'reports');
  cashInHandView.classList.toggle('hidden', view !== 'cash-in-hand');
  incomeStatementView.classList.toggle('hidden', view !== 'income-statement');
  expenseReportView.classList.toggle('hidden', view !== 'expense-report');
  membersView.classList.toggle('hidden', view !== 'members');
  if (view === 'memo') {
    if (!memoRows.children.length) addMemoRow();
    loadExpenseTypes();
  }
  if (view === 'types') loadExpenseTypes();
  if (view === 'income-types' || view === 'income') loadIncomeTypes();
  if (view === 'income' || view === 'income-all' || view === 'deleted-income') loadIncomes(view === 'deleted-income');
  if (view === 'all' || view === 'deleted') loadAllExpenses(view === 'deleted');
  if (view === 'members') loadMembers();
  if (view === 'reports' || view === 'cash-in-hand' || view === 'income-statement' || view === 'expense-report') loadReportsData();
}

function formatReportMonth(stepKey) {
  const [year, month] = stepKey.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('en-BD', { month: 'short', year: 'numeric' });
}

function buildMonthlyReportRows() {
  const monthMap = new Map();
  const recordMonths = [];

  const pushMonth = (dateString) => {
    if (!dateString) return;
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!monthMap.has(key)) {
      monthMap.set(key, { income: 0, expense: 0 });
      recordMonths.push(key);
    }
  };

  incomes.filter((income) => !income.is_deleted).forEach((income) => pushMonth(income.income_date));
  allExpenses.filter((expense) => !expense.is_deleted).forEach((expense) => pushMonth(expense.expense_date));

  if (!recordMonths.length) {
    const today = new Date();
    for (let index = 5; index >= 0; index -= 1) {
      const date = new Date(today.getFullYear(), today.getMonth() - index, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthMap.set(key, { income: 0, expense: 0 });
      recordMonths.push(key);
    }
  }

  recordMonths.sort();
  const reportRows = recordMonths.map((key) => {
    const income = incomes.filter((item) => !item.is_deleted && item.income_date && `${new Date(`${item.income_date}T00:00:00`).getFullYear()}-${String(new Date(`${item.income_date}T00:00:00`).getMonth() + 1).padStart(2, '0')}` === key).reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const expense = allExpenses.filter((item) => !item.is_deleted && item.expense_date && `${new Date(`${item.expense_date}T00:00:00`).getFullYear()}-${String(new Date(`${item.expense_date}T00:00:00`).getMonth() + 1).padStart(2, '0')}` === key).reduce((sum, item) => sum + Number(item.total_amount || item.amount || 0), 0);
    return { key, income, expense, balance: income - expense };
  });

  return reportRows;
}

function renderReports() {
  const allRows = buildMonthlyReportRows();
  const rangeMonths = Number(reportRangeSelect?.value || 12);
  const rows = allRows.slice(-rangeMonths);
  const totalIncome = rows.reduce((sum, row) => sum + row.income, 0);
  const totalExpense = rows.reduce((sum, row) => sum + row.expense, 0);
  const totalBalance = totalIncome - totalExpense;
  const average = rows.length ? totalExpense / rows.length : 0;

  reportSummaryIncome.textContent = formatTaka(totalIncome);
  reportSummaryExpense.textContent = formatTaka(totalExpense);
  reportSummaryBalance.textContent = formatTaka(totalBalance);
  reportSummaryAverage.textContent = formatTaka(average);

  reportTableBody.innerHTML = rows.map((row) => `
    <tr class="transition hover:bg-slate-50">
      <td class="px-5 py-4 text-sm font-semibold text-slate-800">${formatReportMonth(row.key)}</td>
      <td class="px-5 py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-emerald-600">${formatTaka(row.income)}</td>
      <td class="px-5 py-4 text-right font-['Space_Grotesk'] text-sm font-bold text-rose-600">${formatTaka(row.expense)}</td>
      <td class="px-5 py-4 text-right font-['Space_Grotesk'] text-sm font-bold ${row.balance >= 0 ? 'text-slate-900' : 'text-amber-600'}">${formatTaka(row.balance)}</td>
    </tr>
  `).join('');
}

function getExpenseAmount(expense) {
  return Number(expense.total_amount || expense.amount || 0);
}

function renderReportChildren() {
  const activeIncomes = incomes.filter((income) => !income.is_deleted);
  const activeExpenses = allExpenses.filter((expense) => !expense.is_deleted);
  const totalIncome = activeIncomes.reduce((sum, income) => sum + Number(income.amount || 0), 0);
  const totalExpense = activeExpenses.reduce((sum, expense) => sum + getExpenseAmount(expense), 0);
  const monthlyRows = buildMonthlyReportRows();
  let closingCash = 0;

  document.querySelector('#cashIncomeTotal').textContent = formatTaka(totalIncome);
  document.querySelector('#cashExpenseTotal').textContent = formatTaka(totalExpense);
  document.querySelector('#cashBalanceTotal').textContent = formatTaka(totalIncome - totalExpense);
  cashInHandTableBody.innerHTML = monthlyRows.map((row) => {
    closingCash += row.balance;
    return `<tr class="transition hover:bg-slate-50"><td class="px-5 py-4 text-sm font-semibold text-slate-800">${formatReportMonth(row.key)}</td><td class="px-5 py-4 text-right text-sm font-bold text-emerald-600">${formatTaka(row.income)}</td><td class="px-5 py-4 text-right text-sm font-bold text-rose-600">${formatTaka(row.expense)}</td><td class="px-5 py-4 text-right text-sm font-bold text-slate-900">${formatTaka(closingCash)}</td></tr>`;
  }).join('');

  renderIncomeStatement();

  const expenseByCategory = new Map();
  activeExpenses.forEach((expense) => {
    const category = expense.expense_type || expense.category || 'Uncategorized';
    const entry = expenseByCategory.get(category) || { amount: 0, count: 0 };
    entry.amount += getExpenseAmount(expense);
    entry.count += 1;
    expenseByCategory.set(category, entry);
  });
  renderExpenseReport();
}

function getFilteredExpenseReportRows() {
  const activeExpenses = allExpenses.filter((expense) => !expense.is_deleted);
  const startDate = expenseReportStartDate.value;
  const endDate = expenseReportEndDate.value;
  const selectedHead = expenseReportHeadFilter.value;
  return activeExpenses.filter((expense) => {
    const category = expense.expense_type || expense.category || 'Other Expense';
    return (!startDate || expense.expense_date >= startDate) && (!endDate || expense.expense_date <= endDate) && (selectedHead === 'all' || category === selectedHead);
  });
}

function renderExpenseReport() {
  const activeExpenses = allExpenses.filter((expense) => !expense.is_deleted);
  const selectedHead = expenseReportHeadFilter.value || 'all';
  const dates = activeExpenses.map((expense) => expense.expense_date).filter(Boolean).sort();
  if (!expenseReportStartDate.value) expenseReportStartDate.value = dates[0] || new Date().toISOString().slice(0, 10);
  if (!expenseReportEndDate.value) expenseReportEndDate.value = dates[dates.length - 1] || new Date().toISOString().slice(0, 10);
  const heads = [...new Set(activeExpenses.map((expense) => expense.expense_type || expense.category || 'Other Expense'))].sort();
  expenseReportHeadFilter.innerHTML = `<option value="all">All Expense Head</option>${heads.map((head) => `<option value="${escapeHtml(head)}">${escapeHtml(head)}</option>`).join('')}`;
  expenseReportHeadFilter.value = heads.includes(selectedHead) ? selectedHead : 'all';
  if (!expenseReportTableBody) return;
  const rows = getFilteredExpenseReportRows();
  const grouped = new Map();
  rows.forEach((expense) => {
    const type = expense.item_name || expense.title || 'Expense';
    const category = expense.expense_type || expense.category || 'Other Expense';
    const key = `${type}::${category}`;
    const row = grouped.get(key) || { type, category, count: 0, amount: 0 };
    row.count += 1;
    row.amount += getExpenseAmount(expense);
    grouped.set(key, row);
  });
  const total = rows.reduce((sum, expense) => sum + getExpenseAmount(expense), 0);
  const dateLabel = `${expenseReportStartDate.value || 'Start'} to ${expenseReportEndDate.value || 'End'}`;
  document.querySelector('#expenseReportPeriodLabel').textContent = `${dateLabel} · All members`;
  document.querySelector('#expenseReportTotal').textContent = formatTaka(total);
  document.querySelector('#expenseReportFooterTotal').textContent = formatTaka(total);
  expenseReportTableBody.innerHTML = grouped.size ? [...grouped.values()].sort((first, second) => second.amount - first.amount).map((row) => `<tr class="font-semibold transition hover:bg-slate-50"><td class="px-3 py-3 text-sm text-slate-700">${escapeHtml(row.type)}</td><td class="px-3 py-3 text-sm text-slate-600"><span class="rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">${escapeHtml(row.category)}</span></td><td class="px-3 py-3 text-right text-sm text-slate-600">${row.count}</td><td class="px-3 py-3 text-right text-sm text-rose-600">${formatTaka(row.amount)}</td></tr>`).join('') : '<tr><td colspan="4" class="px-3 py-10 text-center text-sm text-slate-400">No expenses found for this filter.</td></tr>';
}

function renderIncomeStatement() {
  const activeIncomes = incomes.filter((income) => !income.is_deleted);
  const activeExpenses = allExpenses.filter((expense) => !expense.is_deleted);
  const dates = [...activeIncomes.map((income) => income.income_date), ...activeExpenses.map((expense) => expense.expense_date)].filter(Boolean).sort();
  if (!statementStartDate.value) statementStartDate.value = dates[0] || new Date().toISOString().slice(0, 10);
  if (!statementEndDate.value) statementEndDate.value = dates[dates.length - 1] || new Date().toISOString().slice(0, 10);
  const startDate = statementStartDate.value;
  const endDate = statementEndDate.value;
  const inPeriod = (date) => date && date >= startDate && date <= endDate;
  const periodIncomes = activeIncomes.filter((income) => inPeriod(income.income_date));
  const periodExpenses = activeExpenses.filter((expense) => inPeriod(expense.expense_date));
  const incomeGroups = new Map();
  periodIncomes.forEach((income) => {
    const key = income.source || 'Other Income';
    const row = incomeGroups.get(key) || { amount: 0, count: 0 };
    row.amount += Number(income.amount || 0);
    row.count += 1;
    incomeGroups.set(key, row);
  });
  const expenseGroups = new Map();
  periodExpenses.forEach((expense) => {
    const key = expense.expense_type || expense.category || 'Other Expense';
    const row = expenseGroups.get(key) || { amount: 0, count: 0, ids: [] };
    row.amount += getExpenseAmount(expense);
    row.count += 1;
    row.ids.push(expense.id);
    expenseGroups.set(key, row);
  });
  const periodIncomeTotal = periodIncomes.reduce((sum, income) => sum + Number(income.amount || 0), 0);
  const periodExpenseTotal = periodExpenses.reduce((sum, expense) => sum + getExpenseAmount(expense), 0);
  const openingBalance = Number(statementOpeningBalance.value || 0);
  const closingBalance = openingBalance + periodIncomeTotal - periodExpenseTotal;
  const periodLabel = `${startDate || 'Start'} to ${endDate || 'End'}`;

  document.querySelector('#statementPeriodLabel').textContent = periodLabel;
  document.querySelector('#statementHeaderBalance').textContent = formatTaka(closingBalance);
  document.querySelector('#statementTotalIncome').textContent = formatTaka(periodIncomeTotal);
  document.querySelector('#statementTotalExpense').textContent = formatTaka(periodExpenseTotal);
  document.querySelector('#statementSummaryIncome').textContent = formatTaka(periodIncomeTotal);
  document.querySelector('#statementSummaryExpense').textContent = formatTaka(periodExpenseTotal);
  document.querySelector('#statementClosingBalance').textContent = formatTaka(closingBalance);

  statementIncomeTableBody.innerHTML = `<tr class="bg-slate-50"><td colspan="2" class="px-3 py-2 text-right font-bold text-rose-600">OPENING BALANCE</td><td class="px-3 py-2 text-right text-base font-bold text-sky-600">${formatTaka(openingBalance)}</td></tr>${[...incomeGroups.entries()].map(([source, row]) => `<tr class="font-semibold transition hover:bg-slate-50"><td class="px-3 py-2.5 text-slate-700">${escapeHtml(source)}</td><td class="px-3 py-2.5 text-slate-600">${row.count}</td><td class="px-3 py-2.5 text-right text-slate-700">${formatTaka(row.amount)}</td></tr>`).join('')}`;
  statementExpenseTableBody.innerHTML = periodExpenses.length ? [...expenseGroups.entries()].map(([category, row]) => `<tr class="font-semibold transition hover:bg-slate-50"><td class="px-3 py-2.5 text-slate-700">${escapeHtml(category)}</td><td class="px-3 py-2.5"><span class="rounded bg-emerald-500 px-2 py-1 text-[10px] font-bold text-white">${escapeHtml(category)}</span></td><td class="px-3 py-2.5 text-slate-600">${row.count}</td><td class="px-3 py-2.5 text-right text-slate-700">${formatTaka(row.amount)}</td><td class="px-3 py-2.5 text-center"><button type="button" data-statement-expense-view="${escapeHtml(row.ids[0])}" class="rounded border border-sky-300 p-1 text-sky-600 transition hover:bg-sky-50" aria-label="View ${escapeHtml(category)}"><i data-lucide="eye" class="h-3.5 w-3.5"></i></button></td></tr>`).join('') : '<tr><td colspan="5" class="px-3 py-8 text-center text-slate-400">No expenses in this period.</td></tr>';
  statementIncomeSummaryBody.innerHTML = `<tr><td class="border-b border-slate-200 px-3 py-2.5 text-right font-semibold text-slate-600">OPENING BALANCE</td><td class="border-b border-slate-200 px-3 py-2.5 text-right font-semibold text-sky-600">${formatTaka(openingBalance)}</td></tr>${[...incomeGroups.entries()].map(([source, row]) => `<tr class="font-semibold"><td class="border-b border-slate-200 px-3 py-2.5 text-right text-slate-600">${escapeHtml(source)}</td><td class="border-b border-slate-200 px-3 py-2.5 text-right text-slate-700">${formatTaka(row.amount)}</td></tr>`).join('')}`;
  statementExpenseSummaryBody.innerHTML = [...expenseGroups.entries()].map(([category, row]) => `<tr class="font-semibold"><td class="border-b border-slate-200 px-3 py-2.5 text-right text-slate-600">${escapeHtml(category)}</td><td class="border-b border-slate-200 px-3 py-2.5 text-right text-slate-700">${formatTaka(row.amount)}</td></tr>`).join('');
  statementExpenseTableBody.querySelectorAll('[data-statement-expense-view]').forEach((button) => button.addEventListener('click', () => {
    const expense = periodExpenses.find((item) => item.id === button.dataset.statementExpenseView);
    if (expense) showToast(`${expense.item_name || expense.title || 'Expense'}: ${formatTaka(getExpenseAmount(expense))}`);
  }));
  if (window.lucide) lucide.createIcons();
}

async function loadReportsData() {
  if (!currentUser) return;
  const [incomeResult, expenseResult] = await Promise.all([
    supabase.from('incomes').select('id, source, amount, income_date, note, is_deleted').eq('user_id', currentUser.id).order('income_date', { ascending: true }),
    supabase.from('expenses').select('id, item_name, title, expense_type, category, expense_date, total_amount, amount, is_deleted').eq('user_id', currentUser.id).order('expense_date', { ascending: true }),
  ]);

  if (incomeResult.error) {
    showToast(incomeResult.error.message, true);
    return;
  }
  if (expenseResult.error) {
    showToast(expenseResult.error.message, true);
    return;
  }

  incomes = incomeResult.data || [];
  allExpenses = expenseResult.data || [];
  renderReports();
  renderReportChildren();
}

function renderMemoTotal() {
  const total = [...memoRows.querySelectorAll('[data-memo-row]')].reduce((sum, row) => {
    const amount = (Number(row.querySelector('[data-field="quantity"]').value) || 0) * (Number(row.querySelector('[data-field="unit-price"]').value) || 0);
    const amountPrice = row.querySelector('[data-field="amount-price"]');
    if (amountPrice) amountPrice.value = amount.toFixed(2);
    return sum + amount;
  }, 0);
  memoTotal.textContent = `৳ ${total.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function getExpenseTypeOptions(selectedValue = '') {
  const parents = expenseTypes.filter((type) => !type.parent_id);
  return `<option value="">Choose an expense type</option>${parents.map((type) => `<option value="${escapeHtml(type.id)}" ${type.id === selectedValue || type.name === selectedValue ? 'selected' : ''}>${escapeHtml(type.name)}</option>`).join('')}`;
}

function getExpenseNameOptions(parentId = '', selectedValue = '') {
  const names = expenseTypes.filter((type) => type.parent_id === parentId);
  return `<option value="">${parentId ? 'Choose an expense name' : 'Select expense type first'}</option>${names.map((type) => `<option value="${escapeHtml(type.name)}" ${type.name === selectedValue ? 'selected' : ''}>${escapeHtml(type.name)}</option>`).join('')}`;
}

function refreshMemoExpenseTypeOptions() {
  memoRows.querySelectorAll('[data-field="expense-type"]').forEach((select) => {
    const selectedValue = select.value;
    select.innerHTML = getExpenseTypeOptions(selectedValue);
    const nameSelect = select.closest('[data-memo-row]').querySelector('[data-field="name"]');
    nameSelect.innerHTML = getExpenseNameOptions(select.value, nameSelect.value);
  });
}

function addMemoRow(values = {}) {
  memoRowId += 1;
  const row = document.createElement('div');
  row.dataset.memoRow = String(memoRowId);
  row.className = 'grid gap-3 px-5 py-5 sm:grid-cols-[2fr_1.3fr_0.8fr_0.7fr_1fr_1fr_auto] sm:items-end';
  const selectedParent = expenseTypes.find((type) => !type.parent_id && (type.id === values.expenseType || type.name === values.expenseType)) || (() => { const child = expenseTypes.find((type) => type.parent_id && type.name === values.expenseType); return expenseTypes.find((type) => type.id === child?.parent_id); })();
  row.innerHTML = `<div><label class="mb-2 block text-xs font-semibold text-slate-600">Expense type <span class="text-rose-600">*</span></label><select data-field="expense-type" required class="h-10 w-full rounded-lg border border-slate-300 px-2 text-sm">${getExpenseTypeOptions(selectedParent?.id || values.expenseType || '')}</select></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Expense name <span class="text-rose-600">*</span></label><select data-field="name" required class="h-10 w-full rounded-lg border border-slate-300 px-2 text-sm">${getExpenseNameOptions(selectedParent?.id || '', values.name || '')}</select></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Unit <span class="text-rose-600">*</span></label><select data-field="unit" required class="h-10 w-full rounded-lg border border-slate-300 px-2 text-sm"><option value="">Choose unit</option>${[['kg', 'Kg'], ['pcs', 'Pieces'], ['gm', 'Gram'], ['dozen', 'Dozen'], ['hali', 'Four Pieces (1 Hali)']].map(([unit, label]) => `<option value="${unit}" ${unit === (values.unit || 'pcs') ? 'selected' : ''}>${label}</option>`).join('')}</select></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Quantity</label><input data-field="quantity" required min="0.001" step="0.001" type="number" value="${values.quantity || 1}" class="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm" /></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Unit Price</label><input data-field="unit-price" required min="0.01" step="0.01" type="number" value="${values.unitPrice || ''}" placeholder="0.00" class="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm" /></div><div><label class="mb-2 block text-xs font-semibold text-slate-600">Amount Price</label><input data-field="amount-price" type="text" value="0.00" readonly class="h-10 w-full rounded-lg border border-slate-200 bg-slate-100 px-3 text-sm font-semibold text-slate-700" /></div><button type="button" data-remove-memo-row class="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600" aria-label="Remove item"><i data-lucide="trash-2" class="h-4 w-4"></i></button>`;
  const typeSelect = row.querySelector('[data-field="expense-type"]');
  const nameSelect = row.querySelector('[data-field="name"]');
  typeSelect.addEventListener('change', () => { nameSelect.innerHTML = getExpenseNameOptions(typeSelect.value); renderMemoTotal(); });
  row.querySelectorAll('input, select').forEach((input) => input.addEventListener('input', renderMemoTotal));
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
  const isDeletedView = window.location.hash === '#deleted-expenses';
  showingDeletedExpenses = isDeletedView;
  const filtered = getFilteredAllExpenses();
  const invoiceGroups = new Map();
  filtered.forEach((expense) => {
    const key = expense.invoice_id || expense.id;
    const group = invoiceGroups.get(key) || { ...expense, id: key, invoice_id: expense.invoice_id, item_name: '', quantity: 0, total_amount: 0, amount: 0, unit_price: null, sourceRows: [] };
    group.sourceRows.push(expense);
    group.item_name = group.item_name ? `${group.item_name}, ${expense.item_name || expense.title || 'Expense'}` : (expense.item_name || expense.title || 'Expense');
    group.quantity += Number(expense.quantity || 1);
    group.total_amount += Number(expense.total_amount || expense.amount || 0);
    group.amount = group.total_amount;
    group.expense_type = group.expense_type === expense.expense_type ? group.expense_type : group.expense_type ? 'Multiple types' : expense.expense_type || expense.category;
    invoiceGroups.set(key, group);
  });
  const groupedExpenses = [...invoiceGroups.values()];
  const pageSize = Number(expensePageSize.value);
  const totalPages = Math.max(1, Math.ceil(groupedExpenses.length / pageSize));
  allExpensesPage = Math.min(allExpensesPage, totalPages);
  const pageRows = groupedExpenses.slice((allExpensesPage - 1) * pageSize, allExpensesPage * pageSize);
  const expenseAction = isDeletedView
    ? (expense) => `<div class="inline-flex items-center gap-1"><button type="button" data-restore-all-expense="${escapeHtml(expense.id)}" class="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600" aria-label="Restore invoice"><i data-lucide="undo-2" class="h-4 w-4"></i></button><button type="button" data-permanent-delete-expense="${escapeHtml(expense.id)}" class="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600" aria-label="Permanently delete invoice"><i data-lucide="trash-2" class="h-4 w-4"></i></button></div>`
    : (expense) => `<button type="button" data-delete-all-expense="${expense.id}" class="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600" aria-label="Delete invoice"><i data-lucide="trash-2" class="h-4 w-4"></i></button>`;
  allExpensesTableBody.innerHTML = pageRows.map((expense) => `<tr class="transition hover:bg-slate-50"><td class="px-5 py-4 text-sm text-slate-600">${new Date(`${expense.expense_date}T00:00:00`).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</td><td class="px-5 py-4"><div class="flex flex-col gap-1"><p class="text-sm font-semibold text-slate-800">${escapeHtml(expense.item_name || expense.title)}</p><p class="text-xs font-normal text-slate-500">${escapeHtml(expense.quantity || 1)} ${escapeHtml(expense.unit || 'pcs')}${expense.note ? ` · ${escapeHtml(expense.note)}` : ''}</p></div></td><td class="px-5 py-4"><span class="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">${escapeHtml(expense.expense_type || expense.category || 'All Cost')}</span></td><td class="px-5 py-4 text-sm text-slate-600">${formatTaka(expense.unit_price || expense.amount)}</td><td class="px-5 py-4 font-['Space_Grotesk'] text-sm font-bold text-slate-900">${formatTaka(expense.total_amount || expense.amount)}</td><td class="px-5 py-4 text-sm text-slate-600">${escapeHtml(expense.added_by || 'You')}</td><td class="px-5 py-4 text-right"><div class="inline-flex items-center gap-1">${!isDeletedView ? `<button type="button" data-edit-all-expense="${escapeHtml(expense.sourceRows[0]?.id || expense.id)}" class="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600" aria-label="Edit expense"><i data-lucide="pencil" class="h-4 w-4"></i></button>` : ''}${expenseAction(expense)}</div></td></tr>`).join('');
  allExpensesEmpty.classList.toggle('hidden', pageRows.length > 0);
  document.querySelector('#allExpensesMonthlyTotal').textContent = formatTaka(allExpenses.filter((expense) => new Date(expense.expense_date).getMonth() === new Date().getMonth()).reduce((sum, expense) => sum + Number(expense.total_amount || expense.amount || 0), 0));
  document.querySelector('#allExpensesTransactionCount').textContent = groupedExpenses.length;
  expensePageLabel.textContent = `Page ${allExpensesPage} of ${totalPages}`;
  expensePrevPage.disabled = allExpensesPage === 1;
  expenseNextPage.disabled = allExpensesPage === totalPages;
  allExpensesTableBody.querySelectorAll('[data-delete-all-expense]').forEach((button) => button.addEventListener('click', () => softDeleteExpense(button.dataset.deleteAllExpense)));
  allExpensesTableBody.querySelectorAll('[data-restore-all-expense]').forEach((button) => button.addEventListener('click', () => restoreExpense(button.dataset.restoreAllExpense)));
  allExpensesTableBody.querySelectorAll('[data-permanent-delete-expense]').forEach((button) => button.addEventListener('click', () => permanentlyDeleteExpense(button.dataset.permanentDeleteExpense)));
  allExpensesTableBody.querySelectorAll('[data-edit-all-expense]').forEach((button) => button.addEventListener('click', () => {
    const expense = allExpenses.find((item) => item.id === button.dataset.editAllExpense);
    if (!expense) return;
    editingExpenseId = expense.id;
    expenseMemoDate.value = expense.expense_date || '';
    memoRows.innerHTML = '';
    addMemoRow({ name: expense.item_name || expense.title, expenseType: expense.expense_type || expense.category, unit: expense.unit, quantity: expense.quantity, unitPrice: expense.unit_price || expense.amount });
    window.location.hash = '#expense/add';
    setAppView('memo');
  }));
  if (window.lucide) lucide.createIcons();
}

async function loadAllExpenses(includeDeleted = false) {
  if (!currentUser) return;
  const loadId = ++allExpensesLoadId;
  const { data, error } = await supabase.from('expenses').select('id, invoice_id, expense_date, item_name, title, expense_type, category, unit, quantity, unit_price, total_amount, amount, note, user_id').eq('user_id', currentUser.id).eq('is_deleted', includeDeleted).order('expense_date', { ascending: false });
  if (error) { showToast(error.message, true); return; }
  if (loadId !== allExpensesLoadId) return;
  allExpenses = data || [];
  allExpensesPage = 1;
  renderAllExpenses();
}

async function softDeleteExpense(expenseId) {
  const previous = allExpenses;
  const target = allExpenses.find((expense) => expense.id === expenseId || expense.invoice_id === expenseId);
  const targetIds = target?.invoice_id ? allExpenses.filter((expense) => expense.invoice_id === target.invoice_id).map((expense) => expense.id) : [expenseId];
  allExpenses = allExpenses.filter((expense) => !targetIds.includes(expense.id));
  renderAllExpenses();
  const { error } = target?.invoice_id
    ? await supabase.from('expenses').update({ is_deleted: true }).eq('invoice_id', target.invoice_id).eq('user_id', currentUser.id)
    : await supabase.from('expenses').update({ is_deleted: true }).eq('id', expenseId).eq('user_id', currentUser.id);
  if (error) { allExpenses = previous; renderAllExpenses(); showToast(error.message, true); return; }
  const verifyQuery = target?.invoice_id
    ? supabase.from('expenses').select('id').eq('invoice_id', target.invoice_id).eq('user_id', currentUser.id).eq('is_deleted', true).limit(1).maybeSingle()
    : supabase.from('expenses').select('id').eq('id', expenseId).eq('user_id', currentUser.id).eq('is_deleted', true).maybeSingle();
  const { data: deletedExpense, error: verifyError } = await verifyQuery;
  if (verifyError || !deletedExpense) { allExpenses = previous; renderAllExpenses(); showToast(verifyError?.message || 'Expense could not be deleted.', true); return; }
  showToast('Expense moved to Deleted Expenses.');
}

async function clearAllExpenses() {
  if (showingDeletedExpenses || !currentUser || !allExpenses.length) {
    showToast('There are no active expenses to clear.', true);
    return;
  }
  if (!window.confirm('Move all expenses in this table to Deleted Expenses?')) return;

  const previous = allExpenses;
  allExpenses = [];
  renderAllExpenses();
  const { error } = await supabase.from('expenses').update({ is_deleted: true }).eq('user_id', currentUser.id).eq('is_deleted', false);
  if (error) {
    allExpenses = previous;
    renderAllExpenses();
    showToast(error.message, true);
    return;
  }

  const { data: remainingExpenses, error: verifyError } = await supabase.from('expenses').select('id').eq('user_id', currentUser.id).eq('is_deleted', false).limit(1);
  if (verifyError || remainingExpenses?.length) {
    await loadAllExpenses(false);
    showToast(verifyError?.message || 'Some expenses could not be cleared.', true);
    return;
  }
  showToast('All expenses moved to Deleted Expenses.');
}

async function restoreExpense(expenseId) {
  const previous = allExpenses;
  const target = allExpenses.find((expense) => expense.id === expenseId || expense.invoice_id === expenseId);
  const targetIds = target?.invoice_id ? allExpenses.filter((expense) => expense.invoice_id === target.invoice_id).map((expense) => expense.id) : [expenseId];
  allExpenses = allExpenses.filter((expense) => !targetIds.includes(expense.id));
  renderAllExpenses();
  const { error } = target?.invoice_id
    ? await supabase.from('expenses').update({ is_deleted: false }).eq('invoice_id', target.invoice_id).eq('user_id', currentUser.id)
    : await supabase.from('expenses').update({ is_deleted: false }).eq('id', expenseId).eq('user_id', currentUser.id);
  if (error) { allExpenses = previous; renderAllExpenses(); showToast(error.message, true); return; }
  showToast('Expense restored successfully.');
}

async function permanentlyDeleteExpense(expenseId) {
  const target = allExpenses.find((expense) => expense.id === expenseId || expense.invoice_id === expenseId);
  if (!target || !window.confirm(`Permanently delete "${target.item_name || target.title || 'this invoice'}"? This cannot be undone.`)) return;
  const previous = allExpenses;
  const targetIds = target.invoice_id ? allExpenses.filter((expense) => expense.invoice_id === target.invoice_id).map((expense) => expense.id) : [target.id];
  allExpenses = allExpenses.filter((expense) => !targetIds.includes(expense.id));
  renderAllExpenses();
  const query = target.invoice_id
    ? supabase.from('expenses').delete().eq('invoice_id', target.invoice_id).eq('user_id', currentUser.id).eq('is_deleted', true)
    : supabase.from('expenses').delete().eq('id', target.id).eq('user_id', currentUser.id).eq('is_deleted', true);
  const { error } = await query;
  if (error) { allExpenses = previous; renderAllExpenses(); showToast(error.message, true); return; }
  showToast('Expense permanently deleted.');
}

function showExpenseMessage(message, isError = false) {
  expenseMessage.textContent = message;
  expenseMessage.className = `rounded-xl px-3 py-2 text-xs leading-5 ${isError ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`;
}

function getInitials(name) {
  return (name || 'User').trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase();
}

async function resolveAvatarUrl(value) {
  if (!value) return '';
  if (value.startsWith('http')) return value;
  const { data, error } = await supabase.storage.from('avatars').createSignedUrl(value, 3600);
  if (error) return '';
  return data.signedUrl;
}

async function updateProfileUI(profile) {
  const displayName = profile.name || currentUser?.user_metadata?.name || 'Family member';
  const email = profile.email || currentUser?.email || '';
  const initials = getInitials(displayName);
  const avatarUrl = await resolveAvatarUrl(profile.avatar_url);
  const avatarImage = avatarUrl ? `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(displayName)}" class="h-full w-full object-cover">` : initials;
  const headerAvatar = profileButton.children[0];
  headerAvatar.innerHTML = avatarImage;
  headerAvatar.className = 'grid h-8 w-8 place-items-center overflow-hidden rounded-lg bg-[#e6d8ca] text-xs font-bold text-[#674a39]';
  profileButton.children[1].querySelector('span:first-child').textContent = displayName;
  document.querySelector('#dropdownName').textContent = displayName;
  document.querySelector('#dropdownEmail').textContent = email;
  profileAvatarPreview.innerHTML = avatarUrl ? `<img src="${escapeHtml(avatarUrl)}" alt="${escapeHtml(displayName)}" class="h-full w-full object-cover">` : initials;
  document.querySelector('#profileNameInput').value = displayName;
  document.querySelector('#profilePhoneInput').value = profile.phone || '';
  document.querySelector('#profileEmailInput').value = email;
}

async function loadProfile() {
  if (!currentUser) return;
  const { data, error } = await supabase.from('users').select('id, name, email, phone, avatar_url, role').eq('id', currentUser.id).maybeSingle();
  if (error) {
    showProfileMessage(error.message, true);
    return;
  }
  if (data) {
    currentProfile = data;
  } else {
    currentProfile = { id: currentUser.id, name: currentUser.user_metadata?.name || '', email: currentUser.email || '', phone: '', avatar_url: '', role: 'Member' };
    const { error: profileInsertError } = await supabase.from('users').upsert({ id: currentProfile.id, name: currentProfile.name, email: currentProfile.email, phone: currentProfile.phone, avatar_url: currentProfile.avatar_url }, { onConflict: 'id' });
    if (profileInsertError) showProfileMessage(profileInsertError.message, true);
  }
  await updateProfileUI(currentProfile);
  const canManageMembers = isAdmin();
  addUserButton.disabled = !canManageMembers;
  addUserButton.title = canManageMembers ? 'Add a family member' : 'Only Admins can add members';
  addUserButton.classList.toggle('cursor-not-allowed', !canManageMembers);
  addUserButton.classList.toggle('opacity-50', !canManageMembers);
}

async function loadUserContext(user) {
  if (!user) return null;

  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, phone, avatar_url, role')
    .eq('id', user.id)
    .maybeSingle();

  if (error) throw error;

  currentProfile = data || {
    id: user.id,
    name: user.user_metadata?.name || '',
    email: user.email || '',
    phone: '',
    avatar_url: '',
    role: 'Member',
  };
  return currentProfile;
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
  return path;
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
  renderDashboardChart();
}

function renderDashboardChart() {
  if (!dashboardChart || !dashboardChartLabels) return;
  const monthMap = new Map();
  const addMonth = (dateString, field, amount) => {
    if (!dateString) return;
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) return;
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const row = monthMap.get(key) || { income: 0, expense: 0 };
    row[field] += Number(amount || 0);
    monthMap.set(key, row);
  };
  incomes.filter((income) => !income.is_deleted).forEach((income) => addMonth(income.income_date, 'income', income.amount));
  allExpenses.filter((expense) => !expense.is_deleted).forEach((expense) => addMonth(expense.expense_date, 'expense', getExpenseAmount(expense)));
  const months = [...monthMap.keys()].sort().slice(-6);
  while (months.length < 6) {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - months.length));
    months.unshift(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
    if (!monthMap.has(months[0])) monthMap.set(months[0], { income: 0, expense: 0 });
  }
  const maxAmount = Math.max(1, ...months.flatMap((month) => [monthMap.get(month)?.income || 0, monthMap.get(month)?.expense || 0]));
  const totalIncome = incomes.filter((income) => !income.is_deleted).reduce((sum, income) => sum + Number(income.amount || 0), 0);
  const totalExpense = allExpenses.filter((expense) => !expense.is_deleted).reduce((sum, expense) => sum + getExpenseAmount(expense), 0);
  document.querySelector('#dashboardIncomeTotal').textContent = formatTaka(totalIncome);
  document.querySelector('#dashboardExpenseTotal').textContent = formatTaka(totalExpense);
  document.querySelector('#dashboardBalanceTotal').textContent = formatTaka(totalIncome - totalExpense);
  dashboardChart.innerHTML = months.map((month) => {
    const row = monthMap.get(month) || { income: 0, expense: 0 };
    const incomeHeight = Math.max(row.income ? 6 : 2, Math.round((row.income / maxAmount) * 160));
    const expenseHeight = Math.max(row.expense ? 6 : 2, Math.round((row.expense / maxAmount) * 160));
    return `<div class="flex min-w-0 flex-1 items-end justify-center gap-1" title="${formatReportMonth(month)}: ${formatTaka(row.income)} income, ${formatTaka(row.expense)} expense"><span class="w-2.5 rounded-t-md bg-emerald-400 transition-all duration-500 sm:w-4" style="height:${incomeHeight}px"></span><span class="w-2.5 rounded-t-md bg-rose-400 transition-all duration-500 sm:w-4" style="height:${expenseHeight}px"></span></div>`;
  }).join('');
  dashboardChartLabels.innerHTML = months.map((month) => `<span class="min-w-0 flex-1 text-center text-[9px] font-semibold text-slate-400">${formatReportMonth(month).split(' ')[0]}</span>`).join('');
}

async function loadExpenses() {
  if (!currentUser) return;
  const { data, error } = await supabase.from('expenses').select('id, title, amount, category, expense_date, created_at').eq('user_id', currentUser.id).eq('is_deleted', false).order('expense_date', { ascending: false }).order('created_at', { ascending: false });
  if (error) {
    showExpenseMessage(error.message, true);
    return;
  }
  allExpenses = data || [];
  renderExpenses(allExpenses);
}

async function deleteExpense(expenseId) {
  await softDeleteExpense(expenseId);
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

async function loadMembers() {
  if (!currentUser || !isAdmin()) return;
  const { data, error } = await supabase.functions.invoke('list-family-members', { method: 'GET' });
  if (error) {
    let message = error.message;
    try {
      const details = await error.context?.json();
      message = details?.error || message;
    } catch {
      // Keep the SDK error when the response body is unavailable.
    }
    showToast(message, true);
    return;
  }
  members = data?.members || [];
  renderMembers();
}

function setAddUserModal(isOpen) {
  addUserModal.classList.toggle('hidden', !isOpen);
  addUserModal.classList.toggle('flex', isOpen);
  if (isOpen) newUserName.focus();
}

async function addMember(event) {
  event.preventDefault();
  if (!currentUser) return showToast('Please sign in before adding a member.', true);
  if (!isAdmin()) return showToast('Only Admins can add family members.', true);

  const name = newUserName.value.trim();
  const email = newUserEmail.value.trim().toLowerCase();
  const password = newUserPassword.value;
  const confirmPassword = newUserConfirmPassword.value;
  const role = newUserRole.value;
  if (password !== confirmPassword) {
    showToast('Password and confirm password do not match.', true);
    return;
  }
  addUserForm.querySelector('button[type="submit"]').disabled = true;

  const { error } = await supabase.functions.invoke('create-family-member', { body: { name, email, password, role } });
  addUserForm.querySelector('button[type="submit"]').disabled = false;
  if (error) {
    let message = error.message;
    try {
      const details = await error.context?.json();
      message = details?.error || message;
    } catch {
      // Keep the SDK error when the response body is unavailable.
    }
    showToast(message, true);
    return;
  }

  addUserForm.reset();
  setAddUserModal(false);
  await loadMembers();
  showToast('Family member added successfully.');
}

function renderMembers() {
  const roleFilter = userRoleFilter.value;
  const filtered = roleFilter === 'ALL' ? members : members.filter(m => m.role === roleFilter);

  membersTableBody.innerHTML = filtered.map(member => {
    const initials = getInitials(member.name);
    const avatar = member.avatar_url
      ? `<img src="${escapeHtml(member.avatar_url)}" class="h-10 w-10 rounded-full object-cover">`
      : `<div class="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-500">${initials}</div>`;

    return `<tr class="transition hover:bg-slate-50">
      <td class="px-6 py-4">
        <div class="flex items-center gap-3">
          ${avatar}
          <span class="text-sm font-semibold text-slate-800">${escapeHtml(member.name || 'Unnamed')}</span>
        </div>
      </td>
      <td class="px-6 py-4 text-sm text-slate-600">${escapeHtml(member.name?.toLowerCase().replace(/\s+/g, '.') || 'user')}</td>
      <td class="px-6 py-4">
        <span class="rounded-full px-3 py-1 text-[11px] font-bold ${
          member.role === 'Admin' ? 'bg-amber-50 text-amber-600' :
          member.role === 'Viewer' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
        }">${escapeHtml(member.role || 'Member')}</span>
      </td>
      <td class="px-6 py-4 text-sm text-slate-600">${escapeHtml(member.email)}</td>
      <td class="px-6 py-4 text-right">
        <div class="inline-flex items-center gap-1">
          <button type="button" class="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"><i data-lucide="pencil" class="h-4 w-4"></i></button>
          <button type="button" class="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"><i data-lucide="trash-2" class="h-4 w-4"></i></button>
        </div>
      </td>
    </tr>`;
  }).join('');

  membersEmpty.classList.toggle('hidden', filtered.length > 0);
  if (window.lucide) lucide.createIcons();
}

async function showDashboard(isVisible, user = currentUser, forceDashboard = false) {
  authView.classList.toggle('hidden', isVisible);
  dashboardView.classList.toggle('hidden', !isVisible);
  if (isVisible) {
    currentUser = user;
    await loadUserContext(currentUser);
    if (!currentUser || currentUser.id !== user.id) return;
    expenseDate.value = new Date().toISOString().slice(0, 10);
    expenseMemoDate.value = new Date().toISOString().slice(0, 10);
    incomeDate.value = new Date().toISOString().slice(0, 10);

    if (dashboardLoadUserId !== currentUser.id) {
      dashboardLoadUserId = currentUser.id;
      await updateProfileUI(currentProfile);
      Promise.all([loadExpenses(), loadIncomes()]).catch((error) => showToast(error.message, true));
      Promise.resolve()
        .then(() => syncSignupProfile(currentUser))
        .then(() => Promise.all([ensureDetailedExpenseCategories(), ensureDefaultIncomeSources()]))
        .catch((error) => showToast(error.message, true));
    }
    subscribeToExpenses();
    if (forceDashboard) window.location.hash = '#dashboard';
    const route = window.location.hash;
    setAppView(route === '#profile' ? 'profile' : route === '#expense-types' ? 'types' : route === '#expenses/all' ? 'all' : route === '#deleted-expenses' ? 'deleted' : route === '#expense/add' ? 'memo' : route === '#income-types' ? 'income-types' : route === '#deleted-income' ? 'deleted-income' : route === '#income/all' ? 'income-all' : route === '#income/add' || route === '#income' ? 'income' : route === '#reports/cash-in-hand' ? 'cash-in-hand' : route === '#reports/income-statement' ? 'income-statement' : route === '#reports/expense' ? 'expense-report' : route === '#reports' ? 'reports' : route === '#members' ? 'members' : 'dashboard');
    if (!route || route === '#dashboard') collapseNavigationMenus();
  } else {
    dashboardLoadUserId = null;
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
    is_deleted: false,
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

const logoutButton = document.querySelector('#logoutButton');
if (logoutButton) logoutButton.addEventListener('click', async () => {
  await supabase.auth.signOut();
  currentUser = null;
  showDashboard(false);
});

profileButton.addEventListener('click', (event) => {
  event.stopPropagation();
  profileDropdown.classList.toggle('hidden');
  profileButton.setAttribute('aria-expanded', String(!profileDropdown.classList.contains('hidden')));
});

document.querySelector('#openProfileButton').addEventListener('click', () => {
  profileDropdown.classList.add('hidden');
  profileButton.setAttribute('aria-expanded', 'false');
  window.location.hash = '#profile';
  setAppView('profile');
  setSidebar(false);
});
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
  if (file.size > 5 * 1024 * 1024) {
    showProfileMessage('Please choose an image smaller than 5 MB.', true);
    return;
  }
  try {
    profileAvatarPreview.innerHTML = `<img src="${URL.createObjectURL(file)}" alt="Selected avatar" class="h-full w-full object-cover">`;
    showProfileMessage('Uploading avatar...');
    const avatarPath = await uploadAvatar(file);
    const { error } = await supabase.from('users').upsert({ id: currentUser.id, name: currentProfile.name || currentUser.user_metadata?.name || 'Family member', email: currentUser.email, phone: currentProfile.phone || '', avatar_url: avatarPath }, { onConflict: 'id' });
    if (error) throw error;
    currentProfile = { ...currentProfile, avatar_url: avatarPath };
    await updateProfileUI(currentProfile);
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

async function applyAuthSession(session) {
  currentUser = session?.user || null;
  if (!currentUser) {
    currentProfile = null;
    await showDashboard(false, null);
    return;
  }

  try {
    await showDashboard(true, currentUser);
  } catch (error) {
    currentUser = null;
    currentProfile = null;
    await showDashboard(false, null);
    showMessage(`Could not load your account: ${error.message}`, true);
  }
}

supabase.auth.getSession().then(({ data: { session } }) => applyAuthSession(session));

supabase.auth.onAuthStateChange((_event, session) => {
  setTimeout(() => applyAuthSession(session), 0);
});

function setSidebar(open) {
  document.querySelector('#sidebar').classList.toggle('-translate-x-full', !open);
  document.querySelector('#mobileOverlay').classList.toggle('hidden', !open);
}

const expensesToggle = document.querySelector('#expensesToggle');
const expensesSubmenu = document.querySelector('#expensesSubmenu');
const expensesChevron = expensesToggle.querySelector('.expenses-chevron');
const expenseLinks = document.querySelectorAll('.expense-subitem');
const incomeToggle = document.querySelector('#incomeToggle');
const incomeSubmenu = document.querySelector('#incomeSubmenu');
const incomeChevron = incomeToggle.querySelector('.income-chevron');
const incomeLinks = document.querySelectorAll('.income-subitem');
const reportsToggle = document.querySelector('#reportsToggle');
const reportsSubmenu = document.querySelector('#reportsSubmenu');
const reportsChevron = reportsToggle.querySelector('.reports-chevron');
const reportLinks = document.querySelectorAll('.report-subitem');

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

function setIncomeExpanded(isExpanded) {
  incomeToggle.setAttribute('aria-expanded', String(isExpanded));
  incomeSubmenu.classList.toggle('grid-rows-[1fr]', isExpanded);
  incomeSubmenu.classList.toggle('grid-rows-[0fr]', !isExpanded);
  incomeChevron.classList.toggle('rotate-180', isExpanded);
}

function setActiveIncomeLink(activeLink) {
  incomeLinks.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle('bg-slate-100', isActive);
    link.classList.toggle('font-semibold', isActive);
    link.classList.toggle('text-slate-900', isActive);
    link.classList.toggle('text-slate-600', !isActive);
    link.querySelector('.active-indicator').classList.toggle('opacity-0', !isActive);
  });
}

function setReportsExpanded(isExpanded) {
  reportsToggle.setAttribute('aria-expanded', String(isExpanded));
  reportsSubmenu.classList.toggle('grid-rows-[1fr]', isExpanded);
  reportsSubmenu.classList.toggle('grid-rows-[0fr]', !isExpanded);
  reportsChevron.classList.toggle('rotate-180', isExpanded);
}

function collapseNavigationMenus() {
  setExpensesExpanded(false);
  setIncomeExpanded(false);
  setReportsExpanded(false);
}

function setActiveReportLink(activeLink) {
  reportLinks.forEach((link) => {
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
incomeToggle.addEventListener('click', () => setIncomeExpanded(incomeToggle.getAttribute('aria-expanded') !== 'true'));
reportsToggle.addEventListener('click', () => setReportsExpanded(reportsToggle.getAttribute('aria-expanded') !== 'true'));
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
incomeLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveIncomeLink(link);
    setIncomeExpanded(true);
    const view = link.dataset.incomeLink === 'types' ? 'income-types' : link.dataset.incomeLink === 'deleted' ? 'deleted-income' : link.dataset.incomeLink === 'all' ? 'income-all' : 'income';
    window.location.hash = link.getAttribute('href');
    setAppView(view);
    setSidebar(false);
    if (link.dataset.incomeLink === 'add') document.querySelector('#incomeSource').focus();
  });
});
reportLinks.forEach((link) => {
  link.addEventListener('click', () => {
    setActiveReportLink(link);
    setReportsExpanded(true);
    const view = link.dataset.reportLink === 'cash' ? 'cash-in-hand' : link.dataset.reportLink === 'income-statement' ? 'income-statement' : link.dataset.reportLink === 'expense' ? 'expense-report' : 'reports';
    window.location.hash = link.getAttribute('href');
    setAppView(view);
    setSidebar(false);
  });
});
const profileTitle = document.querySelector('#profileTitle');
const profileTabs = document.querySelectorAll('.profile-tab');
const profileSections = document.querySelectorAll('.profile-section');
const profileSectionTitles = {
  general: 'General Information',
  family: 'Family Members Info',
  contact: 'Personal & Contact Info',
  wallets: 'Bank, MFS & Wallets',
  address: 'Home / Address',
  password: 'Change Password',
  notifications: 'Notification Settings',
};

profileTabs.forEach((tab) => tab.addEventListener('click', () => {
  profileTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle('border-navy', active);
    item.classList.toggle('text-navy', active);
    item.classList.toggle('border-transparent', !active);
    item.classList.toggle('text-slate-400', !active);
  });
  showToast(`${tab.textContent.trim()} selected.`);
}));

profileSections.forEach((section) => section.addEventListener('click', () => {
  profileSections.forEach((item) => {
    const active = item === section;
    item.classList.toggle('bg-navy', active);
    item.classList.toggle('text-white', active);
    item.classList.toggle('font-bold', active);
    item.classList.toggle('text-slate-500', !active);
    item.classList.toggle('text-slate-600', active ? false : item.dataset.profileSection === 'general');
  });
  profileTitle.textContent = profileSectionTitles[section.dataset.profileSection];
}));

document.querySelector('#saveNotificationButton').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.innerHTML = '<i data-lucide="check-check" class="h-4 w-4"></i> Saved';
  if (window.lucide) lucide.createIcons();
  showToast('Notification preferences saved.');
  setTimeout(() => {
    button.innerHTML = '<i data-lucide="check" class="h-4 w-4"></i> Save preferences';
    if (window.lucide) lucide.createIcons();
  }, 1800);
});

document.querySelectorAll('[data-profile-action]').forEach((button) => button.addEventListener('click', () => {
  const action = button.dataset.profileAction;
  const view = action === 'income' ? 'income' : action === 'expense' ? 'memo' : 'reports';
  const hash = action === 'income' ? '#income/add' : action === 'expense' ? '#expense/add' : '#reports';
  window.location.hash = hash;
  setAppView(view);
}));
document.querySelector('#expenseTypesBack').addEventListener('click', () => {
  setAppView('dashboard');
  window.location.hash = '#dashboard';
});
document.querySelector('#addExpenseTypeButton').addEventListener('click', () => openExpenseTypeModal());
document.querySelector('#addExpenseNameButton').addEventListener('click', async () => {
  if (!expenseTypes.length) await loadExpenseTypes();
  openExpenseTypeModal(null, true);
});
document.querySelector('#closeExpenseTypeModal').addEventListener('click', closeExpenseTypeModal);
document.querySelector('#resetExpenseType').addEventListener('click', closeExpenseTypeModal);
expenseTypeModal.addEventListener('click', (event) => {
  if (event.target === expenseTypeModal) closeExpenseTypeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !expenseTypeModal.classList.contains('hidden')) closeExpenseTypeModal();
});
expenseTypeSearch.addEventListener('input', renderExpenseTypes);
expenseTypeViewFilter.addEventListener('change', renderExpenseTypes);
expenseTypeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = expenseTypeName.value.trim();
  const description = expenseTypeDescription.value.trim();
  if (!currentUser || !name) return;
  if (creatingExpenseName && !expenseTypeParent.value) {
    showToast('Please select an Expense Type for this Expense Name.', true);
    expenseTypeParent.focus();
    return;
  }
  const payload = { family_id: currentUser.id, name, parent_id: expenseTypeParent.value || null, description, is_deleted: false };
  const submitButton = expenseTypeForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  const { error } = editingExpenseTypeId
    ? await supabase.from('expense_categories').update({ name, parent_id: payload.parent_id, description }).eq('id', editingExpenseTypeId).eq('family_id', currentUser.id)
    : await supabase.from('expense_categories').insert(payload);
  submitButton.disabled = false;
  if (error) { showToast(error.message, true); return; }
  showToast(editingExpenseTypeId ? 'Expense type updated successfully.' : 'Expense item added successfully.');
  await loadExpenseTypes();
  closeExpenseTypeModal();
});
document.querySelector('#addMemoRow').addEventListener('click', () => addMemoRow());
document.querySelector('#addIncomeTypeButton').addEventListener('click', () => setIncomeTypeModal(true));
closeIncomeTypeModal.addEventListener('click', () => setIncomeTypeModal(false));
incomeTypeModal.addEventListener('click', (event) => { if (event.target === incomeTypeModal) setIncomeTypeModal(false); });
document.querySelector('#memoBackButton').addEventListener('click', () => { window.location.hash = '#dashboard'; setAppView('dashboard'); });
document.querySelector('#newExpenseButton').addEventListener('click', () => { window.location.hash = '#expense/add'; setAppView('memo'); });
incomeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!currentUser) return;
  incomeSubmit.disabled = true;
  incomeMessage.classList.add('hidden');
  const incomePayload = {
    source: document.querySelector('#incomeSource').value.trim(),
    amount: Number(document.querySelector('#incomeAmount').value),
    income_date: incomeDate.value,
    note: document.querySelector('#incomeNote').value.trim() || null,
  };
  const { error } = editingIncomeId
    ? await supabase.from('incomes').update(incomePayload).eq('id', editingIncomeId).eq('user_id', currentUser.id)
    : await supabase.from('incomes').insert({ ...incomePayload, user_id: currentUser.id, is_deleted: false });
  incomeSubmit.disabled = false;
  if (error) { showIncomeMessage(error.message, true); return; }
  const wasEditing = Boolean(editingIncomeId);
  editingIncomeId = null;
  incomeForm.reset();
  incomeDate.value = new Date().toISOString().slice(0, 10);
  await loadIncomes();
  showToast(wasEditing ? 'Income updated successfully.' : 'Income saved successfully.');
});
incomeTypeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!currentUser) return;
  const name = incomeTypeName.value.trim();
  if (!name) return;
  const { error } = await supabase.from('income_categories').insert({ user_id: currentUser.id, name, description: incomeTypeDescription.value.trim() || null, is_deleted: false });
  if (error) { showIncomeTypeMessage(error.message, true); return; }
  incomeTypeForm.reset();
  setIncomeTypeModal(false);
  await loadIncomeTypes();
  showToast('Income type added successfully.');
});
expenseMemoForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!currentUser) return showToast('Please sign in before saving an invoice.', true);
  const rows = [...memoRows.querySelectorAll('[data-memo-row]')].map((row) => ({ item_name: row.querySelector('[data-field="name"]').value.trim(), expense_type: row.querySelector('[data-field="expense-type"]').value.trim(), unit: row.querySelector('[data-field="unit"]').value.trim(), quantity: Number(row.querySelector('[data-field="quantity"]').value), unit_price: Number(row.querySelector('[data-field="unit-price"]').value) }));
  if (rows.some((row) => !row.item_name || !row.expense_type || !row.unit || !Number.isFinite(row.quantity) || row.quantity <= 0 || !Number.isFinite(row.unit_price) || row.unit_price <= 0)) return showToast('Please complete every item with a valid name, quantity, unit, and price.', true);
  rows.forEach((row) => {
    const type = expenseTypes.find((item) => item.id === row.expense_type);
    row.expense_type = type?.name || row.expense_type;
  });
  const saveButton = document.querySelector('#saveInvoiceButton');
  saveButton.disabled = true;
  const invoiceId = editingExpenseId ? null : crypto.randomUUID();
  const { error } = editingExpenseId
    ? await supabase.from('expenses').update({ ...rows[0], title: rows[0].item_name, amount: rows[0].quantity * rows[0].unit_price, category: rows[0].expense_type, expense_date: expenseMemoDate.value, total_amount: rows[0].quantity * rows[0].unit_price }).eq('id', editingExpenseId).eq('user_id', currentUser.id)
    : await supabase.from('expenses').insert(rows.map((row) => {
      const totalAmount = row.quantity * row.unit_price;
      return { ...row, user_id: currentUser.id, invoice_id: invoiceId, title: row.item_name, amount: totalAmount, category: row.expense_type, expense_date: expenseMemoDate.value, total_amount: totalAmount, is_deleted: false };
    }));
  saveButton.disabled = false;
  if (error) return showToast(error.message, true);
  showToast('Invoice saved successfully!');
  expenseMemoForm.reset();
  memoRows.innerHTML = '';
  addMemoRow();
  editingExpenseId = null;
  window.location.hash = '#expense/add';
  setAppView('memo');
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
        const route = item.dataset.nav === 'Dashboard' ? '#dashboard' : item.dataset.nav === 'Reports' ? '#reports' : item.dataset.nav === 'Members' ? '#members' : '#dashboard';
    window.location.hash = route;
    setAppView(item.dataset.nav === 'Dashboard' ? 'dashboard' : item.dataset.nav === 'Reports' ? 'reports' : item.dataset.nav === 'Members' ? 'members' : 'dashboard');
    if (item.dataset.nav === 'Dashboard') collapseNavigationMenus();
    setSidebar(false);
  });
});

if (reportRangeSelect) reportRangeSelect.addEventListener('change', renderReports);
if (statementApplyButton) statementApplyButton.addEventListener('click', renderIncomeStatement);
if (allIncomeSearch) allIncomeSearch.addEventListener('input', renderAllIncome);
if (allIncomeSourceFilter) allIncomeSourceFilter.addEventListener('change', renderAllIncome);
if (allIncomeStartDate) allIncomeStartDate.addEventListener('change', renderAllIncome);
if (allIncomeEndDate) allIncomeEndDate.addEventListener('change', renderAllIncome);
if (expenseReportHeadFilter) expenseReportHeadFilter.addEventListener('change', renderExpenseReport);
if (expenseReportMemberFilter) expenseReportMemberFilter.addEventListener('change', renderExpenseReport);
if (expenseReportStartDate) expenseReportStartDate.addEventListener('change', renderExpenseReport);
if (expenseReportEndDate) expenseReportEndDate.addEventListener('change', renderExpenseReport);
function buildExpenseReportExportRows() {
  return getFilteredExpenseReportRows().map((expense) => ({
    type: expense.item_name || expense.title || 'Expense',
    category: expense.expense_type || expense.category || 'Other Expense',
    date: expense.expense_date || '',
    object: 1,
    amount: getExpenseAmount(expense),
  }));
}

if (expenseReportPdfButton) expenseReportPdfButton.addEventListener('click', () => {
  const rows = buildExpenseReportExportRows();
  const total = rows.reduce((sum, row) => sum + row.amount, 0);
  const printWindow = window.open('', '_blank', 'width=1000,height=700');
  if (!printWindow) return showToast('Please allow pop-ups to print the expense report.', true);
  printWindow.document.write(`<!doctype html><html><head><title>Expense Report</title><style>body{font-family:Arial,sans-serif;color:#172033;padding:28px}h1{text-align:center;font-size:20px;margin:0 0 8px}p{color:#64748b;text-align:center;font-size:12px;margin:0 0 20px}table{width:100%;border-collapse:collapse;font-size:12px}th{background:#334155;color:#fff;text-align:left;padding:10px}td{border-bottom:1px solid #e2e8f0;padding:9px}td:last-child,th:last-child{text-align:right}.total td{background:#fff1f2;color:#be123c;font-weight:700}</style></head><body><h1>Expense Report</h1><p>${escapeHtml(expenseReportStartDate.value || 'All dates')} to ${escapeHtml(expenseReportEndDate.value || 'All dates')} · All members</p><table><thead><tr><th>Expense Type</th><th>Category</th><th>Date</th><th>Object</th><th>Amount</th></tr></thead><tbody>${rows.length ? rows.map((row) => `<tr><td>${escapeHtml(row.type)}</td><td>${escapeHtml(row.category)}</td><td>${escapeHtml(row.date)}</td><td>${row.object}</td><td>${formatTaka(row.amount)}</td></tr>`).join('') : '<tr><td colspan="5">No expenses found for this filter.</td></tr>'}</tbody><tfoot><tr class="total"><td colspan="4">TOTAL EXPENSE</td><td>${formatTaka(total)}</td></tr></tfoot></table></body></html>`);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
});
if (expenseReportCsvButton) expenseReportCsvButton.addEventListener('click', () => {
  const rows = buildExpenseReportExportRows();
  const csv = [['Expense Type', 'Category', 'Date', 'Object', 'Amount'], ...rows.map((row) => [row.type, row.category, row.date, row.object, row.amount])].map((row) => row.map((value) => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = 'expense-report.csv';
  link.click();
  URL.revokeObjectURL(link.href);
});
if (userRoleFilter) userRoleFilter.addEventListener('change', renderMembers);
if (addUserButton) addUserButton.addEventListener('click', () => setAddUserModal(true));
if (closeAddUserModal) closeAddUserModal.addEventListener('click', () => setAddUserModal(false));
if (cancelAddUser) cancelAddUser.addEventListener('click', () => setAddUserModal(false));
if (addUserModal) addUserModal.addEventListener('click', (event) => { if (event.target === addUserModal) setAddUserModal(false); });
if (addUserForm) addUserForm.addEventListener('submit', addMember);

if (window.lucide) lucide.createIcons();
collapseNavigationMenus();
})();