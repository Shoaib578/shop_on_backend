const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const ItemSchema = new Schema({
   
    hash_tag:{
      type:String,
      required:true,
     
    },
    currency:{
      type:String,
      required:true
    },
    item_image1:{
      type:String,
    },
    item_image2:{
      type:String,
    },
    item_image3:{
      type:String,
    },
    added_by:{
      type:Schema.ObjectId,
      
    },
    item_name:{
        type:String,
        
      },

    item_description:{
        type:String,
        
      },

    
    sku_code:{
        type:String,
    },
    colors:{
        type:String,
    },
    sizes:{
      type:String,
  },
    price:{
        type:String,
    }



  
  }, {
    timestamps: true,
  });
  
  const Item = mongoose.model('Item', ItemSchema);
  
  module.exports = Item;