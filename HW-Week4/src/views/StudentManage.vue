<template lang="pug">
    div
        //- 新增按鈕
        el-button.add(
            type="primary"
            @click="isDialogOpen = true; action = '新增';"
            size="medium"
        ): i.el-icon-plus 新增

        //- 學生列表
        template
            el-table(
                :data="studentData"
                :row-key='getRowKeys'
                :expand-row-keys="expands"
                @expand-change="expandSelect"
                stripe
            )
                el-table-column(type="expand")
                    template(v-slot="scope")
                        el-form.my-expand(label-position="left")
                            el-form-item(label="科目")
                                ul(v-for="item in scope.row.subject" :key="item.id")
                                    li {{ `${item.name} ( ${item.price} ) ` }} 
                el-table-column(
                    prop="name"
                    label="學生"
                )
                el-table-column(
                    prop="phone"
                    label="電話"
                )
                el-table-column(
                    prop="totalPrice"
                    label="應繳總金額"
                )
                el-table-column(
                    prop="isPayed"
                    label="繳費狀態"
                )
                    template(v-slot="scope")
                        el-tag(
                            v-if="!scope.row.isPayed"
                            type="warning"
                            effect="plain"
                            size="medium"
                        ) 未繳費
                        el-tag(
                            v-else
                            type="success"
                            effect="plain"
                            size="medium"
                        ) 已繳費
                el-table-column(label="管理")
                    template(v-slot="manage")
                        el-button(
                            type="warning"
                            size="small"
                            circle
                            @click="isDialogOpen = true; action = '編輯'; getOneStudent(manage.row.id);"
                        ): i.el-icon-edit
                        el-button(
                            size="small"
                            type="danger"
                            circle
                            @click="deleteStudent(manage.row.id)"
                        ): i.el-icon-delete
        //- 學生表單
        el-dialog(
            :title="`${action}學生`"
            :visible.sync="isDialogOpen"
            @close="cleanData"
        )
            el-form(label-position="top")
                el-form-item(label="姓名 : ")
                    el-input(v-model="student.name")
                el-form-item(label="電話 : ")
                    el-input(v-model="student.phone")
                el-form-item(label="科目 : ")
                    el-checkbox-group(v-model="student.subject")
                        el-row(:gutter="20")
                            el-col(
                                :span="6"
                                v-for="item in subject"
                                :key="item"
                            )
                                el-checkbox(
                                    :label="item"
                                    border
                                )
                //- el-form-item(label="總金額 : ")
                //-     el-input(
                //-         v-model="student.totalPrice"
                //-         :disabled="true"
                //-     )
                el-form-item(label="繳費狀態 : ")
                    el-select(
                        v-model="student.isPayed"
                        placeholder="請選擇"
                    )
                        el-option(
                            :value="0"
                            label="未繳費"
                        )
                        el-option(
                            :value="1"
                            label="已繳費"
                        )
                .right
                    el-button(
                        type="info"
                        @click='isDialogOpen = false'
                    ) 取消
                    el-button(
                        type="primary"
                        v-if="action === '編輯'"
                        @click="isDialogOpen = false; updateStudent(student)"
                    ) 送出
                    el-button(
                        type="primary"
                        v-if="action === '新增'"
                        @click="isDialogOpen = false; addStudent(student)"
                    ) 送出
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class StudentManage extends Vue {
    action: string = "";
    isDialogOpen: boolean = false;
    studentData: any[] = [];
    student: any = {
        name: "" as string,
        phone: "" as string,
        subject: [] as any[],
        totalPrice: 0 as number,
        isPayed: 0 as number
    };
    subject: any[] = [];
    subjectData: any[] = [];
    expands: any[] = [];

    mounted() {
        this.getStudentList();
        this.getSubjectList();
    }

    // 取得學生清單
    private getStudentList() {
        this.axios
            .get("/api/student")
            .then(response => {
                this.studentData = [...response.data];

                // 計算總金額
                response.data.forEach((items: any) => {
                    let price: number = 0;
                    items.subject.forEach((item: any) => {
                        price += item.price;
                    });
                    items.totalPrice = price;
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // 取得單筆學生資料
    private getOneStudent(studentId: number) {
        let index: number = this.studentData.findIndex((item: any) => {
            return item.id === studentId;
        });
        let ownSubject: any[] = [];
        this.studentData[index].subject.forEach((item: any) => {
            ownSubject.push(item.name);
        });
        this.student = {};
        this.student = Object.assign({}, this.studentData[index]);
        this.student["subject"] = [...ownSubject];
    }

    // 取得科目清單
    private getSubjectList() {
        this.axios
            .get("/api/subject")
            .then(response => {
                this.subjectData = [...response.data];
                response.data.forEach((item: any) => {
                    this.subject.push(item.name);
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // 新增學生
    private addStudent(data: any) {
        console.log(this.student);
        let ownSubject: any[] = [];
        this.subjectData.forEach((items: any) => {
            data.subject.forEach((item: any) => {
                if (item === items.name) {
                    ownSubject.push(items);
                }
            });
        });
        ownSubject.forEach((item: any) => {
            data.totalPrice += item.price;
        });
        data.subject = ownSubject;
        this.studentData.push(data);
    }

    // 學生資料修改
    private updateStudent(data: any) {
        let index: number = this.studentData.findIndex((item: any)  => {
            return item.id === data.id;
        });
        let ownSubject: any[] = [];
        this.subjectData.forEach((items: any) => {
            data.subject.forEach((item: any) => {
                if (item === items.name) {
                    ownSubject.push(items);
                }
            });
        });
        console.log(ownSubject);
        data.totalPrice = 0;
        ownSubject.forEach((item: any) => {
            data.totalPrice += item.price;
        });
        console.log(data.totalPrice);
        data.subject = ownSubject;
        this.$set(this.studentData, index, data);
    }

    // 刪除學生
    private deleteStudent(studentId: number) {
        this.$confirm("確定要刪除嗎？", "提示", {
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            type: "error"
        })
            .then(() => {
                let index: number = this.studentData.findIndex((item: any) => {
                    return item.id === studentId;
                });
                this.studentData.splice(index, 1);
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

    // 清除資料
    private cleanData() {
        this.student = {
            name: "",
            phone: "",
            subject: [],
            totalPrice: 0
        };
    }

    // 取得各學生資料的id
    private getRowKeys(row: any) {
        return row.id;
    }

    // 選擇打開折疊的學生資料
    private expandSelect(row: any, expandedRows: any) {
        if (expandedRows.length) {
            this.expands = [];
            if (row) {
                this.expands.push(row.id);
                return;
            }
        }
        this.expands = [];
    }
}
</script>

<style lang="scss" scoped>
.my-expand {
    .el-form-item /deep/ {
        label {
            color: #999;
        }
        ul {
            width: 70%;
            margin: 0;
            li {
                list-style: none;
            }
        }
    }
}

.el-table-column {
    display: block;
}

.right {
    text-align: right;
}

.el-col {
    margin-bottom: 10px;
    widows: 100%;
    .el-checkbox {
        width: 100%;
    }
}

.subject {
    line-height: 40px;
    color: #606266;
}
.add {
    margin-bottom: 20px;
}
</style>