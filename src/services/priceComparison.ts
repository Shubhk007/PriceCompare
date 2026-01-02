import { ProductResult } from '../types';
import { WEBSITE_CONFIGS } from '../config/websites';
import { 
  fetchWithProxy, 
  parseHTML, 
  extractTextBySelectors,
  extractAttributeBySelectors,
  normalizePrice,
  calculateStringSimilarity 
} from '../utils/scraper';
import { detectWebsite, extractProductNameFromURL, cleanProductName } from '../utils/urlParser';
import { getCachedResults, setCachedResults, clearOldCache } from '../utils/cache';
import { searchProductOnGoogle } from './googleSearch';

export async function compareProducts(url: string): Promise<{
  results: ProductResult[];
  productName: string;
}> {
  // Clear old cache entries
  clearOldCache();
  
  // Check cache first
  const cached = getCachedResults(url);
  if (cached) {
    console.log('Returning cached results');
    return {
      results: cached.results,
      productName: cached.productName
    };
  }
  
  // Try Google Shopping search first (NEW APPROACH)
  try {
    const website = detectWebsite(url);
    const productName = extractProductNameFromURL(url, website || '');
    
    if (productName) {
      console.log('Attempting Google Shopping search for:', productName);
      const googleResults = await searchProductOnGoogle(productName);
      
      if (googleResults.length > 0) {
        console.log(`Found ${googleResults.length} results from Google Shopping`);
        setCachedResults(url, {
          results: googleResults,
          productName
        });
        return {
          results: googleResults,
          productName
        };
      }
    }
  } catch (error) {
    console.warn('Google Shopping search failed, falling back to direct scraping:', error);
  }
  
  // Step 1: Detect website
  const website = detectWebsite(url);
  if (!website) {
    throw new Error('Unsupported website. Please use Amazon, Flipkart, Myntra, Ajio, Reliance Digital, Croma, or Tata Cliq.');
  }
  
  // Step 2: Extract product name from URL
  let productName = extractProductNameFromURL(url, website);
  
  // Step 3: Try to get better product name from the actual page
  try {
    const html = await fetchWithProxy(url);
    const doc = parseHTML(html);
    
    // Try to extract title from page
    const titleElement = doc.querySelector('title');
    if (titleElement) {
      const pageTitle = cleanProductName(titleElement.textContent || '');
      if (pageTitle) {
        productName = pageTitle;
      }
    }
    
    // Also try h1 tags
    const h1 = doc.querySelector('h1');
    if (h1 && h1.textContent) {
      const h1Text = cleanProductName(h1.textContent);
      if (h1Text.length > productName.length) {
        productName = h1Text;
      }
    }
  } catch (error) {
    console.warn('Could not fetch original product page:', error);
  }
  
  if (!productName) {
    throw new Error('Could not extract product name from URL');
  }
  
  console.log('Searching for:', productName);
  
  // Step 4: Search on all other websites
  const searchPromises = Object.entries(WEBSITE_CONFIGS).map(([key, config]) => 
    searchWebsite(key, config.searchUrl(productName), productName, key === website)
  );
  
  const results = await Promise.all(searchPromises);
  
  // Step 5: Filter and sort results
  const validResults = results.filter(r => r.available && r.price !== null);
  const sortedResults = validResults.sort((a, b) => {
    if (a.price === null) return 1;
    if (b.price === null) return -1;
    return a.price - b.price;
  });
  
  // Cache the results
  setCachedResults(url, {
    results: sortedResults,
    productName
  });
  
  return {
    results: sortedResults,
    productName
  };
}

async function searchWebsite(
  websiteKey: string,
  searchUrl: string,
  targetProductName: string,
  isOriginal: boolean
): Promise<ProductResult> {
  const config = WEBSITE_CONFIGS[websiteKey];
  
  try {
    // Fetch search results page
    const html = await fetchWithProxy(searchUrl);
    const doc = parseHTML(html);
    
    // Extract first matching product
    const productTitle = extractTextBySelectors(doc, config.selectors.productTitle);
    const priceText = extractTextBySelectors(doc, config.selectors.price);
    const productLink = extractAttributeBySelectors(doc, config.selectors.productLink, 'href');
    const productImage = extractAttributeBySelectors(doc, config.selectors.productImage, 'src');
    
    if (!productTitle || !priceText) {
      return {
        website: config.name,
        productName: targetProductName,
        price: null,
        currency: '₹',
        url: searchUrl,
        available: false,
        isOriginal
      };
    }
    
    // Check similarity
    const similarity = calculateStringSimilarity(targetProductName, productTitle);
    if (similarity < 0.3) {
      console.warn(`Low similarity (${similarity}) for ${config.name}: "${productTitle}"`);
    }
    
    const price = normalizePrice(priceText);
    
    // Construct full URL
    let fullUrl = productLink || searchUrl;
    if (productLink && !productLink.startsWith('http')) {
      fullUrl = `https://www.${config.domain}${productLink}`;
    }
    
    return {
      website: config.name,
      productName: productTitle,
      price,
      currency: '₹',
      url: fullUrl,
      imageUrl: productImage || undefined,
      available: true,
      isOriginal
    };
    
  } catch (error) {
    console.error(`Error searching ${config.name}:`, error);
    return {
      website: config.name,
      productName: targetProductName,
      price: null,
      currency: '₹',
      url: searchUrl,
      available: false,
      isOriginal
    };
  }
}
