<template>
  <header>
    <div class="logo">
      <router-link to="/">Europium</router-link>
    </div>
    <div class="nav">
      <router-link to="/" active-class="active" exact>Home</router-link> |
      <router-link to="/board" active-class="active">Board</router-link> |
      <span v-if="isLogin">{{payload.username}} 님 환영합니다</span>
      <router-link to="/login" active-class="active" v-else>Login</router-link>
      <button v-if="isLogin" class="btn" @click="logout">로그아웃</button>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  navItem: string[]
}
export default Vue.extend({
  name: 'Header',
  data: function (): Data {
    return {
      navItem: []
    }
  },
  methods: {
    async logout () {
      try {
        this.$store.dispatch('LOGOUT')
        alert('로그아웃 되었습니다')
        this.$router.push('/').catch((err) => err)
      } catch (error) {
        alert('error')
      }
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.Auth.login
    },
    payload () {
      return this.$store.state.Auth.profile || {}
    }
  }
})
</script>

<style scoped>
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
  header a {
    color: #fff;
  }
  header a::selection {
    color: #fff;
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
