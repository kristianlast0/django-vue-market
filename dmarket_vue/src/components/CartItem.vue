<template>
    <tr>
        <td><router-link :to="item.product.get_absolute_url">{{ item.product.name }}</router-link></td>
        <td>
            <button class="button is-info is-small px-1" @click="decrementQuantity">
                <span class="material-symbols-sharp">remove</span>
            </button>
            <span class="mx-3">
                {{ item.quantity }}
            </span>
            <button class="button is-info is-small px-1 mr-1" @click="incrementQuantity">
                <span class="material-symbols-sharp">add</span>
            </button>
        </td>
        <td>£{{ item.product.price }}</td>
        <td>£{{ getItemTotal().toFixed(2) }}</td>
        <td>
            <button class="button is-danger is-small px-1" @click="removeFromCart">
                <span class="material-symbols-sharp">delete</span>
            </button>
        </td>
    </tr>
</template>

<script>
import * as types from '@/store/mutation-types'
export default {
  name: 'CartItem',
  props: {
    initialItem: Object
  },
  data() {
    return {
      item: this.initialItem,
    }
  },
  methods: {
    getItemTotal() {
        return this.item.product.price * this.item.quantity
    },
    removeFromCart() {
        this.$store.commit(`cart/${types.REMOVE_FROM_CART}`, this.item.product)
    },
    incrementQuantity() {
        this.$store.commit(`cart/${types.INCREASE_QUANTITY}`, this.item.product)
    },
    decrementQuantity() {
        this.$store.commit(`cart/${types.DECREASE_QUANTITY}`, this.item.product)
    },
  }
}
</script>