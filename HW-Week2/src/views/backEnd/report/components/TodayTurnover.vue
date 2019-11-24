<template lang="pug">
    div
        canvas#todayTurnover
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chart from "chart.js";

@Component
export default class TodayTurnover extends Vue {
    data: any = {
        labels: ["營業額"] as any[],
        datasets: [
            {
                label: "今日營業額" as string,
                data: [20] as any[],
                backgroundColor: ["rgba(255, 99, 132, 0.2)"] as any[],
                borderColor: ["rgba(255, 99, 132, 1)"] as any[]
            },
            {
                label: "昨日營業額" as string,
                data: [18] as any[],
                backgroundColor: ["rgba(54, 162, 235, 0.2)"] as any[],
                borderColor: ["rgba(54, 162, 235, 1)"] as any[]
            }
        ] as any
    };
    options: object = {
        title: {
            display: true as boolean,
            text: "單日營業額" as string,
            fontSize: 20 as number
        } as object,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true as boolean
                    } as object
                }
            ] as any[]
        }
    };

    mounted(): void {
        this.getTotalPrice();
    }
    createChart(): void {
        const _this = this;
        const ctx = document.getElementById("todayTurnover");
        new Chart(ctx, {
            type: "bar",
            data: _this.data,
            options: _this.options
        });
    }
    getTotalPrice(): void {
        const _this = this;
        this.axios.get(`${this.$api}/report/turnover`).then(response => {
            let today: Date | string = new Date();
            let yesterday: number | string = today.getDate() - 1;
            yesterday = `${today.getFullYear()}-${today.getMonth() +
                1}-${today.getDate() - 1}`; // 昨天的日期
            today = `${today.getFullYear()}-${today.getMonth() +
                1}-${today.getDate()}`; // 今天的日期

            let todayList:any[] = []; // 今天的訂單資料
            let yesterdayList: any[] = []; // 昨天的訂單資料

            // 透過 forEach 將今天吉昨天的資料取出來
            response.data.forEach((item: any) => {
                if (item.datetime.indexOf(today) >= 0) {
                    todayList.push(item);
                } else if (item.datetime.indexOf(yesterday) >= 0) {
                    yesterdayList.push(item);
                }
            });

            let todayTurnover: number = 0; // 今天總營業額
            let yesterdayTurnover: number = 0; // 昨天總營業額

            // 透過 forEach 將各營業額做加總
            todayList.forEach(item => {
                todayTurnover += parseInt(item.total_price);
            });
            yesterdayList.forEach(item => {
                yesterdayTurnover += parseInt(item.total_price);
            });

            // 將數據放到畫面呈現上
            _this.data.datasets[0].data = [todayTurnover];
            _this.data.datasets[1].data = [yesterdayTurnover];

            this.createChart();
        });
    }
}
</script>

<style lang="scss" scoped>
</style>