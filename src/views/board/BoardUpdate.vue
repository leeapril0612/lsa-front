<template>
  <div class="wrap">
    <div class="box" v-if="!$store.state.Board.isLoadingBoard">
      <div class="glass">
        <h2>MODIFY</h2>
        <label for="title">TITLE</label>
        <input name="title" placeholder="TITLE" v-model="title"/>
        <label for="content">CONTENT</label>
        <textarea name="content" rows="10" placeholder="CONTENT" v-model="content"/>
      </div>
      <div class="table-tool">
        <button class="btn btn-danger" to="/" @click="onClickSave">Save</button>
        <router-link to="/board" class="btn">List</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'

export default Vue.extend({
  name: 'BoardUpdate',
  data () {
    return {
      boardId: this.$route.params.id,
      title: this.$store.state.Board.board.title,
      content: this.$store.state.Board.board.content
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
    getDay () {
      return dayjs(this.$store.state.Board.board.createdDate).format('YYYY-MM-DD')
    },
    async requestAPI () {
      try {
        const state = this.$store.state
        await this.$store.dispatch('GET_BOARD', this.boardId)
        this.title = state.Board.board.title
        this.content = state.Board.board.content
        if (!this.thisUser()) {
          alert('권한 없음')
        //   this.$router.back()
        }
      } catch (error) {
        alert('NOT FOUND')
        this.$router.push('/board')
      }
    },
    async onClickSave () {
      try {
        // validate
        await this.$store.dispatch('UPDATE_BOARD', {
          id: this.boardId,
          title: this.title,
          content: this.content
        })
        alert('성공')
      } catch (error) {
        alert('에러')
      }
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
  .info {
    padding-top: 10px;
    color:#fff;
    font-weight: 100;
    font-size: 0.8rem;
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
  .btn{
    margin-left: 10px;
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
    margin-top: 20px;
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
