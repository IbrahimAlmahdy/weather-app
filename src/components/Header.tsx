function Header() {
  return (
    <header className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="text-2xl bg-gray-50 rounded-sm p-2">🌦️</div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Weather App Dashboard
          </h1>
          <h3 className="text-sm text-gray-500">
            Real-time weather updates every 15 seconds
          </h3>
        </div>
      </div>
      <div className=" bg-gray-50 rounded-full px-2 py-1">🔴 Live</div>
    </header>
  );
}

export default Header;
