export const convertToBengaliNumber = (number) => {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return number.toString().replace(/\d/g, (digit) => bengaliDigits[digit])
  }
  
  export const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }
  
  export const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('bn-BD', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  
  export const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
  
  export const getWindDirection = (degrees) => {
    const directions = ['উত্তর', 'উত্তর-পূর্ব', 'পূর্ব', 'দক্ষিণ-পূর্ব', 'দক্ষিণ', 'দক্ষিণ-পশ্চিম', 'পশ্চিম', 'উত্তর-পশ্চিম']
    const index = Math.round((degrees % 360) / 45) % 8
    return directions[index]
  }
  
  export const getPressureTrend = (current, previous) => {
    if (!previous) return 'স্থিতিশীল'
    const diff = current - previous
    if (diff > 2) return 'বৃদ্ধি পাচ্ছে'
    if (diff < -2) return 'হ্রাস পাচ্ছে'
    return 'স্থিতিশীল'
  }