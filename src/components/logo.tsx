// Placeholder logo — a red circle with a stylized "J" script mark, inspired
// by the real Jalal Sons brand color/shape but NOT a reproduction of their
// actual trademarked logo artwork (which this project has no rights to use).
// Swap in the real logo file yourself if you have rights to use it — just
// replace this component's contents with an <img src="/logo.png" /> tag.
export function Logo({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="20" fill="#cc0000" />
      <path
        d="M24 10c0 0-1 2-1 5v10c0 3-2 5-5 5s-5-2-5-5"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
