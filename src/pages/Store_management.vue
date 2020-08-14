<template>
  <el-container>
    <el-aside width="210px">
      <!-- 左侧树菜单 -->
      <el-menu
        :default-active="curhash"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        unique-opened
      >
        <!-- 可展开菜单 -->
        <div class="logo">
          <img src="../assets/imgs/logo.png"  alt="">
          <span>专业做鸡二十年</span>
        </div>
        <div v-for="item in powerarr" :key="item.url">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>

          <!-- 商品列表 添加商品 商品分类 -->

          <el-submenu v-else :index="item.url">
            <!-- 大标题的名字 -->
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.name}}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.url"
              :index="child.url"
            >{{child.name}}</el-menu-item>
          </el-submenu>
        </div>
        <!-- 菜单对象，不可展开 -->
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div>
          <el-breadcrumb separator-class="el-icon-arrow-right" class="crumbs">
            <el-breadcrumb-item v-for="item in breadlist" :key="item">{{item}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div>
          <div class="xiala">
            <!-- 下拉菜单 -->
            <el-dropdown style="padding-right:15px;">
              <span class="el-dropdown-link">
                {{username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <router-link to="/main/Personal_Center">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button type="text" @click="open" style="color: rgb(87, 153, 228);">退出登录</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 头像 -->
            <div class="photo">
              <el-avatar :src="imgUrl"></el-avatar>
            </div>
          </div>
        </div>
      </el-header>
      <!-- 二级路由 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, getPersonage } from "@/api/apis";

export default {
  data() {
    return {
      breadlist:"",
      imgUrl: "",
      username: "", //用户名
      list: [
        {
          url: "/main/index",
          icon: "el-icon-s-home",
          name: "后台首页",
          role: ["super", "normal"],
        },
        {
          url: "/main/OrderManagement",
          icon: "el-icon-document",
          name: "订单管理",
          role: ["super", "normal"],
        },

        {
          url: "/main/asdasd",
          icon: "el-icon-document",
          name: "商品管理",
          children: [
            { url: "/main/Product_list", name: "商品列表" },
            { url: "/main/GoodsToadd", name: "添加商品" },
            { url: "/main/Goods_category", name: "商品分类" },
          ],
          role: ["super", "normal"],
        },

        {
          url: "/main/Store_management1",
          icon: "el-icon-office-building",
          name: "店铺管理",
          role: ["super"],
        },

        {
          url: "/main/as",
          icon: "el-icon-document",
          name: "账号管理",
          children: [
            { url: "/main/Account_list", name: "账号列表" },
            { url: "/main/Add_Aaccount", name: "账号添加" },
            { url: "/main/Change_password", name: "修改密码" },
          ],
          role: ["super"],
        },
        {
          url: "/main/asd",
          icon: "el-icon-document",
          name: "销售统计",
          children: [
            { url: "/main/Commodity_statistics", name: "商品统计" },
            { url: "/main/Orders_received", name: "订单统计" },
          ],
          role: ["super"],
        },
      ],
      curhash: "",
    };
  },
  methods: {
    //退出登录
    open() {
        this.$confirm('此操作将退出登录, 是否继续?', '有家提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          location.href='/'
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出登录'
          });          
        });
      },
    //刷新个人资料
    getuserinfo() {
      getPersonage(localStorage.uid).then((res) => {
        // console.log(res);
        this.imgUrl = res.data.accountInfo.imgUrl;
      });
    },
  },
  created() {
    // console.log(this.$router)    //获取整个路由对象
    this.curhash = this.$route.path; //当前页面的hash
    //发送请求验证toten是否失效
    // console.log(localStorage.token)
    checktoken(localStorage.token).then((res) => {
      // console.log(res)
      if (res.data.code == 0) {
        //有效
        this.username = localStorage.username;
      } else {
        //失效
        // this.username = "请登录";
        this.$router.push("/");
      }
    });
    this.getuserinfo();
    // 3. 监听bus的传递事件
    this.$bus.$on("imgloadflush", () => {
      this.getuserinfo();
    });
    this.$bus.$on("imgToadd", () => {
      this.getuserinfo();
    });
    //初始化给二级导航赋值
    this.breadlist = this.$route.meta.breadlist
  },
  computed: {
    //权限数组
    powerarr() {
      // 根据用户权限进行运算，返回运算完毕的数组
      let newarr = this.list.filter((item) => {
        //返回包含此用户权限的数据
        //  console.log(item.role)
        return item.role.includes(localStorage.role);
      });
      return newarr;
    },
  },
  //可以观察vue很多属性的变化(包括hash变化)
  watch: {
    //监听当前路由的变化
    //to: 要切换到哪里, from: 来自哪里
    // $route(to, from){
      $route(to){
        // console.log(to)
        this.breadlist=to.meta.breadlist
      }
  }
};
</script>

<style lang="less" scoped>
@base: #304156;
@graybase: #f0f2f5;

.el-container {
  height: 100%;
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.el-aside {
  background-color: @base;
}

.el-main {
  background-color: @graybase;
}

.el-menu {
  border: 0;
}
.xiala {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
a {
  text-decoration:none;
  color: rgb(87, 153, 228);
}
.logo{
  display: flex;
  align-items: center;
  flex-direction: column;
  span{
    font-weight: bold;
    color: rgb(243, 162, 12);
    font-size: 22px;
  }
}
</style>