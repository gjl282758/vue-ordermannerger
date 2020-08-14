<template>
  <div id="box">
    <div>
      <span>账号添加</span>
    </div>
    <div class="main">
      <p>
        <span style="margin-left:15px">账号</span>
        <input
          type="text"
          placeholder="请输入内容"
          style=" width: 200px;margin-left: 20px;"
          v-model="username"
        />
      </p>
      <p>
        <span style="margin-left:15px">密码</span>
        <input
          type="password"
          placeholder="请输入内容"
          style=" width: 200px;margin-left: 20px;"
          v-model="pwd"
        />
      </p>
      <p>
        <span>用户组</span>
        <el-select v-model="usergroup" placeholder="请选择用户组" class="input">
          <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </p>
      <div>
        <el-button type="primary" @click="click_add">添加</el-button>
        <el-button type="rest" plain>重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { useradd } from "@/api/apis";

export default {
  data() {
    return {
      input: "",
      list: [
        {
          value: "超级管理员",
          label: "超级管理员",
        },
        {
          value: "普通管理员",
          label: "普通管理员",
        },
      ],//账号权限数组
      usergroup: "", //权限
      username: "",
      pwd: "",
    };
  },
  methods: {
    click_add() {

      let { username, pwd, usergroup }=this;
      useradd(username, pwd, usergroup).then((res) => {
        // console.log(res)
        if (res.data.code == 0) {
          this.$message({
            message: "用户添加成功!",
            type: "success",
          });
        } else {
          this.$message.error("系统提示: 账号添加失败");
        }
        this.usergroup = "";
        this.pwd = "";
        this.username = "";
      });
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  > div:first-child {
    display: flex;
    justify-content: space-between;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    span {
      margin-left: 20px;
    }
  }
  .main {
    margin: 15px 0 0 70px;
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    p {
      margin: 10px 0;
      display: flex;
      align-items: center;
      .input {
        width: 232px;
        margin-left: 20px;
      }
      input {
        border: 1px solid #dcdfe6;
        padding: 0 15px;
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
      }
    }
    div {
      margin-left: 68px;
    }
  }
}
</style>