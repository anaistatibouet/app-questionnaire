<!-- 15/10 -
Création du composant Vue qui récupère les valeurs de la réponse, des checks et l'intitulé de la question
Boucle sur le tableau de réponse pour les afficher
L'objet atMyQuestion permet de récupérer les données

05/11 -
J'intègre le bouton dans le composant Question
Implémentation d'une méthode pour passer à la question suivante => on émet un évènement pour récupérer les datas
de Questionnaire.vue
Binding des réponses de l'utilisateur sur les checkbox. Cela permettra de calculer le résutltat du prestataire

07/11
Incrémentation des points si l'utilisateur a une réponse correcte. 
Affichage du résultat final dans un console log puis sur une page "result" avec une redirection à la fin du questionnaire
 -->
<template>
    <div class="atFormQuestion">
        <div>
            <p>{{q.atName}}</p>
        </div>
        <div class="answer">
            <md-checkbox
                class="md-primary"
                v-model="q.atUserAnswers[index]"
                v-for="(value, index) in q.atResponse"
                v-bind:key="value"
            >{{ value }}</md-checkbox>
        </div>
        <div>
            <md-button
                @click="atPreviousQuestion()"
                id="previous"
                type="submit"
                class="md-icon-button md-raised"
            >
                <md-icon class="icon">navigate_before</md-icon>
            </md-button>
            <md-button
                @click="atNextQuestion()"
                id="next"
                type="submit"
                class="md-icon-button md-raised"
            >
                <md-icon class="icon">navigate_next</md-icon>
            </md-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Question',
    data() {
        return {
            q: this.atMyQuestion,
        }
    },
    props: {
        atMyQuestion: Object,
        atDisplayQuestion: Number,
    },
    methods: {
        atNextQuestion: function() {
            this.$emit('counterQuestion')
        },
        atPreviousQuestion: function() {
            this.$emit('countdownQuestion')
        },
    },
}
</script>
<style scoped lang="scss">
p {
    font-weight: bold;
    font-size: 15px;
    position: relative;
    top: -80px;
    padding: 30px 0;
    background: linear-gradient(60deg, #ffa726, #fb8c00);
    -webkit-box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28),
        0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);
    box-shadow: 0 12px 20px -10px rgba(255, 152, 0, 0.28),
        0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2);
    border-radius: 5px;
}
#previous,
#next {
    margin: 40px 10px 10px;
    background-color: rgb(9, 9, 141);

    .icon {
        color: white;
    }
}
</style>
