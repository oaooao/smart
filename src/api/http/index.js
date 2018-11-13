import axios from 'axios'
// json ==> string 的工具方法
import jsonToQuery from '../../utils/jsonToQuery'
// 加载中的效果
import { loadingStart, loadingEnd } from '../../utils/loading'

// 构建axios实例
const axiosInstance = axios.create({
  // baseURL: 'http://172.20.10.8:9090/robot',
  // baseURL: 'http://172.20.10.4:9090/robot',
  baseURL: '/robot'
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    loadingStart()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    loadingEnd()
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

// 封装http请求: 因为目前后端打算所有的请求都设置成post类型的,并且在url后面附加queryString传递参数，所以据此封装了如下的http函数
const http = (url, params) => {
  params = params || {}
  const options = {
    url: url + jsonToQuery(params),
    method: 'post',
    data: undefined
  }
  return axiosInstance(options)
    .then(response => response)
    .catch(error => console.log(error))
}

export default http
