<template>
    <div class="merchant-orders">
      <h2>All Processed Orders</h2>
      <ul>
        <li v-for="order in processedOrders" :key="order.id">
          <h3>OrderID(订单ID): {{ order.id }}</h3>
          <p>Time(时间): {{ order.time }}</p>
          <p>Address(地址): {{ order.addr }}</p>
          <div class="order-goods">
            <h4>Ordered Goods:</h4>
            <ul>
              <li v-for="goods in order.goods" :key="goods.name">
                <p>Name(名称): {{ goods.name }}</p>
                <p>Quantity(数量): {{ goods.number }}</p>
                <p>Format: {{ goods.format }}</p>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        processedOrders: [{
          id: "order-1",
          time: "2023-05-30 10:00",
          addr: "123 Main Street",
          goods: [
            {
              name: "Product 1",
              number: 2,
              format: "JSON"
            },
            {
              name: "Product 2",
              number: 1,
              format: "JSON"
            }
          ]
        },
        {
          id: "order-2",
          time: "2023-05-29 14:30",
          addr: "456 Elm Street",
          goods: [
            {
              name: "Product 3",
              number: 3,
              format: "JSON"
            }
          ]
        }]
      };
    },
    mounted() {
      this.fetchProcessedOrders();
    },
    methods: {
      /*fetchProcessedOrders() {
        // 发起HTTP请求到后端，传递商家ID
        axios
          .get(`/merchant/getAllListByld?id=${this.merchantId}`)
          .then(response => {
            this.processedOrders = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      }*/
    }
  };
  </script>
  
  <style>
  .merchant-orders {
    margin: 20px;
    background-color: rgb(229, 252, 252);
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  li {
    margin-bottom: 20px;
  }
  
  h3 {
    font-size: 20px;
  }
  
  h4 {
    font-size: 18px;
  }
  
  p {
    font-size: 16px;
  }
  
  .order-goods {
    margin-top: 10px;
  }
  </style>
  