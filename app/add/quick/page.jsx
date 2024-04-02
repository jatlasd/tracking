"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogPanel } from "@tremor/react";

const QuickAdd = () => {
  const router = useRouter();

  const [symptoms, setSymptoms] = useState([]);
  const [triggers, setTriggers] = useState([]);
  const [symptom, setSymptom] = useState(undefined);
  const [trigger, setTrigger] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const create = async (symptom, trigger) => {
    try {
      const date = new Date();
      const dateString = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      const timeString = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
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
    fetchSymptoms();
    fetchTriggers();
  }, []);

  const isSymptomSelected = symptom !== undefined;

  return (
    <>
      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <h3 className="text-2xl font-bold text-dark-blue-2 font-satoshi">
            Submit the following entry?
          </h3>
          <div className="flex mt-8">
            <p className="font-semibold font-satoshi text-xl">Symptom:</p>
            <p className="ml-4 font-satoshi text-lg">{symptom}</p>
          </div>
          <div className="flex mt-6">
            <p className="font-semibold font-satoshi text-xl">Trigger:</p>
            <p className="ml-4 font-satoshi text-lg">{trigger}</p>
          </div>
          <div className="w-full flex justify-evenly mx-4 mt-16">
            <button
              className="border px-8 py-2 rounded-xl bg-tiffany-500 text-dark-blue-2 font-satoshi font-semibold text-lg"
              onClick={() => create(symptom, trigger)}
            >
              Ok
            </button>
            <button
              className="border px-8 py-2 rounded-xl bg-tangerine-600 text-white font-satoshi font-semibold text-lg"
              onClick={() => {
                setIsOpen(false);
                setTimeout(() => {
                  setSymptom(undefined);
                }, 100);
              }}
            >
              Cancel
            </button>
          </div>
        </DialogPanel>
      </Dialog>

      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="pb-4 text-center head_text text-tangerine-600">
          Quick Add Symptom
        </h1>
        {symptom ? (
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
        ) : null}
        <div
          className={`flex flex-wrap items-center justify-center w-full p-5 ${
            isSymptomSelected ? "" : "mt-10"
          } md:max-lg:w-4/6 lg:w-1/2`}
        >
          {!isSymptomSelected
            ? symptoms.map((symptom) => (
                <button
                  key={symptom._id}
                  onClick={() => {
                    setSymptom(symptom.symptom);
                  }}
                  className="h-16 m-4 text-xl font-bold border rounded-md shadow-lg w-32 md:h-32 md:w-44 text-dark-blue-2 border-dark-blue-2 bg-tiffany-400"
                >
                  {symptom.symptom}
                </button>
              ))
            : triggers.map((trigger) => (
                <button
                  key={trigger._id}
                  onClick={() => {
                    setTrigger(trigger.trigger);
                    setIsOpen(true);
                  }}
                  className="h-16 m-4 text-xl font-bold border rounded-md shadow-md w-32 md:h-32 md:w-44 text-dark-blue-2 border-dark-blue-2 bg-tiffany-400"
                >
                  {trigger.trigger}
                </button>
              ))}
        </div>
      </div>
    </>
  );
};

export default QuickAdd;
