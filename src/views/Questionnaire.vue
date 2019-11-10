<!-- 15/10 - Mise en place du formulaire questionnaire contenant le composant Question  v-for="(ques, index) in Questions"-->
<template>
    <div class="questionnaire">
        <div>
            <FormTitle class="title" titleForm="Questionnaire"></FormTitle>
        </div>
        <!-- 05/11 - Boucle sur les questions et les réponses grâce à un index
        Appel au compteur qui se déclenche au clic
        Récupération du résultat (test mis en place avec des console.log)
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
        <ReturnToHome></ReturnToHome>
        <Footer></Footer>
    </div>
</template>
<script>
import FormTitle from '@/components/FormTitle.vue'
// 10/11 - Les composants relatifs aux questions
import Question from '@/components/Question.vue'
import PoolQuestions from '../json/poolQuestions.json'
// 10/11 - Composant qui contient Bouton retour à l'accueil
import ReturnToHome from '@/components/ReturnToHome.vue'

export default {
    name: 'home',
    data: () => ({
        atResult: 0,
        atDisplay: -1,
        atQuestion: Object,
        Questions: PoolQuestions,
    }),
    components: {
        Question,
        FormTitle,
        ReturnToHome,
    },
    // Méthode qui permet d'incrémenter l'index des questions
    methods: {
        atUserResponse: function() {
            if (
                JSON.stringify(this.Questions[this.atDisplay].atUserAnswers) ===
                JSON.stringify(this.Questions[this.atDisplay].atCorrectAnswers)
            ) {
                console.log('bonne reponse')
                this.atResult++
            } else {
                console.log('mauvaise reponse')
            }
            this.atNextQuestion()
        },
        atNextQuestion: function() {
            var atLengthTab = this.Questions.length
            // // 09/11 - Test Random Question
            // var randomItem = this.Questions[
            //     Math.floor(Math.random() * this.Questions.length)
            // ]
            // console.log(randomItem)

            // 09/11 - Passage à la question suivante
            if (this.atDisplay < atLengthTab - 1) {
                this.atDisplay++
                this.atQuestion = this.Questions[this.atDisplay]
            } else {
                // 09/11 - Redirection vers la page de résultat
                this.$router.push({
                    name: 'result',
                    query: {
                        atTotal: this.atResult,
                        atNbQuestion: atLengthTab,
                    },
                })
            }
        },
    },
    created() {
        this.atNextQuestion()
    },
}
</script>

<style scoped lang="scss">
.atForm {
    margin: 20px auto;
    padding: 10px 50px;
}
.title {
    margin: 30px 0 100px;
}
</style>
