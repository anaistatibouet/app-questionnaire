<template>
  <div class="questionnaire">
    <md-card class="md-layout-item md-size-50 md-small-size-100 atForm">
      <md-card-content>
        <Question :MaQuestion="Questions[0]"></Question>
      </md-card-content>
      <md-card-actions>
        <router-link to="/questionnaire">
          <md-button type="submit" class="md-raised md-primary">Question suivante</md-button>
        </router-link>
      </md-card-actions>
    </md-card>
  </div>
</template>
<script>
import FormTitle from "@/components/FormTitle.vue";
import Question from "@/components/Question.vue";

export default {
  name: "home",
  data: () => ({
    Questions: [
      {
        atName: "question 1",
        atResponse: ["ma réponse1", "ma réponse 2", "ma réponse 3"],
        atCheck: [false, false, false]
      },
      {
        atName: "question 2",
        atResponse: ["ma réponse1", "ma réponse 2"],
        atCheck: [false, false]
      },
      {
        atName: "question 3",
        atResponse: ["ma réponse1", "ma réponse 3"],
        atCheck: [false, false]
      }
    ]
  }),
  components: {
    FormTitle,
    Question
  }
};
</script>

<style scoped lang="scss">
.atForm {
  margin: 20px auto;
  padding: 10px 50px;
}
</style>
