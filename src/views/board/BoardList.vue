<template>
  <div class="wrap">
    <div class="box">
      <div class="table-tool">
          <button class="btn" @click="btn">글쓰기</button>
      </div>
      <div class="glass">
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th class="idx">#</th>
              <th>Title</th>
              <th>Content</th>
              <th class="username">Username</th>
              <th class="date">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in [1,2,3,4,5,6]" v-bind:key="item">
              <td class="idx">{{item}}</td>
              <td>Lorem ipsum dolor...</td>
              <td >consectetur adipisicing elit...</td>
              <td class="username">admin</td>
              <td class="date">2022-02-17</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getBoards } from '@/service/board/boardAPI'
import Vue from 'vue'

export default Vue.extend({
  name: 'board',
  mounted () {
    getBoards().then((res) => {
      console.log(res.data)
    })
  },
  methods: {
    btn () {
      alert('sada')
    }
  }
})
</script>

<style lang="scss" scoped>
  .wrap{
    align-items: flex-start;
  }
  .box {
    width: 60%;
  }
  .btn {
    color: #fff;
    background: none;
    padding: 5px 18px;
    border-radius: 15px;
    border: 1px solid #fff;
  }
  .glass {
    border-radius: 10px;
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255,255,255,0.1);
    box-shadow: 0 0 100px rgb(8 7 16 / 30%);
  }
  .table-tool {
    padding: 10px;
    display: flex;
    justify-content: right;
  }
  table {
    width: 100%;
    table-layout: fixed;
  }
  table th{
    background-color: rgba(255,255,255,0.3);
  }
  table .idx{
    width: 5%;
  }
  .date,.username {
    width: 12%;
  }
  table th, table td {
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    border-bottom: solid 1px rgba(255,255,255,0.1);
  }

</style>
