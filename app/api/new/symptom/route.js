import Symptom from '@models/symptom'
import { connectToDB } from '@utils/database'

export const POST = async (request) => {
    const { symptom } = await request.json()
    console.log("Received symptom data:", { symptom });

    try {
        await connectToDB()
        let existingSymptom = await Symptom.findOne({ symptom })

        if (!existingSymptom) {
            const newSymptom = new Symptom({
                symptom
            })
            await newSymptom.save()
            existingSymptom = newSymptom
        }
        return new Response(JSON.stringify(existingSymptom), { status: 201 })
    } catch (error) {
        console.error("Error adding new symptom:", error);
        return new Response('Failed to add new symptom', { status: 500 })
    }
}