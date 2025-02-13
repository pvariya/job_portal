const express = require('express');
const { createTask, getTasks } = require('../controller/taskComtroller');
const taskRoute =  express.Router();

taskRoute.post("/create",createTask); 
taskRoute.get("/",getTasks);

module.exports = taskRoute;