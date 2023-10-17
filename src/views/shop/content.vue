<template>
    <div class="content">
        <div class="category">
            <div :class="{'category__item':true, 'category__item--active':currentTab===item.tab}"
            v-for="item in categories"
            :key="item.tab"
            @click="() => handleTabClick(item.tab)"
            >
            {{ item.name }}
        </div>
        </div>
        <div class="product">
            <div class="product__item" v-for="item in contentList" :key="item._id">
                <img :src='item.imgUrl'
                class="product__item__img" />
                <div class="product__item__detail">
                    <h4 class="product__item_title">{{ item.name }}</h4>
                    <p class="product__item_sales">月售100000000+</p>
                    <div class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{ item.price }}
                        <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
                    </div>
                </div>
                <div class="product__number">
                    <span class="product__number__minus" @click="addItemToCart(shopId,item._id,item,-1)">-</span>
                    {{cartList?.[shopId]?.[item._id]?.count || 0}}
                    <span class="product__number__plus"
                          @click= "() => { addItemToCart(shopId,item._id,item,1) }"
                    >+</span>
                </div>
            </div>
            <div class="product__item">
                <img src="../../assets/img/微信图片_20231003163910.jpg" class="product__item__img" />
                <div class="product__item__detail">
                    <h4 class="product__item_title">吉水卧龙杰杰250g/份</h4>
                    <p class="product__item_sales">月售99999999+</p>
                </div>
                <div class="product__number">
                    <span class="product__item__title product__item__yen">价值: - 99999999</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'

const useCartEffect = () => {
  const store = useStore()
  const { cartList } = toRefs(store.state)
  const addItemToCart = (shopId, productId, productInfo, num) => {
    store.commit('addItemToCart', { shopId, productId, productInfo, num })
  }
  return { cartList, addItemToCart }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Content',
  setup () {
    const categories = [{
      name: '全部商品',
      tab: 'all'
    },
    {
      name: '秒杀',
      tab: 'seckill'
    },
    {
      name: '水果',
      tab: 'fruit'
    },
    {
      name: '杰杰土鸡',
      tab: 'haha'
    }
    ]
    const data = reactive({ contentList: [], currentTab: categories[0].tab })
    const route = useRoute()
    const shopId = route.params.id
    const getContentData = async (tab) => {
      const result = await get(`/api/shop/${shopId}/products`, { tab })
      console.log(result.data.data)
      data.contentList = result.data.data
    }
    const { contentList, currentTab } = toRefs(data)
    const handleTabClick = (tab) => {
      getContentData(tab)
      data.currentTab = tab
    }
    getContentData('all')
    const { cartList, addItemToCart } = useCartEffect()
    return { contentList, categories, currentTab, handleTabClick, cartList, shopId, addItemToCart }
  }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}
.category {
    overflow-y: scroll;
    height: 100%;
    width: .76rem;
    background: #f5f5f5;
    &__item {
        line-height: .4rem;
        text-align: center;
        &--active {
            background: #fff;
        }
    }
}
.product {
    overflow-y: scroll;
    flex: 1;
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #f1f1f1;
        &__img {
            width: .68rem;
            height: .68rem;
            margin-right: .16rem;
        }
        &__title{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #333;
        }
        &__sales {
            margin: .06rem 0;
            font-size: .12rem;
            color: #e3b6b6;
        }
        &__price {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color:#e3b3b3
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
</style>
