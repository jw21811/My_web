//此区域增加子页面
import Login_Mode from '../components/登录模式选择'

import User_Login from '../components/用户/用户登录页面'
import User_Register from '../components/用户/用户注册页面'
import User_Main_Page from '../components/用户/用户总页面'
import User_Page_Goods from '../components/用户/用户商品浏览页面'
import User_Page_Cart from '../components/用户/用户购物车页面'
import User_Page_Order from '../components/用户/用户订单页面'
import User_Page_Merchant from '../components/用户/用户商家商品页面'
import User_Page_Main from '../components/用户/用户空白说明页面'
import User_Page_Complaint from '../components/用户/用户投诉页面'
import User_Page_Info from '../components/用户/用户自身信息页面'
import User_Page_Change_Info from '../components/用户/用户修改自身信息页面'

import Merchant_Login from '../components/商家/商家登录页面'
import Merchant_Register from '..//components/商家/商家注册页面'
import Merchant_Main_Page from '../components/商家/商家总页面'
import Merchant_Page_Order from '../components/商家/商家待处理订单页面'
import Merchant_Page_Goods from '../components/商家/商家商品页面'
import Merchant_Page_Shop from '../components/商家/商家店铺页面'
import Merchant_Page_History from '../components/商家/商家历史订单页面'
import Merchant_Page_Add_New_Good from '../components/商家/商家添加商品页面'

import Deliver_Login from '../components/骑手/骑手登录页面'
import Deliver_Register from '../components/骑手/骑手注册页面'
import Deliver_Main_Page from '../components/骑手/骑手总页面'
import Deliver_Page_Order_Market from '../components/骑手/骑手订单市场页面'
import Deliver_Page_Order_History from '../components/骑手/骑手历史订单页面'
import Deliver_Page_Order_Working from '../components/骑手/骑手待处理订单页面'
import Deliver_Page_Complaint from '../components/骑手/骑手投诉页面'


import 客服_Login from '../components/客服/客服登录页面'
import 客服_Register from '../components/客服/客服注册页面'
import 客服_Main_Page from '../components/客服/客服总页面'
import 客服_Page_Working from '../components/客服/客服工作页面'



//配置路由
const routes = [
    { path: '/', component: Login_Mode },
    { path: '/User/Login', component: User_Login },//用户登陆页面
    { path: '/User/Register', component: User_Register },//用户注册页面
    {
        path: '/User/Page', component: User_Main_Page,//用户总页面，负责侧边栏与头像显示。包含了几个子页面
        children: [
            { path: '/User/Page/Main', component: User_Page_Main},
            { path: '/User/Page/Merchant',component: User_Page_Merchant},
            { path: '/User/Page/Goods', component: User_Page_Goods },
            { path: '/User/Page/Cart', component: User_Page_Cart },
            { path: '/User/Page/Order', component: User_Page_Order },
            { path: '/User/Page/Complaint',component: User_Page_Complaint},
            { path: '/User/Page/Info',component: User_Page_Info},
            { path: '/User/Page/Change_Info',component: User_Page_Change_Info},
        ]
    },

    { path: '/Merchant/Login', component: Merchant_Login },//商家登录页面
    { path: '/Merchant/Register',component: Merchant_Register},
    {   path: '/Merchant/Page', component: Merchant_Main_Page,//商家总页面，负责侧边栏与头像显示。包含以下几个子页面
        children: [
            { path: '/Merchant/Page/AllOrder',component: Merchant_Page_History },//商家全部处理订单页面
            { path: '/Merchant/Page/Order', component: Merchant_Page_Order },//商家待处理订单页面
            { path: '/Merchant/Page/Goods', component: Merchant_Page_Goods },//商家商品页面
            { path: '/Merchant/Page/Shop', component: Merchant_Page_Shop },//商家店铺页面
            { path: '/Merchant/Page/Add_New_Good', component: Merchant_Page_Add_New_Good }
        ]
    },



    
    
    { path: '/Deliver/Login', component: Deliver_Login },//骑手登陆页面
    { path: '/Deliver/Register', component: Deliver_Register },
    { path: '/Deliver/Page', component: Deliver_Main_Page ,
        children:[
            { path: '/Deliver/Page/Order_Market', component: Deliver_Page_Order_Market},
            { path: '/Deliver/Page/Order_History',component: Deliver_Page_Order_History},
            { path: '/Deliver/Page/Order_Working', component: Deliver_Page_Order_Working },
            { path: '/Deliver/Page/Complaint',component: Deliver_Page_Complaint},
        ]
    },




    { path: '/客服/Login', component: 客服_Login },//管理员登录页面
    { path: '/客服/Register', component: 客服_Register },
    { path: '/客服/Page', component: 客服_Main_Page,
        children:[
            { path: '/客服/Page/Working', component: 客服_Page_Working }
        ]
    },

]
export default routes
