const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const User = require('../models/user');
const UserChore = require('../models/user-chore');

router
    .get('/', (req, res, next) => {
        if (req.query.all) {
            User.find()
                .select('username description houseId')
                .populate({
                    path: 'houseId',
                    select: 'name'
                })
                .lean()
                .then(users => res.send(users))
                .catch(next);
        } else {
            const userId = req.user.id;

            Promise.all([
                User.findById(userId)
                    .lean()
                    .then(user => {
                        if(!user) throw {
                            code: 404,
                            error: `user ${userId} does not exist`
                        };
                        return user;
                    }),
                UserChore.find({userId})
                    .select('completed')
                    .lean()
            ])
            .then(([user, chores]) => {
                user.choreUnits = chores;
                res.send(user);
            })
            .catch(next);
        }
    })

    .put('/', bodyParser, (req, res, next) => {
        User.findByIdAndUpdate(req.user.id, req.body, {new: true})
            .then(updated => res.send(updated))
            .catch(next);
    })

    .delete('/', (req, res, next) => {
        User.findByIdAndRemove(req.user.id)
            .then(deleted => res.send(deleted))
            .catch(next);
    });


module.exports = router;
