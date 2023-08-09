const router = require("express").Router();
const { Category } = require("../models/category");
const { Product } = require("../models/product");
const { DryfishProduct } = require("../models/dryfish-product");
const { FishProduct } = require("../models/fish-product");
const { GrasscuterProduct } = require("../models/grasscuter-product");
const { MilkProduct } = require("../models/milk-product");
const { MushroomProduct } = require("../models/mushroom-product");
const { RabbitProduct } = require("../models/rabbit-product");
const { SnailProduct } = require("../models/snail-product");
const { SoyabeanProduct } = require("../models/soyabean-product");
const { SpicesProduct } = require("../models/spices-product");
const { SugarProduct } = require("../models/sugar-product");
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(" ").join("-");
    const extention = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${filename}-${Date.now()}.${extention}`);
  },
});

const upload = multer({ storage: storage });

router.post('/fish-product', upload.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads`;

  const product = new FishProduct({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    price: req.body.price,
    category: req.body.category,
  });

  if (!product) {
    return res
      .status(401)
      .json({ success: false, message: "the product cannot be created" });
  }

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.post(`/dryfish-product`, upload.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send("No image in the request");

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads`;

  const product = new DryfishProduct({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: `${basePath}${fileName}`,
    price: req.body.price,
    category: req.body.category,
  });

  if (!product) {
    return res
      .status(401)
      .json({ success: false, message: "the product cannot be created" });
  }

  product
    .save()
    .then((createdProduct) => {
      res.status(201).json(createdProduct);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product Id");
  }

  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    {
      new: true,
    }
  );

  if (!product)
    return res
      .status(404)
      .json({ success: false, message: "category not found" });

  res.status(200).json(product);
});

router.put(
  "/gallery-images/:id",
  upload.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Product Id");
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads`;

    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.fileName}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      {
        new: true,
      }
    );

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "category not found" });

    res.status(200).json(product);
  }
);

module.exports = router;
