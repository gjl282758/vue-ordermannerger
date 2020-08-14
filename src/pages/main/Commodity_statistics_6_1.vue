<template>
  <div>
    <div class="block">
      <span class="demonstration">时间范围</span>
      <el-date-picker
        class="time"
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <button type="primary">查询</button>
    </div>
    <div id="Data">
      <div id="daTa">
        <div id="data" ref="data"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: "",
    };
  },
  mounted() {
    const data = this.$echarts.init(this.$refs.data);

    let option = {
    title: {
        text: '堆叠区域图'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};


    data.setOption(option);
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
    width: 1330px;
    margin: 20px 0 0 20px;
    background-color: #fff;
    padding-top: 20px;
    padding-bottom: 40px;
    #data {
      width: 900px;
      height: 500px;
      margin: 0 0 0 20px;
    }
  }
}
</style>