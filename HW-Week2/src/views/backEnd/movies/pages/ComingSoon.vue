<template>
  <div>
    <h4 class="uk-heading-line uk-text-center mt-4">
      <span>要呈現在前台的電影</span>
    </h4>
    <h5 v-if="showMoviesData == ''" class="text-center">目前無資料</h5>
    <MovieCard :action="'remove'" :id="1" :movies-data="showMoviesData" @remove="removeShowMovies"></MovieCard>
    <h4 class="uk-heading-line uk-text-center">
      <span>所有即將上映電影</span>
    </h4>
    <MovieCard :action="'add'" :id="0" :movies-data="moviesData" @add="addShowMovies"></MovieCard>

    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import MovieCard from '@/views/backEnd/movies/components/MovieCard.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    MovieCard,
    Loading
  },
  data() {
    return {
      moviesData: {},
      showMoviesData: {},
      isLoading: true
    }
  },
  watch: {
    showMoviesData(val) {
      if (val != '') {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.getMovies();
    this.getShowMovies();
  },
  methods: {
    getMovies() {
      const _this = this;
      this.axios.get(`${this.$api}/movies/showMovies/comingSoon/0`).then((response) => {
        // console.log(response.data);
        _this.moviesData = response.data;
      });
    },
    getShowMovies() {
      const _this = this;
      this.axios.get(`${this.$api}/movies/showMovies/comingSoon/1`).then((response) => {
        // console.log(response.data);
        _this.showMoviesData = response.data;
      });
    },
    addShowMovies(movieId) {
      const _this = this;
      this.axios.get(`${this.$api}/movies/addShowMovies/${movieId}`).then((response) => {
        // console.log(response.data);
        this.getMovies();
        this.getShowMovies();
      });
    },
    removeShowMovies(movieId) {
      const _this = this;
      this.axios.get(`${this.$api}/movies/removeShowMovies/${movieId}`).then((response) => {
        // console.log(response.data);
        this.getMovies();
        this.getShowMovies();
      });
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-weight: 600;
  opacity: 0.7;
}
</style>