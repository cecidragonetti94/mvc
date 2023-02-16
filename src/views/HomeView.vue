<template>
  <v-container style="max-width: 100%;padding:0px">
    <Home/>
  </v-container>

</template>

<script>
  import Home from '../components/Home'

  export default {
    name: 'HomeView',

    components: {
      Home,
    },
  }
</script>
