import { createStore } from 'vuex'
import * as types from './mutation-types';
import cartModule from './modules/cart';
import authModule from './modules/auth';

export default createStore({
  modules: {
    auth: authModule,
    cart: cartModule,
  },
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: (state) => {
      return state.isLoading
    },
  },
  mutations: {
    [types.INITIALIZE_STORE](state) {
      // check if cart exists in localStorage or initialize it
      const cart = localStorage.getItem('cart')
      if (cart) state.cart = JSON.parse(cart)
      // check if token exists
      const token = localStorage.getItem('token')
      if (token) {
        // set token and isAuthenticated to true
        state.auth.token = token
        state.auth.isAuthenticated = true
      } else {
        // set token and isAuthenticated to false
        state.auth.token = ''
        state.auth.isAuthenticated = false
      }
    },
    [types.SET_IS_LOADING](state, status) {
      console.log('state', state);
      state.isLoading = status
    },
  },
  actions: {
  },
})
