<!-- 15/10 - Mise en place du formulaire questionnaire contenant le composant Question  v-for="(ques, index) in Questions"-->
<template>
  <div class="questionnaire">
    <div>
      <FormTitle title="Questionnaire"></FormTitle>
    </div>
    <!-- 05/11 - Boucle sur les questions et les réponses grâce à un index
    Appel au compteur qui se déclenche au clic
    -->
    <md-card class="md-layout-item md-size-50 md-small-size-100 atForm">
      <md-card-content>
        <Question
          v-bind:key="atQuestion.atId"
          @counterQuestion="atUserResponse()"
          :atMyQuestion="atQuestion"
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
    atResult: 0,
    atDisplay: -1,
    atQuestion: Object,
    Questions: [
      {
        atId: 1,
        atName: 'Oracle est cool',
        atResponse: ['non', 'NON', '♥ ♥'],
        atCheck: [false, false, false],
        atUserAnswers: [false, false, false],
        atCorrectAnswers: [true, false, false]
      },
      {
        atId: 2,
        atName: 'Question 2',
        atResponse: ['ma réponse 1', 'ma réponse 2'],
        atCheck: [false, false],
        atUserAnswers: [false, false],
        atCorrectAnswers: [true, false]
      },
      {
        atId: 3,
        atName: 'question 3',
        atResponse: ['ma réponse1', 'ma réponse 3'],
        atCheck: [false, false],
        atUserAnswers: [false, false],
        atCorrectAnswers: [true, false]
      },
      {
        atId: 4,
        atName: 'question 4',
        atResponse: ['ma réponse1', 'ma réponse 3'],
        atCheck: [false, false],
        atUserAnswers: [false, false],
        atCorrectAnswers: [true, false]
      }
    ]
  }),
  components: {
    Question,
    FormTitle
  },
  // Méthode qui permet d'incrémenter l'index des questions
  methods: {
    atUserResponse: function () {
      if (
        JSON.stringify(this.Questions[this.atDisplay].atUserAnswers) ===
        JSON.stringify(this.Questions[this.atDisplay].atCorrectAnswers)
      ) {
        console.log('bonne reponse')
      } else {
        console.log('mauvaise reponse')
      }
      console.log(this.Questions[this.atDisplay].atUserAnswers)
      this.atNextQuestion()
    },
    atNextQuestion: function () {
      this.atDisplay++
      this.atQuestion = this.Questions[this.atDisplay]
    }
  },
  created () {
    this.atNextQuestion()
  }
}
</script>

<style scoped lang="scss">
.atForm {
  margin: 20px auto;
  padding: 10px 50px;
}
</style>
