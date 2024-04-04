import axios from 'axios'
import { parseCookies } from 'nookies'

let url =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? process.env.NEXT_PUBLIC_PROD
    : process.env.NEXT_PUBLIC_DEV

// const getAuthToken = () => {
//   const storedToken =
//     typeof localStorage !== 'undefined' && localStorage.getItem('token')
//   return storedToken ? JSON.parse(storedToken) : null
// }

const Axios = axios.create({
  baseURL: url,
})

Axios.interceptors.request.use(
  (config) => {
    const cookies = parseCookies(config as any)

    const token = cookies.token

    if (token) {
      config.headers.Authorization = 'Bearer ' + token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export { Axios }
