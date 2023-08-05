const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const userList = await User.find().select("-passwordHash");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");

  if (!user) {
    res
      .status(404)
      .json({ message: "the user with the given ID was not found" });
  }

  res.status(200).json(user);
});

router.get(`/get/count`, async (req, res) => {
  const userCount = await User.estimatedDocumentCount();

  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.json({
    userCount: userCount,
  });
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).json({ success: false, message: "user not found" });

  res.status(200).json({ success: true, message: "the user has been removed" });
});

module.exports = router;

// router.post("/", async (req, res) => {
//   const oldUser = await User.findOne({ email: req.body.email });
//   if (oldUser) {
//     return res.status(400).json({ message: "User is already registered" });
//   }

//   let user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     passwordHash: await bcrypt.hash(req.body.password, 10),
//     phone: req.body.phone,
//     isAdmin: req.body.isAdmin,
//     street: req.body.street,
//     apartment: req.body.apartment,
//     zip: req.body.zip,
//     city: req.body.city,
//     country: req.body.country,
//   });

//   user = await user.save();

//   if (!user) return res.status(400).send("the user cannot be created");

//   res.send(user);
// });

// router.post("/register", async (req, res) => {
//   const oldUser = await User.findOne({ email: req.body.email });
//   if (oldUser) {
//     return res.status(400).json({ message: "User is already registered" });
//   }

//   let user = new User({
//     name: req.body.name,
//     email: req.body.email,
//     passwordHash: await bcrypt.hash(req.body.password, 10),
//     phone: req.body.phone,
//     isAdmin: req.body.isAdmin,
//     street: req.body.street,
//     apartment: req.body.apartment,
//     zip: req.body.zip,
//     city: req.body.city,
//     country: req.body.country,
//   });

//   user = await user.save();

//   if (!user) return res.status(400).send("the user cannot be created");

//   res.send(user);
// });

// router.post("/login", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });

//   if (!user) {
//     return res.status(400).send("The user not found");
//   }

//   if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
//     const token = jwt.sign(
//       {
//         userId: user.id,
//         isAdmin: user.isAdmin,
//       },
//       "secret",
//       {
//         expiresIn: "1d",
//       }
//     );
//     res.status(200).send({ user: user.email, token: token });
//   } else {
//     res.status(400).send("Invalid email or password");
//   }
// });
