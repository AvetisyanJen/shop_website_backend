const {CartProducts,Cart,Product,Photo}= require("../models");

class CartProductController{

  async addCartProduct(req, res) {
    const { userId, ProductId } = req.body;
    try {
      let cart = await Cart.findOne({ where: { userId } });
      if (!cart) {
        cart = await Cart.create({ userId });
      }
      let cartItem = await CartProducts.findOne({
        where: { cartId: cart.id, ProductId },
        include: [{ model: Cart }, { model: Product }],
      });
  
      if (!cartItem) {
        // If the cart item doesn't exist, create a new one with quantity set to 1
        cartItem = await CartProducts.create({
          cartId: cart.id,
          ProductId,
          quantity: 1
        });
      } else {
   
          cartItem.quantity += 1;
         
          if(cartItem.quantity>cartItem.Product.count){
            cartItem.quantity = cartItem.Product.count;
          }
  
        await cartItem.save();
      }
   
      res.json({ cart, cartItem });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
async  getCartProducts(req, res) {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ where: { userId: id } });
    if (cart) {
      const cartItems = await CartProducts.findAll({
        where: { cartId: cart.id },
        include: {
          model: Product,
          include: {
            model: Photo,
          },
        },
      });

      res.status(201).json(cartItems);
    } else {
      res.status(404).json({ error: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



// Increment quantity of a CartProduct
async incrementQuantity(req, res) {
  const { ProductId, userId } = req.body;

  try {
    let cart = await Cart.findOne({ where: { userId } });
    const cartProduct = await CartProducts.findOne({
      where: { cartId: cart.id, ProductId },
      include: {
        model: Product,
        include: {
          model: Photo,
        },
      },
    });

    if (cartProduct) {
      // Check and limit quantity if it exceeds product count
      if (cartProduct.quantity + 1 > cartProduct.Product.count) {
        cartProduct.quantity = cartProduct.Product.count;
      } else {
        cartProduct.quantity += 1;
      }

      await cartProduct.save();
      return res.json(cartProduct);
    } else {
      return res.status(404).json({ error: 'Cart product not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



// Decrement quantity of a CartProduct
async  decrementQuantity(req, res) {
  let {userId,ProductId}=req.body
  let cart = await Cart.findOne({ where: { userId } });

if (cart) {
  const cartProduct = await CartProducts.findOne({
    where: { cartId: cart.id, ProductId },
    include: {
      model: Product,
      include: {
        model: Photo,
      },
    },
  });

  if (cartProduct) {
    // Decrement the quantity by 1 if it's greater than 1
    if (cartProduct.quantity > 1) {
      cartProduct.quantity -= 1;
      await cartProduct.save();
    } else {
      // Remove the product from the cart if the quantity is 1
      await cartProduct.destroy();
    }

    res.json(cartProduct);
  } else {
    res.status(404).json({ error: 'Cart product not found' });
  }
} else {
  res.status(404).json({ error: 'Cart not found' });
}

}
async removeCartProduct(req, res) {
  const { userId, ProductId } = req.body;

  try {
    const cart = await Cart.findOne({ where: { userId } });

    if (cart) {
      const cartProduct = await CartProducts.findOne({
        where: { cartId: cart.id, ProductId },
        // include: { all: true, nested: true }
      });

      if (cartProduct) {
        await cartProduct.destroy();
        return res.json({ message: "Deleted" });
      }
    }

    return res.status(404).json({ message: "Cart product not found" });
  } catch (error) {
    console.error("Error removing cart product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}




}module.exports = {
  CartProductController: new CartProductController(),
};