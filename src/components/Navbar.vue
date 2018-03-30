<template>
  <el-col :span="24" class="header">
    <el-col :span="6" class="title">{{sysName}}</el-col>
    <el-col :span="5" class="userinfo">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link userinfo-inner">
          <img src="../assets/default.jpg" alt=""> {{sysUserName}}
          <i class="el-icon-caret-bottom"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的消息</el-dropdown-item>
          <el-dropdown-item>设置</el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>

  </el-col>
</template>

<script>
import { getToken, removeToken } from "../auth";
export default {
  data() {
    return {
      sysName: "学习平台管理系统",
      sysUserName: "",
      down: true
    };
  },
  methods: {
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          // removeToken()
          sessionStorage.removeItem("name");
          localStorage.removeItem("name");
          _this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  mounted() {
    let name = localStorage.getItem("name") || sessionStorage.getItem("name");
    if (name) {
      this.sysUserName = name || "";
    }
  }
};
</script>

<style scoped lang="less">
.title {
  height: 60px;
  font-size: 22px;
  padding-left: 10px;
  // text-align: center;
  // border-color: rgba(238, 241, 146, 0.3);
  // border-right-style: solid;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
}
.header {
  height: 60px;
  line-height: 60px;
  background: #33ccc6;
  color: #fff;
  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      text-align: center;
      img {
        outline: none;
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin: 10px 10px 10px 10px;
        float: left;
      }
    }
  }

  .logo-width {
    width: 230px;
  }
  .logo-collapse-width {
    width: 60px;
  }
  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
  }
}
</style>