<template>
  <div>
    <div
      class="modal fade"
      :id="`movieForm${id}`"
      tabindex="-1"
      role="dialog"
      aria-labelledby="movieFormTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="movieFormTitle">{{ event }}電影</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label>片名 :</label>
                  <input type="text" class="form-control" v-model="movieDatas.name" />
                </div>
                <div class="form-group">
                  <label>主演 :</label>
                  <input type="text" class="form-control" v-model="movieDatas.actor" />
                </div>
                <div class="form-group">
                  <label>類型 :</label>
                  <input type="text" class="form-control" v-model="movieDatas.genre" />
                </div>
                <div class="form-group">
                  <label>上映日期 :</label>
                  <input type="date" class="form-control" v-model="movieDatas.play_date" />
                </div>
                <div class="form-group">
                  <label>片長 :</label>
                  <input type="text" class="form-control" v-model="movieDatas.run_time" />
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-group">
                  <label>分級 :</label>
                  <input type="text" class="form-control" v-model="movieDatas.rating" />
                </div>
                <div class="form-group">
                  <label>預告片( YouTube網址 ) :</label>
                  <input type="text" class="form-control" v-model="movieDatas.trailer" />
                </div>
                <div class="form-group">
                  <label>電影描述 :</label>
                  <textarea class="form-control" rows="8" v-model="movieDatas.info"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click.prevent="updateMovies">送出</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movieDatas', 'event', 'id'],
  data() {
    return {

    }
  },
  methods: {
    updateMovies() {
      let formData = new FormData();
      formData.append('movieDatas', this.movieDatas);
      this.axios.post(`${this.$api}/movies/update/${this.movieDatas.id}`, formData).then((response) => {
        console.log(response.data);
      });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>