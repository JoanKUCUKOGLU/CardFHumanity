<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <p>Black card : {{result1.text}}</p>
    <p>White card : {{result2.text}}</p>

   <!-- Affichage d'une carte blanche, et d'une noire aléatoire -->

  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/HelloWorld.vue'
  import {getCard} from "../services/CardClient";

  export default {
    name: 'home',
    components: {
      HelloWorld
    },

    data() {
      return {
        info: null,
        result1: [],
        result2: []
      }
    },
    async mounted() {
      this.result1 = await getCard('black')
      this.result2 = await getCard('white')
    }
  }
</script>
