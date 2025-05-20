import { useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsAppShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsAppIcon } from 'react-share';

const ShareWeather = ({ weatherData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = window.location.href;
  const shareText = `Current weather in ${weatherData.name}: ${weatherData.main.temp}°C and ${weatherData.weather[0].description}. Check it out!`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-800 dark:text-white">Share Weather</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex space-x-3 mb-4">
            <FacebookShareButton url={shareUrl} quote={shareText}>
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            
            <TwitterShareButton url={shareUrl} title={shareText}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            
            <WhatsAppShareButton url={shareUrl} title={shareText}>
              <WhatsAppIcon size={40} round />
            </WhatsAppShareButton>
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={`${shareText} ${shareUrl}`}
              readOnly
              className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm text-gray-800 dark:text-white"
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareWeather;