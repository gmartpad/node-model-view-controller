const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const products = rows;
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((err) => {
      console.error(err)
    })
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([rows, fieldData]) => {
      const foundProduct = rows[0]
      res.render('shop/product-detail', {
        pageTitle: `Product Detail - ${foundProduct.title}`,
        product: foundProduct,
        path: '/products'
      })
    })
    .catch((err) => {
      console.error(err)
    })
}

// 

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const products = rows;
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((err) => {
      console.error(err)
    })
}

// 

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll()
      .then(([rows, fieldData]) => {
        const products = rows;
        const cartProducts = [];
        for (let product of products) {
          const cartProductData = cart.products.find(p => p.id === product.id);
          if(cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }
        res.render('shop/cart', {
          pageTitle: 'Cart',
          path: '/cart',
          products: cartProducts
        });
      })
      .catch((err) => {
        console.error(err)
      })
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  
  Product.findById(prodId)
    .then(([rows, fieldData]) => {
      const foundProduct = rows[0]
      Cart.addProduct(foundProduct.id, foundProduct.price)
      res.redirect('/cart')
    })
    .catch((err) => {
      console.error(err)
    })
}

exports.postCartDeleteItem = (req, res, next) => {
  const prodId = req.body.productId;
  
  Product.findById(prodId)
    .then(([rows, fieldData]) => {
      const foundProduct = rows[0]
      Cart.deleteProduct(foundProduct.id, foundProduct.price)
      res.redirect('/cart')
    })
    .catch((err) => {
      console.error(err)
    })
}

// 

exports.getOrders = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const products = rows;
      res.render('shop/orders', {
        prods: products,
        pageTitle: 'Orders',
        path: '/orders'
      });
    })
    .catch((err) => {
      console.error(err)
    })
}

// 

exports.getCheckout = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      const products = rows;
      res.render('shop/checkout', {
        prods: products,
        pageTitle: 'Checkout',
        path: '/checkout'
      });
    })
    .catch((err) => {
      console.error(err)
    })
}

// 