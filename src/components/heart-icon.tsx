/**
 * Inline SVG matching Font Awesome's "far fa-heart" (outline heart).
 * Replaces Unicode ♡ to match v1's visual exactly.
 */
export function HeartIcon({ className, color }: { className?: string; color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
      style={{ width: "1em", height: "1em", color }}
      aria-hidden="true"
    >
      <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43.2 285.5l175.4 178.7c10 10.2 23.4 15.9 37.4 15.9 14 0 27.4-5.8 37.4-15.9l175.4-178.7c53.8-54.7 64.8-157.9-10.4-221.2zm-22.8 188.3L260.8 431.7c-2.4 2.4-4.4 2.4-6.8 0L79.2 252.5c-38.6-39.3-46.8-115.1 7.4-161.2 40.8-34.8 98.4-28.2 136.3 10.9L256 137l32.9-34.7c37.8-39.2 95.7-45.7 136.5-10.9 54.1 46.1 45.9 121.8 7.4 161.2h-.2z" />
    </svg>
  );
}
