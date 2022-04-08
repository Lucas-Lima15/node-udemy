const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this_id) {
      dbOp = db.collection('users').updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db.collection('users').insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp == product._id;
    // });
    const updateCart = { items: [{productId: new mongodb.ObjectId(product._id), quantity: 1}] };
    const db = getDb();
    return db.collection('users').updateOne({_id: this._id}, {$set: {cart: updateCart}});
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users')
      .find({_id: new mongodb.ObjectId(userId)})
      .next()
      .then(user => {
        console.log(user);
        return user;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;