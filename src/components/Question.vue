<!-- 15/10 - 
Création du composant Vue qui récupère les valeurs de la réponse, des checks et l'intitulé de la question
Boucle sur le tableau de réponse pour les afficher 
L'objet MyQuestion permet de récupérer les données 
 -->
<template>
  <div class="atFormQuestion">
    <div>
      <h1>{{q.atName}}</h1>
    </div>
    <md-checkbox
      class="md-primary answer"
      v-model="q.atCheck[index]"
      v-for="(value, index) in q.atResponse"
      v-bind:key="value"
    >{{ value }}</md-checkbox>
  </div>
</template>

<script>
export default {
  name: "Question",
  data() {
    return {
      q: this.MyQuestion
    };
  },
  props: {
    MyQuestion: Object
  }
};
</script>
