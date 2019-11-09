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
            <md-card-actions>
                <md-button @click="atResetForm" class="md-raised md-accent">Réinitialiser</md-button>
                <md-button @click="atSubmitForm" class="md-raised md-primary">Commencer le test</md-button>
            </md-card-actions>
        </md-card>
        <!-- <Footer></Footer> -->
    </div>
</template>

<script>
import PouchDB from 'pouchdb'
var db = new PouchDB('atDbQuestionnaire')

import FormTitle from '@/components/FormTitle.vue'

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
        }
    },
    components: {
        FormTitle,
    },
    methods: {
        atSubmitForm(evt) {
            this.$router.push({
                name: 'questionnaire',
            })
        },
        atResetForm(evt) {
            evt.preventDefault()
            this.atDataForm.atFirstname = ''
            this.atDataForm.atLastname = ''
            this.atDataForm.atCompany = ''
        },
    },
}
</script>

<style scoped lang="scss">
.atForm {
    margin: 20px auto;
    padding: 10px 50px;
}
.atStart {
    margin: 10px 20px;
}
img {
    position: absolute;
    top: 220px;
    left: 80px;
    width: 250px;
}
</style>
