import db from "@/db";
import FoodModel from "@/models/foodSchema";

export default async function handler(req, res) {
  const body = await req.body;
  const foodName = body.foodName;

  try {
    await db.connectDb();
    const newFood = new FoodModel({ food: foodName });
    await newFood.save();

    return res.status(200).json({ message: "تم الاضافة بنجاح" });
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnectDb();
  }
}
