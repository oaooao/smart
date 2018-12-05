const getCoordinate = success => {
  const handleSuccess = data => {
    const {
      latitude, // 纬度
      longitude // 经度
    } = data.coords

    // 打印出来看看
    console.log('latitude =', latitude)
    console.log('longitude =', longitude)
    success({ latitude, longitude })
  }

  const handleError = error => {
    switch (error.code) {
      case 1:
        console.log('位置服务请求被拒绝')
        break
      case 2:
        console.log('暂时获取不到位置信息')
        break
      case 3:
        console.log('获取信息超时')
        break
      case 4:
        console.log('未知错误')
        break
    }
  }

  const opt = {
    // 高精确度： true / false
    enableHighAccuracy: true,
    // 等待响应的最长时间 单位：毫秒
    timeout: 5 * 1000,
    // 应用程序愿意接受的缓存位置的最大年限
    maximumAge: 0
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, opt)
  } else {
    alert('Geolocation is not supported in your browser')
  }
}

export default getCoordinate
