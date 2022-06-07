<script>
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        priceOnDate: state => state.priceOnDate,
        dateObj: state => state.dateObj,
        timeObj: state => state.timeObj,
      })
    },
    methods: {
      setRenderDate() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        return `${
          months[this.$store.state.dateObj.month - 1]} 
          ${this.$store.state.dateObj.day} 
          ${this.$store.state.dateObj.year} 
          ${this.$store.state.timeObj.hour}:
          ${this.$store.state.timeObj.minute}:
          ${this.$store.state.timeObj.seconds} 
          GTM+0000`;
      },
    }
  }
</script>

<template>
  <div>
    Price on {{ this.setRenderDate() }}:
  </div>
  <div>
    USD {{ this.$store.state.priceOnDate }}
  </div>
</template>