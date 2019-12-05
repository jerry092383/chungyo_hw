<template lang="pug">
div#navbar
    div#pageName
        el-breadcrumb(separator-class="el-icon-arrow-right")
            el-breadcrumb-item(:to="{path: '/'}") 首頁
            el-breadcrumb-item(v-if="!($route.name === '首頁')") {{ $route.name }}
    ul
        li
            el-dropdown(
                @command="clickDialogOpen"
                trigger="click"
            )
                span: i.el-icon-user-solid {{ memberData.name }}
                    i.el-icon-arrow-down.el-icon--right
                el-dropdown-menu(slot="dropdown")
                    el-dropdown-item(:command="{status: true, funcName: 'ownData'}")
                        i.el-icon-info  個人資料
                    el-dropdown-item(:command="{status: true, funcName: 'midifyPassoword'}")
                        i.el-icon-lock  修改密碼
        li
            a(
                href=""
                @click.prevent="logout"
            ) 登出

    //- 個人資料
    el-dialog(
        title="個人資料"
        :visible.sync="ownDataOpen"
    )
        p: span 名稱 : {{ memberData.name }}
        p: span 帳號 : {{ memberData.account }}

    //- 修改密碼表單
    el-dialog(
        title="修改密碼"
        :visible.sync="modifyPasswordOpen"
        @close="cleanData"
    )
        el-form(
            :model="password"
            :rules="rules"
            ref="password"
            status-icon
        )
            el-form-item(
                label="舊密碼 : "
                prop="old"
            )
                el-input(
                    show-password
                    v-model="password.old"
                    type="password"
                )
            el-form-item(
                label="新密碼 : "
                prop="new"
            )
                el-input(
                    show-password
                    v-model="password.new"
                    type="password"
                )
            el-form-item(
                label="再次確認密碼 : "
                prop="reNew"
            )
                el-input(
                    show-password
                    v-model="password.reNew"
                    type="password"
                )
            .right
                el-button(
                    type="info"
                    @click="modifyPasswordOpen = false"
                ) 取消
                el-button(
                    type="primary"
                    @click="updatePassword('password')"
                ) 送出
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import myModule from "../store/module";

@Component
export default class Navbar extends Vue {
    member: any = {};
    ownDataOpen: boolean = false;
    modifyPasswordOpen: boolean = false;
    password: object = {
        old: "" as string,
        new: "" as string,
        reNew: "" as string
    };
    rules: object = {
        old: [{ required: true, message: "請輸入舊密碼", trigger: "blur" }] as any[],
        new: [{ required: true, message: "請輸入新密碼", trigger: "blur" }] as any[],
        reNew: [
            { required: true, message: "請輸入再次確認密碼", trigger: "blur" }
        ] as any
    };
    @State("member", { namespace: "myModule" }) memberData: any;
    @Mutation("LOGOUT_MEMBER", { namespace: "myModule" }) LOGOUT_MEMBER: any;

    // 登出
    logout() {
        this.LOGOUT_MEMBER();
        sessionStorage.removeItem("member");
        this.$notify.success({
            title: "已登出",
            message: "",
            offset: 60,
            duration: 2500
        });
        this.$router.push("/login");
    }

    // 開啟對話框
    clickDialogOpen(command: any) {
        if (command.funcName === "ownData") {
            this.ownDataOpen = command.status;
            return;
        }
        this.modifyPasswordOpen = command.status;
    }

    // 修改密碼
    updatePassword(data: string) {
        (this.$refs[data] as any).validate((valid: boolean) => {
            if (valid) {
                this.axios
                    .post("/api/password", { password: this.password, account: this.memberData.account })
                    .then(response => {
                        this.modifyPasswordOpen = false;
                        if (response.data.status === "success") {
                            this.$message({
                                type: "success",
                                message: response.data.msg
                            });
                            return;
                        }
                        this.$message({
                            type: "error",
                            message: response.data.msg
                        });
                        return;
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }

    // 清除資料
    cleanData() {
        this.password = {};
    }
}
</script>

<style lang="scss" scoped>
#navbar {
    display: flex;
    justify-content: space-between;

    #pageName {
        display: flex;
        align-self: center;
        .el-breadcrumb__item::v-deep {
            .el-breadcrumb-item:last-child,
            .el-breadcrumb__inner {
                color: #fff;
            }
        }
    }
    ul {
        list-style: none;
        text-align: right;
        li {
            display: inline;
            margin-left: 15px;
            a {
                color: #fff;
                text-decoration: none;
            }
            a:hover {
                color: orange;
            }
        }
    }
}

.el-dropdown::v-deep {
    .el-dropdown-arrow-down {
        font-size: 50px;
    }
    span.el-dropdown-selfdefine {
        font-size: 19.2px;
        color: #fff;
    }
}
.right {
    text-align: right;
}
</style>