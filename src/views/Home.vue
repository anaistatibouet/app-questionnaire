<template>
    <div class="home">
        <img src="../assets/question.png" alt />
        <md-card class="md-layout-item md-size-50 md-small-size-100 atForm">
            <md-card-header>
                <FormTitle titleForm="Informations personnelles" />
            </md-card-header>
            <md-card-content>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label>Prénom</label>
                        <md-input v-model="atDataForm.atFirstname" required></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label>Nom</label>
                        <md-input v-model="atDataForm.atLastname" required></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label>Société</label>
                        <md-input v-model="atDataForm.atCompany" required></md-input>
                    </md-field>
                </div>
            </md-card-content>
            <md-button @click="atResetForm" class="md-raised md-accent">Réinitialiser</md-button>
            <md-button @click="atAddUserDb" class="md-raised md-primary">Commencer le test</md-button>
        </md-card>
        <!-- 10/11 Permet d'avertir l'utilisateur qu'il faut entrer des informations et évite les erreurs en BDD  -->
        <md-dialog-alert
            :md-active.sync="error"
            md-content="Entrez vos informations"
            md-confirm-text="J'ai compris"
        />
        <Footer></Footer>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import FormTitle from '@/components/FormTitle.vue'

var moment = require('moment')
moment.locale('fr')

export default {
    name: 'home',
    data() {
        return {
            atDataForm: {
                atLastname: null,
                atFirstname: null,
                atCompany: null,
                maxLength: null,
                required: true,
            },
            error: false,
            atIdUser: '',
        }
    },
    components: {
        FormTitle,
        Footer,
    },
    methods: {
        // 10/11 - Fonction qui permet à l'utilisateur d'effacer ces infos et recommencer
        atResetForm(evt) {
            evt.preventDefault()
            this.atDataForm.atFirstname = ''
            this.atDataForm.atLastname = ''
            this.atDataForm.atCompany = ''
        },
        // 10/11 - Fonction qui permet d'ajouter un utilisateur en BDD
        atAddUserDb: function() {
            var atUser = {
                _id: new Date().toISOString(),
                atDate: moment().format('LL'),
                atFirstname: this.atDataForm.atFirstname,
                atLastname: this.atDataForm.atLastname,
                atCompany: this.atDataForm.atCompany,
                atScore: null,
                atDateLastSurvey: null,
            }
            // 10/11 - Permet d'éviter d'entrer des données vides en BDD
            if (
                this.atDataForm.atFirstname != null &&
                this.atDataForm.atLastname != null &&
                this.atDataForm.atCompany != null
            ) {
                this.$atSurveryDb.put(atUser, function callback(err, result) {
                    if (!err) {
                        console.log('Successfully inserted in database')
                    }
                })
                sessionStorage.atIdUser = atUser._id
                console.log(atUser._id)
                this.$router.push({
                    name: 'choice',
                })
            } else {
                this.error = true
            }
        },
    },
}
</script>

<style scoped lang="scss">
.atForm {
    margin: 100px auto;
    padding: 10px 50px;
}
.atStart {
    margin: 10px 20px;
}
img {
    position: absolute;
    top: 200px;
    left: 80px;
    width: 250px;
}
@media screen and (max-width: 640px) {
    .atForm {
        text-align: center;
        margin: 20px auto;
        padding: 10px 50px;
    }
    img {
        display: none;
    }
}
</style>
