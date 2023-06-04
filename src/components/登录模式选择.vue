<template>
    <body>
    <div class="背景">
        <div class="登录框">
            <h2 class="标题文字" @click="">《美 团》</h2>
            <div style="margin-top: 15px;">
                <el-button type="primary" icon="el-icon-position" @click="跳转到用户登录界面()">用户登录</el-button>
                <el-button type="primary" icon="el-icon-position" @click="跳转到商户登录界面()">商户登录</el-button>
                <el-button type="primary" icon="el-icon-position" @click="跳转到骑手登录界面()">骑手登录</el-button>

                <!--<el-button type="primary" icon="el-icon-position" @click="跳转到客服登录界面()">客服登录</el-button>-->
            </div>
        </div>
    </div>
    </body>
</template>

<script>


export default {
    mounted()//页面渲染完毕后执行的动作，此处留空
    {

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
        跳转到用户登录界面()
        {
            this.$router.push({
                path: '/User/Login',
            })
        },
        跳转到商户登录界面()
        {
            this.$router.push({
                path: '/Merchant/Login',
            })
        },
        跳转到骑手登录界面()
        {
            this.$router.push({
                path: '/Deliver/Login',
            })
        },
        跳转到客服登录界面()
        {
            this.$router.push({
                path: '/客服/Login',
            })
        },
        获取用户表条数()
        {
            this.axios
                .get(`/tmp/countCustomer`)//向后端接口传输
                .then((Return_info)=>{
                    if(Return_info.data.status_code == 667)
                    {
                        this.Alert_Error("账号或密码错误！")
                    }
                    else
                    {
                        this.Alert_Error(`顾客数量:${Return_info.data.customerNum}`)
                    }
                })
        },
    }
}

</script>