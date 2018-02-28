<template>
   <b-card 
            style="max-width: 15rem"
            :img-src="datax.image"
            img-alt="ceritanya" 
            img-top
            class="mb-2">
            <h4 slot="header">{{datax.item_names}}</h4>
            harga : Rp{{ datax.cost }} 
            <br>
             Butuh: 
            <p v-for="item in cartItems" :key="item._id">{{item.quantity_on_cart}} </p> 
        <b-button-group class="">
          <b-button variant="danger">cancel</b-button>
          <b-button variant="primary" @click="buyButton(datax)">Add</b-button>
        </b-button-group>
    </b-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      test: null
    }
  },
  props:['datax'],
  computed: {
    ...mapState([
      'cartItems'
    ])
  },
  methods: {
    ...mapMutations([
      'buyButton'
    ]),
    
  },
  // watch: {
  //   cartItems : function(newVal, oldVal) {
  //     console.log(newVal, '<<< test new val', oldVal)
  //   }
  // }

}
</script>

<style>

</style>
