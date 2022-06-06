<script>
  import { mapState } from 'vuex';
  export default {
    computed: {
      ...mapState({
        dateObj: state => state.dateObj,
      })
    },
    methods: {
      listChangeDate({ target }) {
        console.log(Date.now());
        const dateArray = target.value.split('-');
        const newDateObj = {
          day: Number(dateArray[2]),
          month: Number(dateArray[1]),
          year: Number(dateArray[0]),
        }
        this.$store.commit('setDateObj', newDateObj);
      },
    },
  }
</script>

<template>
  <div class="">
    <input type=date @change="listChangeDate"/>
  </div>
</template>