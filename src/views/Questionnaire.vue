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
    }),
    components: {
        Question,
        FormTitle,
        ReturnToHome,
        Footer,
    },
    // Méthode qui permet d'incrémenter l'index des questions
    methods: {
        // atRandom: function() {
        //     var randomQuestion = this.Questions[
        //         Math.floor(Math.random() * this.Questions.length)
        //     ]
        //     randomQuestion = this.Questions[this.atDisplay]
        // },
        atUserResponse: function() {
            if (
                JSON.stringify(this.Questions[this.atDisplay].atUserAnswers) ===
                JSON.stringify(this.Questions[this.atDisplay].atCorrectAnswers)
            ) {
                console.log(
                    'Correct',
                    JSON.stringify(
                        this.Questions[this.atDisplay].atCorrectAnswers
                    )
                )
                console.log(
                    'User',
                    JSON.stringify(this.Questions[this.atDisplay].atUserAnswers)
                )
                // 10/11 - On ajoute au tableau pour l'affichage du détails des résultats
                this.atResultDetails.push('Réponse correcte')
                console.log('OK')
                // 10/11 - On incrémente les points
                this.atResult++
            } else {
                console.log(
                    'Correct',
                    JSON.stringify(
                        this.Questions[this.atDisplay].atCorrectAnswers
                    )
                )
                console.log(
                    'User',
                    JSON.stringify(this.Questions[this.atDisplay].atUserAnswers)
                )
                console.log('KO')
                this.atResultDetails.push('Mauvaise réponse')
            }
            this.atNextQuestion()
        },
        atNextQuestion: function() {
            // 11/11 - Permet d'avoir une question tirée aléatoirement du tableau JSON
            var randomQuestion = this.Questions[
                Math.floor(Math.random() * this.Questions.length)
            ]
            console.log(randomQuestion)

            this.atChoiceQuestion = this.$route.query.atPoolQuest
            var atNbQuestion = this.atChoiceQuestion
            var atLengthTab = atNbQuestion
            // 09/11 - Passage à la question suivante
            if (this.atDisplay < atLengthTab - 1) {
                this.atDisplay++
                this.Questions[this.atDisplay] = randomQuestion
                this.atQuestion = randomQuestion
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
