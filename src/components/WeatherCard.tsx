import { useEffect, useState } from "react";
import type { CityData } from "../types/CityData";
import type { WeatherDataAPIResponse } from "../types/WeatherData";
import { getWeatherCodeDescription } from "../utils/getWeatherCodeDescription";
import { getWeatherCodeIcon } from "../utils/getWeatherCodeIcon";

function WeatherCard({ city }: { city: CityData }) {
  const [weather, setWeatherData] = useState<WeatherDataAPIResponse | null>(
    null,
  );

  useEffect(() => {
    let ignore = false;

    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data: WeatherDataAPIResponse = await response.json();

        if (!ignore) {
          setWeatherData(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Error fetching weather:", error);
        }
      }
    };

    fetchWeather();

    return () => {
      ignore = true;
    };
  }, [city.latitude, city.longitude]);

  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-2">
      <h1>
        {city.name}, {city.country}
      </h1>

      <p className="text-4xl font-bold">
        {weather ? Math.round(weather.current_weather.temperature) : "--"}
        {weather?.current_weather_units.temperature ?? ""}
      </p>

      <p className="text-sm">
        {weather
          ? getWeatherCodeDescription(weather.current_weather.weathercode)
          : "Loading weather..."}{" "}
        {weather ? getWeatherCodeIcon(weather.current_weather.weathercode) : ""}
      </p>
      <p className="text-sm border border-gray-300 rounded-md p-2">
        Wind: {weather ? weather.current_weather.windspeed : "--"}{" "}
        {weather?.current_weather_units.windspeed ?? ""}
      </p>
    </div>
  );
}

export default WeatherCard;
