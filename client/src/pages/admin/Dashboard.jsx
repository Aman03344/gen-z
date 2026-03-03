import {
  Users,
  Package,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../../components/admin/StatCard";
import Table from "../../components/admin/Table";
import { orders } from "../../data/mockData";
import { useState } from "react";

const Dashboard = () => {
  const [dateRange, setDateRange] = useState("today");
  const recentOrders = orders.slice(0, 5);

  // Mock chart data (you can replace with actual chart library)
  const weeklyData = [65, 78, 82, 91, 88, 95, 112];

  const columns = [
    { header: "Order ID", accessor: "id", sortable: true },
    { header: "Customer", accessor: "user", sortable: true },
    { header: "Payment Method", accessor: "paymentMethod" },
    {
      header: "Status",
      accessor: "paymentStatus",
      render: (row) => {
        const statusConfig = {
          Paid: { color: "bg-green-100 text-green-700", label: "Paid" },
          Pending: { color: "bg-yellow-100 text-yellow-700", label: "Pending" },
          Processing: {
            color: "bg-blue-100 text-blue-700",
            label: "Processing",
          },
          Failed: { color: "bg-red-100 text-red-700", label: "Failed" },
        };
        const config = statusConfig[row.paymentStatus] || statusConfig.Pending;

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                row.paymentStatus === "Paid"
                  ? "bg-green-600"
                  : row.paymentStatus === "Pending"
                    ? "bg-yellow-600"
                    : row.paymentStatus === "Processing"
                      ? "bg-blue-600"
                      : "bg-red-600"
              }`}
            />
            {config.label}
          </span>
        );
      },
    },
    {
      header: "Total",
      accessor: "totalPrice",
      render: (row) => (
        <span className="font-medium text-gray-900">
          ₹{row.totalPrice.toLocaleString()}
        </span>
      ),
      sortable: true,
    },
    {
      header: "Date",
      accessor: "orderDate",
      render: (row) => (
        <span className="text-gray-600">
          {new Date(row.orderDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
      sortable: true,
    },
  ];

  const actions = (row) => (
    <Link
      to={`/admin/orders/${row.id}`}
      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors"
    >
      View
      <ArrowRight size={14} />
    </Link>
  );

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      trend: "up",
      trendValue: "12",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Products",
      value: "156",
      icon: Package,
      trend: "up",
      trendValue: "8",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Total Orders",
      value: "892",
      icon: ShoppingBag,
      trend: "up",
      trendValue: "23",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Total Revenue",
      value: "₹45,231",
      icon: IndianRupee,
      trend: "up",
      trendValue: "15",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Dashboard <span className="font-medium">Overview</span>
          </h1>
          <p className="text-gray-500">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
          {["today", "week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                dateRange === range
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Revenue Overview
              </h2>
              <p className="text-sm text-gray-500">
                Weekly revenue performance
              </p>
            </div>
            <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>

          {/* Simple Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyData.map((value, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full bg-gradient-to-t from-gray-900 to-gray-700 rounded-t-lg transition-all hover:from-gray-800 hover:to-gray-600"
                  style={{ height: `${(value / 120) * 100}%` }}
                />
                <span className="text-xs text-gray-500">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversion Rate</p>
                  <p className="text-sm font-medium text-gray-900">3.24%</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                +0.5%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag size={16} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Avg. Order Value</p>
                  <p className="text-sm font-medium text-gray-900">₹124.50</p>
                </div>
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                +8%
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">This Month</p>
                  <p className="text-sm font-medium text-gray-900">$12,450</p>
                </div>
              </div>
              <span className="text-xs text-gray-600 bg-gray-200 px-2 py-1 rounded">
                Target: ₹45k
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">
                Monthly Goal Progress
              </span>
              <span className="text-xs font-medium text-gray-900">68%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gray-900 to-gray-700 rounded-full"
                style={{ width: "68%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            <p className="text-sm text-gray-500">
              You have {orders.length} total orders
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            View All Orders
            <ArrowRight size={16} />
          </Link>
        </div>
        <Table columns={columns} data={recentOrders} actions={actions} />
      </div>
    </div>
  );
};

export default Dashboard;
