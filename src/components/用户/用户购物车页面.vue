<template>
    <div>
        <div class="单个购物车区域" v-for="(Merchant, index) in 购物车列表">
            <el-container>
                <el-header>{{ Merchant.商家名称 }}</el-header>
                <el-main>
                    <div v-for="(Good, index) in Merchant.商品">
                        <el-row :span="6">
                            <el-col :span="2"><div></div></el-col>
                            <el-col :span="4"><div>品名 :    {{ Good.商品名称 }}</div></el-col>
                            <el-col :span="4"><div>规格 :    {{ Good.商品规格 }}</div></el-col>
                            <el-col :span="4"><div>单价 :    {{ Good.商品单价 }}</div></el-col>
                            <el-col :span="4"><el-input-number v-model="Good.商品数量" @change="handleChange" :min="0" :max="99" label="描述文字"></el-input-number></el-col>
                        </el-row>
                    </div>
                </el-main>
                <el-footer>
                        <el-container>
                            <el-col :span="2">备注:</el-col>
                        <el-col :span="8">
                        <div>
                            <el-input v-model=Merchant.备注 placeholder=""></el-input>
                        </div>
                        </el-col>
                        <el-col :span="2">配送地址:</el-col>
                        <el-col :span="8">
                        <div>
                            <el-input v-model=Merchant.配送地址 placeholder=""></el-input>
                        </div>
                        </el-col>
                        <el-col :span="4"><div>总价:    {{ 计算订单总价(Merchant) }}  元</div></el-col>
                        <el-col :span="4"><div><el-button type="primary" @click="确认生成订单(Merchant)">提交订单</el-button></div></el-col>
                        </el-container>
                </el-footer>
            </el-container>

        </div>
    </div>
</template>

<script>
import 全局变量 from '@/assets/全局变量.vue'
export default{
    data(){
        return{
            user_id:'',
            购物车列表:[],
        }
    },
    created(){
        this.user_id = this.$route.query.user_id
        this.购物车列表 = 全局变量.本地购物车列表
    },
    methods:
    {   
        计算订单总价(Merchant)
        {
            var total = 0
            Merchant.商品.forEach(Good => {
                total += Good.商品单价 * Good.商品数量
            })
            return total
        },
        
        确认生成订单(Merchant)
        {
            this.确认生成订单对话(
                '确定生成订单？',
                '生成订单',
                '再想想',
                '确定',
                '未生成订单',
                '生成订单成功!',
                Merchant
            )
        },
        向后端发送订单(Merchant)
        {
            var address='/customer/uploadOrder?customer_id=' + this.user_id +'&goods=['
            Merchant.商品.forEach((单件商品及其信息)=>{
                if(单件商品及其信息.商品数量 == 0)
                {
                    
                }
                else
                {
                    var Good = {}
                    Good.id = 单件商品及其信息.商品id
                    Good.specification = 单件商品及其信息.商品规格
                    Good.num = 单件商品及其信息.商品数量
                    address += JSON.stringify(Good)
                    address += ',' 
                }
            })
            address = address.substring(0,address.length-1)
            address += ']&'
            address += 'notes='
            address += Merchant.备注
            address += '&customer_address='
            address += Merchant.配送地址
            console.log(address)
            
            this.axios
            .get(address)
            .then((Return_info)=>{
                if(Return_info != 'ok')
                {
                    this.Alert_Error('未成功上传订单')
                }
                else
                {
                    this.Alert_Success('成功上传订单')
                    this.购物车列表 = this.购物车列表.filter((Order) => {return Order.商家id !== Merchant.商家id})
                    全局变量.本地购物车列表 = this.购物车列表
                }
            })
        },
        确认生成订单对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本,Merchant) {
            /**简易的对话框
             * 当前为其分配了“向后端发送商品信息”的函数
             * 传入参数已经用中文说明
             */
            this.$confirm(内容, 标题, {
                confirmButtonText: 确认文本,
                cancelButtonText: 取消文本,
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 确认弹出文本
                });
                this.向后端发送订单(Merchant)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
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
.IMG
{
    height: 100px;
    width: 100px;
}
.商品信息
{
    flex: auto;
    width: 400px;
    height: auto;
}
.控件
{
    flex: auto;
    width: auto;
    text-align:center;

}
.加入购物车
{
    flex: auto;
    width: 100px;
    text-align:center
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