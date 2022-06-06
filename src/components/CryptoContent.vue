<script>
  import { mapState } from 'vuex';
  import { getPrice, getPriceDated } from '../service/geckoApi';
  import SelectCrypto from './SelectCrypto.vue';
  
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
      SelectCrypto
    },
    methods: {
      renderCurrency() {
        return this.$store.state.currency;
      },
      setRenderDate() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        this.renderDate = `${months[this.dateObj.month - 1]} ${this.dateObj.day} ${this.dateObj.year} ${this.time.hour}:${this.time.minute}:${this.time.seconds} GTM+0000`;
      },
      getToday() {        
        const date = new Date();
        this.$store.commit('setDate', Math.floor(date.getTime()/1000));
        this.dateObj.day = date.getDate();
        this.dateObj.month = date.getMonth() + 1;
        this.dateObj.year = date.getFullYear();
        this.time.hour = ("0" + date.getHours()).slice(-2);
        this.time.minute = ("0" + date.getMinutes()).slice(-2);
        this.time.seconds = ("0" + date.getSeconds()).slice(-2);
        this.setRenderDate();
      },
      toUnixTimestamp(year,month,day,hour,minute,second) {
        const dateUnixTimestamp = new Date(Date.UTC(year,month,day,hour,minute,second));
        return dateUnixTimestamp.getTime()/1000;
      },
      listChangeDate({ target }) {
        const { hour, minute, seconds } = this.time
        console.log(Date.now());
        const dateArray = target.value.split('-');
        this.dateObj.year = Number(dateArray[0]);
        this.dateObj.month = Number(dateArray[1]);
        this.dateObj.day = Number(dateArray[2]);
        this.setRenderDate();
        const dateUnix = this.toUnixTimestamp(
          this.dateObj.year,
          this.dateObj.month - 1,
          this.dateObj.day,
          Number(hour),
          Number(minute),
          Number(seconds),
        );
        this.$store.commit('setDate', dateUnix);
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
        this.setRenderDate();
      },
      async getPriceByDate() {  
        const dataPrice = await getPriceDated(this.$store.state.currency, this.$store.state.date)
        const { prices } = dataPrice;
        console.log(prices[0][1]);
        this.$store.dispatch('setPriceOnDate', prices[0][1]);
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
  <SelectCrypto />
  <div @change="listChangeDate">
    {{ renderCurrency() }}
  </div>
  <form>
    <input type=date @change="listChangeDate"/>
    <input placeholder='hour' type="number" max="23" min="0" @change="listenTime" />
    <input placeholder='minute' type="number" max="59" min="0" @change="listenTime" />
    <input placeholder='seconds' type="number" max="59" min="0" @change="listenTime" />
    <button type="button" @click="getPriceByDate" >Confirm</button>    
  </form>
  <div>
    Current price: USD {{ this.$store.state.price }}
  </div>
  <div>
    <div>
      Price on {{ this.renderDate }}:
    </div>
    <div>
      USD {{ this.$store.state.priceOnDate }}
    </div>
  </div>
</template>

<style></style>