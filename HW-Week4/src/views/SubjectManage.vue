<template lang="pug">
    div
        template
            el-table(
                :data="subjectData"
                stripe
            )
                el-table-column(
                    prop="name"
                    label="科目名"
                )
                el-table-column(
                    prop="price"
                    label="價格"
                )
                el-table-column(
                    prop="teacher"
                    label="科任老師"
                )
                el-table-column(label="管理")
                    el-button(
                        type="warning"
                        circle
                    ): i.el-icon-edit
                    el-button(
                        type="danger"
                        circle
                    ): i.el-icon-delete
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SubjectManage extends Vue {
    subjectData: any[] = [];

    mounted() {
        this.getSubjectList();
    }

    getSubjectList() {
        this.axios
            .get(`/api/subject`)
            .then(response => {
                this.subjectData = response.data;
            })
            .catch(error => {
                console.log(error)
            });
    }
}
</script>

<style lang="scss" scoped>
</style>