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

  .glass {
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 100px rgb(8 7 16 / 30%);
    padding: 15px;
  }
  .btn {
    font-size: 0.9rem;
    cursor: pointer;
    color: #fff;
    background: none;
    padding: 5px 18px;
    border-radius: 15px;
    border: 1px solid #fff;
    position: relative;
    overflow: hidden;
    transition: 0.15s;
    z-index: 2;
  }
  .btn:hover{
    color: #000;
    background: #fff;
    border: 1px solid linear-gradient(45deg, #FC466B, #3F5EFB);;
  }
</style>
