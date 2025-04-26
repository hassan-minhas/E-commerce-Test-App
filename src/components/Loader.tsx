export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <span className="relative flex h-16 w-16 mb-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <svg className="animate-spin h-16 w-16 text-blue-600 relative" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
      </span>
      <span className="text-blue-700 font-semibold text-lg animate-pulse">Loading...</span>
    </div>
  );
}