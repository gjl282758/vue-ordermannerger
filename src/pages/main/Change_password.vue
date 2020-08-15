<template>
  <div id="box">
    <div>
      <span>账号添加</span>
    </div>
    <div class="main">
      <p>
        <span style="margin-left:30px">原密码</span>
        <el-input
          v-model="oldPwd"
          type="text"
          placeholder="请输入内容"
          style=" width: 232px;margin-left: 20px;"
          @blur="blur_old"
        ></el-input>
        <span v-show="isshow" style="margin-left:15px;color:red">{{msg}}</span>
      </p>
      <p>
        <span style="margin-left:30px">新密码</span>
        <el-input
        v-focus
          placeholder="请输入密码"
          v-model="newPwd"
          style=" width: 232px;margin-left: 20px;"
          show-password
        ></el-input>
      </p>
      <p>
        <span style="margin-left:15px">确认密码</span>
        <el-input
          placeholder="两次密码必须一致"
          v-model="newsPwd"
          style=" width: 232px;margin-left: 20px;"
          show-password
        ></el-input>
        <span v-show="isshows" style="margin-left:15px;color:red">{{msgs}}</span>
      </p>

      <div>
        <el-button type="primary" @click="affirm_click">确定</el-button>
        <el-button type="rest" plain @click="rest">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { oldpassword, newpwd } from "@/api/apis";

export default {
  data() {
    return {
      msgs: "",
      isshows: false,
      newPwd: "",
      newsPwd: "",
      isshow: false,
      msg: "",
      oldPwd: localStorage.upwd,
      id: localStorage.uid,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  methods: {
    //是否和原密码一样
    blur_old() {
      // alert(1)
      if (this.oldPwd == "") {
        return false;
      }
      oldpassword(this.oldPwd, this.id).then((res) => {
        this.msg = res.data.msg;
        this.isshow = true;
        if (res.data.code == 0) {
          this.isshow = false;
        }
      });
    },

    //修改密码
    affirm_click() {
      if (this.newPwd == "" || this.newsPwd == "") {
        return false;
      }
      newpwd(this.newPwd, this.id).then((res) => {
        // console.log(res)

        if (
          this.newPwd === this.newsPwd &&
          this.newpwd != this.oldPwd &&
          res.data.code == 0
        ) {
          this.$message({
            message: "修改密码成功，请重新登录~~~",
            type: "success",
          });
          this.isshows = false;
          this.oldPwd = "";
          this.newPwd = "";
          this.newsPwd = "";
          location.href='/'
        } else if (this.newPwd !== this.newsPwd) {
          this.msgs = "两次输入的密码不一样";
          this.isshows = true;
        }
      });
    },

    //重置
    rest(){
      this.newPwd = "";
          this.newsPwd = "";
    }
  },
  directives: {
      focus: {
        inserted: function (el) {
          el.querySelector("input").focus();
        },
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
      margin-left: 99px;
    }
  }
}
</style>