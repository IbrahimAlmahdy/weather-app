import { useState } from "react";
import type { CityData, CityDataAPIResponse } from "../types/CityData";

type Props = {
  handleAddCity: (city: CityData) => void;
};

function SearchCity({ handleAddCity }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityData[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (e.target.value.length < 3) {
      setResults([]);
      return;
    }

    const fetchCities = async () => {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${newQuery}`,
      );
      const data: CityDataAPIResponse = await response.json();
      setResults(data.results ?? []);
    };
    fetchCities();
  };

  const handleAddCityClick = (city: CityData) => {
    handleAddCity(city);
    setQuery("");
    setResults([]);
  };

  return (
    <div>
      <input
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded-md"
        type="text"
        placeholder="Search for a city..."
      />
      {results.length > 0 && (
        <div className="flex flex-col gap-2 border border-gray-300 rounded-md p-2">
          {results.map((result) => (
            <div
              onClick={() => handleAddCityClick(result)}
              className="hover:bg-gray-100 cursor-pointer p-1 rounded-md"
              key={result.id}
            >
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchCity;
