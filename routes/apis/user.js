const router = require('express').Router();

require('dotenv').config();
const fs = require('fs')

let Users = require('../../models/Users')

const bcrypt = require("bcryptjs")

const saltRounds = 10; 








router.route('/login_user').post((req,res)=>{
  
 
  Users.findOne({phone_no:req.body.phone_no})
  .then(user=>{
   if(user != null){
    bcrypt.compare(req.body.password, user.password, function(error, response) {
      console.log(response)
     if(response == true){
       res.send({
         "user":user,
         "msg":"logged in Succesfully"
       })
     }else{
       res.send({
         "msg":"Incorrect email or password"
       })
     }
  });
   }else{
     res.send({
       "msg":"Incorrect email or password"
     })
   }
  });
    
})


router.route('/sign_up').post((req, res)=>{
  let role = req.body.role;

  if(role == 'buyer'){
   
    let name = req.body.name;
    let phone_no = req.body.phone_no;
    let password = req.body.password;
    bcrypt.hash(password,saltRounds,async(err,hash)=>{})

    Users.findOne({phone_no:phone_no})
    .then(result=>{
      if(result != null){
        res.send({
          "msg":"User Already Exist"
        })
      }else{
        bcrypt.hash(password,saltRounds,async(err,hash)=>{

          const user = new Users({
            phone_no:phone_no,
            password:hash,
            role:role,
            'buyer.name':name
          });
          user.save()
          return res.send({
            "msg":'user registered'
          })
        })

      }
    })
  }else{
    let name = req.body.name;
    let phone_no = req.body.phone_no;
    let password = req.body.password;
    let company_name = req.body.company_name;
    let company_code = req.body.company_code;
    let postal_code = req.body.postal_code;
    let country = req.body.country;
    let state = req.body.state;
    let city = req.body.city;
    let address = req.body.address;
    let email = req.body.email;
   
    Users.findOne({phone_no:phone_no})
    .then(result=>{
      if(result != null){
        res.send({
          "msg":"User Already Exist"
        })
      }else{
        bcrypt.hash(password,saltRounds,async(err,hash)=>{

          const user = new Users({
            phone_no:phone_no,
            password:hash,
            role:role,
            'supplier.name':name,
            "supplier.company_name":company_name,
            "supplier.company_code":company_code,
            "supplier.address":address,
            "supplier.city":city,
            "supplier.state":state,
            "supplier.country":country,
            "supplier.email":email,
            "supplier.postal":postal_code

          });
          user.save()
          return res.send({
            "msg":'user registered'
          })
        })

      }
    })


  }
})


router.route('/profile_screen').get((req,res)=>{
  const user_id = req.query.user_id
  Users.findById(user_id)
    .then(user=>{
      console.log(user)
     res.send({
       "user":user
     })
    })
  
})


router.route('/add_currency').post(async(req,res)=>{
  let user_id = req.body.user_id
  let currency = req.body.currency
  var filter ={ _id: user_id}

  let updateDoc = {
    $set: { 
     "supplier.currency":currency
     }
  }

  await Users.updateMany(filter,updateDoc)

  return res.send({
    "msg":"Currency Added Successfully"
  })

})

router.route('/update_profile').post(async(req,res)=>{
  let role = req.body.role
  let user_id = req.body.user_id
  var filter ={ _id: user_id}
  let phone_no = req.body.phone_no
  let updateDoc=""

      if(role == "buyer"){
    
        if(req.body.password){
         await bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
          updateDoc = {
            $set: { 
              "buyer.name":req.body.name,
              password:hash,
              phone_no:phone_no
             }
        }
       await Users.updateMany(filter,updateDoc)
    
      })
    
        }else{
          console.log(req.body.name)
          updateDoc = {
            $set: { 
              "buyer.name":req.body.name,
             
              phone_no:phone_no
             }
        }
    
        await  Users.updateMany(filter,updateDoc)
    
    
        }
      }else{
    if(req.body.password){
     await bcrypt.hash(req.body.password,saltRounds,async(err,hash)=>{
        updateDoc = {
          $set: { 
            phone_no:phone_no,
            password:hash,
            "supplier.currency":req.body.currency,
            'supplier.name':req.body.name,
            "supplier.company_name":req.body.company_name,
            "supplier.company_code":req.body.company_code,
            "supplier.address":req.body.address,
            "supplier.city":req.body.city,
            "supplier.state":req.body.state,
            "supplier.country":req.body.country,
            "supplier.email":req.body.email,
            "supplier.postal":req.body.postal_code
           }
      }
       await Users.updateMany(filter,updateDoc)
    
    })
    }else{
      updateDoc = {
        $set: { 
          phone_no:phone_no,
         
          "supplier.currency":req.body.currency,
          
          'supplier.name':req.body.name,
          "supplier.company_name":req.body.company_name,
          "supplier.company_code":req.body.company_code,
          "supplier.address":req.body.address,
          "supplier.city":req.body.city,
          "supplier.state":req.body.state,
          "supplier.country":req.body.country,
          "supplier.email":req.body.email,
          "supplier.postal":req.body.postal_code
         },
    }
    
    await  Users.updateMany(filter,updateDoc)
    }
      }
    
    
      return res.send({
        "msg":"profile updated"
      })
   
 
  
})

router.route('/get_all_users').get((req,res)=>{
  Users.find({role:'buyer'})
  .then(users=>{
    return res.send({
      "users":users
    })
  })
})



router.route('/get_currency').get((req,res)=>{
  let user_id = req.query.user_id
  console.log(user_id)
  Users.findById(user_id)
  .then(user=>{
    console.log(user)
    return res.send({
      "currency":user.supplier.currency
    })
  })
})
module.exports = router;
