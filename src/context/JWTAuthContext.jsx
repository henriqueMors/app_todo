import { createContext, useContext, useEffect, useReducer } from 'react'
import axios from '../services/axios'
import { isValidToken } from '../utils/jwt'
import { setSession, resetSession } from '../utils/session'

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
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Ao abrir o app: verifica se já existe um token salvo e válido
  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken)
          const response = await axios.get('/users/me')
          dispatch({ type: 'INITIALIZED', payload: { isAuthenticated: true, user: response.data } })
        } else {
          dispatch({ type: 'INITIALIZED', payload: { isAuthenticated: false, user: null } })
        }
      } catch (error) {
        resetSession()
        dispatch({ type: 'INITIALIZED', payload: { isAuthenticated: false, user: null } })
      }
    }

    initialize()
  }, [])

  const login = async (email, password) => {
    const formData = new URLSearchParams()
    formData.append('username', email)
    formData.append('password', password)

    const response = await axios.post('/auth/login', formData)
    const { access_token, refresh_token } = response.data
    setSession(access_token, refresh_token)

    const me = await axios.get('/users/me')
    dispatch({ type: 'LOGIN', payload: { user: me.data } })
  }

  const register = async (dados) => {
    const response = await axios.post('/users/adiciona', dados)
    return response.data
  }

  const logout = () => {
    resetSession()
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider value={{ ...state, method: 'jwt', login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)