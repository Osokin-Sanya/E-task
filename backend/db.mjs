import mongoose from "mongoose";

// Define a schema
const Schema = mongoose.Schema;

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

const ShopSchema = new Schema({
  name: Schema.Types.String,
});

const ProductSchema = new Schema({
  shopId: Schema.Types.ObjectId,
  name: Schema.Types.String,
  price: Schema.Types.Number,
  imageUrl: Schema.Types.String,
});

// Compile model from schema
const ShopModel = mongoose.model("ShopModel", ShopSchema);
const ProductModel = mongoose.model("ProductModes", ProductSchema);

/**
 * 
 * Добавить в .env файл !! ОБЯЗАТЕЛЬНО
 *  
 * process.env.DATABASE_URL=mongodb....
 * 
 * POSTMAN
 * 
 */

// Define the database URL to connect to.
const CONNECTION_STRING =
  "mongodb+srv://osokin98os:r7KO6mWMexvN9U25@cluster0.4qkgkwg.mongodb.net/?retryWrites=true&w=majority";

// Wait for database to connect, logging an error if there is a problem
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(CONNECTION_STRING);
}

export { ShopModel, ProductModel };
