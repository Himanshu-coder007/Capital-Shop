import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import Card from "../../components/Card/Card";
import { FiFilter, FiChevronRight, FiHome } from "react-icons/fi";

const CategoryPage = () => {
  document.title = "Capitl Shop - Category";
  const { id } = useParams();
  const [fromMoney, setFromMoney] = useState("0");
  const [toMoney, setToMoney] = useState("");
  const [category, setCategory] = useState("1"); // Initialize with default value
  const [appliedFilters, setAppliedFilters] = useState({
    category: "1",
    fromMoney: "0",
    toMoney: ""
  });
  const [reloadData, setReloadData] = useState(0);
  const [categories, setCategories] = useState([
    { id: 1, name: "Clothes" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Furniture" },
    { id: 4, name: "Shoes" },
    { id: 5, name: "Others" },
  ]);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Loading...",
      price: 1,
      description: "Loading products...",
      category: {},
      images: ["https://via.placeholder.com/300"],
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Set the initial category based on URL param or default
    const initialCategory = id || "1";
    setCategory(initialCategory);
    setAppliedFilters(prev => ({
      ...prev,
      category: initialCategory
    }));
    
    // Only trigger reload if the stored value is different
    if (localStorage.getItem("test") !== initialCategory) {
      localStorage.setItem("test", initialCategory);
      setReloadData(prev => prev + 1);
    }
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const res = await axiosClient.get(`categories/${appliedFilters.category}/products`);
        setAllProducts(res);
        
        // Apply filters to the data
        const result = res.filter(
          (product) =>
            product.price.toString() >= appliedFilters.fromMoney &&
            product.price.toString() <= (appliedFilters.toMoney === "" ? "999999999" : appliedFilters.toMoney)
        );
        setProducts(result);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (appliedFilters.category) {
      getData();
    }
  }, [reloadData, appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      category,
      fromMoney,
      toMoney
    });
    setReloadData(prev => prev + 1);
  };

  return (
    <div className="font-jost bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#F3EAD8] to-[#D9D2C5] py-16 flex items-center justify-center flex-col">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Shop by Category</h1>
        <div className="flex items-center text-sm text-gray-600">
          <Link to="/home" className="flex items-center hover:text-primary transition-colors">
            <FiHome className="mr-1" />
            Home
          </Link>
          <FiChevronRight className="mx-2" />
          <span className="text-gray-800 font-medium">Category</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Fixed height container */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24 h-fit max-h-[calc(100vh-120px)] overflow-y-auto">
              <div className="flex items-center mb-6">
                <FiFilter className="text-primary mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category-select"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                >
                  {categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-4">Price Range</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1">
                    <label htmlFor="min-price" className="sr-only">Min price</label>
                    <input
                      id="min-price"
                      value={fromMoney}
                      onChange={(e) => setFromMoney(e.target.value)}
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Min"
                      min="0"
                    />
                  </div>
                  <span className="text-gray-400">to</span>
                  <div className="flex-1">
                    <label htmlFor="max-price" className="sr-only">Max price</label>
                    <input
                      id="max-price"
                      value={toMoney}
                      onChange={(e) => setToMoney(e.target.value)}
                      type="number"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Max"
                      min="0"
                    />
                  </div>
                </div>
                <button
                  onClick={handleApplyFilters}
                  className="w-full bg-primary hover:bg-primary-dark text-white bg-blue-900 font-medium py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid - Independent height */}
          <div className="w-full lg:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    {categories.find(c => c.id === parseInt(appliedFilters.category))?.name} Products
                  </h2>
                  <p className="text-sm text-gray-500">{products.length} items</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((item) => (
                    <Card product={item} key={item.id} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or select a different category</p>
                <button
                  onClick={() => {
                    setCategory("1");
                    setFromMoney("0");
                    setToMoney("");
                    handleApplyFilters();
                  }}
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;