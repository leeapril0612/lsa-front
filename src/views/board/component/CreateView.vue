<template>
  <form class="box" @submit="onSubmit">
    <div class="glass">
      <h2>Write</h2>
      <label for="title">TITLE</label>
      <input name="title" placeholder="TITLE" v-model="title"/>
      <label for="content">CONTENT</label>
      <textarea name="content" rows="10" placeholder="CONTENT" v-model="content">
      </textarea>
    </div>
    <div class="table-tool">
        <button class="btn">submit</button>
        <router-link to="/board" class="btn">cacel</router-link>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    _onSubmit: {
      type: Function,
      required: true
    },
    isLoadingCreateBoard: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      title: '',
      content: ''
    }
  },
  methods: {
    onSubmit (e: Event) {
      e.preventDefault()
      this._onSubmit({
        title: this.title,
        content: this.content
      })
    }
  }
})
</script>

<style scoped>
  h2{
    font-size: 2.5em;
    color: #fff;
    text-align: left;
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
