<template>
    <div>
        <FormTitle class="title" titleForm="Tableau récapitulatif"></FormTitle>
        <div class="md-layout md-alignment-center">
            <md-table
                v-model="atUsers.rows"
                md-card
                style="text-align: left;"
                class="md-layout-item md-size-50"
            >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="ID">{{ item.doc._id }}</md-table-cell>
                    <md-table-cell md-label="Prénom" class="cap">{{ item.doc.atFirstname }}</md-table-cell>
                    <md-table-cell md-label="Nom">{{ item.doc.atLastName.toUpperCase() }}</md-table-cell>
                    <md-table-cell md-label="Société" class="cap">{{ item.doc.atCompany }}</md-table-cell>
                </md-table-row>
            </md-table>
        </div>
    </div>
</template>
<script>
import FormTitle from '@/components/FormTitle.vue'

export default {
    name: 'listUsers',
    data: () => ({
        atUsers: Object,
    }),
    components: {
        FormTitle,
    },
    methods: {
        getUsers: function() {
            var vm = this
            this.$atSurveryDb
                .allDocs({ include_docs: true, attachments: true })
                .then(function(result) {
                    console.log(result)
                    // 10/11 - renvoie tous les prestataires de la BDD
                    vm.atUsers = result
                    console.log(vm.atUsers)
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
    },
    created() {
        // 10/11 - Permet de récupérer les prestataires
        this.getUsers()
    },
}
</script>
<style scoped lang="scss">
.title {
    margin-bottom: 40px;
}
.cap {
    text-transform: capitalize;
}
</style>