const todos = ['cook dinner', 'walk the dog']

const express = require('express')
const router = express.Router()

// GET /todos
router.route('/')
  .get((req, res) => {
    // 1. Respond with the array of todos
    res.status(200).send({
      data: todos
    })
  })

router.route('/')
  .post((req, res) => {
    // 1. Grab the new todo from the request body
    const todo = req.body.todo
    // 2. Push it into our todo array
    todos.push(todo)
    // 3. Respond with the updated todos array
    res.status(201).send({
      data: [todo]
    })
  })

  // DELETE /todos/2
router.route('/:index')
  .delete((req, res) => {
    // 1. Grab the todo index from the url params.
    // same as writing index = req.params.index
    const { index } = req.params

    // 2. Splice the old todo out of the todos array
    const removedTodo = todos.splice(index, 1)

    // 3. Respond with the deleted todo
    res.status(202).send({
      data: removedTodo
    })
  })

exports.router = router