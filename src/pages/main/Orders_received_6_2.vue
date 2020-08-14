<template>
  <div>
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        v-model="date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <button type="primary" @click="clickSearch">查询</button>
    </div>
        <div id="salecount" style="width: 100%; height: 500px"></div>

  </div>
</template>

<script>
import echarts from "echarts";
import { received } from "@/api/apis";
import { getChinatime } from "@/utils/utils";
export default {
  data() {
    return {
      date: [], //当前选择的时间
    };
  },
  methods: {
    clickSearch() {
      alert(1)
      let timestr = JSON.stringify([
        getChinatime(this.date[0]),
        getChinatime(this.date[1]),
      ]);
      this.refreshEcharts(timestr);
    },
    refreshEcharts(str) {
     received(str).then((res) => {
        let arr = res.data.data;

        for (let obj of arr) {
          obj.orderTime = getChinatime(obj.orderTime);
        }

        let option = {
          xAxis: {
            type: "category",
            data: arr.map((obj) => obj.orderTime),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: arr.map((obj) => obj.orderAmount),
              type: "bar",
            },
          ],
        };

        this.sechart.setOption(option);
      });
    },
  },
  mounted() {
    this.sechart= echarts.init(document.getElementById("salecount"))

    

  },
  
};
</script>

<style lang="less" scoped>
.block {
  margin-top: 20px;
  padding-left: 20px;
  .time {
    margin-left: 20px;
  }
  button {
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
#Data {
  height: 650px;
  #daTa {
    width: 1400px;

    margin: 20px 0 0 20px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 40px;
    #data {
      width: 700px;
      height: 400px;
      margin: 0 0 0 20px;
    }
  }
}
</style>