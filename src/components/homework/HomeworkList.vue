<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.title" @keyup.native="getHomework" placeholder="作业名称"></el-input>
        </el-form-item>
        <el-select v-model="filters.grade" v-on:change="getHomework" placeholder="请选择班级">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="homework" highlight-current-row v-loading="listLoading">
      <el-table-column prop="title" label="作业标题" width="120">
      </el-table-column>
      <el-table-column prop="content" label="作业内容" min-width="200">
      </el-table-column>
      <el-table-column prop="grade" label="班级" width="130" :formatter="formatGrade">
      </el-table-column>
      <el-table-column prop="date" label="发布时间" width="100">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:left;">
      </el-pagination>
    </el-col>
    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="作业标题" prop="title">
          <el-input v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="作业内容" prop="content">
          <el-input type="textarea" v-model="editForm.content" autosize resize="none"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="editFormVisible = false">取消</el-button>
          <el-button type="primary" @click.native="editHomeworkSubmit" :loading="editLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </section>
</template>

<script>
import { getHomeworkListPage, editHomework, removeHomework } from "../../api"
export default {
  data() {
    return {
      filters: {
        title: "",
        grade: ""
      },
      options: [
        {
          value: null,
          label: "全部"
        },
        {
          value: "0",
          label: "15软件1班"
        },
        {
          value: "1",
          label: "15软件2班"
        },
        {
          value: "2",
          label: "15软件3班"
        },
        {
          value: "3",
          label: "15软件4班"
        },
        {
          value: "4",
          label: "15软件5班"
        },
        {
          value: "5",
          label: "15软件6班"
        },
        {
          value: "6",
          label: "15软件7班"
        }
      ],
      homework: [],
      total: 0,
      page: 1,
      listLoading: false,
      editFormVisible: false, //编辑界面是否显示
      editLoading: false,
      editFormRules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      },
      //编辑界面数据
      editForm: {
        id: 0,
        title: "",
        content: ""
      }
    }
  },
  methods: {
    // 班级转换
    formatGrade(row, column) {
      return "15软件" + (row.grade + 1) + "班"
    },
    //获取作业列表
    getHomework() {
      let para = {
        page: this.page,
        title: this.filters.title,
        grade: this.filters.grade
      }
      this.listLoading = true
      getHomeworkListPage(para).then(res => {
        this.total = res.data.total
        console.log(res.data)
        this.homework = res.data.homework
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getHomework()
    },
    handleEdit(index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    //编辑作业内容
    editHomeworkSubmit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.editLoading = true
            let para = Object.assign({}, this.editForm)
            editHomework(para).then(res => {
              this.editLoading = false
              this.$message({
                message: "提交成功",
                type: "success"
              })
              this.$refs["editForm"].resetFields()
              this.editFormVisible = false
              this.getHomework()
            })
          })
        }
      })
    },
    //删除作业内容
    handleDel: function(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true
          let para = { id: row.id }
          removeHomework(para).then(res => {
            this.listLoading = false
            this.$message({
              message: "删除成功",
              type: "success"
            })
            this.getHomework()
          })
        })
        .catch(() => {})
    }
  },
  mounted() {
    this.getHomework()
  }
}
</script>

<style scoped lang="less">
.el-form-item.is-success {
  /deep/ .el-input__inner, /deep/ .el-textarea__inner {
    border-color: #dcdfe6;
  }
}
</style>