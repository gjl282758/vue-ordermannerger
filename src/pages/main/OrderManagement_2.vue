<template>
  <div class="box">
    <!--查看 模态框 -->
    <div v-show="isshow" class="copy_box">
      <div>
        <button @click="click_X">X</button>
          <span style="font-weight: bold;  font-size: 20px;margin-left:5px">订单详情:</span>

        <p>
          <span style="font-weight:bold;width:100px;display:inline-block;">订单号：</span>
          <span>{{orderNo}}</span>
        </p>
        <p>
          <span style="font-weight:bold;width:100px;display:inline-block">下单时间：</span>
          <span>{{orderTime}}</span>
        </p>
        <p>
          <span style="font-weight:bold;width:100px;display:inline-block">联系电话：</span>
          <span>{{phone}}</span>
        </p>
        <p>
          <span style="font-weight:bold;width:100px;display:inline-block">收货人：</span>
          <span>{{consignee}}</span>
        </p>
        <p>
          <span style="font-weight:bold;width:100px;display:inline-block">送货地址：</span>
          <span>{{deliverAddress}}</span>
        </p>
        <p>
          <span style="font-weight:bold;width:100px;display:inline-block">送达时间：</span>
          <span>{{deliveryTime}}</span>
        </p>
        <p>
          <span style="font-weight:bold;width:100px;display:inline-block">备注：</span>
          <span>{{remarks}}</span>
        </p>
        <p>
          <span style="font-weight:bold;width:100px;display:inline-block">订单金额：</span>
          <span>{{orderAmount}}</span>
        </p>
        <p>
          <span style="font-weight:bold;width:100px;display:inline-block">添订单状态：</span>
          <span>{{orderState}}</span>
        </p>
      </div>
    </div>

    <div class="main">
      <ul>
        <li>
          <span>订单号</span>
          <el-input v-model="searchorderNo" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>收货人</span>
          <el-input v-model="searchconsignee" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>手机号</span>
          <el-input v-model="searchphone" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>订单状态</span>
          <!-- <el-input v-model="orderState" placeholder="请输入内容"></el-input> -->
          <el-select v-model="searchselect" placeholder="请选择">
            <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </li>
        <li>
          <span>选择时间</span>
          <div class="block">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
          <button @click="click_get">查询</button>
        </li>
      </ul>
      <div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <el-table-column fixed prop="orderNo" label="订单号" width="150">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.orderNo}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.orderNo" />
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="200">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.orderTime}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.orderTime" />
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.phone}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.phone" />
            </template>
          </el-table-column>
          <el-table-column prop="consignee" label="收货人" width="120">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.consignee}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.consignee" />
            </template>
          </el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="200">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.deliverAddress}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.deliverAddress" />
            </template>
          </el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="200">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.deliveryTime}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.deliveryTime" />
            </template>
          </el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.remarks}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.remarks" />
            </template>
          </el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="120">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.orderAmount}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.orderAmount" />
            </template>
          </el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="120">
            <template slot-scope="scope">
              <span v-show="!scope.row.isedit">{{scope.row.orderState}}</span>
              <el-input v-show="scope.row.isedit" v-model="scope.row.orderState" />
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button
                type="text"
                @click="clickEdit(scope.row)"
                size="small"
              >{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="block" style="margin:20px 0 0 10px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { Getorderlist, modifyorder } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      isshow: false,
      loading: true,

      //查询
      option: ["已完成", "已受理", "派送中", "全部"],
      searchorderNo: "",
      searchconsignee: "",
      searchphone: "",
      searchselect: "",
      date: null,

      orderTime: "",

      //模态框
      orderNo: "",
      consignee: "",
      phone: "",
      deliverAddress: "",
      deliveryTime: "",
      remarks: "",
      orderAmount: "",
      orderState: "",

      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 100,
    };
  },
  methods: {
    //修改商品
    clickEdit(row) {
      // console.log(row);
      if (row.isedit) {
        //改变数据
        row.isedit = false;
        modifyorder(
          row.id,
          row.orderNo,
          row.orderTime,
          row.phone,
          row.consignee,
          row.deliverAddress,
          row.deliveryTime,
          row.remarks,
          row.orderAmount,
          row.orderState
        ).then((res) => {
          // console.log(res);
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
    //关闭
    click_X() {
      this.isshow = false;
    },
    //获取订单列表
    getdata(paramsex) {
      this.loading = true; //加载
      // setTimeout(() => {}, 1000);
      //延迟出现
      Getorderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        // console.log(res);
        let arr = res.data.data;
        for (let obj of arr) {
          obj.orderTime = getChinatime(obj.orderTime);
          obj.deliveryTime = getChinatime(obj.deliveryTime);
          obj.isedit = false; //此对象数据是否在编辑状态
        }

        this.tableData = arr;
        //总条数
        this.total = res.data.total;
        this.loading = false;
      });
    },
    //查看
    handleClick(row) {
      this.isshow = true;

      // console.log(row);
      this.deliverAddress = row.deliverAddress;
      this.orderNo = row.orderNo;
      this.orderTime = row.orderTime;
      this.phone = row.phone;
      this.consignee = row.consignee;
      this.deliveryTime = row.deliveryTime;
      this.remarks = row.remarks;
      this.orderAmount = row.orderAmount;
      this.orderState = row.orderState;
    },

    handleSizeChange(newpageSize) {
      this.pageSize = newpageSize;
      this.getdata();
    },
    //分页
    handleCurrentChange(newpage) {
      this.currentPage = newpage;
      this.getdata(this.paramsex);
    },
    //查询
    click_get() {
      // console.log(1);
      let { searchorderNo, searchconsignee, searchphone, searchselect } = this;

      //额外参数对象
      let paramsex = {};
      if (searchorderNo != "") paramsex.orderNo = searchorderNo;
      if (searchconsignee != "") paramsex.consignee = searchconsignee;
      if (searchphone != "") paramsex.phone = searchphone;
      if (searchselect != "" && searchselect != "全部")
        paramsex.orderState = searchselect;
      if (this.date)
        paramsex.date = JSON.stringify([
          getChinatime(this.date[0]),
          getChinatime(this.date[1]),
        ]);

      this.paramsex = paramsex;

      this.getdata(this.paramsex);
    },
  },
  created() {
    this.getdata();
  },
};
</script>

<style lang="less" scoped>
.box {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  height: 720px;
  ul {
    list-style: none;
    padding-left: 20px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: 40px;
    padding-bottom: 80px;
    li {
      display: flex;
      align-items: center;
      margin-left: 20px;
      line-height: 55px;
      span {
        font-size: 14px;
        width: 75px;
      }

      .time {
        margin-left: 20px;
      }
      > button {
        background-color: #409eff;
        outline: none;
        border: none;
        border-radius: 4px;
        height: 40px;
        color: #fff;
        width: 60px;
        margin-left: 10px;
        cursor: pointer;
      }
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
  z-index: 100;
  background: rgba(0, 0, 0, 0.5);
  > div {
    background-color: #fff;
    width: 600px;
    height: 270px;
    position: absolute;
    top: 33%;
    left: 32%;
    padding: 20px;
    position: relative;
    
    p {
      margin: 12px 10px;
    }

    button {
      position: absolute;
      top: 5px;
      right: 5px;
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
}
</style>