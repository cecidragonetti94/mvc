<template>
      <div cols="12" >
           
             <v-card flat tile cols=12 >
                  <v-window v-model="onboarding" reverse>
                        <v-window-item v-for="item in categories" :key="item">
                              <v-card class="card__container" height="200" >
                                    <v-row class="fill-height" align="center" justify="center">
                                          <h1 style="font-size: 5rem" class="white--text"> {{ item }}</h1>
                                    </v-row>
                              </v-card>
                        </v-window-item>
                  </v-window>

                  <v-card-actions class="justify-space-between" style="background-color: azure;">
                        <v-btn text @click="prev">
                              <v-icon color="#C8BCF8">mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-item-group v-model="onboarding" class="text-center" mandatory>
                              <v-item v-for="n in categories" :key="`btn-${n}`" v-slot="{ active, toggle }">
                                    <v-btn :input-value="active" icon @click="toggle">
                                          <v-icon color="#B1CAEA">mdi-star-circle</v-icon>
                                    </v-btn>
                              </v-item>
                        </v-item-group>
                        <v-btn text @click="next">
                              <v-icon color="#8ec5fc">mdi-chevron-right</v-icon>
                        </v-btn>
                  </v-card-actions>
            </v-card> 
            <h1 class="text-center mb-5 h1__" >{{ $tc("home.title") }}</h1>
            <v-img contain height="400px" src="../assets/mapa.png"></v-img>
            <v-dialog v-model="isLoading" :overlay-opacity="0.3">
                  <Loading :loading="isLoading" />
            </v-dialog>
      </div>
</template>


<script>
import products from '@/store/products';
import Loading from '../components/commons/Loading.vue'
export default {
      components:{Loading},
      data() {
            return {
                  length: 4,
                  onboarding: 0,
                  isLoading:false
                  

            }
      },
      mounted() {
            this.isLoading = true
                  products.dispatch('getCategories').then(()=>{
                        this.isLoading=false
                  })

            },
      computed: {
            categories() {
                  return products.state.allCategories
            },
            
      },
            methods: {
                  next() {
                        this.onboarding = this.onboarding + 1 === this.length
                              ? 0
                              : this.onboarding + 1
                  },
                  prev() {
                        this.onboarding = this.onboarding - 1 < 0
                              ? this.length - 1
                              : this.onboarding - 1
                  },
            },
      }
      
</script>

  <style scoped>
.card__container{
      background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)
}
.h1__{
      font-family: 'Montserrat', sans-serif;color:royalblue
}
</style>
