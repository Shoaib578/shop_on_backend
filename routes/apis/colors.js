const router = require('express').Router();
const Colors = require('../../models/Colors')

router.route('/get_colors').get((req,res)=>{
let user_id = req.query.user_id
Colors.find({user_id:user_id})
.then(colors=>{
    return res.send({
        "colors":colors
    })
})
})


router.route('/add').post((req,res)=>{
    let color = req.body.color
    let user_id = req.body.user_id
    let new_color = new Colors({
        user_id:user_id,
        color:color
    })
    new_color.save()
    return res.send({
        "msg":"Added"
    })
})


router.route('/delete').get((req,res)=>{
let color_id = req.query.color_id
Colors.findByIdAndDelete(color_id)
.then(msg=>{
    res.send({
        "msg":"Deleted"
    })
})
})

module.exports = router