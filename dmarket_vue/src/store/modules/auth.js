import * as types from '../mutation-types'
import axios from 'axios'

const setAuthorizationHeader = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const state = {
    isAuthenticated: false,
    token: '',
};

const getters = {
    isAuthenticated: (state) => {
        return state.isAuthenticated
    },
};

const mutations = {
    [types.SET_TOKEN](state, token) {
        state.token = token
        state.isAuthenticated = true
        localStorage.setItem('token', token)
        setAuthorizationHeader(token)
    },
    [types.REMOVE_TOKEN](state) {
        state.token = ''
        state.isAuthenticated = false
        localStorage.removeItem('token')
        setAuthorizationHeader('')  
    },
};
  
const actions = {
    // auth actions
    login({ commit }, credentials) {
        commit(types.SET_IS_LOADING, true, { root: true })
        commit(types.REMOVE_TOKEN)
        return new Promise((resolve, reject) => {
            axios.post('/api/v1/token/login/', credentials)
                .then(response => {
                    commit(types.SET_TOKEN, response.data.access_token)
                    resolve(response)
                })
                .catch(error => {
                    commit(types.REMOVE_TOKEN)
                    reject(error.response || error);
                })
                .finally(() => commit(types.SET_IS_LOADING, false, { root: true }))
        })
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};