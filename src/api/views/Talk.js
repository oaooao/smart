import http from '../http/index'

// 获取聊天记录
const getChatRecord = data => http('', data)

// 上传聊天记录
const updateChatRecord = data => http('', data)

// 对话查询
const query = data => http('/query', data)

// 定位
const getLocation = data => http('/getLocation', data)

// 天气
const weather = data => http('/weather', data)

export { getChatRecord, updateChatRecord, query, getLocation, weather }
