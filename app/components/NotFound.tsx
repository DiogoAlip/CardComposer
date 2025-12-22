import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-500 tracking-widest">
          404
        </h1>
        <div className="bg-indigo-600 px-2  text-sm rounded rotate-12 absolute">
          Page Not Found 
        </div>
        <div className="mt-16">
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
