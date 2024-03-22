"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const Home = () => {
  const [joke, setJoke] = useState(""); // Changed from quote to joke

  useEffect(() => {
    const fetchJoke = async () => {
      const url = "https://icanhazdadjoke.com/"; // URL for fetching jokes
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json", // Header to specify JSON response
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        if (result) {
          setJoke(result.joke); // Set the joke state
        }
      } catch (error) {
        console.error("Error fetching joke:", error);
      }
    };

    fetchJoke();
  }, []);

  return (
    <section className="flex-col w-full flex-center">
      <h1 className="text-center head_text text-tangerine-600">Hi, Tara!</h1>
      <span className="mt-6 text-2xl font-satoshi text-dark-blue-1">Here's a fresh dad joke for ya!</span>
      <div className="mt-4 text-center ">
        <p className="text-3xl text-dark-blue-1">{joke}</p> {/* Display the joke */}
      </div>
      <Image
        src="/assets/svg/floating.svg"
        alt="floating"
        width={550}
        height={550}
        className="mt-10"
      />
    </section>
  );
};

export default Home;
