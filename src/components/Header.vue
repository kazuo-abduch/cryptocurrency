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
        this.$store.commit('setCurrency', target.innerText);
        const { response, currencyUrl } = await getPrice(this.$store.state.currency);
        this.$store.dispatch('setPrice', response[currencyUrl].usd);
      }
    }
  }
</script>

<template>
  <header class="item">
    <h1>CryptoCurrency</h1>
    <ul>
      <li
        v-for="(currency, index) in renderList" v-bind:key="index"
        @click="listenCurrency"
      >
        {{currency}}
      </li>
    </ul>
  </header>
</template>

<style scoped>
  ul {
    margin: auto;
    list-style: none;
    display: flex;
  }
  li {
    margin-right: 5px;
  }
</style>
