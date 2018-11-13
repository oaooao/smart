<template>
    <div>
        <el-input
            v-model="value"
            :placeholder="placeholder"
            prefix-icon="el-icon-location"
            @blur="handleInputBlur"
            @keyup.enter.native="handleEnterCilck"
        />
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  // 组件对外接口定义
  props: {
    // 占位文字
    placeholder: {
      type: String
    },
    // 组件名称
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    // 输入框双向绑定
    value: {
      set(value) {
        this.SET_INPUT_VALUE({
          name: this.name,
          value: value
        })
      },
      get() {
        return this.label[this.name]
      }
    }
  },

  methods: {
    ...mapMutations(['SET_INPUT_VALUE']),

    handleInputBlur(e) {},

    handleEnterCilck(e) {}
  }
}
</script>
