<template lang="pug">
    #app
        router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Mutation } from "vuex-class";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
</style>
