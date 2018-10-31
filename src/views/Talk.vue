<template>
    <div class="talk">
        <div class="wrapper">

            <header id="title">
                <h3>欢迎使用福特答疑小管家</h3>
            </header>

            <section id="show" @mouseover="handleMouseover" @mouseout="handleMouseout" @scroll="handleScroll">

                <div id="dialog-wrapper" :style="{ position: position }">
                    <Ford-dialog
                        v-for="(item, index) in dialog"
                        :key="index"
                        :text="item.text"
                        :side="item.side"
                    />
                </div>

            </section>

            <footer id="footer">

                <div class="input">
                    <Input
                        autofocus
                        v-model="value"
                        type="textarea"
                        :rows="6"
                        placeholder="Enter something..."
                        @keydown.enter.native.prevent="handleSubmit"
                    />
                </div>

                <div class="control">
                    <Button
                        type="success"
                        size="large"
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
import { mapState, mapActions } from 'vuex'

export default {
  components: { FordDialog },

  data () {
    return {
      position: 'absolute'
    }
  },

  computed: {
    ...mapState({
      Talk: state => state.Talk,
      dialog: state => state.Talk.dialog
    }),

    value: {
      set (value) {
        this.setInputValue(value)
      },
      get () {
        return this.Talk.value
      }
    }
  },

  methods: {
    ...mapActions(['setInputValue', 'submit']),

    handleMouseover (e) {
      this.position = 'initial'
      document
        .getElementById('dialog-wrapper')
        .lastElementChild.scrollIntoView()
    },

    handleMouseout (e) {
      // this.position = 'absolute'
    },

    handleScroll (e) {
      // this.position = 'initial'
    },

    handleSubmit (e) {
      this.submit()
      this.position = 'absolute'
      const obj = document.getElementById('show')
      // window.location.hash = '#end'
      // obj.scrollTop = obj.scrollHeight
      console.log(
        '滚到底了吗',
        obj.scrollHeight - obj.scrollTop === obj.clientHeight
      )
    }
  }
}
</script>

<style lang="less">
.talk {
  margin-top: 60px;
  display: flex;
  justify-content: center;

  .wrapper {
    width: 700px;
    height: 688px;
    border: 1px solid rgba(128, 128, 128, 0.288);
    border-radius: 5px;
    overflow: hidden;
    background: #eeeeee;
    border-bottom: none;

    #title {
      width: 100%;
      height: 50px;
      line-height: 50px;
    }

    #show {
      border-top: 1px solid #d6d6d6;
      width: 100%;
      height: 500px;
      overflow-y: auto;
      position: relative;

      #dialog-wrapper {
        min-height: 500px;
        width: 100%;
        bottom: 0;
        left: 0;
      }
    }

    #footer {
      position: relative;

      .input {
      }

      .control {
        position: absolute;
        bottom: 10px;
        right: 20px;
      }

      textarea {
        background: #eee;
      }
    }
  }
}
</style>
