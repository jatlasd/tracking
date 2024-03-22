import { connectToDB } from "@utils/database";
import Trigger from "@models/trigger";

export const GET = async (request) => {
  try {
    await connectToDB();

    const triggers = await Trigger.find();

    return new Response(JSON.stringify(triggers), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all triggers", { status: 500 });
  }
};