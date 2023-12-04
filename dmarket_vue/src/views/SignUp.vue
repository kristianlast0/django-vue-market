<template>
    <div class="page-sign-up">
        <div class="columns">
            <div class="column is-6 is-offset-3">
                <h1 class="title has-text-centered">Sign Up</h1>
                <div class="box">
                    <form @submit.prevent="signUp">
                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control">
                                <input class="input" type="text" v-model="user.username">
                            </div>
                            <p class="help is-danger" v-if="errors && errors.username">
                                {{ errors.username[0] }}
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control">
                                <input class="input" type="email" v-model="user.email">
                            </div>
                            <p class="help is-danger" v-if="errors && errors.email">
                                {{ errors.email[0] }}
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control">
                                <input class="input" type="password" v-model="user.password">
                            </div>
                            <p class="help is-danger" v-if="errors && errors.password">
                                {{ errors.password[0] }}
                            </p>
                        </div>
                        <div class="field">
                            <label class="label">Confirm Password</label>
                            <div class="control">
                                <input class="input" type="password" v-model="user.password2">
                            </div>
                            <p class="help is-danger" v-if="errors && errors.password2">
                                {{ errors.password2[0] }}
                            </p>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button class="button is-primary is-fullwidth">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
                <p class="has-text-centered">
                    Already have an account? <router-link to="/sign-in">Sign In</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SignUp',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
                password2: ''
            },
            errors: {
                username: [],
                email: [],
                password: [],
                password2: []
            }
        }
    },
    mounted() {
        document.title = 'Sign Up - DMarket';
    },
    methods: {
        async signUp() {

            this.errors = {
                username: [],
                email: [],
                password: [],
                password2: []
            };

            if(!this.user.username) this.errors.username.push('The username field is required.')
            if(!this.user.email) this.errors.email.push('The email field is required.')
            if(!this.user.password) this.errors.password.push('The password field is required.')
            if(!this.user.password2) this.errors.password2.push('The password confirmation field is required.')
            if(this.user.password != this.user.password2) this.errors.password2.push('The password confirmation does not match.');

            if(this.errors.username.length || this.errors.email.length || this.errors.password.length || this.errors.password2.length) return;

            axios
                .post('/api/v1/users/', this.user)
                .then(response => {
                    // toast({
                    //     message: 'Account created, please login.',
                    //     type: 'is-success',
                    //     dismissable: true,
                    //     pauseOnHover: true,
                    //     duration: 3000,
                    //     position: 'bottom-left',
                    // })
                    // this.$store.commit('setUser', response.data);
                    this.$router.push({ name: 'Login' });
                })
                .catch(error => {
                    console.log(error)
                    this.errors = error.response.data;
                });

            // await this.$store.dispatch('signUp', this.user)
            //     .then(() => {
            //         this.$router.push({ name: 'Home' });
            //     })
            //     .catch(error => {
            //         this.errors = error.response.data;
            //     });
        }
    }
}
</script>