<template>
  <div>
    <div
      class="modal fade bd-example-modal-xl"
      :id="`viewMovies${id}`"
      tabindex="-1"
      role="dialog"
      :aria-labelledby="`viewMovies${id}`"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-12 col-md-4">
                <img :src="movie.poster" alt />
              </div>
              <div class="col-12 col-md-8">
                <p class="h3">片名 : {{ movie.name }}</p>
                <p class="h5">主演 : {{ movie.actor }}</p>
                <p class="h5">類型 : {{ movie.genre }}</p>
                <p class="h5">分級 : {{ movie.rating }}</p>
                <p class="h5">片長 : {{ movie.run_time }}</p>
                <p class="h5">上映日期 : {{ movie.play_date }}</p>
                <p class="h5">描述 : {{ movie.info }}</p>
              </div>
            </div>
            <iframe
              width="100%"
              height="600"
              :src="movie.trailer"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: ['movie', 'id'],
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>