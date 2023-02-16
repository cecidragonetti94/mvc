<template>
  <v-container class="nav__container">
    <v-app-bar class="nav__appBar" dark elevation="12"  outlined>
      <v-app-bar-nav-icon @click="drawer = true" color="white"></v-app-bar-nav-icon>

      <v-toolbar-title @click="goToHome" style="cursor:pointer">{{ $tc('nav.title') }}
        <v-avatar>
          <img src="../../assets/shop.jpg" alt="" />
        </v-avatar>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-container class="mt-4 text-center">
        <v-col>
          <v-avatar>
            <img src="../../assets/shop.jpg" alt="" />
          </v-avatar>
        </v-col>
        <v-col>
          <p class="info--text nt-3 headline">{{ $tc('nav.account') }}</p>
        </v-col>

        <v-col v-for="item in buttons" :key="item.id">
          <v-btn block color="primary" elevation="2" outlined raised rounded :to="item.route" link>{{
            item.title
          }}</v-btn>
        </v-col>

      </v-container>
    </v-navigation-drawer>

  </v-container>

</template>
<script>
export default {
  data(){
    return {
    drawer: false,
    group: null,
    buttons: [{ id: 0, title: "Home", route: "/" }, { id: 2, title: "Productos", route: "/productos" }]
    }
  },
 

  methods:{
    goToHome(){
      this.$router.push({ path: "/" });
    }
  }

}
</script>

<style scoped>
.nav__container{
  padding:0px;
   max-width:100%
}
.nav__appBar{
  background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
}

</style>