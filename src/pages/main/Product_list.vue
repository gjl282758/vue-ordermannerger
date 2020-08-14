<template>
  <div id="box">
    <div class="list">
      <span>商品列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price" width="120"></el-table-column>
      <el-table-column label="商品图片" prop="imgUrl">
        <template slot-scope="scope">
          <img style="width: 80px;height:80px" :src="GET_ITEMS_IMG + scope.row.imgUrl" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="商品销量" prop="sellCount"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="clickEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="clickDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="margin-top:20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="48"
    ></el-pagination>

    <!-- //编辑 模态框 -->
    <el-dialog title="编辑商品数据" :visible.sync="showdialog" width="30%" class="modal_box">
      <!-- 商品名称  -->
      <el-row>
        <el-col :span="14" class="modal_row">
          <span>商品名称</span>
          <el-input style="margin-left:26px" v-model="editobj.name" placeholder="商品名称"></el-input>
        </el-col>
      </el-row>
      <!-- 商品分类 -->
      <el-row>
        <el-col :span="14" class="modal_row">
          <span>商品分类</span>

          <el-select style="margin-left:20px" v-model="editobj.category" placeholder="请选择商品分类">
            <el-option
              v-for="item in categorieslist"
              :key="item.cateName"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 商品价格 -->
      <el-row>
        <el-col :span="14" class="modal_row">
          <span>商品价格</span>
          <el-input-number style="margin-left:2px" v-model="editobj.price" :min="0" label="描述文字"></el-input-number>
        </el-col>
      </el-row>
      <!-- 商品图片 -->
      <el-row>
        <el-col :span="14" class="modal_row">
          <span>商品图片</span>
          <div class="inner">
            <el-upload
              :action="ITEMS_IMG_UPLOAD"
              :on-success="uploadfinish"
              :show-file-list="false"
            >
              <i v-show="!editobj.imgUrl" class="el-icon-plus"></i>
              <img
                style="width: 100px"
                v-show="editobj.imgUrl"
                :src="GET_ITEMS_IMG  + editobj.imgUrl"
              />
            </el-upload>
          </div>
        </el-col>
      </el-row>

      <!-- 商品描述 -->
      <el-row>
        <el-col :span="14" class="modal_row">
          <span>商品描述</span>
          <el-input
            style="margin-left:26px"
            type="textarea"
            :rows="4"
            placeholder="商品描述"
            v-model="editobj.goodsDesc"
          ></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showdialog = false">取 消</el-button>
        <el-button type="primary" @click="clickChangeItems">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  productlist,
  dellist,
  Modify_goods,
  GET_ITEMS_IMG,
  ITEMS_IMG_UPLOAD,
  Querycategories,
} from "@/api/apis";
import { getChinatime } from "@/utils/utils";

export default {
  data() {
    return {
      shop: "王小虎夫妻店",
      shopId: "10333",
      address: "上海市普陀区真北路",
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 0,
      GET_ITEMS_IMG: "", //图片IP地址
      ITEMS_IMG_UPLOAD: "", //图片上传地址
      isloading: false, //是否显示加载动画
      showdialog: false,

      //回填数据
      editobj: { price: 0 }, //当前编辑数据
      categorieslist: [], //分类数组
    };
  },
  methods: {
    //获取商品列表数据
    getlist() {
      productlist(this.currentPage, this.pageSize).then((res) => {
        // 先转换
        //  console.log(res.data);
        let arr = res.data.data;
        // console.log(arr);
        for (let obj of arr) {
          obj.ctime = getChinatime(obj.ctime);
          obj.isedit = false; //此对象数据是否在编辑状态
        }
        // 本页数据
        this.tableData = arr;

        // 总商品条数
        this.total = res.data.total;
      });
    },

    //删除商品
    clickDelete(scope) {
      // console.log(scope.row);
      this.$confirm("此操作将永久删除数据, 是否继续?", "玉团系统温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "保留数据",
        type: "warning",
      })
        .then(() => {
          dellist(scope.row.id).then((res) => {
            if (res.data.code == 0) this.getlist();
          });

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //图片上传成功回调
    uploadfinish(res) {
      if (res.code == 0) {
        this.editobj.imgUrl = res.imgUrl;
      }
    },

    //点击编辑时
    clickEdit(row) {
      //深拷贝
      // let newobj = JSON.parse(JSON.stringify(row))
      // let newobj = {...row};
      // console.log(row);
      Querycategories().then((res) => {
        // console.log(res);
        this.categorieslist = res.data.categories;
      });

      this.editobj = { ...row };

      this.showdialog = true;
    },

    //发送请求，修改编辑数据！！！！
    clickChangeItems() {
      // alert(1)
      delete this.editobj.rating;
      delete this.editobj.ratings;
      delete this.editobj.sellCount;
      Modify_goods(this.editobj).then((res) => {
        // console.log(res);
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "商品数据修改成功",
          });
          //刷新数据
          this.getlist();
          //关闭模态框
         this.showdialog=false;
        }
      });
    },

    //分页
    //点击切换条数
    handleSizeChange(newpagesize) {
      this.pageSize = newpagesize;
      this.getlist();
    },
    //点击页数
    handleCurrentChange(newcurrentPage) {
      this.currentPage = newcurrentPage;
      this.getlist();
    },
  },
  created() {
    this.GET_ITEMS_IMG = GET_ITEMS_IMG;
    this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
    this.getlist();
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
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.modal_box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .modal_row {
    display: flex;
    align-items: center;
    line-height: 55px;
    margin-top: 10px;
    span {
      width: 100px;
    }
  }
}
</style>