import { query, weather } from '../../api/views/Talk'

const state = {
  userId: undefined, // 用户身份标识
  dialog: [
    { side: 'left', text: '您好，我是AI助理福小兔，很高兴为您服务～' },
    { type: 'card' }
  ], // 对话数据
  value: '' // 当前输入框的值
}

const getters = {}

const mutations = {
  // 更新输入框的值
  SET_INPUT_VALUE: (state, value) => {
    state.value = value
  },

  // 更新对话框的数据
  SET_DIALOG_VALUE: (state, { side, text }) => {
    state.dialog.push({ side, text })
  },

  // 更新userId
  SET_USERID: (state, value) => {
    state.userId = value
  }
}

const actions = {
  // 输入
  setInputValue: ({ commit }, value) => {
    commit('SET_INPUT_VALUE', value)
  },

  // 提交
  submit: ({ commit, state, dispatch }, payload) => {
    const value = payload || state.value
    commit('SET_DIALOG_VALUE', {
      side: 'right',
      text: value
    })
    dispatch('api_query')
    dispatch('api_weather')
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

    // const test = await getLocation('')

    // console.log('test =', test)
    // 格式化数据
    const apiData = res.data
    console.log('apiData =', apiData)
    // 更新State
    commit('SET_DIALOG_VALUE', {
      side: 'left',
      text: apiData
    })
  },

  // 请求天气
  api_weather: async ({ commit, state }) => {
    // 入参
    const params = undefined
    // http请求
    const res = await weather(params)
    // 格式化数据
    const apiData = res

    console.log('apiData =', apiData)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
