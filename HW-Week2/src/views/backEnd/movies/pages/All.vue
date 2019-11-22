<template lang="pug">
    div
        h4.mt-4: span 所有電影
        MovieCard.mt-5(:movies-data="moviesData")
        Loading(v-if="isLoading")
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Loading from "@/components/Loading.vue";
import MovieCard from "@/views/backEnd/movies/components/MovieCard.vue";

@Component({
    components: {
        Loading,
        MovieCard
    }
})
export default class All extends Vue {
    // Data
    moviesData: object = {};
    isLoading: boolean = true;

    @Watch("moviesData")
    checkMoviesData(val: object) {
        if (val) {
            this.isLoading = false;
        }
    }

    mounted(): void {
        this.getMovies();
    }

    getMovies(): void {
        const _this = this;
        this.axios.get(`${this.$api}/movies/`).then(response => {
            // console.log(response.data);
            _this.moviesData = response.data;
        });
    }
}
</script>

<style lang="scss" scoped>
h4 {
    font-weight: 600;
    opacity: 0.7;
}
</style>