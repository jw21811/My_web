<template>
    <el-main class="录入框">
        <el-form label-position="top" label-width="80px" :model="formLabelAlign">
            <el-form-item label="昵称">
                <el-input v-model="input_nickname" placeholder="留空以不修改"></el-input>
            </el-form-item>
            <el-form-item label="旧密码">
                <el-input v-model="input_oldPassword" show-password="false" placeholder="必须正确"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="input_newPassword" show-password="false" placeholder="留空以不修改"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
                <el-input v-model="input_name" placeholder="留空以不修改"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
                <el-input v-model="input_phone" placeholder="留空以不修改"></el-input>
            </el-form-item>
        </el-form>
        <el-col :span="24">
            <el-button type="primary" icon="el-icon-upload2" @click="上传更改()">上传更改</el-button>
        </el-col>
    </el-main>
</template>

<script>
export default {

    data() {
        return {
            user_id: '',
            input_oldPassword: '',
            input_newPassword: '',
            input_phone: '',
            input_name: '',
            input_nickname: '',
        }
    },
    created() {
        this.user_id = this.$route.query.user_id

    },
    methods:
    {
        返回()
        {
            this.$router.back()
        },
        上传更改()
        {
            if(this.input_newPassword.length>16 ||this.input_newPassword.length<6)
            {
                this.Alert_Error("新密码长度应在6至16位之间")
                return
            }
            var address = `/customer/updateSelfInfo?id=${this.user_id}&oldPassword=${this.input_oldPassword}&newPassword=${this.input_newPassword}&name=${this.input_name}&phone=${this.input_phone}&nickname=${this.input_nickname}`
            this.axios
                .get(address)
                .then((Return_info) => {
                    if (Return_info.data.status_code != 666) {
                        this.Alert_Error(Return_info.data.detail)
                    }
                    else {
                        this.Alert_Success('修改成功！')
                        this.返回()
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

<style>
.录入框 {
    height: 1000px;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px;

}
</style>