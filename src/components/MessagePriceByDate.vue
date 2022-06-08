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
        const months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];;
        return `${
          months[this.$store.state.dateObj.month - 1]} 
          ${this.$store.state.dateObj.day} - 
          ${this.$store.state.dateObj.year}`
      },
      setRenderTime() {
        return `
          ${this.$store.state.timeObj.hour}h
          ${this.$store.state.timeObj.minute}m
          ${this.$store.state.timeObj.seconds}s`
      }
    }
  }
</script>

<template>
  <div class="
    flex flex-col justify-around
    m-auto mt-5
    lg:mt-0 lg:w-500
    bg-[#3b3b3b] text-[#707070] rounded-2xl font-semibold
    w-fill h-44 p-2.5">
    <div class="flex">
      <img
        class="w-5 ml-2"
        src="../assets/calendarIcon.svg">
      <div class="pl-5">
        {{ this.setRenderDate() }}
      </div>
    </div>
    <div class="flex">
      <img
        class="w-6 ml-2"
        src="../assets/clockIcon.svg">
      <div class="pl-4">
        {{ this.setRenderTime() }} GTM+0000
      </div>
    </div>
    <div class="flex">
      <img
        class="w-7 ml-2"
        src="../assets/moneyIcon.svg">
      <div class="pl-3">
        ${{ this.$store.state.priceOnDate }}
      </div>
    </div>
  </div>
</template>