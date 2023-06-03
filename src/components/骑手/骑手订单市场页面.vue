<template>
    <div class="背景">
        <div class="单个订单区域" v-for="(detail, index) in 订单列表">
            <div class="划分区域_子类纵向排列">
                <div>订单id:<br>{{ detail.order.id }}</div>
                <div>下单时间：<br>{{ detail.order.time }}</div>
                <div>
                    <el-button type="primary" @click="确认接单(detail.order.id)">接单</el-button>
                </div>
            </div>
            <div class="划分区域_子类纵向排列">
                <div>商家名称:<br>{{ detail.merchantInfo.name }}</div>
                <div>商家地址:<br>{{ detail.merchantInfo.address }}</div>
                <div>配送地址：<br>{{ detail.order.customer_address }}</div>
                <div>订单总额：<br>{{ detail.order.total_price }} 元</div>
            </div>
            <div class="划分区域_子类纵向排列">
                <div>顾客昵称:<br>{{ detail.customerInfo.nickname }}</div>
                <div>顾客电话:<br>{{ detail.customerInfo.phone }}</div>
            </div>
        </div>
    </div>
</template>
    
    
    
<script>

export default {

    data() {
        return {
            deliver_id: '',
            订单列表: []
        }
    },
    mounted() {
        this.deliver_id = this.$route.query.deliver_id
        this.向后端获取订单()

    },
    methods:
    {
        向后端获取订单() {
            var address = '/deliver/getOrderMarket'
            this.axios
                .get(address)
                .then((Return_info) => {
                    if (Return_info.data.status_code == 666) {
                        this.订单列表 = Return_info.data.detail
                    }
                    else {
                        this.Alert_Error(Return_info.data.detail)
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
        向后端发送接单请求(id) {
            var address = '/deliver/acceptOrder?deliver_id=' + this.deliver_id + '&order_id=' + id
            console.log(address)
            this.axios
                .get(address)//向后端接口传输
                .then((Return_info) => {
                    if (Return_info.data.status_code == 666) {
                        this.Alert_Success('接单成功！')
                        this.向后端获取订单()
                    }
                    else
                    {
                        this.Alert_Error(Return_info.data.detail)
                    }
                })
        },
        确认接单(id) {
            this.确认接单对话(
                '确定接单？',
                '接单',
                '再想想',
                '确定',
                '无事发生',
                '接单成功!',
                id
            )
        },
        确认接单对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, id) {
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
                this.向后端发送接单请求(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
    }

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