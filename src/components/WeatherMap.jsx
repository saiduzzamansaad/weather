import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const WeatherMap = ({ lat, lon, zoom = 8 }) => {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map if not already initialized
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([lat, lon], zoom)
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance.current)

      // Add weather tile layer (example - you might need to use a different weather map provider)
      L.tileLayer('https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={apiKey}', {
        apiKey: import.meta.env.VITE_WEATHER_API_KEY,
        opacity: 0.7
      }).addTo(mapInstance.current)

      // Add marker
      L.marker([lat, lon]).addTo(mapInstance.current)
        .bindPopup('বর্তমান অবস্থান')
        .openPopup()
    } else {
      // Update map view if coordinates change
      mapInstance.current.setView([lat, lon], zoom)
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [lat, lon, zoom])

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-64 md:h-96"
        aria-label="আবহাওয়া মানচিত্র"
      />
    </div>
  )
}

export default WeatherMap