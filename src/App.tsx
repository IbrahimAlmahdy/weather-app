import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchCity from "./components/SearchCity";
import type { CityData } from "./types/CityData";
import WeatherCard from "./components/WeatherCard";

const CITIES_STORAGE_KEY = "weather-dashboard-cities";

type StoredCity = Omit<CityData, "updatedAt"> & { updatedAt: string };

const isStoredCity = (value: unknown): value is StoredCity => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const city = value as Record<string, unknown>;
  return (
    typeof city.id === "number" &&
    typeof city.name === "string" &&
    typeof city.latitude === "number" &&
    typeof city.longitude === "number" &&
    typeof city.elevation === "number" &&
    typeof city.feature_code === "string" &&
    typeof city.country_code === "string" &&
    typeof city.admin1_id === "number" &&
    typeof city.timezone === "string" &&
    typeof city.population === "number" &&
    typeof city.country_id === "number" &&
    typeof city.country === "string" &&
    typeof city.admin1 === "string" &&
    typeof city.updatedAt === "string" &&
    !Number.isNaN(new Date(city.updatedAt).getTime())
  );
};

const loadCities = (): CityData[] => {
  try {
    const storedValue = localStorage.getItem(CITIES_STORAGE_KEY);
    if (!storedValue) {
      return [];
    }

    const parsedValue: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    const uniqueCities = new Map<number, CityData>();
    parsedValue.filter(isStoredCity).forEach((city) => {
      uniqueCities.set(city.id, {
        ...city,
        updatedAt: new Date(city.updatedAt),
      });
    });
    return Array.from(uniqueCities.values());
  } catch (error) {
    console.error("Unable to load saved cities from LocalStorage.", error);
    return [];
  }
};

function App() {
  const [cities, setCities] = useState<CityData[]>(loadCities);

  const handleAddCity = (city: CityData) => {
    setCities((prev) => {
      if (prev.some((savedCity) => savedCity.id === city.id)) {
        return prev;
      }
      return [...prev, city];
    });
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

  useEffect(() => {
    try {
      localStorage.setItem(CITIES_STORAGE_KEY, JSON.stringify(cities));
    } catch (error) {
      console.error("Unable to save cities to LocalStorage.", error);
    }
  }, [cities]);

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
