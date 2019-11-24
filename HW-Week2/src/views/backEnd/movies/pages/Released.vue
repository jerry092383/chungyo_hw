<template lang="pug">
    div
        h4.mt-4: span 要呈現在前台的電影
        h5.text-center(v-if="showMoviesData == ''") 目前無資料
        MovieCard(v-else :action="'remove'" :id="1" :movies-data="showMoviesData" @remove="removeShowMovies")
        h4.text-center: span 所有已上映電影
        MovieCard(:action="'add'" :id="0" :movies-data="showMoviesData" @add="addShowMovies")

        //- 載入動畫
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
export default class Released extends Vue {
    moviesData: object = {};
    showMoviesData: object = {};
    isLoading: boolean = true;

    @Watch("showMoviesData")
    checkShowMoviesData(val: object): void {
        if (val != {}) {
            this.isLoading = false;
        }
    }

    mounted() {
        this.getMovies();
        this.getShowMovies();
    }

    // 取得所有上映中的電影
    getMovies(): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/movies/showMovies/released/0`)
            .then(response => {
                // console.log(response.data);
                _this.moviesData = response.data;
            });
    }

    // 取得要顯示於前台的上映電影
    getShowMovies(): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/movies/showMovies/released/1`)
            .then(response => {
                // console.log(response.data);
                _this.showMoviesData = response.data;
            });
    }

    // 加入顯示
    addShowMovies(movieId: number): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/movies/addShowMovies/${movieId}`)
            .then(response => {
                // console.log(response.data);
                this.getMovies();
                this.getShowMovies();
            });
    }

    // 移除顯示
    removeShowMovies(movieId: number): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/movies/removeShowMovies/${movieId}`)
            .then(response => {
                // console.log(response.data);
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