<template lang="pug">
    el-container
        el-container

            //- 側邊攔
            el-aside
                NavMenu

            //- 主要內容區
            el-container

                //- 導覽列
                el-header
                    Navbar

                //- 頁面切換區
                el-main
                    router-view
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Navbar from "@/components/Navbar.vue";
import NavMenu from "@/components/NavMenu.vue";

@Component({
    components: {
        Navbar,
        NavMenu
    }
})
export default class Main extends Vue {
    member: any = {};

    mounted(): void {
        this.member = JSON.parse(localStorage.getItem("member") || "");
    }
}
</script>

<style lang="scss" scoped>
.el-container {
    width: 100%;
    height: 100vh;
    .el-aside {
        height: 100%;
        background-color: #545c64;
    }
    .el-header {
        background-color: #999;
        color: #fff;
        font-size: 1.2em;
    }
}
</style>