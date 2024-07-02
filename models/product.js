const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "products.json"
);

function getProductsFromFile(cb) {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      console.log("Error reading file", err);
      return cb([]);
    }
    if (fileContent.length === 0) {
      return cb([]);
    }
    try {
      const dataFromFile = JSON.parse(fileContent);
      cb(dataFromFile);
    } catch (parseErr) {
      console.log("Error parsing JSON", parseErr);
    }
  });
}

module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      const inputProduct = {
        title: this.title,
        imageUrl: this.imageUrl,
        price: this.price,
        description: this.description,
      };
      products.push(inputProduct);
      const dataToWrite = JSON.stringify(products);
      fs.writeFile(p, dataToWrite, (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
