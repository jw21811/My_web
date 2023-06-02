<template>
    <div class="背景">
        <div class="单个订单区域" v-for="(Order, index) in 订单总表">
                <div class="划分区域_子类纵向排列">
                    <div>订单id:<br>{{ Order.detail.orderDetail.order_id }}</div>
                    <div>下单时间：<br>{{ Order.order.time }}</div>
                    <div>
                        <el-button type="primary" @click="确认完成制作(Order.id)">完成制作</el-button>
                    </div>
                </div>
                <div class="划分区域_子类纵向排列">
                    <div>配送地址：<br>{{ Order.order.customer_address }}</div>
                    <div>订单总价：<br>{{ Order }} 元</div>
                </div>
                <div class="划分区域_子类纵向排列">
                    <div>品名：<br>{{ Order.订单配送地址 }}</div>
                    

                </div>
                <div class="划分区域_子类纵向排列">
                    <div>规格<br></div>

                </div>
        </div>
    </div>
</template>
    
    
    
<script>

export default {

    data() {
        return {
            merchant_id: '',
            订单总表:[],

            }
    },
    mounted() {
        this.merchant_id = this.$route.query.merchant_id

        var address = '/merchant/getPendingOrders?merchant_id=' + this.merchant_id
        console.log(address)
        this.axios
            .get(address)
            .then((Return_info) => {
                this.订单总表 = Return_info.data.detail
            })
        this.解析订单总表()
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
        向后端修改订单状态(id) {
            var address = '/merchant/setOrderStatus?merchant_id=' + this.merchant_id + '&order_id=' + id
            console.log(address)
            this.axios
                .get(address)//向后端接口传输
                .then((Return_info) => {
                    if(Return_info.data.status_code == 666)
                    {
                        this.Alert_Success('设置订单状态成功!')
                    }
                    else
                    {
                        this.Alert_Error('未能成功设置订单状态')
                        console.log(Return_info.data.detail)
                    }
                })
        },
        确认完成制作对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, id) {
            /**简易的对话框
             * 
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
                this.向后端修改订单状态(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
        确认完成制作(id) {
            this.确认完成制作对话(
                '确定完成制作？',
                '完成制作',
                '再想想',
                '确定',
                '无事发生',
                '完成制作成功!',
                id
            )
        },
    },
}



</script>
    
    
<style>
.单个订单区域 {
    height: auto;
    display: flex;
    flex-direction: row;
    /**子类纵向排列 */
    background-color: rgb(229, 252, 252);
    border-width: 1px 0 0px 0;
    border-style: solid;
    border-color: black;
}

.划分区域_子类纵向排列 {
    width: 300px;
    display: flex;
    flex-direction: column;
}

.划分区域_子类横向排列 {
    width: 300px;
    display: flex;
    flex-direction: row;
}

.分隔 {
    width: 100px;
    display: flex;
}

.背景 {
    width: auto;
    height: 100%;
    background-color: bisque;
}
</style>