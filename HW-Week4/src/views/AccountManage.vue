<template lang="pug">
    div
        //- 新增按鈕
        el-button.add(
            type="primary"
            @click="isDialogOpen = true"
            size="medium"
        ): i.el-icon-plus 新增

        //- 管理員帳號清單
        template
            el-table(
                :data="accountData"
                stripe
            )
                el-table-column(width="20px")
                el-table-column(
                    prop="name"
                    label="名稱"
                )
                el-table-column(
                    prop="account"
                    label="帳號"
                )
                el-table-column(label="開 / 關")
                    template(v-slot="scope")
                        el-switch(
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            v-model="scope.row.isOpen"
                            active-text="啟用"
                            inactive-text="停用"
                        )
                el-table-column(label="管理")
                    template(v-slot="scope")
                        el-button(
                            type="danger"
                            v-if="scope.row.account !== 'admin'"
                            circle
                            size="small"
                            @click="deleteMember(scope.row.id)"
                        ): i.el-icon-delete

        //- 新增會員表單
        el-dialog(
            title="新增管理員"
            :visible.sync="isDialogOpen"
        )
            el-form
                el-form-item(label="名稱 : ")
                    el-input(v-model="member.name")
                el-form-item(label="帳號 : ")
                    el-input(v-model="member.account")
                el-form-item(label="密碼 : ")
                    el-input(v-model="member.password")
                el-form-item(label="是否啟用 : ")
                    el-switch(
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        v-model="member.isOpen"
                        active-text="啟用"
                        inactive-text="停用"
                    )
                .right
                    el-button(
                        type="info"
                        @click="isDialogOpen = false"
                    ) 取消
                    el-button(
                        type="primary"
                        @click="isDialogOpen = false; addMember(member)"
                    ) 送出
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class AccountManage extends Vue {
    accountData: any[] = [];
    isDialogOpen: boolean = false;
    newPassword: string = "";
    reNewPassword: string = "";
    member: object = {
        name: "" as string,
        account: "" as string,
        password: "" as string,
        isOpen: false as boolean
    };

    mounted() {
        this.getAccountList();
    }

    // 取得管理帳號清單
    private getAccountList() {
        this.axios
            .get("/api/account")
            .then(response => {
                this.accountData = [...response.data];
            })
            .catch(error => {
                console.log(error);
            });
    }

    // 新增管理員帳號
    private addMember(data: any) {
        this.accountData.push(data);
    }

    // 刪除管理員帳號
    private deleteMember(memberId: number) {
        this.$confirm("確定要刪除嗎？", "提示", {
            confirmButtonText: "確定",
            cancelButtonText: "取消",
            type: 'warning'
        })
            .then(() => {
                let index: number = this.accountData.findIndex(item => {
                    return item.id === memberId;
                });
                this.accountData.splice(index, 1);
                this.$message({
                    type: 'success',
                    message: '刪除成功'
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消刪除'
                })
            });
    }
}
</script>

<style lang="scss" scoped>
.right {
    text-align: right;
}
</style>