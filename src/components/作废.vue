<template>
    <div>
         <!--该部分为顶部栏-->
        <el-container>
            <el-header>购物车</el-header>
            <el-container>
                <el-aside width="100px">
                    <el-checkbox v-model="checked" @change="Selete_All(),Total();" >全选</el-checkbox>
                </el-aside>
                <el-main>商品</el-main>
                <el-main>单价</el-main>
                <el-main>数目</el-main>
                <el-main>总价</el-main>
            </el-container>
        </el-container>

        <!--该部分为商品栏-->
        <el-container v-for="(item) in goodsList">
            <el-container>
                <el-aside width="100px">
                <el-checkbox v-model="item.condition" @change="Selete_Sin(),Total();">选择</el-checkbox>
                </el-aside>
                <img :src="item.img"><!--图片路径（无法显示）-->
                <el-main>{{item.name}}              </el-main>
                <el-main>{{item.price}}             </el-main>
                <el-button @click="Sub(item),Total();">-     </el-button>
                <el-button @click="Add(item),Total();">+     </el-button>
                <el-main>{{item.num}}               </el-main>
                <el-main>{{ item.count }}           </el-main>
            </el-container>
        </el-container>

        <!--该部分为结算栏-->
        <el-container>
            <el-header>结算</el-header>
            <el-container>
                <el-aside width="100px">
                </el-aside>
                <el-main></el-main>
                <el-main></el-main>
                <el-main></el-main>
                <el-main>总价:{{ total }}</el-main><!--目前总价无法修改-->
                <el-button @click="Pay()">支付</el-button>
            </el-container>
        </el-container>
    </div>
</template>

<script>


export default {
    name: 'App',
    data() {
        return {
            goodsList: [
                { id: "1", name: "a", price: 100, count:0, img: "./assets/jpg/1.jpg", num: 0, condition: false },
                { id: "2", name: "b", price: 200, count:0, img: "./assets/jpg/2.jpg", num: 0, condition: false },
                { id: "3", name: "c", price: 300, count:0, img: "./assets/jpg/3.jpg", num: 0, condition: false },
                { id: "4", name: "d", price: 400, count:0, img: "./assets/jpg/4.jpg", num: 0, condition: false },
                { id: "5", name: "e", price: 500, count:0, img: "./assets/jpg/5.jpg", num: 0, condition: false },
            ],
            total: 0,
            checked: false,
            
        }
    },
    methods: {
        Selete_All() {
            alert("全选")
            var i = 0,t=this.goodsList.length
            while(i<t)
            {
                this.goodsList[i].condition=this.checked;
                i++
            }
            Total()
        },
        Selete_Sin(item,condition){
            item.condition = condition;
            Total()
        },
        Add(item)
        {
            item.num++;
            item.count=item.num*item.price;
            Total(this)
        },
        Sub(item)
        {
            
            if(item.num >0)
            {
                item.num--
            }
            else
            {
                alert("数量错误!");
            }
            item.count=item.num*item.price;
            Total(this);
        },
        Total(that)
        {
            var i = 0,t=that.goodsList.length,sum=0
            while(i<t)
            {
                if(that.goodsList[i].condition == true)
                {
                    sum+=that.goodsList[i].count
                }
            }
            that.total=sum
        },
        Pay()
        {
            alert("需要支付"+this.total+"元");
        }
        

    }
}
</script>
    