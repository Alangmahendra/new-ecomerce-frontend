<template>
    <div class="nav">
      <b-container>
      <b-form-input type="text" v-model="username" placeholder="username"></b-form-input> <br>
      <b-form-input type="password" v-model="password" placeholder="password"></b-form-input> <br>
      <b-button @click="signup">signup</b-button>
      <b-button @click="signin">signin</b-button>
    </b-container>
    </div>
</template>

<script>
import router from '@/router'
import axios from 'axios'
let baseUrl = `http://neoal.xyz:3009/api`
export default {
  name : 'Login',
  data(){
    return{
      username :'',
      password :'',
    }
  },
  methods:{
    signup(){
      let local = this
      axios.post(`${baseUrl}/signup`,{username : this.username,password : this.password})
      .then(response =>{
        console.log(response)
        console.log('terdaftar')
       
      })
      .catch(err =>{
        console.log(err)
      })
    },
    signin(){
      axios.post(`${baseUrl}/signin`,{username : this.username,password : this.password})
      .then(response =>{
        console.log(response.data.token)
        console.log(response.data.role)
        console.log('masuk')
        localStorage.setItem('token',response.data.token)
        if(response.data.role == 'admin'){
           localStorage.setItem('admin',response.data.role)
        }else {
          console.log('bukan admin')
        }
        this.username =''
        this.password =''
        let token = localStorage.getItem('token')
        let admin =localStorage.getItem('admin')
        if(token && admin){
          router.push({name : 'Adminpage'})
        } else{
          router.push({name : 'Home'})
        }
      })
      .catch(err =>{
        console.log(err)
      })
    }
  }

}
</script>

<style>
.nav{
  margin-top: 30px
}
</style>
