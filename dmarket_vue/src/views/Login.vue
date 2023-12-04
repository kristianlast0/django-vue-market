<template>
    <div class="page-login">
        <div class="columns">
            <div class="column is-6 is-offset-3">
                <h1 class="title has-text-centered">Log In</h1>
                <div class="box">
                    <form @submit.prevent="login">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control">
                                <input class="input" type="text" v-model="user.username" required>
                            </div>
                            <p class="help is-danger" v-if="errors && errors.username">
                                {{ errors.username[0] }}
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input" type="password" v-model="user.password" required>
                            </div>
                            <p class="help is-danger" v-if="errors && errors.password">
                                {{ errors.password[0] }}
                            </p>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button class="button is-primary is-fullwidth">Log In</button>
                            </div>
                        </div>
                    </form>
                </div>
                <p class="has-text-centered">
                    Don't have an account? <router-link to="/sign-up">Sign Up</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            errors: {
                username: [],
                password: []
            }
        }
    },
    mounted() {
        document.title = 'Log In - DMarket';
        if(this.$store.getters['auth/isAuthenticated']) {
            this.$router.push('/cart');
        }
    },
    methods: {
        async login() {
            if(this.user.username == '' || this.user.password == '') {
                // toast({
                //     message: 'Please fill out all fields.',
                //     type: 'is-danger',
                //     dismissible: true,
                //     pauseOnHover: true,
                //     duration: 5000
                // })
                return
            }
            this.$store.dispatch('auth/login', this.user)
        }
    }
}
</script>