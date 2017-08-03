import express from 'express';
import Journal from '../model';

const router = express.Router();

//middleware to use for all requests
router.use((req, res, next) => {
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// Нуобходима для обработки ошибок в асинхронных функциях .get(), .post(), .put(), .delete()
const asyncMiddleware = (fn) => {
    return (req, res, next) => {
        let ret = fn(req, res, next);

        if (ret && ret.catch && ret.then) {
            ret.catch(console.log);
        }
        return ret;
    }
}

router.route('/journal')
    // create a journal (accessed at POST http://localhost:8080/api/journal)
    .post(asyncMiddleware(async(req, res) => {
        console.log(`Creating journal: ${JSON.stringify(req.body)}`);
            // create a new instance of the Journal model
        const journal = new Journal();

        // Object.assign(journal, req.body)

        journal.visible = req.body.visible;
        journal.active = req.body.active;
        journal.mark = req.body.mark;
        journal.phone = req.body.phone;
        journal.age = req.body.age;
        journal.surname = req.body.surname;
        journal.name = req.body.name;
        
        // save the journal and check for errors
        const data = await journal.save()

        res.json({
            message: 'Journal created!',
            id: data.id
        })

        // Promise
        // journal.save()
        //     .then((data) => {
        //         res.json({
        //             message: 'Journal created!',
        //             id: data.id
        //         })
        //     })
        //     .catch((err) => {
        //         res.send(err);
        //     })
    }))

    // get all the journals (accessed at GET http://localhost:8080/api/journal)
    .get(asyncMiddleware(async(req, res) => {
        console.log('Retrieving journals');
        const data = await Journal.find()

        res.json(data)

        // Promise
        // Journal.find()
        //     .exec()
        //     .then((data) => {
        //         res.json(data)
        //     })
        //     .catch((err) => {
        //         res.send(err)
        //     })
    }))

// ----------------------------------------------------

router.route('/journal/:id')
    // get the journal with that id (accessed at GET http://localhost:8080/api/journal/:id)
    .get(asyncMiddleware(async(req, res) => {
        console.log(`Retrieving journal id ${req.params.id}`);
        const data = await Journal.findOne({
            _id: req.params.id
        })

        res.json(data)
        // Promise
        // Journal.findOne({
        //     _id: req.params.id
        // })
        // .exec()
        // .then((data) => {
        //     res.json(data)
        // })
        // .catch((err) => {
        //     res.send(err)
        // })
    }))

    .put(asyncMiddleware(async(req, res) => {
        // use our journal model to find the journal we want
        console.log(`Updating journal id ${req.params.id} to: ${JSON.stringify(req.body)}`);
        const data = await Journal.findOne({
            _id: req.params.id
        })

        data.visible = req.body.visible;
        data.active = req.body.active;
        data.mark = req.body.mark;
        data.phone = req.body.phone;
        data.age = req.body.age;
        data.surname = req.body.surname;
        data.name = req.body.name;
        
        await data.save();
        res.json({
            message: 'Journal updated!'
        })

        // Promise
        // Journal.findOne({
        //     _id: req.params.id
        // })
        // .exec()
        // .then((data) => {
        //     data.mark = req.body.mark
        //     data.save(() => {
        //         res.json({
        //             message: 'Journal updated!'
        //         })
        //     })
        // })
        // .catch((err) => {
        //     res.send(err)
        // })
    }))

    .delete(asyncMiddleware(async(req, res) => {
        console.log(`Deleting journal id ${req.params.id}`);
        const data = await Journal.remove({
            _id: req.params.id
        })

        res.json({
            message: 'Journal deleted!'
        })

        
        // Promise
        // Journal.remove({
        //     _id: req.params.id
        // })
        // .exec()
        // .then((data) => {
        //     res.json({
        //         message: 'Successfully deleted'
        //     })
        // })
        // .catch((err) => {
        //     res.send(err)
        // })
    }))

    export default router;