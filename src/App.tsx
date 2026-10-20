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

  const handleRemoveCity = (cityId: number) => {
    setCities((prev) => prev.filter((city) => city.id !== cityId));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCities((currentCities) => {
        if (currentCities.length === 0) {
          return currentCities;
        }

        return currentCities.map((city) => ({
          ...city,
          updatedAt: new Date(),
        }));
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#061522] px-4 py-6 sm:px-8 sm:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header />
        <SearchCity handleAddCity={handleAddCity} />
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cities.map((city) => (
            <WeatherCard
              key={city.id}
              city={city}
              handleRemoveCity={handleRemoveCity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
