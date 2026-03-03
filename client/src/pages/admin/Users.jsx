import { Trash2 } from "lucide-react";
import Table from "../../components/admin/Table";
import Button from "../../components/Button";
import { users } from "../../data/mockData";

const Users = () => {
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    {
      header: "Role",
      accessor: "role",
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.role === "Admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {row.role}
        </span>
      ),
    },
    { header: "Joined Date", accessor: "joinedDate" },
  ];

  const actions = (row) => (
    <>
      <Button variant="danger" size="sm">
        <Trash2 size={16} />
      </Button>
    </>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Users Management
        </h1>
        <p className="text-gray-600">Manage all users and their permissions.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">All Users</h2>
            <div className="flex items-center gap-3">
              <input
                type="search"
                placeholder="Search users..."
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>
        <Table columns={columns} data={users} actions={actions} />
      </div>
    </div>
  );
};

export default Users;
