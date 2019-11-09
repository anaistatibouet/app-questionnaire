<!-- Création d'un titre -->
<template>
    <div class="hello">
        <h1>{{ titleForm }}</h1>
    </div>
</template>

<script>
export default {
    name: 'FormTitle',
    props: {
        titleForm: String,
    },
}
</script>

<style scoped lang="scss">
h1 {
    color: #0c4881;
    margin: 0;
}
</style>
