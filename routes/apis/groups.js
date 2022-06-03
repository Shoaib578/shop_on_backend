const router = require('express').Router();

require('dotenv').config();
const fs = require('fs')

let GroupsUsers = require('../../models/GroupsUsers')
let Group = require("../../models/Group");
let Users = require("../../models/Users");



router.post('/add',(req, res) => {
let group_name = req.body.group_name
let user_id = req.body.user_id
console.log(user_id)
let group = new Group({
    group_name: group_name,
    added_by:user_id,
})
group.save()
return res.send({
    "msg":"group added successfully"
})


})



router.post('/add_user',(req, res) => {
    let group_id = req.body.group_id
    let user_phone_number = req.body.user_phone_number
    let user_name = req.body.user_name
    GroupsUsers.find({$and: [ { group_id:group_id }, { user_phone_number:  user_phone_number} ]})
    .then(data=>{
        if(data == null){
            let group_user = new GroupsUsers({
                group_id:group_id,
                user_phone_number:user_phone_number,
                user_name:user_name
                
            })
        
            group_user.save()
            return res.send({
                "msg":"user added to group successfully"
            })
        }else{
            return res.send({
                "msg":"This One User Already Exist in this group"
            })
        }
    })
    
})


router.get('/get_groups',(req, res) => {
    let user_id = req.query.user_id
    Group.find({added_by:user_id})
    .then(groups=>{
        return res.send({
            "groups":groups
        })
    })
})



router.get('/delete',(req,res)=>{
    let id = req.query.id
    Group.findByIdAndDelete(id)
    .then(msg=>{
        res.send({
            "msg":"Deleted Successfully"
        })
    })
})

router.get('/view_group',(req, res) => {
    let group_id = req.query.group_id
    GroupsUsers.aggregate([
        {
            $lookup:{
                from:'users',
                localField:'user_id',
                foreignField:'_id',
                as:'users'

            }
        }
    ])
    .then(users=>{
        let filtered_users = []
        users.forEach(data=>{
            if(data.group_id == group_id){
                filtered_users.push(data)
            }


        })

        return res.send({
            "users":filtered_users
        })
    })

})

router.get('/get_all_users',(req, res)=>{
    Users.find({role:'buyer'})
    .then(users=>{
        return res.send({
            "users":users
        })
    })
})

router.get('/delete_user_from_group',(req,res)=>{
    let id = req.query.id
    GroupsUsers.findByIdAndDelete(id)
    .then(msg=>{
        return res.send({
            "msg":"User Delete Successfully"
        })
    })
})

module.exports = router;
