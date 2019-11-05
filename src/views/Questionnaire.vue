<!-- 15/10 - Mise en place du formulaire questionnaire contenant le composant Question -->
<template>
  <div class="questionnaire">
    <div>
      <FormTitle title="Questionnaire"></FormTitle>
    </div>
    <!-- 05/11 - Boucle sur les questions et les réponses grâce à un index -->
    <md-card class="md-layout-item md-size-50 md-small-size-100 atForm">
      <md-card-content>
        <Question
          v-for="(ques, index) in Questions"
          v-bind:key="ques.aId"
          :MyQuestion="Questions[index]"
        ></Question>
      </md-card-content>
    </md-card>
  </div>
</template>
<script>
import FormTitle from '@/components/FormTitle.vue'
import Question from '@/components/Question.vue'

export default {
  name: 'home',
  data: () => ({
    Questions: [
      {
        aId: 1,
        atName: 'Oracle est cool',
        atResponse: ['non', 'non', 'la réponse D'],
        atCheck: [false, false, false]
      },
      {
        aId: 2,
        atName: 'Question 2',
        atResponse: ['ma réponse 1', 'ma réponse 2'],
        atCheck: [false, false]
      },
      {
        aId: 3,
        atName: 'question 3',
        atResponse: ['ma réponse1', 'ma réponse 3'],
        atCheck: [false, false]
      },
      {
        aId: 4,
        atName: 'question 4',
        atResponse: ['ma réponse1', 'ma réponse 3'],
        atCheck: [false, false]
      }
    ]
  }),
  components: {
    Question,
    FormTitle
  }
}
</script>

<style scoped lang="scss">
.atForm {
  margin: 20px auto;
  padding: 10px 50px;
}
</style>
