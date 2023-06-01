<template>
    <div class="背景">
        <el-container>
            <el-header class="顶栏" direction='vertical'>
                    <div><el-button class="退出" type="text" size="mini" icon="el-icon-position" @click="退出登录()">退出登录</el-button>customer_server_id:{{ deliver_id }}</div>
            </el-header>
            <el-container>
                <el-aside class="侧边栏" width="100px">
                    <el-tabs :tab-position="tabPosition" @tab-click="handleClick" style="height: 200px; width:100px">
                        <el-tab-pane label="待处理投诉" ></el-tab-pane>
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
            deliver_id:'',
            tabPosition:'left',
        }
    },
    created(){
        this.deliver_id=this.$route.query.deliver_id
        this.跳转到待处理投诉页面()
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
            if(tab.label == "待处理投诉")
            {
                this.跳转到待处理投诉页面()
            }
        },
        跳转到待处理投诉页面()
        {
            this.$router.push({
                path: '/客服/Page/Working',
                query:{
                }
            })
        },
        退出登录()
        {
            this.$router.push({
                path: '/客服/Login',
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