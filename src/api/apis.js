import axios from 'axios'

//服务器IP
const IP = 'http://127.0.0.1:5000'
//请求的基本路劲
axios.defaults.baseURL = IP

//商品图片上传接口地址
export const ITEMS_IMG_UPLOAD = IP + '/goods/goods_img_upload'
//获取商品图片地址
export const GET_ITEMS_IMG = IP + '/upload/imgs/goods_img/'
//获取店铺图片地址
export const GET_shop_IMG = IP + '/upload/shop/'
//获取上传店铺图片接口地址
export const Upload_shop_IMG = IP + '/shop/upload'



//登录的api
//account: 账号
//password: 密码
// export function login(account,password){
//     return axios.post('/users/checkLogin',{
//         account, password
//     })
// }
//es6
export var login = (account, password) => axios.post('/users/checkLogin', { account, password })

//token 的 api
export var checktoken = (token) => axios.get('/users/checktoken', { params: { token } })

//====================================账号管理===========================================//

//添加账号的api
//userGroup:用户组
export var useradd = (account, password, userGroup) => axios.post('/users/add', { account, password, userGroup })

//获取账号列表 api
export var userlist = (currentPage, pageSize) => axios.get('/users/list', { params: { currentPage, pageSize } })

//删除账号 api
export var userremove = (id) => axios.get('/users/del', { params: { id } })

//批量删除账号 api
export var userremoves = (ids) => axios.get('/users/batchdel', { params: { ids } })

//修改账号 api
export var userchange = (id, account, userGroup) => axios.post('/users/edit', { id, account, userGroup })

//修改密码 api
export var newpwd = (newPwd, id) => axios.post('/users/editpwd', { newPwd, id })

//检查旧密码是否正确 api
export var oldpassword = (oldPwd, id) => axios.get('/users/checkoldpwd', { params: { oldPwd, id } })

//获取账号（个人中心）信息 api
export var getPersonage = (id) => axios.get('/users/accountinfo', { params: { id } })

//头像上传接口  api
export var avatar_upload = (id) => axios.post('/users/avatar_upload', { id })

//=========================================商品管理==================================//

//添加分类  api
export var addcate = (cateName, state) => axios.post('/goods/addcate', { cateName, state })

//获取分类  api
export var getcate = (currentPage, pageSize) => axios.get('/goods/catelist', { params: { currentPage, pageSize } })

//删除分类  api
export var removecate = (id) => axios.get('/goods/delcate', { params: { id } })

//修改分类  api
export var altercate = (id, cateName, state) => axios.post('/goods/editcate', { id, cateName, state })

// 19.获取商品列表
export var productlist = (currentPage, pageSize) => axios.get('/goods/list', { params: { currentPage, pageSize } })

// 20.删除商品
export var dellist = (id) => axios.get('/goods/del', { params: { id } })

//21.修改商品  api
export var Modify_goods = (params) => axios.post('/goods/edit', params)

//16.查询所有分类名称
export var Querycategories = () => axios.get('/goods/categories')

// 17.商品图片上传接口
export var imgupload = () => axios.post('/goods/goods_img_upload')

// 18.添加商品
export var addshop = (name, category, price, imgUrl, goodsDesc) => axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc })


// 22.获取订单列表(带查询功能)
export var Getorderlist = (params) => axios.get('/order/list', { params })


// 23.查询
export var Querylist = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } })

// 24.获取订单详情
export var orderdetails = (id) => axios.get('/order/detail', { params: { id } })


// 25.修改订单
export var modifyorder = (id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState) => axios.post('/order/edit', { id, orderNo, orderTime, phone, consignee, deliverAddress, deliveryTime, remarks, orderAmount, orderState })

//-----------------------------------------------------------店铺管理-------------------------------------------------------//

//26.获取店铺详情
export var Shopdetails = () => axios.get('/shop/info')

//27.店铺图片上传接口
export var UploadPhoto = () => axios.post('/shop/upload')

// 28.店铺内容修改
export var Shopmodify = (params) => axios.post('/shop/edit', params)

// 29.首页报表接口
export var index = () => axios.get('/order/totaldata')

// 30.订单报表接口
export var received = (date) => axios.get('/order/ordertotal', { params: { date } })



// export xxx       //多次暴露                 接： import {name ,login } from 'xxx'
// export default   //默认暴露，只能暴露一次   接: import xxx from 'xxx'