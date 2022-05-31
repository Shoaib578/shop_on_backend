const router = require('express').Router();
let Item = require('../../models/Item')

require('dotenv').config();
const fs = require('fs');
const NewItem = require('../../models/Newitem');
const Group = require("../../models/Group")
const GroupUsers = require('../../models/GroupsUsers')


router.route('/add_item').post((req, res)=> {
    let item_name = req.body.item_name;
    let item_description = req.body.item_description;
    let price = req.body.price;
    let sku_code = req.body.sku_code;
    let colors = req.body.colors;
    let sizes = req.body.sizes;
    let currency = req.body.currency
    let hash_tag = req.body.hash_tag;
    let added_by = req.body.added_by;
    
    let image1 = req.files.image1
    let image1_name=image1.name
    
    let image2 = ''
    let image2_name = ''
    
    let image3 = ''
    let image3_name = ''
    
    image1.mv('public/uploads/'+image1_name,function(err){
        if(err){
            res.send(err)
        }
      })
    
    
      if(image2){
        image2 = req.files.image2
        image2_name=image2.name
       image2.mv('public/uploads/'+image2_name,function(err){
           if(err){
               res.send(err)
           }
       })
      }
    
    
    if(image3){
        image3 = req.files.image3
        image3_name=image3.name
        
        image3.mv('public/uploads/'+image3_name,function(err){
          if(err){
              res.send(err)
          }
        })
    }
    
    
    
    
    let item = new Item({
    item_name:item_name,
    item_description:item_description,
    added_by: added_by,
    item_image1:image1_name,
    item_image2:image2_name,
    item_image3:image3_name,
    hash_tag:hash_tag,
    colors: colors,
    currency:currency,
    sku_code: sku_code,
    price: price,
    sizes:sizes
    });
    
    item.save()
    console.log("added")
    return res.send({
            "msg":'Added Successfully'
        })
        
    
    
    
    
    })
    

router.route('/search_item_by_sku_or_name').get((req,res)=>{
    let search = req.query.search
    let user_id = req.query.user_id
    var regex = new RegExp(search,'i')
    Item.find({$or: [ { added_by:user_id,item_name:regex }, {added_by:user_id, sku_code:regex } ]})
    .then(items=>{
        res.send({
            "items":items
        })
    })
})


router.get('/get_new_items',(req, res) => {
    let user_phone_number = req.query.user_phone_number;
    NewItem.aggregate([
        {
            $lookup:{
                from:'items',
                localField:'item_id',
                foreignField:'_id',
                as:'items'
            }
        }
    ])
    .then(items=>{
    let my_items = []

        items.forEach(data=>{
            my_items.push(data)
           
            if(data.item_for == user_phone_number){
                // my_items.push(data)
            }
        })

        res.send({
            "items":my_items
        })
    })
})

router.get("/get_supplier_items",(req,res)=>{
    let user_id = req.query.user_id;
    Item.find({added_by:user_id})
    .then(data=>{
        return res.send({
            "items":data
        })
    })
})

router.get('/view_item',(req,res)=>{
    let item_id = req.query.item_id;
    console.log(item_id)
    Item.findById(item_id).then(data=>{
        res.send({
            "item":data
        })
    })
})


router.route('/send_item').post((req,res)=>{
   
    let users = req.body.users
   
    console.log(users)
    let user_type = req.body.user_type
    let my_id = req.body.my_id
    let item_id = req.body.item_id

   
  

    if(user_type == "users"){
        console.log("Users")

        users.forEach(data=>{
            let item = new NewItem({
                item_from:my_id,
                item_for:data,
                item_id:item_id
            })
            item.save()
           
        })
       
     res.send({
        "msg":"Sent"
    })
    }else{
        console.log("Group")
        users.forEach(data=>{
            GroupUsers.find({group_id:data})
            .then(u=>{
                console.log(u)
                u.forEach(user=>{
                    console.log(user)
                    let item = new NewItem({
                        item_from:my_id,
                        item_for:user.user_phone_number,
                        item_id:item_id
                    })
                    item.save()
                })
               
            })

        })

        res.send({
            "msg":"Sent"
        })
    }
})

router.route('/search_item').get((req,res)=>{
    let search = req.query.search
   
    let user_phone_number = req.query.user_phone_number
    console.log(user_phone_number)
    NewItem.aggregate([
        {
            $lookup:{
                from:'items',
                localField:'item_id',
                foreignField:'_id',
                as:'items'
            }
        }
    ])
    .then(item=>{
        let filtered_data= []
        item.forEach(data=>{
          
                if(data.item_for == user_phone_number){
                    if(data.items[0].item_name.toLowerCase().includes(search.toLowerCase())){
                   
                    
                  
                        filtered_data.push(data)
                     }
                }
               
           
        })

        return res.send({
            "items":filtered_data
        })
    })
})


router.route('/search_item_by_hashtag').get((req,res)=>{
    let hash_tag = req.query.hash_tag
    let user_id = req.query.user_id

    Item.find({$and:[{added_by:user_id},{hash_tag:hash_tag}]})
    .then(items=>{
        return res.send({
            "items":items
        })
    })
})
module.exports = router;