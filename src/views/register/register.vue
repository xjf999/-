<template>
   <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png"/>
    <div class="wrapper__input">
        <input type="text" class="wrapper__input__content">
    </div>
    <div class="wrapper__input">
        <input type="text" class="wrapper__input__content">
    </div>
    <div class="wrapper__login-button"><button class="wrapper__login-button-1" @click="handleclick">注册</button></div>
    <div class="wrapper__login-link"><a href="javascript: ;" class="wrapper__login-a" @click="handleclick">已有账号？ 登录</a></div>
   </div>

</template>

<script>
import { useRouter } from 'vue-router'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  setup () {
    const router = useRouter()
    const handleclick = () => {
      router.push({ name: 'Login' })
    }
    return { handleclick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img {
        display: block;
        width: .66rem;
        height: .66rem;
        margin: 0 auto .4rem auto;
    }
    &__input {
        margin: 0 .4rem .4rem .4rem;
        padding: 0 .16rem;
        background-color: #f9f9f9;
        border: .01rem solid rgba(0,0,0,0.10);
        height: .48rem;
        border-radius: 6px;
        &__content {
            outline: none;
            line-height: .48rem;
            border: none;
            width: 100%;
            background: none;
        }
    }
    &__login-button {
        margin: .32rem .4rem .16rem .4rem;
        line-height: .48rem;
        background: rgb(23, 117, 180);
        box-shadow: 0  0.04rem .08rem .01rem rgb(0,145, 255, 0.32);
        border-radius: .16rem;
        color: #fff;
        text-align: center;
    }
    &__login-button-1{
        width: 100%;
        height: 100%;
        font-size: .16rem;
        box-shadow: 0  0.04rem .08rem .01rem rgb(0,145, 255, 0.32);
        border-radius: .16rem;
        background: rgb(0,145, 255, 0.32);
        outline: none;
        border: none;
        color: #fff;
        text-align: center;
    }
    &__login-link {
        font-size: .16rem;
        text-align: center;
    }
    &__login-a {
        color: #333;
        text-decoration: none;
    }
}
</style>
