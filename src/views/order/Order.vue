<template>
  <div class="wrapper">
    <div class="top">
      <div class="top__header">
        <div class="top__header__back iconfont" @click="handleback">
          &#xe6db;
        </div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">罗亭大道江西软件大学D2117</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">龙傲天</span>
          <span class="top__receiver__info__name">8848911119110</span>
        </div>
        <div class="top__receiver__enter iconfont">&#xe6db;</div>
      </div>
    </div>
    <div class="products">
      <div
        class="products__title"
        v-html="shopId == 1 ? '沃尔玛' : '东东超市'"
      ></div>
      <div class="products__list">
        <div class="products__item" v-for="item in productList" :key="item._id">
          <img :src="item.imgUrl" class="products__item__img" />
          <div class="products__item__detail">
            <h4 class="products__item_title">{{ item.name }}</h4>
            <div class="products__item__price">
              <span class="products__item__yen">&yen;{{ item.price }}</span>
              <span class="products__item__origin"
                >&yen;{{ item.oldPrice }}</span>
              <span class="products__item__yen"
                >&yen;{{ item.price }} x {{ item.count }}</span>
              <span class="products__item__total"
                >&yen;{{ item.price * item.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order">
      <div class="order__price" @click="handleOrder">
        预付金额：&yen; {{ price }}
      </div>
      <div class="order__btn" @click="handleOrderShow">提交订单</div>
    </div>
  </div>
  <div class="mask" v-show="orderShow">
    <div class="mask__content">
      <h3 class="mask__content__title">确认离开收银台</h3>
      <p class="mask__content__desc">亲！您还没有完成支付勒。</p>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--first" @click="handleCancle">确认离开</div>
        <div class="mask__content__btn mask__content__btn--second" @click="handleConfirm">确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'OrderConfirm',
  setup () {
    const data = reactive({ showOrder: false })
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    const cartList = store.state.cartList
    const shopId = route.params.id
    const productList = computed(() => {
      const productList = cartList[shopId] || []
      return productList
    })
    const handleback = () => {
      router.back()
    }
    const price = computed(() => {
      const product = cartList[shopId]
      let count = 0
      if (product) {
        for (const i in product) {
          const item = product[i]
          if (item.check) {
            count += item.count * item.price
          }
        }
      }
      return count.toFixed(2)
    })
    const handleOrder = () => {
      router.push({ name: 'OrderList' })
    }
    const handleCancle = () => {
      router.push({ name: 'Home' })
    }
    const handleConfirm = () => {
      router.push({ name: 'OrderList' })
    }
    const orderShow = ref(data.showOrder)
    const handleOrderShow = () => {
      orderShow.value = true
    }
    return { productList, shopId, handleback, price, handleOrder, handleConfirm, handleCancle, orderShow, handleOrderShow }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: scroll;
}
.products {
  overflow-y: scroll;
  &__title {
    position: absolute;
    top: 2.3rem;
    padding: 0.16rem 0.16rem 0.12rem 0.16rem;
    margin-top: 10px;
    font-size: 0.16rem;
    color: #666666;
  }
  &__item {
    top: 0.5rem;
    overflow-y: scroll;
    flex: 1;
    position: relative;
    display: flex;
    padding: 0.12rem 0;
    margin: 0 0.16rem;
    border-bottom: 0.01rem solid #f1f1f1;
    &__img {
      width: 0.68rem;
      height: 0.68rem;
      margin-right: 0.16rem;
    }
    &__title {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #333;
    }
    &__sales {
      margin: 0.06rem 0;
      font-size: 0.12rem;
      color: #e3b6b6;
    }
    &__price {
      margin: 0;
      line-height: 0.2rem;
      font-size: 0.14rem;
      color: #e3b3b3;
    }
    &__yen {
      font-size: 0.12rem;
      padding-left: 0.14rem;
    }
    &__total {
      color: #f30a06;
      padding-left: 0.16rem;
    }
    &__origin {
      margin-left: 0.06rem;
      line-height: 0.2rem;
      text-decoration: line-through;
      color: #999;
      font-size: 0.12rem;
    }
  }
  &__number {
    position: absolute;
    right: 0;
    bottom: 0.12rem;
    &__minus,
    &__plus {
      display: inline-block;
      line-height: 0.16rem;
      width: 0.2rem;
      height: 0.2rem;
      font-size: 0.2rem;
      border-radius: 50%;
      text-align: center;
    }
    &__minus {
      border: 0.01rem solid #999;
      margin-right: 0.1rem;
    }
    &__plus {
      margin-left: 0.1rem;
      background: #52b7ed;
    }
  }
}
.top {
  position: relative;
  padding-top: 0.16rem;
  height: 1.96rem;
  &__header {
    padding-top: 0.14rem;
    line-height: 0.24rem;
    font-size: 0.24rem;
    text-align: center;
    &__back {
      position: absolute;
      font-size: 0.2rem;
    }
  }
  &__receiver {
    position: absolute;
    height: 1.11rem;
    left: 0.18rem;
    right: 0.18rem;
    bottom: 0;
    &__title {
      padding: 0.16rem 0 0.16rem 0.14rem;
      line-height: 0.22rem;
      font-size: 0.14rem;
    }
    &__address {
      padding: 0.16rem 0 0.16rem 0.14rem;
      font-size: 0.14rem;
    }
    &__info {
      padding: 0.16rem 0 0.14rem 0.16rem;
      font-size: 0.14rem;
      &__name {
        font-size: 0.12rem;
        color: #666666;
      }
    }
    &__enter {
      transform: rotate(180deg);
      position: absolute;
      right: 0.16rem;
      top: 0.2rem;
    }
  }
}
.order {
  /* 订单部分的样式 */
  background-color: #f0f0f0; /* 设置背景色，可根据需要自定义 */
  padding: 10px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  &__price {
    flex: 1;
    left: 0;
  }
  &__btn {
    background: #52b7ed;
  }
}
.mask {
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  bottom: 0;
  z-index: 1;
  background: rgba(245, 247, 248, 0.522);
  &__content {
    position: absolute;
    top: 50%;
    bottom: 50%;
    transform: translate(-50%,-50%);
    width: 3rem;
    height: 1.56rem;
    border-radius: .2rem;
    background: rgba(221, 243, 243, 0.522);
    &__title {
      font-size: .18rem;
      text-align: center;
      color: #333;
      margin: .24rem 0 0 0;
    }
    &__desc {
      font-size: .12rem;
      color: #666666;
      margin-top: .08rem;
      text-align: center;
    }
    &__btns {
      display: flex;
      margin: .24rem .58rem;
    }
    &__btn{
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      text-align: center;
      border: .01rem solid #52b7ed;
      border-radius: .16rem;
      &--first {
        margin-right: .12rem;
      }
      &--second{
        margin-left: .12rem;
        background: #52b7ed;
      }
    }
  }
}
</style>
