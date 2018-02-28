<template>
  <div>
    <b-card-group class="container">
      <b-card>
       <h5>create user</h5> 
        <form @submit.prevent="addUser(formUser)">
          <b-form-input type="text" v-model="formUser.username" placeholder="username" size="5"></b-form-input> <br>
          <b-form-input type="password" v-model="formUser.password" placeholder="password" size="5"></b-form-input> <br>
          <b-form-input type="text" v-model="formUser.role" placeholder="role" size="5"></b-form-input> <br>
          <b-button type="submit">create</b-button>
        </form>
      </b-card>
      <b-card>
        <h5>create items</h5>
        <form @submit.prevent="addItem(formItem)">
          <b-form-file id="image" v-model="formItem.image" :state="Boolean(formItem.image)" placeholder="Choose a file..."></b-form-file>
        <b-input v-model="formItem.item_names" placeholder="name of item"></b-input>
        <b-input v-model="formItem.quantity" type="number" placeholder="quantity"></b-input>
        <b-input v-model="formItem.cost" type="number" placeholder="cost"></b-input>
        <b-form-select v-model="formItem.category_items">
          <option v-for="choose in allCategories" :key="choose._id" :value="choose._id">{{choose.category}}</option>
        </b-form-select>
        
        <b-form-textarea id="textarea1"
                     v-model="formItem.description"
                     placeholder="item description"
                     :rows="3"
                     :max-rows="6">
    </b-form-textarea>
    <b-button type="submit">create</b-button>
        </form>
      </b-card>
      <b-card>
        <h5>create category</h5>
         <form @submit.prevent="addCategory(formCategory)">
           <b-input v-model="formCategory.category_name" placeholder="name of category"></b-input>
            <b-button type="submit" >create</b-button>
         </form>
         <br>
         <b-card>
           <ul v-for="category in allCategories" :key="category._id">
             <li>{{category.category}}</li>
           </ul>
         </b-card>
      </b-card>
    </b-card-group>
    <br>
      <div class="container">
         <b-card-group deck>
         <authority v-for="data in allItems" :key="data._id" :data="data"/>
        </b-card-group>
      </div>
     
     
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import authority from './Adminauthority'
import axios from 'axios'
let baseUrl = `http://localhost:3000/api`
let token = localStorage.getItem('token')
export default {
  components:{authority},
  name : 'Adminpage',
  data(){
    return{

      formUser :{
      username:'',
      password:'',
      role:'',
      },

      formItem:{
      item_names :'',
      quantity : '',
      description:'',
      category_items:null,
      cost : '',
      image : '',
      },

      formCategory:{
        category_name:''
      }
      
    }
  },
  computed:{
    ...mapState([
      'allCategories',
      'allItems',
      'allUser'
    ])
  },
  created (){
   this.getAllitem(),
   this.getAllCategories(),
   this.getAllUser()
  },
  methods:{
    ...mapActions([
      'addUser',
      'addItem',
      'addCategory',
      'getAllCategories',
      'getAllitem',
      'getAllUser'
      
    ])
  }
}
</script>

<style>

</style>
