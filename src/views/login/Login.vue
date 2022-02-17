<template>
  <div class="wrap">
    <form class="login_box">
      <h2>Login</h2>
      <label for="username">Username</label>
      <input name="username" placeholder="Username"/>
      <label for="password">Password</label>
      <input name="password" placeholder="Password" type="passwordsa"/>
      <button type="button">Log In</button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({

})
</script>

<style lang="scss" scoped>
  .wrap {
    padding: 15px;
    display: flex;
    justify-content: center;
    // background: #000;
    height: calc(100vh - 60px);
    align-items: center;
  }

  h2{
    font-size: 2.5em;
    color: #fff;
  }

  .login_box{
    height: 500px;
    width: 400px;
    background-color: rgba(255,255,255,0.13);
    // position: absolute;
    // transform: translate(-50%,-50%);
    // top: 50%;
    // left: 50%;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 100px rgb(8 7 16 / 30%);
    padding: 50px 35px;
  }

  label {
    text-align: left;
    color:#fff;
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }

  input {
    color:#fff;
    outline: none;
    border:none;
    display: block;
    height: 50px;
    width: 100%;
    background-color: rgba(255,255,255,0.1);
    border-radius: 3px;
    padding: 0 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
  }

  input::placeholder {
    color: #d9d9d9;
  }

  button {
    margin-top: 50px;
    width: 100%;
    background-color: #ffffff;
    color: #080710;
    padding: 15px 0;
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
