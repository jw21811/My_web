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
                    {{ Merchant.商家名称 }}
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
                /*
                var address = '/user/search?data='+this.input //字符串拼接，获得后端地址
                this.axios
                .get(address)
                .then((Return_info)=>{
                    this.merchants = Return_info
                    console.log(Return_info)
                })
                */
               this.merchants = 全局变量.本地购物车列表
            }
        },
        跳转到商家页面(Merchant) {
            this.$router.push({
                path: '/User/Page/Merchant',
                query: {
                    user_id: this.user_id,
                    merchant_id: Merchant.商家id,
                    merchant_name:Merchant.商家名称,
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
    /*
            确认加入购物车对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, index) {
            /**简易的对话框
             * 当前为其分配了“向后端发送商品信息”的函数
             * 传入参数已经用中文说明
             * 若出现错误，会弹出“取消文本”
             
             this.$confirm(内容, 标题, {
                confirmButtonText: 确认文本,
                cancelButtonText: 取消文本,
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 确认弹出文本
                });
                this.向后端发送商品信息(index)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
    
    
    */
    
    
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