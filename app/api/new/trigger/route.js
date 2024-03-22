import Trigger from "@models/trigger";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { trigger } = await request.json();

    try {
        await connectToDB();
        let existingTrigger = await Trigger.findOne({ trigger });

        if (!existingTrigger) {
            // If the trigger does not exist, create and save a new one
            const newTrigger = new Trigger({
                trigger,
            });
            await newTrigger.save();
            existingTrigger = newTrigger; // Use the new trigger as the existing one for the response
        }

        // Return 201 status with the trigger (either found or newly created)
        return new Response(JSON.stringify(existingTrigger), { status: 201 });
    } catch (error) {
        return new Response("Failed to add new trigger", { status: 500 });
    }
}