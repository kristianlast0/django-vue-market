<template>
    <div class="page-product">
        <div class="columns">
            <div class="column is-9">
                <figure class="image mb-6">
                    <img v-bind:src="product.get_image" v-bind:alt="product.name" width="100%">
                </figure>
                <h1 class="title">{{ product.name }}</h1>
                <p>{{ product.description }}</p>
            </div>
            <div class="column is-3">
                <h2 class="is-size-4">Price: ${{ product.price }}</h2>
                <div class="field has-addons mt-6">
                    <div class="control">
                        <input class="input" type="number" value="1" min="1" v-model="quantity">
                    </div>
                    <div class="control">
                        <button class="button is-dark is-fullwidth" @click="addToCart()">
                            <span class="material-symbols-sharp">shopping_cart_checkout</span>
                            <strong class="ml-2">Add to Basket</strong>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: 'Product',
    data() {
        return {
            product: {},
            quantity: 1
        }
    },
    mounted() {
        this.getProduct();
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading', true);
            const category_slug = this.$route.params.category_slug;
            const product_slug = this.$route.params.product_slug;
            await axios
                .get(`/api/v1/products/${category_slug}/${product_slug}`)
                .then(response => {
                    this.product = response.data;
                    document.title = this.product.name + ' - DMarket';
                })
                .catch(error => {
                    console.log(error);
                });
            this.$store.commit('setIsLoading', false);
        },
        addToCart() {
            const item = {
                product: this.product,
                quantity: this.quantity || 1,
            };
            if(this.$store) this.$store.commit('cart/addToCart', item);
            // toast({
            //     message: 'Item added to cart',
            //     type: 'is-success',
            //     dismissable: true,
            //     pauseOnHover: true,
            //     duration: 3000,
            //     position: 'bottom-left',
            // })
        }
    },
}
</script>