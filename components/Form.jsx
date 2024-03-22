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

    fetchTriggers();
  }, []);

  useEffect(() => {
    const fetchSymptoms = async () => {
      const response = await fetch("/api/stored/symptom");
      const data = await response.json();
      setSymptoms(data);
    };

    fetchSymptoms();
  }, []);

  return (
    <section className="flex-col w-full max-w-full flex-start">
      <h1 className="head_text">Add</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full mt-10 gap-7 glassmorphism"
      >
        <label>
          <span className="text-base font-satoshi font-semilbold text-gay-700">
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
          <span className="text-base font-satoshi font-semilbold text-gay-700">
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
          <span className="text-base font-satoshi font-semilbold text-gay-700">
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
                  className="form_input"
                />
                {value}
              </label>
            ))}
          </div>
        </label>

        <label>
          <span className="text-base font-satoshi font-semilbold text-gay-700">
            Notes
          </span>
          <textarea
            value={post.notes}
            onChange={(e) => setPost({ ...post, notes: e.target.value })}
            placeholder="Notes"
            required
            className="form_textarea"
          />
        </label>

        <button
          type="submit"
          className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full"
        >
          Add Symptom
        </button>
      </form>
    </section>
  );
};

export default Form;
