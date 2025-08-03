const Product = require('../models/product')

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log("prodId: ", prodId);
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      pageTitle: `Product Detail - ${product.title}`,
      product: product,
      path: '/products'
    })
  })
}

// 

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
}

// 

exports.getCart = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/cart', {
      prods: products,
      pageTitle: 'Cart',
      path: '/cart'
    });
  })
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("postCart prodId: ", prodId)
  res.redirect('/cart')
}

// 

exports.getOrders = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/orders', {
      prods: products,
      pageTitle: 'Orders',
      path: '/orders'
    });
  })
}

// 

exports.getCheckout = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/checkout', {
      prods: products,
      pageTitle: 'Checkout',
      path: '/checkout'
    });
  })
}

// 