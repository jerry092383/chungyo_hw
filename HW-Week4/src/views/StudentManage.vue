<template lang="pug">
    div
        template
            el-table(
                :data="studentData"
                stripe
            )
                el-table-column(
                    prop="name"
                    label="學生"
                )
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class StudentManage extends Vue {
    studentData: any[] = [];

    mounted() {
        this.getStudentList();   
    }

    getStudentList() {
        this.axios
            .get('/api/student')
            .then(response => {
                this.studentData = response.data;
            })
            .catch(error => {
                console.log(error);
            });
    }
}
</script>

<style lang="scss" scoped>
</style>