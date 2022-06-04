<script>
  import { mapState } from 'vuex';
  import { getPrice, getPriceDated } from '../service/geckoApi';
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
        const { hour, minute, seconds } = this.time
        const dateArray = target.value.split('-');
        const dateUnix = this.toTimeStamp(
          Number(dateArray[0]),
          Number(dateArray[1])-1,
          Number(dateArray[2])+1,
          hour,
          minute,
          seconds,
        );
        this.renderDate = new Date(dateUnix);
        this.$store.commit('setDate', dateUnix);
      },
      getToday() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const date = new Date();
        this.$store.commit('setDate', Math.floor(date.getTime()/1000));
        this.dateObj.day = date.getDate();
        this.dateObj.month = date.getMonth() + 1;
        this.dateObj.year = date.getFullYear();
        this.time.hour = ("0" + date.getHours()).slice(-2);
        this.time.minute = ("0" + date.getMinutes()).slice(-2);
        this.time.seconds = ("0" + date.getSeconds()).slice(-2);
        this.renderDate = `${months[this.dateObj.month - 1]} ${this.dateObj.day} ${this.dateObj.year} ${this.time.hour}hr${this.time.minute}min${this.time.seconds}sec`;
      },
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
    Price on {{ this.renderDate }}: USD {{ this.$store.state.priceOnDate }}
  </div>
</template>

<style></style>