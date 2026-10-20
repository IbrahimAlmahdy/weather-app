import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchCity from "./components/SearchCity";
import type { CityData } from "./types/CityData";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [cities, setCities] = useState<CityData[]>([]);

  const handleAddCity = (city: CityData) => {
    setCities((prev) => [...prev, city]);
  };

  const touchCities = () => {
    let updatedCities = [...cities];
    updatedCities = updatedCities.map((city) => ({
      ...city,
      updatedAt: new Date(),
    }));
    setCities(updatedCities);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      touchCities();
    }, 1000); // Update every 1 second

    return () => clearInterval(interval);
  }, [cities]);

  return (
    <div className="flex flex-col gap-4 px-8 py-6">
      <Header />
      <SearchCity handleAddCity={handleAddCity} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cities.map((city) => (
          <WeatherCard key={city.id} city={city} />
        ))}
      </div>
    </div>
  );
}

export default App;
