import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

// Import Redux actions
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getAllUsers,
  resetAdminState,
} from "../../features/adminFeature/adminSlice";

const Products = () => {
  const dispatch = useDispatch();

  // Redux state
  const { products, users, isLoading, isSuccess, isError, message } =
    useSelector((state) => state.admin);

  // Local state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentProductId, setCurrentProductId] = useState(null);

  // BUG FIX 3: Local loading state for operations (add/edit/delete)
  // isLoading se modal close nahi hoga, isliye alag track karte hain
  const [operationPending, setOperationPending] = useState(false);

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
    rating: "",
    isFeatured: false,
  });

  // Fetch products on component mount
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllUsers());
  }, [dispatch]);

  // BUG FIX 3: isSuccess/isError handling — ab sirf toast dikhao,
  // modal close alag se handle hoga taaki loader stuck na ho
  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
      dispatch(resetAdminState());
    }

    if (isError) {
      toast.error(message || "Something went wrong");
      setOperationPending(false);
      dispatch(resetAdminState());
    }
  }, [isSuccess, isError, message, dispatch]);

  // ✅ Ensure products is always an array
  const productsArray = Array.isArray(products) ? products : [];

  // Filter products based on search and category
  const filteredProducts = productsArray.filter((product) => {
    if (!product) return false;

    const matchesSearch =
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

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

  const resetForm = () => {
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
    setSelectedProduct(null);
    setCurrentProductId(null);
    setOperationPending(false);
  };

  // Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.price ||
      !formData.countInStock
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    if (!formData.image[0]) {
      toast.error("Please provide at least one image URL");
      return;
    }

    // Prepare data for API
    const productData = {
      name: formData.name,
      description: formData.description,
      brand: formData.brand || "",
      category: formData.category,
      price: parseFloat(formData.price),
      discountPrice: parseFloat(formData.discountPrice) || 0,
      discountPercentage: formData.discountPercentage?.toString() || "0",
      countInStock: parseInt(formData.countInStock),
      sizes: formData.sizes,
      image: formData.image.filter((img) => img.trim() !== ""),
      rating: formData.rating,
      isFeatured: formData.isFeatured || false,
    };

    // BUG FIX 3: operationPending set karo, isLoading pe depend mat karo
    setOperationPending(true);

    const result = await dispatch(addProduct(productData));

    // BUG FIX 3: Result ke baad directly modal close karo,
    // getAllProducts dobara dispatch nahi karna (slice mein optimistic update hai)
    if (result.meta.requestStatus === "fulfilled") {
      setIsAddModalOpen(false);
      resetForm();
      // Ek baar fresh data lo server se
      dispatch(getAllProducts());
    } else {
      setOperationPending(false);
    }
  };

  // Handle Edit Product
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setCurrentProductId(product._id);
    setFormData({
      name: product.name || "",
      description: product.description || "",
      brand: product.brand || "",
      category: product.category || "",
      price: product.price?.toString() || "",
      discountPrice: product.discountPrice?.toString() || "",
      discountPercentage: product.discountPercentage?.toString() || "",
      countInStock: product.countInStock?.toString() || "",
      sizes: product.sizes || [],
      image: product.image?.length ? product.image : [""],
      rating: product.rating,
      isFeatured: product.isFeatured || false,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.category ||
      !formData.price ||
      !formData.countInStock
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    const productData = {
      name: formData.name,
      description: formData.description,
      brand: formData.brand || "",
      category: formData.category,
      price: parseFloat(formData.price),
      discountPrice: parseFloat(formData.discountPrice) || 0,
      discountPercentage: formData.discountPercentage?.toString() || "0",
      countInStock: parseInt(formData.countInStock),
      sizes: formData.sizes,
      image: formData.image.filter((img) => img.trim() !== ""),
      rating: formData.rating,
      isFeatured: formData.isFeatured || false,
    };

    setOperationPending(true);

    const result = await dispatch(
      updateProduct({
        pid: currentProductId,
        productData,
      }),
    );

    if (result.meta.requestStatus === "fulfilled") {
      setIsEditModalOpen(false);
      resetForm();
      dispatch(getAllProducts());
    } else {
      setOperationPending(false);
    }
  };

  // Handle Delete Product
  const handleDeleteClick = (productId) => {
    setCurrentProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setOperationPending(true);

    const result = await dispatch(deleteProduct(currentProductId));

    if (result.meta.requestStatus === "fulfilled") {
      setIsDeleteModalOpen(false);
      setCurrentProductId(null);
      setOperationPending(false);
      // BUG FIX 4: Slice mein already filter ho raha hai, getAllProducts optional hai
      dispatch(getAllProducts());
    } else {
      setOperationPending(false);
    }
  };

  // Stats summary
  const totalProducts = productsArray.length;
  const totalStock =
    productsArray.reduce((sum, p) => sum + (p.countInStock || 0), 0) || 0;
  const totalValue =
    productsArray.reduce(
      (sum, p) => sum + (p.price || 0) * (p.countInStock || 0),
      0,
    ) || 0;
  const outOfStock =
    productsArray.filter((p) => (p.countInStock || 0) === 0).length || 0;

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
      {/* BUG FIX 3: Sirf initial fetch pe loading overlay dikhao,
          operations ke liye operationPending use karo */}
      {isLoading && productsArray.length === 0 && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Loading...</p>
          </div>
        </div>
      )}

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
          <p className="text-xs text-green-600 mt-2">
            ↑ {productsArray.filter((p) => p.isFeatured)?.length || 0} featured
          </p>
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
            ₹{totalValue.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">
            Avg. ₹{(totalValue / (totalProducts || 1)).toFixed(2)} per item
          </p>
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
                {filteredProducts?.length || 0} products
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <div className="relative">
                <select
                  className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer w-full"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
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
                onClick={() => {
                  resetForm();
                  setIsAddModalOpen(true);
                }}
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
      {filteredProducts?.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || categoryFilter !== "all"
              ? "Try adjusting your search or filter"
              : "Get started by adding your first product"}
          </p>
          {(searchTerm || categoryFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
              className="text-gray-600 hover:text-gray-900 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image?.[0] || "https://via.placeholder.com/400"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400";
                  }}
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

                {/* BUG FIX 4: Action Buttons — hamesha visible, hover pe sirf highlight
                    Out of stock products pe bhi edit/delete kaam kare */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-2 bg-white rounded-full hover:bg-blue-50 transition-colors shadow-lg"
                      title="Edit product"
                    >
                      <Edit size={16} className="text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors shadow-lg"
                      title="Delete product"
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
                    {product.brand || "No Brand"}
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
                    $
                    {product.discountPrice?.toFixed(2) ||
                      product.price?.toFixed(2)}
                  </span>
                  {product.discountPrice > 0 && (
                    <span className="text-sm text-gray-400 line-through">
                      ${product.price?.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        {i < Math.floor(product.rating || 0) ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.numReviews || 0})
                  </span>
                </div>

                {/* Sizes */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {product.sizes?.map((size) => (
                    <span
                      key={size}
                      className="px-2 py-0.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                {/* Stock Status & Actions Row */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <StockStatus stock={product.countInStock || 0} />
                  {/* BUG FIX 4: Always visible edit/delete buttons (fallback for non-hover devices) */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={14} className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===== ADD PRODUCT MODAL ===== */}
      {/* BUG FIX 2: Modal landscape mein sahi scroll kare:
          - outer div: fixed inset-0 overflow-y-auto
          - inner wrapper: min-h-full flex items-center justify-center py-8
          - form div: w-full max-w-2xl */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4 py-8">
            <div className="bg-white rounded-2xl w-full max-w-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <h2 className="text-2xl font-light text-gray-900">
                    Add New <span className="font-medium">Product</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Create a new product in your catalog.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleAddProduct} className="p-6 space-y-6">
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
                    rows="3"
                    placeholder="Enter product description..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                    required
                  />
                </div>

                {/* Brand and Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      placeholder="e.g., H&M"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ratings
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      placeholder="rating"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                        min="0"
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Price
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
                        min="0"
                        placeholder="0.00"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount %
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
                        min="0"
                        max="100"
                        placeholder="0"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                          type="url"
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
                    disabled={operationPending}
                    className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {operationPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Adding...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      resetForm();
                    }}
                    disabled={operationPending}
                    className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT PRODUCT MODAL ===== */}
      {/* BUG FIX 2: Same landscape fix */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto">
          <div className="min-h-full flex items-center justify-center p-4 py-8">
            <div className="bg-white rounded-2xl w-full max-w-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <h2 className="text-2xl font-light text-gray-900">
                    Edit <span className="font-medium">Product</span>
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Update product information.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleUpdateProduct} className="p-6 space-y-6">
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
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                    required
                  />
                </div>

                {/* Brand and Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <input
                      type="number"
                      name="rating"
                      value={formData.rating}
                      placeholder="rating"
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                        min="0"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Price
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
                        min="0"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount %
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
                        min="0"
                        max="100"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                    min="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                          type="url"
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
                    disabled={operationPending}
                    className="flex-1 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {operationPending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Updating...
                      </>
                    ) : (
                      "Update Product"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      resetForm();
                    }}
                    disabled={operationPending}
                    className="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM MODAL ===== */}
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
                disabled={operationPending}
                className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {operationPending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCurrentProductId(null);
                }}
                disabled={operationPending}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
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
