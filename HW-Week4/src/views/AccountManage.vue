<template lang="pug">
    div
        template
            el-table(
                :data="accountData"
                stripe
            )
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
                            @change="setMemberIsOpen"
                            active-text="啟用"
                            inactive-text="停用"
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
export default class AccountManage extends Vue {
    accountData: any[] = [];

    mounted() {
        this.getAccountList();
    }

    // 取得管理帳號清單
    getAccountList() {
        this.axios
            .get("/api/account")
            .then(response => {
                this.accountData = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }

    setMemberIsOpen() {}
}
</script>

<style lang="scss" scoped>
</style>