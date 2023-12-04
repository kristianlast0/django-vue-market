<template>
  <div id="wrapper">

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>


    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </router-link>
        <div class="navbar-burger burger" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div class="navbar-menu" id="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">
        <div class="navbar-start">
          <div class="navbar-item">
            <form method="GET" action="/search">
              <div class="field has-addons">
                <div class="control">
                  <input class="input" type="text" name="query" placeholder="Search Products">
                </div>
                <div class="control">
                  <button class="button is-info">
                    <span class="material-symbols-sharp">search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="navbar-end">
          <router-link to="/" class="navbar-item">Home</router-link>
          <router-link to="/about" class="navbar-item">About</router-link>
          <router-link to="/contact" class="navbar-item">Contact</router-link>
          <div class="navbar-item">
            <div class="buttons">
              <template v-if="$store.getters['auth/isAuthenticated']">
                <router-link to="/my-account" class="button is-light">Account</router-link>
              </template>
              <template v-else>
                <router-link to="/login" class="button is-light">Login</router-link>
              </template>
              <!-- <router-link to="/login" class="button is-light">Log in</router-link> -->
              <router-link to="/cart" class="button is-primary">
                <span class="material-symbols-sharp">shopping_cart_checkout</span>
                <strong class="ml-2">Cart ({{ this.$store.getters['cart/quantity'] }}) {{ this.$store.getters['cart/total'] }}</strong>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="is-loading-bar has-text-centered" v-bind:class="{'is-loading': $store.state.isLoading}">
      <div class="lds-dual-ring"></div>
    </div>
    <section class="section">
      <router-view/>
    </section>
    <footer class="footer">
      <p class="has-text-centered">&copy; 2023 BEU IT LTD</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
// bootstrap
import 'bootstrap'

export default {
  name: 'App',
  data() {
    return {
      showMobileMenu: false,
      msg: 'Welcome to Your Vue.js App',
    }
  },
  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.auth.token
    if (token) axios.defaults.headers.common['Authorization'] = `Token ${token}`
    else axios.defaults.headers.common['Authorization'] = ''
  },
  mounted() {
    console.log('App.vue mounted')
    console.log(this.$store.state)
    this.cart = this.$store.state.cart
  },
}
</script>

<style lang="scss">

@import '../node_modules/bootstrap/scss/bootstrap.scss';

.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 8px;
  border-radius: 50%;
  border: 5px solid #CCC;
  border-color: #CCC transparent #CCC transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.is-loading-bar {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  -webkit-transition: height 0.3s ease-in-out;
  &.is-loading {
    height: 64px;
  }
}
</style>
