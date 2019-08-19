const express =require("express");
const uuid = require("uuid");
const members = require("./member");
const router = express.Rounter();

router.get('/',(req,res)=>{res.json(members)});
router.get(':id',(req,res)=>{

    let member=members.filter((member)=>member.id==req.params.id);
    if(member.length===1)
    res.json(member);
    else
    res.status(400).json({msg:`Member not found with id ${req.param.id}`});
});


let members=require('./member')