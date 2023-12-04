<template>
    <div class="page-my-account">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h1 class="title">My Account</h1>
            </div>
            <div class="column is-12">
                <button class="button is-danger" @click="logout">Log Out</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyAccount',
  methods: {
    logout() {
        axios.defaults.headers.common['Authorization'] = ''
        // this.$store.commit('logout')
        localStorage.removeItem('token')
        this.$router.push('/login')
    }
  },
  mounted() {
    document.title = 'My Account - DMarket';
  },
}
</script>