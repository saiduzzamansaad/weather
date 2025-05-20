import { useEffect, useState } from 'react';
import { convertToBengaliNumber } from '../utils/helpers';
import { motion, useAnimation } from 'framer-motion';
import { WiCloudy, WiDaySunny, WiRain, WiSandstorm, WiSmoke, WiFog } from 'react-icons/wi';
import { FiAlertTriangle, FiHeart, FiWind } from 'react-icons/fi';

const AirQuality = ({ aqi }) => {
  const [animatedAqi, setAnimatedAqi] = useState(0);
  const controls = useAnimation();
  const particleControls = useAnimation();

  const getAQILevel = (aqi) => {
    if (aqi <= 50) return { 
      level: 'ভাল', 
      color: 'bg-emerald-500', 
      text: 'text-emerald-800', 
      bg: 'bg-emerald-100/80',
      gradient: 'from-emerald-400 to-emerald-600',
      icon: <WiDaySunny className="text-4xl text-emerald-600" />,
      advice: 'বায়ুর মান ভাল, বাইরে যাওয়ার জন্য উপযুক্ত।'
    }
    if (aqi <= 100) return { 
      level: 'মধ্যম', 
      color: 'bg-amber-400', 
      text: 'text-amber-800', 
      bg: 'bg-amber-100/80',
      gradient: 'from-amber-300 to-amber-500',
      icon: <WiCloudy className="text-4xl text-amber-500" />,
      advice: 'বায়ুর মান গ্রহণযোগ্য, তবে সংবেদনশীল ব্যক্তিরা সমস্যা অনুভব করতে পারেন।'
    }
    if (aqi <= 150) return { 
      level: 'সংবেদনশীলদের জন্য অস্বাস্থ্যকর', 
      color: 'bg-orange-500', 
      text: 'text-orange-800', 
      bg: 'bg-orange-100/80',
      gradient: 'from-orange-400 to-orange-600',
      icon: <WiFog className="text-4xl text-orange-600" />,
      advice: 'সংবেদনশীল গোষ্ঠীর জন্য অস্বাস্থ্যকর, সাধারণ জনগণের জন্য মধ্যম স্তরের ঝুঁকি।'
    }
    if (aqi <= 200) return { 
      level: 'অস্বাস্থ্যকর', 
      color: 'bg-red-500', 
      text: 'text-red-800', 
      bg: 'bg-red-100/80',
      gradient: 'from-red-400 to-red-600',
      icon: <WiSmoke className="text-4xl text-red-600" />,
      advice: 'সবার জন্য অস্বাস্থ্যকর, দীর্ঘসময় বাইরে থাকা এড়িয়ে চলুন।'
    }
    if (aqi <= 300) return { 
      level: 'অত্যন্ত অস্বাস্থ্যকর', 
      color: 'bg-purple-500', 
      text: 'text-purple-800', 
      bg: 'bg-purple-100/80',
      gradient: 'from-purple-400 to-purple-600',
      icon: <WiRain className="text-4xl text-purple-600" />,
      advice: 'অত্যন্ত অস্বাস্থ্যকর, জরুরি প্রয়োজন ছাড়া বাইরে যাবেন না।'
    }
    return { 
      level: 'বিপজ্জনক', 
      color: 'bg-rose-700', 
      text: 'text-rose-800', 
      bg: 'bg-rose-100/80',
      gradient: 'from-rose-600 to-rose-800',
      icon: <WiSandstorm className="text-4xl text-rose-700" />,
      advice: 'বিপজ্জনক স্তর, বাইরে যাওয়া সম্পূর্ণরূপে এড়িয়ে চলুন।'
    }
  }

  useEffect(() => {
    // Start animations
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    });

    // Animate particles
    particleControls.start(i => ({
      y: [0, -40, 0],
      x: [0, Math.random() * 40 - 20, 0],
      opacity: [0.2, 0.8, 0.2],
      transition: {
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        delay: Math.random() * 3
      }
    }));

    // Animate AQI number
    let start = 0;
    const end = aqi;
    const duration = 1500;
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedAqi(Math.min(start, end));
      if (start >= end) clearInterval(timer);
    }, duration / end);
    
    return () => clearInterval(timer);
  }, [aqi, controls, particleControls]);

  const aqiData = getAQILevel(aqi);

  // Particle positions
  const particles = [...Array(15)].map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    delay: Math.random() * 5
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      className={`relative ${aqiData.bg} dark:bg-gray-800/80 rounded-3xl p-6 shadow-2xl 
      border border-white/20 dark:border-gray-700/50 backdrop-blur-lg overflow-hidden`}
    >
      {/* Animated gradient background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 bg-gradient-to-br ${aqiData.gradient} -z-0`}
      ></motion.div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            custom={particle.id}
            animate={particleControls}
            className={`absolute rounded-full ${aqiData.color} blur-[1px]`}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              top: `${Math.random() * 100}%`,
              left: `${particle.left}%`,
              opacity: 0.2
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <motion.h3 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-bold text-2xl dark:text-white text-gray-900"
            >
              বায়ুর মান সূচক (AQI)
            </motion.h3>
            
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-2"
            >
              {aqiData.icon}
              <div>
                <p className={`${aqiData.text} dark:text-white font-semibold text-xl transition-all duration-300`}>
                  {aqiData.level}
                </p>
                <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                  <FiWind className="mt-0.5" />
                  <span>বায়ু মান: {convertToBengaliNumber(aqi)}</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
            className={`w-20 h-20 ${aqiData.color} rounded-2xl flex items-center justify-center text-white font-bold 
            shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <motion.span 
              key={animatedAqi}
              initial={{ scale: 1.2, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-2xl"
            >
              {convertToBengaliNumber(animatedAqi)}
            </motion.span>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-3"
        >
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 font-medium">
            <span className="flex items-center">
              <FiHeart className="mr-1 text-emerald-500" /> ০
            </span>
            <span>৫০</span>
            <span>১০০</span>
            <span>১৫০</span>
            <span>২০০</span>
            <span className="flex items-center">
              <FiAlertTriangle className="mr-1 text-rose-500" /> ৩০০+
            </span>
          </div>
          
          <div className="w-full bg-gray-200/80 dark:bg-gray-700/80 rounded-full h-2.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (aqi / 5))}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className={`${aqiData.color} h-full rounded-full relative`}
            >
              <motion.div 
                animate={{
                  boxShadow: ['0 0 0 0 rgba(255,255,255,0.7)', '0 0 0 10px rgba(255,255,255,0)'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-1">
              {aqi > 150 ? (
                <FiAlertTriangle className="text-xl text-amber-500 mr-2" />
              ) : (
                <FiHeart className="text-xl text-emerald-500 mr-2" />
              )}
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {aqiData.advice}
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Health impact indicator */}
      {aqi > 100 && (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className={`absolute top-4 right-4 ${aqi > 200 ? 'bg-rose-500' : 'bg-amber-500'} text-white text-xs px-2 py-1 rounded-full flex items-center`}
        >
          <FiAlertTriangle className="mr-1" />
          <span>{aqi > 200 ? 'উচ্চ স্বাস্থ্য ঝুঁকি' : 'মধ্যম স্বাস্থ্য ঝুঁকি'}</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export default AirQuality;