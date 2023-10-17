<template>
  <div class="docker">
    <div
      class="docker__item"
      v-for="(item, index) in dockerList"
      :class="{'docker__item--active': index === 2}"
      :key="item.icon"
    >
      <div class="iconfont" v-html="item.icon" @click="() => handleRouter(item.to)"/>
      <div class="docker__title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe8b9;', title: '首页', to: 'Home' },
      { icon: '&#xe600;', title: '购物车', to: 'Home' },
      { icon: '&#xe645;', title: '订单', to: 'OrderList' },
      { icon: '&#xe602;', title: '我的', to: 'Home' }
    ]
    const handleRouter = (name) => {
      router.push({ name: name })
    }
    return { dockerList, handleRouter }
  }
}
</script>

<style lang="scss" scoped>
.docker {
    display: flex;
    box-sizing: border-box;
    padding: 0 0.18rem;
    left:0;
    bottom: 0;
    height: 0.49rem;
    width:100%;
    position: absolute;
    border-top: 1px solid #f1f1f1;
    color:#333
  }
  .docker__item {
    flex: 1;
    text-align: center;
    .iconfont {
      margin: 0.07rem 0 0 0.02rem;
      font-size: .2rem;
    }
  }
  .docker__title {
    font-size: .2rem;
    transform: scale(.5,.5);
    transform-origin: center top;
  }
  .docker__item--active {
    color:#4cc8de
  }
</style>
