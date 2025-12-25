import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center space-y-6 max-w-md">
        <span className="text-9xl font-extrabold text-primary dark:text-primary tracking-widest">
          404
        </span>
        <h2 className="rounded text-2xl">
          Page Not Found 
        </h2>
        <div className="mt-16">
          <Link
            to="/"
            className="inline-block px-8 py-3 text-white font-semibold rounded-lg shadow-md bg-gradient-to-r from-[#FAD126] to-[#FF564E]"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
