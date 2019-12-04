<template lang="pug">
    div
        el-calendar(
            v-model="time"
            :first-day-of-week="7"
        )
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
    time: any = new Date();
}
</script>

<style lang="scss" scoped>
</style>
