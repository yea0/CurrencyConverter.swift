# Currency Converter - Web Version

A modern web-based currency converter built with **Tailwind CSS** and vanilla JavaScript.

## Features

✨ **Beautiful UI** - Modern gradient design with Tailwind CSS
💱 **Real-time Conversion** - Instantly convert between 8 major currencies
🔄 **Swap Function** - Quickly reverse from/to currencies
📊 **Conversion History** - Track your recent conversions
📱 **Responsive Design** - Works on desktop, tablet, and mobile

## Supported Currencies

- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- CAD (Canadian Dollar)
- AUD (Australian Dollar)
- CHF (Swiss Franc)
- CNY (Chinese Yuan)

## Getting Started

1. Open `index.html` in your browser
2. Enter the amount to convert
3. Select source and target currencies
4. Click "Convert" or just type to auto-convert
5. Use the swap button to reverse currencies

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling (CDN)
- **JavaScript** - Vanilla JS for conversion logic
- **Chart.js** - Ready for future charts integration

## File Structure

```
web/
├── index.html      # Main HTML file
├── script.js       # JavaScript logic
└── README.md       # This file
```

## Notes

- Currently uses mock exchange rates
- For production, integrate a real currency API (e.g., ExchangeRate-API, Fixer.io)
- No build process needed - works directly in browser

## Future Enhancements

- [ ] Real-time API integration
- [ ] Historical exchange rate charts
- [ ] Favorite currency pairs
- [ ] Dark mode toggle
- [ ] Multiple currency conversions
- [ ] Offline mode with cached rates
