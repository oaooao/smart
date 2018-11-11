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
export default {
  props: {
    unavailableDate: {
      type: Object
    }
  },
  created () {
    // console.log(this.unavailableDate)
  },
  data () {
    return {
      xDate: this.unavailableDate,
      flag: false,
      options: {
        disabledDate: date => {
          console.log('test =', this.xDate)
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
      handlePickDate (a, b) {
        console.log('a =', a)
        console.log('b =', b)
      }
    }
  }
}
</script>

<style lang="less">
.ford-datePicker {
}
</style>
