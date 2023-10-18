<template>
    <div class="wrapper">
        <div class="search">
            <span class="iconfont">&#xeafe;</span>
            <input class="search__area"  @change="handleHistory"/>
            <div class="search__cancle" @click="handleI">取消</div>
        </div>
        <div class="area">
            <h4 class="area__title" v-if="history.length">搜索历史
               <span class="area__title__clean" @click="handleClear">清除历史</span>
            </h4>
            <ul class="area__list">
                <li class="area__item" v-for="item in history" :key="item">{{item}}</li>
            </ul>
        </div>
        <div class="area">
            <h4 class="area__title">热门
            </h4>
            <ul class="area__list">
                <li class="area__item">杰杰土鸡</li>
                <li class="area__item">杰杰土鸡</li>
                <li class="area__item">杰杰土鸡</li>
                <li class="area__item">杰杰土鸡</li>
                <li class="area__item">杰杰土鸡</li>
                <li class="area__item">杰杰土鸡</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'SearchPage',
  setup () {
    const history = ref(JSON.parse(localStorage.history || '[]'))
    const handleHistory = (e) => {
      const searchVal = e.target.value
      if (!searchVal) { return }
      const hasVale = history.value.find(item => item === searchVal)
      if (!hasVale) {
        history.value.push(searchVal)
        localStorage.history = JSON.stringify(history.value)
      }
    }
    const handleClear = () => {
      history.value = []
      localStorage.history = JSON.stringify([])
    }
    const router = useRouter()
    const handleI = () => {
      router.back()
    }
    return { history, handleHistory, handleClear, handleI }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    .area {
        margin-top: .24rem;
        line-height: .32rem;
        &__title {
            font-size: .16rem;
           &__clean {
            float: right;
           }
        }
        &__list {
            margin: 0;
            padding: 0;
            list-style-type: none;
        }
        &__item {
            display: inline-block;
            margin-right: .1rem;
            padding: 0 .1rem .1rem 0;
            color: #333;
            border-radius: .02rem;
        }
    }
    margin: 0 .18rem;
    .search {
        position: relative;
        display: flex;
        line-height: .32rem;
        margin-top: .16rem;
        &__area {
            flex: 1;
            padding: 0 .12rem 0 .44rem;
            border-radius: .16rem;
        }
        &__cancle {
            margin-left: .12rem;
            font-size: .18rem;
        }
    }
     .iconfont {
        width: .12rem;
        position: absolute;
        left: .16rem;
        color: #b7b7b7;
    }
  }
</style>
