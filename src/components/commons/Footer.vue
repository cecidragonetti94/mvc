
<template>
      <v-footer class="footer" dark >
        <v-card class="flex card__footer" flat tile >
          <v-card-text class="py-2 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>{{ $tc('nav.title') }}</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </template>

    <style scoped>
  .footer{
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  }
  .card__footer{
    background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%)
  }
  
  </style>