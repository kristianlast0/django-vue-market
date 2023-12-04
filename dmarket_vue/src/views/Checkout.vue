<template>
    <div class="page-checkout">
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="is-size-2 has-text-centered">
                    Checkout
                </h2>
            </div>
            <div class="column is-12">
                <!-- Display the cart items and total -->
                <table class="table is-fullwidth" v-if="cartTotalLength">
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
            </div>
            <div class="column is-12 box">
                <form @submit.prevent="submit">
                    <div class="columns">
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">First Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="form.first_name" required>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Last Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="form.last_name" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input class="input" type="email" v-model="form.email" required>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Phone</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="form.phone" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-12">
                            <div class="field">
                                <label class="label">Address</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="form.address" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">City</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="form.city" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">State</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="form.state" required>
                                </div>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Zip</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="form.zip" required>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="columns">
                        <div class="column is-12">
                            <button class="button is-primary is-fullwidth" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>          
    </div>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
export default {
    name: 'Checkout',
    data() {
        return {
            cart: {
                items: []
            },
            form: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zip: ''
            },
            errors: {
                first_name: '',
                last_name: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                state: '',
                zip: ''
            }
        }
    },
    components: {
        CartItem: CartItem
    },
    mounted() {
        document.title = 'Checkout - DMarket';
        this.cart = this.$store.state.cart;
    },
    methods: {
        cartTotalLength() {
            return this.cart.items.reduce((total, item) => {
                return total + item.quantity;
            }, 0);
        },
        submit() {
            console.log(this.form);
        }
    }
}

</script>