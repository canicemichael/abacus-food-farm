require("dotenv").config();
const express = require("express");
const path = require("path");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
const { Order } = require("./models/order");
const { getTransport, getMailOptions } = require("./service.js");
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

// cookie parser
app.use(cookieParser());

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
  // console.log(mushroom);
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

app.post("/set-cookies", (req, res, next) => {
  const date = new Date();
  date.setHours(date.getHours() + 5);
  const time = date.getTime();

  const array = [req.body.item_name, req.body.item_price, req.body.item_src];

  const existingUsername = req.cookies.numbers;
  console.log(typeof existingUsername);

  const obj = {};

  existingUsername.forEach((element, index) => {
    obj[`key${time}`] = element;
  });

  if (existingUsername) {
    const newArray = existingUsername + array;

    res.cookie("numbers", newArray, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days

    // console.log(`Cookie updated. Old username: ${existingUsername}, New username: ${array}`);
    // console.log(newArray);
    console.log(req.cookies);
    // res.sendStatus(200).json(newArray);
  } else {
    res.cookie(`numbers`, array);
    res.send("Cookie not found");
  }

  // console.log(req.body);
  // res.send(req.body);
});

app.get("/get-cookies", (req, res, next) => {
  console.log(req.cookies.isLoggedin);
  // true

  // res.json(JSON.parse(localStorage.getItem('cart')) || []);
  window.localStorage.setItem("key1", "value1");

  console.log(localStorage);
  res.send(localStorage);
});

app.post("/deletecookie", (req, res) => {
  //show the saved cookies
  res.clearCookie("isLoggedin");
  res.send("Cookie has been deleted successfully");
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

app.post("/order", async (req, res) => {
  const receivedData = req.body; // Data sent from the frontend
  console.log("Received Data:", receivedData);

  // save receivedData in the backend
  const newOrder = new Order({
    first_name_mail: receivedData.first_name_mail,
    last_name_mail: receivedData.last_name_mail,
    email_mail: receivedData.email_mail,
    phone_mail: receivedData.phone_mail,
    address_mail: receivedData.address_mail,
    town_mail: receivedData.town_mail,
    state_name_mail: receivedData.state_name_mail,
    delivery_location_mail: receivedData.delivery_location_mail,
    delivery_price_mail: receivedData.delivery_price_mail,
    item_details_mail: receivedData.item_details_mail,
    subtotal_mail: receivedData.subtotal_mail,
    actual_total_mail: receivedData.actual_total_mail,
  });

  await newOrder.save();

  // send receivedData to a mail

  //Create mailrequest
  let mailRequest = getMailOptions("canicecodes@gmail.com", newOrder);

  //Send mail
  return getTransport().sendMail(mailRequest, (error) => {
    if (error) {
      res.status(500).send("Can't send email.");
    } else {
      // res.status(200).json('good');
      res.redirect("/payment"); //redirect to a page i want.
    }
  });
});

app.get("/payment", (req, res) => {
  res.render("payment");
});

app.get("/send-mail", async (req, res) => {
  //Create mailrequest
  let mailRequest = getMailOptions("canicecodes@gmail.com", "some link");

  //Send mail
  return getTransport().sendMail(mailRequest, (error) => {
    if (error) {
      res.status(500).send("Can't send email.");
    } else {
      // res.status(200).json('good');
      res.redirect("/payment"); //redirect to a page i want.
    }
  });
});

app.listen(4000, () => {
  console.log("server listening at port 4000");
});
