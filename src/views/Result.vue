<!-- 
07/11
Si le résultat est en dessous de la moyenne le background du titre est rouge
Si le test est réussi le background du titre est vert
Affichage du résutat de l'utilisateur
-->
<template>
    <div>
        <div v-show="!atDetails">
            <div
                v-if="atTotal > atNbQuestion/2"
                class="md-layout-item md-small-size-100 titleResult title-green"
            >Résultat du questionnaire</div>
            <div
                v-else
                class="md-layout-item md-small-size-100 titleResult title-red"
            >Résultat du questionnaire</div>
            <md-card class="md-layout-item md-size-50 md-small-size-100 cardResult">
                <md-content>
                    <p class="Result">{{atTotal}} sur {{atNbQuestion}}</p>
                </md-content>
            </md-card>
        </div>
        <div v-show="atDetails">
            <h2 class="titleResult title-grey">Détails du résultat</h2>
            <md-card class="md-layout-item md-size-50 md-small-size-100 cardResultDetails">
                <md-content>
                    <div v-for="(item, index) in atatTab" :key="index">
                        <p class="detail">
                            <b>Question {{index + 1}} :</b>
                        </p>
                        <p class="detail green" v-if="item == 'Réponse correcte'">{{item}}</p>
                        <p class="detail red" v-if="item == 'Mauvaise réponse'">{{item}}</p>
                    </div>
                </md-content>
            </md-card>
        </div>
        <md-button
            @click="atDisplayDetails"
            v-show="!atDetails"
            class="md-raised"
        >Détails du résultat</md-button>
        <md-button @click="atDisplayResult" v-show="atDetails" class="md-raised">Résultat</md-button>
        <router-link to="/">
            <md-button class="md-raised md-primary">Accueil</md-button>
        </router-link>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import PoolQuestions from '../json/poolQuestions.json'

export default {
    name: 'result',
    data: () => ({
        atTotal: Number,
        atNbQuestion: Number,
        atatTab: [],
        atDetails: false,
    }),
    components: {
        Footer,
    },
    methods: {
        atDisplayDetails: function() {
            this.atDetails = true
        },
        atDisplayResult: function() {
            this.atDetails = false
        },
    },
    mounted() {
        this.atTotal = this.$route.query.atTotal
        this.atNbQuestion = this.$route.query.atNbQuestion
        this.atatTab = this.$route.query.atTab
    },
}
</script>
<style>
.titleResult {
    padding: 20px 0;
    margin: 0 480px;
    border-radius: 2px;
    font-weight: bold;
    color: black;
    position: relative;
    top: 30px;
    z-index: 10;
}

.title-grey {
    background: linear-gradient(60deg, #b8b9b9, #a8a8a8);
    -webkit-box-shadow: 0 12px 20px -10px rgba(151, 151, 151, 0.28),
        0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2);
    box-shadow: 0 12px 20px -10px rgba(69, 79, 80, 0.28),
        0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(93, 101, 102, 0.2);
}
.title-green {
    background: linear-gradient(60deg, #66bb6a, #43a047);
    -webkit-box-shadow: 0 12px 20px -10px rgba(76, 175, 80, 0.28),
        0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2);
    box-shadow: 0 12px 20px -10px rgba(0, 188, 212, 0.28),
        0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(0, 188, 212, 0.2);
}
.title-red {
    background: linear-gradient(60deg, #ef5350, #e53935);
    -webkit-box-shadow: 0 12px 20px -10px rgba(244, 67, 54, 0.28),
        0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2);
    box-shadow: 0 12px 20px -10px rgba(244, 67, 54, 0.28),
        0 4px 20px 0 rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2);
}
.cardResult {
    margin: 0 375px 50px;
    padding: 50px 0 30px;
    font-size: 30px;
    border-radius: 10px;
}
.cardResultDetails {
    margin: 0 375px 50px;
    padding: 50px 10px 30px;
    font-size: 12;
    border-radius: 10px;
}
.detail {
    text-align: left;
    display: inline-block;
    margin-bottom: 0;
}
.green {
    margin-right: 2px;
    color: #43a047;
}
.red {
    margin-right: 2px;
    color: #e53935;
}
</style>