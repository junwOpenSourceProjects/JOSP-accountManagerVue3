import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8088/api',
  timeout: 30000
})

request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== undefined && res.code !== 200 && res.code !== 0) {
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res.data !== undefined ? res.data : res
  },
  error => Promise.reject(error)
)

export default request
