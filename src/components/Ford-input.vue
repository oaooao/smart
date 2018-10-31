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
  props: {
    placeholder: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    value: {
      set (value) {
        this.SET_INPUT_VALUE({
          name: this.name,
          value: value
        })
      },
      get () {
        return this.label[this.name]
      }
    }
  },

  methods: {
    ...mapMutations([]),
    handleInputBlur (e) {},

    handleEnterCilck (e) {}
  }
}
</script>
