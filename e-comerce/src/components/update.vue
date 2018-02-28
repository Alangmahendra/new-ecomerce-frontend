<template>
  <div class="container">
    <b-card-group deck>
      <b-card>
        <h5>current data item</h5>
        <img :src="oneItem.image" alt="gambar">
        <br>
        name : {{oneItem.item_names}} <br>
        quantity : {{oneItem.quantity}} <br>
        category : {{oneItem.categoryId.category}} <br>
        cost : {{oneItem.cost}} <br>
        description : {{oneItem.description}}
      </b-card>
      <b-card>
        <h5>edit here</h5>
         <form @submit.prevent="updateItem(formItem)">
          <b-form-file v-model="formItem.image" :state="Boolean(formItem.image)" placeholder="Choose a file..."></b-form-file>
          <b-input v-model="formItem.item_names" placeholder="name of item" ></b-input>
          <b-input v-model="formItem.quantity" type="number" placeholder="quantity"></b-input>
          <b-input v-model="formItem.cost" type="number" placeholder="cost"></b-input>
         <b-form-select v-model="formItem.categoryId">
          <option v-for="category in allCategories" :key="category._id" :value="category._id">{{category.category}}</option>
        </b-form-select>
        
        <b-form-textarea id="textarea1"
                     v-model="formItem.description"
                     placeholder="item description"
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
    <b-button type="submit">update</b-button>
        </form>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import { mapActions,mapState } from "vuex";
export default {
  name : 'Update',
  data(){
    return{
       formItem:{
        item_names :'',
        quantity : '',
        description:'',
        categoryId:null,
        cost : '',
        image : '',
      },
    }
  },
  computed:{
    ...mapState([
      'allCategories',
      'oneItem'
    ])
  },
  created(){
    this.findOne(this.$route.params.id)
  },
  methods:{
    ...mapActions([
      'findOne',
      'updateItem'
    ])
  },
  watch:{
    oneItem:{
      deep:true,
      handler(){
        console.log('ini one item',this.oneItem.categoryId._id)
        this.formItem = {
          ...this.formItem,
          ...this.oneItem,
          categoryId:this.oneItem.categoryId._id
        }
      }
    }
  }
}
</script>

<style>
img{
  width: 500px;
  height: auto;
}
</style>
