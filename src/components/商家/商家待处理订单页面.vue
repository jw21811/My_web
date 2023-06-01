<template>
   <div class="背景"> 
    <div class="单个订单区域" v-for="(Order,index) in 订单列表">
        <div class="划分区域_子类纵向排列">
            <div>订单id:<br>{{ Order.order.id }}</div>
            <div>下单时间:<br>{{ Order.order.time }}></div>
            <div>配送地址:<br>{{ Order.order.addr }}</div>
        </div>
        <div class="分隔">订单详情:</div>
        <div class="划分区域_子类纵向排列">
            <div v-for="(Good) in Order.goods">
                <div>名称:{{ Good.name}}</div>
            </div>
        </div>
        <div class="划分区域_子类纵向排列">
            <div v-for="(Good) in Order.goods">
                <div>规格:{{ Good.format}}</div>
            </div>
        </div>
        <div class="划分区域_子类纵向排列">
            <div v-for="(Good) in Order.goods">
                <div>数量:{{ Good.number}}</div>
            </div>
        </div>
    </div>
   </div>
</template>
<script>

export default{

    data(){
        return{
            user_id:'',
            订单列表:[{"order":{"id":'001',"time":'2023-5-31-17-00-00',"addr":"广西桂林"},"goods":[{"name":'cjd',"format":'large',"number":'2'},{"name":'cjd',"format":'large',"number":'2'},{"name":'cjd',"format":'large',"number":'2'}]},
                    {"order":{"id":'001',"time":'2023-5-31-17-00-00',"addr":"金鸡岭"},"goods":[{"name":'cjd',"format":'large',"number":'2'}]}],
        }
    },
    mounted(){
        this.user_id=this.$route.query.user_id
        
        /*此处的代码用于在页面创建时就获得用户的订单信息
        var address = '/merchant/getWaittingListByld?merchant=' + this.user_id
        this.axios
            .get(address)
            .then((Return_info) => {
                this.订单列表 = Return_info.data
        })
        */
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
.单个订单区域
{
    height: auto;
    display: flex;
    flex-direction:row;/**子类纵向排列 */
    background-color: rgb(229, 252, 252);
    border-width: 1px 0 0px 0; border-style: solid; border-color: black;
}
.划分区域_子类纵向排列
{
    width:300px;
    display: flex;
    flex-direction:column;
}
.划分区域_子类横向排列
{
    width:300px;
    display: flex;
    flex-direction:row;
}
.分隔
{
    width:75px;
    display: flex;
}
.背景
{
    width: auto;
    height: 100%;
    background-color: bisque;
}

    
</style>