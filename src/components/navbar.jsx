import { Link, useNavigate } from "react-router";
import { useAppContext } from "../contexts/appContext";
import { axiosInstance } from "../axios/axiosInstance";
import { ErrorToast } from "../utils/toastHelper";

const Navbar = () => {
  const { user = {} } = useAppContext();
  const navigate = useNavigate();

  const { isAuthenticated } = user;

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout");
      ErrorToast("Logout Successfull !!");
      window.location.reload();
    } catch (err) {
      ErrorToast(err.message);
    }
  };

  const handleOpenProfilePage = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-white text-2xl font-bold"
        >
          <div className="bg-gradient-to-r from-amber-300 to-amber-400 p-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l-9 5m9-5v6"
              />
            </svg>
          </div>
          <span className="hidden md:inline-block">CourseFeedback</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-white hover:text-amber-300 transition-colors duration-300 font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </Link>
          <Link
            to=""
            className="text-white hover:text-amber-300 transition-colors duration-300 font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Courses
          </Link>
          <Link
            to="/"
            className="text-white hover:text-amber-300 transition-colors duration-300 font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            Feedback
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-white border border-white/50 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-amber-400 text-indigo-900 rounded-lg hover:bg-amber-300 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 font-medium flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
              <div
                onClick={handleOpenProfilePage}
                className="h-10 w-10 rounded-full bg-gradient-to-r from-amber-300 to-amber-400 text-indigo-900 text-xl flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 font-bold"
              >
                {user?.email?.substr(0, 1)?.toUpperCase()}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
