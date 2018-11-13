<template>
    <div class="ford-datePicker">
        <DatePicker
            type="date"
            placeholder="请选择预约日期"
            style="width: 240px"
            size="large"
            :open="true"
            @on-change="handlePickDate"
            :options="options">
        </DatePicker>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// import { method } from 'bluebird'

export default {
  props: {
    unavailableDate: {
      type: Object
    },
    sname_id: {
      type: String
    },
    sname: {
      type: String
    },
    saddress: {
      type: String
    }
  },
  created() {
    // console.log(this.unavailableDate)
  },
  methods: {
    ...mapActions(['api_query', 'dateForbid', 'togglePanel', 'api_setShopData'])
  },
  data() {
    return {
      xDate: this.unavailableDate,
      // flag: false,
      options: {
        disabledDate: date => {
          const { year, month, date: day } = this.xDate
          const xDay = date.getDate()
          const xMonth = date.getMonth() + 1
          const xYear = date.getFullYear()
          const judge =
            (date && date.valueOf() < Date.now() - 86400000) ||
            (xYear === year * 1 &&
              xMonth === month * 1 &&
              day.some(item => item * 1 === xDay))
          return this.flag || judge
        }
      },
      handlePickDate: async (date, b) => {
        const { sname, saddress } = this
        // 收集用户的预约信息
        this.$store.commit('SET_SNAME', sname)
        this.$store.commit('SET_SADRESS', saddress)
        // 禁选
        this.dateForbid(true)
        // 关闭日期框
        this.togglePanel('-1')
        // 把用户pick的日期发给后端
        await this.api_query({ value: date })
      }
    }
  },
  computed: {
    ...mapState({
      flag: state => state.Talk.dateFlag
    })
  }
}
</script>
