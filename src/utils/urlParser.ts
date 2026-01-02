export function detectWebsite(url: string): string | null {
  const urlLower = url.toLowerCase();
  
  if (urlLower.includes('amazon.in')) return 'amazon';
  if (urlLower.includes('flipkart.com')) return 'flipkart';
  if (urlLower.includes('myntra.com')) return 'myntra';
  if (urlLower.includes('ajio.com')) return 'ajio';
  if (urlLower.includes('reliancedigital.in')) return 'reliancedigital';
  if (urlLower.includes('croma.com')) return 'croma';
  if (urlLower.includes('tatacliq.com')) return 'tatacliq';
  
  return null;
}

export function normalizeURL(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Remove tracking parameters
    const trackingParams = [
      'ref', 'ref_', 'tag', 'utm_source', 'utm_medium', 
      'utm_campaign', 'pid', 'affid', 'affExtParam'
    ];
    
    trackingParams.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    
    return urlObj.toString();
  } catch {
    return url;
  }
}

export function extractProductNameFromURL(url: string, website: string): string {
  try {
    const urlObj = new URL(url);
    let productName = '';
    
    if (website === 'amazon') {
      // Amazon URL pattern: /product-name/dp/ASIN
      const pathParts = urlObj.pathname.split('/');
      const dpIndex = pathParts.indexOf('dp');
      if (dpIndex > 0) {
        productName = pathParts[dpIndex - 1];
      }
    } else if (website === 'flipkart') {
      // Flipkart URL pattern: /product-name/p/itm...
      const pathParts = urlObj.pathname.split('/');
      if (pathParts.length > 1) {
        productName = pathParts[1];
      }
    } else {
      // Generic: extract from pathname
      const pathParts = urlObj.pathname.split('/').filter(p => p.length > 0);
      productName = pathParts[0] || '';
    }
    
    // Clean up: replace hyphens with spaces, decode URI
    productName = decodeURIComponent(productName.replace(/-/g, ' '));
    
    return productName;
  } catch {
    return '';
  }
}

export function cleanProductName(name: string): string {
  // Remove common suffixes
  const suffixes = [
    /\s*\|\s*.*$/i,  // Everything after |
    /\s*-\s*Buy.*$/i,
    /\s*-\s*Online.*$/i,
    /\s*:\s*Amazon\.in.*$/i,
    /\s*:\s*Buy.*$/i,
    /\s*\(.*\)$/g,  // Remove parentheses content
  ];
  
  let cleaned = name;
  suffixes.forEach(suffix => {
    cleaned = cleaned.replace(suffix, '');
  });
  
  return cleaned.trim();
}
