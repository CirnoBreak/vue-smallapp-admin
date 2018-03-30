<template>
  <section class="chart-container" v-loading="listLoading">
    <el-row>
      <el-col :span="12">
        <div id="chartColumn" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>

  </section>
</template>

<script>
import echarts from "echarts";
import { getUserList } from "../api";
export default {
  data() {
    return {
      users: [],
      gradeNum: [],
      charColumn: null,
      listLoading: true
    };
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      getUserList().then(res => {
        this.users = res.data.users;
        this.getCharts();
        this.listLoading = false;
        this.drawColumnChart();
      });
    },
    getCharts() {
      let gradeList = this.users.map((cur, idx, arr) => arr[idx]["grade"]);
      for (let i = 0; i < 7; i++) {
        let gNum = gradeList.filter(g => g == i.toString()).length;
        this.gradeNum.push(gNum);
      }
    },
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        title: { text: "班级人数分布" },
        tooltip: {},
        xAxis: {
          data: [
            "15软件1班",
            "15软件2班",
            "15软件3班",
            "15软件4班",
            "15软件5班",
            "15软件6班",
            "15软件7班"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "人数",
            type: "bar",
            type: "bar",
            label: {
              normal: {
                show: true, 
                position: "top",
                color: 'black'
              }
            },
            data: this.gradeNum,
            itemStyle: {
              normal: {
                color: "#33ccc6"
              }
            }
          }
        ]
      });
    }
  }
};
</script>

<style scoped lang="less">
.chart-container {
  width: 100%;
  float: left;
}

.el-col {
  padding: 30px 20px;
}
</style>