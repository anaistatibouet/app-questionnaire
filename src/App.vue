<template>
    <div id="app">
        <div id="top">
            <md-toolbar :md-elevation="1" id="nav">
                <h1>EEV SAS</h1>
                <router-link to="/">Accueil</router-link>
                <router-link to="/listUsers">Liste Prestataires&nbsp;</router-link>
                <router-link to="/administrateur">Administrateur&nbsp;</router-link>
            </md-toolbar>
        </div>
        <div id="footer">
            <p>Réalisé par Anaïs TATIBOUËT - B3 Classe 2 DEV</p>
            <p>
                <b>TP App Questionnaire</b>
            </p>
            <p>Contributeurs : Jules PEGUET</p>
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
    display: flex;
    justify-content: space-between;
}
#footer {
    position: absolute;
    bottom: 0;
    background-color: rgb(49, 49, 49);
    width: 100%;
    display: flex;
    padding: 0 20px;
    color: white;
    justify-content: space-between;
}
</style>
