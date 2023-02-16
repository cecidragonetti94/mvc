<template>
  <v-app style="background-color: azure;">
  <Nav/>
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script >
import Footer from './components/commons/Footer.vue';
import Nav from './components/commons/Nav.vue'
export default {
  name: 'App',
components:{Footer,Nav},
  data: () => ({
    //
  }),
};
</script>
