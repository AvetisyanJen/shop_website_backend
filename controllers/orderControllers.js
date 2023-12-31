const stripe = require("stripe")(
  "sk_test_51KjlUTEwie5RP3GFNfBKfqObEdTWw26tJIfNSJoIkUVfEaD3GN40zBYgNXfksZ5GHyduMygmCvVByaUvYWIHZYiJ00tVZhPEGj"
);
const { CartProducts, Cart, Order,User,Product,Photo,OrderProduct } = require("../models");
class OrderController {

  async payment(req, res) {
    const { userId, token } = req.body;
    console.log(req.user);
    const cart = await Cart.findOne({
      where: {
        userId
      }

    });
    const cartItems = await CartProducts.findAll({
      where: { cartId: cart.id },

       include: [{model:Product}],
    });

    let total = 0;
    cartItems.forEach((el) => (total += el.quantity * el.Product.price));


    stripe.customers
      .create({
        email: token.email,
        source: token.id,
      })
      .then((customer) =>
        stripe.charges.create({
          amount: total * 100,
          currency: "usd",
          customer: customer.id,
        })
      )
      .then(async () => {
        await CartProducts.destroy({
          where: { cartId: cart.id },
        });

        let order = await Order.create({
          user_id: userId,
          total: total,
        });
        cartItems.forEach(async (el) => {
          el.Product.count -= el.quantity;

          if (el.Product.count < 0) {
           el.Product.count = 0
           
          }
         
          el.Product.save();
          
          await OrderProduct.create({
            order_id: order.id,
            product_id: el.Product.id,
            quantity: el.quantity,

          });
        });
        console.log(req.body);
        res.status(200).json({ message: "Payment successful" });
      })
      .catch((err) => console.log(err));
  }
  
  
  async getOrderProducts(req, res) {
    const { id } = req.params;
    console.log(id);
    
    try {
      const orderItems = await Order.findAll({
        where: { user_id:id },
        include: [
          {
            model: OrderProduct,
            include: [
              {
                model: Product,
                include: [
                  {
                    model: Photo,
                  },
                ],
              },
            ],
          },
        ],
      });
      
      res.json(orderItems);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  



  
  






}


module.exports = {
  OrderController: new OrderController(),
};

