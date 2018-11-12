/*
 * @Author: Tom
 * @Date: 2018-11-12 17:36:21
 * @Last Modified by: Tom
 * @Last Modified time: 2018-11-12 19:45:21
 * @功能: 字段名：userId , 字段值: 'ford' + 16位随机码, 有效期 7 天
 */
import Cookies from 'js-cookie'

let userId = Cookies.get('userId')

if (!userId) {
  let randomNum = Math.floor(Math.random() * 10 ** 16)

  userId = `ford${randomNum}`

  Cookies.set('userId', userId, { expires: 7 })
}

export default userId

/* 引用自 https://github.com/js-cookie/js-cookie */
