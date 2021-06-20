const express = require ('express')
const mongoose =require ('mongoose')
const userinfo = require('../model/userSchema')

const router = express.Router();

router.post('/userSignUp',async(req,res)=>{
  
    const newuser = new userinfo({
    name : req.body.name,
    email : req.body.email,
    password : req.body.password,
    age : req.body.age,
    gender : req.body.gender,
    company : req.body.company,
    designation : req.body.designation,
    about : req.body.about
    
})   
try {
   var emailvalid = newuser.email
   emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   if(!emailRegex.test(emailvalid)){
      return res.status(400).json({error:"Please enter valid email"})
   } 

   var passwordvalid = newuser.password
   var minNumberofChars = 8;
   var maxNumberofChars = 16;
   var regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
   
   if(passwordvalid.length < minNumberofChars || passwordvalid.length > maxNumberofChars){
       return res.status(400).json({error:"Please check your password strength"});
   }
   if(!regularExpression.test(passwordvalid)) {
       return res.status(400).json({error:"password should contain atleast one number and one special character"});
   }
       const usersaved =  await newuser.save()
       return res.json(usersaved).sendStatus(201)
       
        
    } catch (error) {
        return  res.json({error:error});
       ;
    }
   
})

router.get('/userLogin',async(req,res)=>{
  try { const exsistinguser = {
    name:req.body.name,
    password:req.body.password
}
const dbuser=  await userinfo.findOne({name:exsistinguser.name})
if(dbuser.password===exsistinguser.password){
   return res.send(dbuser)
    
}
else{
   return res.send("wrong credentials");
   
}
      
  } catch (error) {
     res.sendStatus(500).json({error:error})
  }  
 
})
router.get('/getAllUsers',(req,res)=>{
   userinfo.find()
   .then(result=>{
      res.status(200).json({
         user:result
      })
   })
   .catch(err=>{
      res.status(500).json({
         error:err
      })
   })
})    

router.get('/getUserById/:id',(req,res)=>{
 try {
    userinfo.findById(req.params.id,function(err,user){
        if(err){
            res.status(400).send(err);
            return;
         }
         res.status(200).send(user);
     })
 } catch (error) {
    res.sendStatus(500).json({error:error})
 }
 
  
    // .then(result=>{
    //     res.status(200).json({user:result})

    // })
    // .catch(err=>{
    //     res.status(500).json({error:err})
    // })
   
})

router.patch('/updateProfile/:id',async(req,res)=>{
   try {
      const updated = req.body
      const options = {new:true}
      const result = await userinfo.findByIdAndUpdate(req.params.id,updated,options)
      res.status(200).json(result)
   } 
   catch(error){
      res.sendStatus(500).json({error:error})
   }
  
})

router.delete('/delete/:id',async(req,res)=>{
   try {
      await userinfo.findByIdAndDelete(req.params.id)
      res.sendStatus(200).send("Succesfully deleted")
    } catch (error) {
       res.sendStatus(500).json({error:error})
    }  
})

module.exports = router;