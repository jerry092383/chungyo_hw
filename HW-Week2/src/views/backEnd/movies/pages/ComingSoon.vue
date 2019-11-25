<template lang="pug">
    div
        h4.mt-5: span - 要呈現在前台的電影
        h5.text-center.mt-4(v-if="showMoviesData == ''") 目前無資料
        MovieCard.mt-4(:action="'remove'" :id="1" :movies-data="showMoviesData" @remove="removeShowMovies")
        h4.mt-5: span - 所有即將上映電影
        MovieCard.mt-4(:action="'add'" :id="0" :movies-data="moviesData" @add="addShowMovies")
        Loading(v-if="isLoading")
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import MovieCard from "@/views/backEnd/movies/components/MovieCard.vue";
import Loading from "@/components/Loading.vue";

@Component({
    components: {
        MovieCard,
        Loading
    }
})
export default class comingSoon extends Vue {
    moviesData: object = {};
    showMoviesData: object = {};
    isLoading: boolean = true;

    @Watch("showMoviesData")
    checkShowMoviesData(val: object): void {
        if (val != {}) {
            this.isLoading = false;
        }
    }

    mounted(): void {
        this.getMovies();
        this.getShowMovies();
    }

    // 取得"要"顯示在前台的即將上映電影資料
    getMovies(): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/movies/showMovies/comingSoon/0`)
            .then(response => {
                _this.moviesData = response.data;
            });
    }

    // 取得"不"顯示在前台的即將上映電影資料
    getShowMovies(): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/movies/showMovies/comingSoon/1`)
            .then(response => {
                _this.showMoviesData = response.data;
            });
    }

    // 新增至要顯示於前台
    addShowMovies(movieId: number): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/movies/addShowMovies/${movieId}`)
            .then(response => {
                this.getMovies();
                this.getShowMovies();
            });
    }

    // 從顯示於前臺中移除
    removeShowMovies(movieId: number): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/movies/removeShowMovies/${movieId}`)
            .then(response => {
                this.getMovies();
                this.getShowMovies();
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