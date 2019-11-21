<template>
  <div>
    <canvas id="ticketType"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  data() {
    return {
      data: {
        labels: ['票種'],
        datasets: []
      },
      options: {
        title: {
          display: true,
          text: '票種',
          fontSize: 20,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
    }
  },
  mounted() {
    this.getTicketType();
  },
  methods: {
    // 渲染 chart.js 圖表
    createChart() {
      const _this = this;
      const ctx = document.getElementById('ticketType');
      new Chart(ctx, {
        type: 'bar',
        data: _this.data,
        options: _this.options
      });
    },
    // 取的票種
    getTicketType() {
      const _this = this;
      this.axios.get(`${this.$api}/report/ticketType`).then((response) => {
        let ticketType = [];
        response.data.forEach((res) => {
          ticketType.push(res['name']);
        });
        _this.getTicketData(ticketType);
      });
    },
    getTicketData(ticketType) {
      const _this = this;
      this.axios.get(`${this.$api}/report/ticketType/ticketData`).then((response) => {
        let general = 0; // 全票
        let offer = 0; // 優待票
        let student = 0; // 學生票
        let old = 0; // 敬老票

        // 統計各票種數量
        response.data.forEach(item => {
          let num = JSON.parse(item.tickets_num);
          general += num.全票;
          offer += num.優待票;
          student += num.學生票;
          old += num.敬老票;
        });
        let ticketData = [general, offer, student, old];

        // 個票種背景顏色
        let backgroundColor = [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ];

        // 各票種邊框顏色
        let borderColor = [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
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
  },
}
</script>

<style lang="scss" scoped>
</style>