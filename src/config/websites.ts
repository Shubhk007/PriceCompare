import { WebsiteConfig } from '../types';

export const WEBSITE_CONFIGS: Record<string, WebsiteConfig> = {
  amazon: {
    name: 'Amazon India',
    domain: 'amazon.in',
    searchUrl: (query: string) => `https://www.amazon.in/s?k=${encodeURIComponent(query)}`,
    selectors: {
      productTitle: [
        'h2.a-size-mini.a-spacing-none.a-color-base.s-line-clamp-2',
        'h2 a span',
        '.s-title-instructions-style span'
      ],
      price: [
        'span.a-price-whole',
        '.a-price .a-offscreen',
        'span.a-color-price'
      ],
      productLink: [
        'h2 a',
        'a.a-link-normal.s-no-outline'
      ],
      productImage: [
        'img.s-image',
        '.s-product-image-container img'
      ]
    },
    logo: '🛒'
  },
  flipkart: {
    name: 'Flipkart',
    domain: 'flipkart.com',
    searchUrl: (query: string) => `https://www.flipkart.com/search?q=${encodeURIComponent(query)}`,
    selectors: {
      productTitle: [
        'div._4rR01T',
        'a._1fQZEK',
        'div.IRpwTa'
      ],
      price: [
        'div._30jeq3',
        'div._30jeq3._1_WHN1',
        'div._25b18c'
      ],
      productLink: [
        'a._1fQZEK',
        'a._2rpwqI'
      ],
      productImage: [
        'img._396cs4',
        'img._2r_T1I'
      ]
    },
    logo: '🏪'
  },
  myntra: {
    name: 'Myntra',
    domain: 'myntra.com',
    searchUrl: (query: string) => `https://www.myntra.com/${encodeURIComponent(query)}`,
    selectors: {
      productTitle: [
        'h3.product-brand',
        'h4.product-product'
      ],
      price: [
        'span.product-discountedPrice',
        'div.product-price'
      ],
      productLink: [
        'a.product-base'
      ],
      productImage: [
        'img.img-responsive'
      ]
    },
    logo: '👗'
  },
  ajio: {
    name: 'Ajio',
    domain: 'ajio.com',
    searchUrl: (query: string) => `https://www.ajio.com/search/?text=${encodeURIComponent(query)}`,
    selectors: {
      productTitle: [
        'div.name',
        'div.nameCls'
      ],
      price: [
        'span.price',
        'div.price strong'
      ],
      productLink: [
        'a.rilrtl-products-list__link'
      ],
      productImage: [
        'img.rilrtl-lazy-img'
      ]
    },
    logo: '🛍️'
  },
  reliancedigital: {
    name: 'Reliance Digital',
    domain: 'reliancedigital.in',
    searchUrl: (query: string) => `https://www.reliancedigital.in/search?q=${encodeURIComponent(query)}`,
    selectors: {
      productTitle: [
        'div.sp__name'
      ],
      price: [
        'span.TextWeb__Text-sc',
        'div.offer-price'
      ],
      productLink: [
        'a.product-link'
      ],
      productImage: [
        'img.product-image'
      ]
    },
    logo: '📱'
  },
  croma: {
    name: 'Croma',
    domain: 'croma.com',
    searchUrl: (query: string) => `https://www.croma.com/search?q=${encodeURIComponent(query)}`,
    selectors: {
      productTitle: [
        'h3.product-title'
      ],
      price: [
        'span.amount',
        'span.new-price'
      ],
      productLink: [
        'a.product-link'
      ],
      productImage: [
        'img.product-image'
      ]
    },
    logo: '💻'
  },
  tatacliq: {
    name: 'Tata Cliq',
    domain: 'tatacliq.com',
    searchUrl: (query: string) => `https://www.tatacliq.com/search/?searchText=${encodeURIComponent(query)}`,
    selectors: {
      productTitle: [
        'div.ProductDescription__title',
        'h2.product-title'
      ],
      price: [
        'div.ProductDescription__price',
        'span.price'
      ],
      productLink: [
        'a.ProductModule__base'
      ],
      productImage: [
        'img.ProductModule__image'
      ]
    },
    logo: '🏬'
  }
};

export const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://corsproxy.io/?',
  'https://api.codetabs.com/v1/proxy?quest=',
  'https://thingproxy.freeboard.io/fetch/',
];
