<template>
  <div class="merchant-goods">
    <h2>商品名称</h2>
    
    <ul>
      
      <li v-for="goods in merchantGoods" :key="goods.name">
          <h3>名称: {{ goods.name }}</h3>
        <p>规格: {{ goods.format }}</p>
        <p>价格: {{ goods.price }}</p>
        <p>数量: {{ goods.saledNumber }}</p>
        <button @click="removeGoods(goods.id)">删除商品</button>
      
    </li>
    </ul>
    
    <form @submit.prevent="addNewGoods">
      <h3>添加商品</h3>
      <label for="name">名称:</label>
      <input type="text" id="name" v-model="newGoods.name" required>
      <label for="format">规格:</label>
      <input type="text" id="format" v-model="newGoods.format" required>
      <label for="price">价格:</label>
      <input type="number" id="price" v-model="newGoods.price" required>
      <label for="saledNumber">数量:</label>
      <input type="number" id="saledNumber" v-model="newGoods.saledNumber" required>
      <button type="submit">添加</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      merchantGoods: [
        {
          name: "Product 1",
          format: "JSON",
          price: 10,
          saledNumber: 50
        },
        {
          name: "Product 2",
          format: "JSON",
          price: 20,
          saledNumber: 30
        },
        {
          name: "Product 3",
          format: "JSON",
          price: 15,
          saledNumber: 40
        }
        // 其他商品信息
      ],


      newGoods: {
        name: "",
        format: "",
        price: 0,
        saledNumber: 0
      }
    };
  },
  mounted() {

  },
  methods: {
    addNewGoods() {
      // 将新商品添加到商家商品列表
      this.merchantGoods.push({ ...this.newGoods });

      // 清空表单数据
      this.newGoods = {
        name: "",
        format: "",
        price: 0,
        saledNumber: 0
      };

      axios
        .post("/merchant/addGoods", {
          merchantId: this.merchantId,
          goods: { ...this.newGoods }
        })
        .then(response => {
          // 请求成功后，将新菜品添加到商家商品列表
          this.merchantGoods.push({ ...this.newGoods });

          // 清空表单数据
          this.newGoods = {
            name: "",
            format: "",
            price: 0,
            saledNumber: 0
          };

          console.log("New goods added successfully!");
        })
        .catch(error => {
          console.error(error);
        });
    },
    
    updatePrice(goods) {
    axios
      .post("/merchant/updateGoods", {
        merchantId: this.merchantId,
        goodsId: goods.id,
        price: goods.price
      })
      .then(response => {
        console.log("Price updated successfully!");
      })
      .catch(error => {
        console.error(error);
      });
  },
  removeGoods(goodsId) {
      // Find the goods by ID
      const goodsIndex = this.merchantGoods.findIndex(goods => goods.id === goodsId);
      if (goodsIndex === -1) {
        console.error("Goods not found");
        return;
      }

      // Perform removal logic here, e.g., send request to backend API
      // with the goodsId to remove the goods from the merchant's inventory
      // You can use Axios or any other HTTP library for making the request

      // Example using Axios
      axios
        .post(`/merchant/removeGoods`, { goodsId })
        .then(response => {
          // Remove the goods from the merchantGoods array
          this.merchantGoods.splice(goodsIndex, 1);

          // Removal successful
          console.log("Goods removed successfully:", goodsId);
        })
        .catch(error => {
          // Handle error
          console.error("Error removing goods:", error);
        });
    }
  }
};
</script>

<style scoped>
.merchant-goods {
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

p {
  font-size: 16px;
}

form {
  margin-top: 20px;
}

label {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
}

input {
  font-size: 16px;
  padding: 5px;
  margin-bottom: 10px;
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
