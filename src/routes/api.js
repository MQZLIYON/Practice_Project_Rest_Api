const express = require('express');
const {CreateProfile, UserLogging, SelectProfile, UpdateProfile} = require("../controller/ProfileController");
const {AuthVerifyMiddleware} = require("../middleware/AuthVerifyMiddleware");
const {CreateTodoList, SelectTodo, UpdateTodo, UpdateStatus, RemoveTodoItem, SelectTodoByStatus, SelectTodoByDate} = require("../controller/TodoListController");
const router = express.Router();


router.post('/CreateProfile',CreateProfile);
router.post('/UserLogging',UserLogging);
router.post('/SelectProfile',AuthVerifyMiddleware,SelectProfile);
router.post('/UpdateProfile',AuthVerifyMiddleware,UpdateProfile);

//TodoList Route
router.post('/CreateTodoList',AuthVerifyMiddleware,CreateTodoList);
router.post('/SelectTodo',AuthVerifyMiddleware,SelectTodo);
router.post('/UpdateTodo',AuthVerifyMiddleware,UpdateTodo);
router.post('/UpdateStatus',AuthVerifyMiddleware,UpdateStatus);
router.post('/RemoveTodoItem',AuthVerifyMiddleware,RemoveTodoItem);
router.post('/SelectTodoByStatus',AuthVerifyMiddleware,SelectTodoByStatus);
router.post('/SelectTodoByDate',AuthVerifyMiddleware,SelectTodoByDate);

module.exports = {router};