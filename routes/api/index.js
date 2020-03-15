const router = require('express').Router();
const isAuthenticated = require('../../config/middleware/isAuthenticated');
const db = require('../../models');

router.get('/secrets', isAuthenticated, (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});

// Queries db for cards of a certain name
router.get('/cards/:name', (req, res) => {
  console.log(`Hit GET /cards/${req.params.name}`);
  db.Card.findAll({
    where: {
      name: req.params.name,
      SetCode: 'M20',
    },
  }).then((result) => {
    res.send([result]);
  });
});

// Creates a deck with a user id and the name of the deck
router.post('/deck/:userid/:name', (req, res) => {
  db.Deck.create({
    name: req.params.name,
    UserId: req.params.userid,
  }).then((result) => {
    res.send([result]);
  });
});

// Pulls all deck names and ids for a user
router.get('/deck/:id', (req, res) => {
  db.Deck.findAll({
    where: {
      UserId: req.params.id,
    },
  }).then((result) => {
    res.send([result]);
  });
});

// Will pull the info for a deck, like decklist and name of deck.
router.get('/deckItem/:id', (req, res) => {
  db.DeckItem.findAll({
    where: {
      DeckId: req.params.id,
    },
  }).then((result) => {
    res.send([result]);
  });
});

// Deletes a deck by its id.
router.delete('/deck/:id', (req, res) => {
  db.Deck.destroy({
    where: {
      id: req.params.id,
    },
  }).then((result) => {
    res.send([result]);
  });
});

// Adds a card to a deck, or updates the quantity of a card in a deck
router.post('/deckitem/:deckID/:cardID/', (req, res) => {
  db.DeckItem.create({
    DeckId: req.params.deckID,
    CardId: req.params.cardID,
    SetCode: 'M20',
  }).then((result) => {
    res.send([result]);
  });
});

// Should remove a card from a deck Or just decrement the quantity
router.delete('/deckitem/:deckID/:cardID', (req, res) => {
  db.DeckItem.destroy({
    where: {
      deck_ID: req.params.deckID,
      card_ID: req.params.cardID,
    },
  }).then((result) => {
    res.send([result]);
  });
});


module.exports = router;
