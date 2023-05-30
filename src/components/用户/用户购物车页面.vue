<template>
    <div>
        <el-container>
            <div class="控件">
                <el-checkbox v-model="商品选择状态" @change="全选()">全选</el-checkbox>
            </div>
                <div class="IMG">
                    <el-button type="primary" icon="el-icon-delete" @click="移除商品(-1)">移除选中商品</el-button>
                </div>
                <div class="商品信息"></div>
                <div class="加入购物车">
                    <el-button type="primary" icon="el-icon-s-finance" size="" @click="确认生成订单()">生成订单</el-button>
                </div>
            </el-container>
        <el-container v-for="(Goods, index) in 本地购物车列表" >
            <el-container>
                <div class="控件">
                    <el-checkbox v-model="Goods.condition" @change="计算总价()">选择</el-checkbox>
                </div>
                <div class="IMG">
                    <img :src="'http://web118.vipgz6.91tunnel.com/' + Goods.thumbnail" class="IMG">
                </div>
                <el-main>
                    <div class="商品信息">
                        {{ Goods.name }}
                    </div>
                    <div class="商品信息">
                        单价：{{ Goods.price }} 元
                    </div>
                    <div class="商品信息">
                        数量：{{ Goods.num }}
                    </div>
                    <div class="商品信息">
                        小计：{{ Goods.Count }} 元
                    </div>
                </el-main>
                <div class="加入购物车">
                    <el-button type="primary" icon="el-icon-minus" @click="移除商品(index)">移除商品</el-button>
                </div>
            </el-container>
        </el-container>
        <el-container>
            总价:<strong>{{ Total }}</strong>元
        </el-container>
    </div>
</template>



<script>
export default{
    data(){
        return{
            商品选择状态:false,
            Total:0,
            user_id:'',
            购物车列表:[],
            本地购物车列表:[],
        }
    },
    created(){
        this.user_id = this.$route.query.user_id
        console.log(this.user_id);
        var address = '/cart/listByUser?userId=' + this.user_id//字符串拼接，获得后端地址
        this.axios
        .get(address)
        .then((Return_info)=>{
            this.购物车列表=Return_info.data
            this.本地购物车列表 = this.购物车列表
            this.本地购物车列表规范化()
        })
    },
    methods:
    {   
        全选()
        {
            this.本地购物车列表.forEach((Good)=>{
                Good.condition = this.商品选择状态
            })
            this.计算总价()
        },
        计算总价()
        {
            this.Total = 0
            this.本地购物车列表.forEach((Good=>{
                if(Good.condition == true)
                {
                    this.Total += Good.num*Good.price
                }
            }))
        }, 
        本地购物车列表规范化()
        {
            /**为每一个商品对象添加一个“选中属性,以及总价”
             * 方便进行全选、多选操作
             */
            this.本地购物车列表.forEach((Good)=>{
                this.$set(Good,'condition',false)
                this.$set(Good,'Count',Good.num * Good.price)
            })
        },
        确认生成订单()
        {
            this.确认生成订单对话(
                '确定生成订单？',
                '生成订单',
                '再想想',
                '确定',
                '未生成订单',
                '生成订单成功!',
            )
        },
        向后端发送订单()
        {
            var cartid =[]
            var address='/order/addCastOrder?userId=' + this.user_id +'&cartList='
            this.本地购物车列表.forEach((Good)=>{
                if(Good.condition == true)
                {
                    cartid.push(Good.cardid)
                }
            })
            this.axios
            .get(`${address}${cartid}`)
            .then((Return_info)=>{
            })
            location.reload()
            
        },
        移除商品(index)
        {
            
            if(index != -1)
            {
                this.确认移出购物车对话(
                '确定要将' + this.本地购物车列表[index].num + '件' + this.本地购物车列表[index].name + '移出购物车？',
                '移除商品',
                '算了',
                '确定',
                '没有将商品移出购物车',
                '已将商品移出购物车',
                index
                )
            }
            else
            {
                this.确认移出购物车对话(
                '确定要将选定项移出购物车？',
                '移除商品',
                '算了',
                '确定',
                '没有将商品批量移出',
                '已将商品批量移出',
                index
                )
            }

        },
        确认移出购物车对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, index) {
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
                this.向后端发送删除商品信息(index)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
        确认生成订单对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本) {
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
                this.向后端发送订单()
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
        向后端发送删除商品信息(index)
        {  
            /**若传入的index为-1，则说明处于多选删除模式
             * 否则只删除单个商品
             * 多选删除中不接收后端返回值
             * 完成删除后才一次性获取购物车信息
             */
            if(index != -1)
            {
                var address =
                    '/cart/deleteById?userId=' +
                    this.user_id +
                    '&cartId=' +
                    this.购物车列表[index].cardid
                this.axios
                    .get(address)
                    .then((Return_info) => {
                        this.购物车列表 = Return_info.data
                        this.本地购物车列表 = this.购物车列表
                        this.本地购物车列表规范化()
                    })
            }
            else
            {
                this.本地购物车列表.forEach((Good) => {
                    if (Good.condition == true) {
                        var address =
                            '/cart/deleteById?userId=' +
                            this.user_id +
                            '&cartId=' +
                            Good.cardid

                        this.axios
                            .get(address)
                            .then((Return_info) => {
                                this.购物车列表 = Return_info
                            })
                    }
                })
                this.本地购物车列表 = this.购物车列表
                this.本地购物车列表规范化()
                location.reload()
            }
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
    
</style>