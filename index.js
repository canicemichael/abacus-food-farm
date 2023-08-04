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
app.get('/farm', (req, res) => {
    res.render('farm');
})
app.get('/grasscuter', (req, res) => {
    res.render('grasscuter');
})
app.get('/rabbit', (req, res) => {
    res.render('rabbit');
})
app.get('/snail', (req, res) => {
    res.render('snail');
})
app.get('/mushroom', (req, res) => {
    res.render('mushrooms');
})
app.get('/sugar', (req, res) => {
    res.render('sugar');
})
app.get('/spices', (req, res) => {
    res.render('spices');
})
app.get('/soyabean', (req, res) => {
    res.render('soyabean');
})
app.get('/mushroom-sub', (req, res) => {
    res.render('mushroom-sub');
})
app.get('/products', (req, res) => {
    res.render('products');
})
app.get('/cart', (req, res) => {
    res.render('cart');
})
app.get('/cart-2', (req, res) => {
    res.render('cart-2');
})

app.get('/checkout', (req, res) => {
    res.render('checkout');
})

app.listen(4000, () => {
    console.log('server listening at port 4000');
})