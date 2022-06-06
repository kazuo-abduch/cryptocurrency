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

<template lang="">
  <div>
    {{ this.$store.state.currency }} Current price: USD {{ this.$store.state.price }}
  </div>
</template>