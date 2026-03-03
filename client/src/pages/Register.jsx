import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-600">Join DEERIO today</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
            </div>
            <Input
              label="Email Address"
              type="email"
              placeholder="john@example.com"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Create a password"
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm your password"
            />

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-1 rounded" />
              <span className="text-sm text-gray-600">
                I agree to the{" "}
                <Link to="#" className="text-black hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="#" className="text-black hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button variant="primary" size="lg" className="w-full">
              Create Account
            </Button>
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
