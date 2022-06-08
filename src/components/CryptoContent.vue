<script>
  import { mapState } from 'vuex';
  import { getPrice, getPriceDated } from '../service/geckoApi';

  import CurrentPrice from './CurrentPrice.vue';
  import SelectCrypto from './SelectCrypto.vue';
  import DateInput from './DateInput.vue';
  import TimeInput from './TimeInput.vue';
  import GetPriceButton from './GetPriceButton.vue';
  import MessagePriceByDate from './MessagePriceByDate.vue';

  export default {
    components: {
      SelectCrypto,
      DateInput,
      TimeInput,
      GetPriceButton,
      MessagePriceByDate,
      CurrentPrice,
    },
    computed: {
      ...mapState({
        hasSearched: state => state.hasSearched,
        currency: state => state.currency,
        price: state => state.price,
        date: state => state.date,
        priceOnDate: state => state.priceOnDate,
        dateObj: state => state.dateObj,
        timeObj: state => state.timeObj,
      })
    },
    methods: {
      getHasSearched() {
        return this.$store.state.hasSearched;
      },
      getToday() {        
        const date = new Date();
        this.$store.commit('setDate', Math.floor(date.getTime()/1000));
        const newDate = {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        };
        this.$store.commit('setDateObj', newDate);
        const newTime = {
          hour: ("0" + date.getHours()).slice(-2),
          minute: ("0" + date.getMinutes()).slice(-2),
          seconds: ("0" + date.getSeconds()).slice(-2),
        };
        this.$store.commit('setTimeObj', newTime);
      },
      async getPriceByDate() {  
        const dataPrice = await getPriceDated(this.$store.state.currency, this.$store.state.date)
        const { prices } = dataPrice;
        this.$store.dispatch('setPriceOnDate', prices[0][1]);
      },
    },
    mounted() {
      setInterval(async () => {
        const { response, currencyUrl } = await getPrice(this.$store.state.currency);
        this.$store.dispatch('setSearching', false);
        this.$store.dispatch('setPrice', response[currencyUrl].usd);
      }, 2000),
      this.getToday();
    },
  }
</script>

<template>
  <div>
    <CurrentPrice />
    <div class="flex flex-col items-center lg:items-start lg:flex-row lg:px-10">
      <SelectCrypto />
      <div class="lg:px-10">
        <DateInput />
        <TimeInput />
        <GetPriceButton />
      </div>
      <div v-if="getHasSearched()">
        <div class="changeOpacity">
          <MessagePriceByDate />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.changeOpacity {
  animation: fadeIn 0.5s;
}
</style>