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

  const fetchWeather = async () => {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`,
    );
    const data: WeatherDataAPIResponse = await response.json();
    setWeather(data);
  };

  useEffect(() => {
    fetchWeather();
  }, [city.updatedAt]);
  return (
    <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-2">
      <div className="flex justify-between items-center">
        <h1>
          {city.name}, {city.country}
        </h1>
        <div
          onClick={() => handleRemoveCity(city.id)}
          className="cursor-pointer"
        >
          🗑️
        </div>
      </div>

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
      <p className="text-sm">
        Last Updated at: {city.updatedAt.toLocaleString()}
      </p>
    </div>
  );
}

export default WeatherCard;
