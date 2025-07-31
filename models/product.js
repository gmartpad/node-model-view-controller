const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path')
module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    const p = path.join(rootDir, 'data', 'products.json')
    fs.readFile(p, (error, fileContent) => {
      let products = [];
      if (!error) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      
      fs.writeFile(p, JSON.stringify(products), (error) => {
        console.log('error: ', error)
      })
    })
  }

  static fetchAll(cb) {
    const p = path.join(rootDir, 'data', 'products.json')
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
      }
      cb(JSON.parse(fileContent))
    })
  }
}