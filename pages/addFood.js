// pages/index.js
import Link from "next/link";
import { useState } from "react";

const AddFood = () => {
  const [foodName, setFoodName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setIsloading] = useState(false);

  const handleAddFood = async () => {
    setIsloading(true);
    try {
      const response = await fetch("/api/addFood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ foodName }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setMessage(data.message);
        setIsloading(false);
      } else {
        console.error("Failed to add food.");
        setIsloading(false);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-32">
      <div className=" w-full p-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="foodName"
        >
          Food Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="foodName"
          type="text"
          placeholder="Enter food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddFood}
        >
          Add Food
        </button>
        <div>
          {message && !loading && (
            <h1 className="my-3 text-red-900 font-bold">{message}</h1>
          )}
        </div>
        <button className="flex items-center justify-center p-4 bg-black text-white rounded-3xl mt-6">
          <Link href="/">Home</Link>
        </button>
      </div>
    </div>
  );
};

export default AddFood;
