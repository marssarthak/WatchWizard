import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="text-6xl font-bold text-gray-800 mb-4">404</div>
        <div className="text-xl text-gray-600">Oops! Page not found</div>
        <p className="mt-4 text-gray-500">
          <i>
            {error.statusText ||
              error.message ||
              `The page you are looking for
          might have been removed or doesn't exist.`}
          </i>
        </p>
        <button
          className="mt-8 px-6 py-3 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
