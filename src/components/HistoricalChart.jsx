import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format, subDays } from 'date-fns';
import { bn } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

const HistoricalChart = ({ historicalData }) => {
  const data = {
    datasets: [
      {
        label: 'সর্বোচ্চ তাপমাত্রা',
        data: historicalData.map(item => ({
          x: new Date(item.dt * 1000),
          y: item.temp.max
        })),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        label: 'সর্বনিম্ন তাপমাত্রা',
        data: historicalData.map(item => ({
          x: new Date(item.dt * 1000),
          y: item.temp.min
        })),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          title: (context) => format(new Date(context[0].raw.x), 'PPP', { locale: bn }),
          label: (context) => `${context.dataset.label}: ${context.raw.y}°C`
        }
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'PPP',
          displayFormats: {
            day: 'MMM d'
          }
        },
        adapters: {
          date: {
            locale: bn
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'তাপমাত্রা (°C)'
        }
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        ৩০ দিনের ঐতিহাসিক তথ্য
      </h2>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default HistoricalChart;