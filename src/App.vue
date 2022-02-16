<template>
  <div id="app">
    <Header/>
    <router-view/>
    <div id="bg">
      <div class="cover"></div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>

<style lang="scss">
  *{
    margin: 0;
    padding:0;
    box-sizing: border-box;
    outline: none;
    border: none;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    overflow: hidden;
  }

  #bg {
    z-index: -1;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url('./assets/bg.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: #000;
  }

  .cover {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
  }
</style>
