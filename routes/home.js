const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET Route for retrieving all the tips
router.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific tip
router.get('/note/:note_id', (req, res) => {
  const tipId = req.params.note_id;
  readFromFile('./db/tips.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((tip) => tip.note_id === tipId);
      return result.length > 0
        ? res.json(result)
        : res.json('No tip with that ID');
    });
});




// GET Route for homepage
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// // GET Route for feedback page
router.get('/addnote', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/pages/notes.html'))
);

// // Wildcard route to direct users to a 404 page
// router.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// );
module.exports = router;
