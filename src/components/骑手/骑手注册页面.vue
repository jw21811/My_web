<template>

    <body>
        <div class="背景">
            <div class="登录框">
                <h2 class="标题文字" @click="">e-Shop</h2>
                <div style="margin-top: 15px;">
                    <el-input v-model="input_account" clearable="true" placeholder="输入账号" @change=""></el-input>
                    <el-input v-model="input_password1" show-password="false" placeholder="输入密码" @change=""></el-input>
                    <el-input v-model="input_password2" show-password="false" placeholder="确认密码" @change=""></el-input>
                    <el-input v-model="input_name" clearable="true"  placeholder="输入真实姓名" @change=""></el-input>
                    <el-input v-model="input_phone" clearable="true"  placeholder="输入手机号" @change=""></el-input>
                    <el-button type="primary" icon="el-icon-position" @click="返回()">返回</el-button>
                    <el-button type="primary" icon="el-icon-position" @click="向后端发送注册请求()">注册</el-button>

                </div>
            </div>
        </div>
    </body>
</template>

<script>


export default{
    data(){
        return{
            input_account:'',
            input_password1:'',
            input_password2:'',
            input_name:'',
            input_phone:'',
            deliver_id:'',
        }
    },
    methods:
    {
        向后端发送注册请求()
        {
            if(this.input_account =="")
            {
                this.Alert_Error('请输入账号!')
            }
            else if(this.input_password1 == '')
            {
                this.Alert_Error('请输入密码!')
            }
            else if(this.input_password2 == '')
            {
                this.Alert_Error('请确认密码!')
            }
            else if(this.input_password1 != this.input_password2)
            {
                this.Alert_Error('两次输入的密码不一致！')
            }
            else if( this.input_phone == '' || this.input_name == '')
            {
                this.Alert_Error('请填写完整信息！')
            }
            else
            {
                this.Alert_Success('正在尝试注册...')
                var address = `/deliver/register?account=${this.input_account}&password=${this.input_password1}&name=${this.input_name}&phone=${this.input_phone}`
                console.log(address)
                this.axios
                .get(address)
                .then((Return_info)=> {
                    if(Return_info.data !="OK")
                    {
                        if(Return_info.data == "isexist")
                        {
                            this.Alert_Error(`注册失败——用户已存在！错误代码：${Return_info.data}`)
                        }
                        else
                        {
                            this.Alert_Error(`注册失败——未知错误  错误代码：${Return_info.data}`)
                        }
                    }
                    else
                    {
                        this.Alert_Success("注册成功！")
                        this.$router.back()
                    }
                })
            }
        },
        返回()
        {
            this.$router.back()
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

.注册框
{
    height: 400px;
    width: 400px;
    float: center;
    background-color: lightpink;
}
.背景
{
    height: 100%;
    width: 100%;

}

</style>