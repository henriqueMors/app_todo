import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL })

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
}

const handlers = {
  INITIALIZED: (state, action) => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  LOGIN: (state, action) => {
    const { user } = action.payload
    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload
    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const setSession = (token) => {
  if (token) {
    localStorage.setItem('accessToken', token)
    api.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    localStorage.removeItem('accessToken')
    delete api.defaults.headers.common.Authorization
  }
}

export const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Ao abrir o app: verifica se já existe token salvo
  useEffect(() => {
    const initialize = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        if (token) {
          setSession(token)
          const response = await api.get('/auth/me')
          dispatch({ type: 'INITIALIZED', payload: { isAuthenticated: true, user: response.data } })
        } else {
          dispatch({ type: 'INITIALIZED', payload: { isAuthenticated: false, user: null } })
        }
      } catch (error) {
        setSession(null)
        dispatch({ type: 'INITIALIZED', payload: { isAuthenticated: false, user: null } })
      }
    }
    initialize()
  }, [])

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const { access_token, user } = response.data
    setSession(access_token)
    dispatch({ type: 'LOGIN', payload: { user } })
  }

  const register = async (nome, email, password) => {
    const response = await api.post('/auth/register', { nome, email, password })
    const { access_token, user } = response.data
    setSession(access_token)
    dispatch({ type: 'REGISTER', payload: { user } })
  }

  const logout = () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ ...state, method: 'jwt', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}