/*
 * @Author: Tom
 * @Date: 2018-11-12 19:58:29
 * @Last Modified by: Tom
 * @Last Modified time: 2018-11-13 17:20:50
 */

<template>
    <div class="talk">
        <div class="wrapper">

            <header id="title">
                <div class="logo">
                  <img src="@/assets/images/Ford.png" alt="">
                </div>
                <div class="info">
                  <img :src="require(`@/assets/images/${weather_condition}.png`)" class="wea-logo" alt="">
                  <span class="weather-condition">{{userInfo.weather}}</span>
                  <span class="temperature">{{userInfo.temperature}}</span>
                  <img src="@/assets/images/location.png" class="location-logo" alt="">
                  <span class="location">{{userInfo.location}}</span>
                </div>
            </header>

            <section id="show" @mouseenter="handleMouseover">
                <div id="dialog-wrapper" :style="{ position: position }">
                    <Ford-dialog
                        v-for="(dialog, index) in dialogs"
                        :dialog="dialog"
                        :key="index"
                        :carShopInfo="dialog.carShopInfo"
                    />
                </div>
            </section>

            <section id="options">
              <div class="btn">
                <Button
                  type="info"
                  v-for="item in questions"
                  :icon="item.icon"
                  :key="item.key"
                  @click="handleQuClick(item.title)">
                  {{ item.title }}
                </Button>
              </div>
            </section>

            <footer id="footer">
                <div class="input">
                    <Input
                        autofocus
                        v-model="value"
                        type="textarea"
                        :rows="6"
                        placeholder="请输入您的问题"
                        @keydown.enter.native.prevent="handleSubmit"
                    />
                </div>

                <div class="control">
                    <Button
                        type="success"
                        size="large"
                        shape="circle"
                        @click="handleSubmit"
                    >
                        发送
                    </Button>
                </div>
            </footer>

        </div>
    </div>
</template>

<script>
import FordDialog from '@/components/Ford-dialog'
import questions from '@/data_config/questions.js'
import { mapState, mapActions } from 'vuex'

export default {
  components: { FordDialog },

  created() {
    this.api_weather()
  },

  data() {
    return {
      questions: questions
    }
  },

  computed: {
    ...mapState({
      Talk: state => state.Talk,
      dialogs: state => state.Talk.dialog,
      userInfo: state => state.Talk.userInfo
    }),

    position: {
      set(value) {
        this.setPosition(value)
      },
      get() {
        return this.Talk.position
      }
    },

    value: {
      set(value) {
        this.setInputValue(value)
      },
      get() {
        return this.Talk.value
      }
    },

    weather_condition() {
      const { weather } = this.userInfo
      if (weather.includes('雪')) {
        return 'xue'
      } else if (weather.includes('雷电')) {
        return 'leidian'
      } else if (weather.includes('雨')) {
        return 'yu'
      } else if (weather.includes('晴')) {
        return 'qing'
      } else if (weather.includes('多云')) {
        return 'duoyun'
      } else {
        return 'duoyun'
      }
    }
  },

  methods: {
    ...mapActions(['setInputValue', 'submit', 'api_weather', 'setPosition']),

    handleMouseover(e) {
      console.log('滑上来了')
      this.position = 'inherit'
      this.$nextTick(() => {
        document
          .getElementById('dialog-wrapper')
          .lastElementChild.scrollIntoView()
      })
    },

    handleSubmit(e) {
      this.submit()

      this.position = 'absolute'
    },

    handleQuClick(data) {
      this.setInputValue(data)
      this.submit(data)
      this.position = 'absolute'
    }
  }
}
</script>

<style lang="less">
.talk {
  // margin-top: 60px;
  display: flex;
  justify-content: center;

  .wrapper {
    width: 700px;
    // height: 688px;
    border: 1px solid rgba(128, 128, 128, 0.288);
    border-radius: 5px;
    overflow: hidden;
    background: #eeeeee;
    border-bottom: none;
    transition: all 1s;

    #title {
      // TODO: 移动版
      // position: fixed;
      // z-index: 1000;
      width: 100%;
      // width: 700px;

      height: 75px;
      line-height: 50px;
      background-color: #36404d;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding: 0 20px;

      .logo {
        margin-top: 20px;

        > img {
          width: 95px;
          position: relative;
          top: 31px;
          left: 13px;
        }
      }

      .info {
        color: #fff;
        display: flex;
        align-items: flex-end;

        > img {
          width: 30px;
          padding-bottom: 13px;
          margin: 0 3px;
        }

        .weather-condition {
          margin-right: 8px;
        }

        .temperature {
          margin-right: 8px;
        }

        .location {
          box-sizing: border-box;
        }

        .location-logo {
          width: 15px;
        }
      }
    }

    #show {
      border-top: 1px solid #d6d6d6;
      width: 100%;

      // TODO: 移动版
      // margin-top: 75px;
      height: 500px;
      // position: fixed;
      // top: 75px;

      // height: 390px;
      overflow-y: auto;
      position: relative;

      #dialog-wrapper {
        // TODO: 移动版
        min-height: 500px;
        // min-height: 390px;
        width: 100%;
        bottom: 0;
        left: 0;
      }
    }

    #options {
      .btn {
        display: flex;
        justify-content: space-around;
        padding: 5px;
        align-items: center;

        .title {
          font-size: 14px;
        }
      }
    }

    #footer {
      position: relative;

      .input {
        box-sizing: border-box;
      }

      .control {
        position: absolute;
        bottom: 10px;
        right: 20px;

        button {
          padding: 5px 30px;
        }
      }

      textarea {
        background: #eee;
      }
    }
  }
}
</style>
