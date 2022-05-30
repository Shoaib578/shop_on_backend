const router = require('express').Router();
const Order = require('../../models/Order')
const Cart = require('../../models/Cart')
router.route('/create_order').post((req,res)=>{
    let placed_by = req.body.placed_by
    let placed_for = req.body.placed_for
    let item_id = req.body.item_id
    let amount = req.body.amount
    let price = req.body.price
    let address = req.body.address
    let cart_id = req.body.cart_id
    let color = req.body.color
    let size = req.body.size
    let currency = req.body.currency
    console.log(cart_id)
    Cart.findByIdAndDelete(cart_id)
    .then(()=>{
        let order = new Order({
            placed_by: placed_by,
            placed_for: placed_for,
            cart_id:cart_id,
            item_id:item_id,
            amount: amount,
            price:price,
            address:address,
            size:size,
            color:color,
            currency:currency,
            status:'pending'
        })
        order.save()
    })

    

    return res.send({
        "msg":"order created successfully",
    })
})


router.route('/received_orders').get((req,res)=>{
    let user_id = req.query.user_id
    Order.aggregate([
        {
            $lookup:{
                from:'items',
                localField:'item_id',
                foreignField:'_id',
                as:'item'
            }
        },
        {
            $lookup:{
                from:'carts',
                localField:'cart_id',
                foreignField:'_id',
                as:'cart'
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'placed_by',
                foreignField:'_id',
                as:'user'
            }
        }
    ])
    .then(orders=>{
        var my_orders=[]

        orders.forEach(data=>{

            if(data.placed_for == user_id){
                
                if(data.status == "pending" || data.status == "accepted" || data.status == "onway"){
        

                    my_orders.push(data)

                }
            }
        })

        res.send({
            "orders":my_orders,
        })
    })

})



router.get('/my_orders',(req,res)=>{
    let user_id = req.query.user_id
    Order.aggregate([
        {
            $lookup:{
                from:'items',
                localField:'item_id',
                foreignField:'_id',
                as:'item'
            },
            
        },
        {
            $lookup:{
                from:'carts',
                localField:'cart_id',
                foreignField:'_id',
                as:'cart'
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'placed_for',
                foreignField:'_id',
                as:'user'
            }
        }
    ])
    .then(orders=>{
        var my_orders=[]

        orders.forEach(data=>{
            if(data.placed_by == user_id){
                console.log(data)
                if(data.status == "pending" || data.status == 'onway' || data.status == "accepted"){
                my_orders.push(data)
                }
            }
        })

        res.send({
            "orders":my_orders,
        })
    })

})


router.route('/change_order_status').post(async(req,res)=>{
    let order_id = req.body.order_id
    let status = req.body.status
    let filter = { _id: order_id };
    let updateDoc = {
        $set: { status: status },
    }
    console.log(status)
    await Order.updateMany(filter,updateDoc)

    return res.send({
        "msg":"Status updated"
    })

})

router.route('/order_history_as_buyer').get((req,res)=>{
    let user_id = req.query.user_id
    Order.aggregate([
        {
            $lookup:{
                from:'items',
                localField:'item_id',
                foreignField:'_id',
                as:'item'
            },
            
        },
        {
            $lookup:{
                from:'carts',
                localField:'cart_id',
                foreignField:'_id',
                as:'cart'
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'placed_for',
                foreignField:'_id',
                as:'user'
            }
        }
    ])
    .then(orders=>{
        var orders_history=[]

        orders.forEach(data=>{
            if(data.placed_by == user_id){
                if(data.status == "cancelled" || data.status == "completed" || data.status == "rejected"){
                    orders_history.push(data)

                }
            }
        })

        res.send({
            "orders":orders_history,
        })
    })

})





router.route('/order_history_as_supplier').get((req,res)=>{
    let user_id = req.query.user_id
    Order.aggregate([
        {
            $lookup:{
                from:'items',
                localField:'item_id',
                foreignField:'_id',
                as:'item'
            },
            
        },
        {
            $lookup:{
                from:'carts',
                localField:'cart_id',
                foreignField:'_id',
                as:'cart'
            }
        },
        {
            $lookup:{
                from:'users',
                localField:'placed_by',
                foreignField:'_id',
                as:'user'
            }
        }
    ])
    .then(orders=>{
        var orders_history=[]

        orders.forEach(data=>{
            if(data.placed_for == user_id){
                if(data.status == "cancelled" || data.status == "completed" || data.status == "rejected"){
                    orders_history.push(data)

                }
            }
        })

        res.send({
            "orders":orders_history,
        })
    })

})



module.exports = router