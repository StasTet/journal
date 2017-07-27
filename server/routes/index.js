import express from 'express';
import Journal from '../model';

const router = express.Router();

// const json = require('../../src/file/journal.json');

//middleware to use for all requests
router.use((req, res, next) => {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/journal')
    // create a diary (accessed at POST http://localhost:8080/api/diary)
    .post((req, res) => {
        // res.send('im the about page!');
        // let diary = new Diary(); // create a new instance of the Diary model

        // diary.name = req.body.name; // set the diary name
        // diary.text = req.body.text;
        // diary.mark = req.body.mark;
        // // console.log(req);

        // // save the diary and check for errors
        // diary.save((err) => {
        //     if (err)
        //         res.send(err);

        //     res.json({
        //         message: 'Diary created!'
        //     });
        // });

    })

    // get all the diarys (accessed at GET http://localhost:8080/api/diary)
    .get((req, res) => {
        Journal.find((err, data) => {
            console.log(data)
            if (err)
                res.send(err);
            res.json(data);
        });
    })

// ----------------------------------------------------

router.route('/journal/:journal_id')
    // get the diary with that id (accessed at GET http://localhost:8080/api/diary/:diary_id)
    .get((req, res) => {
        // Diary.findById(req.params.diary_id, (err, diary) => {
        //     if (err)
        //         res.send(err);
        //     res.json(diary);
        // });
    })

    .put((req, res) => {
        // use our diary model to find the diary we want
        // Diary.findById(req.params.diary_id, (err, diary) => {

        //     if (err)
        //         res.send(err);

        //     diary.name = req.body.name; // update the diarys info
        //     diary.text = req.body.text;
        //     diary.mark = req.body.mark;

        //     // save the diary
        //     diary.save((err) => {
        //         if (err)
        //             res.send(err);

        //         res.json({
        //             message: 'Diary updated!'
        //         });
        //     });
        // })
    })

    .delete((req, res) => {
        // Diary.remove({
        //     _id: req.params.diary_id
        // }, (err, diary) => {
        //     if (err)
        //         res.send(err);

        //     res.json({
        //         message: 'Successfully deleted'
        //     });
        // });
    })

    export default router;