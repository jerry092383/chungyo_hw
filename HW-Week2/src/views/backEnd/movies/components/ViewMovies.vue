<template lang="pug">
    .modal.fade.bd-example-modal-xl(
        :id="`viewMovies${id}`"
        tabindex="-1"
        rol="dialog"
        :aria-labelledby="`viewMoview${id}`"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
    )
        .modal-dialog.modal-dialog-centered.modal-xl(role="document")
            .modal-content
                .modal-header
                    .modal-title
                        h4 {{ movie.name }}
                    button.close(
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
                    )
                        span(aria-hidden="true") &times;
                .modal-body
                    .row.mb-3
                        .col-12.col-md-4
                            img(:src="movie.poster")
                        .col-12.col-md-8
                            p.h3 片名 : {{ movie.name }}
                            p.h5 主演 : {{ movie.actor }}
                            p.h5 類型 : {{ movie.genre }}
                            p.h5 分級 : {{ movie.rating }}
                            p.h5 片長 : {{ movie.run_time }}
                            p.h5 上映日期 : {{ movie.play_date }}
                            p.h5 描述 : {{ movie.info }}
                        iframe(
                            width="100%"
                            height="600"
                            :src="movie.trailer"
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        )
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import $ from "jquery";

@Component
export default class ViewMovies extends Vue {
    @Prop([Array, Object])
    movie!: any[] | object;

    @Prop(Number)
    id!: number;
}
</script>

<style lang="scss" scoped>
</style>