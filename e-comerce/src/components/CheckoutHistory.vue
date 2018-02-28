<template>
  <div class="container">
    <ul v-for="(history,index) in history" :key="index">
      <!-- {{history}} -->
      <li>item name :{{history.items.item_names}} <br>
          quantity :{{history.quantity}} <br>
          total :{{history.total}}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name:'History',
  computed:{
    ...mapState([
      'history'
    ])
  },
  mounted(){
    this.getMyhistory()
  },
  methods:{
    ...mapActions([
      'getMyhistory'
    ])
  }
}
</script>

<style>

</style>
