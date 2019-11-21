<template>
  <div>
    <button
      class="btn btn-primary mt-3"
      data-toggle="modal"
      data-target="#mealsForm"
      @click.prevent="action = '新增'"
    >新增 +</button>

    <h4 class="uk-heading-line uk-text-center pt-0">
      <span>食物</span>
    </h4>
    <!-- <MealsCard :meals-data="foods"></MealsCard> -->
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3 mb-3" v-for="(item, index) in foods" :key="index">
        <div class="card">
          <img :src="item.img_url" class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p>價格 : {{ item.price }}</p>
            <p>尺寸 : {{ item.size }}</p>
            <div class="btn-group d-flex justify-content-center">
              <button
                class="btn btn-warning"
                data-toggle="modal"
                data-target="#mealsForm"
                @click.prevent="action = '修改'; meals = item"
              >修改</button>
              <button
                class="btn btn-danger"
                data-toggle="modal"
                data-target="#deleteModal"
                @click.prevent="setId = item.id"
              >刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4 class="uk-heading-line uk-text-center pt-0">
      <span>飲料</span>
    </h4>
    <!-- <MealsCard :meals-data="drinks"></MealsCard> -->
    <div class="row">
      <div class="col-6 col-md-4 col-lg-3 mb-3" v-for="(item, index) in drinks" :key="index">
        <div class="card">
          <img :src="item.img_url" class="card-img-top" alt />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p>價格 : {{ item.price }}</p>
            <p>尺寸 : {{ item.size }}</p>
            <div class="btn-group d-flex justify-content-center">
              <button
                class="btn btn-warning"
                data-toggle="modal"
                data-target="#mealsForm"
                @click.prevent="action = '修改'; meals = item"
              >修改</button>
              <button
                class="btn btn-danger"
                data-toggle="modal"
                data-target="#deleteModal"
                @click.prevent="setId = item.id"
              >刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteModal @delete="deleteMeals" @clear="clearData"></DeleteModal>

    <!-- Meals Form -->
    <div
      class="modal fade"
      id="mealsForm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mealsForm"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="mealsForm">{{ action }}餐點</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click.prevent="clearData"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>餐點名稱 :</label>
              <input type="text" class="form-control" v-model="meals.name" pattern="\s" required />
              <label>尺寸 :</label>
              <input type="text" class="form-control" v-model="meals.size" required />
              <label>分類 :</label>
              <select class="form-control" v-model="meals.category" required>
                <option value="" selected>- 請選擇 -</option>
                <option :value="item" v-for="(item, index) in category" :key="index">{{ item }}</option>
              </select>
              <label>價格 :</label>
              <input type="number" class="form-control" v-model="meals.price" required />
              <label>圖片 :</label>
              <input type="file" id="file" class="form-control" ref="file" />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              @click.prevent="clearData"
            >取消</button>
            <button
              type="submit"
              class="btn btn-primary"
              data-dismiss="modal"
              v-if="action == '新增'"
              @click.prevent="addMeals"
            >送出</button>
            <button
              type="submit"
              class="btn btn-primary"
              data-dismiss="modal"
              v-if="action == '修改'"
              @click.prevent="updateMeals(meals.id)"
            >送出</button>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="isLoading"></Loading>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  components: {
    Loading,
    DeleteModal,
  },
  data() {
    return {
      mealsData: [],
      foods: {},
      drinks: {},
      action: '',
      isLoading: true,
      category: ['食物', '飲料'],
      meals: {
        name: '',
        size: '',
        category: '',
        price: '',
      },
      file: '',
      setId: ''
    }
  },
  watch: {
    mealsData(val) {
      if (val) {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.getMealsData();
    // this.getCategory();
  },
  methods: {
    getMealsData() {
      const _this = this;
      this.axios.get(`${this.$api}/meals/`).then((response) => {
        // console.log(response.data);
        _this.mealsData = response.data;
        _this.foods = this.mealsData.filter((res) => {
          return res.category == '食物';
        });
        _this.drinks = this.mealsData.filter((res) => {
          return res.category == '飲料';
        });
      });
    },
    addMeals() {
      const _this = this;
      let formData = new FormData();
      this.file = this.$refs.file.files[0];
      formData.append('name', this.meals.name);
      formData.append('size', this.meals.size);
      formData.append('category', this.meals.category);
      formData.append('price', this.meals.price);
      formData.append('file', this.file);
      this.axios.post(`${this.$api}/meals/`, formData, {
        headers: { "Content-Type": 'multipart/form-data' }
      }).then((response) => {
        // console.log(response.data);
        if (response.data.status == 201) {
          _this.$toasted.success(response.data.msg, {
            theme: 'bubble',
            duration: 5000
          });
        } else {
          _this.$toasted.error(response.data.msg, {
            theme: 'bubble',
            duration: 5000
          });
        }
        this.clearData();
        this.getMealsData();
      });
    },
    updateMeals(mealsId) {
      const _this = this;
      let formData = new FormData();
      this.file = this.$refs.file.files[0];
      formData.append('mealsId', mealsId);
      formData.append('name', this.meals.name);
      formData.append('size', this.meals.size);
      formData.append('category', this.meals.category);
      formData.append('price', this.meals.price);
      formData.append('file', this.file);
      this.axios.post(`${this.$api}/meals/${mealsId}`, formData, {
        headers: { "Content-Type": 'multipart/form-data' }
      }).then((response) => {
        // console.log(response.data);
        if (response.data.status == 201) {
          _this.$toasted.success(response.data.msg, {
            theme: 'bubble',
            duration: 5000
          });
        } else {
          _this.$toasted.error(response.data.msg, {
            theme: 'bubble',
            duration: 5000
          });
        }
        this.clearData();
        this.getMealsData();
      });
    },
    // getCategory() {
    //   const _this = this;
    //   this.axios.get(`${this.$api}/meals/category`).then((response) => {
    //     console.log(response.data);
    //     _this.category = response.data;
    //   });
    // },
    deleteMeals() {
      const _this = this;
      this.axios.delete(`${this.$api}/meals/${this.setId}`).then((response) => {
        // console.log(response.data);
        if (response.data.status == 200) {
          _this.$toasted.success(response.data.msg, {
            theme: 'bubble',
            duration: 5000,
          });
        } else {
          _this.$toasted.error(response.data.msg, {
            theme: 'bubble',
            duration: 5000,
          });
        }
        this.getMealsData();
      });
    },
    clearData() {
      this.meals = {
        category: ''
      };
      this.file = '';
    }
  }
}

</script>

<style lang="scss" scoped>
.card {
  box-shadow: 5px 10px 18px #888888;
}
h4 {
  font-weight: 600;
  opacity: 0.7;
}
</style>