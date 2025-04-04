import axios from 'axios'

const axiosConfigMock = axios.create({
  baseURL: 'https://banko-backend.stacklevel.group',
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosConfigMock.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosConfigMock.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosConfigMock
