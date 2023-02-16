import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
      theme: {
            options: {
              customProperties: true,
            },
          themes: {
            light: {
              primary: '#13547a',
              secondary: '#09203f',
              accent: '#DACACD',
              error: '#F49A8E',
              info: '#4f978a',
              success: '#B8F3B2', 
              warning: '#FFF469',
              celes: '#A4DCF6' 
      
            },
          },
        },
        icons: {
          iconfont: 'mdi',
        },
});
