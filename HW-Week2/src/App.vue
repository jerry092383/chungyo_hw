<template lang="pug">
    #app
        .text-center.mt-3
            router-link(to="/backEnd") MyBackEnd
        router-view.mt-3
        GoTop
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GoTop from '@/components/GoTop.vue';

@Component({
    components: {
        GoTop
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap";
@import "@/assets/scss/style";
</style>
