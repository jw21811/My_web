<template>
    <div class="背景">
        <div class="单个订单区域" v-for="(Order, index) in 订单列表">
            <div class="划分区域_子类纵向排列">
                <div>订单id:<br>{{ Order.order.id }}</div>
                <div>提交时间：<br>{{ Order.order.time }}</div>
                <div>订单状态：<br>{{ Order.order.status }}</div>
            </div>
            <div class="分隔">
                <div class="划分区域_子类纵向排列">
                    订单详情:
                    <el-button type="primary" :disabled=是否允许取消订单(Order.order.status)
                        @click="确认取消订单(Order.order.id)">取消订单</el-button>
                </div>
            </div>
            <div class="划分区域_子类纵向排列">
                <div>品名:</div>
                <div v-for="(good, index) in Order.detail">
                    <br>{{ good.goodsDetail.name }}
                </div>
            </div>
            <div class="划分区域_子类纵向排列">
                <div>规格:</div>
                <div v-for="(good, index) in Order.detail">
                    <br>{{ good.orderDetail.specification }}
                </div>
            </div>
            <div class="划分区域_子类纵向排列">
                <div>数量:</div>
                <div v-for="(good, index) in Order.detail">
                    <br>{{ good.orderDetail.num }}
                </div>
            </div>
        </div>
    </div>
</template>



<script>

export default {

    data() {
        return {
            user_id: '',
            订单列表: [],
        }
    },
    mounted() {
        this.user_id = this.$route.query.user_id
        this.向后端获取订单信息()
    },
    methods:
    {
        向后端取消订单(id) {
            var address = `/customer/cancelOrder?order_id=${id}`
            this.axios
                .get(address)
                .then((Return_info) => {
                    if (Return_info.data.status_code == 666) {
                        this.Alert_Success("取消订单成功！")
                        this.向后端获取订单信息()
                    }
                    else {
                        this.Alert_Success("取消订单失败！")
                        console.log(Return_info.data.detail)
                    }
                })
        },
        是否允许取消订单(status) {
            if (status === 'Pending' || status === 'Preparing') {
                return false
            }
            return true
        },
        向后端获取订单信息() {
            var address = '/customer/getSelfOrders?customer_id=' + this.user_id
            this.axios
                .get(address)
                .then((Return_info) => {
                    if (Return_info.data.status_code == 666) {
                        this.订单列表 = Return_info.data.detail
                        console.log(this.订单列表)
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
        确认取消订单对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, id) {
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
                this.向后端取消订单(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
        确认取消订单(id) {
            this.确认取消订单对话(
                '确定取消订单？',
                '取消订单',
                '再想想',
                '确定',
                '无事发生',
                '',
                id
            )
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