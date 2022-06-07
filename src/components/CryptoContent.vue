<script>
  import { mapState } from 'vuex';
  import { getPrice, getPriceDated } from '../service/geckoApi';
  import SelectCrypto from './SelectCrypto.vue';
  import CurrentPrice from './CurrentPrice.vue';
  import DateInput from './DateInput.vue';
  import TimeInput from './TimeInput.vue';
  import MessagePriceByDate from './MessagePriceByDate.vue';
  
  export default {
    data() {
      return {
        dateObj: {
          day: 0,
          month: 0,
          year: 0
        },
        time: {
          hour: 0,
          minute: 0,
          seconds: 0
        },
        renderDate: '',
      }
    },
    computed: {
      ...mapState({
        currency: state => state.currency,
        price: state => state.price,
        date: state => state.date,
        priceOnDate: state => state.priceOnDate,
      })
    },
    components: {
      SelectCrypto,
      CurrentPrice,
      DateInput,
      TimeInput,
      MessagePriceByDate,
    },
    methods: {      
      getToday() {        
        const date = new Date();
        this.$store.commit('setDate', Math.floor(date.getTime()/1000));
        
        const newDateObj = {
          day: date.getDate(),
          month:date.getMonth() + 1,
          year: date.getFullYear(),
        };
        const newTimeObj = {
          hour: ("0" + date.getHours()).slice(-2),
          minute:("0" + date.getMinutes()).slice(-2),
          seconds: ("0" + date.getSeconds()).slice(-2),
        };
        this.$store.commit('setDateObj', newDateObj);
        this.$store.commit('setTimeObj', newTimeObj);
      }
    },
    mounted() {
      setInterval(async () => {
        const { response, currencyUrl } = await getPrice(this.$store.state.currency);
        this.$store.dispatch('setPrice', response[currencyUrl].usd);
      }, 2000),
      this.getToday();
    },
  }
</script>

<template>
  <CurrentPrice />
  <SelectCrypto />
  <form>
    <DateInput />
    <TimeInput />
  </form>
  <div>
    <MessagePriceByDate />
  </div>
</template>

<style></style>