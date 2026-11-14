import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Sempre que o token mudar, coloca ou retira ele das requisições
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      localStorage.setItem('token', token)
    } else {
      delete api.defaults.headers.common['Authorization']
      localStorage.removeItem('token')
    }
    setLoading(false)
  }, [token])

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    setToken(response.data.access_token)
    setUser(response.data.user)
  }

  const register = async (nome, email, password) => {
    await api.post('/auth/register', { nome, email, password })
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isAuthenticated: !!token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)