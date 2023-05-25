<template>
    <div>
        <el-container>
            <el-container>
                <div class="IMG">
                </div>
                <el-main>
                    <div class="商品信息">
                    </div>
                    <div class="商品信息">
                    </div>
                </el-main>
                <div class="控件">
                </div>
                <div class="加入购物车">
                    <el-button type="primary" icon="el-icon-plus" @click="加入购物车(-1)">将选定商品加入购物车</el-button>
                </div>
            </el-container>
        </el-container>
        <el-container v-for="(Goods, index) in 本地商品列表" :key="Goods.id">
            <el-container>
                <div class="IMG">
                    <img :src="'http://web118.vipgz6.91tunnel.com/' + Goods.pthumbnail" class="IMG">
                </div>
                <el-main>
                    <div class="商品信息">
                        {{ Goods.name }}
                    </div>
                    <div class="商品信息">
                        单价：{{ Goods.price1 }}
                    </div>
                </el-main>
                <div class="控件">
                    <el-button type="primary" icon="el-icon-minus" @click="Sub(index)"></el-button>
                    {{ Goods.num }}
                    <el-button type="primary" icon="el-icon-plus" @click="Add(index)"></el-button>
                </div>
                <div class="加入购物车">
                    <el-button type="primary" icon="el-icon-plus" @click="加入购物车(index)">加入购物车</el-button>
                </div>
            </el-container>
        </el-container>
    </div>
</template>


<script>
export default{
    data(){
        return{
            user_id:'',
            商品列表:[],            
            本地商品列表:[],//记录每件商品对应的数量
        }
    },
    created(){
        var i = 0;
        var address ='/goods/list'
        this.user_id = this.$route.query.user_id
        this.axios
            .get(address)
            .then((Return_info) => {
                this.商品列表 = Return_info.data
                this.本地商品列表 = this.商品列表
                this.本地商品列表规范化()
        })
    },
    methods:
    {
        本地商品列表规范化()//将商品列表规范化为购物车中的格式，方便计数
        {
            this.本地商品列表.forEach((Good)=>{
                this.$set(Good,'num',0)
            })
        },
        加入购物车(index)
        {   
            if(index == -1)
            {
                this.确认加入购物车对话(
                    `确定要将数量不为0的商品加入购物车？`,
                    '加入购物车',
                    '我再想想',
                    '确定',
                    `未加入购物车`,
                    '加入购物车成功！',
                    index)
            }
            else if(this.本地商品列表[index].num != 0)
            {
                this.确认加入购物车对话(
                    `确定要将${this.本地商品列表[index].num}件${this.本地商品列表[index].name}加入购物车？`,
                    '加入购物车',
                    '我再想想',
                    '确定',
                    `未将${this.本地商品列表[index].name}加入购物车`,
                    '加入购物车成功！',
                    index)
            }
            else
            {
                this.Alert_Error("商品数量为0,无法加入购物车......")
            }
        },
        确认加入购物车对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, index) {
            /**简易的对话框
             * 当前为其分配了“向后端发送商品信息”的函数
             * 传入参数已经用中文说明
             * 若出现错误，会弹出“取消文本”
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
                this.向后端发送商品信息(index)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
        向后端发送商品信息(index)
        {
            if(index != -1)
            {
                var address = 
                '/cart/add?userId=' +
                this.user_id +
                '&goodsId=' +
                this.本地商品列表[index].id +
                '&num=' + 
                this.本地商品列表[index].num +
                '&price=' +
                this.本地商品列表[index].price1
            this.axios.get(address)
            this.本地商品列表[index].num = 0
            }
            else
            {
                this.本地商品列表.forEach((Good)=>{
                    if(Good.num != 0)
                    {
                        var address =
                            '/cart/add?userId=' + 
                            this.user_id +
                            '&goodsId=' +
                            Good.id +
                            '&num=' +
                            Good.num +
                            '&price=' +
                            Good.price1
                        this.axios.get(address)
                        Good.num = 0
                    }
                })
            }
        },
        Add(index)
        {
            this.本地商品列表[index].num++
        },
        Sub(index)
        {
            if(this.本地商品列表[index].num ==0)
            {
                this.Alert_Error("数量已经见底了......")
            }
            else
            {
                this.本地商品列表[index].num--
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
</style>