export function LabMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      {/* double helix */}
      <path d="M15 3c0 9 18 10 18 19s-18 10-18 19v12" />
      <path d="M33 3c0 9-18 10-18 19s18 10 18 19v12" />
      <path d="M18 7h12M16 11h16M16 45h16M18 49h12" opacity="0.75" />

      {/* ape head */}
      <ellipse cx="24" cy="26" rx="7.5" ry="9" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="23" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="32.5" cy="23" r="3.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5 21 21" />
    </svg>
  );
}

export function UserIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
    </svg>
  );
}

export function BagIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M5 7h14l1.2 13.5H3.8L5 7Z" />
      <path d="M8.8 7V5.6a3.2 3.2 0 0 1 6.4 0V7" />
    </svg>
  );
}

export function CrosshairIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden
    >
      <path d="M12 2v20M2 12h20" />
    </svg>
  );
}
