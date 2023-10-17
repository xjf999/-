<template>
    <div class="nearby">
        <h3 class="nearby__title">附近店铺</h3>
      <router-link v-for="item in nearbyList" :key="item._id"  :to="`/shop/${item._id}`" :item="item" >
         <shopInfo :item="item" />
      </router-link>
      <div class="nearby__item">
        <img src="../../assets/img/微信图片_20231003163910.jpg" class="nearby__item__img">
        <div class="nearby__content">
          <div class="nearby__content__title">杰杰土鸡专卖店</div>
          <div class="nearby__content__tags">
            <span class="nearby__content__tag">月售：666</span>
            <span class="nearby__content__tag">起送：&yen;6</span>
            <span class="nearby__content__tag">配送：&yen;6</span>
          </div>
          <p class="nearby__content__highlight">VIP尊享免运费</p>
        </div>
      </div>
      </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import shopInfo from '../../components/shopInfo.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Nearby',
  components: { shopInfo },
  setup () {
    const nearbyList = ref([])
    const getNearbyList = async () => {
      const result = await get('/api/shop/hot-list')
      nearbyList.value = result.data.data
    }
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
.nearby {
  a {
    text-decoration: none;
    color: inherit;
    background: none;
  }
    &__title {
      margin: .16rem 0 .02rem 0;
      font-weight: normal;
      font-size: .18rem;
      color: #333;
    }
    &__item {
      display: flex;
      padding-top: .12rem;
      &__img {
        margin-right: .16rem;
        height: .56rem;
        width: .56rem;
      }
    }
    &__content {
      flex: 1;
      border-bottom: .01rem solid #f1f1f1;
      padding-bottom: .12rem;
      &__title {
        line-height: .22rem;
        font-size: .20rem;
        color: #333;
      }
      &__tags {
        margin-top: .08rem;
        line-height: .18rem;
        font-size: .13rem;
        color: #333;
      }
      &__tag {
        margin-right: .16rem;
        line-height: .18rem;
        font-size: .13rem;
        color: #333;
      }
      &__highlight {
        line-height: .18rem;
        font-size: .13rem;
        color: rgb(241, 92, 92);
      }
    }
  }
</style>
