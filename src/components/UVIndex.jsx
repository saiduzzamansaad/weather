import { convertToBengaliNumber } from '../utils/helpers'

const UVIndex = ({ uvIndex }) => {
  const getUVLevel = (uv) => {
    if (uv <= 2) return { level: 'নিম্ন', risk: 'সাধারণ', color: 'bg-green-500', text: 'text-green-800', bg: 'bg-green-100' }
    if (uv <= 5) return { level: 'মধ্যম', risk: 'সতর্কতা', color: 'bg-yellow-500', text: 'text-yellow-800', bg: 'bg-yellow-100' }
    if (uv <= 7) return { level: 'উচ্চ', risk: 'সানস্ক্রিন প্রয়োজন', color: 'bg-orange-500', text: 'text-orange-800', bg: 'bg-orange-100' }
    if (uv <= 10) return { level: 'অত্যন্ত উচ্চ', risk: 'ছায়ায় থাকুন', color: 'bg-red-500', text: 'text-red-800', bg: 'bg-red-100' }
    return { level: 'চরম', risk: 'বাইরে যাবেন না', color: 'bg-purple-500', text: 'text-purple-800', bg: 'bg-purple-100' }
  }

  const uvData = getUVLevel(uvIndex)

  return (
    <div className={`${uvData.bg} dark:bg-gray-700 rounded-lg p-4 shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-lg dark:text-white">UV সূচক</h3>
          <p className={`${uvData.text} dark:text-white font-semibold`}>{convertToBengaliNumber(uvIndex.toFixed(1))} - {uvData.level}</p>
          <p className="text-sm dark:text-gray-300 mt-1">{uvData.risk}</p>
        </div>
        <div className={`w-12 h-12 ${uvData.color} rounded-full flex items-center justify-center text-white font-bold`}>
          {convertToBengaliNumber(uvIndex.toFixed(1))}
        </div>
      </div>
      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-600">
          <div 
            className={`${uvData.color} h-2.5 rounded-full`} 
            style={{ width: `${Math.min(100, (uvIndex / 12) * 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs mt-1 dark:text-gray-300">
          <span>0</span>
          <span>3</span>
          <span>6</span>
          <span>9</span>
          <span>12</span>
        </div>
      </div>
    </div>
  )
}

export default UVIndex