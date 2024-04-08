"use client"

import Form from "@components/Form"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react";

const Edit = ({params}) => {
  const router = useRouter();
    const [editPost, setEditPost] = useState({symptom: "", trigger: "", severity: "", notes: ""}); 
    const {id} = params;

    useEffect(() => {
      const getEditDetails = async() => {
        const response = await fetch(`/api/stored/entry/${id}`)
        const data = await response.json();
        setEditPost({
          symptom: data.symptom,
          trigger: data.trigger,
          severity: data.severity,
          notes: data.notes
        })
      };
      if (id) getEditDetails()
    }, [id]);

    const handleSubmitEdit = async(e) => {
      e.preventDefault();
      const capitalizeWords = (str) =>
      str
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      try {
        const editResponse = await fetch(`/api/stored/entry/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            symptom: capitalizeWords(editPost.symptom),
            trigger: capitalizeWords(editPost.trigger),
            severity: editPost.severity,
            notes: editPost.notes
          })
        })
        const triggerResponse = await fetch("/api/new/trigger", {
          method: "POST",
          body: JSON.stringify({ trigger: capitalizeWords(editPost.trigger) }),
        });
  
        const symptomResponse = await fetch("/api/new/symptom", {
          method: "POST",
          body: JSON.stringify({ symptom: capitalizeWords(editPost.symptom) }),
        });
        if (symptomResponse.ok && triggerResponse.ok && editResponse.ok) {
          router.push('/dashboard')
        }
      } catch (error) {
        console.log(error)
      }
    }

    return (
      <div className="w-5/6 lg:w-1/2"> 
              <Form post={editPost} setPost={setEditPost} handleSubmit={handleSubmitEdit} type={"edit"}/>

      </div>
    )
}

export default Edit
