const dotenv = require('dotenv');
dotenv.config();


const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Planet = require('./models/planet.js');

app.use(express.urlencoded({ extended: false }));




//GET//
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/planets', async (req, res) => {
    const allPlanets = await Planet.find();
    res.render('planets/index.ejs', { planets: allPlanets});
});

app.post("/planets", async (req, res) => {
    if (req.body.hasRings === "on") {
      req.body.hasRings = true;
    } else {
      req.body.hasRings = false;
    }
    
    req.body.diameter = Number(req.body.diameter);
    req.body.distanceFromSun = Number(req.body.distanceFromSun);
    req.body.numberOfMoons = Number(req.body.numberOfMoons);
    req.body.surfaceTemperature = Number(req.body.surfaceTemperature);
    
    await Planet.create(req.body);
    res.redirect("/planets");
  });





app.get('/planets/new', (req, res) => {
    res.render('planets/new.ejs');
});















app.listen(3000, () => {
    console.log('Listening on port 3000');
});

