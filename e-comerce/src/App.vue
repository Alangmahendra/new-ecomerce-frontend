<template>
  <div id="app">
   <headers/>
   <modal/>
    <router-view/>
  </div>
</template>

<script>
import store from './vuex/store'
import modal from "@/components/modalCart";
import headers from '@/components/Headers'
export default {
  components : {headers,modal},
  name: 'App',
  store
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
