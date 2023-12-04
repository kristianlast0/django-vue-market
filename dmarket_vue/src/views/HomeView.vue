<template>
  <div class="home">
    <section class="hero is-medium is-dark mb-6" style="background-size:cover;background-image: url('https://images.unsplash.com/photo-1625662171891-9a3348f961f4?q=80');">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">
          Welcome to DMarket
        </p>
        <p class="subtitle">
          The best place to buy and sell digital goods
        </p>
      </div>
    </section>

    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">
          Latest Products
        </h2>
      </div>
      <ProductBox v-for="product in latestProducts" v-bind:product="product" v-bind:key="product.id"></ProductBox>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import ProductBox from '@/components/ProductBox.vue'

export default {
  name: 'HomeView',
  data() {
    return {
      latestProducts: []
    }
  },
  components: {
    HelloWorld,
    ProductBox
  },
  mounted() {
    this.getLatestProducts()
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true)
      await axios
        .get('/api/v1/latest-products')
        .then(response => {
          this.latestProducts = response.data;
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false);
    }
  }
}
</script>

