# Price Compare India 🛒

A React-based price comparison application that helps users find the best deals across multiple Indian e-commerce platforms.

## 🌟 Features

- Compare prices across 7 major Indian retailers:
  - Amazon India 🛒
  - Flipkart 🛍️
  - Myntra 👔
  - Ajio 👗
  - Reliance Digital ⚡
  - Croma 🔌
  - Tata Cliq 🏪

- Real-time price comparison (Demo Mode)
- Clean, responsive UI with Tailwind CSS
- Product name extraction from URLs
- Caching system for improved performance
- Sort by lowest price

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd PriceCompare

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173/PriceCompare/`

### Build for Production

```bash
npm run build
```

## ⚠️ IMPORTANT: Browser-Based Scraping Limitations

### Why Real-Time Scraping Doesn't Work in Browsers

This project demonstrates a **critical limitation** of browser-based web scraping:

#### 🚫 CORS (Cross-Origin Resource Sharing) Policy
- Browsers block requests to external websites for security reasons
- E-commerce sites don't allow cross-origin requests from other domains
- Even with CORS proxies, requests are blocked or rate-limited

#### 🚫 Anti-Bot Measures
- E-commerce websites actively block automated scraping
- CAPTCHAs, rate limiting, and IP blocking prevent automated access
- User-Agent headers cannot be modified in browsers (security restriction)

#### 🚫 CORS Proxy Failures
We attempted multiple approaches:
1. **Public CORS Proxies** - All failed or timed out
   - `allorigins.win` - Timeout (10000ms+)
   - `corsproxy.io` - Request blocked (403)
   - `api.codetabs.com` - Timeout
   - `thingproxy.freeboard.io` - Connection errors

2. **Google Shopping Search** - Blocked by Google's anti-bot systems
   - Cannot set User-Agent header in browser
   - Google detects and blocks automated requests
   - Returns empty or blocked results

### 📊 Current Solution: Demo Mode

The application includes a **Demo Mode** (enabled by default) that:
- Shows realistic sample data
- Demonstrates the full functionality
- Provides user experience without backend dependencies

## ✅ Solutions for Production Implementation

To make this work with **real data**, you would need one of these approaches:

### Option 1: Backend Server (Recommended)
```
Frontend (React) → Backend API (Node.js/Python) → E-commerce Sites
```
- **No CORS issues** - Server-side requests aren't restricted
- Use libraries like Puppeteer, Playwright, or Cheerio
- Can rotate User-Agents and implement proper delays
- Deploy on: Vercel, Netlify Functions, AWS Lambda

**Example Backend:**
```javascript
// Node.js Express Server
app.get('/api/scrape', async (req, res) => {
  const { url } = req.query;
  const html = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0...' }
  });
  // Parse and return data
});
```

### Option 2: Official Retailer APIs
- **Amazon Product Advertising API**
- **Flipkart Affiliate API**
- Legal, reliable, but requires approval and has rate limits
- May have costs associated

### Option 3: Third-Party Scraping Services
- **ScraperAPI** (scraperapi.com)
- **Bright Data** (brightdata.com)
- **Apify** (apify.com)
- Handle proxies, CAPTCHAs, and rotating IPs
- Paid services with usage limits

### Option 4: Browser Extension
- Browser extensions have **relaxed CORS policies**
- Can set custom headers and make cross-origin requests
- Limited to users who install the extension

### Option 5: Price Comparison APIs
- **RapidAPI** price comparison endpoints
- **PriceAPI** services
- Pre-aggregated data, but may require subscription

## 🛠️ Technical Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Deployment:** GitHub Pages ready

## 📁 Project Structure

```
PriceCompare/
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── URLInput.tsx
│   │   ├── ProductCard.tsx
│   │   └── ProductResults.tsx
│   ├── services/          # Business logic
│   │   ├── priceComparison.ts
│   │   ├── googleSearch.ts
│   │   └── mockData.ts
│   ├── utils/             # Helper functions
│   │   ├── scraper.ts
│   │   ├── urlParser.ts
│   │   └── cache.ts
│   ├── config/            # Configuration
│   │   └── websites.ts
│   ├── types/             # TypeScript types
│   │   └── index.ts
│   └── App.tsx
├── public/
└── package.json
```

## 🎯 How It Works (Demo Mode)

1. User pastes a product URL from any supported retailer
2. Application extracts product name from URL
3. Generates realistic mock price data
4. Displays results sorted by lowest price
5. Shows which retailer has the best deal

## 🔧 Configuration

Website configurations are in `src/config/websites.ts`:
- Search URL patterns
- CSS selectors for scraping
- Logo emojis
- Domain patterns

## 📝 Development Notes

### Lessons Learned
1. **Browser security is strict** - Can't bypass CORS without a backend
2. **Public proxies are unreliable** - Not suitable for production
3. **E-commerce sites are well-protected** - Anti-scraping measures are effective
4. **Demo mode is valuable** - Shows functionality even when real scraping fails

### For Contributors
If implementing backend scraping:
- Use proper delays between requests (2-3 seconds)
- Rotate User-Agents
- Respect robots.txt
- Implement rate limiting
- Cache results to minimize requests
- Consider legal implications (check terms of service)

## 🚧 Known Limitations

- ❌ Browser-based scraping blocked by CORS
- ❌ Public CORS proxies unreliable
- ❌ Cannot modify User-Agent in browser
- ❌ Google Shopping search blocked
- ✅ Demo mode works perfectly
- ✅ UI/UX fully functional
- ✅ Product name extraction works
- ✅ Caching system implemented

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Backend API implementation
- Integration with official retailer APIs
- Better mock data generation
- Additional retailer support
- UI/UX enhancements

## 💡 Future Enhancements

- [ ] Backend API server for real scraping
- [ ] Official retailer API integration
- [ ] Price history tracking
- [ ] Price drop alerts
- [ ] Browser extension version
- [ ] Mobile app (React Native)
- [ ] User authentication and saved searches
- [ ] Price prediction using ML

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Note:** This is a demonstration project showing the challenges of browser-based web scraping. For production use, implement a backend server or use official APIs.
