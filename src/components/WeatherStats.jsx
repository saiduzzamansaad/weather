import { convertToBengaliNumber, getWindDirection, getPressureTrend } from '../utils/helpers';
import { motion } from 'framer-motion';
import { FiDroplet, FiWind, FiEye, FiCloud, FiSunrise, FiSun, FiBarChart2 } from 'react-icons/fi';
import { WiBarometer, WiHumidity } from 'react-icons/wi';

const WeatherStats = ({ weather }) => {
  const stats = [
    {
      name: 'আপেক্ষিক আর্দ্রতা',
      value: `${convertToBengaliNumber(weather.main.humidity)}%`,
      icon: <WiHumidity className="text-3xl text-blue-400" />,
      animation: {
        scale: [1, 1.05, 1],
        transition: { duration: 3, repeat: Infinity }
      }
    },
    {
      name: 'বায়ুচাপ',
      value: `${convertToBengaliNumber(weather.main.pressure)} hPa`,
      trend: getPressureTrend(weather.main.pressure),
      icon: <WiBarometer className="text-3xl text-indigo-400" />,
      animation: {
        y: [0, -3, 0],
        transition: { duration: 4, repeat: Infinity }
      }
    },
    {
      name: 'বায়ুর দিক',
      value: getWindDirection(weather.wind.deg),
      icon: <FiWind className="text-2xl text-green-400" />,
      animation: {
        rotate: [0, 15, 0, -15, 0],
        transition: { duration: 5, repeat: Infinity }
      }
    },
    {
      name: 'দৃশ্যমানতা',
      value: `${convertToBengaliNumber(weather.visibility / 1000)} কিমি`,
      icon: <FiEye className="text-2xl text-amber-400" />,
      animation: {
        opacity: [0.8, 1, 0.8],
        transition: { duration: 4, repeat: Infinity }
      }
    },
    {
      name: 'মেঘাচ্ছন্নতা',
      value: `${convertToBengaliNumber(weather.clouds.all)}%`,
      icon: <FiCloud className="text-2xl text-gray-400" />,
      animation: {
        x: [0, 2, 0, -2, 0],
        transition: { duration: 6, repeat: Infinity }
      }
    },
    {
      name: 'সূর্যোদয়',
      value: new Date(weather.sys.sunrise * 1000).toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit' }),
      icon: <FiSunrise className="text-2xl text-orange-400" />,
      animation: {
        y: [0, -2, 0],
        transition: { duration: 3, repeat: Infinity }
      }
    },
    {
      name: 'তাপমাত্রা অনুভূতি',
      value: `${convertToBengaliNumber(Math.round(weather.main.feels_like))}°C`,
      icon: <FiSun className="text-2xl text-red-400" />,
      animation: {
        scale: [1, 1.03, 1],
        transition: { duration: 4, repeat: Infinity }
      }
    },
    {
      name: 'বায়ুর গতি',
      value: `${convertToBengaliNumber(weather.wind.speed)} কিমি/ঘণ্টা`,
      icon: <FiWind className="text-2xl text-teal-400" />,
      animation: {
        rotate: [0, 5, 0, -5, 0],
        transition: { duration: 3, repeat: Infinity }
      }
    },
    {
      name: 'চাপের প্রবণতা',
      value: getPressureTrend(weather.main.pressure),
      icon: <FiBarChart2 className="text-2xl text-purple-400" />,
      animation: {
        y: [0, -3, 0],
        transition: { duration: 5, repeat: Infinity }
      }
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/90 dark:to-gray-900/90 rounded-2xl shadow-xl p-6 backdrop-blur-sm border border-white/20 dark:border-gray-700/50">
      <motion.h2 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center"
      >
        <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
          বিস্তারিত পরিসংখ্যান
        </span>
      </motion.h2>
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            variants={item}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="bg-white/70 dark:bg-gray-700/70 rounded-xl p-5 flex items-start backdrop-blur-sm border border-white/30 dark:border-gray-600/30 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <motion.div 
              className="mr-4 mt-1"
              animate={stat.animation}
            >
              {stat.icon}
            </motion.div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">{stat.name}</h3>
              <p className="text-xl font-semibold text-gray-800 dark:text-white">
                {stat.value}
                {stat.trend && (
                  <span className={`ml-2 text-xs font-medium ${
                    stat.trend === 'বৃদ্ধি পাচ্ছে' ? 'text-green-600 dark:text-green-400' :
                    stat.trend === 'হ্রাস পাচ্ছে' ? 'text-red-600 dark:text-red-400' :
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    ({stat.trend})
                  </span>
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Weather animation elements */}
      {weather.weather[0].main === 'Rain' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-1 w-1 bg-blue-400 rounded-full"
              initial={{ y: -10, x: Math.random() * window.innerWidth, opacity: 0 }}
              animate={{
                y: window.innerHeight,
                opacity: [0, 0.6, 0],
                x: Math.random() * 20 - 10 + (i % 2 === 0 ? 5 : -5)
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random()
              }}
              style={{
                left: `${Math.random() * 100}%`,
                width: `${1 + Math.random() * 2}px`,
                height: `${10 + Math.random() * 10}px`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherStats;