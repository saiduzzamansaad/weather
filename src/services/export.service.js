import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { translate } from './translation.service';

export const exportToPDF = (weatherData, forecastData, language = 'bn') => {
  const doc = new jsPDF();
  const t = (key) => translate(key, language);

  // Title
  doc.setFontSize(20);
  doc.setTextColor(41, 128, 185);
  doc.text(`${weatherData.name} ${t('weather_report')}`, 105, 20, { align: 'center' });

  // Current weather table
  doc.autoTable({
    startY: 30,
    head: [[t('parameter'), t('value')]],
    body: [
      [t('temperature'), `${weatherData.main.temp}°C`],
      [t('feels_like'), `${weatherData.main.feels_like}°C`],
      [t('humidity'), `${weatherData.main.humidity}%`],
      [t('wind_speed'), `${weatherData.wind.speed} m/s`],
      [t('pressure'), `${weatherData.main.pressure} hPa`],
      [t('weather'), weatherData.weather[0].description],
    ],
    theme: 'grid',
    headStyles: { 
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    }
  });

  // Forecast table
  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 20,
    head: [[t('date'), t('high'), t('low'), t('conditions')]],
    body: forecastData.list.map(item => [
      new Date(item.dt * 1000).toLocaleDateString(language),
      `${item.main.temp_max}°C`,
      `${item.main.temp_min}°C`,
      item.weather[0].description
    ]),
    theme: 'grid',
    headStyles: { 
      fillColor: [39, 174, 96],
      textColor: 255,
      fontStyle: 'bold'
    }
  });

  // Footer
  const date = new Date().toLocaleString(language);
  doc.setTextColor(100);
  doc.setFontSize(10);
  doc.text(`${t('generated_on')}: ${date}`, 14, doc.internal.pageSize.height - 10);

  // Save the PDF
  doc.save(`${weatherData.name}_${t('weather_report')}.pdf`);
};

export const exportToCSV = (weatherData, forecastData, language = 'bn') => {
  const t = (key) => translate(key, language);
  let csvContent = "data:text/csv;charset=utf-8,";
  
  // Header
  csvContent += `${weatherData.name} ${t('weather_report')}\n\n`;
  
  // Current weather header
  csvContent += `${t('current_weather_data')}\n`;
  csvContent += `${t('parameter')},${t('value')}\n`;
  
  // Current weather data
  csvContent += `${t('temperature')},${weatherData.main.temp}°C\n`;
  csvContent += `${t('feels_like')},${weatherData.main.feels_like}°C\n`;
  csvContent += `${t('humidity')},${weatherData.main.humidity}%\n`;
  csvContent += `${t('wind_speed')},${weatherData.wind.speed} m/s\n`;
  csvContent += `${t('pressure')},${weatherData.main.pressure} hPa\n`;
  csvContent += `${t('weather')},${weatherData.weather[0].description}\n\n`;
  
  // Forecast header
  csvContent += `${t('date')},${t('high')},${t('low')},${t('conditions')}\n`;
  
  // Forecast data
  forecastData.list.forEach(item => {
    csvContent += `${new Date(item.dt * 1000).toLocaleDateString(language)},`;
    csvContent += `${item.main.temp_max}°C,`;
    csvContent += `${item.main.temp_min}°C,`;
    csvContent += `${item.weather[0].description}\n`;
  });
  
  // Footer
  csvContent += `\n${t('generated_on')}: ${new Date().toLocaleString(language)}`;
  
  // Create download link
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${weatherData.name}_${t('weather_data')}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToImage = (elementId, fileName) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  html2canvas(element).then(canvas => {
    const link = document.createElement('a');
    link.download = `${fileName || 'weather'}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
};