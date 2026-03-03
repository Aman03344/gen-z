import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  ShoppingBag,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  PieChart,
  BarChart3,
  Wallet,
  Percent,
} from "lucide-react";
import StatCard from "../../components/admin/StatCard";

const Revenue = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [chartType, setChartType] = useState("bar");

  const monthlyData = [
    { month: "January", revenue: 12500, orders: 156, avgOrder: 80.13 },
    { month: "February", revenue: 15200, orders: 189, avgOrder: 80.42 },
    { month: "March", revenue: 18900, orders: 234, avgOrder: 80.77 },
    { month: "April", revenue: 16300, orders: 203, avgOrder: 80.3 },
    { month: "May", revenue: 21400, orders: 267, avgOrder: 80.15 },
    { month: "June", revenue: 19800, orders: 245, avgOrder: 80.82 },
    { month: "July", revenue: 22100, orders: 278, avgOrder: 79.5 },
    { month: "August", revenue: 23500, orders: 295, avgOrder: 79.66 },
    { month: "September", revenue: 19800, orders: 248, avgOrder: 79.84 },
    { month: "October", revenue: 21200, orders: 265, avgOrder: 80.0 },
    { month: "November", revenue: 25600, orders: 320, avgOrder: 80.0 },
    { month: "December", revenue: 28900, orders: 361, avgOrder: 80.06 },
  ];

  const categoryData = [
    {
      name: "T-Shirts",
      revenue: 28450,
      sales: 342,
      percentage: 22,
      color: "bg-blue-500",
    },
    {
      name: "Jeans",
      revenue: 23120,
      sales: 256,
      percentage: 18,
      color: "bg-green-500",
    },
    {
      name: "Hoodies",
      revenue: 18900,
      sales: 189,
      percentage: 15,
      color: "bg-purple-500",
    },
    {
      name: "Jackets",
      revenue: 15230,
      sales: 145,
      percentage: 12,
      color: "bg-orange-500",
    },
    {
      name: "Shirts",
      revenue: 12890,
      sales: 167,
      percentage: 10,
      color: "bg-pink-500",
    },
    {
      name: "Accessories",
      revenue: 9870,
      sales: 312,
      percentage: 8,
      color: "bg-yellow-500",
    },
    {
      name: "Footwear",
      revenue: 8560,
      sales: 98,
      percentage: 7,
      color: "bg-indigo-500",
    },
    {
      name: "Others",
      revenue: 6480,
      sales: 156,
      percentage: 5,
      color: "bg-gray-500",
    },
  ];

  // Calculate totals
  const totalRevenue = monthlyData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = monthlyData.reduce((sum, d) => sum + d.orders, 0);
  const avgOrderValue = (totalRevenue / totalOrders).toFixed(2);
  const prevYearRevenue = 187500; // Mock previous year data
  const growthRate = (
    ((totalRevenue - prevYearRevenue) / prevYearRevenue) *
    100
  ).toFixed(1);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      trend: "up",
      trendValue: growthRate,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      title: "Average Order",
      value: `$${avgOrderValue}`,
      icon: CreditCard,
      trend: "up",
      trendValue: "5.2",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Orders",
      value: totalOrders.toLocaleString(),
      icon: ShoppingBag,
      trend: "up",
      trendValue: "15.8",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Growth Rate",
      value: `${growthRate}%`,
      icon: TrendingUp,
      trend: "up",
      trendValue: "8.3",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Revenue <span className="font-medium">Analytics</span>
          </h1>
          <p className="text-gray-500">
            Track your revenue and financial performance in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Year Selector */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer"
            >
              <option>2024</option>
              <option>2023</option>
              <option>2022</option>
            </select>
            <Calendar
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>

          {/* Export Button */}
          <button className="px-4 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Revenue Overview
              </h2>
              <p className="text-sm text-gray-500">
                Monthly revenue performance for {selectedYear}
              </p>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setChartType("bar")}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === "bar"
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/50"
                }`}
              >
                <BarChart3
                  size={18}
                  className={
                    chartType === "bar" ? "text-gray-900" : "text-gray-500"
                  }
                />
              </button>
              <button
                onClick={() => setChartType("line")}
                className={`p-2 rounded-lg transition-colors ${
                  chartType === "line"
                    ? "bg-white shadow-sm"
                    : "hover:bg-white/50"
                }`}
              >
                <TrendingUp
                  size={18}
                  className={
                    chartType === "line" ? "text-gray-900" : "text-gray-500"
                  }
                />
              </button>
            </div>
          </div>

          {/* Revenue Bars */}
          <div className="space-y-3">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <div className="w-20 text-xs text-gray-500 font-medium">
                  {data.month.slice(0, 3)}
                </div>
                <div className="flex-1 relative">
                  <div className="h-10 bg-gray-100 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg flex items-center justify-end px-3 group-hover:from-gray-800 group-hover:to-gray-600 transition-all"
                      style={{ width: `${(data.revenue / 30000) * 100}%` }}
                    >
                      <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        ${data.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <span className="text-sm font-medium text-gray-900">
                    ${(data.revenue / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Best Month</p>
              <p className="text-sm font-medium text-gray-900">December</p>
              <p className="text-xs text-green-600">$28.9k</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Worst Month</p>
              <p className="text-sm font-medium text-gray-900">January</p>
              <p className="text-xs text-red-600">$12.5k</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Average</p>
              <p className="text-sm font-medium text-gray-900">$19.5k</p>
              <p className="text-xs text-gray-500">per month</p>
            </div>
          </div>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Revenue by Category
              </h2>
              <p className="text-sm text-gray-500">Breakdown by product type</p>
            </div>
            <PieChart size={20} className="text-gray-400" />
          </div>

          {/* Category Progress Bars */}
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${category.color}`}
                    />
                    <span className="text-sm text-gray-700">
                      {category.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-900">
                      ${category.revenue.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 w-8">
                      {category.percentage}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${category.color}`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Category Stats */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Top Category</p>
                <p className="text-sm font-medium text-gray-900">T-Shirts</p>
                <p className="text-xs text-green-600">$28.5k (22%)</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Total Sales</p>
                <p className="text-sm font-medium text-gray-900">1,865 units</p>
                <p className="text-xs text-gray-500">across categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Monthly Revenue Breakdown
            </h2>
            <p className="text-sm text-gray-500">
              Detailed view of revenue and orders by month
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              Last updated: Today, 10:30 AM
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg Order Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {monthlyData.map((data, index) => {
                const prevRevenue =
                  index > 0 ? monthlyData[index - 1].revenue : data.revenue;
                const trend = (
                  ((data.revenue - prevRevenue) / prevRevenue) *
                  100
                ).toFixed(1);
                const isPositive = trend >= 0;

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">
                        {data.month}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-gray-900">
                        ${data.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {data.orders}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        ${data.avgOrder}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`flex items-center gap-1 text-xs ${
                          isPositive ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isPositive ? (
                          <ArrowUpRight size={14} />
                        ) : (
                          <ArrowDownRight size={14} />
                        )}
                        <span>{Math.abs(trend)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-900">12</span>{" "}
              months of data
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Total:{" "}
                  <span className="font-medium text-gray-900">
                    ${totalRevenue.toLocaleString()}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Percent size={14} className="text-gray-400" />
                <span className="text-sm text-gray-600">
                  Growth:{" "}
                  <span className="font-medium text-green-600">
                    +{growthRate}%
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
