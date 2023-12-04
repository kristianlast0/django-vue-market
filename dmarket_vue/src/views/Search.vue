<template>
    <div class="page-search">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">
                    Search Results for "{{ query }}"
                </h2>
            </div>
            <ProductBox v-for="product in products" v-bind:product="product" v-bind:key="product.id"></ProductBox>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '@/components/ProductBox.vue';

export default {
    name: 'Search',
    data() {
        return {
            products: [],
            query: ''
        }
    },
    components: {
        ProductBox
    },
    mounted() {
        document.title = 'Search - DMarket';
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        console.log(params.get('query'));
        this.query = params.get('query') || '';
        this.getProducts();
    },
    methods: {
        async getProducts() {
            this.$store.commit('setIsLoading', true);
            await axios
                .post('/api/v1/products/search/', { 'query': this.query })
                .then(response => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.log(error);
                    // toast({
                    //     message: 'Something went wrong, please try again later.',
                    //     type: 'is-danger',
                    //     dismissable: true,
                    //     pauseOnHover: true,
                    //     duration: 3000,
                    //     position: 'bottom-left',
                    // })
                });
            this.$store.commit('setIsLoading', false);
        }
    }
}
</script>