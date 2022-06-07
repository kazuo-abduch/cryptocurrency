<script>
  import { mapState } from 'vuex';
  import { getPriceDated } from '../service/geckoApi';
  export default {
    computed: {
      ...mapState({
        dateObj: state => state.dateObj,
        timeObj: state => state.timeObj,
        currency: state => state.currency,
        price: state => state.price,
      })
    },
    methods: {
      toUnixTimestamp(year,month,day,hour,minute,second) {
        const dateUnixTimestamp = new Date(Date.UTC(year,month,day,hour,minute,second));
        return dateUnixTimestamp.getTime()/1000;
      },
      async listChangeDate({ target }) {
        const dateArray = target.value.split('-');
        const newDateObj = {
          day: Number(dateArray[2]),
          month: Number(dateArray[1]),
          year: Number(dateArray[0]),
        };
        const dateUnix = this.toUnixTimestamp(
          newDateObj.year,
          newDateObj.month - 1,
          newDateObj.day,
          Number(this.$store.state.timeObj.hour),
          Number(this.$store.state.timeObj.minute),
          Number(this.$store.state.timeObj.seconds),
        );
        this.$store.commit('setDateObj', newDateObj);
        this.$store.commit('setDate', dateUnix);
        const dataPrice = await getPriceDated(this.$store.state.currency, this.$store.state.date);
        const { prices } = dataPrice;
        this.$store.dispatch('setPriceOnDate', prices[0][1]);
      },
    },
  }
</script>

<template>
  <div class="flex p-5 lg:p-0 lg:pb-5">
    <img src="../assets/calendarIcon.svg" class="pr-5">
    <input
      class="rounded-2xl text-center"
      type=date
      @change="listChangeDate"
    />
  </div>
</template>