import axios from 'axios'

// json ==> string 的工具方法
import jsonToQuery from '../../utils/jsonToQuery'

// 构建axios实例
const axiosInstance = axios.create({
  // baseURL: 'http://172.20.10.8:9090/robot',
  // baseURL: 'http://172.20.10.4:9090/robot',
  baseURL: '/robot'
  // withCredentials: false
})

// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // Do something with response data
    return response
  },
  error => {
    // Do something with response error
    return Promise.reject(error)
  }
)

// 封装http请求
// 因为目前后端打算所有的请求都设置成post类型的,并且在url后面附加queryString传递参数，所以据此封装了如下的http函数
const http = (url, params) => {
  // let finaUrl = data ? url : url + jsonToQuery(data)
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
