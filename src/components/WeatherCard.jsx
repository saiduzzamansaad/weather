import { convertToBengaliNumber, getWeatherIcon } from '../utils/helpers'
import { motion } from 'framer-motion'
import { WiHumidity, WiBarometer, WiStrongWind, WiSunrise, WiSunset } from 'react-icons/wi'
import { FiDroplet, FiEye, FiCloud, FiWind } from 'react-icons/fi'

const WeatherCard = ({ weather }) => {
  const date = new Date(weather.dt * 1000)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = date.toLocaleDateString('bn-BD', options)
  
  // Calculate sunrise and sunset times
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })
  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' })

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const iconVariants = {
    floating: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.div 
      className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-white/20"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <div className="p-6 relative">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 -z-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 dark:bg-indigo-900 rounded-full opacity-20 blur-xl"></div>
          <div className="absolute top-20 right-20 w-20 h-20 bg-purple-200 dark:bg-purple-900 rounded-full opacity-30 blur-lg"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <motion.h2 
                className="text-3xl font-bold text-gray-800 dark:text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {weather.name}, {weather.sys.country}
              </motion.h2>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {formattedDate}
              </motion.p>
            </div>
            <div className="text-right">
              <motion.div 
                className="flex items-center justify-end"
                variants={iconVariants}
                animate="floating"
              >
                <img
                  src={getWeatherIcon(weather.weather[0].icon)}
                  alt={weather.weather[0].description}
                  className="h-20 w-20 drop-shadow-lg"
                />
              </motion.div>
              <motion.p 
                className="text-gray-600 dark:text-gray-300 capitalize text-lg font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {weather.weather[0].description}
              </motion.p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div>
              <motion.span 
                className="text-6xl font-bold text-gray-800 dark:text-white block"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {convertToBengaliNumber(Math.round(weather.main.temp))}°
                <span className="text-2xl ml-1 text-gray-600 dark:text-gray-300">C</span>
              </motion.span>
              <motion.div 
                className="flex items-center mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <FiWind className="text-blue-500 mr-1" />
                <span className="text-gray-600 dark:text-gray-300">
                  বাতাস: {convertToBengaliNumber(Math.round(weather.wind.speed))} km/h
                </span>
              </motion.div>
            </div>

            <div className="text-right space-y-2">
              <motion.div 
                className="text-gray-600 dark:text-gray-300"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span>সর্বোচ্চ: </span>
                <span className="font-medium text-lg">
                  {convertToBengaliNumber(Math.round(weather.main.temp_max))}°
                </span>
              </motion.div>
              <motion.div 
                className="text-gray-600 dark:text-gray-300"
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>সর্বনিম্ন: </span>
                <span className="font-medium text-lg">
                  {convertToBengaliNumber(Math.round(weather.main.temp_min))}°
                </span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-end mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <WiSunrise className="text-amber-500 text-2xl mr-1" />
                <span className="text-gray-600 dark:text-gray-300 mr-3">{sunrise}</span>
                <WiSunset className="text-purple-500 text-2xl mr-1" />
                <span className="text-gray-600 dark:text-gray-300">{sunset}</span>
              </motion.div>
            </div>
          </div>

          <motion.div 
            className="mt-8 grid grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <div className="flex items-center">
                <WiHumidity className="text-blue-500 text-3xl mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">আর্দ্রতা</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    {convertToBengaliNumber(weather.main.humidity)}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <div className="flex items-center">
                <WiBarometer className="text-indigo-500 text-3xl mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">চাপ</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    {convertToBengaliNumber(weather.main.pressure)} hPa
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <div className="flex items-center">
                <FiDroplet className="text-cyan-500 text-2xl mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">বৃষ্টির সম্ভাবনা</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    {convertToBengaliNumber(weather.pop ? Math.round(weather.pop * 100) : 0)}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/20">
              <div className="flex items-center">
                <FiEye className="text-gray-500 text-2xl mr-2" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">দৃশ্যমানতা</p>
                  <p className="text-xl font-semibold text-gray-800 dark:text-white">
                    {convertToBengaliNumber(weather.visibility / 1000)} km
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated weather effect based on condition */}
      {weather.weather[0].main === 'Rain' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-1 w-1 bg-blue-400 rounded-full"
              initial={{ y: -10, x: Math.random() * window.innerWidth }}
              animate={{
                y: [0, window.innerHeight],
                x: [Math.random() * 50 - 25, Math.random() * 50 - 25 + (Math.random() * 100 - 50)]
              }}
              transition={{
                duration: Math.random() * 1 + 0.5,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            />
          ))}
        </div>
      )}
      
      {weather.weather[0].main === 'Clouds' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white/30 dark:bg-gray-600/30 rounded-full"
              initial={{
                y: Math.random() * 100,
                x: Math.random() * window.innerWidth,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{
                x: [0, Math.random() * 100 - 50]
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
              }}
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 50 + 30}px`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.2
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default WeatherCard