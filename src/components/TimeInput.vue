<script>
  import { mapState } from 'vuex';
  import { getPriceDated } from '../service/geckoApi';
  export default {
    computed: {
      ...mapState({
        timeObj: state => state.timeObj,
        currency: state => state.currency,
        price: state => state.price,
      })
    },
    methods: {
      async listenTime({ target }) {
        if (target.placeholder === 'hour') {
          if (target.value > 23) {
            target.value = 23;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.$store.commit('setTimeObj', { ...this.$store.state.timeObj, hour: ("0" + target.value).slice(-2) });
        };
        if (target.placeholder === 'min') {
          if (target.value > 59) {
            target.value = 59;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.$store.commit('setTimeObj', { ...this.$store.state.timeObj, minute: ("0" + target.value).slice(-2) });
        };
        if (target.placeholder === 'sec') {
          if (target.value > 59) {
            target.value = 59;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.$store.commit('setTimeObj', { ...this.$store.state.timeObj, seconds: ("0" + target.value).slice(-2) });
        };
        const dataPrice = await getPriceDated(this.$store.state.currency, this.$store.state.date);
        const { prices } = dataPrice;
        this.$store.dispatch('setPriceOnDate', prices[0][1]);
      },
    },
  }
</script>

<template>
  <div class="flex">
    <div class="pr-5">
      <img src="../assets/clockIcon.svg">
    </div>
    <div class="pr-2">
      <input
        class="rounded-2xl text-center h-8 w-14"
        placeholder='hour'
        type="number"
        max="23"
        min="0"
        @change="listenTime"
      />
    </div>
    <div class="pr-2">
      <input
        class="rounded-2xl text-center h-8 w-14"
        placeholder='min'
        type="number"
        max="59"
        min="0"
        @change="listenTime"
      />
    </div>
    <div>
      <input
        class="rounded-2xl text-center h-8 w-14"
        placeholder='sec'
        type="number"
        max="59"
        min="0"
        @change="listenTime"
      />
    </div>
  </div>
</template>