<!-- 15/10 -
Création du composant Vue qui récupère les valeurs de la réponse, des checks et l'intitulé de la question
Boucle sur le tableau de réponse pour les afficher
L'objet MyQuestion permet de récupérer les données

05/11 -
J'intègre le bouton dans le composant Question
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
    <md-card-actions>
      <router-link to="/questionnaire">
        <md-button type="submit" class="md-raised md-primary">Question suivante</md-button>
      </router-link>
    </md-card-actions>
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
