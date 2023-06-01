<template>
  <div>
  <div v-for="(merchant,index) in 商品列表">
  <div class="merchant-detail">
    <h2 class="merchant-name">name(名称):{{ merchant.name }}</h2>
    <p class="merchant-info">Address(地址): {{ merchant.address }}</p>
    <p class="merchant-info">Contact(联系): {{ merchant.contact }}</p>
    <p class="merchant-info">SellMoney(营业额): {{ merchant.sellmoney }}</p>
    <!-- 其他商家信息展示区域 -->
    
    <h3>投诉页面</h3>
    <form @submit.prevent="submitComplaint">
      <label for="name">Name(名称):</label>
      <input type="text" id="name" v-model="complaint.name" required>
      <label for="email">Email(邮箱):</label>
      <input type="email" id="email" v-model="complaint.email" required>
      <label for="message">Message(信息):</label>
      <textarea id="message" v-model="complaint.message" required></textarea>
      <button type="submit">Submit(提交)</button>
    </form>
  </div>
  </div>
  <p>Business Status: {{ merchant.businessStatus ? 'Open' : 'Closed' }}</p>
  <button @click="toggleBusinessStatus">Change Business Status</button>
  </div>
</template>

<script>
import 全局变量 from '@/assets/全局变量.vue'
export default {
  data() {
    return {
      商品列表:[],
      merchantId: null,
      merchant: {},
      /*merchant: {
        name: "",
        address: "",
        contact: "",
        sellmoney: ""
        // 其他商家信息
      },*/
      complaint: {
        name: "",
        email: "",
        message: ""
      }
    };
  },
  mounted() {
    this.fetchMerchantInfo();
    this.商品列表 = 全局变量.本地商品列表
    console.log(全局变量.本地商品列表)
  },
  methods: {
    fetchMerchantInfo() {
      // 发起HTTP请求到后端，传递商家ID
      // 使用axios或其他HTTP库发送请求
      this.axios
        .get(`/merchant/getmerchantInfoByld?merchantld=${this.merchantId}`)
        .then(response => {
          this.merchant = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitComplaint() {
      // 发送投诉信息到后端
      // 使用axios或其他HTTP库发送请求
      // 示例中使用setTimeout模拟请求延迟和成功的情况
      setTimeout(() => {
        console.log("Complaint submitted:", this.complaint);
        // 清空表单数据
        this.complaint = {
          name: "",
          email: "",
          message: ""
        };
      }, 2000);
    },
    toggleBusinessStatus() {
      // 发送请求改变商家经营状态
      // 示例中使用setTimeout模拟请求延迟和成功的情况
      setTimeout(() => {
        this.merchant.businessStatus = !this.merchant.businessStatus;
        console.log("Business status changed:", this.merchant.businessStatus);
      }, 2000);
    }
  }
};
</script>

<style>
.merchant-detail {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.merchant-name {
  font-size: 24px;
  margin-bottom: 10px;
  background-color: rgb(229, 252, 252);
}

.merchant-info {
  font-size: 16px;
  margin-bottom: 5px;
  background-color: rgb(229, 252, 252);
}

h3 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}

form {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}
input,
  textarea {
    font-size: 16px;
    padding: 5px;
    margin-bottom: 10px;
  }
  
  textarea {
    height: 100px;
  }
  
  button {
    font-size: 16px;
    padding: 5px 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    cursor: pointer;
  }
  </style>
  