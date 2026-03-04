// pages/Login.jsx
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetAuthState } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoginLoading, isLoginSuccess, isLoginError, loginMessage } =
    useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Sending OTP to your email...");

    try {
      await dispatch(loginUser({ email })).unwrap();
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.dismiss(loadingToast);
    }
  };

  // Handle login success (OTP sent)
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("OTP sent successfully! Please check your email.", {
        icon: "📧",
        duration: 5000,
      });

      // Navigate to OTP verification page
      setTimeout(() => {
        navigate("/verify-login-otp", {
          state: { email: email },
        });
      }, 1500);
    }
  }, [isLoginSuccess, navigate, email]);

  // Handle login error
  useEffect(() => {
    if (isLoginError && loginMessage) {
      toast.error(loginMessage || "Failed to send OTP. Please try again.", {
        duration: 5000,
      });
    }
  }, [isLoginError, loginMessage]);

  // Clean up auth state on unmount
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <p className="text-sm text-gray-500 text-center">
              We'll send a 6-digit OTP to your email for verification
            </p>

            <button
              type="submit"
              disabled={isLoginLoading}
              className="w-full rounded-md py-2 bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
            >
              {isLoginLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-black font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-black">
            Return to store
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
