//此区域增加子页面
import five from '../components/作废'
import Login from '../components/登录页面'
import Regsiter from '../components/注册页面'
import Main_Page from '../components/总页面'
import Page_Goods from '../components/商品浏览页面'
import Page_Cart from '../components/购物车页面'
import Page_Order from '../components/订单页面'
 
//配置路由
const routes = [
    { path:'/',component:Login},
    { path: '/Login', component: Login},//登陆页面
    { path: '/Regsiter', component: Regsiter},//注册页面
    { path:'/Page', component: Main_Page,
        children:[
                {path:'/Page/five',component:five},
                {path:'/Page/Goods',component:Page_Goods},
                {path:'/Page/Cart',component:Page_Cart},
                {path:'/Page/Order',component:Page_Order},
        ]},//总页面，负责侧边栏与头像显示。包含了以下几个子页面



]
export default routes
