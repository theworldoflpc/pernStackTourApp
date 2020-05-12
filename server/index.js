const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
// get data from client side
app.use(express.json());


// ROUTES // RESTFul API
// create a cyclists
app.post("/cyclists", async (request, response) => {
    try {
      const { description } = request.body;
      const newCyclists = await pool.query(
        "INSERT INTO cyclists (description) VALUES($1) RETURNING *",
        [description]
      );
  
      // This is a built-in middleware function in Express. 
      // It parses incoming requests with JSON payloads and is based on body-parser.
      response.json(newCyclists.rows[0]);
    } catch (err) {
      console.error("POST ERROR:" + err.message);
    }
  });

// get all cyclistss
app.get("/cyclists", async (request,response) => {
    try {
        const allCyclists = await pool.query("SELECT * FROM cyclists");
        response.json(allCyclists.rows)
    } catch(e) {
        console.error("GET ERROR:" + err.message)
    }
});

// get a cyclists 
app.get("/cyclists/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const cyclists = await pool.query("SELECT * FROM cyclists WHERE cyclist_id = $1", [id]);
        response.json(cyclists.rows[0]);

    } catch (err) {
        console.error("GET SINGLE ERROR:" + err.message)
    }
})

// update a cyclists
app.put("/cyclists/:id", async (request, respone) => {
    try {
        const {id} = request.params;
        const {description} = request.body;
        const updateCyclist = await pool.query("UPDATE cyclists SET description = $1 WHERE cyclist_id = $2", [description, id]);
        respone.json("Cyclists was updated");
    } catch (err) {
        console.error("PUT ERROR:" + err.message)
    }
})

// delete a cyclists 
app.delete("/cyclists/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const deleteCyclist = await pool.query("DELETE FROM cyclists WHERE cyclist_id = $1", [id]);
        response.json("Cyclist was deleted");
    } catch (err) {
        console.error("DELETE ERROR:" + err.message)
    }
})


app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});