import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  Package,
  LogOut,
  ChevronRight,
  Truck,
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader,
  Clock,
} from "lucide-react";
import { getUserOrders, resetOrder } from "../features/order/orderSlice";
import { logOutUser } from "../features/auth/authSlice";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.order,
  );

  // Fetch orders on component mount
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (activeTab === "orders") {
      dispatch(getUserOrders());
    }

    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch, user, navigate, activeTab]);

  // Handle error
  useEffect(() => {
    if (isError) {
      toast.error(message || "Failed to load orders", {
        duration: 3000,
      });
    }
  }, [isError, message]);

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/");
    toast.success("Logged out successfully");
  };

  const getStatusBadge = (paymentStatus) => {
    // Handle undefined or null status
    if (!paymentStatus) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
          <Clock size={12} />
          Pending
        </span>
      );
    }

    const statusConfig = {
      Pending: { color: "bg-orange-100 text-orange-700", icon: RefreshCw },
      PartiallyPaid: { color: "bg-blue-100 text-blue-700", icon: Clock },
      Paid: { color: "bg-green-100 text-green-700", icon: CheckCircle },
    };

    // Use the status as-is (case-sensitive matching)
    const config = statusConfig[paymentStatus] || statusConfig.Pending;
    const Icon = config.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        <Icon size={12} />
        {paymentStatus === "PartiallyPaid" ? "Partially Paid" : paymentStatus}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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
                    <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden bg-gray-700">
                      <span className="text-xl font-light">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-medium text-lg truncate">
                      {user?.name}
                    </h2>
                    <p className="text-sm text-gray-300 truncate">
                      {user?.email}
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

                <button
                  onClick={handleLogout}
                  className="w-full flex cursor-pointer hover:text-red-600 items-center gap-3 p-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all mt-2"
                >
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
                      <option>All time</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                      <option>Last 6 months</option>
                    </select>
                  </div>

                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader
                        size={40}
                        className="animate-spin text-gray-900 mb-4"
                      />
                      <p className="text-gray-600">Loading your orders...</p>
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order._id}
                          className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                        >
                          {/* Order Header */}
                          <div className="bg-gray-50 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  Order ID
                                </p>
                                <p className="font-medium text-gray-900">
                                  {order._id.slice(-8).toUpperCase()}
                                </p>
                              </div>
                              <div className="h-8 w-px bg-gray-200" />
                              <div>
                                <p className="text-sm text-gray-500">
                                  Placed on
                                </p>
                                <p className="font-medium text-gray-900">
                                  {formatDate(order.createdAt)}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {/* Use paymentStatus instead of orderStatus */}
                              {getStatusBadge(order.paymentStatus)}
                              <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                                View Details
                              </button>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="p-4">
                            {order.orderItems &&
                              order.orderItems.map((item, index) => (
                                <div key={index} className="flex gap-4 py-2">
                                  <img
                                    src={
                                      item.image ||
                                      "https://via.placeholder.com/100"
                                    }
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg"
                                  />
                                  <div className="flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">
                                      {item.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                      Qty: {item.quantity}
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
                                {order.paymentMethod === "COD" && (
                                  <span className="text-xs text-gray-500">
                                    COD •{" "}
                                    {order.advancePaid > 0
                                      ? `Advance: ₹${order.advancePaid}`
                                      : "Pay on delivery"}
                                  </span>
                                )}
                                <button className="text-sm text-gray-600 hover:text-gray-900">
                                  Get Help
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Total</p>
                                <p className="text-lg font-medium text-gray-900">
                                  ₹{order.totalAmount?.toFixed(2) || "0.00"}
                                </p>
                                {order.paymentStatus === "PartiallyPaid" && (
                                  <p className="text-xs text-blue-600">
                                    Paid: ₹{order.advancePaid} • Remaining: ₹
                                    {order.remainingAmount}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Package
                        size={48}
                        className="mx-auto text-gray-300 mb-4"
                      />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No orders yet
                      </h3>
                      <p className="text-gray-500 mb-6">
                        When you place your first order, it will appear here.
                      </p>
                      <button
                        onClick={() => navigate("/shop")}
                        className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
                      >
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
