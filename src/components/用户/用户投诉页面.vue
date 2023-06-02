<template>
    <div class="DIV_Input">
        <el-input type="textarea" autosize placeholder="请输入标题" v-model="cache_name">
        </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="请输入投诉内容" v-model="cache_msg">
        </el-input>
        <el-button type="primary" icon="el-icon-plus" @click="Updata()">留言</el-button>
        <div>
        </div>

    </div>
</template>
<script>
export default {

    data() {
        return {
            user_id:'',
            cache_name:'',
            cache_msg:'',
        }
    },
    created(){
        this.user_id = this.$route.query.user_id
    },
    methods:
    {
        Updata()
        {
            if(this.cache_msg == '')
            {
                this.Alert_Error('投诉内容不能为空')
                return;
            }
            if(this.cache_name == '')
            {
                this.Alert_Error('投诉对象不能为空')
                return
            }
            console.log(this.cache_name)
            console.log(this.cache_msg)
            this.向后端发送投诉()
        },
        向后端发送投诉()
        {
            var address = '/customer/complaint?customer_id=' + this.user_id + '&title=' + this.cache_name + '&msg=' + this.cache_msg
            this.Alert_Success('正在上传')
            this.axios
            .get(address)
            .then((Return_info)=>{
                if(Return_info != 'ok')
                {
                    this.Alert_Error('未成功上传投诉')
                }
                else
                {
                    this.Alert_Success('成功上传投诉')
                    this.cache_name = ''
                    this.cache_msg = ''
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

.DIV_Input
{
    margin: left;
    width: 20%;
    height: 10%;
    /** background-color: antiquewhite; */
}
.DIV_Display
{
    margin: left;
    flex: auto;
    width: 100%;
    height: 100px;
}

</style>