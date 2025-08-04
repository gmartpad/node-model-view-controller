const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path')

const p = path.join(rootDir, 'data', 'cart.json')

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent)
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex((p) => p.id === id)
      const existingProduct = cart.products[existingProductIndex]
      let updatedProduct;
      // Add new product/increase quantity
      if(existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      }else{
        updatedProduct = { id: id, qty: 1 }
        cart.products = [...cart.products, updatedProduct]
      }
      cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log('err: ', err)
      })
    })
  }

  static deleteProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return
      }
      const cart = JSON.parse(fileContent);

      const updatedCart = { ...cart };

      // Analyze the cart => Find existing product
      const existingProduct = updatedCart.products.find((p) => p.id === id);
      const existingProductQty = Number(existingProduct.qty);

      const newCartProducts = cart.products.filter((p) => p.id !== id)

      updatedCart.products = [...newCartProducts]
      updatedCart.totalPrice = Number(cart.totalPrice) - (Number(productPrice) * existingProductQty);

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log('err: ', err)
      })
    })
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    })
  }
}