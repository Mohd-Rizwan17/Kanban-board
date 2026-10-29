import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <h2 className="text-2xl font-semibold text-slate-900">Page not found</h2>
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
        Back to board
      </Link>
    </div>
  );
}
