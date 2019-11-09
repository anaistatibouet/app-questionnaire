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
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
h1 {
    color: #0c4881;
}
</style>
