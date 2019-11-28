<template lang="pug">
    el-container#login
        el-main
            el-row
                el-col(:span="6" :offset="9")
                    el-card
                        div(slot="header")
                            span 登入
                        div
                            el-input(v-model="account" placeholder="請輸入帳號" clearable)
                                template(slot="prepend"): i.el-icon-user
                            el-input(v-model="password" placeholder="請輸入密碼" clearable show-password)
                                template(slot="prepend"): i.el-icon-lock
                            el-button(type="primary" @click.prevent="checkLogin" round) 送出
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    account: string = "";
    password: string = "";

    mounted() {
        this.checkLogin();
    }

    checkLogin(): void {
        this.axios
            .get("/test")
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
}
</script>

<style lang="scss" scoped>
#login {
    height: 100vh;
}
.el-container {
    background-color: #606266;

    .el-main {
        max-height: 100%;
        // display: flex;
        // justify-content: center;

        .el-row {
            display: flex;
            align-items: center;

            .el-col {
                // display: flex;
                // align-items: center;

                .el-card::v-deep {

                    .el-card__header {
                        text-align: center;
                    }
                    .el-input {
                        margin-bottom: 10px;
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