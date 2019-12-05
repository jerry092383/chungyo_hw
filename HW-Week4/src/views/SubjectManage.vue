<template lang="pug">
div
    //- 新增按鈕
    el-button.add(
        type="primary"
        @click="action = '新增'; dialogOpen = true"
        size="medium"
    ): i.el-icon-plus 新增

    //- 科目列表
    template
        el-table(
            :data="subjectData"
            stripe
        )
            el-table-column(width="20px")
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
                template(v-slot="scope")
                    el-button(
                        type="warning"
                        circle
                        @click="dialogOpen = true; getOneSubjectData(scope.row.id); action = '編輯'"
                        size="small"
                    ): i.el-icon-edit
                    el-button(
                        type="danger"
                        circle
                        @click="deleteSubject(scope.row.id)"
                        size="small"
                    ): i.el-icon-delete
    //- 科目表單
    el-dialog(
        :title="`${action}科目`"
        :visible.sync="dialogOpen"
        @closed="cleanData"
    )
        el-form
            el-form-item(
                label="科目名稱 : "
            )
                el-input(v-model="subject.name")
            el-form-item(label="價格 : ")
                el-input(
                    v-model="subject.price"
                    type="number"
                )
            el-form-item(label="老師 : ")
                el-input(v-model="subject.teacher")
            div.right
                el-button(
                    type="info"
                    plain
                    @click="dialogOpen = false"
                ) 取消
                el-button(
                    type="primary"
                    @click="dialogOpen = false; updateSubject(subject)"
                    v-if="action === '編輯'"
                ) 送出
                el-button(
                    type="primary"
                    @click="dialogOpen = false; addSubject(subject)"
                    v-if="action === '新增'"
                ) 送出
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SubjectManage extends Vue {
    subjectData: any[] = [];
    dialogOpen: boolean = false;
    subject: {} = {
        name: '' as string,
        price: 0 as number,
        teacher: '' as string,
    };
    action: string = "";

    mounted() {
        this.getSubjectList();
    }

    // 取得科目清單
    private getSubjectList() {
        this.axios
            .get(`/api/subject`)
            .then(response => {
                this.subjectData = [...response.data];
            })
            .catch(error => {
                console.log(error);
            });
    }

    // 取得單筆資料
    private getOneSubjectData(subjectId: number) {
        let index: number = this.subjectData.findIndex((item: any) => {
            return item.id === subjectId;
        });
        this.subject = this.subjectData[index];
    }

    // 新增科目
    private addSubject(data: any) {
        this.subjectData.push(data);
        this.$message({
            type: 'success',
            message: '新增成功'
        })
    }

    // 科目修改
    private updateSubject(data: any) {
        let index: number = this.subjectData.findIndex((item: any) => {
            return item.id === data.id;
        });
        this.$message({
            type: 'success',
            message: '修改成功'
        })
    }

    // 清除資料
    private cleanData() {
        this.subject = {};
    }

    // 刪除科目
    private deleteSubject(subjectId: number) {
        this.$confirm("確定要刪除嗎？", "提示", {
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
                let index: number = this.subjectData.findIndex((item: any) => {
                    return item.id === subjectId;
                });
                this.subjectData.splice(index, 1);
                this.$message({
                    type: "success",
                    message: "刪除成功"
                });
            })
            .catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消刪除"
                });
            });
    }
}
</script>

<style lang="scss" scoped>
.right {
    text-align: right;
}
</style>