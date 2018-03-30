<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" @keyup.native="getUsers" placeholder="姓名"></el-input>
				</el-form-item>
				<el-select v-model="filters.grade" v-on:change="getUsers" placeholder="请选择班级">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading">
			<el-table-column prop="id" label="学号" width="160">
			</el-table-column>
			<el-table-column prop="name" label="姓名" width="120">
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="100" :formatter="formatSex">
			</el-table-column>
			<el-table-column prop="age" label="年龄" width="100">
			</el-table-column>
			<el-table-column prop="grade" label="班级" width="130" :formatter="formatGrade">
			</el-table-column>
			<el-table-column prop="phone" label="手机号">
			</el-table-column>

		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:left;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
import { getUserListPage } from "../api";

export default {
  data() {
    return {
      filters: {
        name: "",
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
      users: [],
      total: 0,
      page: 1,
      listLoading: false
    };
  },
  methods: {
    //性别显示转换
    formatSex(row, column) {
      return row.sex == 1 ? "男" : row.sex == 0 ? "女" : "未知";
    },
    // 班级转换
    formatGrade(row, column) {
      return "15软件" + (row.grade + 1) + "班";
    },
    //获取用户列表
    getUsers() {
      let para = {
        page: this.page,
        name: this.filters.name,
        grade: this.filters.grade
      };
      this.listLoading = true;
      getUserListPage(para).then(res => {
        this.total = res.data.total;
        this.users = res.data.users;
        this.listLoading = false;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getUsers();
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style>

</style>