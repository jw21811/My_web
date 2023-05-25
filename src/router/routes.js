//此区域增加子页面
import Login_Mode from '../components/登录模式选择'

import User_Login from '../components/用户/用户登录页面'
import User_Regsiter from '../components/用户/用户注册页面'
import User_Main_Page from '../components/用户/用户总页面'
import User_Page_Goods from '../components/用户/用户商品浏览页面'
import User_Page_Cart from '../components/用户/用户购物车页面'
import User_Page_Order from '../components/用户/用户订单页面'

import Merchant_Login from '../components/商家/商家登录页面'
import Merchant_Order from '../components/商家/商家待处理订单页面'
import Merchant_Goods from '../components/商家/商家商品页面'
import Merchant_Shop  from '../components/商家/商家店铺页面'

import Delivery_staff_Login from '../components/骑手/骑手登录页面'

import Admin_Login from '../components/管理员/管理员登录页面'



//配置路由
const routes = [
    { path:'/',component:Login_Mode},
    { path: '/User/Login', component: User_Login},//用户登陆页面
    { path: '/User/Regsiter', component: User_Regsiter},//用户注册页面
    { path:'/User/Page', component: User_Main_Page,//用户总页面，负责侧边栏与头像显示。包含了几个子页面
        children:[
                {path:'/User/Page/Goods',component:User_Page_Goods},
                {path:'/User/Page/Cart',component:User_Page_Cart},
                {path:'/User/Page/Order',component:User_Page_Order},
        ]
    },
    { path:'/Merchant/Login',component: Merchant_Login},//商家登录页面
    { path:'/Merchant/Order',component: Merchant_Order},//商家待处理订单页面
    { path:'/Merchant/Goods',component: Merchant_Goods},//商家商品页面
    { path:'/Merchant/Shop',component: Merchant_Shop},//商家店铺页面
    { path:'/Delivery_staff/Login',component: Delivery_staff_Login},//骑手登陆页面


    { path:'/Admin/Login',component: Admin_Login}//管理员登录页面

]
export default routes
