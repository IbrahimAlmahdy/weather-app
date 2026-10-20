type CurrentWeather = {
  time: string;
  interval: number;
  temperature: number;
  windspeed: number;
  winddirection: number;
  is_day: number;
  weathercode: number;
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
  interval: string;
  temperature: string;
  windspeed: string;
  winddirection: string;
  is_day: string;
  weathercode: string;
};

export type WeatherDataAPIResponse = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather_units: CurrentWeatherUnits;
  current_weather: CurrentWeather;
};
