<template>
  <v-container>
    <Products />

  </v-container>

</template>

<script>
import Products from '../components/Products.vue';

export default {
  name: 'ProductsView',

  components: {
    Products,
  },
}
</script>
