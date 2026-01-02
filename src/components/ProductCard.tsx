import { ProductResult } from '../types';
import { WEBSITE_CONFIGS } from '../config/websites';

interface ProductCardProps {
  result: ProductResult;
  isCheapest: boolean;
}

function ProductCard({ result, isCheapest }: ProductCardProps) {
  const websiteConfig = Object.values(WEBSITE_CONFIGS).find(
    config => config.name === result.website
  );

  return (
    <div 
      className={`card relative transition-all hover:shadow-lg ${
        isCheapest ? 'ring-2 ring-green-500' : ''
      } ${result.isOriginal ? 'ring-2 ring-blue-500' : ''}`}
    >
      {isCheapest && (
        <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          🏆 Best Price
        </div>
      )}
      
      {result.isOriginal && (
        <div className="absolute -top-3 -left-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          📍 Original
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className="text-4xl flex-shrink-0">
          {websiteConfig?.logo || '🛒'}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 mb-1">
            {result.website}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {result.productName}
          </p>

          {result.available && result.price !== null ? (
            <>
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {result.currency}{result.price.toLocaleString('en-IN')}
                </span>
              </div>

              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Visit Store →
              </a>
            </>
          ) : (
            <div className="py-3">
              <p className="text-sm text-gray-500 italic">
                Product not available or price not found
              </p>
              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm text-blue-600 hover:underline"
              >
                View search results →
              </a>
            </div>
          )}
        </div>
      </div>

      {result.imageUrl && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <img 
            src={result.imageUrl} 
            alt={result.productName}
            className="w-full h-32 object-contain rounded"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
