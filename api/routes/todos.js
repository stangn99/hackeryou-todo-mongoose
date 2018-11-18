const todos = ['cook dinner', 'walk the dog'];

const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');




// GET /todos
router.route('/')
  .get(async(req, res, next) => {
    // 1. Get all todos in our DB
    try {
      // Go the all todo documents - this operation is async, which means we need to make the function async and await
      // await Todo.remove({});
      const docs = await Todo.find({}) 
      // 2. if successful, send todos to user
      res.status(200).send({ data: docs}) // docs is already an array
    } catch (error) {
      // 3. if unsuccessful, send error through middleware
      next(error)
    }
  })

router.route('/')
  // Add async to make it a promise
  // next is like the middleware

  .post(async(req, res, next) => {
    // 1. Grab the new todo from the request body
    const description = req.body.todo

    // 2. Instntiaite Todo model
    const todo = new Todo({
      description
    })

    
    try {
      // 3. Save the document!
      const doc = await todo.save();
      
      // 4. Respond with the created todo
      res.status(201).send({
        data: [doc]
      })
    } catch (error) {
      // 5. If error, send to the error handler
      next(error)
      // We don't use this method because it floods the API with error functions
      // res.status(500).send({
      //   console.log('something went wrong')
      // })
    }
  })

  // DELETE /todos/2
router.route('/:id')
  .delete(async(req, res, next) => {
    // 1. Grab the todo OBJECT ID from the url params.
    // same as writing id = req.params.index
    const { id } = req.params

    // 2. find the matching todo by ID and removing it
    try {
      const doc = await Todo.findByIdAndRemove({ _id: id });
      
      // 3. Respond with the deleted todo
      res.status(202).send({
        data: [doc]
      })
    } catch (error) {
      next(error);
    }
  })



  // PATCH /todos/:id/complete
  // e.g. /todos/234jk34kjh3jkb2k34jb234jkb/
  router
    .route('/:id/complete')
    .patch(async (req, res, next) => {
      // 1. Grab ID from query params
      const { id } = req.params;

      try {
      // 2. Find the existing todo in our DB by it's ID
      // 3. Flip the booleans value of completed on that todo and save it
        const doc = await Todo.findByIdAndUpdate(id, { completed: true })
        
        // 4. Send back the updated todo
        res.status(200).send({
          data: [doc]
        })
      } catch (error) {
        next(error)
      }
    })


exports.router = router