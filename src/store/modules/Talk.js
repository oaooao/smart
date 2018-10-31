const state = {
  userId: undefined,
  dialog: [{ side: 'left', text: '有什么想要对我说的吗？' }],
  value: ''
}

const getters = {}

const mutations = {
  // 更新输入框的值
  SET_INPUT_VALUE: (state, value) => {
    state.value = value
  },

  // 更新对话框的状态
  SET_DIALOG_VALUE: state => {
    state.dialog.push({
      side: 'right',
      text: state.value
    })
    // 测试用例
    setTimeout(() => {
      state.dialog.push({
        side: 'left',
        text: '今天天气很晴朗～'
      })
    }, 700)
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
  submit: ({ commit }) => {
    commit('SET_DIALOG_VALUE')
    commit('SET_INPUT_VALUE', '')
  },

  // 更新用户身份信息
  set_userId: ({ commit }, value) => {
    commit('SET_USERID', value)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
