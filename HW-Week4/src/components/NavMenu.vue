<template lang="pug">
    div
        el-menu(
            :default-active="$route.path"
            :router="true"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        )
            el-menu-item(index="/"): i.el-icon-s-home  首頁
            el-menu-item(index="/subject"): i.el-icon-reading  科目管理
            el-menu-item(index="/student"): i.el-icon-user  學生管理
            el-menu-item(
                index="/account"
                v-if="memberData.account === 'admin'"
            ): i.el-icon-user  帳號管理
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Getter } from 'vuex-class';

@Component
export default class NavMenu extends Vue {
    @Getter('getMemberData', {namespace: 'myModule'}) memberData: any;
}
</script>

<style lang="scss" scoped>
.el-menu::v-deep {
    background-color: #545c64;
    border: none;
}
</style>