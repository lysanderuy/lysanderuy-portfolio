import { ReactNode } from "react";

export function PageShell({
  children,
  scrollable = false,
}: {
  children: ReactNode;
  scrollable?: boolean;
}) {
  return (
    <div
      className={`w-screen flex flex-col relative ${
        scrollable ? "min-h-screen" : "h-screen overflow-hidden"
      }`}
      style={{ background: "linear-gradient(160deg, #181d0c 0%, #222810 50%, #2c3515 100%)" }}
    >
      <div className="noise absolute inset-0 pointer-events-none z-0" />
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#7a8f40 1px, transparent 1px), linear-gradient(90deg, #7a8f40 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        className="absolute pointer-events-none z-0 w-[60vw] h-[60vh] top-[20%] -left-[10%]"
        style={{ background: "radial-gradient(ellipse, rgba(90,110,40,0.12) 0%, transparent 70%)" }}
      />
      {children}
    </div>
  );
}
