<!-- 15/10 - Mise en place du formulaire questionnaire contenant le composant Question  v-for="(ques, index) in Questions"-->
<template>
    <div class="questionnaire">
        <div>
            <FormTitle class="title" title="Questionnaire"></FormTitle>
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
        <Footer></Footer>
    </div>
</template>
<script>
import FormTitle from '@/components/FormTitle.vue'
import Question from '@/components/Question.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'home',
    data: () => ({
        atResult: 0,
        atDisplay: -1,
        atQuestion: Object,
        Questions: [
            {
                atId: 1,
                atName:
                    'Parmis les éléments proposés, quels sont des frameworks',
                atResponse: ['Symfony', 'PHP', 'VueJS', 'C#'],
                atCheck: [false, false, false, false],
                atUserAnswers: [false, false, false, false],
                atCorrectAnswers: [true, false, true, false],
            },
            {
                atId: 2,
                atName: 'Quel est le pays natal de Wolfgang Amadeus Mozart ? ',
                atResponse: ['Allemagne', 'Pologne', 'Autriche'],
                atCheck: [false, false, false],
                atUserAnswers: [false, false, false],
                atCorrectAnswers: [false, false, true],
            },
            {
                atId: 3,
                atName:
                    'Quel président des Etats-Unis a démissionné après le Watergate',
                atResponse: ['Nixon', 'Obama', 'G.W. Bush'],
                atCheck: [false, false, false],
                atUserAnswers: [false, false, false],
                atCorrectAnswers: [true, false, false],
            },
            {
                atId: 4,
                atName: 'Le Joker incarné en 2008 est',
                atResponse: [
                    'Joaquin Phoenix',
                    'Heath Ledger',
                    'Jared Leto',
                    'Jack Nicholson',
                ],
                atCheck: [false, false, false, false],
                atUserAnswers: [false, false, false, false],
                atCorrectAnswers: [false, true, false, false],
            },
            {
                atId: 5,
                atName: 'Quelle équipe a remporté la Stanley Cup en 2019',
                atResponse: [
                    'Blues de Saint-Louis',
                    'Canadians de Montréal',
                    'Bruins de Boston',
                ],
                atCheck: [false, false, false],
                atUserAnswers: [false, false, false],
                atCorrectAnswers: [true, false, false],
            },
        ],
    }),
    components: {
        Footer,
        Question,
        FormTitle,
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
            console.log(this.Questions[this.atDisplay].atUserAnswers)
            this.atNextQuestion()
            console.log(this.atResult)
        },
        atNextQuestion: function() {
            var atLengthTab = this.Questions.length
            if (this.atDisplay < atLengthTab - 1) {
                this.atDisplay++
                this.atQuestion = this.Questions[this.atDisplay]
            } else {
                console.log(
                    'Votre résultat est ' +
                        this.atResult +
                        ' sur ' +
                        atLengthTab
                )
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
    margin-bottom: 100px;
}
</style>
