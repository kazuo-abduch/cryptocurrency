import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './index.css'

const store = createStore({
  state() {
    return {
      hasSearched: false,
      currency: 'Bitcoin',
      price: '',
      date: 1641006000,
      priceOnDate: '',
      dateObj: {
        day: 0,
        month: 0,
        year: 0
      },
      timeObj: {
        hour: 0,
        minute: 0,
        seconds: 0
      },
    }
  },
  mutations: {
    setHasSearched(state, newSearch) {
      state.hasSearched = newSearch
    },
    setCurrency(state, newCurrency) {
      state.currency = newCurrency;
    },
    setPrice(state, newPrice) {
      state.price = newPrice;
    },
    setDate(state, newDate) {
      state.date = newDate;
    },
    setPriceOnDate(state, newPriceOnDate) {
      state.priceOnDate = newPriceOnDate;
    },
    setDateObj(state, newDateObj) {
      state.dateObj = newDateObj;
    },
    setTimeObj(state, newTimeObj) {
      state.timeObj = newTimeObj;
    },
  },
  actions: {
    setPrice({ commit }, newPrice) {
      commit('setPrice', newPrice);
    },
    setDate({ commit }, newDate) {
      commit('setDate', newDate);
    },
    setPriceOnDate({ commit }, newPriceOnDate) {
      commit('setPriceOnDate', newPriceOnDate)
    },
    setDateObj({ commit }, newDateObj) {
      commit('setDateObj', newDateObj);
    },
    setTimeObj({ commit }, newTimeObj) {
      commit('setTimeObj', newTimeObj);
    },
  }
})

const app = createApp(App);
app.use(store);
app.mount('#app');
