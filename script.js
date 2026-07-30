const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83,
  JPY: 156.5,
  CAD: 1.36,
  AUD: 1.52,
};

const form = document.getElementById('converter-form');
const amountInput = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const conversionMessage = document.getElementById('conversionMessage');
const resultValue = document.getElementById('resultValue');
const rateInfo = document.getElementById('rateInfo');

function populateCurrencyOptions() {
  const options = Object.keys(exchangeRates)
    .map((code) => `<option value="${code}">${code}</option>`)
    .join('');

  fromCurrency.innerHTML = options;
  toCurrency.innerHTML = options;
  fromCurrency.value = 'USD';
  toCurrency.value = 'INR';
}

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function convertCurrency(amount, from, to) {
  return (amount / exchangeRates[from]) * exchangeRates[to];
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const amount = parseFloat(amountInput.value || '0');
  if (!amount || Number.isNaN(amount) || amount < 0) {
    conversionMessage.textContent = 'Please enter a valid amount.';
    resultValue.textContent = '';
    rateInfo.textContent = '';
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;
  const convertedAmount = convertCurrency(amount, from, to);
  const exchangeRate = exchangeRates[to] / exchangeRates[from];

  conversionMessage.textContent = `${amount.toFixed(2)} ${from} equals`;
  resultValue.textContent = formatCurrency(convertedAmount, to);
  rateInfo.textContent = `Approximate rate: 1 ${from} = ${exchangeRate.toFixed(4)} ${to}`;
});

populateCurrencyOptions();
