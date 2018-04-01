<template>
  <section>
    <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
      <el-form-item label="作业标题" prop="title">
        <el-input v-model="addForm.title" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="作业内容" prop="content">
        <el-input type="textarea" v-model="addForm.content" autosize resize="none"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="grade">
        <el-select v-model="grade" placeholder="请选择班级">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
        <el-button @click.native="addFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      addLoading: false,
      addFormRules: {
        title: [{ required: true, message: "作业标题不能为空", trigger: "blur" }],
        content: [{ required: true, message: "作业内容不能为空", trigger: "blur" }],
        grade: [{ required: true, message: "班级要选择", trigger: "blur" }]
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
      grade: "",
      addForm: {
        title: "",
        content: "",
        grade: "",
      }
    };
  }
};
</script>

<style scoped>

</style>