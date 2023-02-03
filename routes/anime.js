const express = require('express');
const { getAnime, getTrending, createList, addAnime, updateWatch, deleteAnime, getListAnime, getLists } = require('../controllers/anime');
const router = express.Router();

router.get('/', getAnime);
router.get('/trending', getTrending);
router.post('/lists', createList);
router.post('/:list_id/anime', addAnime);
router.put('/:anime_id', updateWatch);
router.delete('/:anime_id', deleteAnime);
router.get('/lists/:list_id', getListAnime);
router.get('/lists', getLists)

module.exports = router;