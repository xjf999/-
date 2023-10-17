<template>
    <div class="wrapper">
        <div class="seacher">
            <div class="sercher__back iconfont" @click="handleBack">&#xe6db;</div>
            <div class="seacher__content">
                <span class="seacher__content__icon iconfont">&#xeafe;</span>
                <input class="seacher__content__input" placeholder="杰杰土鸡营养又美味 妈妈我爱 嘿嘿嘿！！！"/>
            </div>
        </div>
        <shopInfo class="shop" :item="data.item" />
        <Content />
        <Cart />
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import shopInfo from '../../components/shopInfo.vue'
import Content from './content.vue'
import Cart from './cart.vue'
export default {
  name: 'ShopDetail',
  components: { shopInfo, Content, Cart },
  setup () {
    const data = reactive({ item: [] })
    const route = useRoute()
    const getItemData = async () => {
      const result = await get(`/api/shop/${route.params.id}`)
      data.item = result.data.data
    }
    const router = useRouter()
    const handleBack = () => {
      router.back()
    }
    getItemData()
    const { item } = toRefs(data)
    return { handleBack, data, item }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 0 .18rem;
}
.seacher {
    display: flex;
    height: .32rem;
    margin: .02rem 0 .14rem 0;
    line-height: .32rem;
    &__back {
        width: .3rem;
        font-size: .26rem;
        color: #b6b6b6;
        background: transparent; /* 添加透明背景色 */
    }
    &__content {
        display: flex;
        flex: 1;
        line-height: .32rem;
        background: #f5f5f5;
        border-radius: .16rem;
        &__icon {
        width: .44rem;
        text-align: center;
        font-size: .20rem;
    }
        &__input {
        display: block;
        background: none;
        outline: none;
        border: none;
        padding-right: .2rem;
        height: .32rem;
        width: 100%;
    }
    }
}
</style>
