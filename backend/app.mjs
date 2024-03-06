import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { ShopModel, ProductModel } from "./db.mjs";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Seed data
app.get("/", async (req, res) => {
  await ShopModel.deleteMany({});
  await ProductModel.deleteMany({});

  // Create shops
  await ShopModel.create({ name: "Mc Donalds" });
  await ShopModel.create({ name: "KFC" });
  await ShopModel.create({ name: "Puzata Hata" });

  const allShops = await ShopModel.find({});

  const mcDonaldsId = allShops.find((shop) => shop.name === "Mc Donalds");
  const kfcId = allShops.find((shop) => shop.name === "KFC");
  const PuzataHataId = allShops.find((shop) => shop.name === "Puzata Hata");

  // Create products
  await ProductModel.create({
    shopId: mcDonaldsId,
    name: "Біг Мак",
    price: 300,
    imageUrl: "",
  });

  await ProductModel.create({
    shopId: mcDonaldsId,
    name: "Гамбургер",
    price: 500,
    imageUrl: "",
  });

  await ProductModel.create({
    shopId: mcDonaldsId,
    name: "Чізбургер",
    price: 500,
    imageUrl: "",
  });

  await ProductModel.create({
    shopId: kfcId,
    name: "ШЕФБУРГЕР",
    price: 200,
    imageUrl: "",
  });

  await ProductModel.create({
    shopId: kfcId,
    name: "ЧІЗБУРГЕР ДЕ ЛЮКС",
    price: 200,
    imageUrl: "",
  });

  await ProductModel.create({
    shopId: kfcId,
    name: "ДАБЛ ЧІКЕН",
    price: 200,
    imageUrl: "",
  });

  await ProductModel.create({
    shopId: PuzataHataId,
    name: "Картопля смажена",
    price: 40,
    imageUrl: "",
  });

  await ProductModel.create({
    shopId: PuzataHataId,
    name: "Млинці з вишнями",
    price: 54,
    imageUrl: "",
  });

  await ProductModel.create({
    shopId: PuzataHataId,
    name: "Тістечко Тірамісу",
    price: 58,
    imageUrl: "",
  });

  const allProducts = await ProductModel.find({});

  res.json({
    shops: allShops,
    products: allProducts,
  });
});

app.get("/shops", async (req, res) => {
  const allShops = await ShopModel.find({});
  res.json(allShops);
});

app.get("/products", async (req, res) => {
  const allProducts = await ProductModel.find({});

  res.json(allProducts);
});

// Создание
// app.post("/order", async (request, response) => {
//   console.log(request.body);

//   // Validate datas

//   await OrderModel.create({});

//   response.json("ok");
// });

// // Вернуть все
// app.get("/order", async (req, res) => {
//   console.log(req);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
