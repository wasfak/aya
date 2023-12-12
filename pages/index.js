import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [food, setFood] = useState("");
  const [searching, setSearching] = useState(false);

  const handelClick = async () => {
    setSearching(true);
    try {
      const res = await fetch("/api/food", {
        method: "GET",
      });

      if (!res.ok) {
        // Handle the case where the request was not successful
        console.error(`Error fetching data: ${res.status} ${res.statusText}`);
        return;
      }

      const responseData = await res.json();

      // Check if data.food is an array before using map
      if (Array.isArray(responseData.food)) {
        const foodsList = responseData.food.map((item) => item.food);

        const getRandomFood = () => {
          const randomIndex = Math.floor(Math.random() * foodsList.length);
          return foodsList[randomIndex];
        };

        const randomFood = getRandomFood();
        setFood(randomFood);
      } else {
        // Handle the case where data.food is not an array
        console.error("Data.food is not an array:", responseData);
      }
    } catch (error) {
      // Handle other errors during the fetch operation
      console.error("Error fetching data:", error);
    } finally {
      setSearching(false);
    }
  };
  return (
    <div
      className={`flex flex-col items-center gap-y-2 justify-center p-12 ${inter.className}`}
    >
      <h1 className="text-3xl font-bold">متقرفوناش معاكو</h1>
      <button
        className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-3xl shadow-2xl mt-6"
        onClick={handelClick}
      >
        {searching ? "Searching..." : "Random Search"}
      </button>

      {food && <div className="mt-4 text-2xl font-bold">{food}</div>}
      <button className="flex items-center justify-center p-4 bg-black text-white rounded-3xl mt-6">
        <Link href="/addFood">Add Food</Link>
      </button>
      <h1 className="mt-8 text-3xl font-bold">
        Made By Ahmed/Aser Wasfy for Mama
      </h1>
    </div>
  );
}
