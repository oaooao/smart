<template>
    <div>
      <!-- 文字对话内容 -->

      <div v-bind:class="['dialog-' + dialog.side]" v-if="dialog.side && (dialog.type === 'text' || !dialog.type)">
          <!-- 头像 -->

          <div class="avatar">
              <!-- 机器人头像 -->
              <img v-if="dialog.side === 'left'" src="@/assets/images/fordLogo.png" alt="">
              <!-- 用户头像 -->
              <img v-else src="@/assets/wx-icon.jpeg" alt="">
          </div>

          <!-- 内容 -->

          <div class="content">
              <!-- 默认意图 -->
              <div class="text" v-if="!dialog.intention">
                  {{ dialog.msg }}
                  <!-- 根据GPS定位，您当前所在位置为: <span class="dialog.location">上海[更改]</span>,
                  国补的金额会根据电池密度和续航里程等不同而有所区别，以福特汽车旗下的Territory纯电动车为例，国补金额为45000元。上海地补金额对于纯电动车按照国补50%补助，所以地补金额为225000元。补贴金额总计67500元。 -->
              </div>
              <!-- 预约试驾意图 -->
              <div class="text" v-else-if="dialog.intention === '补贴' || dialog.intention === '预约试驾'">
                  <!-- {{ dialog.s1 + dialog.location + ',' + dialog.s2 + dialog.msg }} -->
                  <span>
                    {{ dialog.s1 }}
                  </span>
                  <!-- 城市选择 -->
                  <Dropdown v-if="!dialog.msg" trigger="click" @on-click="handleSelectCity">
                      <Button type="info" size="small">
                          {{ dialog.location }}
                          <Icon type="ios-arrow-down"></Icon>
                      </Button>

                      <DropdownMenu slot="list" v-for="item in citys" :key="item.id">
                        <DropdownItem :name="item.cityName" :disabled="dialog.location===item.cityName">{{item.cityName}}</DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
                  <span>
                    {{dialog.comma + dialog.s2 + dialog.msg}}
                  </span>
              </div>
              <!-- 对话框箭头 -->
              <div class="arrow"></div>
          </div>

      </div>

      <!-- FAQ知识卡片 -->

      <div v-else-if="dialog.type === 'card'" class="card">
        <Card v-for="item in cards" :key="item.id" >
          <p slot="title">{{ item.title }}</p>
          <img :src="require(`@/assets/images/${item.imgUrl}.jpg`)" alt="" @click="handleCardsClick(item.title)">
        </Card>
      </div>

      <!-- 预约试驾的三个模态框 -->

      <div v-if="dialog.side && dialog.intention === '预约试驾'" class="x">
        <Collapse v-model="dropdownValue" accordion >
                    <Panel :name="''+index" v-for="(item, index) in carShopInfo" :key="item.sname_id">
                        {{ `${item.sname}(${item.saddress})` }}
                        <p slot="content" class="x_mid">
                          <!-- <DatePicker type="date" placeholder="请选择预约日期" style="width: 240px" size="large" :options="options"></DatePicker> -->
                          <Ford-DatePicke :unavailableDate="item.unavailable_date" :sname_id="item.sname_id"></Ford-DatePicke>
                        </p>
                    </Panel>
        </Collapse>
      </div>
    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import FordDatePicke from './Ford-DatePicker'

// 四张卡牌的信息
const cards = [
  {
    title: '补贴政策查询',
    imgUrl: 'btzc'
  },
  {
    title: '预约试驾',
    imgUrl: 'yysj'
  },
  {
    title: '领界纯电价格',
    imgUrl: 'ljjg'
  },
  {
    title: '上海车展',
    imgUrl: 'gnc2'
  }
]

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
  components: {
    'Ford-DatePicke': FordDatePicke
  },
  props: {
    location: {
      type: String
    },
    carShopInfo: {
      type: Array
    },
    dialog: {
      type: Object
    }
  },
  updated () {
    // setTimeout(() => {
    document.getElementById('dialog-wrapper').lastElementChild.scrollIntoView()
    // }, 500)
  },
  computed: {
    ...mapState({
      Talk: state => state.Talk
    }),

    // 控制三个4S店折叠面板的Value
    dropdownValue: {
      get () {
        return this.Talk.dropdownValue
      },
      set (v) {
        this.setDropdownValue(v)
      }
    }
  },
  data () {
    return {
      cards: cards,
      citys: citys,
      value: '-1',
      options: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'setInputValue',
      'submit',
      'updateDialogValue',
      'setDropdownValue'
    ]),

    handleCardsClick (data) {
      this.setInputValue(data)
      this.submit(data)
    },

    // 更改城市
    handleSelectCity (e) {
      console.log('e =', e)
      // this.setInputValue(`${e}`)
      // this.submit(`${e}`)
      this.submit(e)
    }
  }
}
</script>

<style lang="less">
@left-bg: #fff;
@right-bg: #b2e281;

.x_mid {
  display: flex;
  justify-content: center;
}

.base-style {
  display: flex;
  padding: 15px 20px;

  .avatar {
    img {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
  }

  .content {
    margin: 0 10px;
    // text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    border-radius: 4px;
    font-size: 14px;

    .text {
      .ivu-dropdown-rel {
        // margin-left: -20px;
      }
    }

    .arrow {
      position: absolute;
      width: 12px;
      height: 12px;
      transform: rotate(45deg);
      top: 12px;
    }
  }
}

.dialog-left {
  .base-style;

  .content {
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    background-color: @left-bg;
    max-width: 500px;
  }

  .arrow {
    left: -6px;
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    background-color: @left-bg;
  }
}

.dialog-right {
  flex-direction: row-reverse;

  .base-style;

  .content {
    box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    background-color: @right-bg;
  }

  .arrow {
    right: -6px;
    box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
    background-color: @right-bg;
  }
}

.card {
  display: flex;

  // :nth-child(1) :nth-child(2) {
  //   // background-image: url('../assets/images/btzc.jpg');
  //   background-repeat: no-repeat;
  //   background-size: contain;
  // }

  // :nth-child(2) :nth-child(2) {
  //   background: #000;
  // }

  // :nth-child(3) :nth-child(2) {
  //   background: #000;
  // }

  // :nth-child(4) :nth-child(2) {
  //   background: #000;
  // }

  > div {
    flex: 1;
    margin: 0 10px;
    cursor: pointer;
    text-align: center;
    // height: 149px;
    overflow: hidden;

    img {
      width: 100%;
    }

    img.x {
      margin-top: 14px;
    }

    .ivu-card-body {
      // height: 150px;
      padding: 0;
    }
  }
}

.x {
  margin-left: 68px;
  width: 60%;
}
</style>
