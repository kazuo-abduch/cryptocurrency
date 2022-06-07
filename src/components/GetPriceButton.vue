<script>
  import { getPriceDated } from '../service/geckoApi';
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        hasSearched: state => state.hasSearched,
        currency: state => state.currency,
        date: state => state.date,
      })
    },
    methods: {
      async getPriceByDate() {
        const dataPrice = await getPriceDated(this.$store.state.currency, this.$store.state.date)
        const { prices } = dataPrice;
        this.$store.dispatch('setPriceOnDate', prices[0][1]);
        this.$store.commit('setHasSearched', true);
      },
    },
  }
</script>

<template lang="">
  <div class="
    my-5
    bg-[#3b3b3b]
    text-[#707070]
    rounded-3xl
    text-center
    h-10 w-32">
    <button
      class="pt-2 font-semibold"
      type="button"
      @click="getPriceByDate"
    >
      Confirm
    </button>    
  </div>
</template>