const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser').json();
const House = require('../models/house');
const Chore = require('../models/chore');
const User = require('../models/user');
const UserChore = require('../models/user-chore');

router
  .get('/', (req, res, next) => {
      House.find()
        .then(houses => res.send(houses))
        .catch(next);
  })

  .get('/:id', (req, res, next) => {
      const houseId = req.params.id;
      Promise
      .all([
          House
          .findById(houseId)
          .lean(),
          Chore
          .find({ houseId })
          .select('name description target completed')
          .lean(),
          User
          .find(({ houseId }))
          .select('username name description')
          .lean()
      ])
      .then(([house, chores, users]) => {
          let arr = users.map(item => {
              return UserChore.find({userId: item._id})
                    .select('completed choreId')
                    .lean()
                    .then(chores => {
                        return item.choreUnits = chores;
                    });
          });

          // if you don't return, then catch won't be called on error
          return Promise.all(arr)
            .then(() => {
                house.chores = chores;
                house.users = users;
                return house;
            });
            

      })
      // more a matter of style, good to have exit not nested above
      .then(house => res.send(house))
      .catch(next);
  })

  .post('/', bodyParser, (req, res, next) => {
      new House(req.body).save()
        .then(saved => res.send(saved))
        .catch(next);
  })

  // should be POST to /api/houses/:id/users, not /api/houses/house
  .post('/house', bodyParser, (req, res, next) => {

      console.log(1, req.user);
      //TODO: Check if both name and code are provided
      const query = {};
      if (req.body.name && req.body.code) {
          query.name = req.body.name;
          query.code = req.body.code;
      }

      House.findOne(query)
            .then(house => {
                console.log(2, house);
                if (!house) {
                    throw {
                        code: 404,
                        error: `${req.body.name} not found.`
                    };
                }
                if (house.code === req.body.code) {
                    console.log(req.user._id);
                    User.findByIdAndUpdate(req.user.id, {
                        houseId: house._id}, {new: true})
                            .then(user => res.send(user))
                            .catch(next);
                }
                else if (house[0].code !== req.body.code) {
                    throw {
                        code: 401,
                        error: 'Incorrect house password'
                    };
                }
            })
                .catch(next);
  })
  .put('/:id', bodyParser, (req, res, next) => {
      House.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(updated => res.send(updated))
        .catch(next);
  })

  .delete('/:id', (req, res, next) => {
      House.findByIdAndRemove(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(next);
  });

module.exports = router;
