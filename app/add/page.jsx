"use client";

import Form from "@components/Form";

import { useRouter } from "next/navigation";
import { useState } from "react";

const AddSymptom = () => {
  const router = useRouter();
  const [post, setPost] = useState({
    date: "",
    symptom: "",
    trigger: "",
    time: "",
    severity: "",
    notes: "",
    isQuickAdd: false
  });

  const addSymptom = async (e) => {
    e.preventDefault();
    const capitalizeWords = (str) =>
      str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    try {
      const entryResponse = await fetch("/api/new/entry", {
        method: "POST",
        body: JSON.stringify({
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          symptom: capitalizeWords(post.symptom),
          trigger: capitalizeWords(post.trigger),
          time: new Date().toLocaleTimeString("en-US", { hour12: true }),
          severity: post.severity,
          notes: post.notes,
          isQuickAdd: false
        }),
      });
      const triggerResponse = await fetch("/api/new/trigger", {
        method: "POST",
        body: JSON.stringify({ trigger: capitalizeWords(post.trigger) }),
      });

      const symptomResponse = await fetch("/api/new/symptom", {
        method: "POST",
        body: JSON.stringify({ symptom: capitalizeWords(post.symptom) }),
      });

      if (symptomResponse.ok && triggerResponse.ok && entryResponse.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/2">
      <Form post={post} setPost={setPost} handleSubmit={addSymptom} />
    </div>
  );
};

export default AddSymptom;
