<template lang="pug">
    div
        //- 新增按鈕
        button.btn.btn-primary.mt-3(data-toggle="modal" data-target="#mealsForm" @click.prevent="action = '新增'") 新增 + 

        //- 食物清單
        h4.mt-5 - 食物
        .row.mt-4
            .col-6.col-md-4.col-lg-3.mb-3(v-for="(item, index) in foods" :key="index")
                .card
                    img.card-img-top(:src="item.img_url")
                    .card-body
                        h5.card-title {{ item.name }}
                        p 價格 : {{ item.price }}
                        p 尺寸 : {{ item.size }}
                        .btn-group.d-flex.justify-content-center
                            button.btn.btn-warning(data-toggle="modal" data-target="#mealsForm" @click.prevent="action = '修改'; meals = item") 修改
                            button.btn.btn-danger(data-toggle="modal" data-target="#mealsForm" @click.prevent="deleteMeals") 刪除
        
        //- 飲料清單
        h4.mt-5 - 飲料
        .row.mt-4
            .col-6.col-md-4.col-lg-3.mb-3(v-for="(item, index) in drinks" :key="index")
                .card
                    img.card-img-top(:src="item.img_url")
                    .card-body
                        h5.card-title {{ item.name }}
                        p 價格 : {{ item.price }}
                        p 尺寸 : {{ item.size }}
                        .btn-group.d-flex.justify-content-center
                            button.btn.btn-warning(data-toggle="modal" data-target="#mealsForm" @click.prevent="action = '修改'; meals = item") 修改
                            button.btn.btn-danger(data-toggle="modal" data-target="#mealsForm" @click.prevent="deleteMeals") 刪除

        //- 餐點表單 Modal
        #mealsForm.modal.fade(tabindex="-1" role="dialog" aria-labelledby="mealsForm" aria-hidden="true" data-backdrop="static" data-keydown="false")
            .modal-dialog.modal-dialog-centered(role="document")
                .modal-content
                    .modal-header
                        h5#mealsForm.modal-title {{ action }} 餐點
                        button.close(type="button" data-dismiss="modal" aria-label="Close" @click.prevent="clearData")
                            span(aria-hidden="true") &times;
                    .modal-body
                        .form-group
                            label 餐點名稱 : 
                            input.form-control(type="text" v-model="meals.name")
                        .form-group
                            label 尺寸 : 
                            input.form-control(type="text" v-model="meals.size")
                        .form-group
                            label 分類 : 
                            select.form-control(v-model="meals.category")
                                option(value="" selected) - 請選擇 -
                                option(:value="item" v-for="(item, index) in category" :key="index") {{ item }}
                        .form-group
                            label 價格 : 
                            input.form-control(type="text" v-model="meals.price")
                        .form-group
                            label 圖片 : 
                            input#file.form-control(type="file" accept="image/*" ref="file")
                    .modal-footer
                        button.btn.btn-outline-secondary(data-dismiss="modal" @click.prevent="clearData") 取消
                        button.btn.btn-primary(data-dismiss="modal" @click.prevent="addMeals" v-if="action == '新增'") 新增
                        button.btn.btn-primary(data-dismiss="modal" @click.prevent="updateMeals(meals.id)" v-if="action == '修改'") 修改

        //- 確認刪除視窗 Modal
        DeleteModal(@delete="deleteMeals" @clear="clearData")
        Loading(v-if="isLoading")
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import Loading from "@/components/Loading.vue";
import DeleteModal from "@/components/DeleteModal.vue";

@Component({
    components: {
        Loading,
        DeleteModal
    }
})
export default class MealsManage extends Vue {
    mealsData: any[] = [];
    foods: object = {};
    drinks: object = {};
    action: string = "";
    isLoading: boolean = true;
    category: any[] = ["食物", "飲料"];
    meals: any = {
        name: "" as string,
        size: "" as string,
        category: "" as string,
        price: "" as string
    };
    file: any = {};
    setId: number = 0;

    @Watch("mealsData")
    checkMealsData(val: object): void {
        if (val) {
            this.isLoading = false;
        }
    }

    mounted(): void {
        this.getMealsData();
    }

    // 取得餐點資料
    getMealsData(): void {
        const _this = this;
        this.axios.get(`${this.$api}/meals/`).then(response => {
            _this.mealsData = response.data;
            _this.foods = this.mealsData.filter(res => {
                return res.category == "食物";
            });
            _this.drinks = this.mealsData.filter(res => {
                return res.category == "飲料";
            });
        });
    }

    // 新增餐點
    addMeals(): void {
        const _this = this;
        let formData: FormData = new FormData();
        this.file = (this.$refs.file as Vue & { files: any }).files[0];
        formData.append("name", this.meals.name);
        formData.append("size", this.meals.size);
        formData.append("category", this.meals.category);
        formData.append("price", this.meals.price);
        formData.append("file", this.file);
        this.axios
            .post(`${this.$api}/meals/`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
                if (response.data.status == 201) {
                    _this.$toasted.success(response.data.msg, {
                        theme: "bubble",
                        duration: 5000
                    });
                } else {
                    _this.$toasted.error(response.data.msg, {
                        theme: "bubble",
                        duration: 5000
                    });
                }
                this.clearData();
                this.getMealsData();
            });
    }

    // 修改餐點
    updateMeals(mealsId: any): void {
        const _this = this;
        let formData = new FormData();
        this.file = (this.$refs.file as Vue & { files: any }).files[0];
        formData.append("mealsId", mealsId);
        formData.append("name", this.meals.name);
        formData.append("size", this.meals.size);
        formData.append("category", this.meals.category);
        formData.append("price", this.meals.price);
        formData.append("file", this.file);
        this.axios
            .post(`${this.$api}/meals/${mealsId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
                // console.log(response.data);
                if (response.data.status == 201) {
                    _this.$toasted.success(response.data.msg, {
                        theme: "bubble",
                        duration: 5000
                    });
                } else {
                    _this.$toasted.error(response.data.msg, {
                        theme: "bubble",
                        duration: 5000
                    });
                }
                this.clearData();
                this.getMealsData();
            });
    }

    // 刪除餐點
    deleteMeals(): void {
        const _this = this;
        this.axios.delete(`${this.$api}/meals/${this.setId}`).then(response => {
            // console.log(response.data);
            if (response.data.status == 200) {
                _this.$toasted.success(response.data.msg, {
                    theme: "bubble",
                    duration: 5000
                });
            } else {
                _this.$toasted.error(response.data.msg, {
                    theme: "bubble",
                    duration: 5000
                });
            }
            this.getMealsData();
        });
    }

    // 清空資料
    clearData(): void {
        this.meals = {
            category: ""
        };
        delete this.file;
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