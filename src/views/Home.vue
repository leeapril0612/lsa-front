<template>
  <div>
     <section id="main">
      <div id="time-box">
        <div id="clock">
          <p>{{time}}</p>
          <div class="time-info">
            <span>{{noon}}</span>
            <span>{{sec}}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
  #clock{
    display: flex;
    flex-direction: row;
    letter-spacing: 2px;
    line-height: 1;
  }

  #main {
    width: 100%;
    position: absolute;
    display: flex;
    height: 100vh;
    z-index: 2;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }

  #time-box {
    display: flex;
  }

  .time-info {
    display: grid;
    align-items: flex-end;
    justify-content: flex-end;
    grid-template-rows: 1fr 1fr;
    height: 100%;
  }

  .time-info>span {
    text-align: center;
    font-size: 2.4em;
    color: #fff;
  }

  .time-info>span:nth-child(1) {
    /* padding-top: 8px; */
    box-sizing: border-box;
    align-items: flex-end;
    border-block-end: 1px solid hsla(0, 0%, 100%, .16);
  }
  .time-info>span:nth-child(2) {
    align-self: flex-start;
    /* border-block-end: 1px solid hsla(0, 0%, 100%, .16); */
  }

  #main p {
    color: #fff;
    font-size: 10em;
  }
  .cover {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.3;
  }
</style>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'Home',
  data: () => {
    return {
      time: '',
      sec: '',
      noon: ''
    }
  },
  mounted: function () {
    this.clock()
    setInterval(this.clock, 1000)
  },
  components: {
  },
  methods: {
    clock: function () {
      const now = dayjs()
      this.time = now.format('hh:mm')
      this.sec = now.format('ss')
      this.noon = now.format('A')
    }
  }
})
</script>
