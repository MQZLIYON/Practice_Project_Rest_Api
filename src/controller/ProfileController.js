const jwt = require('jsonwebtoken');
const {ProfileModel} = require("../models/ProfileModel");
const express = require("express");

const CreateProfile = (req,res)=>{
    let reqBody = req.body;
    ProfileModel.create(reqBody,(error,data)=>{
        if (error){
            res.status(400).json({status:'Profile Create Failed',data:error});
        }else {
            res.status(200).json({status:'Profile Create Success',data:data});
        }
    })
}

const UserLogging = (req,res)=>{
    let UserName = req.body['UserName'];
    let Password = req.body['Password'];
    ProfileModel.find({Username:UserName,Password:Password},(error,data)=>{
        if (error){
            res.status(401).json({data:error});
        }
        else {
            if (data.length > 0){
                let Payload = {
                    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                    data:data[0]
                }
                let token = jwt.sign(Payload, 'key123');
                res.status(200).json({status:'success',token:token,data:data});
            }else {
                res.status(401).json({data:'Unauthorized'});
            }
        }
    })
}


const SelectProfile = (req,res)=>{
    let UserName = req.headers['username'];
    ProfileModel.find({UserName:UserName},(error,data)=>{
        if (error){
            res.status(401).json({data:error});
        } else {
            res.status(200).json({data:data});
        }
    })
}

const UpdateProfile = (req,res)=>{
    let UserName = req.headers['UserName'];
    let reqBody = req.body;
    ProfileModel.updateOne({UserName:UserName},{$set:reqBody},{upsert:true},(error,data)=>{
        if (error){
            res.status(401).json({data:error});
        }else {
            res.status(200).json({data:data});
        }
    })
}
module.exports = {CreateProfile,UserLogging,SelectProfile,UpdateProfile};

