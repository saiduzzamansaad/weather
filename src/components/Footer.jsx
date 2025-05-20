import { motion } from 'framer-motion'
import { FiGithub, FiLinkedin, FiMail, FiGlobe, FiCloud } from 'react-icons/fi'
import { RiLeafLine } from 'react-icons/ri'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  const footerLinks = [
    { name: 'Terms', label: 'ব্যবহারের শর্তাবলী', icon: <RiLeafLine /> },
    { name: 'Privacy', label: 'গোপনীয়তা নীতি', icon: <FiCloud /> },
    { name: 'Contact', label: 'যোগাযোগ', icon: <FiMail /> }
  ]

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/yourusername', icon: <FiGithub /> },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/yourprofile', icon: <FiLinkedin /> },
    { name: 'Email', url: 'saiduzzama113gmail@gmail.com', icon: <FiMail /> }
  ]

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-12 pb-8 border-t border-gray-700/50"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2">
              <FiGlobe className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                বাংলাদেশ আবহাওয়া ড্যাশবোর্ড
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              বাংলাদেশের জন্য সবচেয়ে নির্ভরযোগ্য আবহাওয়া তথ্য প্রদানকারী প্ল্যাটফর্ম
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white">লিংকসমূহ</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    whileHover={{ x: 5 }}
                    href="#"
                    className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white">যোগাযোগ</h4>
            <div className="space-y-3">
              <p className="text-gray-400 text-sm flex items-center">
                <FiMail className="mr-2" />
                youremail@gmail.com
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Data Source */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-lg font-semibold text-white">তথ্য উৎস</h4>
            <p className="text-gray-400 text-sm">
              আবহাওয়া তথ্য সরবরাহ করা হয়েছে{' '}
              <motion.a
                whileHover={{ color: '#f6d365' }}
                href="https://openweathermap.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 font-medium"
              >
                OpenWeatherMap
              </motion.a>{' '}
              এর মাধ্যমে
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span>API v3.0</span>
              <span>•</span>
              <span>Updated hourly</span>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          className="pt-6 border-t border-gray-800 text-center text-gray-500 text-sm"
        >
          <p>
            &copy; {currentYear} বাংলাদেশ আবহাওয়া ড্যাশবোর্ড। সকল স্বত্ব সংরক্ষিত।
          </p>
          <p className="mt-1">
            Developed with ❤️ MD.SAIDUZZAMAN SAAD
          </p>
        </motion.div>
      </div>

      {/* Floating weather elements */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-full -z-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }
            }}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              bottom: '10%'
            }}
          />
        ))}
      </div>
    </motion.footer>
  )
}

export default Footer