function Header() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div
          className="rounded-xl bg-[#0d2a40] p-3 text-2xl leading-none"
          aria-label="Weather"
        >
          🌦️
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Weather Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Real-time weather updates every 15 seconds
          </p>
        </div>
      </div>
      <div className="flex w-fit items-center gap-2 rounded-full bg-[#0d2a40] px-3 py-1.5 text-sm font-medium text-slate-200">
        <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
        Live
      </div>
    </header>
  );
}

export default Header;
