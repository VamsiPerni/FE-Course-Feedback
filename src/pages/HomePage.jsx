import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import { axiosInstance } from "../axios/axiosInstance";
import { CourseCard } from "../components/CourseCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ErrorToast } from "../utils/toastHelper";

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    try {
      setLoading(true);
      const resp = await axiosInstance.get("/courses");
      setCourses(resp.data.data.courses);
    } catch (err) {
      ErrorToast(`${err.response?.data?.message || err.message}`);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 py-8 bg-gray-50">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">All Courses</h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill()
              .map((_, i) => (
                <Skeleton key={i} height={120} />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { HomePage };
