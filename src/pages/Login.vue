<template>
  <div id="box">
    <div class="login_box">
      <p>Chicken管理系统</p>
      <el-input  v-focus prefix-icon="el-icon-user-solid" placeholder="请输入内容" v-model="username" clearable></el-input>
      <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="pwd" show-password @keydown.enter.native="clickSend"></el-input>
      <p class="error-p">{{errormsg}}</p>
      <el-row>
        <el-button type="primary" class="btn" @click="clicklogin">登录</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/apis";
// @/   表示直接指向src根目录    @/assets/imgs

export default {
  data() {
    return {
      username: "", //账号
      pwd: "", //密码
      errormsg: "", //错误提示
    };
  },
  methods: {
    //回车登录
    clickSend(){
        // alert(1)
      login(this.username, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.token = res.data.token; //写入token
          localStorage.role = res.data.role; //写入用户组
          localStorage.username = this.username; //存入用户名
          localStorage.uid = res.data.id; //存入id
          localStorage.upwd = this.pwd; //存入密码
          this.$router.push("/main/index"); //改变hash地址
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
        } else this.errormsg = res.data.msg;
      });
    },

    //点击登录
    clicklogin() {
      //   console.log(this.$router); //指向main.js中注入的router对象实例
      login(this.username, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.token = res.data.token; //写入token
          localStorage.role = res.data.role; //写入用户组
          localStorage.username = this.username; //存入用户名
          localStorage.uid = res.data.id; //存入id
          localStorage.upwd = this.pwd; //存入密码
          this.$router.push("/main/index"); //改变hash地址
          this.$message({
            message: "用户登录成功!",
            type: "success",
          });
        } else this.errormsg = res.data.msg;
      });
    },
  },
  directives: {
    focus: {
        inserted: function (el) {
        el.querySelector('input').focus()
        }
    }
},
  
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
#box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  .login_box {
    width: 300px;
    height: 250px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    p {
      color: #fff;
      font-size: 20px;
      font-weight: bold;
    }
    .btn {
      width: 300px;
      line-height: 40px;
    }
    .error-p {
      color: red;
      font-size: 12px;
      position: absolute;
      bottom: 58px;
      left: 0;
    }
  }
}
</style>