import axios from 'axios';
import { CORS_PROXIES } from '../config/websites';

export async function fetchWithProxy(url: string): Promise<string> {
  const errors: string[] = [];
  
  // Try each CORS proxy
  for (const proxy of CORS_PROXIES) {
    try {
      const proxyUrl = `${proxy}${encodeURIComponent(url)}`;
      const response = await axios.get(proxyUrl, {
        timeout: 15000,
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
      });
      
      if (response.data) {
        return typeof response.data === 'string' ? response.data : JSON.stringify(response.data);
      }
    } catch (error) {
      errors.push(`Proxy ${proxy} failed: ${error}`);
      continue;
    }
  }
  
  throw new Error(`All proxies failed for URL: ${url}\n${errors.join('\n')}`);
}

export function parseHTML(htmlString: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, 'text/html');
}

export function extractTextBySelectors(doc: Document, selectors: string[]): string | null {
  for (const selector of selectors) {
    try {
      const element = doc.querySelector(selector);
      if (element) {
        return element.textContent?.trim() || null;
      }
    } catch (e) {
      continue;
    }
  }
  return null;
}

export function extractAttributeBySelectors(
  doc: Document, 
  selectors: string[], 
  attribute: string
): string | null {
  for (const selector of selectors) {
    try {
      const element = doc.querySelector(selector);
      if (element) {
        return element.getAttribute(attribute);
      }
    } catch (e) {
      continue;
    }
  }
  return null;
}

export function normalizePrice(priceText: string | null): number | null {
  if (!priceText) return null;
  
  // Remove currency symbols, commas, and whitespace
  const cleaned = priceText.replace(/[₹,\s]/g, '');
  
  // Extract first number (handles cases like "1,299.00")
  const match = cleaned.match(/(\d+\.?\d*)/);
  if (match) {
    return parseFloat(match[1]);
  }
  
  return null;
}

export function calculateStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  let matches = 0;
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);
  
  for (const word of words1) {
    if (word.length > 2 && s2.includes(word)) {
      matches++;
    }
  }
  
  return matches / Math.max(words1.length, 1);
}
