<template>
    <div class="背景">
        <div class="单个订单区域" v-for="(Order, index) in 订单列表">
            <div class="划分区域_子类纵向排列">
                <div>订单id:<br>{{ Order.id }}</div>
                <div>下单时间：<br>{{ Order.订单下单时间 }}</div>
                <div>
                    <el-button type="danger" @click="确认放弃订单(Order.id)">取消配送</el-button>
                    <el-button type="primary" @click="确认完成配送(Order.id)">完成配送</el-button>
                </div>
            </div>
            <div class="划分区域_子类纵向排列">
                <div>商家地址:<br>{{ Order.订单商家地址 }}</div>
                <div>配送地址：<br>{{ Order.订单配送地址 }}</div>
                <div>顾客电话:<br>{{ Order.顾客电话 }}</div>
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
        this.向后端获取待处理订单()

        
    },
    methods:
    {
        向后端获取待处理订单() {
            var address = '/deliver/getWorkingOrder?deliver_id=' + this.deliver_id
            console.log(address)
            this.axios
                .get(address)
                .then((Return_info) => {
                    if(Return_info.data.status_code == 666)
                    {
                        this.订单列表 = Return_info.data.detail
                    }
                    else
                    {
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
        放弃订单(id) {
            var address = `/deliver/giveUpOrder?deliver_id=${this.deliver_id}&order_id=${id}`
            this.axios
                .get(address)//向后端接口传输
                .then((Return_info) => {
                    if(Return_info.data.status_code == 666)
                    {
                        this.Alert_Success('弃单成功')
                        this.向后端获取待处理订单()
                    }
                    else
                    {
                        this.Alert_Error(Return_info.data.detail)
                    }
                })
        },
        完成配送()
        {
            var address = `/deliver/completeOrder?deliver_id=${this.deliver_id}&order_id=${id}`
            this.axios
                .get(address)//向后端接口传输
                .then((Return_info) => {
                    if(Return_info.data.status_code == 666)
                    {
                        this.Alert_Success('配送成功')
                        this.向后端获取待处理订单()
                    }
                    else
                    {
                        this.Alert_Error(Return_info.data.detail)
                    }
                })
        },
        确认放弃订单(id) {
            this.确认放弃订单对话(
                '确定放弃订单？',
                '放弃订单',
                '再想想',
                '确定',
                '无事发生',
                '放弃订单成功!',
                id
            )
        },
        确认放弃订单对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, id) {
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
                this.放弃订单(id)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
        确认完成配送(id) {
            this.确认完成配送对话(
                '确定完成配送？',
                '完成配送',
                '再想想',
                '确定',
                '无事发生',
                '完成配送成功!',
                id
            )
        },
        确认完成配送对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, id) {
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
                this.完成配送(id)
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