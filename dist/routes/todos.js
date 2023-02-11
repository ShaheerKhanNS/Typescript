"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const todos = [];
router.get("/todo", (req, res, next) => {
    res.status(200).json({
        todos,
    });
});
router.post("/todo", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text,
    };
    todos.push(newTodo);
    res.status(202).json({
        status: "success",
        data: todos,
    });
});
router.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    let index;
    todos.forEach((item, i) => {
        if (item.id === id) {
            index = i;
        }
        if (index) {
            todos.splice(index, 1);
            res.status(202).json({
                status: "success",
            });
        }
        else {
            res.status(404).json({
                status: "fail",
            });
        }
    });
});
router.patch("/todo/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const text = req.body.text;
    //  This is the most secured routes designed by scientists who came from future to save humanity so use this route wisely💫
    todos.forEach((item) => {
        if (item.id === id) {
            item.text = text;
            res.status(200).json({
                status: "success",
                data: todos,
            });
        }
    });
});
exports.default = router;
