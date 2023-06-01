<template>
    <body>
    <div class="背景">
        <div class="登录框">
            <h2 class="标题文字" @click="">丑单 3</h2>
            <div style="margin-top: 15px;">
                <el-button type="primary" icon="el-icon-position" @click="跳转到用户登录界面()">用户登录</el-button>
                <el-button type="primary" icon="el-icon-position" @click="跳转到商户登录界面()">商户登录</el-button>
                <el-button type="primary" icon="el-icon-position" @click="跳转到骑手登录界面()">骑手登录</el-button>
                <el-button type="primary" icon="el-icon-position" @click="跳转到管理员登录界面()">管理员登录</el-button>
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
        跳转到管理员登录界面()
        {
            this.$router.push({
                path: '/Admin/Login',
            })
        },
    }
}

</script>