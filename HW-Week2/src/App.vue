<template lang="pug">
    #app
        #nav.text-center
            router-link(to="/") Home
            router-link(to="/about") About
            router-link(to="/backEnd") BackEnd
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
#nav {
    background-color: #00cc99;

    a {
        font-weight: bold;
        color: #fff;
        display: inline-block;
        padding: 15px 10%;
        text-decoration: none;

        &.router-link-exact-active {
            background-color: rgb(255, 130, 0);
            box-shadow: 0 5px 8px #888;
        }
    }

    a:hover {
        background-color: rgb(255, 150, 0);
        box-shadow: 0 5px 12px #555;
    }
}
</style>
