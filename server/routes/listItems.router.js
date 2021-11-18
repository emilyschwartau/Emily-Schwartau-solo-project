

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");

/**
 * GET route for list items
 */

//successful get route
router.get('/', (req, res) => {

    const query = 
    `SELECT "tasks"."id", "user_id", "task", "due_date", "importance", "completion_status", "notes", "time_requirement" FROM tasks 
    JOIN "user" ON "user"."id" = "tasks"."user_id"
    WHERE "user_id" = $1;`

    pool.query(query, [req.user.id])
        .then( result => {
        //do math for x, y, and priority value here/ massage the data
            //handlePriorityValue();
            //have priority value and x & y sent somehow
            console.log(result.rows);
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


//successful post route
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


router.delete("/:id", rejectUnauthenticated, (req, res) => {
    // endpoint functionality
    const queryText = `
      DELETE FROM tasks
      WHERE id = $1
      AND user_id = $2;
    `;
  
    const values = [req.params.id, req.user.id];
  
    pool.query(queryText, values)
      .then(result => {
        res.sendStatus(204);
      }).catch(err => {
        console.log(err)
        res.sendStatus(500);
      })
  });

//update route
router.put('/:id', (req, res) => {
//     let id = req.params.id;
//    console.log(id);

    let queryText = `
    UPDATE "tasks"
    SET "completion_status" = true
    WHERE "id" = $1
    AND user_id = $2;
    `
    const values = [req.params.id, req.user.id];

    pool.query(queryText, values).then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

});





module.exports = router;

//priority value calculations here??? move module.exports = router to the bottom of page?
const handlePriorityValue = () => {
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    // To set two dates to two variables
    //date1 is today's date, date2 is due date
    let date1 = new Date(date);
    let date2 = new Date(userInputs.due_date);
  
    // To calculate the time difference of two dates
    let DifferenceInTime = date2.getTime() - date1.getTime();
  
    // To calculate the no. of days between two dates
    let DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);

    let xValue = (userInputs.importance * .01) * (14);
    let yValue = (14)-DifferenceInDays;

    priorityValue = xValue * yValue;

        return (
            priorityValue
            
        )
}
