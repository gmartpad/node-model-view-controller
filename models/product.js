const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path')

const p = path.join(rootDir, 'data', 'products.json')

const getProductsFromFile = (cb) => {
  fs.readFile(p, (error, fileContent) => {
    if(fileContent === undefined) {
      fs.writeFile(p, JSON.stringify([]), (error) => {
        console.log('error: ', error)
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
  constructor(title) {
    this.title = title;
  }

  save() {
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