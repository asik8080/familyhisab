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
let authMode = 'signIn';
let currentUser = null;
let currentProfile = null;
let expensesChannel = null;
let resetStep = 'requestCode';

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
    await syncSignupProfile(currentUser);
    await loadProfile();
    await loadExpenses();
    subscribeToExpenses();
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
    setSidebar(false);
  });
});
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

if (window.lucide) lucide.createIcons();
})();