require("dotenv").config();
const express = require("express");
const path = require("path");
const passport = require("passport");
const cors = require("cors");
const cookieSession = require("cookie-session");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const allProductRoutes = require("./routes/all-products");
const { DryfishProduct } = require("./models/dryfish-product");
const { FishProduct } = require("./models/fish-product");
const { GrasscuterProduct } = require("./models/grasscuter-product");
const { MilkProduct } = require("./models/milk-product");
const { MushroomProduct } = require("./models/mushroom-product");
const { RabbitProduct } = require("./models/rabbit-product");
const { SnailProduct } = require("./models/snail-product");
const { SoyabeanProduct } = require("./models/soyabean-product");
const { SpicesProduct } = require("./models/spices-product");
const { SugarProduct } = require("./models/sugar-product");
const app = express();

// importing models
const { User } = require("./models/user");

// database
const { connectDb } = require("./config/dbConnect");
const exp = require("constants");
connectDb();

// Auth Setup
const localStrategy = require("passport-local").Strategy;

// middlewares
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: "xxx secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.URI,
      useUnifiedTopology: true,
      ttl: 1 * 24 * 60 * 60,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

//passport config
passport.use(
  new localStrategy(
    { usernameField: "email", passReqToCallback: true },
    (req, email, password, done) => {
      // Match user
      User.findOne({
        email: email,
      })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "Invalid Credentials, Try Again",
            });
          }
          if (user.password != password) {
            return done(null, false, { message: "Incorrect Password" });
          }
          return done(null, user);
        })
        .catch((err) => {
          return res.redirect("/");
        });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
passport.deserializeUser(function (user, done) {
  done(null, user);
});

// authRoutes
app.use(authRoutes);

// productRoutes
app.use(productRoutes);

// allproductRoutes
app.use(allProductRoutes);

// routes
app.post("/user", async (req, res) => {
  res.send("user");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about-us", (req, res) => {
  res.render("about-us");
});

app.get("/contact-us", (req, res) => {
  res.render("contact-us");
});

app.get("/fish", async (req, res) => {
  const fish = await FishProduct.find({});

  res.render("fish", { fish });
});
app.get("/farm", (req, res) => {
  res.render("farm");
});
app.get("/grasscuter", async (req, res) => {
  const grasscuter = await GrasscuterProduct.find({});
  res.render("grasscuter", { grasscuter });
});
app.get("/rabbit", async (req, res) => {
  const rabbit = await RabbitProduct.find({});
  res.render("rabbit", { rabbit });
});
app.get("/snail", async (req, res) => {
  const snail = await SnailProduct.find({});
  res.render("snail", { snail });
});
app.get("/mushroom", async (req, res) => {
  const mushroom = await MushroomProduct.find({});
  console.log(mushroom);
  res.render("mushrooms", { mushroom });
});
app.get("/sugar", async (req, res) => {
  const sugar = await SugarProduct.find({});
  res.render("sugar", { sugar });
});
app.get("/spices", async (req, res) => {
  const spices = await SpicesProduct.find({});
  res.render("spices", { spices });
});
app.get("/soyabean", async (req, res) => {
  const soyabean = await SoyabeanProduct.find({});
  res.render("soyabean", { soyabean });
});
app.get("/mushroom-sub", async (req, res) => {
  const mushroom = await MushroomProduct.find({});
  res.render("mushroom-sub", { mushroom });
});
app.get("/products", (req, res) => {
  res.render("products");
});
app.get("/cart", (req, res) => {
  res.render("cart");
});
app.get("/cart-2", (req, res) => {
  res.render("cart-2");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

app.listen(4000, () => {
  console.log("server listening at port 4000");
});
