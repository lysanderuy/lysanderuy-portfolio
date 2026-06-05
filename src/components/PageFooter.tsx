import { ROLE_TITLE } from "@/lib/constants";

export function PageFooter({ className }: { className?: string }) {
  return (
    <footer
      className={`relative z-10 flex flex-col sm:flex-row items-center sm:justify-between gap-1 px-5 py-4 sm:px-8 md:px-14 md:py-5 border-t border-[#6e8840]/20 ${
        className ?? ""
      }`}
    >
      <span className="text-[9px] tracking-[0.25em] uppercase text-[#526630] text-center sm:text-left">
        {ROLE_TITLE}
      </span>
      <span className="text-[9px] tracking-[0.25em] uppercase text-[#526630]">
        {new Date().getFullYear()}
      </span>
    </footer>
  );
}
