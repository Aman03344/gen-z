import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Trash2,
  Search,
  ChevronDown,
  UserPlus,
  Shield,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  UserCog,
  Ban,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import Table from "../../components/admin/Table";
import { getAllUsers } from "../../features/adminFeature/adminSlice";

// ─── Helper: safely read user fields (handles different API shapes) ──────────
const getName = (u) => u.name || u.fullName || u.username || "Unknown";
const getEmail = (u) => u.email || "—";
const getRole = (u) => u.role || u.userRole || "User";
const getJoinDate = (u) => u.createdAt || u.joinedDate || u.joinDate || null;

// Derive a deterministic (not random) status so it doesn't re-roll on re-render
const getStatus = (u) => {
  if (u.status) return u.status;
  if (u.isActive === false || u.active === false) return "Inactive";
  if (u.isBanned || u.suspended) return "Suspended";
  return "Active";
};

const getOrders = (u) => u.orders ?? u.orderCount ?? 0;
const getTotalSpent = (u) => u.totalSpent ?? u.totalPurchase ?? 0;

const Orders = () => {}; // dummy — not used, just avoids lint

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading, isError, message } = useSelector((s) => s.admin);

  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // ── Fetch on mount ──────────────────────────────────────────────────────────
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const usersArray = Array.isArray(users) ? users : [];

  // ── Derived stats ───────────────────────────────────────────────────────────
  const totalUsers = usersArray.length;
  const adminCount = usersArray.filter(
    (u) => getRole(u).toLowerCase() === "admin",
  ).length;
  const activeCount = usersArray.filter(
    (u) => getStatus(u) === "Active",
  ).length;
  const newCount = usersArray.filter((u) => {
    const d = getJoinDate(u);
    if (!d) return false;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    return new Date(d) > cutoff;
  }).length;

  // ── Filtered list ───────────────────────────────────────────────────────────
  const filteredUsers = usersArray.filter((user) => {
    const name = getName(user).toLowerCase();
    const email = getEmail(user).toLowerCase();
    const role = getRole(user).toLowerCase();
    const stat = getStatus(user).toLowerCase();

    const matchesSearch =
      name.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter === "all" || role === roleFilter.toLowerCase();
    const matchesStatus =
      statusFilter === "all" || stat === statusFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  // ── Table columns ───────────────────────────────────────────────────────────
  const columns = [
    {
      header: "User",
      accessor: "name",
      sortable: true,
      render: (row) => {
        const name = getName(row);
        const email = getEmail(row);
        const status = getStatus(row);
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();
        return (
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center text-white font-medium text-sm">
                {initials}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  status === "Active"
                    ? "bg-green-500"
                    : status === "Inactive"
                      ? "bg-gray-400"
                      : "bg-red-500"
                }`}
              />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">{name}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Role",
      accessor: "role",
      sortable: true,
      render: (row) => {
        const role = getRole(row);
        const roleConfig = {
          Admin: { color: "bg-purple-100 text-purple-700", icon: Shield },
          User: { color: "bg-blue-100 text-blue-700", icon: UserCog },
          Moderator: { color: "bg-green-100 text-green-700", icon: Shield },
        };
        const config = roleConfig[role] || roleConfig.User;
        const Icon = config.icon;
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color}`}
          >
            <Icon size={12} /> {role}
          </span>
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      sortable: true,
      render: (row) => {
        const status = getStatus(row);
        const statusConfig = {
          Active: { color: "bg-green-100 text-green-700", icon: CheckCircle },
          Inactive: { color: "bg-gray-100 text-gray-700", icon: XCircle },
          Suspended: { color: "bg-red-100 text-red-700", icon: Ban },
        };
        const config = statusConfig[status] || statusConfig.Inactive;
        const Icon = config.icon;
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.color}`}
          >
            <Icon size={12} /> {status}
          </span>
        );
      },
    },
    {
      header: "Joined",
      accessor: "createdAt",
      sortable: true,
      render: (row) => {
        const date = getJoinDate(row);
        return (
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gray-400" />
            <span className="text-sm text-gray-600">
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
    {
      header: "Orders",
      accessor: "orders",
      sortable: true,
      render: (row) => (
        <span className="text-sm font-medium text-gray-900">
          {getOrders(row)}
        </span>
      ),
    },
    {
      header: "Total Spent",
      accessor: "totalSpent",
      sortable: true,
      render: (row) => (
        <span className="text-sm font-semibold text-gray-900">
          ₹{getTotalSpent(row).toLocaleString("en-IN")}
        </span>
      ),
    },
  ];

  const actions = () => (
    <div className="flex items-center gap-1">
      <button
        className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
        title="View"
      >
        <Eye size={15} className="text-gray-600 group-hover:text-blue-600" />
      </button>
      <button
        className="p-2 hover:bg-green-50 rounded-lg transition-colors group"
        title="Edit"
      >
        <Edit size={15} className="text-gray-600 group-hover:text-green-600" />
      </button>
      <button
        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
        title="Delete"
      >
        <Trash2 size={15} className="text-gray-600 group-hover:text-red-600" />
      </button>
      <button
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="More"
      >
        <MoreHorizontal size={15} className="text-gray-600" />
      </button>
    </div>
  );

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (isLoading && usersArray.length === 0) {
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
            <div key={i} className="flex gap-4 mb-5">
              <div className="w-10 h-10 bg-gray-100 rounded-xl animate-pulse flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded animate-pulse w-32" />
                <div className="h-3 bg-gray-100 rounded animate-pulse w-48" />
              </div>
              <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
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
            Failed to load users
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {message || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={() => dispatch(getAllUsers())}
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
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <h1 className="text-3xl font-light text-gray-900 mb-1">
            Users <span className="font-medium">Management</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Manage all users, their roles, and permissions.
          </p>
        </div>
        <button
          onClick={() => dispatch(getAllUsers())}
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
              Total Users
            </span>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCog size={15} className="text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{totalUsers}</p>
          <p className="text-xs text-gray-400 mt-2">All registered</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Active Users
            </span>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle size={15} className="text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{activeCount}</p>
          <p className="text-xs text-gray-500 mt-2">
            {totalUsers > 0
              ? `${((activeCount / totalUsers) * 100).toFixed(1)}% of total`
              : "—"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">
              Administrators
            </span>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield size={15} className="text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{adminCount}</p>
          <p className="text-xs text-gray-500 mt-2">With full access</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">New Users</span>
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <UserPlus size={15} className="text-orange-600" />
            </div>
          </div>
          <p className="text-3xl font-light text-gray-900">{newCount}</p>
          <p className="text-xs text-orange-500 mt-2">Last 30 days</p>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Toolbar */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-gray-900">All Users</h2>
              <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                {filteredUsers.length}{" "}
                {filteredUsers.length === 1 ? "user" : "users"}
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
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent w-full sm:w-64"
                />
              </div>

              {/* Role filter */}
              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="pl-4 pr-9 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 appearance-none cursor-pointer w-full"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
                <ChevronDown
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {(searchTerm || roleFilter !== "all" || statusFilter !== "all") && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
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
              {roleFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 rounded-lg text-xs">
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
        </div>

        {/* Empty state */}
        {!isLoading && filteredUsers.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <UserCog size={20} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm font-medium">No users found</p>
            <p className="text-gray-400 text-xs mt-1">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your filters."
                : "Registered users will appear here."}
            </p>
          </div>
        ) : (
          <Table
            columns={columns}
            data={filteredUsers}
            actions={actions}
            selectable={true}
            onSort={(key, direction) => console.log(key, direction)}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
