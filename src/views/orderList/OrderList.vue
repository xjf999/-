<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item,index) in list" :key="index">
        <div class="order__title">{{item.shopName}}</div>
        <span class="order__status">已完成</span>
        <div class="order__content">
          <div class="order__content__imgs">
            <img
              class="order__content__img"
              v-for="(product,i) in item.products"
              :key="i"
              :src="product.product.img"
            />
          </div>
          <div class="order__content__info">
            <div class="order__content__price">&yen;{{item.total}}</div>
            <div class="order__content__count">共{{item.count}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import Docker from '../../components/Docker.vue'
import { get } from '../../utils/request'

const useOrderEffect = () => {
  const data = reactive({ list: [] })
  const getOrderData = async () => {
    const result = await get('/api/order')
    const orders = result.data.data
    let total = 0
    let count = 0
    orders.forEach((order) => {
      const product = order.products
      product.forEach((i) => {
        count += i.orderSales || 0
        total += (i.orderSales * i.product.price) || 0
      })
      order.total = total
      order.count = count
    })
    data.list = result.data.data
  }
  getOrderData()
  const { list } = toRefs(data)
  return { list }
}
export default {
  name: 'OrderList',
  components: { Docker },
  setup () {
    const { list, count, total } = useOrderEffect()
    console.log(list)
    return { list, count, total }
  }
}
</script>

<style lang='scss' scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0.5rem;
  background: rgb(248, 248, 248);
}
.title {
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.14rem;
  color: #333;
  background: #fff;
}
.orders {
}
.order {
  margin: 0.16rem 0.18rem;
  padding: 0.16rem;
  background: #fff;
  &__title {
    margin-bottom: 0.16rem;
    line-height: 0.22rem;
    font-size: 0.16rem;
    color: #333;
  }
  &__status {
    text-align: right;
    float: right;
    font-size: 0.14rem;
    color: #999;
  }
  &__content {
    display: flex;
    &__imgs {
      flex: 1;
    }
    &__img {
      margin-right: .12rem;
      width: 0.4rem;
      height: 0.4rem;
    }
    &__info {
        width: .7rem;
    }
    &__price {
        line-height: .2rem;
        font-size: .14rem;
        color: #c92929;
    }
    &__count {
        font-size: .12rem;
        color: #999;
    }
  }
}
</style>
