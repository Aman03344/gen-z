import { useState } from "react";
import {
  Edit,
  Trash2,
  Plus,
  X,
  Search,
  DollarSign,
  Archive,
  Package,
  ChevronDown,
  Percent,
} from "lucide-react";

const Products = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Form state according to MongoDB schema
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    discountPrice: "",
    discountPercentage: "",
    countInStock: "",
    sizes: [],
    image: [""],
    isFeatured: false,
  });

  // Static product data for cards
  const [staticProducts, setStaticProducts] = useState([
    {
      _id: "4",
      name: "Leather Biker Jacket",
      description: "Premium leather jacket with classic biker style",
      brand: "Zara",
      category: "Jacket",
      price: 199.99,
      discountPrice: 149.99,
      discountPercentage: 25,
      countInStock: 8,
      sizes: ["M", "L", "XL"],
      image: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
      ],
      rating: 4.5,
      numReviews: 23,
      isFeatured: true,
    },
    {
      _id: "5",
      name: "Printed Cotton Kurta",
      description: "Traditional cotton kurta with modern prints",
      brand: "Manyavar",
      category: "Kurta",
      price: 89.99,
      discountPrice: 67.99,
      discountPercentage: 24,
      countInStock: 23,
      sizes: ["M", "L", "XL", "XXL"],
      image: [
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400",
      ],
      rating: 4.2,
      numReviews: 15,
      isFeatured: false,
    },
  ]);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeToggle = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.image];
    updatedImages[index] = value;
    setFormData((prev) => ({ ...prev, image: updatedImages }));
  };

  const addImageField = () => {
    setFormData((prev) => ({ ...prev, image: [...prev.image, ""] }));
  };

  const removeImageField = (index) => {
    setFormData((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.price ||
      !formData.discountPrice ||
      !formData.discountPercentage ||
      !formData.countInStock
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.sizes.length === 0) {
      alert("Please select at least one size");
      return;
    }

    if (!formData.image[0]) {
      alert("Please provide at least one image URL");
      return;
    }

    // Create new product with unique ID
    const newProduct = {
      ...formData,
      _id: Date.now().toString(),
      price: parseFloat(formData.price),
      discountPrice: parseFloat(formData.discountPrice),
      countInStock: parseInt(formData.countInStock),
      rating: 0,
      numReviews: 0,
      image: formData.image.filter((img) => img.trim() !== ""),
    };

    // Add to products list
    setStaticProducts((prev) => [newProduct, ...prev]);

    // Reset form and close modal
    setFormData({
      name: "",
      description: "",
      brand: "",
      category: "",
      price: "",
      discountPrice: "",
      discountPercentage: "",
      countInStock: "",
      sizes: [],
      image: [""],
      isFeatured: false,
    });
    setIsAddModalOpen(false);
  };

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setStaticProducts((prev) =>
      prev.filter((p) => p._id !== selectedProductId),
    );
    setIsDeleteModalOpen(false);
    setSelectedProductId(null);
  };

  // Stats summary
  const totalProducts = staticProducts.length;
  const totalStock = staticProducts.reduce((sum, p) => sum + p.countInStock, 0);
  const totalValue = staticProducts.reduce(
    (sum, p) => sum + p.price * p.countInStock,
    0,
  );
  const outOfStock = staticProducts.filter((p) => p.countInStock === 0).length;

  // Stock status component
  const StockStatus = ({ stock }) => {
    if (stock > 10) {
      return (
        <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-lg">
          In Stock ({stock})
        </span>
      );
    } else if (stock > 0) {
      return (
        <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs font-medium rounded-lg">
          Low Stock ({stock})
        </span>
      );
    } else {
      return (
        <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-lg">
          Out of Stock
        </span>
      );
    }
  };

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

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-gray-900">
                Product Catalog
              </h2>
              <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {totalProducts} products
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <div className="relative">
                <select
                  className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer w-full"
                  defaultValue="all"
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

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Add Product
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {staticProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Discount Badge */}
              {product.discountPercentage > 0 && (
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  {product.discountPercentage}% OFF
                </div>
              )}

              {/* Featured Badge */}
              {product.isFeatured && (
                <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                  Featured
                </div>
              )}

              {/* Action Buttons - Appear on Hover */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-center gap-2">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                    <Edit size={16} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product._id)}
                    className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors shadow-lg"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Brand & Category */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">
                  {product.brand}
                </span>
                <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-xl font-bold text-gray-900">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      {i < Math.floor(product.rating) ? "★" : "☆"}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">
                  ({product.numReviews})
                </span>
              </div>

              {/* Sizes */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600"
                  >
                    {size}
                  </span>
                ))}
              </div>

              {/* Stock Status & ID */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <StockStatus stock={product.countInStock} />
                <span className="text-xs text-gray-400">
                  ID: {product._id.slice(0, 8)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-light text-gray-900">
                  Add New <span className="font-medium">Product</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Create a new product in your catalog.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Oversized Cotton Sweater"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Enter product description..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                  required
                />
              </div>

              {/* Brand and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="e.g., DEERIO"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Shirt">Shirt</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Hoodie">Hoodie</option>
                    <option value="Kurta">Kurta</option>
                  </select>
                </div>
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="number"
                      name="discountPrice"
                      value={formData.discountPrice}
                      onChange={handleInputChange}
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount % <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Percent
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="number"
                      name="discountPercentage"
                      value={formData.discountPercentage}
                      onChange={handleInputChange}
                      placeholder="20"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="countInStock"
                  value={formData.countInStock}
                  onChange={handleInputChange}
                  placeholder="0"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                  required
                />
              </div>

              {/* Image URLs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image URLs <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {formData.image.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={url}
                        onChange={(e) =>
                          handleImageChange(index, e.target.value)
                        }
                        placeholder={`Image URL ${index + 1}`}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                      {formData.image.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="p-3 hover:bg-red-50 rounded-xl transition-colors"
                        >
                          <X size={16} className="text-red-500" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addImageField}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Plus size={16} />
                    Add another image URL
                  </button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Sizes <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {["S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => handleSizeToggle(size)}
                      className={`w-12 h-12 rounded-xl text-sm font-medium border-2 transition-all ${
                        formData.sizes.includes(size)
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900"
                />
                <label className="text-sm text-gray-700">
                  Feature this product
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={22} className="text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
              Delete Product?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone. The product will be permanently
              removed from your catalog.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
