<template lang="pug">
    div
        .row.mt-4
            .col-12.col-md-6
                .card.p-3.shadow
                    TicketType
            .col-12.col-md-6
                .card.p-3.shadow
                    TodayTurnover
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TicketType from "@/views/backEnd/report/components/TicketType.vue";
import TodayTurnover from "@/views/backEnd/report/components/TodayTurnover.vue";

@Component({
    components: {
        TicketType,
        TodayTurnover
    }
})
export default class Report extends Vue {}
</script>