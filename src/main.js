import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import './index.css'

const store = createStore({
  state() {
    return {
      currency: 'Bitcoin',
      price: '',
      date: 1641006000,
      priceOnDate: '',
    }
  },
  mutations: {
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
    }
  }
})

const app = createApp(App);
app.use(store);
app.mount('#app');
