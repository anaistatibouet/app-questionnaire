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
                <!-- Idée de suppression d'un utilisateur vient de Jules PEGUET -->
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="ID">{{ item.doc._id }}</md-table-cell>
                    <md-table-cell md-label="Prénom" class="cap">{{ item.doc.atFirstname }}</md-table-cell>
                    <md-table-cell md-label="Nom">{{ item.doc.atLastname.toUpperCase() }}</md-table-cell>
                    <md-table-cell md-label="Société" class="cap">{{ item.doc.atCompany }}</md-table-cell>
                    <md-table-cell md-label="Supprimer">
                        <div>
                            <md-dialog-confirm
                                :md-active.sync="active"
                                md-title="Etes-vous sûr de vouloir supprimer cet utilisateur ?"
                                md-content
                                md-cancel-text="Non"
                                md-confirm-text="Oui"
                                @md-cancel="onCancel"
                                @md-confirm="atDeleteUser(item.id)"
                            />
                            <md-button
                                @click="active = true"
                                class="md-icon-button md-raised md-accent"
                            >
                                <md-icon>delete_outline</md-icon>
                            </md-button>
                        </div>
                    </md-table-cell>
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
        active: false,
        value: null,
        atUsers: Object,
    }),
    components: {
        FormTitle,
    },
    methods: {
        atGetUsers: function() {
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
        atDeleteUser: function(atUsersId) {
            var vm = this
            this.$atSurveryDb.get(atUsersId).then(function(doc) {
                vm.$atSurveryDb.remove(doc)
                vm.atGetUsers()
            })
        },
        onCancel() {
            this.value = ''
        },
    },
    created() {
        // 10/11 - Permet de récupérer les prestataires
        this.atGetUsers()
    },
}
</script>
<style scoped lang="scss">
.title {
    margin: 40px;
}
.cap {
    text-transform: capitalize;
}
</style>