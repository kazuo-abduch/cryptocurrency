<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        timeObj: state => state.timeObj,
      })
    },
    methods: {
      listenTime({ target }) {
        if (target.placeholder === 'hour') {
          if (target.value > 23) {
            target.value = 23;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.$store.commit('setTimeObj', { ...this.$store.state.timeObj, hour: ("0" + target.value).slice(-2) });
        };
        if (target.placeholder === 'minute') {
          if (target.value > 59) {
            target.value = 59;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.$store.commit('setTimeObj', { ...this.$store.state.timeObj, minute: ("0" + target.value).slice(-2) });
        };
        if (target.placeholder === 'seconds') {
          if (target.value > 59) {
            target.value = 59;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.$store.commit('setTimeObj', { ...this.$store.state.timeObj, seconds: ("0" + target.value).slice(-2) });
        };
      },
    },
  }
</script>

<template>
  <div class="">
    <input placeholder='hour' type="number" max="23" min="0" @change="listenTime" />
    <input placeholder='minute' type="number" max="59" min="0" @change="listenTime" />
    <input placeholder='seconds' type="number" max="59" min="0" @change="listenTime" />
    <button type="button" @click="getPriceByDate" >Confirm</button>    
  </div>
</template>