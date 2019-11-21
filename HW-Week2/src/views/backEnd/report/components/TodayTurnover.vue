<template>
  <div>
    <canvas id="todayTurnover"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';

export default {
  data() {
    return {
      data: {
        labels: ['營業額'],
        datasets: [
          {
            label: '今日營業額',
            data: [20],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ]
          },
          {
            label: '昨日營業額',
            data: [18],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)'
            ]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: '單日營業額',
          fontSize: 20
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  },
  mounted() {
    this.getTotalPrice();
  },
  methods: {
    createChart() {
      const _this = this;
      const ctx = document.getElementById('todayTurnover');
      new Chart(ctx, {
        type: 'bar',
        data: _this.data,
        options: _this.options
      });
    },
    getTotalPrice() {
      const _this = this;
      this.axios.get(`${this.$api}/report/turnover`).then((response) => {
        let today = new Date();
        let yesterday = today.getDate() - 1;
        yesterday = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() - 1}`; // 昨天的日期
        today = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`; // 今天的日期

        let todayList = []; // 今天的訂單資料
        let yesterdayList = []; // 昨天的訂單資料

        // 透過 forEach 將今天吉昨天的資料取出來
        response.data.forEach((item, index) => {
          if (item.datetime.indexOf(today) >= 0) {
            todayList.push(item);
          } else if (item.datetime.indexOf(yesterday) >= 0) {
            yesterdayList.push(item);
          }
        });

        let todayTurnover = 0; // 今天總營業額
        let yesterdayTurnover = 0; // 昨天總營業額

        // 透過 forEach 將各營業額做加總
        todayList.forEach((item) => {
            todayTurnover += parseInt(item.total_price);
        });
        yesterdayList.forEach((item) => {
            yesterdayTurnover += parseInt(item.total_price);
        });

        // 將數據放到畫面呈現上
        _this.data.datasets[0].data = [todayTurnover];
        _this.data.datasets[1].data = [yesterdayTurnover];
        
        this.createChart();
      });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>