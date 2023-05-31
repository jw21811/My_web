<template>
    <div>
        <div class="单个购物车区域" v-for="(Merchant, index) in 购物车列表">
            <el-container>
                <el-header>{{ Merchant.商家名称 }}</el-header>
                <el-main>
                    <div v-for="(Good, index) in Merchant.商品">
                        <el-row :span="6">
                            <el-col :span="4"><div>品名:{{ Good.商品名称 }}</div></el-col>
                            <el-col :span="4"><div>规格:{{ Good.商品规格 }}</div></el-col>
                            <el-col :span="4"><div>单价:{{ Good.商品单价 }}</div></el-col>
                            <el-col :span="4"><div>数量:{{ Good.商品数量 }}</div></el-col>
                        </el-row>
                    </div>
                </el-main>
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
            购物车列表:[]
        }
    },
    mounted(){
        this.user_id = this.$route.query.user_id
        this.购物车列表 = 全局变量.本地购物车列表
    },
    methods:
    {   
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