import { useState } from "react";
import {
  Search,
  Filter,
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
} from "lucide-react";
import Table from "../../components/admin/Table";
import { orders } from "../../data/mockData";

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      order.paymentStatus.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: "Order ID",
      accessor: "id",
      sortable: true,
      render: (row) => (
        <span className="font-medium text-gray-900">{row.id}</span>
      ),
    },
    {
      header: "Customer",
      accessor: "user",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {row.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <span className="text-gray-700">{row.user}</span>
        </div>
      ),
    },
    {
      header: "Payment Method",
      accessor: "paymentMethod",
      render: (row) => (
        <div className="flex items-center gap-2">
          <CreditCard size={14} className="text-gray-400" />
          <span className="text-gray-600">{row.paymentMethod}</span>
        </div>
      ),
    },
    {
      header: "Payment Status",
      accessor: "paymentStatus",
      sortable: true,
      render: (row) => {
        const statusConfig = {
          Paid: { color: "bg-green-100 text-green-700", icon: CheckCircle },
          Pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
          PartiallyPaid: {
            color: "bg-blue-100 text-blue-700",
            icon: DollarSign,
          },
          Failed: { color: "bg-red-100 text-red-700", icon: XCircle },
          Shipped: { color: "bg-purple-100 text-purple-700", icon: Truck },
        };
        const config = statusConfig[row.paymentStatus] || statusConfig.Pending;
        const Icon = config.icon;

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color}`}
          >
            <Icon size={12} />
            {row.paymentStatus}
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
          ${row.totalPrice.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Order Date",
      accessor: "orderDate",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-gray-600">
            {new Date(row.orderDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      ),
    },
  ];

  const actions = (row) => (
    <div className="flex items-center gap-2">
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="View Details"
      >
        <Eye size={16} className="text-gray-600" />
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
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const paidOrders = orders.filter((o) => o.paymentStatus === "Paid").length;
  const pendingOrders = orders.filter(
    (o) => o.paymentStatus === "Pending",
  ).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          Orders <span className="font-medium">Management</span>
        </h1>
        <p className="text-gray-500">
          View and manage all customer orders from one place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Total Orders
            </span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-semibold">📦</span>
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{totalOrders}</p>
          <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Total Revenue
            </span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign size={16} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">
            ${totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-green-600 mt-2">↑ 8% from last month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Paid Orders
            </span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{paidOrders}</p>
          <p className="text-xs text-gray-500 mt-2">
            {((paidOrders / totalOrders) * 100).toFixed(1)}% of total
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Pending Orders
            </span>
            <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{pendingOrders}</p>
          <p className="text-xs text-orange-600 mt-2">Requires attention</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-gray-900">All Orders</h2>
              <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {filteredOrders.length} orders
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
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer w-full"
                >
                  <option value="all">All Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="partiallypaid">Partially Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="failed">Failed</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>

              {/* Export Button */}
              <button className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || statusFilter !== "all") && (
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs">
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
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs">
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

        {/* Table */}
        <Table
          columns={columns}
          data={filteredOrders}
          actions={actions}
          onSort={(key, direction) => console.log(key, direction)}
        />
      </div>
    </div>
  );
};

export default Orders;
