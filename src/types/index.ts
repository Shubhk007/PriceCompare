export interface ProductResult {
  website: string;
  productName: string;
  price: number | null;
  currency: string;
  url: string;
  imageUrl?: string;
  available: boolean;
  isOriginal?: boolean;
}

export interface WebsiteConfig {
  name: string;
  domain: string;
  searchUrl: (query: string) => string;
  selectors: {
    productTitle: string[];
    price: string[];
    productLink: string[];
    productImage: string[];
  };
  logo: string;
}

export interface CacheEntry {
  timestamp: number;
  results: ProductResult[];
  productName: string;
}
