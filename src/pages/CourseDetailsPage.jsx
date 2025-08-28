import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosInstance } from "../axios/axiosInstance";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";
import { ErrorToast, SuccessToast } from "../utils/toastHelper";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 0,
    comment: "",
  });
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const getCourseDetails = async () => {
    try {
      setLoading(true);
      const resp = await axiosInstance.get(`/courses/${id}`);
      setCourse(resp.data.data.course);
    } catch (err) {
      ErrorToast(`${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getFeedbackStats = async () => {
    try {
      const resp = await axiosInstance.get(`/feedback/${id}/stats`);
      setStats(resp.data);
    } catch (err) {
      ErrorToast(`${err.response?.data?.message || err.message}`);
    }
  };

  const getFeedbacks = async () => {
    try {
      const resp = await axiosInstance.get(`/feedback/course/${id}`);
      const feedbackList = resp.data.data.feedbacks || [];
      setFeedbacks(feedbackList);

      // ✅ Check if current user has already submitted feedback
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const currentUser = JSON.parse(storedUser);

        const userFeedback = feedbackList.find(
          (fb) => String(fb.student?._id) === String(currentUser._id)
        );

        console.log("Current user:", currentUser._id);
        console.log(
          "Feedback list user ids:",
          feedbackList.map((f) => f.student?._id)
        );

        if (userFeedback) {
          setHasSubmitted(true);
          setFeedbackForm({
            rating: userFeedback.rating,
            comment: userFeedback.comment,
          });
        } else {
          setHasSubmitted(false); // reset if not found
        }
      }
    } catch (err) {
      ErrorToast(`${err.response?.data?.message || err.message}`);
    }
  };

  const handleRatingClick = (rating) => {
    setFeedbackForm({ ...feedbackForm, rating });
  };

  const handleCommentChange = (e) => {
    setFeedbackForm({ ...feedbackForm, comment: e.target.value });
  };

  const submitFeedback = async () => {
    if (!feedbackForm.rating) {
      ErrorToast("Please select a rating");
      return;
    }

    try {
      setSubmitting(true);
      await axiosInstance.post("/feedback", {
        courseId: id,
        rating: feedbackForm.rating,
        comment: feedbackForm.comment,
      });

      SuccessToast("Feedback submitted successfully!");

      // ✅ Immediately mark as submitted so button disappears
      setHasSubmitted(true);
      setShowFeedbackForm(false);

      // Refresh feedback data (to update analytics + comments)
      await getFeedbackStats();
      await getFeedbacks();
    } catch (err) {
      ErrorToast(`${err.response?.data?.message || err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getCourseDetails();
    getFeedbackStats();
    getFeedbacks();
  }, [id]);

  // Prepare analytics data
  const ratingData = [1, 2, 3, 4, 5].map((star) => ({
    rating: `${star}★`,
    count: stats?.ratingDistribution ? stats.ratingDistribution[star] : 0,
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 px-6 py-8 bg-gray-50">
        {loading || !course ? (
          <Skeleton height={300} />
        ) : (
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {course.title}
            </h1>
            <p className="text-gray-600 mb-6">{course.description}</p>

            {/* Course Stats */}
            <div className="flex items-center justify-between mb-8 p-4 bg-gray-100 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold text-amber-600">
                  {course.averageRating?.toFixed(1) || "0.0"}
                </p>
                <p className="text-gray-600">Average Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800">
                  {course.totalFeedbacks || 0}
                </p>
                <p className="text-gray-600">Total Feedbacks</p>
              </div>
              {!hasSubmitted && (
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Feedback
                </button>
              )}
            </div>

            {/* Feedback Form */}
            {showFeedbackForm && (
              <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">
                  Share Your Feedback
                </h2>

                {/* Star Rating */}
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">Rate this course:</p>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className={`text-2xl ${
                          feedbackForm.rating >= star
                            ? "text-yellow-500"
                            : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {feedbackForm.rating > 0
                      ? `Selected: ${feedbackForm.rating} star(s)`
                      : "Click stars to rate"}
                  </p>
                </div>

                {/* Comment */}
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="comment">
                    Your Comments (optional):
                  </label>
                  <textarea
                    id="comment"
                    value={feedbackForm.comment}
                    onChange={handleCommentChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Share your experience with this course..."
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={submitFeedback}
                    disabled={submitting || !feedbackForm.rating}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    {submitting ? "Submitting..." : "Submit Feedback"}
                  </button>
                  <button
                    onClick={() => setShowFeedbackForm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Rating Analytics */}
            {stats && (
              <>
                <h2 className="text-lg font-semibold mb-4">
                  Ratings Analytics
                </h2>
                <div className="h-64 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ratingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="rating" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </>
            )}

            {/* Feedbacks */}
            <h2 className="text-lg font-semibold mt-8 mb-4">
              Student Feedbacks
            </h2>
            {feedbacks.length === 0 ? (
              <p className="text-gray-500">No feedback yet</p>
            ) : (
              <ul className="space-y-4">
                {feedbacks.map((fb) => (
                  <li
                    key={fb._id}
                    className="border p-4 rounded-md shadow-sm bg-gray-50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-gray-800">
                        {fb.student.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-amber-600">
                        ⭐ {fb.rating} / 5
                      </p>
                    </div>
                    {fb.comment && (
                      <p className="mt-2 text-gray-700">{fb.comment}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { CourseDetailsPage };
