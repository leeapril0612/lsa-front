<template>
  <header v-bind:class="{
    main: false
  }">
    <div class="logo">
      <!-- WeB -->
    </div>
    <div class="nav">
      <router-link to="/" active-class="active" exact>Home</router-link> |
      <router-link to="/about" active-class="active">Board</router-link> |
      <router-link to="/login" active-class="active">Login</router-link>
      <!-- <span>Admin 님 환영합니다</span> -->
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  navItem: string[]
}
export default Vue.extend({
  name: 'header',
  data: function (): Data {
    return {
      navItem: []
    }
  },
  computed: {
    headerClass: function (): boolean {
      return !this.$route.meta?.trn
    }
  },
  mounted () {
    console.log(this.$route)
  },
  watch: {
    $route () {
      console.log(this.$route)
    }
  }
})
</script>

<style>
  header {
    position: absolute;
    z-index: 3;
    padding: 0 40px;
    color: #fff;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    font-size: 14px;
  }
  header.main {
    background: #000;
    position: relative;
  }
  header .logo {
    font-size: 1.3em;
    font-weight: bold;
  }

  header .nav a , span {
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    margin: 0 15px;
    padding: 5px 0px;
    position: relative;
    overflow: hidden;
  }

  header .nav a::before {
    content: '';
    position: absolute;
    background: #fff;
    width: 0;
    height: 1px;
    bottom: 0;
    transition: 0.3s;
  }
  header .nav a:hover::before {
    width: 100%;
  }
  header .nav a.active::before {
    width: 100%;
  }
</style>
