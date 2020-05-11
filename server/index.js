const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
// get data from client side
app.use(express.json());


// ROUTES // RESTFul API
// create a todo
app.post("/todos", async (req, response) => {
    try {
      const { description } = request.body;
      const newTodo = await pool.query(
        "INSERT INTO cyclists (description) VALUES($1) RETURNING *",
        [description]
      );
  
      // This is a built-in middleware function in Express. 
      // It parses incoming requests with JSON payloads and is based on body-parser.
      response.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });

// get all todos
app.get("/todos", async (request,response) => {
    try {
        const allTodos = await pool.query("SELECT * FROM cyclists");
        response.json(allTodos.rows)
    } catch(e) {
        console.error(err.message)
    }
});

// get a todo 
app.get("/todos/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const todo = await pool.query("SELECT * FROM cyclists WHERE cyclist_id = $1", [id]);
        response.json(todo.rows[0]);

    } catch (err) {
        console.error(err.message)
    }
})

// update a todo
app.put("/todos/:id", async (request, respone) => {
    try {
        const {id} = request.params;
        const {description} = request.body;
        const updateTodo = await pool.query("UPDATE cyclists SET description = $1 WHERE cyclist_id = $2", [description, id]);
        respone.json("Cyclists was updated");
    } catch (err) {
        console.error(err.message)
    }
})

// delete a todo 
app.delete("/todos/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteTodo = await pool.query("DELETE FROM cyclists WHERE cyclist_id = $1", [id]);
        response.json("Cyclist was deleted");
    } catch (err) {
        console.error(err.message)
    }
})


app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});