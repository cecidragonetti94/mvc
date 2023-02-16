import axios from "axios";
import products from "@/Models/products";

class service{
      getAllProducts() {
         const url = 'https://fakestoreapi.com/products'
         
            return axios
              .get(`${url}`)
              .then(({ data }) => {
                return data.map((item) => {
                  return products.fromJson(item);
                });
              });
          }
          getAllCategories(){
            const url = 'https://fakestoreapi.com/products/categories'
            return axios
            .get(`${url}`)
            .then(({ data }) => {
              return data
            });
          }
        new(data){
          const url = 'https://fakestoreapi.com/products'
          let payload ={
            title: data.title,
            price: data.price,
            description: data.description,
            image: 'https://mezzalacamisetas.com.ar/wp-content/uploads/2022/08/descarga-10.jpg',
            category: data.category
          }
      

          return axios
          .post(`${url}`, payload.toString())
          
        }
        edit(data){
          const url = 'https://fakestoreapi.com/products/'
          let payload ={
            title: data.title,
            price: data.price,
            description: data.description,
            image: data.image,
            category: data.category
          }
        

          return axios
          .patch(`${url}${data.id}`, payload.toString())
          
        }
        
        delete(id){
          const url = 'https://fakestoreapi.com/products/'
          return axios
          .delete(`${url}${id}`, )
        }
        

}
export default service;