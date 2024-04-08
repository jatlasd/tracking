import { connectToDB } from "@utils/database";
import Entry from "@models/entry";
import Symptom from "@models/symptom";
import Trigger from "@models/trigger";

export const dynamic = 'force-dynamic'

export const GET = async(request, { params }) => {
  try {
    await connectToDB();

    const query = { _id: params.id };
    const entry = await Entry.findById(query)
    return new Response(JSON.stringify(entry), { status: 200 });
  }
  catch(error) {
    return new Response("Failed to fetch the entry", { status: 500 });
  }
}

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    console.log(params.id);
    const query = { _id: params.id };

    const entry = await Entry.findById(query);

    const entriesWithSymptom = await Entry.find({ symptom: entry.symptom });
    if (entriesWithSymptom.length === 1) {
      await Symptom.deleteOne({ symptom: entry.symptom });
    }

    const entriesWithTrigger = await Entry.find({ trigger: entry.trigger });
    if (entriesWithTrigger.length === 1) {
      await Trigger.deleteOne({ trigger: entry.trigger });
    }

    await Entry.deleteOne(query);

    return new Response(`Entry Deleted successfully`, { status: 200 });
  } catch (error) {
    console.error("Error details:", error);
    return new Response(`Failed to delete the entry ${params.id}`, {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  const { symptom, trigger, severity, notes } = await request.json();
  try {
    await connectToDB();

    const query = { _id: params.id };
    const entry = await Entry.findById(query);

    entry.symptom = symptom;
    entry.trigger = trigger;
    entry.severity = severity;
    entry.notes = notes;

    await entry.save();

    return new Response(`Entry updated successfully`, { status: 200 });
  } catch (error) {
    return new Response(`Failed to update the entry ${params.id}`, {
      status: 500,
    });
  }
}