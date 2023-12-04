<template>
    <div class="page-cart">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">
                    Cart
                </h2>
            </div>
            <div class="column is-12 box">
                <table class="table is-fullwidth" v-if="cart.items.length > 0">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <CartItem v-for="item in cart.items" v-bind:initialItem="item" v-bind:key="item.product.id"></CartItem>
                    </tbody>
                </table>
                <p v-else class="has-text-centered">Your cart is empty.</p>
            </div>
            <div class="column is-3 is-offset-9 box">
                <div class="columns">
                    <div class="column is-6">
                        <strong>Total Price:</strong>
                    </div>
                    <div class="column is-6 has-text-right">
                        <strong>{{ this.$store.getters['cart/total'] }} GBP</strong>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-6">
                        <strong>Total Items:</strong>
                    </div>
                    <div class="column is-6 has-text-right">
                        <strong>{{ this.$store.getters['cart/quantity'] }}</strong>
                    </div>
                </div>
                <div class="columns" v-if="cart.items.length > 0">
                    <div class="column is-12">
                        <router-link to="/cart/checkout" class="button is-primary is-fullwidth">Checkout</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
export default {
    name: 'Cart',
    data() {
        return {
            cart: {
                items: []
            }
        };
    },
    components: {
        CartItem
    },
    mounted() {
        document.title = 'Cart - DMarket';
        this.cart = this.$store.state.cart;
    },
}
</script>