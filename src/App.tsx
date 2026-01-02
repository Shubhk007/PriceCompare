import { useState } from 'react'
import URLInput from './components/URLInput'
import ProductResults from './components/ProductResults'
import Header from './components/Header'
import { ProductResult } from './types'

function App() {
  const [results, setResults] = useState<ProductResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [productName, setProductName] = useState<string>('')
  const [demoMode, setDemoMode] = useState(true)

  const handleCompare = async (productResults: ProductResult[], name: string) => {
    setResults(productResults)
    setProductName(name)
  }

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading)
  }

  const handleError = (errorMsg: string) => {
    setError(errorMsg)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Compare Prices Across India
          </h1>
          <p className="text-lg text-gray-600">
            Find the best deals on Amazon, Flipkart, Myntra, and more
          </p>
        </div>

        <URLInput 
          onCompare={handleCompare}
          onLoading={handleLoading}
          onError={handleError}
          demoMode={demoMode}
          onDemoModeChange={setDemoMode}
        />

        {demoMode && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700">📊 <strong>Demo Mode Active:</strong> Showing realistic sample data to demonstrate functionality.</p>
            <p className="text-xs text-blue-600 mt-2">
              💡 <strong>Note:</strong> Browser-based web scraping is blocked by CORS. For real data, this would need a backend server.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {loading && (
          <div className="mt-8">
            <div className="text-center mb-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Searching for best prices...</p>
            </div>
          </div>
        )}

        {!loading && results.length > 0 && (
          <ProductResults 
            results={results}
            productName={productName}
          />
        )}
      </main>

      <footer className="mt-16 py-8 bg-gray-800 text-white text-center">
        <p className="text-sm">
          Price Compare India - Find the best deals | 
          <span className="ml-2">Powered by Google Shopping Search</span>
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Prices are aggregated from multiple retailers and may vary
        </p>
      </footer>
    </div>
  )
}

export default App
