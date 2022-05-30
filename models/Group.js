const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const GroupSchema = new Schema({
   
    
    group_name:{
      type:String,
      
    },

    added_by:{
      type:Schema.ObjectId,
    }
    
  
  }, {
    timestamps: true,
  });
  
  const Group = mongoose.model('Group', GroupSchema);
  
  module.exports = Group;