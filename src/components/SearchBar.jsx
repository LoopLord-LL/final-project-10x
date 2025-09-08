function SearchBar() {
  return (
    <div className="flex items-center w-full md:w-64">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 cursor-pointer">
        Search
      </button>
    </div>
  );
}
export default SearchBar;