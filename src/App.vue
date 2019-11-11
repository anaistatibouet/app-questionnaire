<template>
    <div id="app">
        <div id="top">
            <md-toolbar :md-elevation="1" id="nav">
                <h1>EEV SAS</h1>
                <router-link to="/">
                    <md-icon class="iconMenu">home</md-icon>Accueil
                </router-link>
                <router-link to="/listUsers">
                    <md-icon class="iconMenu">list_alt</md-icon>Liste Prestataires
                </router-link>
                <router-link to="/administrateur">
                    <md-icon class="iconMenu">account_box</md-icon>Administrateur
                </router-link>
            </md-toolbar>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
html,
body {
    height: 100%;
    margin: 0;
    padding: 0;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #eee;
    height: 100%;
}
#nav {
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #ffae00;
        }
    }
    .iconMenu {
        margin-right: 10px;
    }
    display: flex;
    justify-content: space-between;
}
@media screen and (max-width: 640px) {
    #nav {
        display: block;
        a {
            display: block;
            margin: 20px;
        }
        padding-bottom: 20px;
    }
}
</style>
