// src\utils\request.js
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.baseURL =
  'https://www.fastmock.site/mock/f0e8ab5c5c19862e24bf5456d3cfca8f/api'
//定义post请求
const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
      (response) => {
        resolve(response)
      },
      (error) => {
        reject(error)
      }
    )
  })
}
// 定义get请求
const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
export { post, get }
