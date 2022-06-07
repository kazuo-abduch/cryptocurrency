<script>
  import { mapState } from 'vuex';
  import { getPrice, getPriceDated } from '../service/geckoApi';
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
          const dataPrice = await getPriceDated(this.$store.state.currency, this.$store.state.date);
          const { prices } = dataPrice;
          this.$store.dispatch('setPriceOnDate', prices[0][1]);
          this.$store.dispatch('setPrice', response[currencyUrl].usd);
        },
      }
  }
</script>

<template>
  <select class="
    bg-[#3b3b3b] text-[#707070] rounded-2xl font-semibold
    block w-4/6 p-2.5 text-center
    lg:w-1/12"
    @change="listenCurrency">
      <option
        class="text-[#707070] rounded-2xl font-semibold"
        v-for="(currency, index) in renderList" v-bind:key="index"
      >
        {{currency}}
      </option>
    </select>
</template>