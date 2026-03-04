import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetAuthState } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isRegistrationLoading,
    isRegistrationSuccess,
    isRegistrationError,
    registrationMessage,
  } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { name, email, phone } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading("Creating your account...");

    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.dismiss(loadingToast);
    } catch (error) {
      toast.dismiss(loadingToast);
    }
  };

  // Handle registration success
  useEffect(() => {
    if (isRegistrationSuccess) {
      toast.success("OTP sent successfully! Please check your email.", {
        icon: "📧",
        duration: 5000,
      });

      // Navigate to OTP verification page after successful registration
      setTimeout(() => {
        navigate("/verify-register-otp", {
          state: { email: formData.email },
        });
      }, 1500);
    }
  }, [isRegistrationSuccess, navigate, formData.email]);

  // Handle registration error
  useEffect(() => {
    if (isRegistrationError && registrationMessage) {
      toast.error(
        registrationMessage || "Registration failed. Please try again.",
        {
          duration: 5000,
        },
      );
    }
  }, [isRegistrationError, registrationMessage]);

  // Clean up auth state on unmount
  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  // Validate phone number
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  // Handle phone input to prevent non-numeric characters
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFormData({
      ...formData,
      phone: value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600">Join AARUNYA today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Optional: You can remove this div since we're using toast now */}
          {/* {isRegistrationError && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {registrationMessage}
            </div>
          )} */}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Name"
                placeholder="John Doe"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
                minLength={2}
              />
            </div>
            <Input
              label="Phone"
              type="tel"
              name="phone"
              placeholder="9876543210"
              value={phone}
              onChange={handlePhoneChange}
              required
              maxLength={10}
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit phone number"
            />
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={email}
              onChange={handleChange}
              required
            />

            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 mt-1 rounded"
                required
              />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-black hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-black hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={
                isRegistrationLoading ||
                (!validatePhone(phone) && phone.length > 0)
              }
              className="w-full rounded-md py-2 bg-black text-white hover:bg-gray-800 focus:ring-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isRegistrationLoading ? (
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
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-black font-medium hover:underline"
            >
              Sign in
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

export default Register;
