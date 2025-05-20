import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFavorites } from '../context/FavoritesContext'
import { fetchLocationSuggestions } from '../services/weatherAPI'
import { FiSearch, FiMapPin, FiStar, FiX, FiHeart } from 'react-icons/fi'
import { RiMapPinFill, RiStarFill } from 'react-icons/ri'

const LocationSearch = ({ onSelect, currentLocation }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isFocused, setIsFocused] = useState(false)
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  useEffect(() => {
    if (query.length > 2) {
      const timer = setTimeout(async () => {
        try {
          const results = await fetchLocationSuggestions(query)
          setSuggestions(results)
        } catch (error) {
          console.error('Error fetching suggestions:', error)
          setSuggestions([])
        }
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSelect = (location) => {
    onSelect(location)
    setQuery('')
    setIsFocused(false)
  }

  const toggleFavorite = (e, location) => {
    e.stopPropagation()
    if (isFavorite(location.id)) {
      removeFavorite(location.id)
    } else {
      addFavorite(location)
    }
  }

  const clearSearch = () => {
    setQuery('')
    setSuggestions([])
  }

  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* Search Input */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border-2 ${
          isFocused ? 'border-blue-400 dark:border-blue-500' : 'border-transparent'
        } transition-all duration-300`}
      >
        <div className="pl-4 text-gray-500 dark:text-gray-400">
          <FiSearch className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="অবস্থান খুঁজুন..."
          className="flex-grow bg-transparent px-4 py-3 text-gray-800 dark:text-white focus:outline-none placeholder-gray-500 dark:placeholder-gray-400"
        />
        {query && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={clearSearch}
            className="p-1 mr-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-full"
          >
            <FiX className="h-5 w-5" />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(currentLocation)}
          className="m-1 p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg flex items-center justify-center"
          title="বর্তমান অবস্থান"
        >
          <RiMapPinFill className="h-5 w-5" />
        </motion.button>
      </motion.div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {(isFocused && suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-20 mt-2 w-full bg-white/90 dark:bg-gray-800/95 backdrop-blur-lg shadow-2xl rounded-xl overflow-hidden"
          >
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {suggestions.map((location) => (
                <motion.div
                  key={`${location.lat}-${location.lon}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleSelect(location)}
                  className="px-4 py-3 hover:bg-blue-50/50 dark:hover:bg-gray-700/80 cursor-pointer flex justify-between items-center border-b border-gray-100 dark:border-gray-700 last:border-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-500 dark:text-blue-400">
                      <FiMapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium dark:text-white">
                        {location.name}, {location.country}
                      </div>
                      {location.state && (
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {location.state}
                        </div>
                      )}
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => toggleFavorite(e, location)}
                    className={`p-1 rounded-full ${
                      isFavorite(location.id)
                        ? 'text-amber-500 hover:text-amber-600'
                        : 'text-gray-400 hover:text-amber-500'
                    }`}
                  >
                    {isFavorite(location.id) ? (
                      <RiStarFill className="h-5 w-5" />
                    ) : (
                      <FiStar className="h-5 w-5" />
                    )}
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4"
        >
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
            <FiHeart className="mr-2 text-rose-500" />
            প্রিয় অবস্থানসমূহ
          </h3>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {favorites.map((fav) => (
                <motion.div
                  key={fav.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  layout
                  className="relative group"
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelect(fav)}
                    className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 dark:text-white shadow-sm"
                  >
                    <RiMapPinFill className="mr-1 text-blue-500" />
                    {fav.name}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFavorite(fav.id)
                    }}
                    className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
                  >
                    <FiX className="h-3 w-3" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  )
}

export default LocationSearch