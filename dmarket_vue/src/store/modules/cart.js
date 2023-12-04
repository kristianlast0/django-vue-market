import * as types from '../mutation-types';

const state = {
  items: [],
};

const getters = {
  // check if product is in cart
  productIsInCart: (state) => (product) => {
    return state.items?.filter(i => i.product.id === product.id).length;
  },
  // get cart cart.items
  items: (state) => {
    return state.items;
  },
  // get cart total
  total: (state) => {
    return state.items?.reduce((acc, cur) => (acc + (cur.product.price * cur.quantity)), 0);
  },
  // get cart total quantity
  quantity: (state) => {
    return state.items?.reduce((acc, cur) => (acc + cur.quantity), 0);
  },
};

const mutations = {
    // cart mutations
    [types.SET_CART](state, cart) {
        state = { ...cart };
        localStorage.setItem('cart', JSON.stringify(state));
    },
    [types.ADD_TO_CART](state, item) {
        console.log('item', item);
        console.log('state.cart', state);
        // Ensure that state is initialized
        state = state || { items: [] };
        // check if item already exists in cart
        const exists = state.items ? state.items.filter(i => i.product.id === item.product.id) : [];
        // if item already exists in cart, update quantity or add a new item
        if (exists.length) exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity);
        else state.items = [...state.items, item];
        // set localStorage
        localStorage.setItem('cart', JSON.stringify(state));
    },
    [types.REMOVE_FROM_CART](state, product) {
        state.items = [...state.items.filter(i => i.product.id !== product.id)];
        localStorage.setItem('cart', JSON.stringify(state));
    },
    [types.INCREASE_QUANTITY](state, product) {
        state.items = state.items.map(i => {
            if (i.product.id === product.id) i.quantity = parseInt(i.quantity) + 1;
            return i;
        });
        localStorage.setItem('cart', JSON.stringify(state));
    },
    [types.DECREASE_QUANTITY](state, product) {
        state.items = state.items.map(i => {
            if (i.product.id === product.id) i.quantity = parseInt(i.quantity) - 1;
            return i;
        }).filter(i => i.quantity > 0);
        localStorage.setItem('cart', JSON.stringify(state));
    },
};

const actions = {
  // cart actions
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};