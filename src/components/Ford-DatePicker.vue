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
    }
  },
  created () {
    // console.log(this.unavailableDate)
  },
  methods: {
    ...mapActions(['api_query', 'dateForbid', 'togglePanel', 'api_setShopData'])
  },
  data () {
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
        // const sname_id = this.sname_id
        // const pickedDate = new Date(date)
        // const year = pickedDate.getFullYear()
        // const month = pickedDate.getMonth() + 1
        // const day = pickedDate.getDate()

        this.dateForbid(true)

        this.togglePanel('-1')

        await this.api_query({ value: date })

        // this.api_setShopData({ sname_id, year, month, day })
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

<style lang="less">
.ford-datePicker {
}
</style>
