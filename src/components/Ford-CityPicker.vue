<template>
    <!-- 城市选择 -->
      <Dropdown v-if="!msg" trigger="click" @on-click="handleSelectCity">
          <Button type="info" size="small">
              {{ location }}
              <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list" v-for="item in citys" :key="item.id">
            <DropdownItem :name="item.cityName" :disabled="location===item.cityName">{{item.cityName}}</DropdownItem>
          </DropdownMenu>
      </Dropdown>
</template>

<script>
import { mapActions } from 'vuex'

// 城市信息
const citys = [
  { cityName: '上海市', id: '001' },
  { cityName: '北京市', id: '002' },
  { cityName: '天津市', id: '003' },
  { cityName: '杭州市', id: '004' },
  { cityName: '广州市', id: '005' },
  { cityName: '深圳市', id: '006' },
  { cityName: '其他城市', id: '007' }
]

export default {
  props: {
    msg: {
      type: String
    },
    location: {
      type: String
    }
  },

  data() {
    return {
      citys: citys
    }
  },

  methods: {
    ...mapActions(['submit']),
    // 更改城市
    handleSelectCity(e) {
      this.submit(e)
    }
  }
}
</script>
