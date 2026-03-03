import { Users, Package, ShoppingBag, DollarSign } from "lucide-react";
import StatCard from "../../components/admin/StatCard";
import Table from "../../components/admin/Table";
import { orders } from "../../data/mockData";

const Dashboard = () => {
  const recentOrders = orders.slice(0, 5);

  const columns = [
    { header: "Order ID", accessor: "id" },
    { header: "Customer", accessor: "user" },
    { header: "Payment Method", accessor: "paymentMethod" },
    {
      header: "Status",
      accessor: "paymentStatus",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.paymentStatus === "Paid"
              ? "bg-green-100 text-green-700"
              : row.paymentStatus === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-blue-100 text-blue-700"
          }`}
        >
          {row.paymentStatus}
        </span>
      ),
    },
    {
      header: "Total",
      accessor: "totalPrice",
      render: (row) => `$${row.totalPrice}`,
    },
    { header: "Date", accessor: "orderDate" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="1,234"
          icon={Users}
          trend="up"
          trendValue="12"
        />
        <StatCard
          title="Total Products"
          value="156"
          icon={Package}
          trend="up"
          trendValue="8"
        />
        <StatCard
          title="Total Orders"
          value="892"
          icon={ShoppingBag}
          trend="up"
          trendValue="23"
        />
        <StatCard
          title="Total Revenue"
          value="$45,231"
          icon={DollarSign}
          trend="up"
          trendValue="15"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
        </div>
        <Table columns={columns} data={recentOrders} />
      </div>
    </div>
  );
};

export default Dashboard;
