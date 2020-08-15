<template>
  <div id="box">
    <!-- //模态框 -->
    <div v-show="isshow" class="copy_box">
      <div>
        <div>
          <span style="font-weight:bold;">账号修改</span>
          <button @click="click_close">X</button>
        </div>

        <p>
          <el-form ref="form" :model="form" label-width="80px">
            <p>
              <el-form-item label="账号">
                <el-input
                  v-model="form.account"
                  placeholder="请输入内容"
                  style="width:480px;margin-left:10px"
                ></el-input>
              </el-form-item>
            </p>
            <el-form-item label="用户组">
              <el-select v-model="form.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </p>
        <p>
          <el-button type="primary" @click="click_changes">保存</el-button>
        </p>
      </div>
    </div>
    <div class="list">
      <span>账号列表</span>
    </div>
    <!-- 表格组件 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="userGroup" label="用户组"></el-table-column>
      <el-table-column label="时间" prop="ctime"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope)">编辑</el-button>
          <el-button size="mini" type="danger" @click="clickDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pagthiseSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="toTal"
      ></el-pagination>
    </div>
    <div style="margin-top: 20px">
      <el-button @click="click_del" type="danger">批量删除</el-button>
      <el-button @click="toggleSelection()" type="primary">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { userlist, userremove, userchange, userremoves } from "@/api/apis";
import { getChinatime } from "@/utils/utils";

export default {
  data() {
    return {
      // 模态框
      form: {
        userGroup: "",
        account: "",
      },
      input_user: "",
      isshow: false,
      toTal: 0,
      tableData: [],
      multipleSelection: [],
      currentPage: 1,
      pagthiseSize: 5,
    };
  },

  methods: {
    //复选框
    handleSelectionChange(arr) {
      this.ids = arr.map((item) => item.id);
    },
    //批量删除
    click_del() {
      this.$confirm("此操作将永久删除数据, 是否继续?", "玉团系统温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "保留数据",
        type: "warning",
      })
        .then(() => {
          userremoves(JSON.stringify(this.ids)).then((res) => {
            if (res.data.code == 0) this.getData();
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
    //取消批量
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //获取用户列表
    getData() {
      userlist(this.currentPage, this.pagthiseSize).then((res) => {
        let arr = res.data.data;
        for (let obj of arr) {
          obj.ctime = getChinatime(obj.ctime);
        }
        // console.log(res)
        // 本页数据
        this.tableData = arr;

        //总条数
        let toTal = res.data.total;
        this.toTal = toTal;
        // console.log(toTal);
        
        // console.log(this.id);
        // console.log(res.data.total)
      });
    },

    clickEdit() {
      console.log("编辑");
    },
    // 删除
    clickDelete(scope) {
      // console.log(scope.row);

      this.$confirm("此操作将永久删除数据, 是否继续?", "玉团系统温馨提示", {
        confirmButtonText: "狠心删除",
        cancelButtonText: "保留数据",
        type: "warning",
      })
        .then(() => {
          userremove(scope.row.id).then((res) => {
            if (res.data.code == 0) this.getData();
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

    //点击切换条数
    handleSizeChange(newpageSize) {
      //改变当前条数
      this.pagthiseSize = newpageSize;
      //请求当前页数数据
      this.getData();
    },
    //点击页数
    handleCurrentChange(newpage) {
      // console.log(`当前页: ${val}`);
      //改变当前页数
      this.currentPage = newpage;
      //请求当前页数数据
      this.getData();
    },

    //修改账号
    click_close() {
      this.isshow = false;
    },
    handleEdit(row) {
      this.isshow = true;
      this.form = { ...row };
    },
    click_changes() {
      userchange(this.form.id, this.form.account, this.form.userGroup).then(
        (res) => {
          // console.log(res);
          if (res.data.code == 0) {
            this.$message({
              message: "用户修改成功!",
              type: "success",
            });
          }
        }
      );
      this.isshow = false;
      this.getData();
    },
  },
  created() {
    //获取用户列表
    this.getData();
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
      margin-left: -10px;
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
      bottom: 0;
      right: 0;
      margin-right: 20px;
    }
  }
}
</style>