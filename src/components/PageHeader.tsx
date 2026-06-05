import Link from "next/link";

function BackArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="w-3 h-3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
    </svg>
  );
}

export function PageHeader({
  label,
  showBack = false,
  leftLabel,
  className,
}: {
  label: string;
  showBack?: boolean;
  leftLabel?: string;
  className?: string;
}) {
  return (
    <header
      className={`relative z-10 flex items-center justify-between px-5 py-5 md:px-14 md:py-7 border-b border-[#6e8840]/30 ${
        className ?? ""
      }`}
    >
      {showBack ? (
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-2 py-1 border border-[#6e8840] text-[#96b050] text-[10px] uppercase tracking-[0.2em] rounded-sm hover:bg-[#96b050]/10 transition-colors"
        >
          <BackArrow />
          Back
        </Link>
      ) : leftLabel ? (
        <span className="text-[10px] tracking-[0.3em] uppercase font-medium text-[#96b050]">
          {leftLabel}
        </span>
      ) : (
        <div />
      )}
      <div className="flex items-center gap-2">
        <span
          className="blink w-1.5 h-1.5 rounded-full inline-block"
          style={{ background: "#96b050", boxShadow: "0 0 8px #96b050" }}
        />
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#96b050]">{label}</span>
      </div>
    </header>
  );
}
