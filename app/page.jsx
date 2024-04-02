"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const Home = () => {
  const [joke, setJoke] = useState("");

  useEffect(() => {
    const fetchJoke = async () => {
      const url = "https://icanhazdadjoke.com/";
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (result) {
          setJoke(result.joke);
        }
      } catch (error) {
        console.error("Error fetching joke:", error);
      }
    };

    fetchJoke();
  }, []);

  return (
    <section className="flex flex-col w-full justify-center items-center px-4 md:px-0">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-tangerine-600">
        Hi, Tara!
      </h1>
      <h2 className="text-center my-8 font-satoshi text-2xl md:text-4xl text-dark-blue-1 px-2">
        I know you said you didn't need this, but when have you ever known me to
        listen and accept something like that?
      </h2>
      <span className="mt-0 md:mt-6 text-xl  font-satoshi text-dark-blue-1">
        Also, here's a fresh dad joke for ya!
      </span>
      <div className="mt-4 text-center ">
        <p className="text-2xl md:text-3xl text-dark-blue-1 font-bold">
          {joke}
        </p>
      </div>
      <div className="h-28 md:h-auto">
        <Image
          src="/assets/svg/floating.svg"
          alt="floating"
          width={550}
          height={550}
          className="mt-10 max-h-full h-auto"
        />
      </div>
    </section>
  );
};

export default Home;
