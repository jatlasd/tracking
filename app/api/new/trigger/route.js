import Trigger from "@models/trigger";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { trigger } = await request.json();

  try {
    await connectToDB();
    let existingTrigger = await Trigger.findOne({ trigger });

    if (!existingTrigger) {
      const newTrigger = new Trigger({
        trigger,
      });
      await newTrigger.save();
      existingTrigger = newTrigger;
    }

    return new Response(JSON.stringify(existingTrigger), { status: 201 });
  } catch (error) {
    return new Response("Failed to add new trigger", { status: 500 });
  }
};
