<script>
  import { mapState } from 'vuex';
  import { getPrice } from '../service/geckoApi';
  export default {
    data() {
        return {
          currencies: [
            'BTC',
            'DACXI',
            'ETH',
            'ATOM',
            'LUNA',
          ]
        }
      },
      computed: {
        renderList() {
          return this.currencies.map(currency => currency);
        },
        ...mapState({
          currency: state => state.currency,
          price: state => state.price,
        })
      },
      methods: {
        async listenCurrency({ target }) {
          this.$store.commit('setCurrency', target.value);
          const { response, currencyUrl } = await getPrice(this.$store.state.currency);
          this.$store.dispatch('setPrice', response[currencyUrl].usd);
        }
      }
  }
</script>

<template>
  <select @change="listenCurrency">
      <option
        v-for="(currency, index) in renderList" v-bind:key="index"
      >
        {{currency}}
      </option>
    </select>
</template>