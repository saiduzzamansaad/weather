import { useState } from 'react'
import { FavoritesProvider } from './context/FavoritesContext'
import Home from './pages/Home'
import SeaForecast from './pages/SeaForecast'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [mapView, setMapView] = useState(false)

  return (
    
      <FavoritesProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Header mapView={mapView} setMapView={setMapView} />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home mapView={mapView} />} />
                <Route path="/sea-forecast" element={<SeaForecast />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </FavoritesProvider>
    
  )
}

export default App