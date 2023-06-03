<template>
    <el-container>
        <el-header>
            <div><el-button type="primary" icon="el-icon-position" @click="返回()">返回</el-button></div>
        </el-header>
        <el-main class="录入框">
        <el-form label-position="top" label-width="80px" :model="formLabelAlign">
            <el-form-item label="新菜品名称">
                <el-input v-model="input_name"></el-input>
            </el-form-item>
            <el-form-item label="菜品类型">
                <el-input v-model="input_type"></el-input>
            </el-form-item>
            <el-form-item label="菜品单价">
                <el-input v-model="input_price" placeholder="单位：元"></el-input>
            </el-form-item>
            <el-form-item label="规格">
                <el-input v-model="input_format" placeholder="每次一个词，以空格分隔"></el-input>
            </el-form-item>
        </el-form>
        <el-col :span="24">
            <el-button type="success" icon="el-icon-upload2" @click="上传菜品()">上传更改</el-button>
        </el-col>
    </el-main>
        <el-footer>Footer</el-footer>
    </el-container>
</template>


<script>
export default {
    data() {
        return {
            input_name: '',
            input_price: '',
            input_type: '',
            input_format: '',
            merchant_id: '',
            specification:[],
        }
    },
    mounted()
    {
        this.merchant_id = this.$route.query.merchant_id
    },
    methods:
    {
        上传菜品() {
            if (this.input_name == "") {
                this.Alert_Error('请输入菜品名称!')
            }
            else if (this.input_price == '') {
                this.Alert_Error('请输入价格!')
            }
            else if (this.input_type == '') {
                this.Alert_Error('请输入类型!')
            }
            else if (this.input_price<=0) {
                this.Alert_Error('价格应大于0')
            }
            else if (this.input_format == '') {
                this.Alert_Error('请输入规格')
            }
            else {
                this.specification=this.input_format.split(" ")
                console.log(this.specification)
                var address = `/merchant/addGoods?merchant_id=${this.merchant_id}&name=${this.input_name}&specification=${this.specification}&type=${this.input_type}&price=${this.input_price}`
                this.Alert_Success('正在尝试上传菜品...')
                this.axios
                    .get(address)
                    .then((Return_info) => {
                        console.log(address)
                        if (Return_info.data.status_code != 666) {
                            this.Alert_Error(Return_info.data.detail)
                        }
                        else {
                            this.Alert_Success("上传菜品成功！")
                            this.$router.back()
                        }
                    })
            }
        },
        返回() {
            this.$router.back()
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
.录入框 {
    height: 1000px;
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 80px;

}</style>