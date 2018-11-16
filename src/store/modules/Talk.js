import { query, getWeatherAndLocation, setShopData } from '../../api/views/Talk'

const state = {
  position: 'absolute',
  userId: undefined, // 用户身份标识
  dialog: [
    {
      side: 'left',
      msg: '您好，我是AI助理福小兔，很高兴为您服务～',
      type: 'text'
    }
    // { type: 'card' }
  ], // 对话数据
  value: '', // 当前输入框的值
  userInfo: {
    weather: '', // 天气
    location: '', // 位置
    temperature: '' // 温度
  },
  sname: '',
  saddress: '',
  dropdownValue: '-1', // 显示which4S店
  dateFlag: false // 控制日期框的旗帜
}

const getters = {}

const mutations = {
  // 更新输入框的值
  SET_INPUT_VALUE: (state, value) => {
    state.value = value
  },

  // 更新对话框的数据
  SET_DIALOG_VALUE: (state, obj) => {
    state.dialog.push(obj)
  },

  // 更新userId
  SET_USERID: (state, value) => {
    state.userId = value
  },

  // 更新dateFlag
  SET_DATEFLAG: (state, value) => {
    state.dateFlag = value
  },

  // 更新天气和位置
  SET_WEATHER_LOCATION: (state, { weather, location, temperature }) => {
    state.userInfo.weather = weather
    state.userInfo.location = location
    state.userInfo.temperature = temperature
  },

  // 更新显示哪一个下拉框对应的值
  SET_DROPDOWN_VALUE: (state, value) => {
    state.dropdownValue = value
  },

  // 绝对定位
  SET_POSITION: (state, value) => {
    state.position = value
  },

  // 更新SNAME
  SET_SNAME: (state, value) => {
    state.sname = value
  },

  // 更新SNAME
  SET_SADRESS: (state, value) => {
    state.saddress = value
  }
}

const actions = {
  // 更新输入内容
  setInputValue: ({ commit }, value) => commit('SET_INPUT_VALUE', value),

  // 更新对话框内容
  updateDialogValue: ({ commit }, { side, msg, type }) =>
    commit('SET_DIALOG_VALUE', { side, msg, type }),

  // 提交
  submit: ({ commit, state, dispatch }, payload) => {
    const { value, location } = state
    // 优先选择submit的入参，假如没有入参，则默认值为state.value
    let msg = payload || value
    // 1.更新对话框内容
    commit('SET_DIALOG_VALUE', { side: 'right', msg, type: 'text' })
    // 特例（因为百度AI识别不了‘其他城市’）
    if (msg === '其他城市') msg = '合肥市'
    // 2.调用AI接口，并呈递回答，再次更新对话框内容
    dispatch('api_query', { value: msg, location })
    // 3.清空输入框
    commit('SET_INPUT_VALUE', '')
  },

  // 更新用户身份信息
  set_userId: ({ commit }, value) => {
    commit('SET_USERID', value)
  },

  // 把用户问题发送给后端
  api_query: async ({ commit, state }, { value, location }) => {
    const xLocation = location || state.userInfo.location
    // Http请求
    const apiData = await api_query({ value, location: xLocation })
    // test
    console.log('apiData =', apiData)
    // 把AI的回复内容添加至State中的dialog字段,用来更新UI
    commit('SET_DIALOG_VALUE', apiData)
  },

  // 请求天气
  api_weather: async ({ commit, state }) => {
    // 入参
    const params = undefined
    // http请求
    const res = await getWeatherAndLocation(params)
    // 格式化数据
    const apiData = {
      location: res.data[0].currentCity,
      weather: res.data[0].weather_data[0].weather,
      temperature: res.data[0].weather_data[0].temperature
    }
    // 更新store中的数据
    commit('SET_WEATHER_LOCATION', apiData)

    console.log('apiData =', apiData)
  },

  // 控制三个4S店的模态框
  api_setShopData: async ({ commit }, data) => {
    setShopData(data)
  },

  // 让日期框变成不可选
  dateForbid: ({ commit }, value) => {
    commit('SET_DATEFLAG', value)
  },

  // 开关折叠面板
  togglePanel: ({ commit }, value) => {
    commit('SET_DROPDOWN_VALUE', value)
  },

  // 设置对话部分div的position
  setPosition: ({ commit }, value) => {
    commit('SET_POSITION', value)
  }
}

// eslint-disable-next-line
const api_query = async ({ value, location }) => {
  const params = { query: value }
  const res = await query(params)
  let apiData = res.data
  if (apiData.action === 'give_me_city') {
    const newRes = await query({ query: location })
    apiData = newRes.data
  }
  return apiData
}

export default {
  state,
  getters,
  mutations,
  actions
}
