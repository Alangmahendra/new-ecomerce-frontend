<template>
  <div>
    <b-card 
            style="max-width: 15rem; height:20rem"
            img-top
             class="mb-2 img">
             <img :src="data.image" alt="ceritanya">
            <h4 slot="header">{{data.item_names}}</h4>
            <p> harga : Rp{{ data.cost }} <br> Kategori: {{data.categoryId.category}} </p>
        <b-button-group class="bawah">
          <b-button variant="primary" @click="buyButton(data)">buy</b-button>
        </b-button-group>
    </b-card>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["data"],
  name: "Oneitem",
  data() {
    return {
      dataItem:{
        image : this.data.image,
        item_names : this.data.item_names,
        cost : this.data.cost,
        categoryId : this.data.categoryId
      }
    };
  },
  methods:{
    ...mapMutations([
      'buyButton',
      'cartItems'
    ])
  }
};
</script>

<style>
.tengah {
  align-items: center;
}
img{
  max-width: 200px;
}
.bawah{
  float:bottom;
}
</style>
