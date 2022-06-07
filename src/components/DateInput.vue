<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        dateObj: state => state.dateObj,
        timeObj: state => state.timeObj,
      })
    },
    methods: {
      toUnixTimestamp(year,month,day,hour,minute,second) {
        const dateUnixTimestamp = new Date(Date.UTC(year,month,day,hour,minute,second));
        return dateUnixTimestamp.getTime()/1000;
      },
      listChangeDate({ target }) {
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
      },
    },
  }
</script>

<template>
  <div class="">
    <input type=date @change="listChangeDate"/>
  </div>
</template>