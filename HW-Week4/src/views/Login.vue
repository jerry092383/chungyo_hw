<template lang="pug">
    el-container#login
        el-main
            h1 補習班繳費管理系統
            el-row
                el-col(
                    :span="6"
                    :offset="9"
                )
                    el-card
                        div(slot="header")
                            span 登入
                        el-form(
                            :model="ruleForm"
                            :rules="rules" ref="ruleForm"
                            @keyup.enter.native="checkLogin('ruleForm')"
                            status-icon
                        )
                            el-form-item(prop="account")
                                el-input(
                                    v-model="ruleForm.account"
                                    placeholder="請輸入帳號" clearable
                                )
                                    template(slot="prepend"): i.el-icon-user
                            el-form-item(prop="password")
                                el-input(
                                    v-model="ruleForm.password"
                                    placeholder="請輸入密碼"
                                    clearable
                                    show-password
                                )
                                    template(slot="prepend"): i.el-icon-lock
                            el-button(
                                type="primary"
                                @click.prevent="checkLogin('ruleForm')"
                                round
                            ) 送出
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import { Getter, Action, Mutation, namespace } from "vuex-class";

@Component
export default class Login extends Vue {
    $notify: any;
    ruleForm: any = {
        account: "" as string,
        password: "" as string,
        name: "" as string
    };
    rules: object = {
        account: [{ required: true, message: "請輸入帳號", trigger: "blur" }] as any[],
        password: [{ required: true, message: "請輸入密碼", trigger: "blur" }] as any[]
    };

    @Mutation("SET_MEMBER_STATUS", { namespace: "myModule" })
    SET_MEMBER_STATUS: any;
    @Getter("getMemberData", { namespace: "myModule" }) memberData: any;

    private checkLogin(formName: string): void {
        (this.$refs[formName] as any).validate((valid: boolean) => {
            if (valid) {
                this.axios
                    .post("/api/login", {
                        account: this.ruleForm.account,
                        password: this.ruleForm.password
                    })
                    .then(response => {
                        // console.log(response.data);
                        if (response.data.status === "success") {
                            let data: object = {
                                name: response.data.data.name,
                                account: response.data.data.account
                            };
                            this.SET_MEMBER_STATUS(data);
                            this.$router.push("/");
                            this.$notify.success({
                                title: "登入",
                                message: response.data.msg,
                                offset: 60,
                                duration: 2500
                            });
                            return;
                        }
                        this.$notify.error({
                            title: "登入",
                            message: response.data.msg,
                            offset: 60,
                            duration: 2500
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.el-container {
    height: 100vh;
    width: 100vw;
    background-color: #606266;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-main {
        max-height: 100%;
        h1 {
            text-align: center;
            font-size: 3.5em;
            background: linear-gradient(to right, #ffc813, #da1b60);
            background-clip: text;
            color: transparent;
        }
        .el-row {
            .el-col {
                padding-bottom: 5%;
                .el-card::v-deep {
                    margin-top: 5%;
                    .el-card__header {
                        text-align: center;
                    }
                    .el-button {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>