import Table from "../../components/admin/Table";
import { orders } from "../../data/mockData";

const Orders = () => {
  const columns = [
    { header: "Order ID", accessor: "id" },
    { header: "Customer", accessor: "user" },
    { header: "Payment Method", accessor: "paymentMethod" },
    {
      header: "Payment Status",
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
      header: "Total Price",
      accessor: "totalPrice",
      render: (row) => `$${row.totalPrice}`,
    },
    { header: "Order Date", accessor: "orderDate" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Orders Management
        </h1>
        <p className="text-gray-600">View and manage all customer orders.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">All Orders</h2>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                <option>All Status</option>
                <option>Paid</option>
                <option>Pending</option>
                <option>PartiallyPaid</option>
              </select>
              <input
                type="search"
                placeholder="Search orders..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>
        <Table columns={columns} data={orders} />
      </div>
    </div>
  );
};

export default Orders;
