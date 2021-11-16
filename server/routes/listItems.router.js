const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");

/**
 * GET route for list items
 */
router.get('/', (req, res) => {

    const query = `SELECT * FROM tasks 
    JOIN "user" ON "user"."id" = "tasks"."user_id"
    WHERE "user_id" = $1`;

    pool.query(query, [req.user.id])
        .then( result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all tasks', err);
            res.sendStatus(500)
        })

});

// /**
//  * POST route template
//  */
// router.post('/', (req, res) => {
//   // POST route code here
// });

// router.post('/', (req, res) => {
//     console.log(req.body);
//     // RETURNING "id" will give us back the id of the created movie
//     const insertAddTaskQuery = `
//     INSERT INTO "tasks" ("task", "due_date", "importance", "time_requirement", "notes")
//     VALUES ($1, $2, $3, $4, $5)`;

//     //RETURNING "id";`
  
//     // FIRST QUERY MAKES MOVIE
//     pool.query(insertAddTaskQuery, [req.body.task, req.body.due_date, req.body.importance, req.body.time_requirement, req.body.notes])
//     .then(result => {
//       //console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
      
//       const createdMovieId = result.rows[0].id
  
//       // Now handle the genre reference
//       const insertMovieGenreQuery = `
//         INSERT INTO "movies_genres" ("movie_id", "genre_id")
//         VALUES  ($1, $2);
//         `
  
//   // Catch for first query
//     }).catch(err => {
//       console.log(err);
//       res.sendStatus(500)
//     })
//   })




  router.post("/", rejectUnauthenticated, (req, res) => {
    // endpoint functionality
    const newTask = req.body;
    console.log(newTask);
  
    const query = `
    INSERT INTO "tasks" ("task", "due_date", "importance", "time_requirement", "notes", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6)`;
  
    const values = [newTask.task, newTask.due_date, newTask.importance, newTask.time_requirement, newTask.notes, req.user.id];
  
    pool
      .query(query, values)
      .then((result) => {
        console.log("POST SUCCESS");
        res.sendStatus(201);
      })
      .catch((error) => {
        console.log("POST ERROR", error);
        res.sendStatus(500);
      });
  });

module.exports = router;