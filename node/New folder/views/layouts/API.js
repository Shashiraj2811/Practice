const express =require("express");
const uuid = require("uuid");
const members = require("../../member");
const router = express.Router();

//This Get Request Get All Data
router.get('/',(req,res)=>res.json(members));

//Get Single member from data (members)
router.get('/:id',(req,res)=>{
    //this will give us required data only
    let member=members.filter((member)=>member.id==req.params.id);
    if(member.length===1)
        res.json(member);
    else
        res.status(400).json({msg:`Member not found with id ${req.params.id}`});
});




//Create member 
router.post('/',(req,res)=>{
    const newMember={
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    };

    if(!newMember.name || !newMember.email){
        return res.status(400).json({msg:"Please Include a name and email"});
    }
    members.push(newMember);
    //res.json(members);
    res.redirect('/');
});

//TO update Member
router.put('/:id',(req,res)=>{
   
    let data=members.filter((member)=>member.id==req.params.id);
    if(data.length==1){
        members.forEach((member)=>{
            if(member.id==req.params.id){
                const updateMember=req.body;
                member.name=(updateMember.name)? updateMember.name : member.name;
                member.email=(updateMember.email)? updateMember.email : member.email;
                res.json({msg:'Member is updated',member});
            }     
        });
    }
    else
       res.status(400).json({msg:`Member not found with id ${req.params.id}`});
});

//Delete Member
router.delete('/:id',(req,res)=>{
    let mLength=members.length;
    members= members.filter((item)=>req.params.id!==item.id);
    if(mLength==members.length)
        res.status(400).json({msg:`Member not found with id ${req.params.id}`});
    else   
        res.json({msg:'Member is deleted',members});
});

 
module.exports=router;
