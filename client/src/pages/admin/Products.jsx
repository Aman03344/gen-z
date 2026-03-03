import { useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  X,
  Search,
  Filter,
  Download,
  ChevronDown,
  Package,
  Tag,
  DollarSign,
  Archive,
  Eye,
  Copy,
  MoreHorizontal,
} from "lucide-react";
import Table from "../../components/admin/Table";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { products } from "../../data/mockData";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      header: "Image",
      accessor: "image",
      render: (row) => (
        <div className="relative group">
          <img
            src={row.image}
            alt={row.name}
            className="w-12 h-12 object-cover rounded-lg ring-1 ring-gray-200"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all" />
        </div>
      ),
    },
    {
      header: "Name",
      accessor: "name",
      sortable: true,
      render: (row) => (
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">ID: {row.id}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      sortable: true,
      render: (row) => (
        <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium text-gray-700">
          {row.category}
        </span>
      ),
    },
    {
      header: "Brand",
      accessor: "brand",
      render: (row) => (
        <span className="text-sm text-gray-600">{row.brand}</span>
      ),
    },
    {
      header: "Price",
      accessor: "price",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-1">
          <DollarSign size={14} className="text-gray-400" />
          <span className="font-semibold text-gray-900">
            {row.price.toFixed(2)}
          </span>
        </div>
      ),
    },
    {
      header: "Stock",
      accessor: "stock",
      sortable: true,
      render: (row) => {
        const stockStatus =
          row.stock > 10
            ? { color: "text-green-600 bg-green-50", label: "In Stock" }
            : row.stock > 0
              ? { color: "text-yellow-600 bg-yellow-50", label: "Low Stock" }
              : { color: "text-red-600 bg-red-50", label: "Out of Stock" };

        return (
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded-lg text-xs font-medium ${stockStatus.color}`}
            >
              {row.stock} units
            </span>
          </div>
        );
      },
    },
  ];

  const actions = (row) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => {
          setModalMode("edit");
          setShowModal(true);
        }}
        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
        title="Edit Product"
      >
        <Edit size={16} className="text-gray-600 group-hover:text-blue-600" />
      </button>
      <button
        className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
        title="Duplicate Product"
      >
        <Copy size={16} className="text-gray-600 group-hover:text-green-600" />
      </button>
      <button
        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
        title="Delete Product"
      >
        <Trash2 size={16} className="text-gray-600 group-hover:text-red-600" />
      </button>
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="More Actions"
      >
        <MoreHorizontal size={16} className="text-gray-600" />
      </button>
    </div>
  );

  // Summary stats
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          Products <span className="font-medium">Management</span>
        </h1>
        <p className="text-gray-500">
          Manage your product catalog, inventory, and pricing.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Total Products
            </span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package size={16} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{totalProducts}</p>
          <p className="text-xs text-green-600 mt-2">↑ 8 new this month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Total Stock
            </span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Archive size={16} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">
            {totalStock} units
          </p>
          <p className="text-xs text-gray-500 mt-2">Across all products</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Inventory Value
            </span>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign size={16} className="text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">
            ${totalValue.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Out of Stock
            </span>
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <X size={16} className="text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{outOfStock}</p>
          <p className="text-xs text-orange-600 mt-2">Requires attention</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-gray-900">
                All Products
              </h2>
              <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {filteredProducts.length} products
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full sm:w-64"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer w-full"
                >
                  <option value="all">All Categories</option>
                  <option value="T-Shirt">T-Shirts</option>
                  <option value="Shirt">Shirts</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Hoodie">Hoodies</option>
                  <option value="Jacket">Jackets</option>
                  <option value="Kurta">Kurtas</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Add Product Button */}
              <Button
                variant="primary"
                onClick={() => {
                  setModalMode("add");
                  setShowModal(true);
                }}
                className="!px-4 !py-2.5"
              >
                <Plus size={18} className="mr-2" />
                Add Product
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || categoryFilter !== "all") && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {categoryFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs">
                  Category: {categoryFilter}
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className="ml-1 hover:text-gray-900"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={filteredProducts}
          actions={actions}
          onSort={(key, direction) => console.log(key, direction)}
        />
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-light text-gray-900">
                  {modalMode === "add" ? "Add New" : "Edit"}{" "}
                  <span className="font-medium">Product</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {modalMode === "add"
                    ? "Create a new product in your catalog."
                    : "Update product information."}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form className="p-6 space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Oversized Cotton Sweater"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Enter product description, features, and details..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              {/* Brand and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., DEERIO, Urban Fit"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none">
                    <option>Select category</option>
                    <option>T-Shirt</option>
                    <option>Shirt</option>
                    <option>Jeans</option>
                    <option>Hoodie</option>
                    <option>Jacket</option>
                    <option>Kurta</option>
                  </select>
                </div>
              </div>

              {/* Price and Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <div className="relative">
                    <DollarSign
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors">
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Plus size={20} className="text-gray-500" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, WebP up to 5MB
                    </p>
                  </label>
                </div>
              </div>

              {/* Sizes (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <label key={size} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-gray-900 rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-600">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button variant="primary" size="lg" className="flex-1">
                  {modalMode === "add" ? "Add Product" : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
