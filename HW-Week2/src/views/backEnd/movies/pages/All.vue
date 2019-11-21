<template>
  <div>
    <h4 class="uk-heading-line uk-text-center mt-4"><span>所有電影</span></h4>
    <MovieCard :movies-data="moviesData" class="mt-5"></MovieCard>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import MovieCard from "@/views/backEnd/movies/components/MovieCard.vue";

export default {
  components: {
    Loading,
    MovieCard
  },
  data() {
    return {
      moviesData: {},
      isLoading: true
    };
  },
  watch: {
    moviesData(val) {
      if (val != '') {
        this.isLoading = false
      }
    }
  },
  mounted() {
    this.getMovies();
  },
  methods: {
    getMovies() {
      const _this = this;
      this.axios.get(`${this.$api}/movies/`).then((response) => {
        // console.log(response.data);
        _this.moviesData = response.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h4 {
  font-weight: 600;
  opacity: .7;
}
</style>