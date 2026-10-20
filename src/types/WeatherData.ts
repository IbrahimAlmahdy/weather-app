type CurrentWeather = {
  time: string;
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
};

/*
Weather Codes Mapping:
0: Clear sky
1: Mainly clear
2: Partly cloudy
3: Overcast
45: Fog
48: Depositing rime fog
51, 53, 55: Drizzle
56, 57: Freezing drizzle
61, 63, 65: Rain
66, 67: Freezing rain
71, 73, 75: Snowfall
77: Snow grains
80, 81, 82: Rain showers
85, 86: Snow showers
95: Thunderstorm
96, 99: Thunderstorm with hail
else: Unknown weather
*/

type CurrentWeatherUnits = {
  time: string;
  temperature_2m: string;
  wind_speed_10m: string;
  weather_code: string;
};

export type WeatherDataAPIResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: CurrentWeatherUnits;
  current: CurrentWeather;
};
