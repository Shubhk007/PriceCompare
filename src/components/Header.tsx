function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">💰</div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Price Compare India</h1>
            <p className="text-xs text-gray-500">Find the best deals online</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
          <span className="px-3 py-1 bg-blue-50 rounded-full">🛒 Amazon</span>
          <span className="px-3 py-1 bg-blue-50 rounded-full">🏪 Flipkart</span>
          <span className="px-3 py-1 bg-blue-50 rounded-full">👗 Myntra</span>
          <span className="px-3 py-1 bg-blue-50 rounded-full">+4 more</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
