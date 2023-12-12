import db from "@/db";
import FoodModel from "@/models/foodSchema";

export default async function handler(req, res) {
  try {
    await db.connectDb();

    const food = await FoodModel.find({});
    return res.status(200).json({ food });
  } catch (error) {
    console.log(error);
  } finally {
    await db.disconnectDb();
  }
}
