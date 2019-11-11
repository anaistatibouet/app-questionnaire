<!-- 
11/11 - Formulaire qui demande à l'utilisateur le nombre de questions du questionnaire
Sa réponse est envoyée en paramètre dans l'url ce qui permettra de gérer la taille du tableau du questionnaire
-->
<template>
    <div>
        <div>
            <md-card class="md-layout-item md-size-50 md-small-size-100 atForm">
                <md-content>
                    <md-field>
                        <label>Mon questionnaire aura :</label>
                        <md-input
                            type="number"
                            v-model="atPoolQuest"
                            placeholder="Choisir un nombre entre 1 et 10"
                            min="0"
                            max="10"
                        ></md-input>
                    </md-field>
                    <div>
                        <md-button
                            type="submit"
                            class="md-raised md-primary"
                            @click="atChooseNbQuestion"
                        >Let's go</md-button>
                    </div>
                </md-content>
            </md-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'choice',
    data: () => ({
        min: 0,
        max: 0,
        atPoolQuest: Number,
    }),
    props: {},
    methods: {
        atChooseNbQuestion: function() {
            this.$router.push({
                name: 'questionnaire',
                // 11/11 - On l'envoie en paramètres pour le récupérer sur la page résultat
                query: {
                    atPoolQuest: this.atPoolQuest,
                },
            })

            // console.log('nb entré', this.atPoolQuest)
        },
    },
}
</script>

<style scoped lang="scss">
.atForm {
    margin: 50px auto;
    padding: 50px;
}
</style>
