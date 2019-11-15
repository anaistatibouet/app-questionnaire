<template>
    <div>
        <div v-show="!isAdmin">
            <img src="../assets/administration.png" alt />
        </div>
        <div v-show="!isAdmin">
            <md-card class="md-layout-item md-size-50 md-small-size-100 atForm">
                <FormTitle class="title" titleForm="Espace Administrateur"></FormTitle>
                <md-field>
                    <label>Entrez votre mot de passe</label>
                    <md-input v-model="atAdminPassword" type="password"></md-input>
                </md-field>
                <md-button
                    class="md-raised"
                    id="admin-btn"
                    @click="atVerifyAdminPwd"
                >Accéder au tableau de bord</md-button>
            </md-card>
            <md-dialog-alert
                :md-active.sync="atInvalidPwd"
                md-content="Mot de passe invalide"
                md-confirm-text="Réessayer"
            />
        </div>
        <div v-show="isAdmin">
            <FormTitle class="title" titleForm="Tableau récapitulatif"></FormTitle>
            <md-dialog-confirm
                :md-active.sync="activePopup"
                md-title="Etes-vous sûr de vouloir vider la base de données ?"
                md-content
                md-cancel-text="Non"
                md-confirm-text="Oui"
                @md-cancel="onCancel"
                @md-confirm="atDeleteAllUsers"
            />
            <div
                class="atTabEmpty"
                v-if="this.atUsers.rows === undefined ||
                this.atUsers.rows.length == 0"
            >
                <p>Aucun utilisateur dans la base de données</p>
                <router-link to="/">
                    <md-button class="md-icon-button md-raised md-primary">
                        <md-icon>add</md-icon>
                    </md-button>
                </router-link>
            </div>
            <div class="md-layout md-alignment-center">
                <md-table
                    v-model="atUsers.rows"
                    md-card
                    style="text-align: left;"
                    class="md-layout-item md-size-70 md-small-size-100 md-fixed-header list-users"
                >
                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Prénom" class="cap">{{ item.doc.atFirstname }}</md-table-cell>
                        <md-table-cell md-label="Nom">{{ item.doc.atLastname.toUpperCase() }}</md-table-cell>
                        <md-table-cell md-label="Société" class="cap">{{ item.doc.atCompany }}</md-table-cell>
                        <md-table-cell
                            md-label="Dernier score"
                            class="bad-score"
                            v-if="item.doc.atScore < 50"
                        >{{item.doc.atScore}}%</md-table-cell>
                        <md-table-cell
                            md-label="Dernier score"
                            class="good-score"
                            v-else
                        >{{item.doc.atScore}}%</md-table-cell>
                        <md-table-cell
                            md-label="Date du questionnaire"
                        >{{item.doc.atDateLastSurvey}}</md-table-cell>
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
            <div class="deleteAll">
                <md-button class="md-raised md-accent" @click="activePopup = true">
                    <md-icon>delete_forever</md-icon>
                    <span class="text">Tout supprimer</span>
                </md-button>
            </div>
        </div>

        <Footer></Footer>
    </div>
</template>
<script>
import FormTitle from '@/components/FormTitle.vue'
import Footer from '@/components/Footer.vue'

export default {
    name: 'dashboard',
    data: () => ({
        activePopup: false,
        active: false,
        value: null,
        atUsers: Object,
        empty: false,
        isAdmin: false,
        atAdminPassword: '',
        atInvalidPwd: false,
    }),
    components: {
        FormTitle,
        Footer,
    },
    methods: {
        // 10/11 - Fonction qui retourne la liste de tous les utilisateurs en BDD
        atGetUsers: function() {
            var vm = this
            this.$atSurveryDb
                .allDocs({ include_docs: true, attachments: true })
                .then(function(result) {
                    vm.atUsers = result
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
        // 11/11 - Fonction qui permet de supprimer tous les utilisateurs de la base de données
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
        // 15/11 - Fonction qui permet de vérifier que le mot de passe administrateur est le bon, sinon affichage d'une erreur
        atVerifyAdminPwd: function() {
            if (this.atAdminPassword === '#EPSI_Vue-js!2019') {
                this.isAdmin = true
            } else {
                this.atInvalidPwd = true
            }
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
.deleteAll {
    margin-top: 20px;
}
.text {
    vertical-align: middle;
    margin-left: 5px;
}

.list-users {
    height: 45vh;

    .good-score {
        text-align: center;
        color: green;
    }
    .bad-score {
        text-align: center;
        color: red;
    }
    .cap {
        text-transform: capitalize;
    }
}
.atTabEmpty {
    position: relative;
    top: 155px;
    z-index: 2;
}
.atForm {
    margin: 140px auto;
    padding: 10px 120px 20px;

    #admin-btn {
        background-color: purple;
        color: white;
    }
}
img {
    position: absolute;
    top: 200px;
    left: 80px;
    width: 250px;
}
@media screen and (max-width: 640px) {
    img {
        display: none;
    }
}
</style>