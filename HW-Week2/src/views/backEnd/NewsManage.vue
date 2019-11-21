<template lang="pug">
    div
        //- 新增消息按鈕
        button.btn.btn-primary.mt-4(data-toggle="modal" data-target="#newsForm" @click.prevent="action = '新增'") 新增 + 

        //- 最新消息的清單
        .row.mt-3
            .col-6.col-md-4.col-lg-3.col-xl-2.mb-3(v-for="(item, index) in newsData" :key="index")
                .card.img-container
                    img.card-img-top(:src="item.img_thumbs_url")
                    .overlay.d-flex.flex-column.justify-content-center.align-items-center
                        button.btn.btn-info.mb-2(data-toggle="modal" data-target="#showNewsData" @click.prevent="showNews = item") 檢視
                        button.btn.btn-warning.mb-2(data-toggle="modal" data-target="#newsForm" @click.prevent="action = '修改'; getNewsData(item.id)") 修改
                        button.btn.btn-danger(data-toggle="modal" data-target="#deleteModal" @click.prevent="setId = item.id") 刪除

        //- 檢視消息 Modal
        #showNewsData.modal.fade(tabindex="-1" role="dialog" aria-labelledby="showNewsData" aria-hidden="true")
            .modal-dialog.modal-dialog-centered.modal-lg.modal-md(role="document")
                .modal-content
                    .modal-header
                        h4#showNewsData.modal-title {{ showNews.title }}
                        button.close(data-dismiss="modal" aria-label="Close")
                            span(aria-hidden="true") &times;
                    .modal-body
                        .row.w-100
                            .col-4
                                img.img-thumbnail.w-100(:src="showNews.img_thumbs_url")
                            .col-8
                                p(v-if="showNews.start_time != '0000-00-00'") 起始時間 : {{ showNews.start_time }}
                                p(v-if="showNews.end_time != '0000-00-00'") 結束時間 : {{ showNews.end_time }}
                                p {{ showNews.content }}

        //- 消息表單
        #newsForm.modal.fade(tabindex="-1" role="dialog" aria-labelledby="newsForm" aria-hidden="true" data-backdrop="static" data-keyboard="false")
            .modal-dialog.modal-dialog-centered.modal-md(role="document")
                .modal-content
                    .modal-header
                        h5#newForm.model-title {{ action }}消息
                        button.close(data-dismiss="modal" aria-label="Close")
                    .modal-body
                        p.for-group
                            label 標題 : 
                            input.form-control(type="text" v-model="title")
                        p.for-group
                            label 內容 : 
                            textarea.form-control(row="5" v-model="content")
                        p.for-group
                            label 開始時間 : 
                            input.form-control(type="date" v-model="startTime")
                        p.for-group
                            label 結束時間 : 
                            input.form-control(type="date" v-model="endTime")
                        p.form-group
                            label 圖片上傳 : 
                            input#file.form-control(type="file" accept="image/*" ref="file")
                    .modal-footer
                        button.btn.btn-outline-secondary(type="button" data-dismiss="modal" @click.prevent="cleanData") 取消
                        button.btn.btn-primary(type="button" data-dismiss="modal" @click.prevent="addNews" v-if="action == '新增'") 新增
                        button.btn.btn-primary(type="button" data-dismiss="modal" @click.prevent="updateNews" v-if="action == '修改'") 修改

        //- 刪除確認窗 Modal
        DeleteModal(@delete="deleteNews" @clear="cleanData")

        //- 載入中動畫
        Loading(v-if="isLoading")
</template>

<script lang="ts">
// import Vue from 'vue'
import { Component, Vue, Watch } from "vue-property-decorator";
import DeleteModal from "@/components/DeleteModal.vue";
import Loading from "@/components/Loading.vue";

@Component({
    components: {
        DeleteModal,
        Loading
    }
})
export default class NewsManage extends Vue {
    // Data
    newsData: object = {}; // 所有最新消息的資料,
    viewNews: object = {};
    showNews: string = "";
    setId: number = 0; // 刪除或是修改消息的 ID
    title: string = "";
    content: string = "";
    startTime: string = "";
    endTime: string = "";
    file: any = {};
    fileName: string = ""; // 修改消息的圖片名
    action: string = ""; // 用來判斷是新增還是修改
    isLoading: boolean = true; // 顯示 Loading 圖示直到資料準備好

    mounted(): void {
        this.getNewsData(); // 當網頁載入時發出請求取得資料
    }

    @Watch("newsData")
    checkNewsData(val: object): void {
        if (val) {
            this.isLoading = false;
        }
    }

    // 取的News資料
    getNewsData(newsId?: number): void {
        const _this = this;
        // 判斷是否有ID，有的話為取得單筆資料，無則是取得所有資料
        if (!newsId) {
            this.axios.get(`${_this.$api}/news/`).then((response: any) => {
                _this.newsData = response.data;
                // console.log(response.data);
            });
        } else {
            this.axios
                .get(`${_this.$api}/news/${newsId}`)
                .then((response: any) => {
                    _this.title = response.data[0].title;
                    _this.content = response.data[0].content;
                    _this.startTime =
                        response.data[0].start_time == "0000-00-00"
                            ? ""
                            : response.data[0].start_time;
                    _this.endTime =
                        response.data[0].end_time == "0000-00-00"
                            ? ""
                            : response.data[0].end_time;
                    _this.fileName = response.data[0].img_normal_url.substr(
                        -18,
                        18
                    );
                    _this.setId = response.data[0].id;
                });
        }
    }

    // 新增News
    addNews(): void {
        const _this = this;
        let formData: FormData = new FormData();
        this.file = (this.$refs.file as Vue & { files: any }).files[0];
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("startTime", this.startTime);
        formData.append("endTime", this.endTime);
        formData.append("file", this.file);
        this.axios
            .post(`${_this.$api}/news/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((response: any) => {
                if (response.data.status == 201) {
                    _this.$toasted.success(response.data.msg, {
                        theme: "bubble",
                        duration: 5000
                    });
                    _this.getNewsData(); // 新增後將畫面刷新
                    _this.cleanData(); // 新增後將表單資料清空
                } else {
                    _this.$toasted.error(response.data.msg, {
                        theme: "bubble",
                        duration: 5000
                    });
                }
            });
    }

    // 更新News
    updateNews(): void {
        const _this = this;
        this.file = (this.$refs.file as Vue & { files: any }).files[0];
        // this.file = this.$refs.file.files[0];
        let formData: FormData = new FormData();
        formData.append("title", this.title);
        formData.append("content", this.content);
        formData.append("startTime", this.startTime);
        formData.append("endTime", this.endTime);
        formData.append("fileName", this.fileName);
        formData.append("file", this.file);
        this.axios
            .post(`${_this.$api}/news/${this.setId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            .then((response: any) => {
                // console.log(response.data);
                if (response.data.status == 201) {
                    _this.$toasted.success(response.data.msg, {
                        theme: "bubble",
                        duration: 3000
                    });
                    _this.getNewsData(); // 更新後刷新畫面
                    _this.cleanData(); // 更新後將表單資料清空
                } else {
                    _this.$toasted.error(response.data.msg, {
                        theme: "bubble",
                        duration: 3000
                    });
                }
            });
    }

    // 刪除News
    deleteNews(): void {
        // console.log(this.setId);
        const _this = this;
        this.axios
            .delete(`${_this.$api}/news/${_this.setId}`)
            .then(response => {
                _this.$toasted.success(response.data.msg, {
                    theme: "bubble",
                    duration: 5000
                });
                _this.getNewsData(); // 刪除後刷新畫面
            });
    }

    // 新增及修改資料送出、取消、關閉最新消息的表單時將資料清除
    cleanData() {
        this.title = "";
        this.content = "";
        this.file = "";
        this.startTime = "";
        this.endTime = "";
        this.fileName = "";
        this.setId = 0;
    }
}
</script>

<style lang="scss" scoped>
.card {
    box-shadow: 5px 5px 15px #999;
}
.card-title {
    height: 30px;
    line-height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>