<template>
  <div class="wrap">
    <div class="box">
      <div class="glass">
        <h2>{{$store.state.Board.board.content}}</h2>
        <!-- <label for="title">TITLE</label>
        <input name="title" placeholder="TITLE" readonly v-model="$store.state.Board.board.title"/> -->
        <label for="content">CONTENT</label>
        <textarea name="content" rows="10" placeholder="CONTENT" readonly v-model="$store.state.Board.board.content"/>
      </div>
      <div class="table-tool">
        <button class="btn btn-danger" to="/" v-if="thisUser()" @click="onClickDelete">Delete</button>
        <router-link to="/board" class="btn">cacel</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BoardRead',
  data () {
    return {
      boardId: this.$route.params.id
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.requestAPI()
    },
    thisUser () {
      const state = this.$store.state
      if (!state.Auth.profile?.username) {
        return false
      }
      return state.Board.board.username === state.Auth.profile.username
    },
    async requestAPI () {
      try {
        await this.$store.dispatch('GET_BOARD', this.boardId)
      } catch (error) {
        alert('NOT FOUND')
        this.$router.push('/board')
      }
    },
    onClickDelete () {
      console.log('delete')
    }
  }
})
</script>

<style lang="scss" scoped>
  .wrap{
    align-items: flex-start;
  }
   h2{
    color: #fff;
    text-align: left;
  }
  .btn-danger {
    border-color: #fff;
    color: #000;
    background: #fff;
  }
  .btn-danger:hover {
    background: rgb(231, 231, 231);
  }
  .box {
    width: 60%;
  }
  .btn:nth-child(1){
    margin-right: 10px;
  }
  .table-tool {
    padding: 10px;
    display: flex;
    justify-content: right;
    margin-top: 10px;
  }

  label {
    text-align: left;
    color:#fff;
    display: block;
    margin-top: 30px;
    font-size: 16px;
    font-weight: 500;
  }

  textarea {
    color:#fff;
    outline: none;
    border:none;
    display: block;
    width: 100%;
    background-color: rgba(255,255,255,0.1);
    border-radius: 3px;
    padding: 10px;
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    resize: none;
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
  input::placeholder, textarea::placeholder {
    color: #d9d9d9;
  }
</style>
