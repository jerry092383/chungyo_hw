<template lang="pug">
    div#navbar
        div#pageName
            el-breadcrumb(separator-class="el-icon-arrow-right")
                el-breadcrumb-item(:to="{path: '/'}") 首頁
                el-breadcrumb-item(v-if="!($route.name === '首頁')") {{ $route.name }}
        ul
            li: i.el-icon-user-solid {{ memberData.name }}
            li: a(
                href=""
                @click.prevent="logout"
            ) 登出
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import myModule from "../store/module";

@Component
export default class Navbar extends Vue {
    member: any = {};
    $notify: any;
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
</style>