<template>
    <div class="position">
        <span class="iconfont position__icon">&#xe60b;</span>
        江西软件大学
        <span class="iconfont position_bell">&#xe887;</span>
    </div>
      <div class="seacher">
        <span class="iconfont">&#xeafe;</span>
        <router-link to="/search">
        <input type="text" placeholder="吉水卧龙肖豪杰限时特价啦" class="seacher_input" />
        </router-link>
      </div>
      <div class="banner">
        <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg"/>
      </div>
    <div class="icons">
        <div class="icons__items"
        v-for="item in iconsList"
        :key="item.desc"
        >
        <img class="icons__items__img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgURL}.png`"/>
        <p class="icons__items__desc">{{ item.desc }}</p>
        </div>
    </div>
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      { imgURL: '超市', desc: '超市便利' },
      { imgURL: '菜市场', desc: '菜市场' },
      { imgURL: '水果店', desc: '水果店' },
      { imgURL: '鲜花', desc: '鲜花绿植' },
      { imgURL: '医药健康', desc: '医药健康' },
      { imgURL: '家居', desc: '家居时尚' },
      { imgURL: '蛋糕', desc: '烘焙蛋糕' },
      { imgURL: '签到', desc: '签到' },
      { imgURL: '大牌免运', desc: '大牌免运' },
      { imgURL: '红包', desc: '红包套餐' }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
.position {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    padding: .16rem .24rem .16rem 0;
    line-height: 0.22rem;
    font-size: 0.16rem;
    .position__icon{
      position: relative;
      top: .01rem;
      font-size: .2rem;
    }
    .position_bell {
      position: absolute;
      right: 0;
      top: .17rem;
      font-size: .2rem;
    }
    color: #333;
  }

  /* 样式搜索框容器 */
  .seacher {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      border-radius: .16rem;
      padding: 5px;
      margin-bottom: .12rem;
  }

  /* 样式图标 */
  .iconfont {
      font-size: 16px; /* 调整图标大小 */
      margin-right: 5px;
  }

  /* 样式输入框 */
  .seacher_input {
      border: none;
      outline: none;
      background: transparent;
      flex: 1; /* 让输入框填充剩余空间 */
  }

  .banner {
    overflow: hidden;
    height: 0;
    padding-bottom: 25.4%;
    &__img {
      width: 100%;
    }
    margin-bottom: .12rem;
  }

  .icons {
    display: flex;
    flex-wrap: wrap;
  }
  .icons__items {
    margin-top: .16rem;
      width: 20%;
      &__img {
        display: block;
        width:.4rem;
        height: .4rem;
        margin: 0 auto;
      }
      &__desc {
        margin: .06rem 0 .16rem 0;
        text-align: center;
      }
      color:#333;
  }

  .gap {
    margin: 0 -.18rem;
    height: .1rem;
    background-color: #f1f1f1;
  }
</style>
