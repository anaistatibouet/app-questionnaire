<template>
    <div class="home">
        <md-card class="md-layout-item md-size-50 md-small-size-100 atForm">
            <md-card-header>
                <FormTitle title="Informations personnelles" />
            </md-card-header>
            <md-card-content>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label>Prénom</label>
                        <md-input v-model="atFirstname"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label>Nom</label>
                        <md-input v-model="atLastname"></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field>
                        <label>Société</label>
                        <md-input v-model="atCompany"></md-input>
                    </md-field>
                </div>
            </md-card-content>
            <md-card-actions>
                <md-button @click="atResetForm" class="md-raised md-accent">Réinitialiser</md-button>
                <router-link to="/questionnaire" class="atStart">
                    <md-button type="submit" class="md-raised md-primary">Commencer le test</md-button>
                </router-link>
            </md-card-actions>
        </md-card>
    </div>
</template>

<script>
import FormTitle from '@/components/FormTitle.vue'

export default {
    name: 'home',
    data: () => ({
        atLastname: null,
        atFirstname: null,
        atCompany: null,
        maxLength: null,
    }),
    components: {
        FormTitle,
    },
    methods: {
        atResetForm(evt) {
            evt.preventDefault()
            this.atFirstname = null
            this.atLastname = null
            this.atCompany = null
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
</style>
