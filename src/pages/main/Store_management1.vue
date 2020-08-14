<template>
  <div id="box">
    <div class="box_copy">
      <span>店铺管理</span>
      <el-button type="primary" @click="stockpile" style="margin-right:10px">{{!isable? "修改":"保存"}}</el-button>
    </div>
    <el-form ref="form" :model="form" label-width="80px" class="form" :disabled="!isable">
      <el-form-item label="店铺名称" style="margin-top:15px">
        <el-input v-model="name" style=" width: 380px"></el-input>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-input type="textarea" rows="6" v-model="bulletin" style=" width: 380px;height:150px"></el-input>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          shape="square"
          class="avatar-uploader"
          :action="Upload_shop_IMG"
          :show-file-list="false"
          :on-success="handphone"
          :size="100"
          style="width:150px;height:150px;dispaly:inline-block"
        >
          <img style="width:150px;height:150px" :src="avatar==''? '':GET_shop_IMG+avatar" />
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片" style="width:400px;dispaly:flex;flex-warp:warp">
        <el-upload
          :action="Upload_shop_IMG"
          list-type="picture-card"
          show-file-list
          :file-list="shopimgs"
          :on-preview="handlePictureCardPreview"
          :on-remove="removeImg"
          :on-success="handleAvatarSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="配送费" style="margin-top:15px">
        <el-input v-model="deliveryPrice" style=" width: 380px"></el-input>
      </el-form-item>
      <el-form-item label="配送时间" style="margin-top:15px">
        <el-input v-model="deliveryTime" style=" width: 380px"></el-input>
      </el-form-item>
      <el-form-item label="配送描述" style="margin-top:15px">
        <el-input v-model="description" style=" width: 380px"></el-input>
      </el-form-item>
      <el-form-item label="店铺评分" style="margin-top:15px">
        <el-input v-model="score" style=" width: 380px"></el-input>
      </el-form-item>
      <el-form-item label="销量" style="margin-top:15px">
        <el-input v-model="sellCount" style=" width: 380px"></el-input>
      </el-form-item>
      <el-form-item label="活动">
        <el-checkbox-group v-model="supports" style="width:400px;dispaly:flex;flex-warp:warp">
          <el-checkbox label="在线支付满28减5" name="supports"></el-checkbox>
          <el-checkbox label="VC无限橙果汁全场8折" name="supports"></el-checkbox>
          <el-checkbox label="单人精彩套餐" name="supports"></el-checkbox>
          <el-checkbox label="特价饮品8折抢购" name="supports"></el-checkbox>
          <el-checkbox label="单人特色套餐" name="supports"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-time-picker
          is-range
          v-model="date"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  Shopdetails,
  GET_shop_IMG,
  Upload_shop_IMG,
  Shopmodify,
} from "@/api/apis";
import { getChinatime } from "@/utils/utils";

//
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      isable: false,

      shopimgs: [], //回填店铺图片数组

      avatar: "", //店铺头像
      bulletin: "", //公告
      date: [], //营业时间
      deliveryPrice: 0, //配送费
      deliveryTime: 0, //送达时间
      description: "", //描述
      id: 0,
      minPrice: 0, //起送费
      name: "",
      pics: [], //店铺图片
      score: 0, //评分
      sellCount: 0, //销量
      supports: [], //活动

      GET_shop_IMG: "",
      Upload_shop_IMG: "",
    };
  },
  methods: {
    //获取店铺管理详情
    getshop() {
      Shopdetails().then((res) => {
        for (let key in res.data.data) {
          this[key] = res.data.data[key];
        }

        this.shopimgs = this.pics.map((imgstr) => {
          return {
            name: imgstr,
            url: GET_shop_IMG + imgstr,
          };
        });
      });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //移除店铺图片
    removeImg(res) {
      // 要移除的图片名字
      console.log(res.name);
      // 找到并移除
      this.pics.splice(this.pics.indexOf(res.name), 1);

      console.log(this.pics);
    },
    //上传店铺头像
    handphone(res) {
      if (res.code == 0) {
        this.avatar = res.imgUrl;
        console.log(this.avatar);
        this.$message({
          type: "success",
          message: "店铺头像上传成功",
        });
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      // console.log(file);
    },
    //上传店铺图像
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.pics.push(res.imgUrl); //把上传的图片加到pics中
        console.log(this.pics);
        // console.log(this.shopimgs)
      }
    },
    //保存/修改
    stockpile() {
      if (this.isable) {
        this.isable = false;
        var params = {
          id: this.id,
          name: this.name,
          bulletin: this.bulletin,
          avatar: this.avatar,
          deliveryPrice: this.deliveryPrice,
          deliveryTime: this.deliveryTime,
          description: this.description,
          score: this.score,
          sellCount: this.sellCount,
          //字符串数组
          date: JSON.stringify([
            getChinatime(this.date[0]),
            getChinatime(this.date[1]),
          ]),
          supports: JSON.stringify(this.supports),
          pics: JSON.stringify(this.pics),
        };

        Shopmodify(params).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "店铺信息修改成功！",
            });
          }
        });
      } else {
        this.isable = true;
      }
    },
  },
  //获取详情
  created() {
    this.GET_shop_IMG = GET_shop_IMG;
    this.Upload_shop_IMG = Upload_shop_IMG;

    console.log(this.shopimgs);
    this.getshop();
  },
};
</script>

<style lang="less" scoped>
#box {
  background-color: #fff;
  .form {
    padding: 0 0 10px 0;
  }
}
.box_copy {
  display: flex;
  justify-content: space-between;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid #ccc;
  span {
    margin-left: 20px;
  }
  // button {
  //   background-color: #409eff;
  //   outline: none;
  //   border: none;
  //   border-radius: 4px;
  //   height: 40px;
  //   color: #fff;
  //   width: 60px;
  //   margin-right: 20px;
  //   cursor: pointer;
  // }
}
</style>