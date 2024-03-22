"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const QuickAdd = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    date: "",
    symptom: "",
    trigger: "",
    time: "",
    isQuickAdd: true,
  });

  // const symptoms = ['one', 'two', 'three', 'four', 'five', 'six']
  // const triggers = ['t one', 't two', 't three', 't four', 't five', 't six']
  const [symptoms, setSymptoms] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [isSetTriggers, setIsSetTriggers] = useState(false);

  const addEntry = async () => {
    try {
      const entryResponse = await fetch("/api/new/entry", {
        method: "POST",
        body: JSON.stringify({
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          symptom: post.symptom,
          trigger: post.trigger,
          time: new Date().toLocaleTimeString("en-US", { hour12: false }),
          isQuickAdd: true,
        }),
      });

      if (entryResponse.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSymptoms = async () => {
      const response = await fetch("/api/stored/symptom");
      const data = await response.json();
      setSymptoms(data);
    };

    fetchSymptoms();
  }, [symptoms]);

  useEffect(() => {
    const fetchTriggers = async () => {
      const response = await fetch("/api/stored/trigger");
      const data = await response.json();
      setTriggers(data);
    };
    fetchTriggers();
  }, [triggers]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="pb-4 text-center head_text text-tangerine-600">Quick Add Symptom</h1>
      {isSetTriggers ? 
        <div className="flex items-center justify-center w-full mt-4">
                  <button
          onClick={() => setIsSetTriggers(false)}
          className="w-1/3 h-24 text-xl font-bold border rounded-md shadow-md sm:h-16 sm:w-fit sm:p-5 md:m-2 text-dark-blue-2 border-dark-blue-2 bg-tiffany-400"
        >
          Back to Symptoms
        </button>
        </div>
        :
        <></>
      }
      <div className={`flex flex-wrap items-center justify-center w-full p-5 ${isSetTriggers ? '' : 'mt-10'} md:max-lg:w-4/6 lg:w-1/2`}>
        {!isSetTriggers
          ? symptoms.map((symptom) => (
              <button
                key={symptom._id}
                onClick={() => {
                  setPost({ ...post, symptom: symptom.symptom });
                  setIsSetTriggers(true);
                }}
                className="h-16 m-4 text-xl font-bold border rounded-md shadow-lg w-28 md:h-32 md:w-44 text-dark-blue-2 border-dark-blue-2 bg-tiffany-400"
              >
                {symptom.symptom}
              </button>
            ))
          : triggers.map((trigger) => (
              <button
                key={trigger._id}
                onClick={() => {
                  setPost(prevPost => ({ ...prevPost, trigger: trigger.trigger }));                  console.log(post)
                  // addEntry().then(() => router.push('/')); // Added router.push here to ensure navigation after async operation
                }}
                className="h-16 m-4 text-xl font-bold border rounded-md shadow-md w-28 md:h-32 md:w-44 text-dark-blue-2 border-dark-blue-2 bg-tiffany-400"
              >
                {trigger.trigger}
              </button>
            ))}

        {/* <button className="w-1/3 h-24 m-4 text-xl font-bold rounded-md shadow-md sm:h-32 md:m-2 text-slate-700 button-gradient">
          one
        </button>
        <button className="w-1/3 h-24 m-4 text-xl font-bold rounded-md shadow-md sm:h-32 md:m-2 text-slate-700 button-gradient">
          one
        </button>
        <button className="w-1/3 h-24 m-4 text-xl font-bold rounded-md shadow-md sm:h-32 md:m-2 text-slate-700 button-gradient">
          one
        </button>
        <button className="w-1/3 h-24 m-4 text-xl font-bold rounded-md shadow-md sm:h-32 md:m-2 text-slate-700 button-gradient">
          one
        </button>
        <button className="w-1/3 h-24 m-4 text-xl font-bold rounded-md shadow-md sm:h-32 md:m-2 text-slate-700 button-gradient">
          one
        </button>
        <button className="w-1/3 h-24 m-4 text-xl font-bold rounded-md shadow-md sm:h-32 md:m-2 text-slate-700 button-gradient">
          one
        </button> */}
      </div>
    </div>
  );
};

export default QuickAdd;
