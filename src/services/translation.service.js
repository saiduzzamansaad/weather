import { useState, useEffect } from 'react';

const translations = {
  en: {
    bangladesh_weather: "Bangladesh Weather",
    weather_report: "Weather Report",
    weather_data: "Weather Data",
    current_weather_data: "Current Weather Data",
    generated_on: "Generated on",
    parameter: "Parameter",
    value: "Value",
    temperature: "Temperature",
    feels_like: "Feels Like",
    humidity: "Humidity",
    wind_speed: "Wind Speed",
    pressure: "Pressure",
    weather: "Weather",
    date: "Date",
    high: "High",
    low: "Low",
    conditions: "Conditions",
    // Add more translations as needed
  },
  bn: {
    bangladesh_weather: "বাংলাদেশের আবহাওয়া",
    weather_report: "আবহাওয়া রিপোর্ট",
    weather_data: "আবহাওয়ার তথ্য",
    current_weather_data: "বর্তমান আবহাওয়ার তথ্য",
    generated_on: "তৈরি করা হয়েছে",
    parameter: "প্যারামিটার",
    value: "মান",
    temperature: "তাপমাত্রা",
    feels_like: "অনুভূত হচ্ছে",
    humidity: "আর্দ্রতা",
    wind_speed: "বাতাসের গতি",
    pressure: "চাপ",
    weather: "আবহাওয়া",
    date: "তারিখ",
    high: "সর্বোচ্চ",
    low: "সর্বনিম্ন",
    conditions: "অবস্থা",
    // Add more translations as needed
  }
};

export const translate = (key, lang = 'bn') => {
  return translations[lang][key] || key;
};

export const useTranslation = () => {
  const [language, setLanguage] = useState('bn');

  const t = (key) => translate(key, language);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('weatherDashboardLang', lang);
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('weatherDashboardLang') || 'bn';
    setLanguage(savedLang);
  }, []);

  return { t, language, changeLanguage };
};