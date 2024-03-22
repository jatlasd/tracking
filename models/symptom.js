import { Schema, model, models } from "mongoose";

const SymptomSchema = new Schema({
    symptom: {
        type: String,
        required: [true, "Symptom is required"],
    }
})

const Symptom = models.Symptom || model("Symptom", SymptomSchema);

export default Symptom;