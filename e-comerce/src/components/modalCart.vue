<template>
  <div>
    <b-modal v-model="xxxModalopened" @ok="confirmCheckout" ok-title="CHECKOUT" ok-only ok-variant="success" size="lg">
      total : 
      <p v-for="(cost, index) in cartItems" :key="index">{{cost.cost * cost.quantity_on_cart }}</p>
      <b-card-group deck>
        <item v-for="data in cartItems" :key="data._id" :datax="data"></item>
      </b-card-group>
     
    </b-modal>
  </div>

</template>

<script>
import item from './Modalitem'
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  components: {item},
  data() {
    return {
      modalShow: false
    }
  },
  created(){
    
  },
  computed: {
    xxxModalopened: {
      get() {
        return this.$store.state.modalOpened;
      },
      set(value) {
        console.log('ini value',value)
        this.$store.commit("toggleModal", value);
      }
    },
    ...mapState([
      'cartItems',
    ])
  },
  methods: {
    ...mapActions([
     'checkout'
    ]),
    confirmCheckout(){
      for (let i = 0; i < this.cartItems.length; i++) {
        this.checkout({
          items:this.cartItems[i]._id,
          quantity:this.cartItems[i].quantity_on_cart,
          total:this.cartItems[i].cost*this.cartItems[i].quantity_on_cart
          })
      }
      
    }
  },
  
};
</script>

<style>
p{
  
}
</style>
