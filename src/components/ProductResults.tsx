import { ProductResult } from '../types';
import ProductCard from './ProductCard';

interface ProductResultsProps {
  results: ProductResult[];
  productName: string;
}

function ProductResults({ results, productName }: ProductResultsProps) {
  const cheapestPrice = results.length > 0 ? Math.min(...results.map(r => r.price || Infinity)) : null;

  return (
    <div className="mt-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Price Comparison Results
        </h2>
        <p className="text-gray-600">
          Searching for: <span className="font-semibold">{productName}</span>
        </p>
        {results.length > 0 && (
          <p className="text-sm text-green-600 mt-1">
            ✨ Found {results.length} available option{results.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result, index) => (
          <ProductCard
            key={index}
            result={result}
            isCheapest={result.price === cheapestPrice}
          />
        ))}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">No results found</p>
          <p className="text-sm text-gray-500 mt-2">
            Try a different product or website
          </p>
        </div>
      )}
    </div>
  );
}

export default ProductResults;
