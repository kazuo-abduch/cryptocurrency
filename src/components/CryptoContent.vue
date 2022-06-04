<script>
  import { mapState } from 'vuex';
  import { getPrice, getPriceDated } from '../service/geckoApi';
  export default {
    data() {
      return {
        time: {
          hour: 0,
          minute: 0,
          seconds: 0
        }
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
    methods: {
      renderCurrency() {
        return this.$store.state.currency;
      },

      toTimeStamp(year,month,day,hour = 0,minute = 0,second = 0) {
        var dateUnixTimestamp = new Date(Date.UTC(year,month-1,day,hour,minute,second));
        return dateUnixTimestamp.getTime()/1000;
      },

      async getPriceByDate() {        
        const dataPrice = await getPriceDated(this.$store.state.currency, this.$store.state.date)
        const { prices } = dataPrice;
        console.log(prices[0][1]);
        this.$store.dispatch('setPriceOnDate', prices[0][1]);
      },

      listenTime({ target }) {
        if (target.placeholder === 'hour') {
          if (target.value > 23) {
            target.value = 23;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.time.hour = target.value;
        };
        if (target.placeholder === 'minute') {
          if (target.value > 59) {
            target.value = 59;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.time.minute = target.value;
        };
        if (target.placeholder === 'seconds') {
          if (target.value > 59) {
            target.value = 59;
            if (target.value < 0) {
              target.value = 0;
            }
          }
          this.time.seconds = target.value;
        };
      },

      listChangeDate({ target }) {
        console.log(target.value);
        const { hour, minute, seconds } = this.time
        const dateArray = target.value.split('-');
        const dateUnix = this.toTimeStamp(Number(dateArray[0]), Number(dateArray[1])-1, Number(dateArray[2])+1, hour, minute, seconds);
        // pode receber mais 3 parametros hr, min, seg
        console.log(dateUnix);
        // dateUnix.getTime()/1000 retorna a data atual em Unix Timestamp
        this.$store.commit('setDate', dateUnix);
      },
    },
    mounted() {
      setInterval(async () => {
        const { response, currencyUrl } = await getPrice(this.$store.state.currency);
        this.$store.dispatch('setPrice', response[currencyUrl].usd);
      }, 2000)     
    },
  }
</script>

<template>
  <div @change="listChangeDate">
    {{ renderCurrency() }}
  </div>
  <div>
    <input type=date @change="listChangeDate"/>
    <input placeholder='hour' type="number" max="23" min="0" @change="listenTime" />
    <input placeholder='minute' type="number" max="59" min="0" @change="listenTime" />
    <input placeholder='seconds' type="number" max="59" min="0" @change="listenTime" />
    <button @click="getPriceByDate" >Confirm</button>    
  </div>
  <div>
    Current price: USD {{ this.$store.state.price }}
  </div>
  <div>
    Price on {{ new Date(this.$store.state.date) }}: USD {{ this.$store.state.priceOnDate }}
  </div>
</template>

<style></style>