<template>
    <div class="背景">
        <el-container>
            <el-header class="顶栏" direction='vertical'>
                    <div><el-button class="退出" type="text" size="mini" icon="el-icon-position" @click="退出登录()">退出登录</el-button>user_id:{{ user_id }}</div>
            </el-header>
            <el-container>
                <el-aside class="侧边栏" width="100px">
                    <el-tabs :tab-position="tabPosition" @tab-click="handleClick" style="height: 200px; width:100px">
                        <el-tab-pane label="Main" ></el-tab-pane>
                        <el-tab-pane label="商品浏览"></el-tab-pane>
                        <el-tab-pane label="购物车"></el-tab-pane>
                        <el-tab-pane label="我的订单"></el-tab-pane>
                        <el-tab-pane label="投诉"></el-tab-pane>
                    </el-tabs>
                </el-aside><!--此处存放侧边栏-->
                <el-container>
                    <el-main>
                        <router-view></router-view><!--此处存放其他页面-->
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>

export default{
    data(){
        return{
            user_id:'',
            tabPosition:'left',
        }
    },
    created(){
        this.user_id=this.$route.query.user_id
        this.跳转到空白说明页面()
    },
    methods:
    {
        Alert_Error(msg) {
             /**弹窗警告
              * 类型：错误
              * 
              * 传入参数：
              * 要输出的信息:msg
              */
            this.$message({
                showClose: true,
                message: msg,
                type: 'error'
            })
        },
        Alert_Success(msg) {
             /**弹窗
              * 类型：正常
              * 
              * 传入参数：
              * 要输出的信息:msg
              */
            this.$message({
                showClose: true,
                message: msg,
                type: 'success'
            })
        },
        handleClick(tab)
        {
            /**用来处理标签页点击事件 */
            if(tab.label == "Main")
            {
                this.跳转到空白说明页面()
            }
            else if(tab.label=="商品浏览")
            {
                this.跳转到商品浏览页面()
            }
            else if(tab.label=="购物车")
            {
                this.跳转到购物车页面()
            }
            else if(tab.label=="我的订单")
            {
                this.跳转到我的订单页面()
            }
            else if(tab.label == "投诉")
            {
                this.Alert_Error('投诉')
                this.跳转到用户投诉页面()
            }
        },
        跳转到空白说明页面()
        {
            this.$router.push({
                path: '/User/Page/Info',
                query:{
                    user_id:this.user_id
                }
            })
        },
        跳转到商品浏览页面()
        {
            this.$router.push({
                path: '/User/Page/Goods',
                query:{
                    user_id:this.user_id
                }
            }) 
        },
        跳转到购物车页面()
        {
            this.$router.push({
                path: '/User/Page/Cart',
                query:{
                    user_id:this.user_id
                }
            }) 
        },
        跳转到我的订单页面()
        {
            this.$router.push({
                path: '/User/Page/Order',
                query:{
                    user_id:this.user_id
                }
            })
        },
        跳转到用户投诉页面()
        {
            this.$router.push({
                path: '/User/Page/Complaint',
                query:{
                    user_id:this.user_id
                }
            })
        },
        退出登录()
        {
            this.$router.push({
                path: '/User/Login',
                query:{
                }
            })
        },  
    }
}

</script>

<style>
.退出
{
    color: #000;
}
</style>