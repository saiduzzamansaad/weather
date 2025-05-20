import { useEffect, useState } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { convertToBengaliNumber, formatTime } from '../utils/helpers'
import { FiSunrise, FiSunset, FiSun } from 'react-icons/fi'
import { WiDaySunny, WiHorizonAlt, WiSunset } from 'weather-icons-react'

const SunProgress = ({ sunrise, sunset, currentTime }) => {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()

  // Time segments for different day phases
  const timeSegments = [
    { name: 'ভোর', icon: <FiSunrise className="text-blue-400" />, threshold: 0.15 },
    { name: 'সকাল', icon: <WiDaySunny size={24} className="text-yellow-400" />, threshold: 0.3 },
    { name: 'দুপুর', icon: <FiSun className="text-orange-500" />, threshold: 0.45 },
    { name: 'বিকাল', icon: <WiHorizonAlt size={24} className="text-amber-500" />, threshold: 0.65 },
    { name: 'সন্ধ্যা', icon: <WiSunset size={24} className="text-purple-400" />, threshold: 0.85 },
    { name: 'রাত', icon: <FiSunset className="text-indigo-500" />, threshold: 1 }
  ]

  useEffect(() => {
    setIsVisible(true)
    
    const now = currentTime || Math.floor(Date.now() / 1000)
    const start = sunrise
    const end = sunset
    
    if (now < start) {
      setProgress(0)
    } else if (now > end) {
      setProgress(100)
    } else {
      const total = end - start
      const elapsed = now - start
      const newProgress = Math.min(100, (elapsed / total) * 100)
      setProgress(newProgress)
    }

    // Animate the progress bar
    controls.start({
      width: `${progress}%`,
      transition: { duration: 1.5, ease: "easeInOut" }
    })
  }, [sunrise, sunset, currentTime, progress, controls])

  const getSunPosition = () => {
    const rotation = (progress / 100) * 180
    return { transform: `rotate(${rotation}deg) translateY(-10px)` }
  }

  const getCurrentPhase = () => {
    const currentPhase = progress / 100
    return timeSegments.find(segment => currentPhase < segment.threshold) || timeSegments[timeSegments.length - 1]
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "backOut" }}
      className="relative bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-2xl overflow-hidden
        border border-opacity-20 border-gray-200 dark:border-gray-800 backdrop-blur-lg
        bg-gradient-to-br from-yellow-50/30 via-blue-50/20 to-orange-50/30 dark:from-gray-900/90 dark:to-gray-800/90
        ring-1 ring-white/10"
    >
      {/* Dynamic gradient background that changes with sun position */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-sky-400/10 via-yellow-200/15 to-orange-500/10"></div>
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-transparent to-orange-500/5"
          style={{ opacity: progress/100 }}
        ></div>
      </div>
      
      {/* Animated sun rays */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        {[...Array(16)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute top-1/2 left-1/2 w-1 h-32 bg-gradient-to-b from-yellow-400/70 to-transparent rounded-full"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3],
              transform: `translate(-50%, -50%) rotate(${i * 22.5}deg) translateY(-70px) scaleY(${1 + Math.sin(i * 0.5) * 0.3})`
            }}
            transition={{
              duration: 4,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Floating cloud particles */}
      <AnimatePresence>
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute -z-0 text-gray-200 dark:text-gray-700"
            initial={{ 
              x: Math.random() * 100 - 50,
              y: Math.random() * 60 + 20,
              opacity: 0,
              scale: 0.8
            }}
            animate={{ 
              x: [null, (Math.random() * 40 - 20)],
              opacity: [0, 0.4, 0],
              scale: [0.8, 1.1, 0.9]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <div className="relative z-10">
        <motion.h2 
          className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="mr-3 text-yellow-500"
            animate={{ 
              rotate: [0, 20, 0],
              transition: { 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <FiSun className="w-6 h-6" />
          </motion.div>
          সূর্যোদয় ও সূর্যাস্ত
        </motion.h2>
        
        <div className="relative h-48 mb-10">
          {/* Horizon line with glow effect */}
          <div className="absolute bottom-16 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-yellow-300 to-orange-500 rounded-full shadow-lg shadow-blue-400/20"></div>
          
          {/* Progress track with glass morphism */}
          <div className="absolute bottom-16 left-0 right-0 h-1.5 bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-full"></div>
          
          {/* Animated progress indicator */}
          <motion.div 
            className="absolute bottom-16 left-0 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg shadow-yellow-400/30"
            initial={{ width: "0%" }}
            animate={controls}
          ></motion.div>
          
          {/* Sun animation with floating effect */}
          <div className="absolute left-0 right-0 top-0 flex justify-center">
            <div className="relative w-48 h-48">
              <motion.div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 origin-bottom"
                style={getSunPosition()}
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-2xl shadow-yellow-400/40"></div>
                  <div className="absolute inset-0 rounded-full bg-yellow-300/40 blur-md"></div>
                  <motion.div 
                    className="absolute inset-0 rounded-full bg-yellow-200/30"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Sunrise/Sunset times with slide-in animation */}
          <motion.div 
            className="absolute -bottom-2 -left-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-center p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/30 dark:border-gray-700/50">
              <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center">
                <FiSunrise className="mr-1" /> সূর্যোদয়
              </div>
              <div className="font-bold text-lg dark:text-white mt-1">{formatTime(sunrise)}</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -bottom-2 -right-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-center p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/30 dark:border-gray-700/50">
              <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center justify-center">
                <FiSunset className="mr-1" /> সূর্যাস্ত
              </div>
              <div className="font-bold text-lg dark:text-white mt-1">{formatTime(sunset)}</div>
            </div>
          </motion.div>
        </div>
        
        {/* Day progress information with animated segments */}
        <motion.div 
          className="mt-8 pt-5 border-t border-gray-200/50 dark:border-gray-700/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">বর্তমান অবস্থা</div>
              <div className="flex items-center">
                <span className="mr-2">{getCurrentPhase().icon}</span>
                <span className="font-semibold text-gray-800 dark:text-white">{getCurrentPhase().name}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">দিনের অগ্রগতি</div>
              <motion.div 
                className="font-bold text-xl bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 10
                }}
              >
                {convertToBengaliNumber(Math.round(progress))}%
              </motion.div>
            </div>
          </div>
          
          {/* Time segments visualization */}
          <div className="relative h-2 bg-gray-200/50 dark:bg-gray-700/50 rounded-full mt-6 overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 via-yellow-400 to-orange-500 rounded-full"
              style={{ width: `${progress}%` }}
              initial={{ width: "0%" }}
              animate={controls}
            />
          </div>
          
          <div className="flex justify-between mt-3">
            {timeSegments.map((segment, index) => (
              <motion.div 
                key={index}
                className={`text-xs ${progress/100 >= segment.threshold ? 'text-yellow-600 dark:text-yellow-400' : 'text-gray-400'}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {segment.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Subtle floating particles */}
      <AnimatePresence>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute -z-0 rounded-full bg-yellow-400/20 dark:bg-yellow-500/10"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              y: [0, Math.random() * 40 - 20]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              delay: Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default SunProgress