const router = require('express').Router();

let Cart = require('../../models/Cart')

router.route('/get_cart_items').get((req, res) => {
    let user_id = req.query.user_id
    Cart.aggregate([
        {
            $lookup:{
                from:'items',
                localField:'item_id',
                foreignField:'_id',
                as:'item'
            }
        }
    ]).then(carts=>{
        let filtered_carts = []
        carts.forEach(data=>{
            if(data.cart_user == user_id){
                filtered_carts.push(data)
            }
        })
        return res.send({
            "carts":filtered_carts
        })
    })
   
})


router.post('/add_cart',(req, res) => {
    let cart_user = req.body.cart_user
    let item_owner_id = req.body.item_owner_id
    let color = req.body.color
    let size = req.body.size
    let currency = req.body.currency
    let item_id = req.body.item_id
    let amount = req.body.amount
    Cart.find({cart_user:cart_user})
    .then(cart_item=>{
        if(cart_item == null){
            let cart= new Cart({
             item_owner:item_owner_id,
             cart_user:cart_user,
            item_id:item_id,
            amount: amount,
            size:size,
            color:color,
            currency:currency
            })
                
            cart.save()
            return res.send({
                "msg":"Cart Added"
            })
        }else{
            cart_item.forEach(data=>{
                if(item_owner_id != data.item_owner){
                     res.send({
                        "msg":"Cart Can only store one owner items"
                    })
                    return false
                }
            })
           
            let cart= new Cart({
            item_owner:item_owner_id,
            cart_user:cart_user,
            item_id:item_id,
            amount: amount,
            color:color,
            size:size,
            currency:currency

            })
                       
            cart.save()
             res.send({
                "msg":"Cart Added"
             })
            
        }
    })
    
   
})

router.route('/delete').get((req,res)=>{
    let id = req.query.id
    Cart.findByIdAndDelete(id)
    .then(msg=>{
        res.send({
            "msg":"Deleted"
        })
    })
})
module.exports = router
