import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Download,
  Eye,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  RefreshCw,
  Package,
  AlertCircle,
} from "lucide-react";
import Table from "../../components/admin/Table";
import { getAllOrders } from "../../features/adminFeature/adminSlice";

// ─── Status config ───────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  Paid: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  paid: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  PartiallyPaid: { color: "bg-blue-100 text-blue-700", icon: DollarSign },
  partiallypaid: { color: "bg-blue-100 text-blue-700", icon: DollarSign },
  Failed: { color: "bg-red-100 text-red-700", icon: XCircle },
  failed: { color: "bg-red-100 text-red-700", icon: XCircle },
  Shipped: { color: "bg-purple-100 text-purple-700", icon: Truck },
  shipped: { color: "bg-purple-100 text-purple-700", icon: Truck },
  Delivered: { color: "bg-teal-100 text-teal-700", icon: CheckCircle },
  delivered: { color: "bg-teal-100 text-teal-700", icon: CheckCircle },
};

// ─── Helper: safely read order fields (handles different API shapes) ──────────
const getOrderId = (o) => o._id || o.id || "—";
const getCustomer = (o) =>
  o.user?.name || o.user || o.customerName || o.customer || "Unknown";
const getPayMethod = (o) => o.paymentMethod || o.payment?.method || "—";
const getPayStatus = (o) =>
  o.paymentStatus || o.payment?.status || o.status || "Pending";
const getTotal = (o) => o.totalPrice || o.total || o.amount || 0;
const getDate = (o) => o.createdAt || o.orderDate || o.date || null;
const getItemsCount = (o) => (o.orderItems || o.items || []).length;

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector(
    (state) => state.admin,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ── Fetch on mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // ── Derived stats ───────────────────────────────────────────────────────────
  const ordersArray = Array.isArray(orders) ? orders : [];
  const totalRevenue = ordersArray.reduce((sum, o) => sum + getTotal(o), 0);
  const paidCount = ordersArray.filter(
    (o) => getPayStatus(o).toLowerCase() === "paid",
  ).length;
  const pendingCount = ordersArray.filter(
    (o) => getPayStatus(o).toLowerCase() === "pending",
  ).length;

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filteredOrders = ordersArray.filter((order) => {
    const id = getOrderId(order).toString().toLowerCase();
    const customer = getCustomer(order).toLowerCase();
    const status = getPayStatus(order).toLowerCase();

    const matchesSearch =
      id.includes(searchTerm.toLowerCase()) ||
      customer.includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // ── Table columns ───────────────────────────────────────────────────────────
  const columns = [
    {
      header: "Order ID",
      accessor: "_id",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-gray-900 font-mono text-xs">
          #{getOrderId(row).slice(-8).toUpperCase()}
        </span>
      ),
    },
    {
      header: "Customer",
      accessor: "user",
      sortable: true,
      render: (row) => {
        const name = getCustomer(row);
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        return (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-medium text-gray-600">
                {initials}
              </span>
            </div>
            <div>
              <p className="text-gray-700 text-sm">{name}</p>
              {row.user?.email && (
                <p className="text-gray-400 text-xs">{row.user.email}</p>
              )}
            </div>
          </div>
        );
      },
    },
    {
      header: "Items",
      accessor: "orderItems",
      render: (row) => {
        const count = getItemsCount(row);
        return (
          <span className="text-gray-600 text-sm">
            {count} {count === 1 ? "item" : "items"}
          </span>
        );
      },
    },
    {
      header: "Payment Method",
      accessor: "paymentMethod",
      render: (row) => (
        <div className="flex items-center gap-2">
          <CreditCard size={14} className="text-gray-400" />
          <span className="text-gray-600 text-sm">{getPayMethod(row)}</span>
        </div>
      ),
    },
    {
      header: "Payment Status",
      accessor: "paymentStatus",
      sortable: true,
      render: (row) => {
        const status = getPayStatus(row);
        const config = STATUS_CONFIG[status] || STATUS_CONFIG.Pending;
        const Icon = config.icon;
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color}`}
          >
            <Icon size={12} />
            {status}
          </span>
        );
      },
    },
    {
      header: "Total",
      accessor: "totalPrice",
      sortable: true,
      render: (row) => (
        <span className="font-semibold text-gray-900">
          ₹{getTotal(row).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      header: "Order Date",
      accessor: "createdAt",
      sortable: true,
      render: (row) => {
        const date = getDate(row);
        return (
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-600 text-sm">
              {date
                ? new Date(date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "—"}
            </span>
          </div>
        );
      },
    },
  ];

  const actions = () => (
    <div className="flex items-center gap-1">
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="View Details"
      >
        <Eye size={15} className="text-gray-600" />
      </button>
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="More Actions"
      >
        <MoreHorizontal size={15} className="text-gray-600" />
      </button>
    </div>
  );

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (isLoading && ordersArray.length === 0) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-2" />
          <div className="h-4 w-80 bg-gray-100 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
              <div className="h-8 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex gap-4 mb-4">
              <div className="h-4 flex-1 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 flex-1 bg-gray-100 rounded animate-pulse" />
              <div className="h-4 flex-1 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Failed to load orders
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={() => dispatch(getAllOrders())}
            className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={15} /> Retry
          </button>
        </div>
      </div>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-1">
            Orders <span className="font-medium">Management</span>
          </h1>
          <p className="text-gray-500 text-sm">
            View and manage all customer orders from one place.
          </p>
        </div>
        <button
          onClick={() => dispatch(getAllOrders())}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Total Orders
            </span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package size={15} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">
            {ordersArray.length}
          </p>
          <p className="text-xs text-gray-400 mt-2">All time</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Total Revenue
            </span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={15} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">
            ₹{totalRevenue.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-green-600 mt-2">From all orders</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Paid Orders
            </span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={15} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{paidCount}</p>
          <p className="text-xs text-gray-500 mt-2">
            {ordersArray.length > 0
              ? `${((paidCount / ordersArray.length) * 100).toFixed(1)}% of total`
              : "—"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Pending Orders
            </span>
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock size={15} className="text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{pendingCount}</p>
          <p className="text-xs text-orange-500 mt-2">
            {pendingCount > 0 ? "Requires attention" : "All clear"}
          </p>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-gray-900">All Orders</h2>
              <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {filteredOrders.length}{" "}
                {filteredOrders.length === 1 ? "order" : "orders"}
              </span>
              {isLoading && (
                <RefreshCw size={14} className="animate-spin text-gray-400" />
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="search"
                  placeholder="Search by order ID or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full sm:w-72"
                />
              </div>

              {/* Status filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-4 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer w-full"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="partiallypaid">Partially Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="failed">Failed</option>
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Export */}
              <button className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Download size={15} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {(searchTerm || statusFilter !== "all") && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="ml-1 hover:text-gray-900"
                >
                  <XCircle size={12} />
                </button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs">
                Status: {statusFilter}
                <button
                  onClick={() => setStatusFilter("all")}
                  className="ml-1 hover:text-gray-900"
                >
                  <XCircle size={12} />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredOrders.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Package size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm font-medium">No orders found</p>
            <p className="text-gray-400 text-xs mt-1">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your filters."
                : "Orders will appear here once customers place them."}
            </p>
          </div>
        ) : (
          <Table
            columns={columns}
            data={filteredOrders}
            actions={actions}
            onSort={(key, direction) => console.log(key, direction)}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
