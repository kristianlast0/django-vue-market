<template>
    <div class="column is-3">
        <div class="box p-0">
            <figure class="mb-1 w-full">
                <img v-bind:src="product.get_thumbnail" v-bind:alt="product.name" class="w-full">
            </figure>
            <div class="p-4">
                <h3 class="is-size-4">{{ product.name }}</h3>
                <p class="is-size-6 has-text-grey">${{ product.price }}</p>
                <router-link v-bind:to="product.get_absolute_url" class="button is-dark is-fullwidth mt-4">
                    <strong class="ml-2">View Details</strong>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import * as types from '../store/mutation-types'
export default {
  name: 'ProductBox',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart() {
      const item = {
        product: this.product,
        quantity: 1
      }
      this.$store.commit(`cart/${types.ADD_TO_CART}`, item)
    }
  }
}
</script>

<style scoped>
  .image {
    height: 200px;
    width: 200px;
    margin: 0 auto;
  }
</style>
