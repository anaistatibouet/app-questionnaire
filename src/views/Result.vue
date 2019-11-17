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
                class="md-layout-item md-size-40 md-small-size-100 titleResult title-green"
            >Résultat du questionnaire</div>
            <div
                v-else
                class="md-layout-item md-size-40 md-small-size-100 titleResult title-red"
            >Résultat du questionnaire</div>
            <md-card class="md-layout-item md-size-50 md-small-size-100 cardResult">
                <md-content>
                    <p class="Result">{{atTotal}} sur {{atNbQuestion}}</p>
                </md-content>
            </md-card>
        </div>
        <div v-show="atDetails">
            <h2
                class="md-layout-item md-size-40 md-small-size-100 titleResult title-grey"
            >Détails du résultat</h2>
            <md-card class="md-layout-item md-size-80 md-small-size-100 cardResultDetails">
                <md-content>
                    <div class="NameQuestion">
                        <div v-for="q in atTabNameQuestion" :key="q.id">
                            <p>{{q.atName}}</p>
                        </div>
                    </div>
                    <div class="CheckAnwser">
                        <div v-for="(item, index) in atTabResponse" :key="index">
                            <p class="detail green" v-if="item == 'Réponse correcte'">{{item}}</p>
                            <p class="detail red" v-if="item == 'Mauvaise réponse'">{{item}}</p>
                        </div>
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
        <!-- <router-link to="/"> -->
        <md-button class="md-raised md-primary" @click="atGoToHome" id="home">Accueil</md-button>
        <!-- </router-link> -->
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import PoolQuestions from '../json/Questions.json'

var moment = require('moment')
moment.locale('fr')

export default {
    name: 'result',
    data: () => ({
        atTotal: Number,
        atNbQuestion: Number,
        atTabResponse: [],
        atDetails: false,
        // Questions: PoolQuestions,
        atTabNameQuestion: [],
    }),
    components: {
        Footer,
    },
    methods: {
        // 15/11 - Cette fonction permet d'ajouter le score au tableau des utilisateurs
        atScoreUser: function() {
            var atUserId = sessionStorage.getItem('atIdUser')
            var vm = this
            this.$atSurveryDb
                .get(atUserId)
                .then(function(doc) {
                    // 15/11 - Le nombre de question étant différent à chaque questionnaire, un pourcentage est plus parlant
                    doc.atScore = Math.round(
                        (vm.atTotal * 100) / vm.atNbQuestion
                    )
                    doc.atDateLastSurvey = moment().format('LLL')
                    vm.$atSurveryDb.put(doc, function callback(err, result) {
                        if (!err) {
                            console.log('Successfully modification')
                        } else {
                            console.log(err)
                        }
                    })
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        atDisplayDetails: function() {
            this.atDetails = true
        },
        atDisplayResult: function() {
            this.atDetails = false
        },
        atGoToHome: function() {
            this.$router.push({
                name: '/',
            })
            location.reload()
        },
    },
    mounted() {
        this.atTabNameQuestion = this.$route.query.atTabNameQuestion
        this.atTotal = this.$route.query.atTotal
        this.atNbQuestion = this.$route.query.atNbQuestion
        this.atTabResponse = this.$route.query.atTab
    },
    created() {
        this.atScoreUser()
    },
}
</script>
<style scoped lang="scss">
.titleResult {
    padding: 15px 0;
    margin: 0 auto;
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
    margin: 0 auto 50px;
    padding: 50px 0 30px;
    font-size: 30px;
    border-radius: 10px;
}
.cardResultDetails {
    position: relative;
    margin: 0 auto 20px;
    padding: 50px 10px 30px;
    border-radius: 10px;
    height: 63vh;

    .green {
        margin-right: 2px;
        border-radius: 2px;
        width: 150px;
        padding: 2px;
        text-align: center;
        background-color: #43a047;
    }
    .red {
        margin-right: 2px;
        border-radius: 2px;
        width: 150px;
        padding: 2px;
        text-align: center;
        background-color: #e53935;
    }
    .NameQuestion {
        width: 50%;
        float: left;
        text-align: left;
        margin-top: 10px;
        margin-left: 20px;
        vertical-align: middle;
    }
    .CheckAnwser {
        float: left;
        width: 30%;
        vertical-align: middle;
        .detail {
            text-align: center;
            margin-bottom: 0;
        }
    }
}
#home {
    background-color: rgb(9, 9, 141);
    color: white;
}
</style>