const router = require('express').Router();
const Contacts = require('../../models/Contacts')
router.route('/add').post((req,res)=>{
    let user_name = req.body.user_name
    let phone_no = req.body.phone_no
    let added_by = req.body.added_by

    let contact = new Contacts({
        added_by:added_by,
        user_name:user_name,
        user_phone_no:phone_no
    })
    contact.save()
    return res.send({
        "msg":"Added"
    })


})

router.route('/get_contacts').get((req,res)=>{
    let user_id = req.query.user_id

    Contacts.find({added_by:user_id})
    .then(contacts=>{
        res.send({
            "contacts":contacts
        })
    })
})

router.route('/delete').get((req,res)=>{
    let id = req.query.id
    Contacts.findByIdAndDelete(id)
    .then(msg=>{
        return res.send({

            "msg":"Deleted"
        })
    })
    
})


module.exports = router
