<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

export default {
  components: {
    Header
  },
  created () {
    if (this.$store.state.Auth.login) {
      this.$store.dispatch('getProfile')
        .catch(() => {
          this.$store.dispatch('LOGOUT')
        })
    }
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
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-decoration: none;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    // overflow: hidden;
    background: linear-gradient(45deg, #FC466B, #3F5EFB);
  }

  .wrap {
    padding: 15px;
    display: flex;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
    padding-top: 75px;
    background: rgba(0,0,0,0.25)
  }
</style>
