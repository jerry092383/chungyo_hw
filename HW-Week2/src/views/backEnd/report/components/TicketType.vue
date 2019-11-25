<template lang="pug">
    div
        canvas#ticketType
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Chart from "chart.js";

@Component
export default class TicketType extends Vue {
    data: any = {
        labels: ["票種"] as any[],
        datasets: [] as any[]
    };
    options: any = {
        title: {
            display: true as boolean,
            text: "票種" as string,
            fontSize: 20 as number
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true as boolean
                    } as object
                }
            ] as any[]
        } as object
    };

    mounted(): void {
        this.getTicketType();
    }

    // 渲染 chart.js 圖表
    createChart(): void {
        const _this = this;
        const ctx = document.getElementById("ticketType");
        new Chart(ctx, {
            type: "bar",
            data: _this.data,
            options: _this.options
        });
    }
    // 取的票種
    getTicketType(): void {
        const _this = this;
        this.axios.get(`${this.$api}/report/ticketType`).then(response => {
            let ticketType: any[] = [];
            response.data.forEach((res: any[string | number]) => {
                ticketType.push(res["name"]);
            });
            _this.getTicketData(ticketType);
        });
    }

    // 取得所有票的資料
    getTicketData(ticketType: any[]): void {
        const _this = this;
        this.axios
            .get(`${this.$api}/report/ticketType/ticketData`)
            .then((response: any) => {
                let general: number = 0; // 全票
                let offer: number = 0; // 優待票
                let student: number = 0; // 學生票
                let old: number = 0; // 敬老票

                // 統計各票種數量
                response.data.forEach((item: any) => {
                    let num = JSON.parse(item.tickets_num);
                    general += num.全票;
                    offer += num.優待票;
                    student += num.學生票;
                    old += num.敬老票;
                });
                let ticketData: any[] = [general, offer, student, old];

                // 個票種背景顏色
                let backgroundColor: any[] = [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(75, 192, 192, 0.2)"
                ];

                // 各票種邊框顏色
                let borderColor: any[] = [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(75, 192, 192, 1)"
                ];

                // 將各票種資料放進 chart.js 對應資料欄位
                for (let i = 0; i < 4; i++) {
                    _this.data.datasets.push({
                        label: ticketType[i],
                        data: [ticketData[i]],
                        backgroundColor: [backgroundColor[i]],
                        borderColor: [borderColor[i]]
                    });
                }
                _this.createChart();
            });
    }
}
</script>

<style lang="scss" scoped>
</style>