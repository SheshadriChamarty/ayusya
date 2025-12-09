
import React, { useState, useEffect } from 'react';
import { Search, ArrowUpAZ, ArrowDownAZ } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Toggle } from '../components/ui/toggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Product, productData } from '../data/productData';

// Define filter categories
const useCases = ['Immunity', 'Digestion', 'Energy', 'Bone Health', 'Skin Health'];
const productTypes = ['Plant Based', 'Spices', 'Vegetable Based', 'Fruit Based'];

const Products = () => {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProductType, setSelectedProductType] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('az');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productData);
  const [isMobile, setIsMobile] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setShowFilters(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...productData];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.benefits.some(benefit => benefit.toLowerCase().includes(query))
      );
    }

    // Apply product type filter
    if (selectedProductType) {
      filtered = filtered.filter(product => {
        const name = product.name.toLowerCase();
        const type = selectedProductType.toLowerCase();
        
        if (type === 'plant based') {
          return ['moringa', 'spinach', 'mint', 'coriander'].some(ing => name.includes(ing));
        } else if (type === 'spices') {
          return ['chilli', 'coriander'].some(ing => name.includes(ing));
        } else if (type === 'vegetable based') {
          return ['tomato', 'spinach'].some(ing => name.includes(ing));
        } else if (type === 'fruit based') {
          return name.includes('banana');
        }
        return false;
      });
    }

    // Apply use case filter
    if (selectedUseCase) {
      filtered = filtered.filter(product => 
        product.benefits.some(benefit => 
          benefit.toLowerCase().includes(selectedUseCase.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortOption === 'az') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'za') {
      filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortOption === 'popular') {
      // This would need actual popularity data
      filtered.sort((a, b) => b.id - a.id);
    } else if (sortOption === 'newest') {
      // This would need actual date data
      filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedProductType, selectedUseCase, sortOption]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedProductType(null);
    setSelectedUseCase(null);
    setSortOption('az');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-serif text-ayusya-brown text-center mb-2">Our Products</h1>
          <p className="text-center max-w-3xl mx-auto mb-8 text-gray-700">
            Discover our range of natural, sun-dried vegetable powders crafted for your family's well-being.
          </p>

          {/* Mobile filter toggle */}
          <div className="md:hidden mb-4">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mb-4"
            >
              {showFilters ? 'Hide Filters' : 'Show Filters'} 
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters sidebar */}
            {showFilters && (
              <div className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4 md:sticky md:top-4 md:h-fit animate-fade-in">
                <div className="mb-6">
                  <h2 className="font-medium text-lg text-ayusya-brown mb-3">Search</h2>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-medium text-lg text-ayusya-brown mb-3">Category</h2>
                  <div className="flex flex-wrap gap-2">
                    {productTypes.map((type) => (
                      <Badge
                        key={type}
                        variant={selectedProductType === type ? "default" : "outline"}
                        className="cursor-pointer hover:bg-ayusya-green/20"
                        onClick={() => setSelectedProductType(
                          selectedProductType === type ? null : type
                        )}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="font-medium text-lg text-ayusya-brown mb-3">Use Case</h2>
                  <div className="flex flex-wrap gap-2">
                    {useCases.map((useCase) => (
                      <Badge
                        key={useCase}
                        variant={selectedUseCase === useCase ? "default" : "outline"}
                        className="cursor-pointer hover:bg-ayusya-green/20"
                        onClick={() => setSelectedUseCase(
                          selectedUseCase === useCase ? null : useCase
                        )}
                      >
                        {useCase}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Product listing */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="text-sm text-gray-600">
                  Showing {filteredProducts.length} products
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-9 gap-1">
                        {sortOption === 'az' && <ArrowUpAZ className="h-4 w-4" />}
                        {sortOption === 'za' && <ArrowDownAZ className="h-4 w-4" />}
                        {sortOption === 'az' && 'A-Z'}
                        {sortOption === 'za' && 'Z-A'}
                        {sortOption === 'popular' && 'Popular'}
                        {sortOption === 'newest' && 'Newest'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setSortOption('az')}>
                        <ArrowUpAZ className="h-4 w-4 mr-2" /> A-Z
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption('za')}>
                        <ArrowDownAZ className="h-4 w-4 mr-2" /> Z-A
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption('popular')}>
                        Most Popular
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortOption('newest')}>
                        Newest First
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-200 hover:shadow-md hover:scale-[1.01]"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-xl text-gray-600 mb-4">No products found</p>
                  <p className="text-gray-500 mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
