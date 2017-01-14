const express = require('express');
const router = express.Router();
//import model(s)
const Chore = require('../models/chore');
const UserChore = require('../models/user-chore');

//middleware
const bodyParser = require('body-parser').json();

const moment = require('moment');

router
    .get('/', (req, res, next) => {

        Chore.find()
            .populate({
                path: 'houseId',
                select: 'name'
            })
            .lean()
            .then(chores => res.send(chores))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Chore.findById(req.params.id)
            .then(chore => res.send(chore))
            .catch(next);
    })

    .post('/', bodyParser, (req, res, next) => {
        new Chore(req.body).save()
            .then(saved => res.send(saved))
            .catch(next);
    })
    // hmm, not sure what this should be (other than "many").
    // I think a straight PATCH to /api/chores would make sense
    .put('/many', bodyParser, (req, res, next) => {
        // assume we get our data as an array of chore IDs

        function updateCompleted(chore) {

            const date = moment().format('MMM YYYY');
            console.log(date);

            //update chore.completed

            if (!chore.completed) {
                chore.completed = {};
            } 
            
            if (!chore.completed[date]) {
                chore.completed[date] = 1;
            } else {
                chore.completed[date] ++;
            }

            var {completed} = chore;
            // is this a mongoose work-around?
            chore.completed = Object.create(null);
            chore.completed = completed;

            return chore.save();
        }

        var arr = req.body.map(id => {
            return Promise.all([
                Chore.findById(id)
                    .then(chore => updateCompleted(chore)),
                UserChore.findOne({choreId: id})
                    .then(chore => {
                        if (chore) return chore;
                        return new UserChore ({userId: req.user.id, choreId: id}).save();
                    })
                    .then(chore => updateCompleted(chore))
            ]);
        });

        var successMessage = {'success': true};
        Promise.all(arr)
            .then(() => res.send(successMessage))
            .catch(next);
    })

    .put('/:id', bodyParser, (req, res, next) => {
        Chore.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Chore.findByIdAndRemove(req.params.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });

module.exports = router;
