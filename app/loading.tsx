// app/loading.tsx
// Next.js tự dùng file này khi route đang load — cải thiện FCP / CLS

export default function Loading() {
  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      aria-label="Đang tải..."
    >
      {/* ── Header skeleton ── */}
      <div className="fixed top-0 left-0 right-0 h-14 bg-white/90 border-b border-primary/10 flex items-center px-6 z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary/15 animate-pulse" />
          <div className="w-24 h-5 rounded-lg bg-primary/15 animate-pulse" />
        </div>
      </div>

      {/* ── Main skeleton ── */}
      <main className="pt-20 pb-24 px-6 max-w-[1100px] mx-auto w-full space-y-5">

        {/* Date nav skeleton */}
        <div className="flex items-center justify-center gap-8 my-5">
          <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
          <div className="w-40 h-8 rounded-xl bg-primary/15 animate-pulse" />
          <div className="w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-7 space-y-5">
            <div className="rounded-3xl bg-white/60 border border-primary/10 h-64 animate-pulse" />
            <div className="rounded-3xl bg-white/60 border border-primary/10 h-36 animate-pulse" />
          </div>
          <div className="lg:col-span-5 space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/60 border border-primary/10 h-20 animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>

      {/* ── Bottom nav skeleton ── */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 border-t border-primary/10 flex justify-around items-center px-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 rounded-md bg-primary/15 animate-pulse" />
            <div className="w-12 h-2 rounded bg-primary/10 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}