'use client';

export default function Error({ error, reset }) {
  console.error("Global error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Oops! Something went wrong
        </h1>

        <p className="text-gray-600">
          Something unexpected happened. Please try again.
        </p>

        <div className="flex justify-center gap-3 pt-2">
          {/* soft retry */}
          <button
            onClick={reset}
            className="cursor-pointer px-5 py-2 bg-black text-white rounded-md hover:opacity-90"
          >
            Try again
          </button>

          {/* hard refresh */}
          <button
            onClick={() => window.location.reload()}
            className="cursor-pointer px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Refresh page
          </button>
        </div>

        <p className="text-xs text-gray-400">
          If the problem continues, refreshing the page may help.
        </p>
      </div>
    </div>
  );
}
