import { connectToDB } from "@utils/database";
import Entry from "@models/entry";

export const dynamic = 'force-dynamic'
export const GET = async (request) => {
  try {
    await connectToDB();

    const entries = await Entry.find();

    return new Response(JSON.stringify(entries), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all entries", { status: 500 });
  }
};