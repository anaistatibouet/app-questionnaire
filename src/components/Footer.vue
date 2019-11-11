<template>
    <div>
        <div id="footer">
            <p>Réalisé par Anaïs TATIBOUËT - B3 Classe 2 DEV</p>
            <p>
                <b>TP App Questionnaire</b>
            </p>
            <p>Contributeurs : Jules PEGUET</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
}
</script>

<style scoped lang="scss">
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
@media screen and (max-width: 640px) {
    #footer {
        display: none;
    }
}
</style>
