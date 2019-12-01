<template lang="pug">
    div
        | 科目管理
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SubjectManage extends Vue {
    mounted() {
        this.getSubjectList();
    }

    getSubjectList() {
        this.axios
            .get(`/api/subject`)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error)
            });
    }
}
</script>

<style lang="scss" scoped>
</style>