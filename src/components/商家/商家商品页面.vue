<template>
    <el-container>
        <el-header>
            <div>1232</div>
        </el-header>
        <el-main>
            <el-table :data=goods height="750" borderstyle="width: 100%">
                <el-table-column prop="id" label="id" sortable>
                </el-table-column>
                <el-table-column prop="name" label="品名" sortable>
                </el-table-column>
                <el-table-column prop="type" label="类型" sortable>
                </el-table-column>
                <el-table-column prop="price" label="单价" sortable>
                </el-table-column>
                <el-table-column prop="specification" label="规格">
                </el-table-column>
                <el-table-column prop="sales_volume" label="销量" sortable>
                </el-table-column>
                <el-table-column prop="是否售罄" label="售罄" sortable>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini"  type="primary" @click="修改商品状态(scope.$index)">{{ 返回按钮值(scope.$index) }}</el-button>
                        <el-button size="mini" type="danger" @click="确认删除商品(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer>
            <div>
                <el-button type="success" icon="el-icon-plus" @click="添加新商品()">添加新商品</el-button>
            </div>
        </el-footer>
    </el-container>
</template>



<script>
export default {

    data() {
        return {
            merchant_id: '',
            goods: [],
        }

    },
    mounted() {
        this.merchant_id = this.$route.query.merchant_id
        this.goods = this.获取自身商品()
    },
    methods:
    {
        添加新商品()
        {
            this.$router.push({
                path: '/Merchant/Page/Add_New_Good',
                query: {
                    merchant_id: this.merchant_id,
                }
            })
        },
        返回按钮值(index)
        {
                if(this.goods[index].is_sell_out)
                {
                    return '上架商品'
                }
                else
                {
                    return '下架商品'
                }
        },
        修改商品状态(index)
        {
            var address = `/merchant/setSoldOut?goods_id=${this.goods[index].id}&merchant_id=${this.merchant_id}`
            this.axios
            .get(address)
            .then((Return_info) => {
                if(Return_info.data.status_code == 666)
                {
                    this.Alert_Success('更改商品状态成功！')
                    this.获取自身商品()
                }
            })


        },
        向后端删除商品(index)
        {
            var address = `/merchant/deleteGoods?goods_id=${this.goods[index].id}&merchant_id=${this.merchant_id}`
            console.log(address)
            this.axios
            .get(address)
            .then((Return_info) => {
                if(Return_info.data.status_code == 666)
                {
                    this.Alert_Success('删除商品成功！')
                }
            })

        },
        获取自身商品()
        {
            var address = `/merchant/getSelfGoods?merchant_id=${this.merchant_id}`
            this.axios
            .get(address)
            .then((Return_info) => {
                this.goods = Return_info.data.detail
                this.goods.forEach( good =>{
                if(good.is_sell_out)
                {
                    good.是否售罄 = "是"
                }
                else
                {
                    good.是否售罄 = "否"
                }
                console.log(good)
            })
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
    确认删除商品对话(内容, 标题, 取消文本, 确认文本, 取消弹出文本, 确认弹出文本, index) {
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
                this.向后端删除商品(index)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 取消弹出文本
                });
            });
        },
        确认删除商品(index) {
            this.确认删除商品对话(
                '确定删除商品？',
                '删除商品',
                '再想想',
                '确定',
                '无事发生',
                '删除商品成功!',
                index
            )
        },
    }    
}



</script>

<style>
.单个购物车区域 {
    height: auto;
    display: flex;
    flex-direction: row;
    /**子类纵向排列 */
    background-color: rgb(229, 252, 252);
    border-width: 1px 0 0px 0;
    border-style: solid;
    border-color: black;
}
</style>