import { useEffect, useState } from "react";
import type { CityData } from "../types/CityData";
import type { WeatherDataAPIResponse } from "../types/WeatherData";
import { getWeatherCodeDescription } from "../utils/getWeatherCodeDescription";
import { getWeatherCodeIcon } from "../utils/getWeatherCodeIcon";

type Props = {
  city: CityData;
  handleRemoveCity: (cityId: number) => void;
};

function WeatherCard({ city, handleRemoveCity }: Props) {
  const [weather, setWeather] = useState<WeatherDataAPIResponse | null>(null);
  const [weatherError, setWeatherError] = useState("");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const { latitude, longitude } = city;

  useEffect(() => {
    const controller = new AbortController();
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(
            `Weather request failed with status ${response.status}`,
          );
        }

        const data: WeatherDataAPIResponse = await response.json();
        if (!controller.signal.aborted) {
          setWeather(data);
          setWeatherError("");
          setLastUpdated(new Date());
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        if (!controller.signal.aborted) {
          setWeather(null);
          setWeatherError("Unable to load weather data.");
        }
      }
    };

    fetchWeather();
    return () => controller.abort();
  }, [city.updatedAt, latitude, longitude]);
  return (
    <article className="flex h-full flex-col gap-5 rounded-xl border border-[#294158] bg-[#111e30] p-5 text-slate-200 shadow-lg shadow-slate-950/10">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-white">{city.name}</h2>
          <p className="mt-1 text-sm text-slate-400">{city.country}</p>
        </div>
        <button
          type="button"
          onClick={() => handleRemoveCity(city.id)}
          className="shrink-0 rounded-lg border border-[#294158] bg-[#172940] px-2.5 py-2 text-sm text-slate-400 transition-colors hover:border-red-400/50 hover:bg-red-400/10 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-sky-400/60"
          aria-label={`Remove ${city.name}`}
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="m5 5 10 10M15 5 5 15" />
          </svg>
        </button>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <p className="text-5xl font-bold tracking-tight text-white">
            {weather ? Math.round(weather.current.temperature_2m) : "--"}
            {weather?.current_units.temperature_2m ?? ""}
          </p>
          <span
            className="text-5xl leading-none"
            aria-label={
              weather
                ? getWeatherCodeDescription(weather.current.weather_code)
                : "Weather loading"
            }
          >
            {weather
              ? getWeatherCodeIcon(weather.current.weather_code)
              : "🌡️"}
          </span>
        </div>
        <p
          className="mt-2 text-sm text-slate-400"
          role={weatherError ? "alert" : undefined}
        >
          {weatherError ||
            (weather
              ? getWeatherCodeDescription(weather.current.weather_code)
              : "Loading weather...")}
        </p>
      </div>

      <div className="border-t border-[#294158] pt-4">
        <p className="flex items-center gap-2 text-sm text-slate-400">
          <span className="text-base" aria-hidden="true">
            💨
          </span>
          Wind: {weather ? weather.current.wind_speed_10m : "--"}{" "}
          {weather?.current_units.wind_speed_10m ?? ""}
        </p>
      </div>
      <p className="mt-auto text-xs text-slate-500">
        Last updated: {lastUpdated ? lastUpdated.toLocaleString() : "--"}
      </p>
    </article>
  );
}

export default WeatherCard;
