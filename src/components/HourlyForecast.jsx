import { motion } from 'framer-motion'
import { convertToBengaliNumber, getWeatherIcon } from '../utils/helpers'

const HourlyForecast = ({ hourly }) => {
  const getHour = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.getHours()
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  // Get appropriate animation based on weather condition
  const getWeatherAnimation = (iconCode) => {
    if (iconCode.includes('01')) return 'animate-pulse' // Sunny
    if (iconCode.includes('09') || iconCode.includes('10')) return 'animate-rain' // Rain
    if (iconCode.includes('13')) return 'animate-snow' // Snow
    if (iconCode.includes('11')) return 'animate-lightning' // Thunderstorm
    return 'animate-float' // Default
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white/10 to-white/30 dark:from-gray-800/90 dark:to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 overflow-x-auto border border-white/20 dark:border-gray-700/50"
    >
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          24 ঘণ্টার পূর্বাভাস
        </h2>
        <div className="ml-auto bg-sky-100 dark:bg-sky-900/30 px-3 py-1 rounded-full text-sm font-medium text-sky-800 dark:text-sky-200">
          প্রতি ঘণ্টায়
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex space-x-6 pb-4"
      >
        {hourly.slice(0, 24).map((hour, index) => (
          <motion.div 
            key={index} 
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center min-w-[70px] p-3 rounded-xl bg-white/40 dark:bg-gray-700/40 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-gray-600/60 transition-all duration-300 border border-white/30 dark:border-gray-600/30 shadow-sm"
          >
            <p className="text-gray-600 dark:text-gray-300 font-medium mb-2">
              {convertToBengaliNumber(getHour(hour.dt))}:00
            </p>
            <div className={`relative ${getWeatherAnimation(hour.weather[0].icon)}`}>
              <img 
                src={getWeatherIcon(hour.weather[0].icon)} 
                alt={hour.weather[0].description}
                className="h-12 w-12 drop-shadow-lg"
              />
              {hour.pop > 0.3 && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {convertToBengaliNumber(Math.round(hour.pop * 100))}%
                </div>
              )}
            </div>
            <p className="font-bold text-xl text-gray-800 dark:text-white mt-2">
              {convertToBengaliNumber(Math.round(hour.temp))}°
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {hour.weather[0].description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default HourlyForecast