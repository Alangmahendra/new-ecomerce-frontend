<template>
  <div class="nav">
    <b-container>
      <b-card-group deck>
        <oneitem v-for="data in allItemByCategory" :key="data._id" :data="data"/>
      </b-card-group>
    </b-container>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
import oneitem from './Oneitem'
export default {
  components:{oneitem},
  computed:{
    ...mapState([
      'allItemByCategory'
    ])
  },
  created(){
    this.categoryItem(this.$route.params.id)
  },
  methods:{
    ...mapActions([
      'categoryItem'
    ])
  }
}
</script>

<style>
.nav{
  margin-top: 30px
}
</style>
