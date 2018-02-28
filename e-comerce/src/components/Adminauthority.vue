<template>
  <div>
    <b-card 
            style="max-width: 15rem"
            :img-src="data.image"
            img-alt="ceritanya" 
            img-top
             class="mb-2">
            <h4 slot="header">{{data.item_names}}</h4>
        <b-button-group class="">
          <b-button @click="removeItem(data._id)" variant="danger" >delete</b-button>
          <b-button variant="info" @click="toUpdate(data._id)">update</b-button>
        </b-button-group>
    </b-card>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
let token = localStorage.getItem('token')
let baseUrl = `http://localhost:3000/api`
export default {
  props:['data'],
  data(){
    return {

    }
  },
  methods:{
    ...mapActions([
      'removeItem'
    ]),
    toUpdate(id){
      this.$router.push({name : 'Update',params:{id:id}})
    }
  }
}
</script>

<style>

</style>
