# Weather Dashboard

A responsive weather dashboard for searching cities and viewing current weather conditions in a clean, modern dark-themed interface.

## Features

- Search for cities with region and country suggestions.
- View current temperature and weather conditions.
- Display weather icons and descriptions.
- Show current wind speed and units.
- Automatically refresh weather data every 15 seconds.
- Add and remove cities from the dashboard.
- Receive success notifications when cities are added or removed.
- Persist saved cities in `localStorage`.
- Restore saved cities after a page refresh.
- Display a helpful empty state when no cities are saved.

## Technologies

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Open-Meteo API](https://open-meteo.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd <project-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL shown in your terminal.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Type-check and create a production build
npm run lint     # Run ESLint
npm run preview  # Preview the production build locally
```

## Weather Data

The application uses the [Open-Meteo Forecast API](https://open-meteo.com/en/docs) to retrieve current weather data and the [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) to search for cities.

Weather information is requested using each selected city's coordinates. The dashboard displays temperature, weather conditions, and wind speed with the corresponding units returned by the API. No API key is required for the APIs used by this project.

## Data Persistence

Saved cities are stored in the browser's `localStorage`, so they remain available after refreshing the page in the same browser and origin. Weather responses themselves are fetched from the API and are not stored in `localStorage`.
