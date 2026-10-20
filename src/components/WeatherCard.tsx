import type { CityData } from "../types/CityData";

function WeatherCard({ city }: { city: CityData }) {
  return (
    <div className="border border-gray-300 rounded-md p-2">
      <h1>
        {city.name}, {city.country}
      </h1>
      <p>
        {city.latitude}, {city.longitude}
      </p>
    </div>
  );
}

export default WeatherCard;
