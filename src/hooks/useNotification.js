import { useEffect, useState } from 'react'
import { alertService } from '../services/alertService';

export const useNotification = () => {
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const handleAlert = (alert) => {
      setNotification(alert)
      setTimeout(() => setNotification(null), 5000)
    }

    alertService.subscribe(handleAlert)

    return () => {
      alertService.unsubscribe(handleAlert)
    }
  }, [])

  return notification
}
