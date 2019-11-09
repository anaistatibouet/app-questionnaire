<!-- Création d'un titre -->
<template>
    <div>
        <router-link to="/">
            <md-action>
                <md-button class="md-icon-button md-raised md-accent">
                    <md-icon class="leave">highlight_off</md-icon>
                </md-button>
            </md-action>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'ReturnToHome',
}
</script>

<style scoped lang="scss">
h1 {
    color: #0c4881;
}
.leave {
    font-size: 20px;
}
</style>
