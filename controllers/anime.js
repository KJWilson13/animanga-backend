const axios = require('axios');
const db = require('../models');
const nanoid = require('nanoid');

const getAnime = async (req, res) => {
   const url = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=0`;
   const url2 = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=10`;
   const url3 = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=20&page%5Boffset%5D=20`;

   
   const cleanData = [];

    const response = await axios.get(url)
    const response2 = await axios.get(url2)
    const response3 = await axios.get(url3)

    const animes = [...response.data.data, ...response2.data.data, ...response3.data.data]
    
    console.log(animes.length)
    
    for (anime of animes) {
        const cleanedAnime = {
            synopsis: anime.attributes.synopsis,
            title: anime.attributes.titles.en,
            japTitle: anime.attributes.titles.ja_jp,
            status: anime.attributes.status,
            ageRating: anime.attributes.ageRating,
            rating: anime.attributes.averageRating,
            image: anime.attributes.posterImage.medium
        }

        cleanData.push(cleanedAnime);
    }
    console.log(cleanData.length)
    res.status(200).send(cleanData)
};

const getTrending = async (req, res) => {
    const url = `https://kitsu.io/api/edge/trending/anime`;

    const response = await axios.get(url)
    const cleanData = []

    for (anime of response.data.data) {
        const cleanedAnime = {
            synopsis: anime.attributes.synopsis,
            title: anime.attributes.titles.en,
            japTitle: anime.attributes.titles.ja_jp,
            status: anime.attributes.status,
            ageRating: anime.attributes.ageRating,
            rating: anime.attributes.averageRating,
            image: anime.attributes.posterImage.medium
        }

        cleanData.push(cleanedAnime);
    }


    res.status(200).send(cleanData)
}

const createList = async (req, res) => {
    const { body } = req;

    try {
        const list = await db.List.create({
            list_id: nanoid(),
            title: body.title
        })

        res.status(200).send(list);
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

const addAnime = async (req, res) => {
    const { body } = req;
    const { params } = req;

    try {
        const anime = await db.Anime.create({
            title: body.title,
            image: body.image,
            rating: body.rating,
            isWatched: false,
            synopsis: body.synopsis.substring(0, 255),
            list_id: params.list_id
        })

        res.status(200).send(anime);

    } catch (error) {

        res.sendStatus(500)
        console.log(error)
    }
}

const updateWatch = async (req, res) => {
    const { params } = req;
    const { body } = req;

    try {
       await db.Anime.update( { isWatched: body.isWatched }, {
            where: { id: params.anime_id }
        })

        res.status(200).send({status: 200, msg: `Anime with id: ${params.anime_id} updated.`});

    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

const deleteAnime = async (req, res) => {
    const { params } = req;

    try {
         await db.Anime.destroy({
            where: {
                id: params.anime_id
            }
        })

        res.status(200).send({status: 200, msg: `Anime with id: ${params.anime_id} deleted.`})

    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

const getListAnime = async (req, res) => {
    const { params } = req;

    try {
        const animes = await db.Anime.findAll({
            where: { list_id: params.list_id }
        });
        // console.log(animes)

        res.status(200).send(animes);

    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

const getLists = async (req, res) => {
    const { params } = req; 

    try {
        const lists = await db.List.findAll()
        res.status(200).send(lists)
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
}

module.exports = {
    getAnime , 
    getTrending,
    createList,
    addAnime,
    updateWatch,
    deleteAnime,
    getListAnime,
    getLists
}