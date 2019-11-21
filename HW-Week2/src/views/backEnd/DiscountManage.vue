<template lang="pug">
    div
        //- 新增按鈕
        button.btn.btn-primary.my-3(data-toggle="modal" data-target="#discountForm" @click.prevent="action = '新增'") 新增 +

        //- 折扣列表
        table.table.table-hover.shadow
            thead.thead-dark
                tr
                    mixin th(text)
                        th= text
                    -let th = ['折扣數', '描述', '開始時間', '結束時間', '管理'];
                    -for (let i = 0; i < 5; i++)
                        +th(th[i])
            tbody
                tr(v-for="(item, index) in discountsData" :key="index")
                    td {{ item.discount }}折
                    td {{ item.description }}
                    td {{ item.start_time }}
                    td {{ item.end_time }}
                    td
                        .btn-group
                            button.btn.btn-warning(data-toggle="modal" data-target="#discountForm" @click.prevent="action = '修改'; getDiscountsData(item.id)") 編輯
                            button.btn.btn-danger(data-toggle="modal" data-target="#deleteModal" @click.prevent="setId = item.id") 刪除

        //- 確認刪除視窗
        DeleteModal(@delete="deleteDiscount" @clear="cleanData")

        //- 折扣表單
        #discountForm.modal.fade(tabindex="-1" role="dialog" aria-labelledby="disccountForm" aria-hidden="true")
            .modal-dialog.modal-dialog-centered.modal-md(role="document")
                .modal-content
                    .modal-header
                        button.close(type="button" data-dismiss="modal" aria-label="Close" @click.prevent="cleanData")
                            span(aria-hidden="true") &times;
                    .modal-body
                        mixin form-group(title, inputType, test)
                            .form-group
                                label= title
                                input.form-control(type!=inputType v-model!=attributes.myAttr)
                        +form-group('折扣數 : ', 'text')(myAttr="dicount")
                    .modal-footer
</template>

<script>
import DeleteModal from "@/components/DeleteModal.vue";
import Loading from "@/components/Loading.vue";

export default {
    components: {
        DeleteModal,
        Loading
    },
    data() {
        return {
            discountsData: [], // 所有折扣的資料,
            viewDiscounts: {},
            showDiscounts: "",
            setId: Number, // 刪除或是修改消息的 ID
            discount: "",
            description: "",
            startTime: "",
            endTime: "",
            action: "", // 用來判斷是新增還是修改
            isLoading: true // 顯示 Loading 圖示直到資料準備好
        };
    },
    watch: {
        // 判斷是否取得所有消息的資料，還沒的話顯示 Loading 圖示
        discountsData(val) {
            if (val) {
                this.isLoading = false;
            }
        }
    },
    mounted() {
        this.getDiscountsData(); // 當網頁載入時發出請求取得資料
    },
    methods: {
        // 取得Discounts資料
        getDiscountsData(discountId = "") {
            const _this = this;
            // 判斷是否有ID，有的話為取得單筆資料，無則是取得所有資料
            if (discountId == "") {
                this.axios.get(`${_this.$api}/discount/`).then(response => {
                    _this.discountsData = response.data;
                    // console.log(response.data);
                });
            } else {
                this.axios
                    .get(`${_this.$api}/discount/${discountId}`)
                    .then(response => {
                        // $('#newsForm').modal('show');
                        let data = response.data[0];
                        _this.discount = data.discount;
                        _this.description = data.description;
                        _this.startTime =
                            data.start_time == "0000-00-00T00:00:00"
                                ? ""
                                : data.start_time.replace(/[\s]/, "T");
                        _this.endTime =
                            data.end_time == "0000-00-00T00:00:00"
                                ? ""
                                : data.end_time.replace(/[\s]/, "T");
                        _this.setId = data.id;
                    });
            }
        },
        // 更新News
        updateDiscount() {
            const _this = this;
            let formData = new FormData();
            formData.append("discount", this.discount);
            formData.append("description", this.description);
            formData.append("startTime", this.startTime);
            formData.append("endTime", this.endTime);
            this.axios
                .post(`${this.$api}/discount/${this.setId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(response => {
                    console.log(response.data.status);
                    if (response.data.status == 201) {
                        _this.$toasted.success(response.data.msg, {
                            theme: "bubble",
                            duration: 3000
                        });
                        _this.cleanData(); // 更新後將表單資料清空
                        _this.getDiscountsData(); // 更新後刷新畫面
                    } else {
                        _this.$toasted.error(response.data.msg, {
                            theme: "bubble",
                            duration: 3000
                        });
                    }
                });
        },
        // 新增Discount
        addDiscount() {
            const _this = this;
            let formData = new FormData();
            formData.append("discount", this.discount);
            formData.append("description", this.description);
            formData.append("startTime", this.startTime);
            formData.append("endTime", this.endTime);
            this.axios
                .post(`${this.$api}/discount/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then(response => {
                    if (response.data.status == 201) {
                        _this.$toasted.success(response.data.msg, {
                            theme: "bubble",
                            duration: 5000
                        });
                        _this.getDiscountsData(); // 新增後將畫面刷新
                        _this.cleanData(); // 新增後將表單資料清空
                    } else {
                        _this.$toasted.error(response.data.msg, {
                            theme: "bubble",
                            duration: 5000
                        });
                    }
                });
        },
        deleteDiscount() {
            // console.log(this.setId);
            const _this = this;
            this.axios
                .delete(`${_this.$api}/discount/${_this.setId}`)
                .then(response => {
                    _this.$toasted.success(response.data.msg, {
                        theme: "bubble",
                        duration: 5000
                    });
                    _this.getDiscountsData(); // 刪除後刷新畫面
                });
        },
        cleanData() {
            this.discount = "";
            this.description = "";
            this.startTime = "";
            this.endTime = "";
            this.setId = "";
        }
    }
};
</script>

<style lang="scss" scoped>
</style>