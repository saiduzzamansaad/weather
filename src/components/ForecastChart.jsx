import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { convertToBengaliNumber } from '../utils/helpers'
import { motion } from 'framer-motion'
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm } from 'react-icons/wi'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const getWeatherIconComponent = (iconCode) => {
  if (iconCode.includes('01')) return <WiDaySunny className="text-yellow-400" />
  if (iconCode.includes('09') || iconCode.includes('10')) return <WiRain className="text-blue-400" />
  if (iconCode.includes('13')) return <WiSnow className="text-blue-100" />
  if (iconCode.includes('11')) return <WiThunderstorm className="text-purple-400" />
  return <WiCloudy className="text-gray-400" />
}

const ForecastChart = ({ forecast }) => {
  const days = forecast.list.filter((item, index) => index % 8 === 0)
  
  const labels = days.map((day) => {
    const date = new Date(day.dt * 1000)
    return date.toLocaleDateString('bn-BD', { weekday: 'short' })
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'সর্বোচ্চ তাপমাত্রা',
        data: days.map((day) => Math.round(day.main.temp_max)),
        borderColor: 'rgba(239, 68, 68, 0.8)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'সর্বনিম্ন তাপমাত্রা',
        data: days.map((day) => Math.round(day.main.temp_min)),
        borderColor: 'rgba(59, 130, 246, 0.8)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14,
            family: "'Hind Siliguri', sans-serif",
          },
          color: '#6B7280',
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 16,
          family: "'Hind Siliguri', sans-serif",
        },
        bodyFont: {
          size: 14,
          family: "'Hind Siliguri', sans-serif",
        },
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${convertToBengaliNumber(context.raw)}°C`
          },
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(209, 213, 219, 0.2)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            family: "'Hind Siliguri', sans-serif",
          },
          callback: function (value) {
            return convertToBengaliNumber(value)
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            family: "'Hind Siliguri', sans-serif",
            size: 14,
          },
        },
      },
    },
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-white/20 to-white/40 dark:from-gray-800/90 dark:to-gray-900/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-white/20 dark:border-gray-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          initial={{ x: -10 }}
          animate={{ x: 0 }}
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          ৫ দিনের পূর্বাভাস
        </motion.h2>
        <div className="flex space-x-2">
          {days.slice(0, 3).map((day, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="text-2xl"
            >
              {getWeatherIconComponent(day.weather[0].icon)}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="h-80 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-gray-800/10 to-transparent pointer-events-none" />
        <Line 
          data={data} 
          options={options} 
          className="chart-animate" // Add CSS animation to chart
        />
      </div>

      <div className="grid grid-cols-5 gap-4 mt-6">
        {days.map((day, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm p-3 rounded-xl border border-white/20 dark:border-gray-600/30 shadow-sm flex flex-col items-center"
          >
            <p className="text-gray-600 dark:text-gray-300 font-medium">
              {labels[index]}
            </p>
            <div className="my-2 text-3xl">
              {getWeatherIconComponent(day.weather[0].icon)}
            </div>
            <div className="flex space-x-2">
              <span className="text-red-500 font-bold">
                {convertToBengaliNumber(Math.round(day.main.temp_max))}°
              </span>
              <span className="text-blue-500 font-bold">
                {convertToBengaliNumber(Math.round(day.main.temp_min))}°
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default ForecastChart