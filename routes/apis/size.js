const router = require('express').Router();

const Sizes = require('../../models/Sizes')

router.route('/get_sizes').get((req,res)=>{
let user_id = req.query.user_id
Sizes.find({user_id:user_id})
.then(sizes=>{
    return res.send({
        "sizes":sizes
    })
})
})


router.route('/add').post((req,res)=>{
    let size = req.body.size
    let user_id = req.body.user_id
    Sizes.find({user_id:user_id,size:size})
    .then(data=>{
        if(data.length<1){
            let new_size = new Sizes({
                user_id:user_id,
                size:size
            })
            new_size.save()
            return res.send({
                "msg":"Added"
            })
        }else{
            return res.send({
                "msg":"Size Already Exist"
            })
        }
    })
    
})


router.route('/delete').get((req,res)=>{
let size_id = req.query.size_id
Sizes.findByIdAndDelete(size_id)
.then(msg=>{
    res.send({
        "msg":"Deleted"
    })
})
})
module.exports = router