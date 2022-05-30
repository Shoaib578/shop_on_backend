const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const NewItemSchema = new Schema({
   
    
    
    item_from:{
      type:Schema.ObjectId,
      
    },
    item_for:{
        type:String,
        
      },

      item_id:{
        type:Schema.ObjectId,
        
      },
  
  }, {
    timestamps: true,
  });
  
  const NewItem = mongoose.model('NewItem', NewItemSchema);
  
  module.exports = NewItem;