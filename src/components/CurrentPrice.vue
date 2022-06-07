<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        currency: state => state.currency,
        price: state => state.price,
      })
    },
  }
</script>

<template>
  <div
    class="
      text-neutral-500
      py-7
      font-sans
      text-center
      text-xl
      font-bold
      sm:px-20 sm:top-10 sm:text-3xl
      lg:text-left lg:px-10
    ">
    {{ this.$store.state.currency }} Current price: USD {{ this.$store.state.price }}
  </div>
</template>