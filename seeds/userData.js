const { User } = require('../models');
const bcrypt = require('bcryptjs');

var admin1 = bcrypt.hashSync('admin1');
var admin2 = bcrypt.hashSync('admin2');
var user1 = bcrypt.hashSync('user1');
var user2 = bcrypt.hashSync('user2');
var user3 = bcrypt.hashSync('user3');
var user4 = bcrypt.hashSync('user4');
var user5 = bcrypt.hashSync('user5');

const userdata = [
  {
    email: 'admin1@test.com',
    password: admin1,
    role_id: 1,
    neighborhood_id: 1,
  },
  {
    email: 'admin2@test.com',
    password: admin2,
    role_id: 1,
    neighborhood_id: 2,
  },
  {
    email: 'user1@test.com',
    password: user1,
    role_id: 2,
    neighborhood_id: 1,
  },
  {
    email: 'user2@test.com',
    password: user2,
    role_id: 2,
    neighborhood_id: 1,
  },
  {
    email: 'user3@test.com',
    password: user3,
    role_id: 2,
    neighborhood_id: 1,
  },
  {
    email: 'user4@test.com',
    password: user4,
    role_id: 2,
    neighborhood_id: 1,
  },
  {
    email: 'user5@test.com',
    password: user5,
    role_id: 2,
    neighborhood_id: 1,
  },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;