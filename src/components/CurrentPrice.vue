<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        searching: state => state.searching,
        currency: state => state.currency,
        price: state => state.price,
      })
    },
    methods: {
      returnSearching() {
        return this.$store.state.searching;
      }
    }
  }
</script>

<template>
  <div
    class="
      flex
      flex-row
      justify-center
      text-neutral-500
      py-7
      font-sans
      text-center
      text-xl
      font-bold
      sm:px-20 sm:top-10 sm:text-3xl
      lg:text-left lg:px-10 lg:justify-start
    ">
    <span>
      {{ this.$store.state.currency }} Current price
    </span>
    <span v-if="returnSearching()">
      <img src="../assets/spin.svg" class="animate-spin h-7 w-7 mx-3 lg:mt-1" viewBox="0 0 24 24">
    </span>
    <span v-else="returnSearching()" class="mx-3">
      ${{ this.$store.state.price }}
    </span>
  </div>
</template>