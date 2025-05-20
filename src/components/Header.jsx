import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SunIcon, CloudIcon, UmbrellaIcon, WavesIcon, MenuIcon, XIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  }

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 10 }}
      className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-900 dark:to-blue-700 text-white shadow-2xl backdrop-blur-lg relative z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="flex items-center"
          >
            <Link to="/" className="text-2xl sm:text-3xl font-extrabold flex items-center space-x-2 sm:space-x-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="relative"
              >
                <div className="absolute -inset-1 sm:-inset-2 bg-white/30 rounded-full blur-md"></div>
                <SunIcon className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-300 drop-shadow-lg" />
              </motion.div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white">
                বাংলাদেশ আবহাওয়া
              </span>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="ml-1 sm:ml-2"
              >
                <CloudIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white/80" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-6 lg:space-x-8"
          >
            <motion.div variants={itemVariants}>
              <Link 
                to="/" 
                className="relative group text-base lg:text-lg font-medium hover:text-yellow-200 transition-colors"
              >
                হোম
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link 
                to="/sea-forecast" 
                className="relative group text-base lg:text-lg font-medium hover:text-yellow-200 transition-colors flex items-center"
              >
                <WavesIcon className="mr-1 h-4 w-4 lg:h-5 lg:w-5" />
                বঙ্গোপসাগর
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
              </Link>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <Link 
                to="/rain-forecast" 
                className="relative group text-base lg:text-lg font-medium hover:text-yellow-200 transition-colors flex items-center"
              >
                <UmbrellaIcon className="mr-1 h-4 w-4 lg:h-5 lg:w-5" />
                বৃষ্টিপাত
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all group-hover:w-full"></span>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              
            </motion.div>
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden overflow-hidden"
            >
              <motion.nav 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col space-y-4 py-4 px-2"
              >
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/" 
                    className="relative group text-lg font-medium hover:text-yellow-200 transition-colors block py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    হোম
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/sea-forecast" 
                    className="relative group text-lg font-medium hover:text-yellow-200 transition-colors flex items-center py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <WavesIcon className="mr-2 h-5 w-5" />
                    বঙ্গোপসাগর
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-300 transition-all group-hover:w-full"></span>
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link 
                    to="/rain-forecast" 
                    className="relative group text-lg font-medium hover:text-yellow-200 transition-colors flex items-center py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <UmbrellaIcon className="mr-2 h-5 w-5" />
                    বৃষ্টিপাত
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-300 transition-all group-hover:w-full"></span>
                  </Link>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="pt-2 border-t border-white/20"
                >
                  <ToggleTheme />
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Weather animation elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0.1, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            <CloudIcon className="h-8 w-8 sm:h-10 sm:w-10" />
          </motion.div>
        ))}
      </div>
    </motion.header>
  )
}

export default Header