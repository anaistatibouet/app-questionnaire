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
import Footer from '@/components/Footer.vue'
import ReturnToHome from '@/components/ReturnToHome.vue'

// 10/11 - Les fichiers relatifs aux questions
import PoolQuestions from '../json/Questions.json'
import Question from '@/components/Question.vue'

export default {
    name: 'questionnaire',
    data: () => ({
        atResultDetails: [],
        atResult: 0,
        atDisplay: -1,
        atQuestion: Object,
        Questions: PoolQuestions,
        randomQuestion: Object,
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
        atShuffleArray: function(array) {
            var counter = array.length
            var temp
            var index
            while (counter > 0) {
                index = Math.floor(Math.random() * counter)

                counter--

                temp = array[counter]
                array[counter] = array[index]
                array[index] = temp
            }
            return array
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
            this.atNextQuestion()
        },
        atNextQuestion: function() {
            this.atChoiceQuestion = this.$route.query.atPoolQuest
            var atNbQuestion = this.atChoiceQuestion
            var atLengthTab = atNbQuestion
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
                        atNbQuestion: atNbQuestion,
                        atTab: this.atResultDetails,
                    },
                })
            }
        },
    },
    created() {
        this.atShuffleArray(this.Questions)
        this.atNextQuestion()
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
    margin: 0 0 100px;
}
@media screen and (max-width: 640px) {
    .title {
        margin: 30px 0 60px;
    }
}
</style>
