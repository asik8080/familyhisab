const transactions = [
  { icon: 'shopping-basket', color: 'bg-orange-50 text-orange-600', name: 'Weekly groceries', category: 'Food & dining', date: 'Sep 09, 2026', amount: '-$126.40', type: 'expense' },
  { icon: 'banknote-arrow-down', color: 'bg-emerald-50 text-emerald-600', name: 'Monthly salary', category: 'Income', date: 'Sep 08, 2026', amount: '+$4,200.00', type: 'income' },
  { icon: 'home', color: 'bg-violet-50 text-violet-600', name: 'Apartment rent', category: 'Housing', date: 'Sep 05, 2026', amount: '-$1,850.00', type: 'expense' },
  { icon: 'car-front', color: 'bg-sky-50 text-sky-600', name: 'Fuel station', category: 'Transport', date: 'Sep 04, 2026', amount: '-$68.25', type: 'expense' }
];

const rows = document.querySelector('#transactionRows');
const searchInput = document.querySelector('#searchInput');

function renderTransactions(filter = '') {
  const searchTerm = filter.trim().toLowerCase();
  const filtered = transactions.filter((transaction) => `${transaction.name} ${transaction.category} ${transaction.date}`.toLowerCase().includes(searchTerm));
  rows.innerHTML = filtered.length
    ? filtered.map((transaction) => `<tr class="transition hover:bg-slate-50"><td class="px-6 py-4"><div class="flex items-center gap-3"><span class="grid h-9 w-9 place-items-center rounded-lg ${transaction.color}"><i data-lucide="${transaction.icon}" class="h-4 w-4"></i></span><span class="text-sm font-semibold">${transaction.name}</span></div></td><td class="px-4 py-4 text-xs font-medium text-slate-500">${transaction.category}</td><td class="px-4 py-4 text-xs text-slate-400">${transaction.date}</td><td class="px-6 py-4 text-right text-sm font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-ink'}">${transaction.amount}</td></tr>`).join('')
    : '<tr><td colspan="4" class="px-6 py-10 text-center text-sm text-slate-400">No transactions found.</td></tr>';
  lucide.createIcons();
}

function setSidebar(open) {
  document.querySelector('#sidebar').classList.toggle('-translate-x-full', !open);
  document.querySelector('#mobileOverlay').classList.toggle('hidden', !open);
}

document.querySelector('#openSidebar').addEventListener('click', () => setSidebar(true));
document.querySelector('#closeSidebar').addEventListener('click', () => setSidebar(false));
document.querySelector('#mobileOverlay').addEventListener('click', () => setSidebar(false));
searchInput.addEventListener('input', (event) => renderTransactions(event.target.value));

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

renderTransactions();
lucide.createIcons();