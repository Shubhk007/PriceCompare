import { useState, FormEvent } from 'react';
import { compareProducts } from '../services/priceComparison';
import { getMockProductResults } from '../services/mockData';
import { ProductResult } from '../types';

interface URLInputProps {
  onCompare: (results: ProductResult[], productName: string) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string) => void;
  demoMode: boolean;
  onDemoModeChange: (mode: boolean) => void;
}

function URLInput({ onCompare, onLoading, onError, demoMode, onDemoModeChange }: URLInputProps) {
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      onError('Please enter a product URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      onError('Please enter a valid URL');
      return;
    }

    onError('');
    onLoading(true);

    try {
      if (demoMode) {
        // Demo mode - show mock data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
        const productName = 'Sample Product - Premium Quality';
        const results = getMockProductResults(productName);
        onCompare(results, productName);
      } else {
        // Real mode - attempt web scraping
        const { results, productName } = await compareProducts(url);
        
        if (results.length === 0) {
          onError('No results found. The website might be blocking requests. Try enabling Demo Mode.');
        } else {
          onCompare(results, productName);
        }
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to compare prices. Try enabling Demo Mode.');
    } finally {
      onLoading(false);
    }
  };

  const exampleUrls = [
    'https://www.amazon.in/dp/B0EXAMPLE',
    'https://www.flipkart.com/product/p/itmEXAMPLE',
  ];

  return (
    <div className="card max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
            Paste Product URL
          </label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.amazon.in/product-name/dp/..."
            className="input-field"
          />
          <p className="mt-2 text-xs text-gray-500">
            Supported: Amazon, Flipkart, Myntra, Ajio, Reliance Digital, Croma, Tata Cliq
          </p>
        </div>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="demoMode"
            checked={demoMode}
            onChange={(e) => onDemoModeChange(e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="demoMode" className="text-sm text-gray-700 cursor-pointer">
            <strong>Demo Mode</strong> - ✅ Recommended (Web scraping blocked in browsers due to CORS)
          </label>
        </div>

        <button type="submit" className="btn-primary w-full">
          🔍 Compare Prices
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-gray-700">
          <strong>⚠️ Browser Limitation:</strong> Real-time scraping doesn't work in browsers due to CORS policies. 
          For production, use: Backend API Server, Official Retailer APIs, or Browser Extension.
        </div>
        <p className="text-sm text-gray-600 mb-2">Try an example:</p>
        <div className="flex flex-wrap gap-2">
          {exampleUrls.map((exampleUrl, index) => (
            <button
              key={index}
              onClick={() => setUrl(exampleUrl)}
              className="text-xs px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
            >
              Example {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default URLInput;
