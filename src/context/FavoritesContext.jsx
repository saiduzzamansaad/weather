import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('weatherFavorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (location) => {
    if (!favorites.some(fav => fav.id === location.id)) {
      setFavorites([...favorites, location])
    }
  }

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(fav => fav.id !== id))
  }

  const isFavorite = (id) => {
    return favorites.some(fav => fav.id === id)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)