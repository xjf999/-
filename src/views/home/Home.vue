<template>
    <div class="wrapper">
        <StaticPart/>
        <Nearby/>
    </div>
    <Docker :currentIndex='0'/>
</template>

<script>
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from './Docker.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: { StaticPart, Nearby, Docker }
}
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow-y: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0.5rem;
    padding: 0 .18rem .2rem .18rem;
  }
</style>
