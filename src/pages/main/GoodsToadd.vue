<template>
  <div id="box">
    <div class="list">
      <span>账号列表</span>
    </div>
    <div class="main">
      <p>
        <span style="margin-left:30px">商品名称</span>
        <el-input  v-focus v-model="addlist.name" placeholder="商品名称" style="width:380px;margin-left:20px"></el-input>
      </p>
      <p>
        <span style="margin-left:30px">商品分类</span>
        <el-select
          v-model="addlist.category"
          placeholder="请选择商品分类"
          style="width:380px;margin-left:20px"
        >
          <el-option
            v-for="item in categories"
            :key="item.cateName"
            :cateName="item.cateName"
            :value="item.cateName"
          >{{item.cateName}}</el-option>
        </el-select>
      </p>
      <p>
        <span style="margin-left:30px">商品价格</span>
        <el-input-number
          v-model="price"
          :min="1"
          :max="1000"
          cateName="描述文字"
          style="width:150px;margin-left:20px"
        ></el-input-number>
      </p>
      <p>
        <span style="margin-left:30px">商品图片</span>
        <el-upload
          style="margin-left:20px"
          class="avatar-uploader"
          :action="ITEMS_IMG_UPLOAD"
          :show-file-list="false"
          :on-success="uploadfinish"
          :before-upload="beforeAvatarUpload"
        >
          <img
            style="width: 178px;height:178px"
            v-show="imgUrl != ''"
            v-if="imgUrl"
            :src="GET_ITEMS_IMG+imgUrl"
            class="avatar"
          />
          <i v-show="imgUrl == ''" v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
      <p>
        <span style="margin-left:30px">商品描述</span>
        <el-input
          style="width:380px;margin-left:20px"
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="addlist.goodsDesc"
        ></el-input>
      </p>
      <el-button type="primary" style="width:100px;margin-left:113px" @click="click_add">添加商品</el-button>
    </div>
  </div>
</template>

<script>
import {
  Querycategories,
  addshop,
  ITEMS_IMG_UPLOAD,
  GET_ITEMS_IMG,
} from "@/api/apis";
export default {
  data() {
    return {
      imgUrl: "",
      dialogVisible: false,
      categories: [],
      addlist: [],
      price: 1,
      ITEMS_IMG_UPLOAD: "", //图片上传地址
      GET_ITEMS_IMG: "" //图片下载地址
    };
  },
  directives: {
    focus: {
        inserted: function (el) {
        el.querySelector('input').focus()
        }
    }
},
  methods: {
    uploadfinish(res) {
      if (res.code == 0) {
        this.imgUrl = res.imgUrl;
      }
    },
    //上传图片
    handleRemove(res) {
      // console.log(this.baseURL+file.response.imgUrl);
      this.imgUrl = res.response.imgUrl;
      this.price = res.response.price;
      // console.log(this.GET_ITEMS_IMG + this.imgUrl);
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
    click_add() {
      // let { name, category, price, imgUrl, goodsDesc } = this;
      addshop(
        this.addlist.name,
        this.addlist.category,
        this.price,
        this.imgUrl,
        this.addlist.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "添加商品成功!",
          });
        }
      });
    },
  },
  created() {
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    //获取商品分类
    Querycategories().then((res) => {
      // console.log(res)
      this.categories = res.data.categories;
      this.addlist.category = res.data.categories[0].cateName;
    });
    this.uploaddata = { id: localStorage.uid };
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
    display: flex;
    flex-direction: column;
    padding-bottom: 40px;

    p {
      margin: 10px 0;
      display: flex;
      align-items: center;
    }
  }
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>