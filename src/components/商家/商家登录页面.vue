<template>
    <body>
    <div class="背景">
        <div class="登录框">
            <h2 class="标题文字" @click="">商家登录</h2>
            <div style="margin-top: 15px;">
                <el-input v-model="input_account" clearable="true" placeholder="输入账号" @change=""></el-input>
                <br>
                <el-input v-model="input_password" show-password="false" placeholder="输入密码" @change=""></el-input>
                <el-button type="primary" icon="el-icon-position" @click="向后端发送登录请求()">登录</el-button>
                <el-button type="primary" icon="el-icon-position" @click="跳转到注册页面()">注册</el-button>
                <el-button type="primary" icon="el-icon-position" @click="一键登录()">游客登录</el-button>
            </div>
        </div>
    </div>
    </body>
</template>
<!--注意在element ui的标签中，不要放原生函数，那样无法触发-->
<!--可以使用已经写好的测试函数Test()来测试事件能否正确触发-->

<script>

export default {
    data() 
    {
      return {
        input_password: '',
        input_account:'',
        user_id:'',
      }
    },
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
            });
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
            });
        },
        Test(value){
            /**最简单的测试函数
             * 输入即输出
             * 
             * 传入的参数：
             * 任意字符串
             */
            alert(value);
        },
        向后端发送登录请求()
        {
            /**向后端发送账号密码，进行登录 
             * 若账号密码合法，就跳转到下一页面
             * 否则弹窗提示相关信息
             * 
             * 前端发送值：
             * 用户账号：input_account
             * 用户密码：input_password
             * 
             * 后端返回值：
             * 用户id：user_id
            */
            var that = this;//用来保存当前的对象
            if(this.input_account !='' &&this.input_password !='')
            {
                this.axios
                .get(`/user/login?name=${this.input_account}&password=${this.input_password}`)//向后端接口传输
                .then((Return_info)=>{
                    if(Return_info.data == "invalid")
                    {
                        this.Alert_Error("账号或密码错误！")
                    }
                    else
                    {
                        this.user_id=Return_info.data//通过后端返回值修改用户id
                        this.跳转到总界面()//跳转到商品页面
                    }
                })
            }
            else{
                this.Alert_Error("请正确填写账号与密码！")
            }
        },
        跳转到总界面()
        {
            this.$router.push({
                path: '/User/Page',
                query:{
                    user_id:this.user_id
                }
            })
        },
        跳转到注册页面()
        {
            this.$router.push({
                path: '/Regsiter',
                query:{

                }
            })
        },
        一键登录()
        {
            this.user_id="271dcbf40c9d464398507031343c0ead"//强行修改id（对应账号jw21811）
            this.跳转到总界面()
        }
    }
  }


</script>


<style>
.登录框
{
    height: 400px;
    width: 400px;
    float: right;
    background-color: lightpink;
    position:fixed;
    left: 50%;
    margin-left: -200px;
    top:20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 400px;
    padding: 80px;

}
.背景
{
    height: 1920px;
    width: 100%;
    background-image: linear-gradient(to right, #00f2fe 0%, #4facfe 100%);
}
.标题文字{
	overflow: hidden;
	position: relative;
	padding: 10px 20px;
	color: #ffffff;
	text-decoration: none;
}
.标题文字:hover {
	color: rgb(255, 123, 123);
	border-radius: 5px;
}

</style>