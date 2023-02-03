const express = require('express');
const app = express();
const PORT = 8888;
const cors = require('cors');
const animeRoutes = require('./routes/anime');

app.use(express.json());
app.use(cors());

app.use('/anime', animeRoutes)

// app.get('/', (req, res) => {
//     req.
// })

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})