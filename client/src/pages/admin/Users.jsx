import { useState } from "react";
import {
  Trash2,
  Search,
  Filter,
  Download,
  ChevronDown,
  UserPlus,
  Shield,
  Mail,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  UserCog,
  Ban,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Table from "../../components/admin/Table";
import Button from "../../components/Button";
import { users } from "../../data/mockData";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Add status to mock data if not present
  const enhancedUsers = users.map((user) => ({
    ...user,
    status:
      user.role === "Admin"
        ? "Active"
        : ["Active", "Inactive", "Suspended"][Math.floor(Math.random() * 3)],
    lastActive: "2024-02-20",
    orders: Math.floor(Math.random() * 50) + 1,
    totalSpent: Math.floor(Math.random() * 5000) + 100,
  }));

  // Filter users based on search and filters
  const filteredUsers = enhancedUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" ||
      user.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "all" ||
      user.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      header: "User",
      accessor: "name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center text-white font-medium">
              {row.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                row.status === "Active"
                  ? "bg-green-500"
                  : row.status === "Inactive"
                    ? "bg-gray-400"
                    : "bg-red-500"
              }`}
            />
          </div>
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      accessor: "role",
      sortable: true,
      render: (row) => {
        const roleConfig = {
          Admin: { color: "bg-purple-100 text-purple-700", icon: Shield },
          User: { color: "bg-blue-100 text-blue-700", icon: UserCog },
          Moderator: { color: "bg-green-100 text-green-700", icon: Shield },
        };
        const config = roleConfig[row.role] || roleConfig.User;
        const Icon = config.icon;

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color}`}
          >
            <Icon size={12} />
            {row.role}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      render: (row) => {
        const statusConfig = {
          Active: { color: "bg-green-100 text-green-700", icon: CheckCircle },
          Inactive: { color: "bg-gray-100 text-gray-700", icon: XCircle },
          Suspended: { color: "bg-red-100 text-red-700", icon: Ban },
        };
        const config = statusConfig[row.status] || statusConfig.Inactive;
        const Icon = config.icon;

        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color}`}
          >
            <Icon size={12} />
            {row.status}
          </span>
        );
      },
    },
    {
      header: "Joined",
      accessor: "joinedDate",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-gray-400" />
          <span className="text-sm text-gray-600">
            {new Date(row.joinedDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      ),
    },
    {
      header: "Orders",
      accessor: "orders",
      sortable: true,
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">{row.orders}</span>
      ),
    },
    {
      header: "Total Spent",
      accessor: "totalSpent",
      sortable: true,
      render: (row) => (
        <span className="text-sm font-semibold text-gray-900">
          ${row.totalSpent.toLocaleString()}
        </span>
      ),
    },
  ];

  const actions = (row) => (
    <div className="flex items-center gap-2">
      <button
        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
        title="View Details"
      >
        <Eye size={16} className="text-gray-600 group-hover:text-blue-600" />
      </button>
      <button
        className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
        title="Edit User"
      >
        <Edit size={16} className="text-gray-600 group-hover:text-green-600" />
      </button>
      <button
        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
        title="Delete User"
      >
        <Trash2 size={16} className="text-gray-600 group-hover:text-red-600" />
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
  const totalUsers = enhancedUsers.length;
  const adminCount = enhancedUsers.filter((u) => u.role === "Admin").length;
  const activeUsers = enhancedUsers.filter((u) => u.status === "Active").length;
  const newUsers = enhancedUsers.filter((u) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(u.joinedDate) > thirtyDaysAgo;
  }).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-2">
            Users <span className="font-medium">Management</span>
          </h1>
          <p className="text-gray-500">
            Manage all users, their roles, and permissions.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Total Users
            </span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCog size={16} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{totalUsers}</p>
          <p className="text-xs text-green-600 mt-2">↑ 12 new this month</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Active Users
            </span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={16} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{activeUsers}</p>
          <p className="text-xs text-gray-500 mt-2">
            {((activeUsers / totalUsers) * 100).toFixed(1)}% of total
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Administrators
            </span>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{adminCount}</p>
          <p className="text-xs text-gray-500 mt-2">With full access</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">New Users</span>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <UserPlus size={16} className="text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{newUsers}</p>
          <p className="text-xs text-orange-600 mt-2">Last 30 days</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-gray-900">All Users</h2>
              <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {filteredUsers.length} users
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full sm:w-64"
                />
              </div>

              {/* Role Filter */}
              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer w-full"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || roleFilter !== "all" || statusFilter !== "all") && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 hover:text-gray-900"
                  >
                    <XCircle size={12} />
                  </button>
                </span>
              )}
              {roleFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs">
                  Role: {roleFilter}
                  <button
                    onClick={() => setRoleFilter("all")}
                    className="ml-1 hover:text-gray-900"
                  >
                    <XCircle size={12} />
                  </button>
                </span>
              )}
              {statusFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs">
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
        </div>

        {/* Table */}
        <Table
          columns={columns}
          data={filteredUsers}
          actions={actions}
          selectable={true}
          onSort={(key, direction) => console.log(key, direction)}
        />
      </div>
    </div>
  );
};

export default Users;
