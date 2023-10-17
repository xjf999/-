<template>
  <div class="cart">
    <div class="product" v-if="showCart && total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="() => cartChecked(shopId)">
          <span class="product__header__icon iconfont"
                v-html="allChecked ? `&#xe70f;`:`&#xe66c;`"
          >
          </span>
          全选
        </div>
        <div class="product__header__clear"><span @click="() => cleanCart(shopId)">清空购物车</span></div>
      </div>
      <template  v-for="item in productList" :key="item._id">
        <div v-if="item.count > 0" class="product__item">
          <div class="product__item__checked iconfont"
               v-html="item.check ? `&#xe70f;`:`&#xe66c;`"
               @click="() => checkIcon(shopId,item._id)"
          ></div>
          <img :src='item.imgUrl'
               class="product__item__img"
          />
          <div class="product__item__detail">
            <h4 class="product__item_title">{{ item.name }}</h4>
            <div class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
            </div>
          </div>
          <div class="product__number">
            <span class="product__number__minus" @click="addItemToCart(shopId,item._id,item,-1)">-</span>
            {{item.count || 0}}
            <span class="product__number__plus"
                  @click= "() => { addItemToCart(shopId,item._id,item,1) }"
            >+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
        <div class="check__icon" @click="handleShowCart">
            <img src="http://www.dell-lee.com/imgs/vue3/basket.png"
              class="check__icon__img"
            />
            <div class="check__icon__tag">{{total}}</div>
        </div>
        <div class="check__info">
            总计：<span class="check__info__price">&yen;{{price}}</span>
        </div>
      <router-link :to="{path:`/order/${shopId}`}">
        <div class="check__btn">去结算</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Cart',
  setup () {
    const store = useStore()
    const route = useRoute()
    const cartList = store.state.cartList
    const shopId = route.params.id
    const total = computed(() => {
      const product = cartList[shopId]
      let count = 0
      if (product) {
        for (const i in product) {
          const item = product[i]
          count += item.count
        }
      }
      return count
    })
    const price = computed(() => {
      const product = cartList[shopId]
      let count = 0
      if (product) {
        for (const i in product) {
          const item = product[i]
          if (item.check) {
            count += (item.count * item.price)
          }
        }
      }
      return count.toFixed(2)
    })
    const allChecked = computed(() => {
      const product = cartList[shopId]
      let result = true
      if (product) {
        for (const i in product) {
          const item = product[i]
          if (item.count > 0 && !item.check) {
            result = false
          }
        }
      }
      return result
    })
    const productList = computed(() => {
      const productList = cartList[shopId] || []
      return productList
    })
    const addItemToCart = (shopId, productId, productInfo, num) => {
      store.commit('addItemToCart', { shopId, productId, productInfo, num })
    }
    const checkIcon = (shopId, productId) => {
      store.commit('checkIcon', { shopId, productId })
    }
    const cleanCart = (shopId) => {
      store.commit('cleanCart', { shopId })
      handleShowCart()
    }
    const cartChecked = (shopId) => {
      store.commit('cartChecked', { shopId })
    }
    const showCart = ref(false)
    const handleShowCart = () => {
      const product = cartList[shopId]
      if (product) {
        showCart.value = !showCart.value
      }
    }
    return { total, price, productList, shopId, addItemToCart, checkIcon, cleanCart, allChecked, cartChecked, showCart, handleShowCart }
  }
}
</script>

<style lang="scss" scoped>
.cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: .5rem;
    background: #fff;
}
.product {
  overflow-y: scroll;
  flex: 1;
  background: #fff;
  &__header {
    display: flex;
    &__icon {
      font-size: .14rem;
      color: #52b7ed;
      vertical-align: center;
    }
    &__all {
      width: .64rem;
      font-size: .14rem;
    }
    &__clear {
      margin-right: .16rem;
      font-size: .14rem;
      text-align: right;
      flex: 1;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid #f1f1f1;
    &__checked {
      line-height: .5rem;
      margin-right: .2rem;
      font-size: .2rem;
      color: #52b7ed;
    }
    &__img {
      width: .46rem;
      height: .46rem;
      margin-right: .16rem;
    }
    &__title{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: #333;
    }
    &__price {
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
    }
    &__yen {
      font-size: .12rem;
    }
    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      text-decoration: line-through;
      color:#999;
      font-size: .12rem;
    }
  }
  &__number {
    position:absolute;
    right:  0;
    bottom: .12rem;
    &__minus,&__plus {
      display: inline-block;
      line-height: .16rem;
      width: .2rem;
      height: .2rem;
      font-size: .2rem;
      border-radius: 50%;
      text-align: center;
    }
    &__minus {
      border: .01rem solid #999;
      margin-right: .1rem;
    }
    &__plus {
      margin-left: .1rem;
      background: #52b7ed;
    }
  }
}
.check {
    display: flex;
    height: .49rem;
    line-height: .5rem;
  background: #fff;
    &__icon {
        position: relative;
        height: .49rem;
        width: .84rem;
        &__img {
            display: block;
            margin: .28rem auto;
            width: .28rem;
            height: .26rem;
        }
        &__tag {
            position: absolute;
            left: .3rem;
            right: .2rem;
            top: .04rem;
            min-width: .2rem;
            height: .2rem;
            line-height: .2rem;
            text-align: center;
            border-radius: .1rem;
            background-color: rgba(231, 61, 27, 0.977);
            transform: scale(0.7);
            transform-origin: left center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    &__info {
        flex: 1;
        font-size: .12rem;
        &__price {
            font-size: .18rem;
            color: rgba(230, 67, 17, 0.818);
        }
    }
    &__btn {
        width: .98rem;
        background-color: rgb(58, 143, 223);
        font-size: .18rem;
        text-align: center;
    }
}
</style>
