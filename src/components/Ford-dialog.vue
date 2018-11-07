<template>
    <div>

    <!-- 文字对话内容 -->
    <div v-bind:class="['dialog-' + side]" v-if="type === 'text'">
        <!-- 头像 -->
        <div class="avatar">
            <img v-if="side === 'left'" src="@/assets/images/fordLogo.png" alt="">
            <img v-else src="@/assets/wx-icon.jpeg" alt="">
        </div>
        <!-- 内容 -->
        <div class="content">
            <span class="text">
                {{ text }}
            </span>
            <div class="arrow"></div>
        </div>
    </div>

    <!-- FAQ知识卡片 -->
    <div v-else-if="type === 'card'" class="card">
      <Card>
        <p slot="title">补贴政策查询</p>
        <img src="../assets/images/btzc.jpg" alt="" @click="handleBTZC">
      </Card>

      <Card >
        <p slot="title">预约试驾</p>
        <img src="../assets/images/yysj.jpg" alt="">
      </Card>

      <Card >
        <p slot="title">领界纯电价格</p>
        <img src="../assets/images/ljjg.jpg" alt="">
      </Card>

      <Card >
        <p slot="title">上海车展</p>
        <img src="../assets/images/gnc2.jpg" class="x" alt="">
      </Card>
    </div>

    </div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    side: {
      type: String,
      default: 'left'
    },
    text: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions(['setInputValue', 'submit']),

    handleBTZC () {
      this.setInputValue('补贴')
      this.submit('补贴政策查询')
    }
  }
}
</script>

<style lang="less">
@left-bg: #fff;
@right-bg: #b2e281;

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
    align-items: center;
    padding: 0 10px;
    border-radius: 4px;

    .text {
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
</style>
