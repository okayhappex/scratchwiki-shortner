// Mise en place des env
const dotenv = require('dotenv');
dotenv.config();

// Mise en place de l'application express
const express = require('express');
const app = express();
const port = 5000;

// Init. de la database
const { Deta } = require('deta');
const deta = Deta(process.env.DATA_KEY);
const links = deta.Base('links');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/new', async (req, res) => {
    let article = await links.get(req.query.id);

    if (article) {
        res.status(409).redirect(`https://fr.scratch-wiki.info/wiki/${req.query.link}`).json(article);
    } else if (req.query.link) {
        await links.put(data = { "link": req.query.link }, key = req.query.id);
        res.status(200).redirect(`https://fr.scratch-wiki.info/wiki/${req.query.link}`);
    } else {
        res.status(400).send("Bad Request");
    }
}); // Libre pour l'instant, peut-être réservée aux personnes détenant un compte Scratch dans le futur

app.get('/:id', async (req, res) => {
    let article = await links.get(req.params.id);

    if (article) {
        res.redirect(`https://fr.scratch-wiki.info/wiki/${article.link}`);
    } else {
        res.status(404).send("Not Found");
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});