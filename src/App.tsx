import { useState } from "react";
import Header from "./components/Header";
import SearchCity from "./components/SearchCity";
import type { CityData } from "./types/CityData";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [cities, setCities] = useState<CityData[]>([]);

  const handleAddCity = (city: CityData) => {
    setCities((prev) => [...prev, city]);
  };

  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      <Header />
      <SearchCity handleAddCity={handleAddCity} />
      {cities.map((city) => (
        <WeatherCard key={city.id} city={city} />
      ))}
    </div>
  );
}

export default App;
