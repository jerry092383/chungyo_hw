<template lang="pug">
    .container-fluid
        .row
            //- 側邊欄
            .col-12.col-md-3.col-lg-2.my-5.py-0
                .list-group.shadow
                    #dashboard.accordion
                        mixin nav-router(myRouter, routerName, className)
                            router-link.list-group-item.text-white(
                                to=myRouter
                                :class=`{'bg-cy': checkRouter('${myRouter}'), 'bg-cy-deep': !checkRouter('${myRouter}')}`
                            )
                                i.fa(class=className aria-hidden="true")!= routerName
                        //- 最新消息
                        +nav-router('/backEnd', '&nbsp;所有消息', 'fa-newspaper-o', '')

                        //- 電影
                        a.list-group-item.dropdown-toggle.text-white.bg-cy-deep(
                            href="#movies"
                            data-toggle="collapse"
                            role="button"
                            aria-expanded="false"
                            aria-controls="movies"
                        )
                            i.fa.fa-video-camera(aria-hidden="true") &nbsp;電影
                        #movies.collapse(
                            aria-labelledby="movies" 
                            data-parent="#dashboard" 
                            :class="{'show': checkRouter('/backEnd/moviesManage', true)}"
                        )
                            mixin ul-li(myRouter, routerName, myClass)
                                li.pl-5(
                                    :class=`{'bg-cy': checkRouter('${myRouter}')}`
                                )
                                    router-link.py-2(
                                        to=myRouter
                                        :class=`{'text-white': checkRouter('${myRouter}')}`
                                    )= routerName
                            ul.list-group.list-group-flush
                                +ul-li('/backEnd/moviesManage', '所有電影')
                                +ul-li('/backEnd/moviesManage/released', '現正上映')
                                +ul-li('/backEnd/moviesManage/comingSoon', '即將上映')

                        //- 餐點
                        +nav-router('/backEnd/mealsManage', '&nbsp;餐點', 'fa-cutlery')

                        //- 折扣
                        +nav-router('/backEnd/discountManage', '&nbsp;折扣', 'fa-percent')

                        //- 報表
                        +nav-router('/backEnd/report', '&nbsp;報表', 'fa-bar-chart')
                
                //- 一件爬蟲按鈕
                button.btn.btn-secondary.mt-3(:disabled="isDisabled" @click.prevent="crawl") 借鑒電影
                    i.fa.fa-hand-rock-o(aria-hidden="true")

            //- 後臺管理主要內容
            .col-12.col-col-md-9.col-lg-10
                router-view
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BackEnd extends Vue {
    text: string = "";
    pageName: string = "";
    isDisabled: boolean = false;

    // 執行一鍵爬蟲
    crawl(): void {
        (this.isDisabled = true),
            this.$toasted.info("借鑑電影資料中", {
                theme: "bubble"
            });
        this.axios.get(`${this.$api}/crawl.php`).then(response => {
            this.isDisabled = false;
            this.$toasted.clear();
            this.$toasted.success("借鑑完畢", {
                theme: "bubble",
                duration: 2000
            });
        });
    }

    // 確認路由
    checkRouter(router: string, show: boolean = false) {
        if (show) {
            let result: boolean =
                this.$route.path.indexOf(`${router}`) >= 0 ? true : false;
            return result;
        }
        let result: boolean = this.$route.path == router ? true : false;
        return result;
    }
}
</script>

<style lang="scss" scoped>
ul {
    li {
        list-style: none;
        a {
            display: block;
        }
        a:hover {
            text-decoration: none;
            color: #eee;
            background-color: #becb01 !important;
        }
        a:active {
            color: #eee;
        }
    }
    li:hover {
        background-color: #becb01;
    }
}

.uk-nav-sub {
    li {
        a {
            font-size: 1.5em;
        }
    }
}

.list-group-item {
    text-decoration: none;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}
</style>