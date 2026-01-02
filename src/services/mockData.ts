import { ProductResult } from '../types';

export function getMockProductResults(productName: string): ProductResult[] {
  const basePrice = 1200 + Math.random() * 800; // Random base price between 1200-2000
  
  return [
    {
      website: 'Amazon India',
      price: Math.round(basePrice * 0.85),
      available: true,
      url: 'https://www.amazon.in/dp/MOCK',
      productName: productName,
      image: 'https://via.placeholder.com/300x300?text=Amazon',
      logo: '🛒'
    },
    {
      website: 'Flipkart',
      price: Math.round(basePrice * 0.90),
      available: true,
      url: 'https://www.flipkart.com/MOCK',
      productName: productName,
      image: 'https://via.placeholder.com/300x300?text=Flipkart',
      logo: '🛍️'
    },
    {
      website: 'Myntra',
      price: Math.round(basePrice * 1.05),
      available: true,
      url: 'https://www.myntra.com/MOCK',
      productName: productName,
      image: 'https://via.placeholder.com/300x300?text=Myntra',
      logo: '👔'
    },
    {
      website: 'Ajio',
      price: Math.round(basePrice * 0.95),
      available: true,
      url: 'https://www.ajio.com/MOCK',
      productName: productName,
      image: 'https://via.placeholder.com/300x300?text=Ajio',
      logo: '👗'
    },
    {
      website: 'Reliance Digital',
      price: Math.round(basePrice * 1.10),
      available: true,
      url: 'https://www.reliancedigital.in/MOCK',
      productName: productName,
      image: 'https://via.placeholder.com/300x300?text=Reliance',
      logo: '⚡'
    },
    {
      website: 'Croma',
      price: Math.round(basePrice),
      available: true,
      url: 'https://www.croma.com/MOCK',
      productName: productName,
      image: 'https://via.placeholder.com/300x300?text=Croma',
      logo: '🔌'
    },
    {
      website: 'Tata Cliq',
      price: Math.round(basePrice * 1.08),
      available: true,
      url: 'https://www.tatacliq.com/MOCK',
      productName: productName,
      image: 'https://via.placeholder.com/300x300?text=TataCliq',
      logo: '🏪'
    }
  ].sort((a, b) => (a.price || 0) - (b.price || 0));
}
