const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const CartSchema = new Schema({
   
    
    item_id:{
      type:Schema.ObjectId,
      
    },
    size:{
      type:String,
    },
    currency:{
      type:String,
    },
    amount:{
        type:Number,
    },
    color:{
      type:String,
    },
    cart_user:{
        type:Schema.ObjectId,
    },
    item_owner:{
        type:Schema.ObjectId,
    }
  
  }, {
    timestamps: true,
  });
  
  const Cart = mongoose.model('Cart', CartSchema);
  
  module.exports = Cart;