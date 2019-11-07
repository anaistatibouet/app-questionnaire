<template>
    <div id="footer">
        <p>Réalisé par Anaïs TATIBOUËT</p>
        <p>
            <b>TP App Questionnaire</b>
        </p>
        <p>B3 Classe 2 DEV - 2019</p>
    </div>
</template>
<script>
export default {
    name: 'Footer',
}
</script>

<style lang="scss">
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
