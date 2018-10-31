<template>
    <!-- <div v-bind:class="[ side === 'left' ? 'dialog-left' : 'dialog-right' ]"> -->
    <div v-bind:class="['dialog-' + side]">

        <div class="avatar">
            <img v-if="side === 'left'" src="@/assets/ford2.png" alt="">
            <img v-else src="@/assets/wx-icon.jpeg" alt="">
        </div>

        <div class="content">
            <span class="text">
                {{ text }}
            </span>
            <div class="arrow"></div>
        </div>

    </div>
</template>

<script>
export default {
  props: {
    side: {
      type: String,
      default: 'left'
    },
    text: {
      type: String
    }
  },
  data () {
    return {
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
        text-align: center;
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 10px;
        border-radius: 4px;

        .text {}

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
        background-color : @left-bg;
    }

    .arrow {
        left: -6px;
        box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);
        background-color : @left-bg;
    }
}

.dialog-right {
    flex-direction: row-reverse;

    .base-style;

    .content {
        box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
        background-color : @right-bg;
    }

    .arrow {
        right: -6px;
        box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);
        background-color : @right-bg;
    }
}
</style>
