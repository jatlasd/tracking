import { connectToDB } from "@utils/database";
import Symptom from "@models/symptom";

export const GET = async (request) => {
    try {
        await connectToDB();
        const symptoms = await Symptom.find();  
        return new Response(JSON.stringify(symptoms), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all symptoms", { status: 500 });
    }
}