const express = require('express');
const user_router = require('./router/userRout');
// const cart_router = require('./router/cartRout');
const product_router = require('./router/productRout');
const cartProduct_router = require('./router/cartproductRout');
const category_router = require('./router/categoryRout');
const app = express();
const path = require("path");
const cors = require("cors");
const order_router = require('./router/orderRout');
require('dotenv').config();
const port = process.env.PORT || 3000; // Specify the port or use a default value

app.use(express.static(path.join(__dirname, 'Static')));
app.use(cors()); // Add parentheses to invoke the cors middleware
app.use(express.json());

app.use("/user", user_router);
// app.use("/cart", cart_router);
app.use("/prod", product_router);
app.use("/cartProd", cartProduct_router);
app.use("/category", category_router);
app.use("/order",order_router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
