<!-- 
07/11
Si le résultat est en dessous de la moyenne le background du titre est rouge
Si le test est réussi le background du titre est vert
Affichage du résutat de l'utilisateur
-->
<template>
    <div>
        <div v-if="atTotal > atNbQuestion/2" class="title title-green">Résultat du questionnaire</div>
        <div v-else class="title title-red">Résultat du questionnaire</div>
        <md-card class="cardResult">
            <md-content>
                <p class="Result">{{atTotal}} sur {{atNbQuestion}}</p>
            </md-content>
        </md-card>
        <router-link to="/">
            <md-button class="md-raised md-primary">Accueil</md-button>
        </router-link>
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
    name: 'result',
    data: () => ({
        atTotal: Number,
        atNbQuestion: Number,
    }),
    mounted() {
        this.atTotal = this.$route.query.atTotal
        this.atNbQuestion = this.$route.query.atNbQuestion
    },
    components: {
        Footer,
    },
}
</script>
<style>
.title {
    padding: 20px 0;
    margin: 0 600px;
    border-radius: 2px;
    font-weight: bold;
    color: black;
    position: relative;
    top: 30px;
    z-index: 10;
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
    margin: 0 400px 50px;
    padding: 50px 10px 30px;
    font-size: 30px;
    border-radius: 10px;
}
</style>