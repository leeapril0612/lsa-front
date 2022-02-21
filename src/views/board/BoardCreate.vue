<template>
  <div class="wrap">
    <create-view
    :_onSubmit="onSubmit"
    :isLoadingCreateBoard="this.$store.state.Board.isLoadingCreateBoard"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateView from './component/CreateView.vue'

export default Vue.extend({
  components: { CreateView },
  name: 'BoardCreate',
  methods: {
    async onSubmit (fData: any) {
      if (fData.title && fData.content) {
        try {
          await this.$store.dispatch('CREATE_BOARD', fData)
        } catch (error: any) {
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .wrap{
    align-items: flex-start;
  }
</style>
