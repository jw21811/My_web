<template>
    <div class="背景">
        <el-container>
            <el-header class="顶栏" direction='vertical'>
                    <div><el-button class="退出" type="text" size="mini" icon="el-icon-position" @click="退出登录()">退出登录</el-button>merchant_id:{{ merchant_id }}</div>
            </el-header>
            <el-container>
                <el-aside class="侧边栏" width="100px">
                    <el-tabs :tab-position="tabPosition" @tab-click="handleClick" style="height: 200px; width:100px">
                        <el-tab-pane label="主页"></el-tab-pane>
                        <el-tab-pane label="在售商品"></el-tab-pane>
                        <el-tab-pane label="待处理订单"></el-tab-pane>
                        <el-tab-pane label="历史订单"></el-tab-pane>
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
            merchant_id:'',
            tabPosition:'left',
        }
    },
    created(){
        this.merchant_id=this.$route.query.merchant_id
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
            if(tab.label == "主页")
            {
                this.跳转到空白说明页面()
            }
            else if(tab.label=="在售商品")
            {
                this.跳转到商品页面()
            }
            else if(tab.label=="待处理订单")
            {
                this.跳转到处理订单页面()
            }
            else if(tab.label=="订单")
            {
                this.跳转到订单页面()
            }
            
        },
        跳转到空白说明页面()
        {
            this.$router.push({
                path: '/Merchant/Page/Shop',
                query:{
                    merchant_id:this.merchant_id
                }
            })
        },
        跳转到商品页面()
        {
            this.$router.push({
                path: '/Merchant/Page/Goods',
                query:{
                    merchant_id:this.merchant_id
                }
            }) 
        },
        跳转到处理订单页面()
        {
            this.$router.push({
                path: '/Merchant/Page/Order',
                query:{
                    merchant_id:this.merchant_id
                }
            }) 
        },
        跳转到订单页面()
        {
            this.$router.push({
                path: '/Merchant/Page/AllOrder',
                query:{
                    merchant_id:this.merchant_id
                }
            })
        },
        退出登录()
        {
            this.$router.push({
                path: '/Merchant/Login',
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
    color: #212020;
}
</style>