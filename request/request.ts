import axios from 'axios'

let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV

const getAuthToken = () => {
  const storedToken =
    typeof localStorage !== 'undefined' && localStorage.getItem('token')
  return storedToken ? JSON.parse(storedToken) : null
}

const Axios = axios.create({
  baseURL: url,
})

Axios.interceptors.request.use(
  (config) => {
    const token = getAuthToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token.replace("'", '')}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { Axios }
