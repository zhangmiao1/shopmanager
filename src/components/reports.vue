<template>
  <el-card class="card">
    <div id="main" style="width: 600px;height:400px;"></div>
  </el-card>
</template>

<script>
import echarts from "echarts";

export default {
  methods: {
    async getEchart() {
      const res = await this.$http.get(`reports/type/1`);
      //   console.log(res);
      const option2 = res.data.data;
      //   console.log(option2)
      const myChart = echarts.init(document.getElementById("main"));
      const option1 = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },

        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
      const option = { ...option1, ...option2 };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.getEchart();
  }
};

// 指定图表的配置项和数据
</script>

<style>
.card {
  height: 100%;
}
</style>
