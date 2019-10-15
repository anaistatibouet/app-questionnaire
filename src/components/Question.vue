<!-- 15/10 - Création du composant Vue qui boucle sur les réponses et qui récupère la valeur du check --> 
<template>
  <div class="atFormQuestion">
    <md-checkbox
      v-model="MaQuestion.atCheck[index]"
      v-for="(value, index) in MaQuestion.atResponse"
      v-bind:key="value"
      class="md-primary"
    >{{ value }}</md-checkbox>
  </div>
</template>

<script>
export default {
  name: "Question",
  data: () => ({
    // return {
    //   q: this.MaQuestion,
    // };
  }),
  props: {
    MaQuestion: Object
  }
};
</script>
