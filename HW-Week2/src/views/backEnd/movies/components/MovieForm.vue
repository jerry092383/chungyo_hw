<template lang="pug">
    div
        .modal.fade(:id="`movieForm${id}`" tabindex="-1" aria-labellebdy="movieFormTitle" aria-hidden="true")
            .modal-dialog.modal-dialog-centered.modal-xl(role="document")
                .modal-content
                    .modal-header
                        h5#movieFormTitle.modal-title {{ event }}電影
                        button.close(type="button" data-dismiss="modal" aria-label="Close")
                            span(aria-hidden="true") &times;
                    .modal-body
                        .row
                            .col-12.col-md-6

                                //- mixin
                                mixin form-group(text, myType, model, isInput)
                                    .form-group
                                        label #{text}
                                        if isInput
                                            input.form-control(type=`${myType}` v-model=`${model}`)
                                        else
                                            textarea.form-control(row="8" v-model=`${model}`)

                                +form-group('片名 : ', 'text', 'movieDatas.name', true) 
                                +form-group('主演 : ', 'text', 'movieDatas.actor', true)
                                +form-group('類型 : ', 'text', 'movieDatas.genre', true)
                                +form-group('上映日期 : ', 'date', 'movieDatas.play_date', true)
                                +form-group('片長 : ', 'text', 'movieDatas.run_time', true)
                            .col-12.col-md-6
                                +form-group('分級 : ', 'text', 'movieDatas.rating', true)
                                +form-group('預告片( Youtube 網址 ) : ', 'text', 'movieDatas.trailer', true)
                                +form-group('電影描述 : ', '', 'movieDatas.info', false)
                    .modal-footer
                        button.btn.btn-outline-secondary(data-dismiss="modal") 取消
                        button.btn.btn-primary(data-dismiss="modal" @click.prevent="updateMovies") 修改
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class MovieForm extends Vue {
    @Prop()
    movieDatas!: any;

    @Prop(String)
    event!: string;

    @Prop(Number)
    id!: number;

    updateMovies(): void {
        const _this = this;
        let formData = new FormData();
        formData.append("movieDatas", JSON.stringify(this.movieDatas));
        this.axios
            .post(`${this.$api}/movies/update/${this.movieDatas.id}`, formData)
            .then(response => {
                console.log(response);
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
            });
    }
}
</script>

<style lang="scss" scoped>
</style>