//引入
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from './pages/Login'
// 首页

import {checktoken} from './api/apis'

Vue.use(VueRouter)	//使用VueRouter插件

//new对象暴露
const router = new VueRouter({
    //路由配置数组
    routes: [
        {
            path: '/',	//要监听的hash地址!
            name: 'Login',	//此路由对象的名字/id, 不要重复
            component: Login  //要加载的组件 (组件最后都会被加载显示到router-view中)
        },
        {
            path: '/main',	//要监听的hash地址!
            name: 'main',	//此路由对象的名字/id, 不要重复
            component:()=>import('./pages/Store_management'),
            children:[
                    // 店铺管理
                    {
                        path: '/main/Store_management1',	//要监听的hash地址!
                        name: '/main/Store_management1',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Store_management1'), 
                        meta: { breadlist:["店铺管理"] }

                    },
                    // 订单管理
                    {
                        path: '/main/OrderManagement',	//要监听的hash地址!
                        name: '/main/OrderManagement',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/OrderManagement_2'), 
                        meta: { breadlist:["订单管理"] }
                        

                    },
                    //账号添加
                    {
                        path: '/main/Add_Aaccount',	//要监听的hash地址!
                        name: '/main/Add_Aaccount',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Add_Aaccount_5'), 
                        meta: { breadlist:["账号管理","账号添加"] }

                    },
                    //商品统计
                    {
                        path: '/main/Commodity_statistics',	//要监听的hash地址!
                        name: '/main/Commodity_statistics',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Commodity_statistics_6_1'), 
                        meta: { breadlist:["销售统计","商品统计"] }

                    },
                    //销售统计
                    {
                        path: '/main/Orders_received',	//要监听的hash地址!
                        name: '/main/Orders_received',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Orders_received_6_2'), 
                        meta: { breadlist:["销售统计","订单统计"] }

                    },
                    //修改密码
                    {
                        path: '/main/Change_password',	//要监听的hash地址!
                        name: '/main/Change_password',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Change_password'), 
                        meta: { breadlist:["账号管理","修改密码"] }

                    },
                    //账号列表
                    {
                        path: '/main/Account_list',	//要监听的hash地址!
                        name: '/main/Account_list',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Account_list'), 
                        meta: { breadlist:["账号管理","账号列表"] }

                    },
                    //商品添加
                    {
                        path: '/main/GoodsToadd',	//要监听的hash地址!
                        name: '/main/GoodsToadd',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/GoodsToadd'), 
                        meta: { breadlist:["商品管理","商品添加"] }

                    },
                    //首页
                    {
                        path: '/main/index',	//要监听的hash地址!
                        name: '/main/index',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Main_index'), 
                        meta: { breadlist:["首页"] }
                    },
                    //商品列表
                    {
                        path: '/main/Product_list',	//要监听的hash地址!
                        name: '/main/Product_list',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Product_list'), 
                        meta: { breadlist:["商品管理","商品列表"] }

                    },
                    //商品分类
                    {
                        path: '/main/Goods_category',	//要监听的hash地址!
                        name: '/main/Goods_category',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Goods_category'), 
                        meta: { breadlist:["商品管理","商品分类"] }

                    },
                    //个人中心
                    {
                        path: '/main/Personal_Center',	//要监听的hash地址!
                        name: '/main/Personal_Center',	//此路由对象的名字/id, 不要重复
                        component:()=>import('./pages/main/Personal_Center'), 
                    }
            ]
        },
        
        
        
        
        
    
    ]
})

//路由拦截
router.beforeEach((to, from, next) => {
    //to要跳转到的路径
    //from来自于哪里
    console.log(from)
    //只要不是默认登录，都开启路由验证
    if(to.path!='/'){
        //验证用户是否登录
        checktoken(localStorage.token).then(res=>{
            //在登录状态
            if(res.data.code==0){
                next()  //让他正常的跳转
            }else   //不在正常状态
            next('/')
        })
    }else
    next()

    //让路由继续跳转
    // next()

})
export default router