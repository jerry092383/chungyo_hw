<template lang="pug">
    .home
        
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
    components: {
        HelloWorld
    }
})
export default class Home extends Vue {
    mounted(): void {
        this.getData();
    }

    getData(): void {
        this.axios
            .get("/api/get")
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}
</script>
