// eslint-disable-next-line vue/valid-template-root, vue/valid-template-root
<template>
<div class="nearby__item">
          <img :src="item.imgUrl" class="nearby__item__img">
          <div class="nearby__content">
            <div class="nearby__content__title">{{ item.name }}</div>
            <div class="nearby__content__tags">
                <span class="nearby__content__tag">月售：{{ item.sales }}</span>
                <span class="nearby__content__tag">起送：{{ item.expressLimit }}</span>
                <span class="nearby__content__tag">基础运费：{{ item.expressPrice }}</span>
            </div>
            <p class="nearby__content__highlight">VIP尊享免运费</p>
          </div>
        </div>
</template>

<script>
export default {
  name: 'shopInfo',
  props: ['item']
}
</script>

<style lang="scss" scoped>
.nearby {
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
