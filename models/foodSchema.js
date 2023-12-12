import { Schema, model, models } from "mongoose";

// Define the schema for orders
const foodSchema = new Schema(
  {
    food: { type: String, required: true },
  },
  { timestamps: true }
);

const FoodModel = models.Food || model("Food", foodSchema);

export default FoodModel;
