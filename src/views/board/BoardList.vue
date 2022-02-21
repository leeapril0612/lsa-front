<template>
  <div class="wrap">
    <div class="box">
      <div class="table-tool">
          <button class="btn" @click="boardCreate">글쓰기</button>
      </div>
      <div class="glass">
        <list-view
          :boards="this.$store.state.Board.boards"
          :isLoading="this.$store.state.Board.isLoadingBoards"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ListView from './component/ListView.vue'

export default Vue.extend({
  components: { ListView },
  created () {
    this.init()
  },
  beforeDestroy () {
    this.$store.commit('setBoards', [])
  },
  methods: {
    init () {
      this.$store.dispatch('GET_BOARDS')
    },
    boardCreate () {
      this.$router.push('/board/create')
    }
  },
  computed: {
    list () {
      return this.$store.state.Board.boards
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

</style>
