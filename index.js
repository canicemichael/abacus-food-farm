const express = require('express');
const path = require('path');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/about-us', (req, res) => {
    res.render('about-us');
})

app.get('/contact-us', (req, res) => {
    res.render('contact-us');
})

app.get('/fish', (req, res) => {
    res.render('fish');
})

app.get('/products', (req, res) => {
    res.render('products');
})

app.listen(4000, () => {
    console.log('server listening at port 4000');
})