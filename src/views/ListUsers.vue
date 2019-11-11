<template>
    <div>
        <FormTitle class="title" titleForm="Tableau récapitulatif"></FormTitle>
        <div class="deleteAll">
            <md-button class="md-raised md-accent" @click="activePopup = true">
                <md-icon>delete_forever</md-icon>
                <span class="text">Tout supprimer</span>
            </md-button>
        </div>
        <md-dialog-confirm
            :md-active.sync="activePopup"
            md-title="Etes-vous sûr de vouloir vider la base de données ?"
            md-content
            md-cancel-text="Non"
            md-confirm-text="Oui"
            @md-cancel="onCancel"
            @md-confirm="atDeleteAllUsers"
        />
        <div class="md-layout md-alignment-center">
            <md-table
                v-model="atUsers.rows"
                md-card
                style="text-align: left;"
                class="md-layout-item md-size-50 md-small-size-100"
            >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                    <md-table-cell md-label="Date">{{ item.doc.atDate}}</md-table-cell>
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
        activePopup: false,
        active: false,
        value: null,
        atUsers: Object,
    }),
    components: {
        FormTitle,
    },
    methods: {
        // 10/11 - Fonction qui retourne la liste de tous les utilisateurs en BDD
        atGetUsers: function() {
            var vm = this
            this.$atSurveryDb
                .allDocs({ include_docs: true, attachments: true })
                .then(function(result) {
                    console.log(result)
                    vm.atUsers = result
                    console.log(vm.atUsers)
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        // 10/11 - Fonction qui permet de supprimer un utilisateur
        atDeleteUser: function(atUsersId) {
            var vm = this
            this.$atSurveryDb.get(atUsersId).then(function(doc) {
                vm.$atSurveryDb.remove(doc)
                // 10/11 On retourne la liste pour rafraîchir le tableau
                vm.atGetUsers()
            })
        },
        onCancel() {
            this.value = ''
        },
        // 11/11 - FOnction qui permet de supprimer tous les utilisateurs de la base de données
        atDeleteAllUsers: function() {
            var vm = this
            this.$atSurveryDb
                .allDocs({ include_docs: true })
                .then(allDocs => {
                    return allDocs.rows.map(row => {
                        return {
                            _id: row.id,
                            _rev: row.doc._rev,
                            _deleted: true,
                        }
                    })
                })
                .then(deleteDocs => {
                    return this.$atSurveryDb.bulkDocs(deleteDocs)
                })
                .then(function() {
                    vm.atGetUsers()
                })
                .catch(function(err) {
                    console.log(err)
                })
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
.deleteAll {
    margin-bottom: 20px;
}
.text {
    vertical-align: middle;
    margin-left: 5px;
}
</style>