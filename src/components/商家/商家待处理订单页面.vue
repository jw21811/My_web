<template>
   <div class="背景"> 
    <div class="单个订单区域" v-for="(Order,index) in 订单列表">
        <div class="划分区域_子类纵向排列">
            <div>订单id:<br>{{ Order.order.id }}</div>
            <div>下单时间:<br>{{ Order.order.time }}></div>
            <div>配送地址:<br>{{  }}</div>
</template>