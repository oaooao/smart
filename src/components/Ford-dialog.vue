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
              </div>

              <!-- 预约试驾意图 -->
              <div class="text" v-else-if="dialog.intention === '补贴' || dialog.intention === '预约试驾'">
                  <span v-if="!dialog.msg">
                    {{ dialog.s1 }}
                  </span>
                  <span v-if="dialog.s1">
                    {{ dialog.location }}
                  </span>
                  <!-- <Ford-CityPicker :msg="dialog.msg" :location="dialog.location"></Ford-CityPicker> -->
                  <span v-if="!dialog.msg">
                    {{dialog.comma + dialog.s2 }}
                  </span>
                  <!-- 城市选择 -->
                  <Ford-CityPicker :msg="dialog.msg" :location="dialog.location"></Ford-CityPicker>
                  <span>{{ dialog.s4 }}</span>
                  <span>
                    {{ dialog.msg }}
                  </span>

                  <div v-if="!dialog.msg" style="marginBottom: 10px">
                    <Table :columns="columns" :data="tableData" v-if="dialog.intention === '补贴'" border></Table>
                  </div>

                  <span v-if="!dialog.msg" style="fontStyle: italic; fontSize: 13px">{{ dialog.s3 }}</span>
              </div>

              <!-- <div class="text" v-else-if="dialog.intention === '补贴'">
                  {{ dialog.s1 }}
              </div> -->

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
                          <Ford-DatePicker :unavailableDate="item.unavailable_date" :sname_id="item.sname_id"></Ford-DatePicker>
                        </p>
                    </Panel>
        </Collapse>
      </div>
    </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import FordDatePicker from './Ford-DatePicker'
import FordCityPicker from './Ford-CityPicker'

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

export default {
  components: {
    'Ford-DatePicker': FordDatePicker,
    'Ford-CityPicker': FordCityPicker
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
  updated() {
    // setTimeout(() => {
    document.getElementById('dialog-wrapper').lastElementChild.scrollIntoView()
    // }, 500)
  },
  computed: {
    ...mapState({
      Talk: state => state.Talk
    }),

    position: {
      set(value) {
        this.setPosition(value)
      },
      get() {
        return this.Talk.position
      }
    },

    // 控制三个4S店折叠面板的Value
    dropdownValue: {
      get() {
        return this.Talk.dropdownValue
      },
      set(v) {
        this.setDropdownValue(v)
      }
    }
  },
  data() {
    return {
      cards: cards,
      value: '-1',
      options: {
        disabledDate(date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      columns: [
        { title: this.dialog.k1, key: 'column1', align: 'center' },
        { title: this.dialog.k2, key: 'column2', align: 'center' },
        { title: this.dialog.k3, key: 'column3', align: 'center' }
      ],
      tableData: [
        {
          column1: this.dialog.v1,
          column2: this.dialog.v2,
          column3: this.dialog.v3
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'setInputValue',
      'submit',
      'updateDialogValue',
      'setDropdownValue',
      'setPosition'
    ]),

    handleCardsClick(data) {
      this.setInputValue(data)
      this.submit(data)
      this.$nextTick(() => {
        this.position = 'absolute'
        document
          .getElementById('dialog-wrapper')
          .lastElementChild.scrollIntoView()
      })
      const obj = document.getElementById('show')
      console.log(
        '滚到底了吗',
        obj.scrollHeight - obj.scrollTop === obj.clientHeight
      )
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
    padding: 7px 20px;
    border-radius: 4px;
    font-size: 14px;
    max-width: 540px;

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
  }

  .arrow {
    left: -6px;
    box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
    background-color: @left-bg;
  }

  .ivu-table-wrapper {
    margin-top: 13px;
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
