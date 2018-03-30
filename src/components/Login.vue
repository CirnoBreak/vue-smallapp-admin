<template>
  <div class="login-page">
    <el-form label-position="left" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm container">
      <h2 class="title">学习平台管理系统</h2>
      <el-form-item prop="account">
        <el-input v-model="ruleForm2.account" placeholder="请输入用户名" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input type="password" placeholder="请输入密码" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">自动登录</el-checkbox>
      <el-form-item class="btn">
        <el-button type="primary" :loading="logining" @click.native.prevent="submitForm">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reqLogin } from "../api";
import { setToken } from '../auth'
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      logining: false,
      ruleForm2: {
        pass: "",
        account: ""
      },
      rules2: {
        account: [{ required: true, validator: checkAccount, trigger: "blur" }],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    submitForm(e) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          let logParams = {
            username: this.ruleForm2.account,
            password: this.ruleForm2.pass
          };

          this.$store
            .dispatch("Login", logParams)
            .then((res) => {
              const { code, user, msg, token } = res
              // console.log(token)
              this.logining = false;
              if (code === 200) {
                this.$message({
                  message: msg,
                  type: "success"
                });
                if (this.checked) {
                  // setToken(token)
                  // this.$store.dispatch("Remember", token)
                  localStorage.setItem('name', user.name)
                } else {
                  sessionStorage.setItem('name', user.name)
                }
                this.$router.push({ path: "/table" });
              } else {
                this.$message({
                  message: msg,
                  type: "error"
                });
              }
            })
            .catch(() => {
              this.logining = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/lgbg.jpg) no-repeat center center;
  background-size: 100% 100%;
  position: fixed;
}
.container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  filter: opacity(0.8);
  -webkit-filter: opacity(0.8);
  border: 1px solid #eaeaea;
  border-radius: 10px;
  // box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 15px 0px;
  }
}
.btn {
  text-align: center;
}
.el-form-item.is-success /deep/ .el-input__inner {
  border-color: #dcdfe6 !important;
}
</style>

