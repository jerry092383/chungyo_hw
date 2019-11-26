<template lang="pug">
  div
      a.goTop(href="#" @click.prevent="goTop" v-show="isShowGoTop")
        span ▲
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import $ from "jquery";

@Component
export default class GoTop extends Vue {
    // Data
    isShowGoTop: boolean = false;

    mounted() {
        this.initGoTop();
    }

    // 回到最上面
    goTop(): void {
        $("html, body").animate({ scrollTop: 0 as number }, 900);
    }

    // 判斷是否滾動超過 80px
    initGoTop(): void {
        let _this = this;
        $(document).bind("scroll", function() {
            const scroll: any = $(document).scrollTop();
            if (scroll > 80) {
                _this.isShowGoTop = true;
            } else {
                _this.isShowGoTop = false;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
.goTop {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 50%;
    background-color: black;
    // background-color: #00cc99;
    opacity: 0.5;
    color: white;
    text-decoration: none;
    position: fixed;
    right: 50px;
    bottom: 50px;
}
.goTop:hover {
    opacity: 1;
}
</style>
