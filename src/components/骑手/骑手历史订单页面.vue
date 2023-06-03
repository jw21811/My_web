<template>
    <div class="背景">
        <div class="单个订单区域" v-for="(Order, index) in 订单列表">
            <div class="划分区域_子类纵向排列">
                <div>订单id:<br>{{ Order.id }}</div>
                <div>下单时间：<br>{{ Order.订单下单时间 }}</div>
                <div>
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

        //此处的代码用于在页面创建时就获得用户的订单信息
        var address = '/deliver/getHistoryOrder?deliver_id=' + this.deliver_id
        console.log(address)
        this.axios
            .get(address)
            .then((Return_info) => {
                this.订单列表 = Return_info.data.detail
            })

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