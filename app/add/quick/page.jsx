"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const QuickAdd = () => {
  const router = useRouter();

  const [symptoms, setSymptoms] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [symptom, setSymptom] = useState(undefined);

  const create = async (symptom, trigger) => {
    try {
      const date = new Date();
      const dateString = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const timeString = date.toLocaleTimeString("en-US", {
        hour12: false
      });
      const response = await fetch("/api/new/entry", {
        method: "POST",
        body: JSON.stringify({
          date: dateString,
          symptom,
          trigger,
          time: timeString,
          isQuickAdd: true,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSymptoms = async () => {
    const response = await fetch("/api/stored/symptom");
    const data = await response.json();
    setSymptoms(data);
  };

  const fetchTriggers = async () => {
    const response = await fetch("/api/stored/trigger");
    const data = await response.json();
    setTriggers(data);
  };

  useEffect(() => {
    fetchSymptoms()
    fetchTriggers()
  }, []);

  const isSymptomSelected = symptom !== undefined;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="pb-4 text-center head_text text-tangerine-600">Quick Add Symptom</h1>
      {symptom ?
        <div className="flex items-center justify-center w-full mt-4">
                  <button
          onClick={() => {
            setSymptom(undefined);
          }}
          className="w-1/3 h-24 text-xl font-bold border rounded-md shadow-md sm:h-16 sm:w-fit sm:p-5 md:m-2 text-dark-blue-2 border-dark-blue-2 bg-tiffany-400"
        >
          Back to Symptoms
        </button>
        </div>
        :
        null
      }
      <div className={`flex flex-wrap items-center justify-center w-full p-5 ${isSymptomSelected ? '' : 'mt-10'} md:max-lg:w-4/6 lg:w-1/2`}>
        {!isSymptomSelected
          ? symptoms.map((symptom) => (
              <button
                key={symptom._id}
                onClick={() => {
                  setSymptom(symptom.symptom)
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
                  create(symptom, trigger.trigger);
                }}
                className="h-16 m-4 text-xl font-bold border rounded-md shadow-md w-28 md:h-32 md:w-44 text-dark-blue-2 border-dark-blue-2 bg-tiffany-400"
              >
                {trigger.trigger}
              </button>
            ))
        }
      </div>
    </div>
  );
};

export default QuickAdd;
