// Real Currency API Integration
const API_KEY = 'fca_live_xxxxxxxxxxxxxxxxxxxxxxxx'; // Replace with your API key from exchangerate-api.com
const API_URL = 'https://v6.exchangerate-api.com/v6';

let exchangeRates = {};
let conversionHistory = [];
let isLoadingRates = false;

const fromAmountInput = document.getElementById('fromAmount');
const toAmountInput = document.getElementById('toAmount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const rateInfo = document.getElementById('rateInfo');
const historyList = document.getElementById('historyList');

// Fetch real exchange rates from API
async function fetchExchangeRates(baseCurrency = 'USD') {
    try {
        isLoadingRates = true;
        rateInfo.textContent = '⏳ Loading rates...';
        
        // Using exchangerate-api.com free tier (no API key required for basic usage)
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        
        const data = await response.json();
        exchangeRates = data.rates;
        exchangeRates[baseCurrency] = 1; // Base currency is always 1
        
        isLoadingRates = false;
        convert(); // Perform conversion with new rates
        
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        rateInfo.textContent = '❌ Failed to load rates. Check your API key or internet connection.';
        isLoadingRates = false;
        
        // Fallback to mock rates if API fails
        loadFallbackRates();
    }
}

// Fallback mock rates if API fails
function loadFallbackRates() {
    exchangeRates = {
        'USD': 1,
        'EUR': 0.92,
        'GBP': 0.79,
        'JPY': 149.50,
        'CAD': 1.36,
        'AUD': 1.53,
        'CHF': 0.88,
        'CNY': 7.24,
        'INR': 83.12,
        'MXN': 17.05,
        'SGD': 1.35,
        'HKD': 7.81,
        'NZD': 1.62,
        'KRW': 1319.50
    };
    console.log('Using fallback mock rates');
}

// Convert function with real rates
function convert() {
    if (isLoadingRates || Object.keys(exchangeRates).length === 0) {
        return;
    }

    const fromAmount = parseFloat(fromAmountInput.value) || 0;
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
        console.error('Currency rates not available');
        return;
    }

    // Convert using exchange rates
    const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const toAmount = fromAmount * rate;

    toAmountInput.value = toAmount.toFixed(2);

    // Update exchange rate info
    rateInfo.textContent = `📊 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;

    // Add to history
    if (fromAmount > 0) {
        addToHistory(fromAmount, fromCurrency, toAmount.toFixed(2), toCurrency);
    }
}

// Add to history
function addToHistory(fromAmount, fromCurrency, toAmount, toCurrency) {
    const entry = `${fromAmount} ${fromCurrency} = ${toAmount} ${toCurrency}`;
    const timestamp = new Date().toLocaleTimeString();

    // Avoid duplicate consecutive entries
    if (conversionHistory.length === 0 || conversionHistory[0].entry !== entry) {
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
    fetchExchangeRates(toCurrencySelect.value);
}

// Debounce function for rate updates
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event listeners
convertBtn.addEventListener('click', convert);
swapBtn.addEventListener('click', swap);
fromAmountInput.addEventListener('input', convert);
fromCurrencySelect.addEventListener('change', () => fetchExchangeRates(fromCurrencySelect.value));
toCurrencySelect.addEventListener('change', convert);

// Initialize - fetch rates on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchExchangeRates('USD');
    
    // Refresh rates every 10 minutes
    setInterval(() => {
        fetchExchangeRates(fromCurrencySelect.value);
    }, 600000);
});
