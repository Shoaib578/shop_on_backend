const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const OrderSchema = new Schema({
   
  
    
    placed_by:{
      type:Schema.ObjectId,
      
    },

    item_id:{
        type:Schema.ObjectId,
        
    },
    cart_id:{
      type:Schema.ObjectId,

    },
    size:{
      type:String
    },
    color:{
      type:String
    },
    currency:{type:String},
    amount:{type:Number},
    price:{type:Number},
    address:{type:String},
    status:{type:String},
    placed_for:{
        type:Schema.ObjectId,
        
    },
    
  
  }, {
    timestamps: true,
  });
  
  const Order = mongoose.model('Order', OrderSchema);
  
  module.exports = Order;