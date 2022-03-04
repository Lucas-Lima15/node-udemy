const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
	fs.readFile(p, (err, fileContent) => {
		return (err) ? cb([]) : cb(JSON.parse(fileContent));
	});
};

module.exports = class Product {

	constructor(title) {
		this.title = title;
	}

	save() {
		getProductsFromFile(products => {
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {});
		});
		fs.readFile(p, (err, fileContent) => {
			let products = [];
			if (!err) {
				products = JSON.parse(fileContent);
			}
			products.push(this);
			fs.writeFile(p, JSON.stringify(products), (err) => {});
		});
	}

	static fetchAll(cb) {
		getProductsFromFile(cb);
	}
}