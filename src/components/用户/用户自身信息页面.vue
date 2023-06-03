<template>
    <div>
        <el-row>
            <el-col :span="24">
                <div>姓名:{{ user_info.name }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div>昵称:{{ user_info.nickname }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div>电话号码:{{ user_info.phone }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" icon="el-icon-tickets" @click="修改个人信息()">修改个人信息</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {

    data() {
        return {
            user_id: '',
            user_info: {}
        }
    },
    mounted() {
        this.user_id = this.$route.query.user_id
        this.用户获取自身信息()
    },
    methods:
    {
        修改个人信息() {
            this.$router.push({
                path: '/User/Page/Change_Info',
                query: {
                    user_id: this.user_id,
                }
            })
        },

        用户获取自身信息() {
            var address = `/customer/getSelfInfo?id=${this.user_id}`
            this.axios
                .get(address)
                .then((Return_info) => {
                    if (Return_info.data.status_code != 666) {
                        this.Alert_Error(Return_info.data.detail)
                    }
                    else {
                        this.user_info = Return_info.data.detail
                    }
                })
        },
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
    }
}
</script>