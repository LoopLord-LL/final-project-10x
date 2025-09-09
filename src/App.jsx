import React, { useState } from "react";
import MainNavBar from "./components/MainNavBar";
import Slider from "./components/Slider";
import ProductCard from "./components/ProductCard";
import products from "./data/products";
import AuthContainer from "./components/AuthContainer";
import ProductFilter from "./components/ProductFilter";
import Footer from "./components/Footer";

function App() {
  // State to control which auth view is open, or null for none
  const [authView, setAuthView] = useState(null); // 'login' | 'register' | 'forgot' | null
  const [authMessage, setAuthMessage] = useState("");

  // Pagination state for products
  const INITIAL_COUNT = 12;
  const LOAD_MORE_COUNT = 8;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + LOAD_MORE_COUNT, products.length)
      );
      setLoading(false);
    }, 1000); // 1 second delay
  };

  // Filter state
  const [filters, setFilters] = useState({
    brand: "",
    priceRange: "",
    rating: "",
    category: "",
    query: "",
  });

  // Sorting state
  const [sort, setSort] = useState("");

  // Get unique manufacturers
  // Removed manufacturers as it's no longer needed

  // Get unique brands and categories from products
  const brands = Array.from(
    new Set(products.map((p) => p.manufacturer))
  ).sort();
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  ).sort();

  // Filtered products
  let filteredProducts = products.filter((product) => {
    const matchesBrand = filters.brand
      ? product.manufacturer === filters.brand
      : true;
    const matchesCategory = filters.category
      ? product.category === filters.category
      : true;
    let matchesPrice = true;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      matchesPrice = product.price >= min && product.price <= max;
    }
    const minRating = filters.rating ? parseInt(filters.rating) : 0;
    const matchesRating = product.rating >= minRating;
    const matchesQuery = filters.query
      ? product.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.query.toLowerCase())
      : true;
    return (
      matchesBrand &&
      matchesCategory &&
      matchesPrice &&
      matchesRating &&
      matchesQuery
    );
  });

  // Show AuthContainer only if authView is set
  return (
    <>
      <MainNavBar
        onLogin={() => setAuthView("login")}
        onRegister={() => setAuthView("register")}
      />
      {authView ? (
        <div className="flex justify-center w-full mt-4">
          <AuthContainer
            view={authView}
            setView={setAuthView}
            message={authMessage}
            setMessage={setAuthMessage}
            onClose={() => setAuthView(null)}
          />
        </div>
      ) : (
        <>
          <Slider />
          <div className="w-full flex justify-center my-4">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-black text-center drop-shadow-lg max-w-3xl">
              Discover our exclusive selection of products, carefully curated to
              meet all your needs!
            </h2>
          </div>
          {/* Filter UI */}
          <ProductFilter
            id="products"
            filters={filters}
            setFilters={setFilters}
            brands={brands}
            categories={categories}
            sort={sort}
            setSort={setSort}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-10">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-lg text-gray-500 py-12">
                {filters.query
                  ? `No Result For "${filters.query}"`
                  : "No Result"}
              </div>
            ) : (
              filteredProducts
                .slice(0, visibleCount)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    image={product.image}
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    discount={product.discount}
                    rating={product.rating}
                  />
                ))
            )}
          </div>
          {/* Load More Button */}
          {visibleCount < products.length && (
            <div className="flex justify-center mb-10">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
          {/* Footer */}
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
