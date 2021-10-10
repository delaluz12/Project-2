const router = require('express').Router();
const { Person, Post, User, Unit, Neighborhood, Event } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET Post data for the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        visibility: 'local',
      },
      attributes: ['title', 'content', 'created_at'],
      include: [{
        model: User,
        attributes: ['email'],
        include: [{
          model: Person,
          attributes: ['first_name', 'last_name']
        },
        {
          model: Unit,
          where: {
            neighborhood_id: req.session.neighborhood_id
          }
        }],
      }]
    });
    // console.log(dbPostData);
    const posts = dbPostData.map((post) =>
      post.get({ plain: true })
    );

    res.render('dashboard', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET household data for the dashboard
router.get('/household', withAuth, async (req, res) => {
  try {

    const dbHouseholdData = await Unit.findAll({
      where: {
        neighborhood_id: req.session.neighborhood_id
      },
      attribute: ['id'],
      include: [{
        model: Person,
      }]
    });
    const household = dbHouseholdData.map((household) =>
      household.get({ plain: true })
    );
    res.render('household', {
      household,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET all neighbors
router.get('/neighbors', withAuth, async (req, res) => {
  try {
    const dbNeighborData = await Person.findAll({
      include: [{
        model: Unit,
        include: Neighborhood
      }],
    });
    const neighbors = dbNeighborData.map((neighbors) =>
      neighbors.get({ plain: true })
    );
    res.render('roster', {
      neighbors,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET neighborhood roster page
router.get('/roster', withAuth, async (req, res) => {
  try {
    const dbUnitData = await Unit.findAll({
      where: {
        neighborhood_id: req.session.neighborhood_id
      },
      include: [
        {
          model: Person,
          order: ['type', 'ASC'],
          include: [
            {
              model: User,
              // order: ['type'],
              attributes: ['email'],
            },
          ],
        },
      ],
    });
    const units = dbUnitData.map((unit) =>
      unit.get({ plain: true })
    );
    res.render('roster', {
      units,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST new post
router.get('/newpost', withAuth, (req, res) => {
  try {
    if(!req.session.loggedIn){
      res.render('/login');
    }
    res.render('newPost', {loggedIn: req.session.loggedIn});

  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
})



module.exports = router;