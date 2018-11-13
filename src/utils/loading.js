/*
 * @Author: Tom
 * @Date: 2018-11-13 16:56:49
 * @Last Modified by: Tom
 * @Last Modified time: 2018-11-13 17:06:35
 */

import { Loading } from 'element-ui'

let loading = null

const loadingStart = () => {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)',
    duration: 3 * 1000
  })
}

const loadingEnd = () => {
  loading.close()
}

export { loadingStart, loadingEnd }
