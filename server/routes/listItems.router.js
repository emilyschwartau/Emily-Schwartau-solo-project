const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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

module.exports = router;