import { connectToDB } from "@utils/database";
import Entry from "@models/entry";
import Symptom from "@models/symptom";
import Trigger from "@models/trigger";

export const dynamic = 'force-dynamic'
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
