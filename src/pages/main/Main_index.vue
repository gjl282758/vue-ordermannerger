<template>
  <div>
    <ul>
      <li>
        <img src="../../assets/imgs/order_icon.png" alt />
        <div>
          <b>总订单</b>
          <span>{{totalOrder}}</span>
        </div>
      </li>
      <li>
        <img src="../../assets/imgs/money_icon.png" alt />
        <div>
          <b>总销售额</b>
          <span>{{totalAmount}}</span>
        </div>
      </li>
      <li>
        <img src="../../assets/imgs/today_order_icon.png" alt />
        <div>
          <b>今日订单</b>
          <span>{{todayOrder}}</span>
        </div>
      </li>
      <li>
        <img src="../../assets/imgs/today_money_icon.png" alt />
        <div>
          <b>今日销售额</b>
          <span>{{totayAmount}}</span>
        </div>
      </li>
    </ul>
    <div id="Data">
      <div id="daTa">
        <div id="data" ref="data"></div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { index } from "@/api/apis";
export default {
  data() {
    return {
      todayOrder: "",
      totalAmount: "",
      totalOrder: "",
      totayAmount: "",
    };
  },
  mounted() {
    const indexCharts = echarts.init(document.querySelector("#data"));

    index().then((res) => {
      console.log(res);

      //   res.data.xData; //x坐标的标题
      //   res.data.amountData; //金额数据
      //   res.data.orderData; //订单数据

      let option = {
        title: {
          text: "数据统计",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["有家金额数据", "有家订单数据"], //顶部描述数组
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData, //横轴
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "有家金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
          {
            name: "有家订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
        ],
      };

    indexCharts.setOption(option);
    });

  },
  created() {
    index().then((res) => {
      this.todayOrder = res.data.todayOrder;
      this.totalAmount = res.data.totalAmount;
      this.totalOrder = res.data.totalOrder;
      this.totayAmount = res.data.totayAmount;
    });
  },
};
</script>

<style lang="less" scoped>
ul {
  padding-left: 0px;
  list-style: none;
  display: flex;
  justify-content: space-between;
  li {
    width: 295px;
    height: 140px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      b {
        font-size: 18px;
        color: #cdcdcd;
      }
      span {
        margin-top: 10px;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
}
#Data {
  height: 650px;
  #daTa {
    width: 1247px;

    margin: 20px 0 0 0;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 40px;
    #data {
      width: 900px;
      height: 400px;
      margin: 0 0 0 20px;
    }
  }
}
</style>