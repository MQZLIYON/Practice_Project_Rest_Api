require('express');
const {TodoListModel} = require("../models/TodoListModel");
const CreateTodoList = (req,res)=>{
    let reqBody = req.body;
    //====================================//
    let UserName = req.headers['username'];
    let TodoSubject = reqBody['TodoSubject'];
    let TodoDescription = reqBody['TodoDescription'];
    let TodoStatus = "New";
    let TodoCreateDate = Date.now();
    let TodoUpdateDate = Date.now();
    //===========================================//

    //==========================================//
    let PostBody = {
        UserName:UserName,
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoStatus:TodoStatus,
        TodoCreateDate:TodoCreateDate,
        TodoUpdateDate:TodoUpdateDate
    }
    //==========================================//

    TodoListModel.create(PostBody,(error,data)=>{
        if (error){
            res.status(404).json({status:'Failed',data:error});
        }else {
            res.status(201).json({status:'Success',data:data});
        }
    })
}

//Select todo
const SelectTodo = (req,res)=>{
    let UserName = req.headers['username'];
    TodoListModel.find({UserName:UserName},(error,data)=>{
        if (error){
            res.status(401).json({data:error});
        } else {
            res.status(200).json({data:data});
        }
    })
}

// Update todo
const UpdateTodo = (req,res)=>{
    let TodoSubject = req.body['TodoSubject'];
    let TodoDescription = req.body['TodoDescription'];
    let _id = req.body['_id'];
    let TodoUpdateDate = Date.now();

    let UpdateData = {
        TodoSubject:TodoSubject,
        TodoDescription:TodoDescription,
        TodoUpdateDate:TodoUpdateDate
    }

    TodoListModel.updateOne({_id:_id},{$set:UpdateData},{upsert:true},(error,data)=>{
        if (error){
            res.status(404).json({status:'Update Failed',data:error});
        }else {
            res.status(200).json({status:'Update Success',data:data});
        }
    })
}


// Todo Status Update
const UpdateStatus = (req,res)=>{
    let TodoStatus = req.body['TodoStatus'];
    let _id = req.body['_id'];
    let TodoUpdateDate = Date.now();

    let UpdateData = {
        TodoStatus:TodoStatus,
        TodoUpdateDate:TodoUpdateDate
    }

    TodoListModel.updateOne({_id:_id},{$set:UpdateData},{upsert:true},(error,data)=>{
        if (error){
            res.status(404).json({status:'Status Update Failed',data:error});
        }else {
            res.status(200).json({status:'Status Update Success',data:data});
        }
    })
}


// Remove Todo Item
const RemoveTodoItem = (req,res)=>{
    let _id = req.body['_id'];
    TodoListModel.deleteOne({_id:_id},{upsert:true},(error,data)=>{
        if (error){
            res.status(404).json({status:'Item remove failed',data:error});
        }else {
            res.status(200).json({status:'Item remove success',data:data});
        }
    })
}

// Select Todo By Status
const SelectTodoByStatus = (req,res)=>{
    let UserName = req.headers['UserName'];
    let TodoStatus = req.body['TodoStatus'];
    TodoListModel.find({UserName:UserName,TodoStatus:TodoStatus},(error,data)=>{
        if (error){
            res.status(404).json({status:'Find failed',data:error});
        }else {
            res.status(200).json({status:'Find success',data:data})

        }
    })
}

// Select Todo By Date
const SelectTodoByDate = (req,res)=>{
    let UserName = req.headers['UserName'];
    let FromDate = req.body['FromDate'];
    let ToDate = req.body['ToDate'];
    TodoListModel.find({UserName:UserName,TodoCreateDate:{$gte:new Date(FromDate),$lte:new Date(ToDate)}},(error,data)=>{
        if (error){
            res.status(404).json({status:'Data Find failed',data:error});
        }else {
            res.status(200).json({status:'Data Find success',data:data})

        }
    });

}

module.exports = {CreateTodoList,SelectTodo,UpdateTodo,UpdateStatus,RemoveTodoItem,SelectTodoByStatus,SelectTodoByDate};