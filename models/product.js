const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path')

const p = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = (cb) => {
  fs.readFile(p, (error, fileContent) => {
    if(fileContent === undefined) {
      fs.writeFile(p, JSON.stringify([]), (error) => {
      })
      cb([])
      return
    }
    if (error && fileContent !== undefined) {
      cb([])
      return
    }
    cb(JSON.parse(fileContent))
  })
}
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log('error: ', error)
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }
}