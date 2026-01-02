import axios from 'axios';
import { ProductResult } from '../types';

const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
];

export async function searchProductOnGoogle(productName: string): Promise<ProductResult[]> {
  const searchQuery = encodeURIComponent(`${productName} price in India`);
  const googleShoppingUrl = `https://www.google.com/search?q=${searchQuery}&tbm=shop`;
  
  let htmlContent = '';
  
  // Try each CORS proxy
  for (const proxy of CORS_PROXIES) {
    try {
      const proxyUrl = `${proxy}${encodeURIComponent(googleShoppingUrl)}`;
      const response = await axios.get(proxyUrl, {
        timeout: 15000,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      
      if (response.data) {
        htmlContent = typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
        break;
      }
    } catch (error) {
      console.error(`Proxy ${proxy} failed:`, error);
      continue;
    }
  }
  
  if (!htmlContent) {
    throw new Error('Failed to fetch Google Shopping results');
  }
  
  // Parse the HTML to extract product listings
  return parseGoogleShoppingResults(htmlContent, productName);
}

function parseGoogleShoppingResults(html: string, productName: string): ProductResult[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const results: ProductResult[] = [];
  
  // Google Shopping result selectors (these may need adjustment based on Google's HTML structure)
  const productCards = doc.querySelectorAll('.sh-dgr__content, .sh-dgr__grid-result, [data-sh-sr]');
  
  productCards.forEach((card, index) => {
    try {
      // Extract price
      const priceElement = card.querySelector('.a8Pemb, .T14wmb, .FKWzIb, span[aria-label*="₹"], span[aria-label*="rupee"]');
      const priceText = priceElement?.textContent || priceElement?.getAttribute('aria-label') || '';
      const price = extractPrice(priceText);
      
      // Extract seller/website name
      const sellerElement = card.querySelector('.aULzUe, .IuHnof, .shntl');
      const seller = sellerElement?.textContent?.trim() || `Seller ${index + 1}`;
      
      // Extract product link
      const linkElement = card.querySelector('a[href]');
      const productUrl = linkElement?.getAttribute('href') || '';
      
      // Extract image
      const imageElement = card.querySelector('img');
      const imageUrl = imageElement?.getAttribute('src') || imageElement?.getAttribute('data-src') || '';
      
      if (price !== null && price > 0) {
        results.push({
          website: seller,
          price: price,
          available: true,
          url: productUrl.startsWith('http') ? productUrl : `https://www.google.com${productUrl}`,
          productName: productName,
          image: imageUrl || 'https://via.placeholder.com/150',
          logo: getLogoForSeller(seller)
        });
      }
    } catch (error) {
      console.error('Error parsing product card:', error);
    }
  });
  
  // Sort by price (lowest first)
  return results.sort((a, b) => (a.price || 0) - (b.price || 0));
}

function extractPrice(priceText: string): number | null {
  // Remove non-numeric characters except decimal point
  const cleanPrice = priceText
    .replace(/[₹,\s]/g, '')
    .replace(/(\d+)\.(\d+).*/, '$1.$2');
  
  const price = parseFloat(cleanPrice);
  return isNaN(price) ? null : Math.round(price);
}

function getLogoForSeller(seller: string): string {
  const sellerLower = seller.toLowerCase();
  
  if (sellerLower.includes('amazon')) return '🛒';
  if (sellerLower.includes('flipkart')) return '🛍️';
  if (sellerLower.includes('myntra')) return '👔';
  if (sellerLower.includes('ajio')) return '👗';
  if (sellerLower.includes('reliance')) return '⚡';
  if (sellerLower.includes('croma')) return '🔌';
  if (sellerLower.includes('tata')) return '🏪';
  if (sellerLower.includes('snapdeal')) return '📦';
  if (sellerLower.includes('shopclues')) return '🏬';
  
  return '🛒';
}

// Alternative: Use Google Custom Search API (requires API key)
export async function searchWithGoogleAPI(productName: string, apiKey: string, searchEngineId: string): Promise<ProductResult[]> {
  try {
    const searchQuery = encodeURIComponent(`${productName} price India buy online`);
    const apiUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${searchQuery}`;
    
    const response = await axios.get(apiUrl);
    const results: ProductResult[] = [];
    
    if (response.data.items) {
      response.data.items.forEach((item: any) => {
        // Extract price from snippet or page metadata
        const snippet = item.snippet || '';
        const price = extractPrice(snippet);
        
        if (price) {
          results.push({
            website: new URL(item.link).hostname.replace('www.', ''),
            price: price,
            available: true,
            url: item.link,
            productName: item.title,
            image: item.pagemap?.cse_image?.[0]?.src || 'https://via.placeholder.com/150',
            logo: '🔍'
          });
        }
      });
    }
    
    return results.sort((a, b) => (a.price || 0) - (b.price || 0));
  } catch (error) {
    console.error('Google API search failed:', error);
    throw new Error('Google Search API failed. Check your API key and search engine ID.');
  }
}
