import { Link } from "react-router";

const CourseCard = ({ course }) => {
  return (
    <Link to={`/courses/${course._id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all">
        <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">
          {course.description}
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-amber-600 font-medium">
            ⭐ {course.averageRating.toFixed(1)} / 5
          </span>
          <span className="text-gray-500 text-sm">
            {course.totalFeedbacks} reviews
          </span>
        </div>
      </div>
    </Link>
  );
};

export { CourseCard };
