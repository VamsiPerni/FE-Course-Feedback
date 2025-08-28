import { useState } from "react";
import { Link } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import { HashLoader } from "react-spinners";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      if (!email || !password) {
        ErrorToast("Email & password are required!");
        return;
      }

      const dataObj = { email, password };

      const result = await axiosInstance.post("/auth/login", dataObj);

      if (result.status === 200) {
        SuccessToast(result.data.message);
        window.open("/", "_self");
      } else {
        ErrorToast(result.data.message);
      }
    } catch (err) {
      ErrorToast(
        `Cannot signup: ${err.response?.data?.message || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[100vh] flex flex-col items-center justify-center gap-10 content-center">
        <HashLoader size={120} color="#10b981" speedMultiplier={1.2} />
        <div className="border-1 border-lime-800 p-8 rounded-lg">
          <p>Verifying User Credentials</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* 🔹 LEFT: Info Section */}
        <div className="hidden md:flex flex-col justify-center bg-white rounded-xl shadow-lg border border-emerald-100 p-8">
          <h2 className="text-2xl font-bold text-emerald-800 mb-4">
            Before You Login
          </h2>
          <p className="text-gray-700 mb-3">
            Please allow{" "}
            <span className="font-semibold">third-party cookies</span>
            in your browser for a smoother login experience.
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
            <h3 className="text-emerald-700 font-semibold mb-2">
              Dummy Credentials
            </h3>
            <p className="text-sm">
              <span className="font-medium">Email:</span> mohandathu6@gmail.com
            </p>
            <p className="text-sm">
              <span className="font-medium">Password:</span> @VamsiPerni&7
            </p>
          </div>

          <p className="text-gray-600 text-sm">
            Or you can create a new account if you don’t already have one.
          </p>
        </div>

        {/* 🔹 RIGHT: Login Form */}
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-emerald-100 mx-auto">
          <h2 className="text-3xl font-bold text-center text-emerald-800">
            Welcome Back
          </h2>

          <div className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-emerald-700 mb-1"
                htmlFor="user-email"
              >
                Email
              </label>
              <input
                id="user-email"
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-emerald-700 mb-1"
                htmlFor="user-password"
              >
                Password
              </label>
              <input
                id="user-password"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            onClick={handleRegister}
            className="w-full py-2 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Login
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline transition duration-200"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { LoginPage };
