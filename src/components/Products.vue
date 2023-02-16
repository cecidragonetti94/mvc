<template>
      <v-container>
            <v-col class="container__add" cols="12">
                  <v-btn color="primary" rounded @click="openForm"> {{ $tc('products.addProduct') }}</v-btn>
            </v-col>

            <div class="container__card" v-show="!isLoading">
                  <v-col v-for="item in allProducts" :key="item.id" cols="12">
                        <v-card class="card__ mx-auto text-center mb-5" elevation="15">
                              <v-card-title class="card__title">{{ item.titulo }}</v-card-title>

                              <v-img :src="item.imagen" contain max-height="300px" />

                              <v-card-text class="card__description">
                                    {{ item.descripcion }}
                              </v-card-text>

                              <div class="buttons__card">
                                    <p> <strong> US${{ item.precio }}</strong> </p>
                                    <v-tooltip bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                                <v-icon color="info" dark v-bind="attrs" v-on="on"
                                                      @click="openEdit(item)">
                                                      mdi-pen
                                                </v-icon>
                                          </template>
                                          <span>{{ $tc('products.edit') }}</span>
                                    </v-tooltip>
                                    <v-tooltip bottom>
                                          <template v-slot:activator="{ on, attrs }">
                                                <v-icon color="info" dark v-bind="attrs" v-on="on"
                                                      @click="openDelete(item)">
                                                      mdi-delete
                                                </v-icon>
                                          </template>
                                          <span>{{ $tc('products.delete') }}</span>
                                    </v-tooltip>
                              </div>


                        </v-card>
                  </v-col>
            </div>
            <v-card>

            </v-card>
            <v-dialog v-model="showAdd" max-width="500px" persistent>
                  <v-card>
                        <v-card-title class="flex-center">
                             {{  isEdit ?  $tc('products.editProduct')  :  $tc('products.addProduct') }}</v-card-title>
                        <div class="flex-center">
                              <v-form ref="form" v-model="valid">
                                    <v-alert dense v-if="error" color="red" elevation="5" outlined text type="error"
                                          align="center" class="mr-1 ml-1">
                                          {{ alertValidate }}</v-alert>
                                    <v-text-field v-model="data.title" filled rounded dense :label="$tc('products.nameProduct')"
                                          :rules="rules" />
                                    <v-text-field v-model="data.description" filled rounded dense :label="$tc('products.description')"
                                          :rules="rules" />
                                    <v-select v-model="data.category" :items="categories" filled rounded dense
                                    :label="$tc('products.category')" :rules="rules" />
                                    <v-text-field v-model="data.price" filled rounded dense :label="$tc('products.price')" prefix="US$"
                                          type="number" :rules="rules" />
                                    <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" filled
                                          rounded dense placeholder="Imagen" prepend-icon="mdi-camera" :label="$tc('products.image')"
                                          v-model="data.image" v-if="!isEdit"></v-file-input>
                              </v-form>
                        </div>
                        <v-card-actions class="flex-center">

                              <v-btn rounded class="mr-2" @click="cancel" color="secondary">{{ $tc('products.cancel') }}
                              </v-btn>
                              <v-btn rounded @click="validate" color="primary">
                                    {{ $tc('products.accept') }}</v-btn>

                        </v-card-actions>
                  </v-card>

            </v-dialog>
            <v-dialog v-model="showDelete" max-width="300px" persistent>
                  <v-card>
                        <v-card-title class="flex-center">
                              {{ $tc('products.deleteProduct') }}
                        </v-card-title>
                        <v-card-actions class="flex-center">
                              <div class="flex-center">
                                    <v-btn class="mr-2" @click="cancel" color="secondary" rounded>{{ $tc('products.cancel') }}
                                    </v-btn>
                                    <v-btn class="bt-dialog" @click="deleteProduct" rounded color="primary">
                                          {{ $tc('products.delete') }}</v-btn>
                              </div>
                        </v-card-actions>
                  </v-card>
            </v-dialog>
            <v-dialog v-model="isLoading" :overlay-opacity="0.3">
                  <Loading :loading="isLoading" />
            </v-dialog>
            <Alerts :alert="errorAlert" :color="colorError" :textAlert="textAlertOk" />
            <Alerts :alert="ok" :color="colorOk" :textAlert="textAlertOk" />
      </v-container>
</template>

<script>
import Alerts from './commons/Alerts.vue'
import products from '../store/products';
import Loading from './commons/Loading.vue';
export default {
      components: { Loading, Alerts },
      data() {
            return {
                  isLoading: false,
                  dataEdit: {},
                  data: {
                        title: null,
                        description: null,
                        image: null,
                        category: null,
                        price: null
                  },
                  valid: true,
                  rules: [(v) => !!v || "Campo requerido"],
                  error: false,
                  alertValidate: "",
                  isEdit: false,
                  deleteItem: {},
                  showDelete: false,
                  colorError: '#FF8D58',
                  colorOk: '#09203f',
                  textAlertOk: "",
                  ok: false,
                  errorAlert: false,

            }
      },
      mounted() {
            //hace un pedido de los productos
            this.isLoading=true
            products.dispatch('getProducts').then(() => {
                  this.isLoading = false
            })
      },
      computed: {
            allProducts() {
                  return products.state.allProducts
            },
            showAdd: {
                  get() {
                        return products.state.showAdd
                  },
                  set(newValue) {
                        return newValue
                  }
            },
            categories() {
                  return products.state.allCategories
            }

      },
      methods: {
            openForm() {
                  products.commit('setShowAdd', true)
                  this.showAdd = true
                  //hace un pedido de las categorias para mostrarlas en el select
                  products.dispatch('getCategories')
            },
            openEdit(item) {
                  this.isEdit = true
                  products.dispatch('getCategories')
                  products.commit('setShowAdd', true)
                  this.showAdd = true
                  this.data = {
                        category: item.categoria,
                        description: item.descripcion,
                        price: item.precio,
                        title: item.titulo,
                        id: item.id,
                        image: item.imagen
                  }
            },
            openDelete(item) {
                  this.deleteItem = item.id
                  this.showDelete = true
            },
            cancel() {
                  this.isLoading = false
                  products.commit('setShowAdd', false)
                  this.showAdd = false
                  if (this.showAdd) {
                        //saca las rules y resetea la info
                        this.$refs.form.resetValidation();
                        this.data = {
                              title: null,
                              description: null,
                              image: null,
                              category: null,
                              price: null
                        }
                        this.isEdit = false
                  } else {
                        this.showDelete = false
                  }



            },
            add() {
                  this.isLoading = true
              
                  let payload = {
                        image: this.data.image.name
                  }
                  payload = {
                        ...payload,
                        title: this.data.title,
                        description: this.data.description,
                        category: this.data.category,
                        price: this.data.price
                  }
                  // se tiene que hacer el set en el store con lo editado
                  products.commit('setNew', payload)
                  products.dispatch('new').then(() => {

                        this.ok = true
                        this.textAlertOk = this.$tc('products.addCorrect')
                  }).catch((e) => {
                        this.errorAlert = true
                        this.textAlertOk = e.response.data.error.message;
                  })
                  this.cancel()
                  
            },
            validate() {
                  //valida si el form cumple con todo 
                  let valid = this.$refs.form.validate()
                  if (valid) {
                        if (this.isEdit) {
                              this.edit()
                        } else {
                              this.add()
                        }

                  } else {
                        this.error = true
                        this.alertValidate = this.$tc('products.required')
                        setTimeout(() => {
                              this.error = false;
                        }, 2500);
                  }
            },
            edit() {
                  this.isLoading = true
                  products.commit('setEdit', this.data)
                  products.dispatch('edit').then(() => {

                        this.ok = true
                        this.textAlertOk =this.$tc('products.editCorrect') 
                  }).catch((e) => {
                        this.errorAlert = true
                        this.textAlertOk = e.response.data.error.message;
                  })
                  this.cancel()
            },
            deleteProduct() {
                 
                  this.isLoading = true
                  products.commit('setDeleteItem', this.deleteItem)
                  products.dispatch('delete').then(() => {
                        this.ok = true
                        this.textAlertOk = this.$tc('products.deleteCorrect')
                  }).catch((e) => {
                        this.errorAlert = true
                        this.textAlertOk = e.response.data.error.message;
                  })
                  this.cancel()
            },
           
      }
}


</script>

<style scoped>
.card__ {
      max-width: 350px;
      height: 650px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
}

.container__card {
      display: grid !important;
      grid-template-columns: auto auto auto !important;
      margin: 10px !important;
}

.card__description {
      overflow-y: scroll;
      height: 135px;
}

.container__add {
      display: flex;
      justify-content: flex-end;
      max-width: 235px;
      margin-left: 10px
}

.container__add {
      display: flex !important;
      justify-content: center !important;
      flex-direction: column !important;

}

.card__title {
      display: flex;
      justify-content: center;
      align-items: flex-start
}

.buttons__card {
      display: grid;
      grid-template-columns: 80% 10% 10%;
}

.flex-center {
      display: flex !important;
      justify-content: center !important;
      min-width: 300px !important;
}

@media (min-width: 300px) and (max-width: 450px) {
      .container__card {
            display: flex !important;
            flex-direction: column;
      }
}
</style>