<template>
    <el-container>
        <el-header>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" icon="el-icon-search" @click="向后端发送搜索请求()">搜索</el-button>
                </div>
            </el-col>
        </el-header>
        <el-main>
            <div class="单个购物车区域" v-for="(Merchant, index) in merchants">
                <el-col :span="12">
                <div class="grid-content bg-purple" @click="跳转到商家页面(Merchant)">
                    id:{{ Merchant.id }}     {{ Merchant.name }}  
                </div>
            </el-col>
            </div>
        </el-main>
        <el-footer>

        </el-footer>
    </el-container>
</template>


<script>
import 全局变量 from '@/assets/全局变量.vue'
export default{
    data(){
        return{
            user_id:'',
            input:'',
            merchants:[],
        }
    },
    mounted(){
        this.user_id = this.$route.query.user_id
    },
    methods:
    {
        向后端发送搜索请求(){
            if(this.input == '')
            {
                this.Alert_Error("请输入一些内容")
            }
            else
            {
                var address = '/customer/search?data='+this.input //字符串拼接，获得后端地址
                this.axios
                .get(address)
                .then((Return_info)=>{
                    this.merchants = Return_info.data.detail
                    console.log(Return_info.data.detail)
                })
            }
        },
        跳转到商家页面(Merchant) {
            this.$router.push({
                path: '/User/Page/Merchant',
                query: {
                    user_id: this.user_id,
                    merchant_id: Merchant.id,
                    merchant_name: Merchant.name,
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
    }  
}



</script>


<style>
.IMG
{
    height: 100px;
    width: 100px;
}
.商品信息
{
    flex: auto;
    width: 150px;
    height: auto;

}
.商品信息_2
{
    flex: auto;
    width: 100px;
    height: auto;

}
.控件
{
    flex: auto;
    width: 300px;

}
.加入购物车
{
    flex: auto;
    width: 200px;
}
.单个购物车区域
{
    height: auto;
    display: flex;
    flex-direction:row;/**子类纵向排列 */
    background-color: rgb(229, 252, 252);
    border-width: 1px 0 0px 0; border-style: solid; border-color: black;
}
</style>