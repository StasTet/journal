import express from 'express';
import Journal from '../model';

const router = express.Router();

//middleware to use for all requests
router.use((req, res, next) => {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



router.route('/journal')
    // create a journal (accessed at POST http://localhost:8080/api/journal)
    .post((req, res) => {
        // create a new instance of the Journal model
        let journal = new Journal();

        journal.visible = req.body.visible,
        journal.active = req.body.active,
        journal.mark = req.body.mark,
        journal.phone = req.body.phone,
        journal.age = req.body.age,
        journal.surname = req.body.surname,
        journal.name = req.body.name
        
        // save the journal and check for errors
        journal.save((err) => {
            if (err)
                res.send(err);

            res.json({
                message: 'Journal created!'
            });
            // console.log(res)
        });

    })

    // get all the journals (accessed at GET http://localhost:8080/api/journal)
    .get((req, res) => {
        Journal.find((err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    })

// ----------------------------------------------------

router.route('/journal/:journal_id')
    // get the journal with that id (accessed at GET http://localhost:8080/api/journal/:journal_id)
    .get((req, res) => {
       Journal.findById(req.params.journal_id, (err, data) => {
            if (err)
                res.send(err);
            res.json(data);
        });
    })

    .put((req, res) => {
        // use our journal model to find the journal we want
        Journal.findById(req.params.journal_id, (err, data) => {

            if (err)
                res.send(err);

            data.mark = req.body.mark,

            // save the journal
            data.save((err) => {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Journal updated!'
                });
            });
        })
    })

    .delete((req, res) => {

        Journal.remove({
            _id: req.params.journal_id
        }, (err, data) => {
            if (err)
                res.send(err);

            res.json({
                message: 'Successfully deleted'
            });
        });
    })

    export default router;