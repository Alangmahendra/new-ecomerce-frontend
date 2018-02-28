<template>
  <div class="nav">
    <b-container>
      <b-form-input v-model="search" placeholder="search item" class="rapihin"></b-form-input>
      <b-card-group deck>
        <oneitem v-for="data in searched" :key="data._id" :data="data"/>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import Oneitem from './Oneitem'
import axios from 'axios'
import router from '@/router'
let baseUrl = `http://localhost:3000/api`
export default {
  name : 'Home',
  components : {Oneitem},
  data(){
    return{
     search:''
    }
  },
  computed : {
    ...mapState([
      'allItems'
    ]),
    searched(){
      return this.allItems.filter((item) =>{
        return item.item_names.match(this.search)
      })
    }
  },
  created(){
    this.getAllitem()
  },
  methods:{
  ...mapActions([
    'getAllitem'
  ])
  }
}
</script>

<style>
.nav{
  margin-top: 30px
}

.rapihin{
  margin:30px 0px 30px 0px
}
</style>
