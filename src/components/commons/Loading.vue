<template>
  <v-overlay :opacity="0.5">
    <span>
      ...Cargando
    </span>
    <v-progress-linear buffer-value="0" stream color="#45D6E5"></v-progress-linear>
  </v-overlay>

</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
 
<style scoped>
.col-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 1024px) and (max-width: 1370px) {

  .container_loading {
    height: 550px !important;
  }
}

@media (min-width: 1370px) and (max-width: 1900px) {

  .container_loading {
    height: 800px !important;
  }
}

</style>