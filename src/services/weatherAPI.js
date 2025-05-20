const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export const fetchPollenData = async (lat, lon) => {
    // Simulating pollen data - in real case, use an external API for actual pollen info
    return {
      pollen_level: "medium",
      types: ["tree", "grass", "weed"],
      message: "এলাকায় গাছ ও ঘাসের পরাগমাত্রা মাঝারি। অ্যালার্জি আছে এমনদের সাবধান হওয়া উচিত।"
    };
  };



export const fetchSeaWeather = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=bn`
  );
  if (!response.ok) {
    throw new Error('Sea weather data not available');
  }
  return response.json();
};


export const fetchWeatherData = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=bn`
  )
  if (!response.ok) {
    throw new Error('Weather data not available')
  }
  return response.json()
}

export const fetchForecast = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=bn&cnt=40`
  )
  if (!response.ok) {
    throw new Error('Forecast data not available')
  }
  return response.json()
}

export const fetchHourlyForecast = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=bn`
  )
  if (!response.ok) {
    throw new Error('Hourly forecast data not available')
  }
  return response.json()
}

export const fetchAirQuality = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Air quality data not available')
  }
  return response.json()
}

export const fetchUVIndex = async (lat, lon) => {
  const response = await fetch(
    `${BASE_URL}/uvi/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&cnt=1`
  )
  if (!response.ok) {
    throw new Error('UV index data not available')
  }
  return response.json()
}

export const fetchLocationSuggestions = async (query) => {
  const response = await fetch(
    `${BASE_URL}/find?q=${query}&type=like&sort=population&cnt=5&appid=${API_KEY}`
  )
  if (!response.ok) {
    throw new Error('Location suggestions not available')
  }
  const data = await response.json()
  return data.list.map(item => ({
    name: item.name,
    lat: item.coord.lat,
    lon: item.coord.lon,
    country: item.sys.country,
    state: item.state,
    id: `${item.coord.lat},${item.coord.lon}`
  }))
}