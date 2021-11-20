

const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");



//successful get route for list items
router.get('/', (req, res) => {

    const query = 
    `SELECT "tasks"."id", "user_id", "task", "due_date", "importance", "completion_status", "notes", "time_requirement" FROM tasks 
    JOIN "user" ON "user"."id" = "tasks"."user_id"
    WHERE "user_id" = $1;`

    pool.query(query, [req.user.id])
        .then( result => {

            //result.rows is an array of all rows in the task table, of the logged in user's tasks
            //each row as a separate object, with all the columns as properties
            let taskArray = result.rows;

            console.log('taskArray', taskArray);
            {taskArray.map(task => {
              let xValue = (task.importance * .01) * (14);

              const current = new Date();
              const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
          
              // To set two dates to two variables
              //date1 is today's date, date2 is due date
              let date1 = new Date(date);
              let date2 = new Date(task.due_date);
            
              // To calculate the time difference of two dates
              let DifferenceInTime = date2.getTime() - date1.getTime();
            
              // To calculate the no. of days between two dates
              let DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);

              let yValue = (14)-DifferenceInDays;

              let priorityValue = xValue * yValue;

              Object.assign(task, {xValue: xValue});
              Object.assign(task, {yValue: yValue});
              Object.assign(task, {priorityValue: priorityValue});
                return (
                    console.log('priorityValue', priorityValue)
                )
            })}
            
            res.send(taskArray);   
        })
        .catch(err => {
            console.log('ERROR: Get all tasks', err);
            res.sendStatus(500)
        })

});


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

//update completion status route
router.put('/:id', (req, res) => {

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

//update task details route (not yet functional)
router.put('edit/:id', (req, res) => {

    // let queryText = `
    // UPDATE "tasks"
    // SET "completion_status" = true
    // WHERE "id" = $1
    // AND user_id = $2;
    // `
    const values = [req.params.id, req.user.id];

    pool.query(queryText, values).then(result => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.sendStatus(500);
    })

});

module.exports = router;
