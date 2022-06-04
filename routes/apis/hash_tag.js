const router = require('express').Router();

require('dotenv').config();
const fs = require('fs')

let HashTags = require('../../models/HashTags')


router.post('/add',(req, res) => {
    let user_id = req.body.user_id
    let hashtag = req.body.hashtag
    HashTags.find({$and:[{user_id:user_id},{hash_tag:hashtag.toString()}]})
    .then(data=>{
        if(data.length == 0){
            let hash_tag = new HashTags({
                hash_tag: hashtag,
                user_id: user_id
            })
            hash_tag.save()
            return res.send({
                "msg":"HashTag Added successfully"
            })
        }else{
            return res.send({
                "msg":"Hashtag already Exist"
            })
        }
    })
  
})

router.get("/get_hashtags",(req, res) => {
    let user_id = req.query.user_id
    HashTags.find({user_id:user_id})
    .then(hash_tags=>{
        return res.send({
            "hash_tags":hash_tags
        })
    })
  
})


router.get('/delete',(req,res)=>{
    let id = req.query.id
    HashTags.findByIdAndDelete(id)
    .then(msg=>{
        return res.send({
            "msg":"Deleted Successfully"
        })
    })
})

module.exports = router