<template>
  <div id="box">
    <!-- 模态框 -->
    <div v-show="isshow" class="copy_box">
      <div>
        <div>
          <span style="font-weight:bold">添加分类</span>
          <button @click="click_close">X</button>
        </div>
        <p style="margin-top: 10px;">
          <span style="font-size:14px;color:#A6B1BA">分类名称</span>
          <el-input
            v-model="arr.cateNames"
            placeholder="请输入内容"
            style="width:480px;margin-left:10px"
          ></el-input>
        </p>
        <p style="margin-top: 10px;">
          <span style="font-size:14px;color:#A6B1BA">是否启用</span>
          <el-switch
            v-model="arr.states"
            active-color="#13ce66"
            inactive-color="#ff4949"
            style="margin-left:10px"
          ></el-switch>
        </p>
        <p>
          <el-button @click="click_close">取消</el-button>
          <el-button type="primary" @click="add_click">确定</el-button>
        </p>
      </div>
    </div>
    <div class="list">
      <span>商品分类</span>
      <el-button type="primary" @click="click_add">添加分类</el-button>
    </div>

    <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>

      <el-table-column property="cateName" label="分类名称" width="200">
        <template slot-scope="scope">
          <span v-show="!scope.row.isedit">{{scope.row.cateName}}</span>
          <el-input v-show="scope.row.isedit" v-model="scope.row.cateName" />
        </template>
      </el-table-column>
      <el-table-column property="state" label="是否启用" width="200">
        <template slot-scope="scope">
          <el-switch
            :disabled="!scope.row.isedit"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="clickEdit(scope.row)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentpage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getcate, addcate, removecate, altercate } from "@/api/apis";

export default {
  data() {
    return {
      arr: {
        cateNames: "", //模态框分类名称
        states: "1", //模态框  是否启用
      },
      isshow: false,
      value_copy: 100,
      input: "",

      state: true,

      currentpage: 1,
      pagesize: 5,
      tableData: [],
      currentRow: null,
      total: 100,
    };
  },

  methods: {
    //获取分类列表
    getcates() {
      getcate(this.currentpage, this.pagesize).then((res) => {
        //先转换
        let str = res.data.data;
        for (let obj of str) {
          obj.isedit = false; //此对象数据是否在编辑状态
          obj.state = obj.state == 1;
        }
        // console.log(str);

        // console.log(res.data.data);
        this.tableData = str;

        //总条数
        this.total = res.data.total;
      });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    //点击切换条数
    handleSizeChange(newpagesize) {
      //改变当前条数
      this.pagesize = newpagesize;
      //请求当前页数新数据
      this.getcates();
    },
    //点击页数
    handleCurrentChange(newpage) {
      //改变当前页数
      this.currentpage = newpage;
      //请求当前页数新数据
      this.getcates();
    },
    //x
    click_close() {
      this.isshow = false;
    },
    //编辑
    clickEdit(row) {
      if (row.isedit) {
        //改变数据
        row.isedit = false;
        altercate(row.id, row.cateName, row.state).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          }
        });
      } else {
        //打开编辑状态
        row.isedit = true;
      }
    },
    //删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除数据, 是否继续?", "玉团系统温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "保留数据",
        type: "warning",
      })
        .then(() => {
          removecate(id).then((res) => {
            if (res.data.code == 0) this.getcates();
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
    //添加分类入口
    click_add() {
      this.isshow = true;
    },
    //添加分类
    add_click() {
      if (this.arr.cateNames == "") {
        return false;
      }
      addcate(this.arr.cateNames, this.arr.states).then((res) => {
        // console.log(res);
        if (res.data.code == 0) {
          this.tableData.push(this.arr);
          this.$message({
            message: "添加分类成功!",
            type: "success",
          });
          this.isshow = false;
        }
        this.arr = [];
      });
      this.getcates();
    },
  },
  //获取分类
  created() {
    this.getcates();
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
    button {
      margin-right: 15px;
    }
  }
}
body {
  position: relative;
}
.copy_box {
  width: 100%;
  height: 100%;
  background-color: #78797b;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  > div {
    background-color: #fff;
    width: 600px;
    height: 230px;
    position: absolute;
    top: 33%;
    left: 32%;
    padding: 20px;
    position: relative;
    p {
      
      margin-left: 10px;
    }
    h4 {
      margin: 0;
    }
    div {
      position: relative;
      button {
        position: absolute;
        top: 0;
        right: 0;
        background-color: #fff;
        border: 0;
        width: 25px;
        height: 25px;
        color: #ccc;
        outline: none;
      }
      button:hover {
        color: red;
      }
    }
    p:last-child {
      position: absolute;
      bottom: 13px;
      right: 0;
      margin-right: 20px;
    }
  }
}
</style>