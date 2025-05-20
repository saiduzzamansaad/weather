import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchSeaWeather } from '../services/weatherAPI'
import { convertToBengaliNumber } from '../utils/helpers'

const SeaForecast = () => {
  const [seaWeather, setSeaWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSeaWeather = async () => {
      try {
        setLoading(true)
        // Using Chittagong coordinates for Bay of Bengal
        const data = await fetchSeaWeather(22.3667, 91.8)
        setSeaWeather(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getSeaWeather()
  }, [])

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-96"
      >
        <div className="relative">
          <div className="absolute -inset-4">
            <div className="w-full h-full max-w-sm mx-auto lg:mx-0 opacity-75 blur-lg bg-gradient-to-tr from-blue-500 to-teal-300"></div>
          </div>
          <div className="relative flex justify-center items-center space-x-3 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
            <div className="flex space-x-4 items-center">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-blue-400 h-12 w-12"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  // Determine weather condition for animations
  const isStormy = seaWeather.wind.speed > 15 || seaWeather.weather[0].main === 'Thunderstorm'
  const isRainy = seaWeather.weather[0].main.includes('rain')
  const isCalm = seaWeather.wind.speed < 5

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400"
        >
          বঙ্গোপসাগরের সমুদ্র পূর্বাভাস
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {new Date().toLocaleDateString('bn-BD', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </motion.p>
      </div>

      {seaWeather && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Conditions Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full filter blur-3xl opacity-30"></div>
            <div className="p-8 relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                বর্তমান সমুদ্র অবস্থা
              </h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">জলের তাপমাত্রা</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {convertToBengaliNumber(Math.round(seaWeather.main.temp))}°C
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/50 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">বাতাসের গতি</p>
                      <p className="text-2xl font-bold text-gray-800 dark:text-white">
                        {convertToBengaliNumber(seaWeather.wind.speed)} km/h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated Weather Visualization */}
              <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-b from-blue-400 to-blue-600 dark:from-blue-800 dark:to-blue-900">
                {/* Wave Animation */}
                <div className={`absolute bottom-0 w-full ${isStormy ? 'h-24' : isRainy ? 'h-20' : 'h-16'}`}>
                  <svg className={`w-full h-full ${isStormy ? 'animate-wave-storm' : isRainy ? 'animate-wave-rain' : 'animate-wave-calm'}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-blue-300 dark:fill-blue-700"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-blue-200 dark:fill-blue-600"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-blue-100 dark:fill-blue-500"></path>
                  </svg>
                </div>
                
                {/* Weather Icons */}
                <div className="absolute top-4 right-4">
                  {isStormy ? (
                    <motion.div 
                      animate={{ 
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2,
                        ease: "easeInOut"
                      }}
                      className="text-5xl"
                    >
                      ⚡
                    </motion.div>
                  ) : isRainy ? (
                    <motion.div 
                      className="text-5xl"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      🌧️
                    </motion.div>
                  ) : (
                    <motion.div 
                      animate={{ 
                        y: [0, -5, 0],
                        scale: [1, 1.05, 1]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 8,
                        ease: "easeInOut"
                      }}
                      className="text-5xl"
                    >
                      🌊
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Advisory Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 dark:bg-amber-900 rounded-full filter blur-3xl opacity-20"></div>
            <div className="p-8 relative z-10">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                নৌযান চলাচল পরামর্শ
              </h2>
              
              <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">
                      {isStormy ? '🌪️' : isRainy ? '🌧️' : '⛵'}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">সমুদ্রের অবস্থা</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {isStormy 
                          ? 'সমুদ্র অত্যন্ত অশান্ত, সকল নৌযান চলাচলের জন্য বিপজ্জনক' 
                          : isRainy 
                            ? 'সমুদ্র মাঝারি অশান্ত, ছোট নৌযান চলাচলের জন্য অনুপযুক্ত' 
                            : 'সমুদ্র শান্ত, সকল নৌযান চলাচলের জন্য উপযুক্ত'}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">⚠️</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">সতর্কতা</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {isStormy
                          ? 'ঘূর্ণিঝড়ের সতর্কতা: সকল জাহাজকে নিরাপদ আশ্রয়ে থাকার পরামর্শ দেওয়া হচ্ছে'
                          : isRainy
                            ? 'মাঝারি থেকে ভারী বৃষ্টিপাতের সম্ভাবনা: নৌযান চলাচলে সতর্কতা অবলম্বন করুন'
                            : 'কোনো বিশেষ সতর্কতা নেই, তবে সর্বদা আবহাওয়া পূর্বাভাস মনোযোগ সহকারে পর্যবেক্ষণ করুন'}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">📅</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 dark:text-white mb-2">পরবর্তী ২৪ ঘণ্টা</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {isStormy
                          ? 'অবস্থার আরও অবনতি হতে পারে, জরুরি প্রস্তুতি নিন'
                          : isRainy
                            ? 'অবস্থা স্থিতিশীল থাকবে, তবে বৃষ্টিপাত অব্যাহত থাকতে পারে'
                            : 'উত্তম নৌযান চলাচলের অবস্থা বজায় থাকবে'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Add these animations to your Tailwind config */}
      <style jsx global>{`
        @keyframes wave-calm {
          0% { transform: translateX(0) translateZ(0) scaleY(1) }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.8) }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1) }
        }
        @keyframes wave-rain {
          0% { transform: translateX(0) translateZ(0) scaleY(1) }
          50% { transform: translateX(-25%) translateZ(0) scaleY(0.9) }
          100% { transform: translateX(-50%) translateZ(0) scaleY(1.1) }
        }
        @keyframes wave-storm {
          0% { transform: translateX(0) translateZ(0) scaleY(1) }
          50% { transform: translateX(-25%) translateZ(0) scaleY(1.2) }
          100% { transform: translateX(-50%) translateZ(0) scaleY(0.8) }
        }
        .animate-wave-calm { animation: wave-calm 8s ease-in-out infinite }
        .animate-wave-rain { animation: wave-rain 5s ease-in-out infinite }
        .animate-wave-storm { animation: wave-storm 3s ease-in-out infinite }
      `}</style>
    </motion.div>
  )
}

export default SeaForecast