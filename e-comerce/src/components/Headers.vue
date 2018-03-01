<template>
  <div >
    <b-navbar toggleable="md" type="dark" variant="dark">

  <!-- <b-navbar-toggle target="nav_collapse"></b-navbar-toggle> -->

  <b-navbar-brand class="cursor" @click="home">e-commerce</b-navbar-brand>
   
      
     
    <b-navbar-nav class="ml-auto">
      <b-button size="sm" class="my-2 my-sm-0" @click="toggleModal()">cart</b-button>
        <b-nav-item-dropdown text="Category" right>
        <b-dropdown-item v-for="selected in allCategories" :key="selected._id" :value="selected._id" @click="searchCategory(selected._id)">{{selected.category}}</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>User</em>
        </template>
        <b-dropdown-item @click="admin">Admin</b-dropdown-item>
        <b-dropdown-item @click="tohistory">shopping history</b-dropdown-item>
        <b-dropdown-item @click="signout">Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
</b-navbar>
  </div>
</template>

<script>
import {mapActions,mapState,mapMutations} from 'vuex'
import router from '@/router'
let token = localStorage.getItem('token')
let admin = localStorage.getItem('admin')
let baseUrl = `http://localhost:3009/api`
import axios from 'axios'
export default {
  data(){
    return{
      input :'',
      
    }
  },
  computed:{
    ...mapState([
      'allCategories'
    ])
  }
  ,
  created(){
   this.getAllCategories()
  },
  methods:{
    ...mapMutations([
      'toggleModal'
    ]),
    ...mapActions([
      'getAllCategories'
    ]),

    signout(){
      if(token && admin){
        localStorage.clear()
        router.push({name : 'Login'})
      }
      else if(token){
         localStorage.clear()
          router.push({name : 'Login'})
      }
      else {
         localStorage.clear()
        alert('masuk aja belom,udah mau keluar... ente sehat ?')
        router.push({name : 'Login'})
      }
    },
    admin(){
      if(token && admin){
        router.push({name : 'Adminpage'})
      }else{
        alert('anda bukan admin silahkan masuk sebagai admin')
      }
    },
    home(){
      router.push({name : 'Home'})
    },

    searchCategory(id){
      console.log(id)
      router.push({name : 'Search',params:{id:id}})
    },

    tohistory(){
      if(!token){
        alert('login first')
        router.push({name : 'Login'})
      } else {
        router.push({name : 'History'})
        }
    }
  }
}
</script>

<style>
  .cursor {
  cursor: pointer;
  }
</style>
