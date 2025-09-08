import React from "react";

export default function ProductFilter({
  filters,
  setFilters,
  brands,
  categories,
  sort,
  setSort,
}) {
  return (
    <div className="bg-white/80 shadow-lg rounded-2xl px-4 py-4 mb-4 mt-3 border border-gray-100 w-full flex flex-col gap-4">
      {/* Top: Centered search and sort */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
        <input
          type="text"
          placeholder="Search products..."
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-700 shadow-sm w-56"
          value={filters.query || ""}
          onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
        />
        <select
          id="sort"
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-700 shadow-sm w-56"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
        </select>
      </div>
      {/* Bottom: Horizontal filter bar */}
      <div className="flex flex-wrap gap-3 md:gap-4 text-gray-700 items-center justify-center w-full">
        {/* Category */}
        <select
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
          value={filters.category || ""}
          onChange={(e) =>
            setFilters((f) => ({ ...f, category: e.target.value }))
          }
        >
          <option value="">All Categories</option>
          {categories &&
            categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
        {/* Brand */}
        <select
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
          value={filters.brand || ""}
          onChange={(e) => setFilters((f) => ({ ...f, brand: e.target.value }))}
        >
          <option value="">All Brands</option>
          {brands &&
            brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
        </select>
        {/* Price Range Dropdown */}
        <select
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
          value={filters.priceRange || ""}
          onChange={(e) =>
            setFilters((f) => ({ ...f, priceRange: e.target.value }))
          }
        >
          <option value="">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="51-100">$51 - $100</option>
          <option value="101-150">$101 - $150</option>
          <option value="151-200">$151 - $200</option>
          <option value="201-300">$201 - $300</option>
          <option value="301-10000">$301+</option>
        </select>
        {/* Rating */}
        <select
          className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition shadow-sm"
          value={filters.rating || ""}
          onChange={(e) =>
            setFilters((f) => ({ ...f, rating: e.target.value }))
          }
        >
          <option value="">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
          <option value="1">1+ Stars</option>
        </select>
      </div>
    </div>
  );
}
