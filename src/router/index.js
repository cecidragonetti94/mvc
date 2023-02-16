import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeView',
 
    component: () => import( '../views/HomeView.vue')
  },

  {
    path: '/categorias',
    name: 'Categorias',
 
    component: () => import( '../views/CategoriasView.vue')
  },
  {
    path: '/productos',
    name: 'Productos',
 
    component: () => import( '../views/ProductsView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
