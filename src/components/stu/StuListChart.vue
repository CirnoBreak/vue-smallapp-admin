<template>
  <section class="chart-container" v-loading="listLoading">
    <el-row>
      <el-col :span="12">
        <div id="gradeNum" style="width:100%; height:400px;"></div>
      </el-col>
      <el-col :span="12">
        <div id="gradeSexNum" style="width:100%; height:400px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from "echarts"
import { getStudentList } from "../../api"
export default {
  data() {
    return {
      students: [],
      gradeNum: [],
      maleNum: [],
      femaleNum: [],
      charColumn: null,
      listLoading: true
    }
  },
  mounted() {
    this.getStudent()
    this.drawCharts()
  },
  updated() {
    this.drawCharts()
  },
  methods: {
    getStudent() {
      getStudentList().then(res => {
        console.log(res)
        this.students = res.data.students
        this.getCharts()
        this.listLoading = false
      })
    },
    getCharts() {
      // 把从后台获取到的students分别遍历并赋值
      let gradeList = this.students.map((cur, idx, arr) => arr[idx]["grade"]), //获取所有数据里面的班级编号
        sexList = this.students.map((cur, idx, arr) => arr[idx]) //获取所有单条数据，用于性别遍历
      for (let i = 0; i < 7; i++) {
        let gNum = gradeList.filter(g => g == i.toString()).length, // 获取每个班的人数
          mNum = sexList.filter(e => e.sex == "0" && e.grade == i).length, // 获取每个班的男同学数量
          fNum = sexList.filter(e => e.sex == "1" && e.grade == i).length //获取每个班的女同学数量
        // 储存到data，用于图表展示
        this.gradeNum.push(gNum)
        this.maleNum.push(mNum)
        this.femaleNum.push(fNum)
      }
    },
    // 绘出班级人数图表
    drawGradeNumChart() {
      this.chartColumn = echarts.init(document.getElementById("gradeNum"))
      this.chartColumn.setOption({
        title: { text: "班级人数分布" },
        tooltip: {},
        legend: {
          data: ["人数"]
        },
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
            label: {
              normal: {
                show: true,
                position: "top",
                color: "black"
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
      })
    },
    // 绘出班级性别分布图表
    drawGradeSexNumChart() {
      this.chartColumn = echarts.init(document.getElementById("gradeSexNum"))
      this.chartColumn.setOption({
        title: { text: "班级性别分布" },
        tooltip: {},
         legend: {
          data: ["男", "女"]
        },
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
            name: "男",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                color: "black"
              }
            },
            data: this.maleNum,
            itemStyle: {
              normal: {
                color: "#33ccc6"
              }
            }
          },
          {
            name: "女",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                color: "black"
              }
            },
            data: this.femaleNum
          }
        ]
      })
    },
    drawCharts () {
      this.drawGradeNumChart()
      this.drawGradeSexNumChart()
    }
  }
}
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