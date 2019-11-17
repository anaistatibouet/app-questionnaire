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
                    @countdownQuestion="atPreviousQuestion()"
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
import Footer from '@/components/Footer.vue'
import ReturnToHome from '@/components/ReturnToHome.vue'

// 10/11 - Les fichiers relatifs aux questions
import PoolQuestions from '../json/Questions.json'
import Question from '@/components/Question.vue'

export default {
    name: 'questionnaire',
    data: () => ({
        atTabNameQuestion: [],
        atResultDetails: [],
        atResult: 0,
        atDisplay: -1,
        atQuestion: Object,
        Questions: PoolQuestions,
        atArray: [],
    }),
    components: {
        Question,
        FormTitle,
        ReturnToHome,
        Footer,
    },
    // Méthode qui permet d'incrémenter l'index des questions
    methods: {
        // 11/11 - Permet d'avoir une question tirée aléatoirement du tableau JSON
        // Problème est qu'une question peut se répéter
        // 12/11 - Fix le problème de répétition : array Shuffle et appeler dans created.
        // Au lieu de tirer une question aléatoirement, tout le tableau est mélangé.
        atShuffleArray: function(atArray) {
            var counter = atArray.length
            var temp
            var index
            while (counter > 0) {
                index = Math.floor(Math.random() * counter)

                counter--

                temp = atArray[counter]
                atArray[counter] = atArray[index]
                atArray[index] = temp
            }
            return atArray
        },
        atUserResponse: function() {
            if (
                JSON.stringify(this.Questions[this.atDisplay].atUserAnswers) ===
                JSON.stringify(this.Questions[this.atDisplay].atCorrectAnswers)
            ) {
                // 10/11 - On ajoute au tableau pour l'affichage du détails des résultats
                this.atResultDetails.push('Réponse correcte')
                // 10/11 - On incrémente les points
                this.atResult++
            } else {
                this.atResultDetails.push('Mauvaise réponse')
            }
            this.atTabNameQuestion[this.atDisplay] = this.Questions[
                this.atDisplay
            ]
            this.atNextQuestion()
        },
        atPreviousQuestion: function() {
            this.atChoiceQuestion = this.$route.query.atPoolQuest
            var atNbQuestion = this.atChoiceQuestion
            var atLengthTab = atNbQuestion
            // 15/11 - Permet d'afficher la question précédente sauf si c'est la première
            if (this.atDisplay > 0) {
                this.atDisplay--
                this.atQuestion = this.Questions[this.atDisplay]
                // 15/11 - On enlève 1 point si la réponse était correcte et que l'utilisateur revient en arrière
                if (
                    this.atResultDetails[this.atResultDetails.length - 1] ===
                    'Réponse correcte'
                ) {
                    this.atResult = this.atResult - 1
                }
                // 15/11 - Permet de retirer dernier élément du tableau pur l'affichage du détail des résultats
                this.atResultDetails.pop()
                this.atTabNameQuestion.pop()
            }
        },
        atNextQuestion: function() {
            var atLengthTab = this.$route.query.atPoolQuest
            // 09/11 - Passage à la question suivante
            if (this.atDisplay < atLengthTab - 1) {
                this.atDisplay++
                // 11/11 - Permet d'afficher la question
                this.atQuestion = this.Questions[this.atDisplay]
            } else {
                // 09/11 - Redirection vers la page de résultat
                this.$router.push({
                    name: 'result',
                    // 10/11 - On l'envoie en paramètres pour le récupérer sur la page résultat
                    query: {
                        atTotal: this.atResult,
                        atNbQuestion: this.$route.query.atPoolQuest,
                        atTab: this.atResultDetails,
                        atTabNameQuestion: this.atTabNameQuestion,
                    },
                })
            }
        },
    },
    created() {
        this.atShuffleArray(this.Questions)
        this.atNextQuestion()
        this.atPreviousQuestion()
    },
    mounted() {
        this.atChoiceQuestion = this.$route.query.atPoolQuest
    },
}
</script>

<style scoped lang="scss">
.atForm {
    margin: 20px auto;
    padding: 0;
}
.title {
    margin: 50px 0 100px;
}
@media screen and (max-width: 640px) {
    .title {
        margin: 30px 0 60px;
    }
}
</style>
