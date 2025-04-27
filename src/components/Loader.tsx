export default function Loader() {
  return (
    <div className="flex justify-center py-12" role="status" aria-live="polite" aria-busy="true">
      <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24" aria-hidden="true">
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
      <span className="sr-only">Loading...</span>
    </div>
  );
}