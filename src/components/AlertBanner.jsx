import { convertToBengaliNumber } from '../utils/helpers'

const AlertBanner = ({ weather }) => {
  if (!weather.rain && !weather.snow && weather.wind.speed < 20) {
    return null
  }

  const getAlertType = () => {
    if (weather.rain && weather.rain['1h'] > 10) return 'heavy-rain'
    if (weather.snow && weather.snow['1h'] > 5) return 'heavy-snow'
    if (weather.wind.speed >= 20) return 'high-wind'
    return 'weather-alert'
  }

  const alertType = getAlertType()

  const alertMessages = {
    'heavy-rain': {
      title: 'ভারী বৃষ্টিপাতের সতর্কতা',
      message: `গত এক ঘণ্টায় ${convertToBengaliNumber(weather.rain['1h'])} মিমি বৃষ্টিপাত হয়েছে। সতর্ক থাকুন।`,
      icon: '⛈️',
      color: 'bg-blue-100 border-blue-500 text-blue-700',
    },
    'heavy-snow': {
      title: 'তুষারপাতের সতর্কতা',
      message: `গত এক ঘণ্টায় ${convertToBengaliNumber(weather.snow['1h'])} সেমি তুষারপাত হয়েছে। সতর্ক থাকুন।`,
      icon: '❄️',
      color: 'bg-blue-100 border-blue-500 text-blue-700',
    },
    'high-wind': {
      title: 'দুর্দণ্ড ঝড়ের সতর্কতা',
      message: `বাতাসের গতি ${convertToBengaliNumber(weather.wind.speed)} কিমি/ঘণ্টা। বাইরে যাওয়ার সময় সতর্ক থাকুন।`,
      icon: '🌬️',
      color: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    },
    'weather-alert': {
      title: 'আবহাওয়া সতর্কতা',
      message: 'বর্তমান আবহাওয়ার অবস্থার জন্য সতর্ক থাকুন।',
      icon: '⚠️',
      color: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    },
  }

  const alert = alertMessages[alertType]

  return (
    <div className={`${alert.color} border-l-4 p-4 mb-6`}>
      <div className="flex items-start">
        <span className="text-2xl mr-3">{alert.icon}</span>
        <div>
          <h3 className="font-bold text-lg">{alert.title}</h3>
          <p>{alert.message}</p>
        </div>
      </div>
    </div>
  )
}

export default AlertBanner