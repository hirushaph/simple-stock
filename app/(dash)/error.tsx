"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mt-4 shadow-sm bg-white p-6 text-center">
      <h2 className="text-xl font-semibold mb-2">Something went wrong!</h2>

      <button
        onClick={() => reset()}
        className="px-4 py-2 uppercase bg-red-500 text-sm text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
