import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { start } from 'repl';

const token = localStorage.getItem('token')
const http = axios.create({
  baseURL:`http://neoal.xyz:3009/api`
})

Vue.use(Vuex)


const state = {
  allItems : [],
  allCategories: [],
  allUser : [],
  allItemByCategory : [],
  oneItem:null,
  editedItem:null,
  modalOpened:false,
  cartItems:[],
  history:[]
}

const actions = {
  // item=============================================>
  getAllitem({commit}){
    http.get(`/item`)
    .then(({data}) => {
      console.log('data yg harusnya array',data.data)
      commit('setItem',data.data)
    })
    .catch(err => console.error(err))
  },
  addItem({commit},newItem){
   console.log('ini new item',newItem)
   let formData = new FormData()
   formData.append("item_names",newItem.item_names)
   formData.append("quantity",newItem.quantity)
   formData.append("description",newItem.description)
   formData.append("categoryId",newItem.category_items)
   formData.append("cost",newItem.cost)
   formData.append("image",newItem.image)
    http.post('/item',formData,{
      headers : {
        Authorization : token
      }
    })
    .then(({data}) => {
      console.log('data yg akan jadi item',data.data);
      commit('saveItem',data.data)
    })
    .catch(err => console.error(err))
  },
  removeItem({commit},itemId){
    console.log('ini id yg bakal di hapus',itemId)
    http.delete(`/item/${itemId}`,{
      headers : {Authorization : token}
    })
    .then(({data}) => {
      console.log('data action removetodo',data)
      commit('deleteItem',{item:data.data})
    })
    .catch(err => console.error(err))
  },
  categoryItem({commit},id){
    // categoryId=this.$route.params.id
    console.log('id kategory yg dicari',id)
    http.get(`/item/category/${id}`)
    .then(({data})=>{
      console.log('search data',data.data)
      commit('allItemofCategory',data.data)
    })
    .catch(err => console.error(err))
  },
  findOne({commit},id){
    http.get(`/item/${id}`,{headers:
      {Authorization : token}
    })
    .then(({data})=>{
      console.log('data findone',data.data)
      commit('setOneitem',data.data)
    })
    .catch(err => console.error(err))
  },
  updateItem({commit},updateData){
    console.log('ini update data',updateData)
    let formData = new FormData()
    formData.append("item_names",updateData.item_names)
    formData.append("quantity",updateData.quantity)
    formData.append("description",updateData.description)
    formData.append("categoryId",updateData.categoryId)
    formData.append("cost",updateData.cost)
    formData.append("image",updateData.image)
    console.log('ini formData',formData)
    http.put(`/item/${updateData._id}`,formData,{
      headers:{Authorization:token}
    })
    .then(({data})=>{
      console.log('terapdet',data.data)
      commit('saveUpdate',data.data)
    })
    .catch(err => console.error(err))
  }
  ,
  // kategori==================================>
  getAllCategories({commit}){
    http.get('/category')
    .then(({data})=>{
      console.log('ini semua kategory',data.data);
      commit('setCategory',data.data)
    })
    .catch(err => console.error(err))
  },
  addCategory({commit},formCategory){
    console.log('ini kategory baru',formCategory)
    http.post(`/category`,{category:formCategory.category_name},{
      headers : {Authorization : token}
    })
    .then(({data}) =>{
      console.log('data di action',data.data)
      commit('saveCategory',{category : data.data})
    })
    .catch(err => console.error(err))
  },
  // user=================================================>
  getAllUser({commit}){
    http.get(`/alluser`,{
      headers:{
        Authorization:token
      }
    })
    .then(({data})=>{
      console.log(data)
      commit('setUser',{user:data.data})
    })
    .catch(err => console.error(err))
  },
  addUser({commit},newUser){
    http.post(`/userapprove`,{
      username:newUser.username,
      password:newUser.password,
      role:newUser.role
    },{
      headers : {Authorization:token}
    })
    .then(({data})=> {
      console.log('user yg ditambahkan',data.data)
      commit('saveUser',{
        user:data.data
      })
    })
    .catch(err => console.error(err))
  },
  // checkout=====================================>
    checkout ({commit}, newData){
      console.log(newData)
      http.post(`/cart`, newData
      ,{
        headers:{Authorization:token}
      })
      .then(({data}) => {
        console.log('tercheckout',data.data)
        commit('saveCheckout', data.data)
      })
      .catch(err => console.error(err))
    },
    getMyhistory({commit}){
      http.get(`cart/mycarthistory`,{
        headers:{Authorization:token}
      })
      .then(({data}) => {
        console.log('all of my checkout history',data.data)
        commit('setMyhistory',data.data)
      })
      .catch(err => console.error(err))
    }
   

}

const mutations = {
  // item==========================================>
  setItem(state, payload){
    console.log('payload item',payload)
    state.allItems = payload
  },
  saveItem(state, payload){
    console.log('data ditambahkan',payload)
    state.allItems.push(payload)
  },
  deleteItem(state, payload){
    console.log('mutations',payload)
    const index = state.allItems.findIndex((item) => item._id == payload._id)
    state.allItems.splice(index,1)
  },
  allItemofCategory(state, payload){
    console.log('data sesuai kategory',payload)
    state.allItemByCategory = payload
  },
  setOneitem(state,payload){
    console.log('payload finone',payload)
    state.oneItem = payload
  },
  saveUpdate(state,payload){
    console.log('payload update',payload)
    state.allItems = state.allItems.map(item => {
      if(item._id === payload._id){
        return payload 
      }
      return item
    })
  }
  ,
  // category================================================>
  setCategory(state, payload){
    console.log('payload category',payload)
    state.allCategories = payload
  },
  saveCategory(state, payload){
    console.log('payload di mutations',payload)
    state.allCategories.push(payload)
  },
  // user==========================================================>
  setUser(state,payload){
    console.log('mutations user',payload)
    state.allUser = payload
  },
  saveUser(state,payload){
    console.log('payload user add mutation',payload)
    state.allUser.push(payload)
  },
  // modal=============================================================>
  toggleModal (state,opened){
    if(opened){
      state.modalOpened = opened
    }else{
      state.modalOpened = !state.modalOpened
    }
  },
  buyButton(state,items){
    console.log('tertekan')
    let checkItem = state.cartItems.some(barang => {
      return barang._id === items._id
    })
    if (checkItem) {
      console.log('masuk if')
      state.cartItems = state.cartItems.map(item => {
        if(item._id === items._id){
          item.quantity_on_cart += 1
        }
        return item
      })
    }
    else{
      console.log('masuk else')
      state.cartItems.push(items)
      items.quantity_on_cart = 1
    }
  },
  // checkout ===============================================>
  saveCheckout(state, payload){
    console.log('barang yg terschekout dan akan masuk databse',payload)
    state.history.push(payload)
  },
  setMyhistory(state, payload){
    console.log('all my checkout history on mutation',payload)
    state.history = payload
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store