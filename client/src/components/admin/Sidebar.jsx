import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingBag,
  DollarSign,
  Settings,
  LogOut,
  ChevronRight,
  Store,
} from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      path: "/admin",
      icon: LayoutDashboard,
      label: "Dashboard",
      color: "from-blue-500 to-blue-600",
    },
    {
      path: "/admin/users",
      icon: Users,
      label: "Users",
      color: "from-green-500 to-green-600",
    },
    {
      path: "/admin/products",
      icon: Package,
      label: "Products",
      color: "from-purple-500 to-purple-600",
    },
    {
      path: "/admin/orders",
      icon: ShoppingBag,
      label: "Orders",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <aside
      className={`relative ${isCollapsed ? "w-20" : "w-72"} bg-gradient-to-b from-gray-900 to-gray-800 text-white min-h-screen flex flex-col transition-all duration-300 shadow-2xl`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-16 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
      >
        <ChevronRight
          size={14}
          className={`transform transition-transform ${isCollapsed ? "rotate-0" : "rotate-180"}`}
        />
      </button>

      {/* Logo Section */}
      <div className="p-6 border-b border-gray-800/50">
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Store size={18} className="text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-light tracking-tight">
              DEERIO<span className="font-bold text-blue-400">Admin</span>
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`relative flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-xl transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white shadow-lg"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <span
                      className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b ${item.color} rounded-r-full`}
                    />
                  )}

                  {/* Icon with hover effect */}
                  <div
                    className={`relative ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
                  >
                    <Icon size={isCollapsed ? 22 : 20} />
                    {isCollapsed && (
                      <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  {!isCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}

                  {/* Badge example (can be dynamic) */}
                  {item.label === "Orders" && !isCollapsed && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      12
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info (optional) */}
      {!isCollapsed && (
        <div className="px-6 py-4 border-t border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-gray-400">admin@deerio.com</p>
            </div>
          </div>
        </div>
      )}

      {/* Back to Store Link */}
      <div className="p-4 border-t border-gray-800/50">
        <Link
          to="/"
          className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-white transition-colors group`}
        >
          <LogOut size={isCollapsed ? 22 : 20} className="rotate-180" />
          {!isCollapsed && (
            <span className="text-sm font-medium">Back to Store</span>
          )}
          {isCollapsed && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Back to Store
            </span>
          )}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
