.<template>
      <v-snackbar v-model="alerta" :color="color" bottom rounded="pill">
            {{ textAlert }}
            <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="alert =false"
        >
          Cerrar
        </v-btn>
      </template>
      </v-snackbar>

</template>

<script>
export default {
  props:{
      alert:Boolean,
      color:String,
      textAlert:String
  },

  computed:{
      alerta:{
          get(){
              return this.alert
          },
          set(newValue){
             return newValue
          }
      }
  },


}
</script>

<style>

</style>