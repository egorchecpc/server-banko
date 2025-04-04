import axios from 'axios'

const axiosConfigFinal = axios.create({
  baseURL: 'https://banko-r-backend.stacklevel.group/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosConfigFinal.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosConfigFinal.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosConfigFinal
