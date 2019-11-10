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
// 10/11 - Les fichiers relatifs aux questions
import PoolQuestions from '../json/poolQuestions.json'
import Question from '@/components/Question.vue'
// 10/11 - Composant qui contient Bouton retour à l'accueil
import ReturnToHome from '@/components/ReturnToHome.vue'

export default {
    name: 'home',
    data: () => ({
        atResultDetails: [],
        atResult: 0,
        atDisplay: -1,
        atQuestion: Object,
        Questions: PoolQuestions,
        // Questions: [
        //     {
        //         atId: 1,
        //         atName:
        //             'Combien y a-t-il de miles marins dans un degré de latitude ?',
        //         atResponse: ['90', '60', '180'],
        //         atCheck: [false, false, false],
        //         atUserAnswers: [false, false, false],
        //         atCorrectAnswers: [false, true, false],
        //     },
        //     {
        //         atId: 2,
        //         atName: 'Quel est le pays natal de Wolfgang Amadeus Mozart ? ',
        //         atResponse: ['Allemagne', 'Pologne', 'Autriche'],
        //         atCheck: [false, false, false],
        //         atUserAnswers: [false, false, false],
        //         atCorrectAnswers: [false, false, true],
        //     },
        //     {
        //         atId: 3,
        //         atName:
        //             'Quel président des Etats-Unis a démissionné après le Watergate',
        //         atResponse: ['Nixon', 'Obama', 'G.W. Bush'],
        //         atCheck: [false, false, false],
        //         atUserAnswers: [false, false, false],
        //         atCorrectAnswers: [true, false, false],
        //     },
        //     {
        //         atId: 4,
        //         atName: 'Le Joker incarné en 2008 est',
        //         atResponse: [
        //             'Joaquin Phoenix',
        //             'Heath Ledger',
        //             'Jared Leto',
        //             'Jack Nicholson',
        //         ],
        //         atCheck: [false, false, false, false],
        //         atUserAnswers: [false, false, false, false],
        //         atCorrectAnswers: [false, true, false, false],
        //     },
        //     {
        //         atId: 5,
        //         atName: 'Quelle équipe a remporté la Stanley Cup en 2019',
        //         atResponse: [
        //             'Blues de Saint-Louis',
        //             'Canadians de Montréal',
        //             'Bruins de Boston',
        //         ],
        //         atCheck: [false, false, false],
        //         atUserAnswers: [false, false, false],
        //         atCorrectAnswers: [true, false, false],
        //     },
        //     {
        //         atId: 6,
        //         atName:
        //             'Quel est le nom du principal indice boursier de la place de Paris ?',
        //         atResponse: ['Le Dax', 'Le Nifty', 'Le CAC 40', 'Le Footsie'],
        //         atCheck: [false, false, false, false],
        //         atUserAnswers: [false, false, false, false],
        //         atCorrectAnswers: [false, false, true, false],
        //     },
        //     {
        //         atId: 7,
        //         atName:
        //             'En quelle année, la Ve République est-elle entrée en vigueur en France ?',
        //         atResponse: ['1945', '1958', '1980', '1789'],
        //         atCheck: [false, false, false, false],
        //         atUserAnswers: [false, false, false, false],
        //         atCorrectAnswers: [false, true, false, false],
        //     },
        //     {
        //         atId: 8,
        //         atName:
        //             "En musique, qu'est ce qui permet de monter ou de baisser une note d'un demi-ton ?",
        //         atResponse: [
        //             'le dièse',
        //             'une croche',
        //             'le bémole',
        //             'le silence',
        //         ],
        //         atCheck: [false, false, false, false],
        //         atUserAnswers: [false, false, false, false],
        //         atCorrectAnswers: [true, false, true, false],
        //     },
        //     {
        //         atId: 9,
        //         atName: "Dans quels pays, la monnaie courante est l'Euro",
        //         atResponse: ['Portugal', 'Suède', 'Suisse', 'Belgique'],
        //         atCheck: [false, false, false, false],
        //         atUserAnswers: [false, false, false, false],
        //         atCorrectAnswers: [true, false, false, true],
        //     },
        //     {
        //         atId: 10,
        //         atName:
        //             'Sur quelle plateforme SVOD est diffusée la série "Orange Is The New Black" ?',
        //         atResponse: ['Canal+', 'Amazon Prime', 'Netflix', 'OCS'],
        //         atCheck: [false, false, false, false],
        //         atUserAnswers: [false, false, false, false],
        //         atCorrectAnswers: [false, false, true, false],
        //     },
        // ],
    }),
    components: {
        Question,
        FormTitle,
        ReturnToHome,
        Footer,
    },
    // Méthode qui permet d'incrémenter l'index des questions
    methods: {
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
            var atLengthTab = this.Questions.length
            // // 09/11 - Test Random Question mais ça marche pas
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
                    // 10/11 - On l'envoie en paramètres pour le récupérer sur la page résultat
                    query: {
                        atTotal: this.atResult,
                        atNbQuestion: atLengthTab,
                        atTab: this.atResultDetails,
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
