// ভবিষ্যতে API থেকেও data আনতে পারবে
export const fetchSoilData = async (lat, lon) => {
    // Static mock data (later replace with real API)
    return {
      type: 'দোআঁশ মাটি',
      pH: 6.5,
      moisture: 'মাঝারি',
      message: 'এই মাটিতে গম ও সবজি চাষ উপযোগী।'
    };
  };
  
  // আবহাওয়া অনুযায়ী ফসলের সুপারিশ
  export const fetchCropRecommendations = async (weatherCondition) => {
    const recommendations = {
      rain: ['ধান', 'পাট'],
      sunny: ['গম', 'ভুট্টা'],
      cloudy: ['শাকসবজি', 'বেগুন'],
      storm: ['এই আবহাওয়ায় চাষ না করাই ভালো'],
    };
  
    return recommendations[weatherCondition] || ['তথ্য পাওয়া যায়নি'];
  };
  
  // বিশেষ কৃষি পরামর্শ (উদাহরণ)
  export const getFarmingTips = () => {
    return [
      {
        title: 'বর্ষাকালে ধান চাষ',
        description: 'জমি ভালোভাবে চাষ করতে হবে এবং জল নিষ্কাশনের ব্যবস্থা রাখতে হবে।',
      },
      {
        title: 'শুকনো মৌসুমে গম চাষ',
        description: 'গমের জন্য দোআঁশ মাটি ও সঠিক সার প্রয়োগ জরুরি।',
      },
      {
        title: 'পোকামাকড় প্রতিরোধ',
        description: 'নিয়মিত গাছ পর্যবেক্ষণ করে প্রয়োজনমতো জৈব কীটনাশক ব্যবহার করতে হবে।',
      },
    ]
  }
  