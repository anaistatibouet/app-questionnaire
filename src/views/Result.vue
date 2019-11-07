<template>
    <div>
        <div class="md-title">Résultat du questionnaire</div>
        <p>{{atTotal}} sur {{atNbQuestion}}</p>
        <router-link to="/">
            <md-button class="md-raised md-primary">Accueil</md-button>
        </router-link>
    </div>
</template>

<script>
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
}
</script>