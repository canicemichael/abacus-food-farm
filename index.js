const express = require('express');
const path = require('path');
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(4000, () => {
    console.log('server listening at port 4000');
})