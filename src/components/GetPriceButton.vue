<script>
  import { getPriceDated } from '../service/geckoApi';
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        currency: state => state.currency,
        date: state => state.date,
      })
    },
    methods: {
      async getPriceByDate() {
        const dataPrice = await getPriceDated(this.$store.state.currency, this.$store.state.date)
        const { prices } = dataPrice;
        this.$store.dispatch('setPriceOnDate', prices[0][1]);
      },
    },
  }
</script>

<template lang="">
  <div>
    <button type="button" @click="getPriceByDate" >Confirm</button>    
  </div>
</template>