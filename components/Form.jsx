"use client";

import AutoComponent from "./AutoComponent";

import { useState, useEffect } from "react";

const Form = ({ post, setPost, handleSubmit }) => {
  const [triggers, setTriggers] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    const fetchTriggers = async () => {
      const response = await fetch("/api/stored/trigger");
      const data = await response.json();
      setTriggers(data);
    };

    const fetchSymptoms = async () => {
      const response = await fetch("/api/stored/symptom");
      const data = await response.json();
      setSymptoms(data);
    };

    fetchTriggers();
    fetchSymptoms();
  }, []);

  return (
    <section className="flex-col w-full max-w-full flex-start pb-10">
      <h1 className="mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-tangerine-600">
        Add
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full mt-10 gap-7 bg-tiffany-100 p-10 rounded-xl"
      >
        <label>
          <span className="text-base font-satoshi font-semibold text-dark-blue-2">
            Symptom
          </span>
          <AutoComponent
            options={symptoms}
            selectedValue={post.symptom}
            setSelectedValue={(value) => setPost({ ...post, symptom: value })}
            labelKey="symptom"
            placeholder="Select Symptom"
          />
        </label>

        <label>
          <span className="text-base font-satoshi font-semibold text-dark-blue-2">
            Trigger
          </span>
          <AutoComponent
            options={triggers}
            selectedValue={post.trigger}
            setSelectedValue={(value) => setPost({ ...post, trigger: value })}
            labelKey="trigger"
            placeholder="Select Trigger"
          />
        </label>

        <label>
          <span className="text-base font-satoshi font-semibold text-dark-blue-2">
            Severity
          </span>
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <label key={value}>
                <input
                  type="radio"
                  value={value}
                  checked={post.severity === value.toString()}
                  onChange={(e) =>
                    setPost({ ...post, severity: e.target.value })
                  }
                  className="flex w-full p-3 mt-2 "
                />
                {value}
              </label>
            ))}
          </div>
        </label>

        <label>
          <span className="text-base font-satoshi font-semibold text-dark-blue-2">
            Notes
          </span>
          <textarea
            value={post.notes}
            onChange={(e) => setPost({ ...post, notes: e.target.value })}
            placeholder="Notes"
            className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0"
          />
        </label>

        <button
          type="submit"
          className="px-5 py-1.5 text-lg font-semibold bg-tangerine-500 hover:bg-tangerine-400 text-gray-700 rounded-full"
        >
          Add Symptom
        </button>
      </form>
    </section>
  );
};

export default Form;
