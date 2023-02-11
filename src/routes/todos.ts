import { Router } from "express";

import { Todo } from "../models/todos";

const router = Router();

const todos: Todo[] = [];

router.get("/todo", (req, res, next) => {
  res.status(200).json({
    todos,
  });
});
router.post("/todo", (req, res, next) => {
  const newTodo: Todo = {
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
  let index: number;
  todos.forEach((item, i) => {
    if (item.id === id) {
      index = i;
    }

    if (index) {
      todos.splice(index, 1);
      res.status(202).json({
        status: "success",
      });
    } else {
      res.status(404).json({
        status: "fail",
      });
    }
  });
});

router.patch("/todo/:id", (req, res) => {
  const body = req.body as { text: string };
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

export default router;
