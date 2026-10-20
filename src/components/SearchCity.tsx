import { useEffect, useRef, useState } from "react";
import type { CityData, CityDataAPIResponse } from "../types/CityData";

type Props = {
  handleAddCity: (city: CityData) => void;
};

function SearchCity({ handleAddCity }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityData[]>([]);
  const [searchError, setSearchError] = useState("");
  const searchController = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => searchController.current?.abort();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    searchController.current?.abort();
    setSearchError("");

    if (e.target.value.length < 3) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    searchController.current = controller;
    const params = new URLSearchParams({ name: newQuery });

    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`City search failed with status ${response.status}`);
        }

        const data: CityDataAPIResponse = await response.json();
        if (!controller.signal.aborted) {
          setResults(data.results ?? []);
        }
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        if (!controller.signal.aborted) {
          setResults([]);
          setSearchError("Unable to search for cities. Please try again.");
        }
      }
    };
    fetchCities();
  };

  const handleAddCityClick = (city: CityData) => {
    handleAddCity({
      ...city,
      updatedAt: new Date(),
    });
    setQuery("");
    setResults([]);
    setSearchError("");
    searchController.current?.abort();
  };

  return (
    <div className="relative w-full">
      <input
        value={query}
        onChange={handleSearch}
        className="w-full rounded-lg border border-[#294158] bg-[#111e30] px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
        type="text"
        placeholder="Search for a city..."
        aria-label="Search for a city"
        aria-expanded={results.length > 0}
      />
      {searchError && (
        <p className="mt-2 text-sm text-red-300" role="alert">
          {searchError}
        </p>
      )}
      {results.length > 0 && (
        <div
          className="absolute z-10 mt-2 flex max-h-72 w-full flex-col gap-1 overflow-y-auto rounded-lg border border-[#294158] bg-[#111e30] p-2 shadow-xl shadow-slate-950/30"
          role="listbox"
          aria-label="City suggestions"
        >
          {results.map((result) => (
            <button
              type="button"
              onClick={() => handleAddCityClick(result)}
              className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-200 transition-colors hover:bg-[#1b334d] focus:bg-[#1b334d] focus:outline-none"
              key={result.id}
              role="option"
            >
              <span className="flex items-center gap-2 font-medium text-white">
                <svg
                  className="h-4 w-4 shrink-0 text-sky-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18s6-5.07 6-10A6 6 0 0 0 4 8c0 4.93 6 10 6 10Zm0-7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{result.name}</span>
              </span>
              {(result.admin1 || result.country) && (
                <span className="mt-0.5 block text-xs text-slate-400">
                  {[result.admin1, result.country].filter(Boolean).join(", ")}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchCity;
