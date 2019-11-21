<template lang="pug">
    .home
        img(alt="Vue logo" src="../assets/logo.png")
        HelloWorld(msg="Welcome to Your Vue.js App")
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import HelloWorld from "@/components/HelloWorld.vue";

export default Vue.extend({
    name: "home",
    components: {
        HelloWorld
    }
});
</script>
