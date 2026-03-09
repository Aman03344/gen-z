import { Link, useLocation } from "react-router-dom";
import {
  ShoppingBag,
  User,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../features/auth/authSlice";
import DicountMarque from "./DicountMarque";
import toast from "react-hot-toast";
import { getCart } from "../features/cart/cartSlice";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const dropRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.isAdmin === true;
  const cartCount = cart?.count || 0;

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserDropOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setUserDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    dispatch(logOutUser());
    toast.success("Logged out successfully");
    setUserDropOpen(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const isActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .nav-root {
          position: sticky; top: 0; z-index: 100;
          background: rgba(250,250,248,0.94);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        .nav-root.scrolled {
          border-bottom-color: #EDEAE5;
          box-shadow: 0 2px 24px rgba(28,28,26,0.07);
        }

        .nav-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 0 20px; height: 60px;
          display: flex; align-items: center;
          justify-content: space-between; gap: 16px;
        }

        .nav-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 21px; font-weight: 400;
          letter-spacing: 0.18em; color: #1C1C1A;
          text-decoration: none; flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .nav-logo:hover { opacity: 0.6; }

        /* Desktop links — hidden below 768px */
        .nav-links {
          display: none;
          align-items: center; gap: 28px;
        }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 400;
          letter-spacing: 0.04em; color: #6B6860;
          text-decoration: none; padding: 4px 0;
          position: relative; white-space: nowrap;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: ''; position: absolute;
          bottom: -1px; left: 0;
          width: 0; height: 1px; background: #1C1C1A;
          transition: width 0.22s ease;
        }
        .nav-link:hover { color: #1C1C1A; }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #1C1C1A; font-weight: 500; }

        /* Desktop actions — hidden below 768px */
        .nav-actions {
          display: none;
          align-items: center; gap: 8px; flex-shrink: 0;
        }

        /* Show desktop elements at 768px+ */
        @media (min-width: 768px) {
          .nav-links  { display: flex; }
          .nav-actions { display: flex; }
          .nav-mobile-right { display: none !important; }
        }

        /* Mobile right — visible below 768px */
        .nav-mobile-right {
          display: flex;
          align-items: center; gap: 6px; flex-shrink: 0;
        }

        /* Shared icon button */
        .nav-icon-btn {
          position: relative; width: 38px; height: 38px;
          border-radius: 10px; border: 1px solid transparent;
          display: flex; align-items: center; justify-content: center;
          color: #6B6860; cursor: pointer; text-decoration: none;
          background: transparent;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
        }
        .nav-icon-btn:hover { background: #fff; border-color: #EDEAE5; color: #1C1C1A; }

        .cart-badge {
          position: absolute; top: 4px; right: 4px;
          min-width: 16px; height: 16px;
          background: #1C1C1A; color: #fff;
          border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px; font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          padding: 0 3px; pointer-events: none;
          border: 1.5px solid rgba(250,250,248,0.95);
        }

        .hamburger {
          width: 38px; height: 38px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 10px; border: 1px solid #EDEAE5;
          background: transparent; cursor: pointer; color: #1C1C1A;
          transition: background 0.18s; flex-shrink: 0;
        }
        .hamburger:hover { background: #F5F3EF; }

        /* User dropdown trigger */
        .user-trigger {
          display: flex; align-items: center; gap: 7px;
          padding: 5px 10px 5px 5px;
          background: transparent; border: 1px solid #EDEAE5;
          border-radius: 100px; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500; color: #1C1C1A;
          white-space: nowrap;
          transition: background 0.18s, border-color 0.18s;
        }
        .user-trigger:hover { background: #fff; border-color: #C5C3BE; }

        .user-avatar {
          width: 26px; height: 26px; border-radius: 50%;
          background: #1C1C1A; color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px; font-weight: 600;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; text-transform: uppercase;
        }

        /* Dropdown */
        .drop-wrap { position: relative; }
        .user-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #fff; border: 1px solid #EDEAE5;
          border-radius: 16px; padding: 6px; min-width: 210px;
          box-shadow: 0 16px 48px rgba(28,28,26,0.13), 0 2px 8px rgba(28,28,26,0.05);
          animation: dropIn 0.18s cubic-bezier(0.25,0.46,0.45,0.94) both;
          z-index: 200;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .drop-header {
          padding: 10px 12px 12px;
          border-bottom: 1px solid #F5F3EF; margin-bottom: 4px;
        }
        .drop-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 400; color: #1C1C1A;
          text-decoration: none; cursor: pointer;
          border: none; background: transparent;
          width: 100%; text-align: left;
          transition: background 0.13s;
        }
        .drop-item:hover { background: #F5F3EF; }
        .drop-item.danger { color: #DC2626; }
        .drop-item.danger:hover { background: #FEF2F2; }
        .drop-divider { height: 1px; background: #EDEAE5; margin: 4px 0; }

        /* Admin button */
        .admin-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 14px; background: #1C1C1A; color: #fff;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          text-decoration: none; white-space: nowrap;
          transition: background 0.18s;
        }
        .admin-btn:hover { background: #2D2D2A; }

        /* Auth buttons */
        .btn-login {
          padding: 8px 16px; background: transparent;
          border: 1px solid #EDEAE5; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500; color: #6B6860;
          text-decoration: none; white-space: nowrap;
          transition: border-color 0.18s, color 0.18s;
        }
        .btn-login:hover { border-color: #1C1C1A; color: #1C1C1A; }
        .btn-register {
          padding: 8px 16px; background: #1C1C1A;
          border: 1px solid #1C1C1A; border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500; color: #fff;
          text-decoration: none; white-space: nowrap;
          transition: background 0.18s;
        }
        .btn-register:hover { background: #2D2D2A; }

        .chevron { transition: transform 0.2s; color: #AAA8A3; flex-shrink: 0; }
        .chevron.open { transform: rotate(180deg); }
        .badge-count {
          margin-left: auto; background: #1C1C1A; color: #fff;
          border-radius: 100px; padding: 1px 7px;
          font-size: 10px; font-family: 'DM Sans', sans-serif; font-weight: 600; flex-shrink: 0;
        }

        /* ── Mobile drawer ── */
        .mobile-drawer {
          position: fixed; inset: 0; z-index: 200; display: flex;
        }
        .mobile-backdrop {
          position: absolute; inset: 0;
          background: rgba(28,28,26,0.45); backdrop-filter: blur(4px);
          animation: bfadeIn 0.22s ease;
        }
        @keyframes bfadeIn { from { opacity: 0; } to { opacity: 1; } }

        .mobile-panel {
          position: relative; margin-left: auto;
          width: 300px; max-width: 88vw; height: 100%;
          background: #FAFAF8;
          display: flex; flex-direction: column; overflow-y: auto;
          animation: bslideIn 0.28s cubic-bezier(0.25,0.46,0.45,0.94);
        }
        @keyframes bslideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }

        .mpanel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px 16px;
          border-bottom: 1px solid #EDEAE5; flex-shrink: 0;
        }

        .mpanel-user {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 20px;
          background: #fff; border-bottom: 1px solid #EDEAE5;
        }
        .mpanel-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          background: #1C1C1A; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
          flex-shrink: 0; text-transform: uppercase;
        }

        .mobile-link {
          display: flex; align-items: center;
          padding: 13px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px; font-weight: 400; color: #6B6860;
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
        }
        .mobile-link:hover { color: #1C1C1A; background: #F5F3EF; }
        .mobile-link.active { color: #1C1C1A; font-weight: 500; background: #F5F3EF; }

        .mobile-action {
          display: flex; align-items: center; gap: 12px;
          padding: 13px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px; font-weight: 400; color: #6B6860;
          text-decoration: none; cursor: pointer;
          background: transparent; border: none; width: 100%; text-align: left;
          transition: color 0.15s, background 0.15s;
        }
        .mobile-action:hover { color: #1C1C1A; background: #F5F3EF; }
        .mobile-action.danger { color: #DC2626; }
        .mobile-action.danger:hover { background: #FEF2F2; color: #B91C1C; }
        .mobile-divider { height: 1px; background: #EDEAE5; margin: 6px 0; flex-shrink: 0; }

        .mobile-auth {
          padding: 16px 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .mbtn-login {
          display: flex; align-items: center; justify-content: center; padding: 13px;
          background: transparent; border: 1.5px solid #EDEAE5; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          color: #1C1C1A; text-decoration: none; transition: border-color 0.18s;
        }
        .mbtn-login:hover { border-color: #1C1C1A; }
        .mbtn-register {
          display: flex; align-items: center; justify-content: center; padding: 13px;
          background: #1C1C1A; border: 1.5px solid #1C1C1A; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
          color: #fff; text-decoration: none; transition: background 0.18s;
        }
        .mbtn-register:hover { background: #2D2D2A; }
      `}</style>

      <nav className={`nav-root${scrolled ? " scrolled" : ""}`}>
        <DicountMarque />

        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            AARUNYA
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`nav-link${isActive(to) ? " active" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="nav-actions">
            {isAuthenticated && (
              <Link to="/mycart" className="nav-icon-btn" title="Cart">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="cart-badge">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated && isAdmin && (
              <>
                <Link to="/admin" className="admin-btn">
                  <LayoutDashboard size={14} /> Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="nav-icon-btn"
                  title="Sign out"
                  style={{ color: "#DC2626" }}
                >
                  <LogOut size={16} />
                </button>
              </>
            )}

            {isAuthenticated && !isAdmin && (
              <div className="drop-wrap" ref={dropRef}>
                <button
                  className="user-trigger"
                  onClick={() => setUserDropOpen((o) => !o)}
                >
                  <div className="user-avatar">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <span
                    style={{
                      maxWidth: 72,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.name?.split(" ")[0]}
                  </span>
                  <ChevronDown
                    size={13}
                    className={`chevron${userDropOpen ? " open" : ""}`}
                  />
                </button>

                {userDropOpen && (
                  <div className="user-dropdown">
                    <div className="drop-header">
                      <p
                        style={{
                          fontFamily: "DM Sans,sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#1C1C1A",
                          margin: 0,
                        }}
                      >
                        {user?.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "DM Sans,sans-serif",
                          fontSize: 11,
                          color: "#AAA8A3",
                          marginTop: 3,
                        }}
                      >
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      to="/profile"
                      className="drop-item"
                      onClick={() => setUserDropOpen(false)}
                    >
                      <User
                        size={14}
                        style={{ color: "#AAA8A3", flexShrink: 0 }}
                      />{" "}
                      My Profile
                    </Link>
                    <Link
                      to="/mycart"
                      className="drop-item"
                      onClick={() => setUserDropOpen(false)}
                    >
                      <ShoppingBag
                        size={14}
                        style={{ color: "#AAA8A3", flexShrink: 0 }}
                      />
                      My Cart
                      {cartCount > 0 && (
                        <span className="badge-count">{cartCount}</span>
                      )}
                    </Link>
                    <div className="drop-divider" />
                    <button className="drop-item danger" onClick={handleLogout}>
                      <LogOut size={14} style={{ flexShrink: 0 }} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {!isAuthenticated && (
              <>
                <Link to="/login" className="btn-login">
                  Sign In
                </Link>
                <Link to="/register" className="btn-register">
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile cluster */}
          <div className="nav-mobile-right">
            {isAuthenticated && (
              <Link to="/mycart" className="nav-icon-btn" title="Cart">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="cart-badge">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              className="hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div
            className="mobile-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="mobile-panel">
            <div className="mpanel-header">
              <span
                style={{
                  fontFamily: "Cormorant Garamond,serif",
                  fontSize: 19,
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  color: "#1C1C1A",
                }}
              >
                AARUNYA
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  border: "1px solid #EDEAE5",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#6B6860",
                }}
              >
                <X size={15} />
              </button>
            </div>

            {isAuthenticated && (
              <div className="mpanel-user">
                <div className="mpanel-avatar">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "DM Sans,sans-serif",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#1C1C1A",
                      margin: 0,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "DM Sans,sans-serif",
                      fontSize: 11,
                      color: "#AAA8A3",
                      margin: "2px 0 0",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {user?.email}
                  </p>
                </div>
              </div>
            )}

            <div style={{ paddingTop: 6 }}>
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`mobile-link${isActive(to) ? " active" : ""}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="mobile-divider" />

            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="mobile-action"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: "#1C1C1A" }}
                  >
                    <LayoutDashboard
                      size={16}
                      style={{ color: "#AAA8A3", flexShrink: 0 }}
                    />{" "}
                    Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    className="mobile-action"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User
                      size={16}
                      style={{ color: "#AAA8A3", flexShrink: 0 }}
                    />{" "}
                    My Profile
                  </Link>
                )}
                <Link
                  to="/mycart"
                  className="mobile-action"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag
                    size={16}
                    style={{ color: "#AAA8A3", flexShrink: 0 }}
                  />
                  Cart
                  {cartCount > 0 && (
                    <span className="badge-count">{cartCount}</span>
                  )}
                </Link>
                <div className="mobile-divider" />
                <button className="mobile-action danger" onClick={handleLogout}>
                  <LogOut size={16} style={{ flexShrink: 0 }} /> Sign Out
                </button>
              </>
            ) : (
              <div className="mobile-auth">
                <Link
                  to="/login"
                  className="mbtn-login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="mbtn-register"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
