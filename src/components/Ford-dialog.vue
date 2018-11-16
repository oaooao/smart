<template>
    <div>
      <!-- 文字对话内容 -->
      <div v-bind:class="['dialog-' + dialog.side]" v-if="dialog.side && (dialog.type === 'text' || !dialog.type)">

          <!-- 头像 -->
          <div class="avatar">
              <!-- 机器人头像 -->
              <img v-if="dialog.side === 'left'" src="@/assets/images/newLogo.jpg" alt="">
              <!-- 用户头像 -->
              <img v-else src="@/assets/wx-icon.jpeg" alt="">
          </div>

          <!-- 内容 -->
          <div class="content">
              <!-- 默认意图 -->
              <div class="text" v-if="!dialog.intention">
                  {{ dialog.msg }}
              </div>

              <!-- 补贴或者预约试驾意图 -->
              <div class="text" v-else-if="dialog.intention === '补贴' || dialog.intention === '预约试驾'">
                  <span v-if="!dialog.msg">
                    {{ dialog.s1 }}
                  </span>
                  <span v-if="dialog.s1">
                    {{ dialog.location }}
                  </span>
                  <span v-if="!dialog.msg">
                    {{dialog.comma + dialog.s2 }}
                  </span>
                  <!-- 城市选择 -->
                  <Ford-CityPicker v-if="dialog.s4" :msg="dialog.msg" :location="dialog.location"></Ford-CityPicker>
                  <span>{{ dialog.s4 }}</span>
                  <span>
                    {{ dialog.msg }}
                  </span>
                  <div v-if="!dialog.msg" style="marginBottom: 10px">
                    <Table :columns="columns" :data="tableData" v-if="dialog.intention === '补贴'" border></Table>
                    <!-- <Table :columns="columns2" :data="tableData2" v-if="dialog.action === 'book_drive_satisfy'" border></Table> -->
                  </div>
                  <span v-if="!dialog.msg" style="fontStyle: italic; fontSize: 13px">{{ dialog.s3 }}</span>
              </div>

              <!-- 对话框箭头 -->
              <div class="arrow"></div>
          </div>

      </div>

      <!-- 用户信息 -->
      <div class="details" v-if="dialog.action === 'book_drive_satisfy'">
        <Card style="width:410px">
          <p slot="title" style="textAlign:center;fontSize:16px">
              预约试驾清单
          </p>
          <ul>
              <li class="row" v-for="item in userInfoArray" :key="item.id">
                <div class="c1">
                  <!-- <Icon type="md-bulb" /> -->
                  <!-- <Icon type="ios-create" /> -->
                  <!-- <Icon type="ios-flame-outline" /> -->
                  <Icon type="ios-leaf" size="17" color="#d85555"/>
                  <span style="marginLeft: 3px;fontWeight: 500">{{ item.title }}</span>
                </div>
                <div class="c2">{{ item.value }}</div>
              </li>
          </ul>
        </Card>
      </div>

      <!-- FAQ知识卡片 -->
      <div v-else-if="dialog.type === 'card'" class="card">
        <Card v-for="item in cards" :key="item.id" >
          <p slot="title" >{{ item.title }}</p>
          <img :src="require(`@/assets/images/${item.imgUrl}.jpg`)" alt="" @click="handleCardsClick(item.title)">
        </Card>
      </div>

      <!-- 预约试驾的三个4S店-->
      <div v-if="dialog.side && dialog.intention === '预约试驾'" class="x">
        <Collapse v-model="dropdownValue" accordion >
          <Panel :name="''+index" v-for="(item, index) in carShopInfo" :key="item.sname_id">
              <!-- 4S店的名称(地址) -->
              {{ `${item.sname}(${item.saddress})` }}
              <p slot="content" class="x_mid">
                <Ford-DatePicker
                  :unavailableDate="item.unavailable_date"
                  :sname="item.sname"
                  :saddress="item.saddress"
                  :sname_id="item.sname_id">
                </Ford-DatePicker>
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
      Talk: state => state.Talk,
      sname: state => state.Talk.sname,
      saddress: state => state.Talk.saddress
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
    },

    userInfoArray() {
      const { name, phone, drive_type, date } =
        this.dialog.userInfo && this.dialog.userInfo
      return [
        { title: '姓名', value: name, id: '0001' },
        { title: '手机号', value: phone, id: '0002' },
        {
          title: '试驾类型',
          value: drive_type,
          id: '0003'
        },
        { title: '预约时间', value: date, id: '0004' },
        { title: '4S店名称', value: this.sname, id: '0004' },
        { title: '4S店地址', value: this.saddress, id: '0005' }
      ]
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
      // userInfoArray: [
      //   { title: '姓名', value: this.dialog.userInfo.name, id: '0001' },
      //   { title: '手机号', value: this.dialog.userInfo.phone, id: '0002' },
      //   {
      //     title: '试驾类型',
      //     value: this.dialog.userInfo.drive_type,
      //     id: '0003'
      //   },
      //   { title: '4S店名称', value: this.sname, id: '0004' },
      //   { title: '4S店地址', value: this.saddress, id: '0005' }
      // ]
    }
  },
  methods: {
    ...mapActions([
      'setInputValue',
      'submit',
      'updateDialogValue',
      'setDropdownValue',
      'setPosition'
    ])
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
  padding: 10px 10px;

  .avatar {
    img {
      width: 40px;
      height: 40px;
      border-radius: 3px;
      border-radius: 50%;
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
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 14px;
    max-width: 540px;

    .text {
      .ivu-dropdown-rel {
        margin-left: 0;
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

.details {
  display: flex;
  margin-left: 5px;

  .ivu-card-body {
    padding: 14px;
  }

  .c1 {
    display: flex;
    align-items: center;
  }

  .row {
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
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
  margin-left: 10px;
  width: 95%;
}
</style>
