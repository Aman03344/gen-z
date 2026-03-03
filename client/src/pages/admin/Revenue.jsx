import { DollarSign, TrendingUp, CreditCard, ShoppingBag } from "lucide-react";
import StatCard from "../../components/admin/StatCard";

const Revenue = () => {
  const monthlyData = [
    { month: "January", revenue: 12500, orders: 156, avgOrder: 80.13 },
    { month: "February", revenue: 15200, orders: 189, avgOrder: 80.42 },
    { month: "March", revenue: 18900, orders: 234, avgOrder: 80.77 },
    { month: "April", revenue: 16300, orders: 203, avgOrder: 80.3 },
    { month: "May", revenue: 21400, orders: 267, avgOrder: 80.15 },
    { month: "June", revenue: 19800, orders: 245, avgOrder: 80.82 },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Revenue Analytics
        </h1>
        <p className="text-gray-600">
          Track your revenue and financial performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value="$104,100"
          icon={DollarSign}
          trend="up"
          trendValue="23"
        />
        <StatCard
          title="Average Order"
          value="$80.43"
          icon={CreditCard}
          trend="up"
          trendValue="5"
        />
        <StatCard
          title="Total Orders"
          value="1,294"
          icon={ShoppingBag}
          trend="up"
          trendValue="18"
        />
        <StatCard
          title="Growth Rate"
          value="23%"
          icon={TrendingUp}
          trend="up"
          trendValue="8"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Revenue Chart
          </h2>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-20 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gray-900 rounded-full flex items-center justify-end pr-3"
                    style={{ width: `${(data.revenue / 25000) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">
                      ${data.revenue}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Revenue by Category
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="font-medium">T-Shirts</p>
                <p className="text-sm text-gray-500">342 sales</p>
              </div>
              <p className="text-lg font-bold">$28,450</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="font-medium">Jeans</p>
                <p className="text-sm text-gray-500">256 sales</p>
              </div>
              <p className="text-lg font-bold">$23,120</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="font-medium">Hoodies</p>
                <p className="text-sm text-gray-500">189 sales</p>
              </div>
              <p className="text-lg font-bold">$18,900</p>
            </div>
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="font-medium">Jackets</p>
                <p className="text-sm text-gray-500">145 sales</p>
              </div>
              <p className="text-lg font-bold">$15,230</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Shirts</p>
                <p className="text-sm text-gray-500">167 sales</p>
              </div>
              <p className="text-lg font-bold">$12,890</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Monthly Revenue Breakdown
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Month
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Revenue
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Orders
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Avg Order Value
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {data.month}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ${data.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {data.orders}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    ${data.avgOrder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
