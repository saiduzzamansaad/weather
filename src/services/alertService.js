let subscribers = []

export function subscribeToAlerts(callback) {
  subscribers.push(callback)
}

export function unsubscribeFromAlerts(callback) {
  subscribers = subscribers.filter(sub => sub !== callback)
}

export function notifyAlert(message, type = 'info') {
  subscribers.forEach(callback => callback({ message, type }))
}

// ভবিষ্যতের জন্য mock extreme alert fetcher
export async function fetchExtremeAlerts() {
  // এখানে API call বসাতে পারো, এখনো mock দিচ্ছি
  return [
    {
      title: 'ঘূর্ণিঝড় সতর্কতা',
      description: 'উপকূলীয় এলাকায় ৭ নম্বর বিপদ সংকেত।',
      severity: 'extreme',
    },
  ];
}
