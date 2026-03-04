import { useState } from "react";
import {
  User,
  Package,
  Heart,
  Settings,
  LogOut,
  MapPin,
  CreditCard,
  Clock,
  ChevronRight,
  Edit2,
  Camera,
  Star,
  ShoppingBag,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200",
    joinDate: "January 2024",
    addresses: [
      {
        id: 1,
        type: "Home",
        address: "123 Main Street, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
      },
      {
        id: 2,
        type: "Office",
        address: "456 Business Ave, Suite 200",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "United States",
        isDefault: false,
      },
    ],
    paymentMethods: [
      {
        id: 1,
        type: "Visa",
        last4: "4242",
        expiry: "12/25",
        isDefault: true,
      },
      {
        id: 2,
        type: "Mastercard",
        last4: "8888",
        expiry: "08/24",
        isDefault: false,
      },
    ],
  };

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      date: "2024-02-15",
      status: "delivered",
      total: 189.97,
      items: [
        {
          id: 1,
          name: "Oversized Cotton Sweater",
          price: 89.99,
          quantity: 1,
          size: "M",
          color: "Heather Gray",
          image:
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500",
        },
        {
          id: 2,
          name: "Slim Fit Denim Jeans",
          price: 79.99,
          quantity: 1,
          size: "32",
          color: "Medium Wash",
          image:
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500",
        },
      ],
      tracking: "TRK123456789",
      deliveryDate: "2024-02-18",
    },
    {
      id: "ORD-002",
      date: "2024-02-10",
      status: "shipped",
      total: 129.99,
      items: [
        {
          id: 3,
          name: "Leather Crossbody Bag",
          price: 129.99,
          quantity: 1,
          color: "Black",
          image:
            "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500",
        },
      ],
      tracking: "TRK987654321",
      deliveryDate: "2024-02-20",
    },

    {
      id: "ORD-004",
      date: "2024-01-28",
      status: "cancelled",
      total: 79.99,
      items: [
        {
          id: 5,
          name: "Casual Hoodie",
          price: 79.99,
          quantity: 1,
          size: "XL",
          color: "Black",
          image:
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500",
        },
      ],
      tracking: null,
      deliveryDate: null,
    },
  ]);

  const [wishlist, setWishlist] = useState([
    {
      id: 101,
      name: "Premium Leather Jacket",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
      inStock: true,
    },
    {
      id: 102,
      name: "Designer Sunglasses",
      price: 159.99,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500",
      inStock: true,
    },
    {
      id: 103,
      name: "Cashmere Scarf",
      price: 89.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1601924921557-45e39deb7b8b?w=500",
      inStock: false,
    },
  ]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: { color: "bg-green-100 text-green-700", icon: CheckCircle },
      shipped: { color: "bg-blue-100 text-blue-700", icon: Truck },
      processing: { color: "bg-yellow-100 text-yellow-700", icon: RefreshCw },
      cancelled: { color: "bg-red-100 text-red-700", icon: XCircle },
    };
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const tabs = [{ id: "orders", label: "My Orders", icon: Package }];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-light text-gray-900">My Account</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              {/* Profile Card */}
              <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-700">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors shadow-lg">
                      <Camera size={12} />
                    </button>
                  </div>
                  <div>
                    <h2 className="font-medium text-lg">{user.name}</h2>
                    <p className="text-sm text-gray-300">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Member since {user.joinDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="p-4">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? "bg-gray-900 text-white"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span className="text-sm font-medium">{tab.label}</span>
                      </div>
                      <ChevronRight
                        size={16}
                        className={
                          activeTab === tab.id ? "text-white" : "text-gray-400"
                        }
                      />
                    </button>
                  );
                })}

                <button className="w-full flex items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all mt-2">
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {/* My Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium text-gray-900">
                      My Orders
                    </h2>
                    <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                      <option>All time</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                      >
                        {/* Order Header */}
                        <div className="bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Order ID</p>
                              <p className="font-medium text-gray-900">
                                {order.id}
                              </p>
                            </div>
                            <div className="h-8 w-px bg-gray-200" />
                            <div>
                              <p className="text-sm text-gray-500">Placed on</p>
                              <p className="font-medium text-gray-900">
                                {new Date(order.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  },
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(order.status)}
                            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                              View Details
                            </button>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="p-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex gap-4 py-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {item.color && `${item.color}`}
                                  {item.size && ` / Size: ${item.size}`}
                                  {item.quantity > 1 &&
                                    ` / Qty: ${item.quantity}`}
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  ₹{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}

                          {/* Order Footer */}
                          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              {order.tracking && (
                                <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                                  <Truck size={16} />
                                  Track Package
                                </button>
                              )}
                              <button className="text-sm text-gray-600 hover:text-gray-900">
                                Get Help
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Total</p>
                              <p className="text-lg font-medium text-gray-900">
                                ₹{order.total.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {/* {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium text-gray-900">
                      Saved Addresses
                    </h2>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Add New Address
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.addresses.map((address) => (
                      <div
                        key={address.id}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                            {address.type}
                          </span>
                          {address.isDefault && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {address.address}
                          <br />
                          {address.city}, {address.state} {address.zipCode}
                          <br />
                          {address.country}
                        </p>
                        <div className="flex gap-3 mt-4">
                          <button className="text-sm text-gray-600 hover:text-gray-900">
                            Edit
                          </button>
                          <button className="text-sm text-gray-600 hover:text-red-600">
                            Remove
                          </button>
                          {!address.isDefault && (
                            <button className="text-sm text-gray-600 hover:text-gray-900">
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Payment Methods Tab */}
              {/* {activeTab === "payments" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium text-gray-900">
                      Payment Methods
                    </h2>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Add New Card
                    </button>
                  </div>

                  <div className="space-y-4">
                    {user.paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                              <CreditCard size={20} className="text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">
                                {method.type} •••• {method.last4}
                              </p>
                              <p className="text-sm text-gray-500">
                                Expires {method.expiry}
                              </p>
                            </div>
                          </div>
                          {method.isDefault && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button className="text-sm text-gray-600 hover:text-gray-900">
                            Edit
                          </button>
                          <button className="text-sm text-gray-600 hover:text-red-600">
                            Remove
                          </button>
                          {!method.isDefault && (
                            <button className="text-sm text-gray-600 hover:text-gray-900">
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Settings Tab */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
