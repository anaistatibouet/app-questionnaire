<template>
    <div id="app">
        <div id="nav">
            <h1>EEV SAS</h1>
            <router-link to="/">Prestataire</router-link>|
            <router-link to="/administrateur">Adminitrateur</router-link>
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
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #ffae00;
        }
    }
}
</style>
