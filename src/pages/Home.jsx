import { useState, useEffect } from 'react'
import { useFavorites } from '../context/FavoritesContext'
import { useGeolocation } from '../hooks/useGeolocation'
import WeatherCard from '../components/WeatherCard'
import ForecastChart from '../components/ForecastChart'
import AlertBanner from '../components/AlertBanner'
import AirQuality from '../components/AirQuality'
import UVIndex from '../components/UVIndex'
import HourlyForecast from '../components/HourlyForecast'
import SunProgress from '../components/SunProgress'
import WeatherMap from '../components/WeatherMap'
import LocationSearch from '../components/LocationSearch'
import WeatherStats from '../components/WeatherStats'
import { 
  fetchWeatherData, 
  fetchForecast, 
  fetchAirQuality,
  fetchUVIndex,
  fetchHourlyForecast
} from '../services/weatherAPI'
import { convertToBengaliNumber } from '../utils/helpers'

const Home = ({ mapView }) => {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [hourlyForecast, setHourlyForecast] = useState(null)
  const [airQuality, setAirQuality] = useState(null)
  const [uvIndex, setUVIndex] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { favorites } = useFavorites()
  const { location: geoLocation, getLocation } = useGeolocation()
  const [currentLocation, setCurrentLocation] = useState({
    name: 'ঢাকা',
    lat: 23.8103,
    lon: 90.4125,
    country: 'BD'
  })

  useEffect(() => {
    const getWeatherData = async () => {
        try {
          setLoading(true)
          const [weatherData, forecastData, hourlyData, aqiData, uvData] = await Promise.all([
            fetchWeatherData(currentLocation.lat, currentLocation.lon),
            fetchForecast(currentLocation.lat, currentLocation.lon),
            fetchHourlyForecast(currentLocation.lat, currentLocation.lon),
            fetchAirQuality(currentLocation.lat, currentLocation.lon),
            fetchUVIndex(currentLocation.lat, currentLocation.lon)
          ])
          
          setWeather(weatherData)
          setForecast(forecastData)
          setHourlyForecast(hourlyData)
          setAirQuality(aqiData.list[0]?.main?.aqi || 0)
          setUVIndex(uvData.daily?.uv_index_max?.[0] || 0)  // Safe access with fallback
          setError(null)
        } catch (err) {
          setError('আবহাওয়ার তথ্য পাওয়া যায়নি। আবার চেষ্টা করুন।')
          console.error(err)
        } finally {
          setLoading(false)
        }
      }

    getWeatherData()
  }, [currentLocation])

  const handleLocationSelect = (location) => {
    setCurrentLocation({
      name: location.name,
      lat: location.lat,
      lon: location.lon,
      country: location.country,
      id: `${location.lat},${location.lon}`
    })
  }

  const handleCurrentLocation = () => {
    getLocation()
    if (geoLocation) {
      setCurrentLocation({
        name: 'বর্তমান অবস্থান',
        lat: geoLocation.lat,
        lon: geoLocation.lon,
        country: '',
        id: `${geoLocation.lat},${geoLocation.lon}`
      })
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            বাংলাদেশের আবহাওয়া
          </h1>
          <div className="w-full sm:w-96 mt-4 sm:mt-0">
            <LocationSearch 
              onSelect={handleLocationSelect} 
              currentLocation={{ 
                getLocation: handleCurrentLocation,
                name: currentLocation.name,
                lat: currentLocation.lat,
                lon: currentLocation.lon,
                country: currentLocation.country,
                id: currentLocation.id
              }}
            />
          </div>
        </div>
        
        <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {currentLocation.name}{currentLocation.country && `, ${currentLocation.country}`}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 dark:bg-red-900 dark:border-red-700 dark:text-red-100">
          <p>{error}</p>
        </div>
      )}

      

      {mapView ? (
        <div className="mb-8">
          <WeatherMap lat={currentLocation.lat} lon={currentLocation.lon} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {weather && <WeatherCard weather={weather} />}
            
            <div className="space-y-6">
              {airQuality && <AirQuality aqi={airQuality} />}
              {uvIndex && <UVIndex uvIndex={uvIndex} />}
            </div>
            
            {weather && (
              <SunProgress 
                sunrise={weather.sys.sunrise} 
                sunset={weather.sys.sunset} 
              />
            )}
          </div>

          {hourlyForecast && <HourlyForecast hourly={hourlyForecast.list} />}
          {forecast && <ForecastChart forecast={forecast} />}
          {weather && <WeatherStats weather={weather} />}
        </>
      )}
    </div>
  )
}

export default Home