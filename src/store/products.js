import Vue from 'vue'
import Vuex from 'vuex'
import service from '../services/products'
import products from "@/Models/products";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      service: new service(),
      allProducts:[],
      showAdd: false,
      allCategories:[],
      new:[],
      edit:{},
      deleteItem:{}
  },
  getters: {
  },
  mutations: {
      setAllProducts(state,data){
            state.allProducts=data
      },
      setShowAdd(state,data){
            state.showAdd = data
      },
      setAllCategories(state,data){
        state.allCategories = data
      },
      setNew(state,data){
        state.new = data
      },
      setEdit(state, data) {
        state.edit = data;
      },
      setDeleteItem(state, data) {
        state.deleteItem = data
      },
  },
  actions: {
      async getProducts(state) {
            return new Promise(async (resolve, reject) => {
              try {
                let item = await state.state.service.getAllProducts();
      
                state.commit("setAllProducts",  item );
                resolve(true);
              } catch (error) {
                reject(error);
              }
            });
          },

          async getCategories(state) {
            return new Promise(async (resolve, reject) => {
              try {
                let item = await state.state.service.getAllCategories();
      
                state.commit("setAllCategories",  item );
                resolve(true);
              } catch (error) {
                reject(error);
              }
            });
          },
          async new(state) {
            return new Promise(async (resolve, reject) => {
              try {
                await state.state.service.new(state.state.new).then((data) => {
                  let item = state.state.new
                  let options = state.state.allProducts
                  let newItem = products.fromJson({
                    id:data.id,
                    title:item.title,
                    price:item.price,
                    category:item.category,
                    description:item.description,
                    image:'https://mezzalacamisetas.com.ar/wp-content/uploads/2022/08/descarga-10.jpg'
                  })
                  options.unshift(newItem);
                  state.commit('setAllProducts', options)
                  resolve(true)
                })
              }
              catch (error) {
                reject(error)
              }
            })
    
        },
        async edit(state) {
          return new Promise(async (resolve, reject) => {
            try {
              await state.state.service.edit(state.state.edit).then(() => {
                let item = state.state.edit
                let options = state.state.allProducts
                options = options.map((option)=>{
                if(option.id != item.id){
                  return option
                }
                item = products.fromJson({
                  id:item.id,
                  title:item.title,
                  price:item.price,
                  category:item.category,
                  description:item.description,
                  image:item.image
                })
                return item
                })
                state.commit('setAllProducts', options)
                resolve(true)
              })
            }
            catch (error) {
              reject(error)
            }
          })
  
        },
        async delete(state) {
          return new Promise(async (resolve, reject) => {
            try {
           await state.state.service.delete(state.state.deleteItem).then(() => {
            let options = state.state.allProducts
         
            options = options.filter(option => {
              return option.id != state.state.deleteItem
            })
    
                state.commit('setAllProducts', options)
                resolve(true)
              });
            } catch (error) {
              reject(error)
      
            }
          })
         
        },
  },
  modules: {
  }
})
