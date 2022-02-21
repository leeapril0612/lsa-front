<template>
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
      <tr v-for="item in boards" v-bind:key="item.idx">
        <td class="idx">{{item.id}}</td>
        <td><router-link :to="{
          name: 'boardRead',
          params: {
            id: item.id
          }
        }">{{item.title}}</router-link></td>
        <td >{{item.content}}</td>
        <td class="username">{{item.username}}</td>
        <td class="date">{{getDay(item.createdDate)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'

export default Vue.extend({
  name: 'ListView',
  props: {
    boards: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    getDay (time: number) {
      return dayjs(time).format('YYYY-MM-DD')
    }
  }

})
</script>

<style>
 table {
    width: 100%;
    table-layout: fixed;
  }
  table th{
    background-color: rgba(255,255,255,0.3);
    text-transform: uppercase;
  }
  table .idx{
    width: 5%;
  }
  .date,.username {
    width: 12%;
  }
  table th, table td {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    border-bottom: solid 1px rgba(255,255,255,0.1);
  }
  table a {
    color: #fff;
    text-decoration: none;
  }
</style>
