import { query, getWeatherAndLocation } from '../../api/views/Talk'
// import Vue from 'vue'

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
  },
  dropdownValue: '0',
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

  // 更新
  SET_DROPDOWN_VALUE: (state, value) => {
    state.dropdownValue = value
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
    const { value } = state
    const msg = payload || value
    // 1.更新对话框内容
    commit('SET_DIALOG_VALUE', { side: 'right', msg, type: 'text' })
    // 2.调用AI接口，并呈递回答，再次更新对话框内容
    dispatch('api_query', msg)
    // 3.清空输入框
    commit('SET_INPUT_VALUE', '')
  },

  // 更新用户身份信息
  set_userId: ({ commit }, value) => {
    commit('SET_USERID', value)
  },

  // 把用户问题发送给后端
  api_query: async ({ commit, state }, question) => {
    // Http请求
    const apiData = await api_query(question)
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

  dateForbid: ({ commit }, value) => {
    commit('SET_DATEFLAG', value)
  },

  setDropdownValue: ({ commit }, value) => {
    commit('SET_DROPDOWN_VALUE', value)
  }
}

// eslint-disable-next-line
const api_query = async value => {
  // 入参
  const params = { query: value }
  // http请求
  const res = await query(params)
  // 格式化数据
  let apiData = res.data

  if (apiData.action === 'give_me_city') {
    const newRes = await query({
      query: '上海市'
    })
    apiData = newRes.data
  }

  // apiData.action === 'give_me_city'
  // 返回目标数据
  return apiData
}

export default {
  state,
  getters,
  mutations,
  actions
}
