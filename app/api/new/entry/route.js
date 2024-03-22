import Entry from '@models/entry'
import { connectToDB } from '@utils/database'

export const POST = async (request) => {
    const { date, symptom, trigger, time, severity, notes, isQuickAdd } = await request.json()

    try {
        await connectToDB()
        const newEntry = new Entry({
            date,
            symptom,
            trigger,
            time,
            severity,
            notes,
            isQuickAdd
        })
        await newEntry.save()
        return new Response(JSON.stringify(newEntry), { status: 201})
    } catch (error) {
        return new Response('Failed to add new symptom' , { status: 500 })
    }
}
