<template>
    <el-container>
        <el-header>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-button type="primary" icon="el-icon-back" @click="返回搜索页面()">返回</el-button>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    {{ this.merchant_name }}
                </div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg-purple-light">
                    <el-button size="mini" type="primary" icon="el-icon-refresh" @click="向后端获取商家商品()">刷新</el-button>
                </div>
            </el-col>
            <el-col :span="1">
                <div class="grid-content bg-purple-light">
                    
                </div>
            </el-col>
        </el-header>
        <el-main>
            <div class="单个购物车区域" v-for="(Good, index) in goods">
                    <el-col :span="4">
                        <div>
                            {{ Good.name }}
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                          <!--售出 {{ Good.sales_volume }} 份-->  
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div>
                           规格: 
                           <el-select v-model="format[index]" placeholder="请选择" :disabled=Good.is_sell_out>
                                <el-option
                                    v-for="item in Good.specification"
                                    :key = index2
                                    :label="item"
                                    :value="item">
                                </el-option>
                            </el-select>
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                            单价: {{ Good.price }} 元
                        </div>
                    </el-col>
                    <el-col :span="4">
                        <div>
                            <el-button type="primary" icon="el-icon-shopping-cart-full" :disabled=Good.is_sell_out @click="添加入购物车(Good,index)">添加入购物车</el-button>
                        </div>
                    </el-col>
            </div>
        </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>



<script>
import 全局变量 from '@/assets/全局变量.vue'
export default{

    data(){
        return{
            user_id:'',
            merchant_id:'',
            merchant_name:'',
            goods:[],
            format:[],
        }

    },
    mounted(){
        this.user_id = this.$route.query.user_id
        this.merchant_id = this.$route.query.merchant_id
        this.merchant_name = this.$route.query.merchant_name
        this.向后端获取商家商品()
    },  
    methods:
    {
        添加入购物车(Good,index)
        {
            if(this.format[index]==null)
            {
                this.Alert_Error('请选择商品规格')
                return
            }
            for(var i = 0; i < 全局变量.本地购物车列表.length; i++)
            {
                if(全局变量.本地购物车列表[i].商家id === this.merchant_id)
                {
                    for(var j=0; j <全局变量.本地购物车列表[i].商品.length; j++)//若购物车已存在该商家的信息
                    {
                        if(全局变量.本地购物车列表[i].商品[j].商品id === Good.id)//若购物车已存在该商家相同商品的信息
                        {
                            if(全局变量.本地购物车列表[i].商品[j].商品规格 === this.format[index])//若商品规格相同
                            {
                                全局变量.本地购物车列表[i].商品[j].商品数量 += 1//直接数量+1
                                //this.Alert_Success('存在商品记录')
                                return
                            }
                        }
                    }
                    var good = {}
                    good.商品id = Good.id
                    good.商品名称 = Good.name
                    good.商品规格 = this.format[index]
                    good.商品数量 = 1;
                    good.商品单价 = Good.price
                    全局变量.本地购物车列表[i].商品.push(good)
                    //this.Alert_Success('新建商品记录')
                    return
                }
            }
            var good = {}
            good.商品id = Good.id
            good.商品名称 = Good.name
            good.商品规格 = this.format[index]
            good.商品数量 = 1;
            good.商品单价 = Good.price
            var merchant = {}
            merchant.商家id = this.merchant_id
            merchant.商家名称 = this.merchant_name
            merchant.配送地址 = ''
            merchant.备注 = ''
            merchant.商品 = []
            merchant.商品.push(good)
            全局变量.本地购物车列表.push(merchant)
            //this.Alert_Success('新建商家记录')
            return
        },
        换算商品单价(Good,index)
        {
            var i = 0
            for(; i < Good.商品规格.length; i++)
            {
                if(this.format[index] === Good.商品规格[i])
                {
                   return Good.商品价格[i]
                }
            }
            return 0
        },
        向后端获取商家商品()
        {
            var address = '/customer/getGoodsById?merchant_id='+ this.merchant_id //字符串拼接，获得后端地址
                this.axios
                .get(address)
                .then((Return_info)=>{
                    this.goods =  Return_info.data.detail
                    console.log(this.goods)
                })
        },
        返回搜索页面()
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
.单个购物车区域
{
    height: auto;
    display: flex;
    flex-direction:row;/**子类纵向排列 */
    background-color: rgb(229, 252, 252);
    border-width: 1px 0 0px 0; border-style: solid; border-color: black;
}
</style>