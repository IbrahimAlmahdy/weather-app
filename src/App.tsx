import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchCity from "./components/SearchCity";
import type { CityData } from "./types/CityData";
import WeatherCard from "./components/WeatherCard";

const CITIES_STORAGE_KEY = "weather-dashboard-cities";

type StoredCity = Omit<CityData, "updatedAt"> & { updatedAt: string };
type Toast = {
  id: number;
  message: string;
};

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
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (message: string) => {
    setToast({ id: Date.now(), message });
  };

  const handleAddCity = (city: CityData) => {
    if (cities.some((savedCity) => savedCity.id === city.id)) {
      return;
    }

    setCities((prev) => {
      return [...prev, city];
    });
    showToast(`${city.name} added successfully`);
  };

  const handleRemoveCity = (cityId: number) => {
    const city = cities.find((savedCity) => savedCity.id === cityId);
    if (!city) {
      return;
    }

    setCities((prev) => prev.filter((savedCity) => savedCity.id !== cityId));
    showToast(`${city.name} removed successfully`);
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

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = setTimeout(() => {
      setToast(null);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="min-h-screen bg-[#061522] px-4 py-6 sm:px-8 sm:py-8">
      {toast && (
        <div
          className="fixed right-4 top-4 z-50 flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-lg border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-200 shadow-xl shadow-slate-950/30 sm:right-6 sm:top-6"
          role="status"
          aria-live="polite"
          key={toast.id}
        >
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xs font-bold text-[#061522]"
            aria-hidden="true"
          >
            ✓
          </span>
          <span className="truncate">{toast.message}</span>
        </div>
      )}
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <Header />
        <SearchCity handleAddCity={handleAddCity} />
        {cities.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-[#294158] bg-[#111e30]/60 px-6 py-12 text-center">
            <span className="text-5xl" aria-hidden="true">
              🌤️
            </span>
            <p className="mt-4 max-w-md text-sm text-slate-400 sm:text-base">
              No cities added yet. Search and add cities to see their weather!
            </p>
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cities.map((city) => (
              <WeatherCard
                key={city.id}
                city={city}
                handleRemoveCity={handleRemoveCity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
