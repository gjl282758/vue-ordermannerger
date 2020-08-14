<template>
  <div id="box">
    <div class="list">
      <span>管理员信息</span>
    </div>
    <div class="main">
      <p>
        管理员ID：
        <span>{{accountInfo.id}}</span>
      </p>
      <p>
        账号：
        <span>{{accountInfo.account}}</span>
      </p>
      <p>
        用户组：
        <span>{{accountInfo.userGroup}}</span>
      </p>
      <p>
        创建时间：
        <span>{{accountInfo.ctime}}</span>
      </p>
      <div>
        管理员头像：
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="uploaddata"
        >
          <img v-if="accountInfo.imgUrl" :src="accountInfo.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { getPersonage } from "@/api/apis";
import { getChinatime } from "@/utils/utils";

export default {
  data() {
    return {
      accountInfo: [
        {
          id: "",
          ctime: "",
          account: "",
          userGroup: "",
          imgUrl: "",
        },
      ],

      uploaddata: {},
    };
  },
  created() {
    //刷新
    this.getinfo();
    this.uploaddata = { id: localStorage.uid };
  },
  methods: {
    getinfo() {
      getPersonage(localStorage.uid).then((res) => {
        // console.log(res);
        this.accountInfo = res.data.accountInfo;
        this.accountInfo.ctime = getChinatime(res.data.accountInfo.ctime);
        this.accountInfo.imgUrl = res.data.accountInfo.imgUrl;
      });
    },

    handleAvatarSuccess(res) {
      if (res.code == 0) {
        //上传图片成功
        this.$bus.$emit("imgloadflush");
        this.$message({
          type: "success",
          message: "上传图片成功!",
        });
        this.getinfo();
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  .list {
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
    margin: 0 20px 0 20px;
    p {
      line-height: 60px;
      border-bottom: 1px solid #ccc;
      margin: 0;
    }
    div {
      display: flex;
      align-items: center;
      height: 150px;
    }
  }
}
/deep/.avatar-uploader .el-upload {
  // border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
</style>