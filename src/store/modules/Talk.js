import { query, getWeatherAndLocation } from '../../api/views/Talk'

const state = {
  userId: undefined, // 用户身份标识
  dialog: [
    {
      side: 'left',
      msg: '您好，我是AI助理福小兔，很高兴为您服务～',
      type: 'text'
    },
    { type: 'card' }
  ], // 对话数据
  value: '', // 当前输入框的值
  userInfo: {
    weather: '', // 天气
    location: '', // 位置
    temperature: '' // 温度
  }
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

  // 更新天气和位置
  SET_WEATHER_LOCATION: (state, { weather, location, temperature }) => {
    state.userInfo.weather = weather
    state.userInfo.location = location
    state.userInfo.temperature = temperature
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
    console.log('submit run')
    const msg = payload || state.value
    // 1.更新对话框内容
    commit('SET_DIALOG_VALUE', { side: 'right', msg, type: 'text' })
    // 2.调用AI接口，并呈递回答
    dispatch('api_query')
    // 3.清空输入框
    commit('SET_INPUT_VALUE', '')
  },

  // 更新用户身份信息
  set_userId: ({ commit }, value) => {
    commit('SET_USERID', value)
  },

  // 把用户问题发送给后端
  api_query: async ({ commit, state }) => {
    // 入参
    const params = { query: state.value }
    // http请求
    const res = await query(params)
    // 格式化数据
    const apiData = res.data

    console.log('apiData =', apiData)
    // 把AI的回复内容添加至State
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
  }
}

// const api_query = async value => {
//   // 入参
//   const params = { qurey: value }
//   // http请求
//   const res = await query(params)
//   // 格式化数据
//   const apiData = res.data
//   // 返回目标数据
//   return apiData
// }

export default {
  state,
  getters,
  mutations,
  actions
}
