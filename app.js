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
let authMode = 'signIn';

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

function showDashboard(isVisible) {
  authView.classList.toggle('hidden', isVisible);
  dashboardView.classList.toggle('hidden', !isVisible);
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
  showDashboard(true);
});

document.querySelector('#logoutButton').addEventListener('click', async () => {
  await supabase.auth.signOut();
  showDashboard(false);
});

supabase.auth.getSession().then(({ data: { session } }) => showDashboard(Boolean(session)));

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