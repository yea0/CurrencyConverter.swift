// Mock exchange rates (in production, use a real API)
const exchangeRates = {
    'USD': 1,
    'EUR': 0.92,
    'GBP': 0.79,
    'JPY': 149.50,
    'CAD': 1.36,
    'AUD': 1.53,
    'CHF': 0.88,
    'CNY': 7.24
};

let conversionHistory = [];

const fromAmountInput = document.getElementById('fromAmount');
const toAmountInput = document.getElementById('toAmount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const rateInfo = document.getElementById('rateInfo');
const historyList = document.getElementById('historyList');

// Convert function
function convert() {
    const fromAmount = parseFloat(fromAmountInput.value) || 0;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Convert to USD first, then to target currency
    const amountInUSD = fromAmount / exchangeRates[fromCurrency];
    const toAmount = amountInUSD * exchangeRates[toCurrency];

    toAmountInput.value = toAmount.toFixed(2);

    // Update exchange rate info
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    rateInfo.textContent = `1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;

    // Add to history
    if (fromAmount > 0) {
        addToHistory(fromAmount, fromCurrency, toAmount.toFixed(2), toCurrency);
    }
}

// Add to history
function addToHistory(fromAmount, fromCurrency, toAmount, toCurrency) {
    const entry = `${fromAmount} ${fromCurrency} = ${toAmount} ${toCurrency}`;
    const timestamp = new Date().toLocaleTimeString();

    if (!conversionHistory.includes(entry)) {
        conversionHistory.unshift({ entry, timestamp });
        if (conversionHistory.length > 10) {
            conversionHistory.pop();
        }
        updateHistoryDisplay();
    }
}

// Update history display
function updateHistoryDisplay() {
    if (conversionHistory.length === 0) {
        historyList.innerHTML = '<p class="text-gray-500 text-center py-4">No conversions yet</p>';
        return;
    }

    historyList.innerHTML = conversionHistory.map((item, index) => `
        <div class="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
            <span class="font-medium text-gray-800">${item.entry}</span>
            <span class="text-sm text-gray-500">${item.timestamp}</span>
        </div>
    `).join('');
}

// Swap currencies
function swap() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    convert();
}

// Event listeners
convertBtn.addEventListener('click', convert);
swapBtn.addEventListener('click', swap);
fromAmountInput.addEventListener('input', convert);
fromCurrencySelect.addEventListener('change', convert);
toCurrencySelect.addEventListener('change', convert);

// Initial conversion
convert();